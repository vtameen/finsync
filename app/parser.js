/* FinSync — bank SMS / notification parser.
 * Turns an alert into a draft transaction, or returns null.
 * Deliberately conservative: OTPs, statements/"amount due", declines,
 * promos and balance-only alerts are ignored.
 */
(function (global) {
  'use strict';

  const SKIP = new RegExp(
    '\\b(otp|one[- ]time (pass(word|code)|pin)|verification code|passcode|' +
    'do not share|never share|' +
    'declined|was not successful|unsuccessful|failed|insufficient|' +
    'amount due|min(imum)?\\.? (amount )?due|total due|is due|due (date|on)|' +
    'statement (is|has been) generated|e-?statement|' +
    'will be (debited|deducted|charged)|request(ed)? (money|payment)|has requested|' +
    'pre-?approved|offer|win |congratulations|apply now)', 'i');

  const CUR = '(AED|Dhs?\\.?|INR|Rs\\.?|₹|USD|US\\$|\\$|EUR|€|GBP|£|SAR|QAR|OMR|KWD|BHD|SGD|CAD|AUD)';
  const NUM = '(\\d{1,3}(?:,\\d{2,3})+(?:\\.\\d{1,3})?|\\d+(?:\\.\\d{1,3})?)';
  const AMT_BEFORE = new RegExp('(?<![A-Za-z])' + CUR + '\\s?' + NUM, 'gi');
  const AMT_AFTER = new RegExp('(?<![0-9A-Za-z.,*])' + NUM + '\\s?' + CUR + '(?![A-Za-z])', 'gi');
  const BALANCE_CTX = /(bal(ance)?|avl|avail(able)?|limit|outstanding)[^0-9]{0,18}$/i;

  const EXPENSE = /\b(debited|debit(ed)? (of|for)|spent|purchase|paid|payment (of|to|made)|withdrawn|withdrawal|sent|used (for|at)|charged|transferred to|deducted|transaction of|txn of|pos )/i;
  const INCOME = /\b(credited|received|deposited|deposit of|refund(ed)?|reversal|reversed|cashback|salary|added to your)/i;

  const DIGITS = [
    /ending(?: with| in)?\s*[:#-]?\s*[x*.]*(\d{2,4})\b/i,
    /\b(?:a\/?c|acct|account|card)(?: no\.?| number)?\s*[:#-]?\s*[x*.]+(\d{2,6})\b/i,
    /[x*]{2,}(\d{2,6})\b/i,
  ];

  const STOP = '(?=\\s+(?:on|using|via|has|have|was|is|for|with|ref|avl|avail|bal|txn|upi|and)\\b|[.,;:(]|$)';
  const MERCHANT = [
    /\bVPA\s+([A-Za-z0-9._-]+@[A-Za-z0-9.]+)/gi,
    new RegExp("\\b(?:at|@)\\s+([A-Za-z][A-Za-z0-9&'.*\\- ]{1,40}?)" + STOP, 'gi'),
    new RegExp("\\b(?:to|towards|from|by)\\s+([A-Za-z][A-Za-z0-9&'.*\\- ]{1,40}?)" + STOP, 'gi'),
  ];
  const NOT_MERCHANT = /^(your|you|a\/?c|acct|account|card|the|this|my|bank|customer|mobile|beneficiary|xx|\*|upi|imps|neft|rtgs)\b/i;

  const CATEGORY_WORDS = {
    Food: ['talabat', 'deliveroo', 'zomato', 'swiggy', 'noon food', 'careem food', 'instashop',
      'restaurant', 'resto', 'cafe', 'café', 'coffee', 'starbucks', 'tim hortons', 'mcdonald', 'kfc',
      'burger', 'pizza', 'shawarma', 'bakery', 'carrefour', 'lulu', 'spinneys', 'waitrose',
      'union coop', 'grocery', 'supermarket', 'hypermarket', 'baqala', 'choithrams', 'viva'],
    Transport: ['careem', 'uber', 'rta', 'salik', 'nol', 'enoc', 'eppco', 'adnoc', 'emarat', 'petrol',
      'fuel', 'taxi', 'metro', 'parking', 'mawaqif', 'darb', 'hala', 'indriver', 'ola', 'rapido'],
    Shopping: ['amazon', 'noon', 'namshi', 'shein', 'ikea', 'centrepoint', 'max fashion', 'h&m', 'zara',
      'apple', 'sharaf dg', 'jumbo', 'virgin megastore', 'mall', 'flipkart', 'myntra', 'decathlon',
      'ace hardware'],
    Bills: ['dewa', 'sewa', 'fewa', 'etihadwe', 'etihad water', 'addc', 'aadc', 'etisalat', 'e&',
      ' du ', 'du.ae', 'virgin mobile', 'electricity', 'water', 'internet', 'broadband', 'recharge',
      'bill payment', 'utility', 'airtel', 'jio', 'bsnl', 'kseb'],
    Health: ['pharmacy', 'aster', 'life pharmacy', 'boots', 'hospital', 'clinic', 'medical', 'dental',
      'nmc', 'mediclinic', 'apollo'],
    Entertainment: ['netflix', 'spotify', 'anghami', 'osn', 'shahid', 'youtube', 'disney', 'prime video',
      'vox', 'reel cinema', 'novo cinema', 'cinema', 'playstation', 'steam', 'xbox', 'apple.com/bill',
      'itunes'],
    Rent: ['rent', 'ejari', 'landlord', 'real estate'],
  };

  function cleanMerchant(raw) {
    let m = raw.split(/\s{2,}|,/)[0];
    m = m.replace(/\s+(dubai|abu dhabi|sharjah|ajman|uaq|umm al quwain|rak|fujairah|ae|are|uae|in|ind)$/i, '');
    m = m.replace(/[*\-\s.]+$/, '').trim();
    if (m.length > 32) m = m.slice(0, 32).trim();
    if (m.includes('@')) return m.toLowerCase();
    if (m === m.toUpperCase()) {
      m = m.toLowerCase().split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1) : w).join(' ');
    }
    return m;
  }

  function normCurrency(c) {
    const u = c.toUpperCase().replace(/\./g, '');
    if (u === 'RS' || u === '₹') return 'INR';
    if (u.startsWith('DH')) return 'AED';
    if (u === 'US$' || u === '$') return 'USD';
    if (u === '€') return 'EUR';
    if (u === '£') return 'GBP';
    return u;
  }

  /** @returns {null | {amount, currency, type, merchant, lastDigits, category}} */
  function parse(title, body, appName) {
    const text = (String(title || '') + '. ' + String(body || '')).replace(/\s+/g, ' ').trim();
    if (text.length < 12 || SKIP.test(text)) return null;

    const cands = [];
    for (const m of text.matchAll(AMT_BEFORE)) cands.push({ at: m.index, cur: m[1], num: m[2] });
    for (const m of text.matchAll(AMT_AFTER)) cands.push({ at: m.index, cur: m[2], num: m[1] });
    cands.sort((a, b) => a.at - b.at);
    let picked = null;
    for (const c of cands) {
      const before = text.slice(Math.max(0, c.at - 30), c.at);
      if (BALANCE_CTX.test(before)) continue;
      picked = c; break;
    }
    if (!picked) return null;
    const amount = parseFloat(picked.num.replace(/,/g, ''));
    if (!(amount > 0)) return null;

    const e = text.match(EXPENSE), i = text.match(INCOME);
    let type;
    if (!e && !i) return null;
    else if (!i) type = 'expense';
    else if (!e) type = 'income';
    else type = i.index < e.index ? 'income' : 'expense';

    let lastDigits = null;
    for (const r of DIGITS) { const m = text.match(r); if (m) { lastDigits = m[1]; break; } }

    let merchant = null;
    outer: for (const r of MERCHANT) {
      r.lastIndex = 0;
      for (const m of text.matchAll(r)) {
        const raw = m[1].trim();
        if (NOT_MERCHANT.test(raw) || /^\d/.test(raw)) continue;
        const c = cleanMerchant(raw);
        if (c) { merchant = c; break outer; }
      }
    }

    const hay = (' ' + (merchant || '') + ' ' + text + ' ' + (appName || '') + ' ').toLowerCase();
    let category = 'Other';
    if (type === 'income') {
      if (/salary|payroll|wps/.test(hay)) category = 'Salary';
      else if (/refund|reversal|reversed|cashback/.test(hay)) category = 'Refund';
    } else if (/\b(atm|cash withdrawal|withdrawn)\b/.test(hay)) {
      category = 'Other';
      merchant = merchant || 'ATM withdrawal';
    } else {
      found: for (const [cat, words] of Object.entries(CATEGORY_WORDS)) {
        for (const w of words) if (hay.includes(w)) { category = cat; break found; }
      }
    }
    return { amount, currency: normCurrency(picked.cur), type, merchant, lastDigits, category };
  }

  global.BankParser = { parse };
  if (typeof module !== 'undefined') module.exports = { parse };
})(typeof window !== 'undefined' ? window : globalThis);
