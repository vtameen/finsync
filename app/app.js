/* FinSync 1.2.0 — native Android WebView app.
 * Data: Firebase Auth (Google, via native Credential Manager) + Cloud Firestore,
 * same layout as the Flutter app so existing data carries over:
 *   users/{uid}/{transactions|debts|loans|investments|bankAccounts|goals}/{id}
 *   users/{uid}/settings/prefs
 * Native bridge: window.Android (see MainActivity.kt). Native → JS: window.FinSync.*
 */
(function () {
  'use strict';

  // ───────────────────────────────────────── constants
  const VERSION = '1.2.0';
  const FIREBASE = {
    apiKey: 'AIzaSyAHmQXzxnvGUHIw5qYwbr9AorR9ISjES9E',
    authDomain: 'finsylnc.firebaseapp.com',
    projectId: 'finsylnc',
    storageBucket: 'finsylnc.firebasestorage.app',
    messagingSenderId: '262167138693',
    appId: '1:262167138693:android:ac0c762cb21df70a19f4ec',
  };
  const COLS = { transactions: 'tx', debts: 'debts', loans: 'loans', investments: 'invs', bankAccounts: 'banks', goals: 'goals' };

  const EXP = [['Food', 'restaurant'], ['Transport', 'directions_bus'], ['Shopping', 'shopping_bag'], ['Bills', 'bolt'],
    ['Health', 'medication'], ['Entertainment', 'movie'], ['Rent', 'home'], ['Other', 'more_horiz']];
  const INC = [['Salary', 'work'], ['Freelance', 'laptop_mac'], ['Investment', 'trending_up'], ['Gift', 'redeem'],
    ['Refund', 'replay'], ['Rental', 'apartment'], ['Bonus', 'star'], ['Other', 'more_horiz']];
  const GOAL_CATS = [['Emergency', 'shield'], ['Home', 'home'], ['Car', 'directions_car'], ['Travel', 'flight'],
    ['Education', 'menu_book'], ['Retirement', 'elderly'], ['Wedding', 'diamond'], ['Other', 'more_horiz']];
  const INV_TYPES = [['Stocks', 'trending_up'], ['Mutual Fund', 'account_balance'], ['Gold', 'workspace_premium'],
    ['Crypto', 'currency_bitcoin'], ['Fixed Deposit', 'lock'], ['Real Estate', 'home'], ['Bonds', 'description'], ['Other', 'more_horiz']];
  const LOAN_TYPES = [['Home Loan', 'home'], ['Car Loan', 'directions_car'], ['Personal Loan', 'person'], ['Education Loan', 'school'],
    ['Business Loan', 'business_center'], ['Gold Loan', 'workspace_premium'], ['Other', 'account_balance']];
  const CURRENCIES = [['$', 'USD ($)'], ['€', 'EUR (€)'], ['£', 'GBP (£)'], ['¥', 'JPY (¥)'], ['₹', 'INR (₹)'], ['AED', 'AED'], ['SAR', 'SAR'], ['QAR', 'QAR']];
  const PERIODS = [['1W', '1W'], ['1M', '1M'], ['3M', '3M'], ['6M', '6M'], ['12M', '12M'], ['ALL', 'All'], ['CUSTOM', 'Custom']];
  const FIXED_TONE = { Food: 1, Transport: 0, Shopping: 4, Bills: 3, Health: 5, Entertainment: 7, Rent: 2,
    Salary: 2, Freelance: 6, Investment: 0, Gift: 7, Refund: 8, Rental: 3, Bonus: 1, Other: 9, More: 9 };
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const A = window.Android || null; // native bridge (absent in a desktop browser)
  const now0 = new Date();

  // ───────────────────────────────────────── state
  const S = {
    user: null, uid: null, ready: false,
    tx: [], debts: [], loans: [], invs: [], banks: [], goals: [],
    settings: { currency: '$', bankTrackingOn: false, isDark: true },
    tab: 'home', month: now0.getMonth(), year: now0.getFullYear(),
    flows: { chart: 'expense', period: '1M', custom: null, cat: null, filter: 'all', q: '' },
    debtTab: 'debt',
    captures: [], captureAccess: false,
    autoCapture: lsGet('autoCaptureOn') === '1',
  };
  let app, auth, db, unsubs = [];

  // ───────────────────────────────────────── utils
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Material Symbols (Rounded) subset — glyphs addressed by code point, so the font stays ~20 KB.
  const ICONS = {account_balance:0xe84f,account_circle:0xe853,add:0xe145,apartment:0xea40,bolt:0xea0b,business_center:0xeb3f,call_made:0xe0b2,call_received:0xe0b5,check:0xe5ca,check_circle:0xe86c,chevron_left:0xe408,chevron_right:0xe409,close:0xe14c,cloud:0xe2bd,cloud_done:0xe2bf,credit_card:0xe870,currency_bitcoin:0xebc5,date_range:0xe916,delete:0xe872,delete_forever:0xe92b,description:0xe873,diamond:0xead5,directions_bus:0xe530,directions_car:0xe531,done_all:0xe877,download:0xe171,edit:0xe150,elderly:0xf21a,flag:0xe153,flight:0xe539,group:0xe7ef,handshake:0xebcb,home:0xe88a,inbox:0xe156,info:0xe88e,input:0xe890,ios_share:0xe6b8,laptop_mac:0xe320,lock:0xe88d,lock_open:0xe898,logout:0xe9ba,medication:0xf033,menu_book:0xea19,more_horiz:0xe5d3,movie:0xe02c,notifications_active:0xe7f7,open_in_new:0xe895,paid:0xf041,payments:0xef63,person:0xe7fd,receipt_long:0xef6e,redeem:0xe8b1,remove:0xe15b,replay:0xe042,restaurant:0xe56c,save:0xe161,school:0xe80c,search:0xe8b6,settings:0xe8b8,shield:0xe9e0,shopping_bag:0xf1cc,show_chart:0xe6e1,star:0xe838,swap_horiz:0xe8d4,sync_alt:0xea18,task_alt:0xe2e6,trending_up:0xe8e5,tune:0xe429,work:0xe8f9,workspace_premium:0xe7af};
  const icon = (name, cls) => `<span class="i ${cls || ''}">${ICONS[name] ? String.fromCodePoint(ICONS[name]) : ''}</span>`;
  const pad2 = n => String(n).padStart(2, '0');
  const D = s => (s instanceof Date ? s : new Date(s));
  /** Dart-style local ISO string (no zone), so the old Flutter build can still read it. */
  function iso(d) {
    d = D(d);
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${String(d.getMilliseconds()).padStart(3, '0')}`;
  }
  const ymd = d => { d = D(d); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; };
  const fromYmd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const dayStart = d => { d = D(d); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
  const fmtDate = (d, withYear) => D(d).toLocaleDateString('en-GB', withYear ? { day: 'numeric', month: 'short', year: 'numeric' } : { day: 'numeric', month: 'short' });
  const fmtDay = d => D(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const num = v => (typeof v === 'number' ? v : parseFloat(v)) || 0;
  function fmt(v) { return Math.abs(v).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fmtS(v) {
    v = Math.abs(v);
    if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M';
    if (v >= 1e4) return (v / 1e3).toFixed(1) + 'K';
    return fmt(v).replace(/\.00$/, '');
  }
  function sym() { const c = S.settings.currency || '$'; return /^[A-Za-z]+$/.test(c) ? c + ' ' : c; }
  function money(v, opts) {
    opts = opts || {};
    const sign = opts.sign ? (v < 0 ? '−' : '+') : (v < 0 ? '−' : '');
    return sign + sym() + (opts.short ? fmtS(v) : fmt(v));
  }
  function tone(key) {
    let t = FIXED_TONE[key];
    if (t == null) { let h = 0; for (const c of String(key)) h = (h * 31 + c.charCodeAt(0)) & 0x7fffffff; t = h % 9; }
    return { fg: `var(--t${t})`, bg: `var(--t${t}b)` };
  }
  const iconFor = (list, name) => (list.find(x => x[0] === name) || [0, 'more_horiz'])[1];
  const txIcon = c => iconFor(EXP.concat(INC), c);
  function disc(ic, key) { const t = tone(key); return `<div class="disc" style="background:${t.bg};color:${t.fg}">${icon(ic)}</div>`; }
  const newId = () => Date.now();
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('on');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), 2400);
  }

  // ───────────────────────────────────────── derived data
  const inMonth = (t, m, y) => { const d = D(t.date); return d.getMonth() === m && d.getFullYear() === y; };
  const monthTx = () => S.tx.filter(t => inMonth(t, S.month, S.year)).sort((a, b) => D(b.date) - D(a.date));
  const sum = (arr, f) => arr.reduce((s, x) => s + f(x), 0);
  function monthTotals() {
    const m = monthTx();
    const inc = sum(m.filter(t => t.type === 'income'), t => num(t.amount));
    const exp = sum(m.filter(t => t.type === 'expense'), t => num(t.amount));
    return { m, inc, exp, net: inc - exp, rate: inc > 0 ? Math.min(exp / inc, 1) : (exp > 0 ? 1 : 0) };
  }
  function period() {
    const f = S.flows, today = dayStart(new Date()), tomorrow = new Date(today.getTime() + 864e5);
    const back = n => new Date(today.getFullYear(), today.getMonth() - n, 1);
    switch (f.period) {
      case '1W': return { start: new Date(today.getTime() - 6 * 864e5), end: tomorrow, label: 'Last 7 days' };
      case '3M': return { start: back(2), end: tomorrow, label: 'Last 3 months' };
      case '6M': return { start: back(5), end: tomorrow, label: 'Last 6 months' };
      case '12M': return { start: back(11), end: tomorrow, label: 'Last 12 months' };
      case 'ALL': return { start: new Date(1970, 0, 1), end: new Date(9999, 0, 1), label: 'All time' };
      case 'CUSTOM': {
        const s = f.custom ? fromYmd(f.custom.from) : new Date(today.getTime() - 29 * 864e5);
        const e = f.custom ? fromYmd(f.custom.to) : today;
        return { start: s, end: new Date(e.getTime() + 864e5), label: `${fmtDate(s)} – ${fmtDate(e)}` };
      }
      default: return { start: new Date(S.year, S.month, 1), end: new Date(S.year, S.month + 1, 1), label: `${MONTHS[S.month]} ${S.year}` };
    }
  }
  function breakdown(txs, type) {
    const m = new Map();
    for (const t of txs) if (t.type === type) m.set(t.category, (m.get(t.category) || 0) + num(t.amount));
    return [...m.entries()].map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount);
  }
  // Loans
  const ym = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
  const loanPaid = l => (l.paidMonths || []).length;
  const loanLeft = l => Math.max(0, Math.min(l.tenureMonths, l.tenureMonths - loanPaid(l)));
  const loanOutstanding = l => Math.max(0, num(l.emi) * loanLeft(l));
  const loanPaidThisMonth = l => (l.paidMonths || []).includes(ym(new Date()));
  const loanDue = l => !l.closed && new Date() >= D(l.startDate) && !loanPaidThisMonth(l) && loanLeft(l) > 0;
  const loanOverdue = l => loanDue(l) && new Date().getDate() > l.dueDay;
  const activeLoans = () => S.loans.filter(l => !l.closed);
  // Debts
  const openDebts = type => S.debts.filter(d => !d.settled && d.type === type);
  const debtOverdue = d => !d.settled && d.dueDate && D(d.dueDate) < new Date();
  // Goals
  const goalProgress = g => (num(g.target) > 0 ? Math.min(num(g.saved) / num(g.target), 1) : 0);
  const goalReached = g => num(g.target) > 0 && num(g.saved) >= num(g.target);
  function goalMonthly(g) {
    if (!g.deadline || goalReached(g)) return null;
    const days = Math.floor((D(g.deadline) - new Date()) / 864e5);
    const remaining = Math.max(0, num(g.target) - num(g.saved));
    if (days <= 0) return remaining;
    return remaining / Math.ceil(days / 30.44);
  }
  function bankById(id) { return S.banks.find(b => String(b.id) === String(id)); }
  const bankTag = b => `${String(b.name).toUpperCase()}··${b.lastTwo}`;

  // ───────────────────────────────────────── Firebase
  function initFirebase() {
    app = FB.initializeApp(FIREBASE);
    const authOpts = { persistence: [FB.indexedDBLocalPersistence, FB.browserLocalPersistence] };
    if (FB.browserPopupRedirectResolver) authOpts.popupRedirectResolver = FB.browserPopupRedirectResolver; // web build only
    auth = FB.initializeAuth(app, authOpts);
    if (FB.getRedirectResult) FB.getRedirectResult(auth).catch(e => renderAuth('Sign-in failed: ' + (e.code || e.message)));
    try {
      db = FB.initializeFirestore(app, { localCache: FB.persistentLocalCache({ tabManager: FB.persistentSingleTabManager() }) });
    } catch (e) {
      db = FB.initializeFirestore(app, {});
    }
    FB.onAuthStateChanged(auth, u => {
      unsubs.forEach(f => f()); unsubs = [];
      S.user = u; S.uid = u ? u.uid : null; S.ready = false;
      Object.values(COLS).forEach(k => { S[k] = []; });
      if (!u) { renderAuth(); return; }
      renderSplash();
      subscribe(u.uid);
    });
  }
  function subscribe(uid) {
    let pending = Object.keys(COLS).length;
    const done = () => { if (--pending === 0 && !S.ready) { S.ready = true; render(); initCapture(); } };
    const timer = setTimeout(() => { if (!S.ready) { S.ready = true; render(); initCapture(); } }, 7000);
    unsubs.push(() => clearTimeout(timer));
    for (const [col, key] of Object.entries(COLS)) {
      let first = true;
      unsubs.push(FB.onSnapshot(FB.collection(db, 'users', uid, col), snap => {
        S[key] = snap.docs.map(d => { const x = d.data(); if (x.id == null) x.id = Number(d.id) || d.id; return x; });
        if (first) { first = false; done(); } else render();
      }, err => { console.error(col, err); if (first) { first = false; done(); } toast('Sync error: ' + (err.code || err.message)); }));
    }
    unsubs.push(FB.onSnapshot(FB.doc(db, 'users', uid, 'settings', 'prefs'), s => {
      if (s.exists()) Object.assign(S.settings, s.data());
      if (S.ready) render();
    }, err => console.error('settings', err)));
  }
  const ref = (col, id) => FB.doc(db, 'users', S.uid, col, String(id));
  function clean(o) { const r = {}; for (const k in o) r[k] = o[k] === undefined ? null : o[k]; return r; }
  function put(col, obj) {
    // Optimistic: update local state now; the snapshot listener confirms.
    const key = COLS[col], i = S[key].findIndex(x => String(x.id) === String(obj.id));
    if (i >= 0) S[key][i] = obj; else S[key].unshift(obj);
    render();
    FB.setDoc(ref(col, obj.id), clean(obj)).catch(e => toast('Not saved: ' + (e.code || e.message)));
  }
  function del(col, id) {
    const key = COLS[col];
    S[key] = S[key].filter(x => String(x.id) !== String(id));
    render();
    FB.deleteDoc(ref(col, id)).catch(e => toast('Not deleted: ' + (e.code || e.message)));
  }
  function saveSettings(patch) {
    Object.assign(S.settings, patch); render();
    FB.setDoc(FB.doc(db, 'users', S.uid, 'settings', 'prefs'), clean(S.settings), { merge: true }).catch(e => toast('Settings not saved: ' + (e.code || e.message)));
  }

  // ───────────────────────────────────────── auth screens
  function renderSplash() {
    app_().innerHTML = `<div class="auth"><div class="logo">${icon('sync_alt')}</div><div class="spin"></div></div>`;
  }
  const app_ = () => $('#app');
  const GLOGO = '<svg viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.8l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>';
  function renderAuth(err) {
    closeAllSheets();
    app_().innerHTML = `<div class="auth fade">
      <div class="logo">${icon('sync_alt')}</div>
      <h1>FinSync</h1>
      <p>Expenses, debts, EMIs, investments and goals —<br>synced to your Google account.</p>
      <button class="gbtn" data-act="signin">${GLOGO}<span>Continue with Google</span></button>
      <div class="err" id="autherr">${esc(err || '')}</div>
    </div>`;
  }
  let signingIn = false;
  function startSignIn() {
    if (signingIn) return;
    if (!A || !A.googleSignIn) {
      if (FB.signInWithPopup) { webSignIn(); return; } // web / iPhone build
      renderAuth('Google sign-in is available in the Android app.'); return;
    }
    signingIn = true;
    const e = $('#autherr'); if (e) e.textContent = '';
    const b = $('.gbtn span'); if (b) b.textContent = 'Signing in…';
    A.googleSignIn();
  }
  async function onGoogleToken(token) {
    try {
      await FB.signInWithCredential(auth, FB.GoogleAuthProvider.credential(token));
    } catch (e) {
      renderAuth('Sign-in failed: ' + (e.code || e.message));
    } finally { signingIn = false; }
  }
  // Web build (no native bridge): Firebase popup sign-in, redirect as a fallback.
  async function webSignIn() {
    signingIn = true;
    const e0 = $('#autherr'); if (e0) e0.textContent = '';
    const b = $('.gbtn span'); if (b) b.textContent = 'Signing in…';
    const p = new FB.GoogleAuthProvider();
    p.setCustomParameters({ prompt: 'select_account' });
    try {
      await FB.signInWithPopup(auth, p, FB.browserPopupRedirectResolver);
    } catch (e) {
      const code = e && e.code || '';
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        try { await FB.signInWithRedirect(auth, p, FB.browserPopupRedirectResolver); return; } catch (e2) { e = e2; }
      }
      const quiet = code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request';
      renderAuth(quiet ? '' : 'Sign-in failed: ' + (e.code || e.message));
    } finally { signingIn = false; }
  }
  function onGoogleError(msg) { signingIn = false; renderAuth(msg && msg !== 'cancelled' ? msg : ''); }
  async function signOutAll() {
    closeAllSheets();
    try { await FB.signOut(auth); } catch (e) { /* ignore */ }
    if (A && A.googleSignOut) A.googleSignOut();
  }

  // ───────────────────────────────────────── main render
  let rafPending = false;
  function render() {
    if (!S.user || !S.ready) return;
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => { rafPending = false; draw(); });
  }
  const TABS = [['home', 'home', 'Home'], ['flows', 'swap_horiz', 'Flows'], ['debts', 'group', 'Debts'],
    ['invest', 'show_chart', 'Invest'], ['goals', 'flag', 'Goals'], ['config', 'tune', 'Config']];
  let lastTab = null;
  function draw() {
    let view = $('#view');
    if (!view) {
      app_().innerHTML = `<div id="view"></div><nav class="tabs">${TABS.map(t =>
        `<button data-act="tab" data-v="${t[0]}"><span class="pill">${icon(t[1])}</span>${t[2]}</button>`).join('')}</nav>`;
      view = $('#view');
    }
    const keep = lastTab === S.tab ? view.scrollTop : 0;
    const html = { home: vHome, flows: vFlows, debts: vDebts, invest: vInvest, goals: vGoals, config: vConfig }[S.tab]();
    view.innerHTML = html;
    view.scrollTop = keep;
    if (lastTab !== S.tab) view.firstElementChild && view.firstElementChild.classList.add('fade');
    lastTab = S.tab;
    document.querySelectorAll('nav.tabs button').forEach(b => b.classList.toggle('on', b.dataset.v === S.tab));
    // refresh any open sheet that depends on state
    sheets.forEach(sh => sh.refresh && sh.refresh());
  }

  // ───────────────────────────────────────── shared view parts
  function txRow(t, opts) {
    opts = opts || {};
    const inc = t.type === 'income';
    let src = '';
    if (S.settings.bankTrackingOn && t.paymentSource) {
      if (t.paymentSource === 'cash') src = ' · Cash';
      else { const b = bankById(t.paymentSource); if (b) src = ' · ' + bankTag(b); }
    }
    return `<div class="item" data-act="edit-tx" data-id="${esc(t.id)}">
      ${disc(txIcon(t.category), t.category)}
      <div class="mid"><div class="t1">${esc(t.note || t.category)}</div>
        <div class="t2">${esc(t.category)} · ${fmtDate(t.date)}${esc(src)}</div></div>
      <div class="amt num ${inc ? 'pos' : ''}">${inc ? '+' : ''}${sym()}${fmt(num(t.amount))}</div></div>`;
  }
  function debtRow(d) {
    const credit = d.type === 'credit';
    const due = d.dueDate ? ' · due ' + fmtDate(d.dueDate) : '';
    return `<div class="item" data-act="debt" data-id="${esc(d.id)}">
      ${disc(credit ? 'call_received' : 'call_made', credit ? 'Salary' : 'Health')}
      <div class="mid"><div class="t1">${esc(d.person)}</div>
        <div class="t2">${esc(d.note || (credit ? 'Owes you' : 'You owe'))}${esc(due)}</div></div>
      <div class="amt num ${credit ? 'pos' : 'neg'}">${money(num(d.amount))}
        ${d.settled ? '<small>Settled</small>' : debtOverdue(d) ? '<small class="neg">Overdue</small>' : ''}</div></div>`;
  }
  function donut(slices, opts) {
    const size = opts.size || 200, stroke = opts.stroke || 18, r = (size - stroke) / 2, c = size / 2;
    const total = sum(slices, s => s.amount);
    let arcs = '';
    if (total <= 0) {
      arcs = `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--surface2)" stroke-width="${stroke}"/>`;
    } else {
      const capAngle = (stroke / 2) / r;
      const gap = slices.length > 1 ? 0.05 + capAngle * 2 : 0;
      let a = -Math.PI / 2;
      for (const s of slices) {
        const full = Math.PI * 2 * (s.amount / total);
        let sweep = Math.max(full - gap, 0.001);
        if (slices.length === 1) sweep = Math.PI * 2 - 0.0001;
        const a0 = a + gap / 2, a1 = a0 + sweep;
        const x0 = c + r * Math.cos(a0), y0 = c + r * Math.sin(a0), x1 = c + r * Math.cos(a1), y1 = c + r * Math.sin(a1);
        const sel = opts.selected, dim = sel && sel !== s.category;
        arcs += `<path class="seg-arc" d="M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}"
          fill="none" stroke="${tone(s.category).fg}" stroke-width="${sel === s.category ? stroke + 4 : stroke}" stroke-linecap="round" opacity="${dim ? 0.22 : 1}"/>`;
        a += full;
      }
    }
    return `<div class="donut" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}">${arcs}</svg>
      <div class="c" style="padding:${stroke + 8}px"><div class="l">${esc(opts.label)}</div>
      <div class="v" style="font-size:${size < 150 ? 15 : 22}px">${esc(opts.value)}</div>${opts.sub ? `<div class="s">${esc(opts.sub)}</div>` : ''}</div></div>`;
  }
  function captureBanner() {
    const n = pendingCaptures().length;
    if (!n) return '';
    return `<div class="banner" data-act="inbox"><div class="ic">${icon('notifications_active')}</div>
      <div class="mid" style="flex:1"><div class="t1">${n} bank alert${n === 1 ? '' : 's'} to review</div>
      <div class="t2">Captured from your notifications — tap to add</div></div>${icon('chevron_right', 'acc')}</div>`;
  }
  const empty = (ic, text) => `<div class="empty">${icon(ic)}${esc(text)}</div>`;

  // ───────────────────────────────────────── HOME
  function vHome() {
    const t = monthTotals(), u = S.user;
    const first = (u.displayName || u.email || '').split(/[ @]/)[0];
    const initials = (u.displayName || u.email || '?').trim()[0].toUpperCase();
    const slices = breakdown(t.m, 'expense');
    const top = slices.slice(0, 4), rest = sum(slices.slice(4), s => s.amount), total = sum(slices, s => s.amount);
    const due = activeLoans().filter(loanDue);
    const inv = S.invs, invested = sum(inv, i => num(i.invested)), current = sum(inv, i => num(i.currentValue)), pnl = current - invested;
    const gT = sum(S.goals, g => num(g.target)), gS = sum(S.goals, g => num(g.saved)), gP = gT > 0 ? Math.min(gS / gT, 1) : 0;
    const recent = S.tx.slice().sort((a, b) => D(b.date) - D(a.date)).slice(0, 5);
    const open = openDebts('credit').concat(openDebts('debt')).slice(0, 3);
    const line = (cat, amt) => { const tn = tone(cat); return `<div class="lline"><div class="r"><span class="dot" style="width:8px;height:8px;border-radius:50%;background:${tn.fg}"></span>
      <span class="n">${esc(cat)}</span><b>${sym()}${fmtS(amt)}</b></div><div class="bar"><i style="width:${total ? (amt / total * 100).toFixed(1) : 0}%;background:${tn.fg}"></i></div></div>`; };
    return `<div>
      <div class="hello"><div class="avatar">${u.photoURL ? `<img src="${esc(u.photoURL)}" referrerpolicy="no-referrer" alt="">` : esc(initials)}</div>
        <div class="mid" style="flex:1"><div style="font-size:13px;color:var(--text2)">Hi${first ? ', ' + esc(first) : ''}</div></div>
        <span class="badge">${MONTHS[S.month].slice(0, 3)} ${S.year}</span></div>
      <div class="hdr"><div class="eyebrow">Net balance</div>
        <div class="big num ${t.net < 0 ? 'neg' : ''}"><span class="sym">${t.net < 0 ? '−' : ''}${esc(sym())}</span>${fmt(t.net)}</div>
        <div class="sub">${t.m.length} transaction${t.m.length === 1 ? '' : 's'} this month</div></div>
      <div class="stats">
        <div class="stat"><div class="l">Income</div><div class="v num pos">${sym()}${fmtS(t.inc)}</div></div>
        <div class="stat"><div class="l">Expense</div><div class="v num">${sym()}${fmtS(t.exp)}</div></div>
        <div class="stat"><div class="l">You owe</div><div class="v num">${sym()}${fmtS(sum(openDebts('debt'), d => num(d.amount)))}</div></div></div>
      <div class="pad" style="margin-top:12px"><div class="row" style="font-size:12px;color:var(--text3);margin-bottom:6px"><span>Spending rate</span><span class="spacer"></span><span class="num">${Math.round(t.rate * 100)}%</span></div>
        <div class="bar"><i style="width:${(t.rate * 100).toFixed(1)}%;background:${t.rate > .8 ? 'var(--neg)' : 'var(--accent)'}"></i></div></div>
      ${captureBanner()}
      <div class="card" data-act="tab" data-v="flows"><div class="card-h"><span class="t">Where it went</span><span class="spacer"></span><span class="link">Breakdown</span></div>
        <div class="where">${donut(slices, { size: 124, stroke: 12, label: 'Spent', value: sym() + fmtS(total) })}
          <div class="lg">${slices.length ? top.map(s => line(s.category, s.amount)).join('') + (rest > 0 ? line('More', rest) : '') : '<div class="muted" style="font-size:13px">No spending yet this month</div>'}</div></div></div>
      ${due.length ? `<div class="card" style="background:var(--accent-wash);border-color:transparent" data-act="tab" data-v="debts" data-sub="loans">
        <div class="card-h"><span class="t acc">EMI due this month</span><span class="spacer"></span><span class="link">View</span></div>
        <div style="padding:0 14px 12px">${due.map(l => `<div class="row" style="padding:4px 0"><span style="flex:1;font-weight:500">${esc(l.name)}</span>
          ${loanOverdue(l) ? '<span class="badge red">Overdue</span>' : `<span class="badge">Due ${l.dueDay}</span>`}
          <b class="num">${money(num(l.emi))}</b></div>`).join('')}</div></div>` : ''}
      ${inv.length ? `<div class="card" data-act="tab" data-v="invest"><div class="card-h"><span class="t">Portfolio</span><span class="spacer"></span><span class="link">View</span></div>
        <div class="minis"><div class="mini"><div class="l">Invested</div><div class="v num">${sym()}${fmtS(invested)}</div></div>
          <div class="mini"><div class="l">Current</div><div class="v num">${sym()}${fmtS(current)}</div></div>
          <div class="mini"><div class="l">P&amp;L</div><div class="v num ${pnl >= 0 ? 'pos' : 'neg'}">${pnl >= 0 ? '+' : '−'}${sym()}${fmtS(pnl)}</div></div></div></div>` : ''}
      ${S.goals.length ? `<div class="card" data-act="tab" data-v="goals"><div class="card-h"><span class="t">Goals</span><span class="spacer"></span><span class="link">View</span></div>
        <div class="minis"><div class="mini"><div class="l">Saved</div><div class="v num pos">${sym()}${fmtS(gS)}</div></div>
          <div class="mini"><div class="l">Target</div><div class="v num">${sym()}${fmtS(gT)}</div></div>
          <div class="mini"><div class="l">Funded</div><div class="v num">${Math.round(gP * 100)}%</div></div></div>
        <div style="padding:0 14px 14px"><div class="bar"><i style="width:${(gP * 100).toFixed(1)}%;background:var(--pos)"></i></div></div></div>` : ''}
      <div class="sect"><span class="t">Recent</span><button class="link" data-act="tab" data-v="flows">See all</button></div>
      <div class="card" style="margin-top:0"><div class="list">${recent.length ? recent.map(t => txRow(t)).join('') : empty('receipt_long', 'No transactions yet — tap + on Flows')}</div></div>
      <div class="sect"><span class="t">Open debts</span><button class="link" data-act="tab" data-v="debts">See all</button></div>
      <div class="card" style="margin-top:0"><div class="list">${open.length ? open.map(debtRow).join('') : empty('handshake', 'No open debts')}</div></div>
    </div>`;
  }

  // ───────────────────────────────────────── FLOWS
  function flowsData() {
    const f = S.flows, p = period();
    const inP = S.tx.filter(t => { const d = D(t.date); return d >= p.start && d < p.end; }).sort((a, b) => D(b.date) - D(a.date));
    return { f, p, inP, slices: breakdown(inP, f.chart) };
  }
  function vFlows() {
    const { f, p, inP, slices } = flowsData();
    const total = sum(slices, s => s.amount);
    const inc = sum(inP.filter(t => t.type === 'income'), t => num(t.amount)), exp = sum(inP.filter(t => t.type === 'expense'), t => num(t.amount));
    const net = inc - exp;
    const selAmt = f.cat ? sum(slices.filter(s => s.category === f.cat), s => s.amount) : total;
    return `<div>
      <div class="hdr"><div class="row"><div class="eyebrow" style="flex:1">${f.chart === 'expense' ? 'Total spent' : 'Total received'}</div>
        <div class="seg"><button class="${f.chart === 'expense' ? 'on' : ''}" data-act="chart" data-v="expense">Expenses</button><button class="${f.chart === 'income' ? 'on' : ''}" data-act="chart" data-v="income">Income</button></div></div>
        <div class="big num ${f.chart === 'income' ? 'pos' : ''}"><span class="sym">${esc(sym())}</span>${fmt(total)}</div>
        <div class="sub">${esc(p.label)} · net ${net < 0 ? '−' : '+'}${sym()}${fmt(net)} · ${inP.length} txn${inP.length === 1 ? '' : 's'}</div></div>
      <div class="chips">${PERIODS.map(([k, l]) => `<button class="chip ${f.period === k ? 'on' : ''}" data-act="period" data-v="${k}">${k === 'CUSTOM' ? icon('date_range') : ''}${l}</button>`).join('')}</div>
      ${f.period === '1M' ? `<div class="mstep"><button class="rbtn" data-act="month" data-v="-1">${icon('chevron_left')}</button><span>${MONTHS[S.month]} ${S.year}</span><button class="rbtn" data-act="month" data-v="1">${icon('chevron_right')}</button></div>` : ''}
      <div class="card p" style="padding-top:20px">
        ${donut(slices, { selected: f.cat, label: f.cat || (f.chart === 'expense' ? 'Spent' : 'Received'), value: sym() + fmtS(selAmt),
          sub: f.cat && total > 0 ? Math.round(selAmt / total * 100) + '% of total' : '' })}
        ${slices.length ? `<div class="legend">${slices.map(s => { const tn = tone(s.category); const on = f.cat === s.category;
          return `<button class="lchip ${on ? 'on' : ''}" style="${on ? `background:${tn.bg};border-color:${tn.fg}` : ''}" data-act="cat" data-v="${esc(s.category)}"><span class="dot" style="background:${tn.fg}"></span>${esc(s.category)}<span class="a">${sym()}${fmtS(s.amount)}</span></button>`; }).join('')}</div>`
          : `<div class="empty" style="padding:14px 0 4px">${f.chart === 'expense' ? 'No spending in this period' : 'No income in this period'}</div>`}
      </div>
      ${captureBanner()}
      <div class="tabsline" style="margin-top:10px">${[['all', 'All'], ['income', 'Income'], ['expense', 'Expense']].map(([k, l]) =>
        `<button class="${f.filter === k ? 'on' : ''}" data-act="ffilter" data-v="${k}">${l}</button>`).join('')}
        ${f.cat ? `<span class="spacer"></span><button class="chip" style="margin:6px 4px" data-act="cat" data-v="${esc(f.cat)}">${esc(f.cat)} ${icon('close')}</button>` : ''}</div>
      <div class="search">${icon('search')}<input id="fsearch" placeholder="Search note or category" value="${esc(f.q)}" autocomplete="off"></div>
      <div id="flist">${flowsList()}</div>
      <button class="fab" data-act="add-tx">${icon('add')}</button>
    </div>`;
  }
  function flowsList() {
    const { f, inP } = flowsData();
    let txs = inP;
    if (f.cat) txs = txs.filter(t => t.category === f.cat && t.type === f.chart);
    if (f.filter !== 'all') txs = txs.filter(t => t.type === f.filter);
    if (f.q) { const q = f.q.toLowerCase(); txs = txs.filter(t => (t.note || '').toLowerCase().includes(q) || (t.category || '').toLowerCase().includes(q)); }
    if (!txs.length) return empty('receipt_long', f.q || f.cat ? 'No matches' : 'No transactions in this period');
    const groups = new Map();
    for (const t of txs) { const k = ymd(t.date); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(t); }
    return [...groups.entries()].map(([k, list]) => {
      const dn = sum(list, t => (t.type === 'income' ? 1 : -1) * num(t.amount));
      return `<div class="day"><span>${fmtDay(fromYmd(k))}</span><span class="num ${dn >= 0 ? 'pos' : 'neg'}">${dn >= 0 ? '+' : '−'}${sym()}${fmt(dn)}</span></div>
        <div class="list">${list.map(t => txRow(t)).join('')}</div>`;
    }).join('');
  }

  // ───────────────────────────────────────── DEBTS
  function vDebts() {
    const owe = sum(openDebts('debt'), d => num(d.amount)), owed = sum(openDebts('credit'), d => num(d.amount));
    const emi = sum(activeLoans(), l => num(l.emi)), outs = sum(activeLoans(), loanOutstanding);
    const tab = S.debtTab;
    let body;
    if (tab === 'loans') {
      const ls = activeLoans();
      body = ls.length ? `<div class="card">${ls.map(loanCard).join('')}</div>` : empty('account_balance', 'No active loans');
    } else if (tab === 'settled') {
      const sd = S.debts.filter(d => d.settled), cl = S.loans.filter(l => l.closed);
      body = (sd.length || cl.length) ? `${sd.length ? `<div class="card"><div class="list">${sd.map(debtRow).join('')}</div></div>` : ''}
        ${cl.length ? `<div class="card">${cl.map(loanCard).join('')}</div>` : ''}` : empty('task_alt', 'Nothing settled yet');
    } else {
      const list = openDebts(tab).sort((a, b) => (a.dueDate ? D(a.dueDate) : Infinity) - (b.dueDate ? D(b.dueDate) : Infinity));
      body = list.length ? `<div class="card"><div class="list">${list.map(debtRow).join('')}</div></div>` : empty('handshake', tab === 'debt' ? 'You don’t owe anyone' : 'Nobody owes you');
    }
    return `<div>
      <div class="hdr"><div class="eyebrow">Debts, credits &amp; loans</div>
        <div class="big num"><span class="sym">${esc(sym())}</span>${fmt(owe + outs)}</div><div class="sub">Total you owe incl. loan balance</div></div>
      <div class="stats"><div class="stat"><div class="l">I owe</div><div class="v num neg">${sym()}${fmtS(owe)}</div></div>
        <div class="stat"><div class="l">Owed to me</div><div class="v num pos">${sym()}${fmtS(owed)}</div></div>
        <div class="stat"><div class="l">EMI / month</div><div class="v num">${sym()}${fmtS(emi)}</div></div></div>
      <div class="tabsline" style="margin-top:14px">${[['debt', 'I owe'], ['credit', 'Owed to me'], ['loans', 'Loans'], ['settled', 'Settled']].map(([k, l]) =>
        `<button class="${tab === k ? 'on' : ''}" data-act="dtab" data-v="${k}">${l}</button>`).join('')}</div>
      ${body}
      ${tab !== 'settled' ? `<button class="fab" data-act="${tab === 'loans' ? 'add-loan' : 'add-debt'}">${icon('add')}</button>` : ''}
    </div>`;
  }
  function loanCard(l) {
    const paid = loanPaid(l), pr = l.tenureMonths > 0 ? paid / l.tenureMonths : 0;
    const status = l.closed ? '<span class="badge green">Closed</span>' : loanOverdue(l) ? '<span class="badge red">Overdue</span>'
      : loanDue(l) ? `<span class="badge blue">Due ${l.dueDay}</span>` : loanPaidThisMonth(l) ? '<span class="badge green">Paid</span>' : '';
    return `<div class="lcard" data-act="loan" data-id="${esc(l.id)}"><div class="top">${disc(iconFor(LOAN_TYPES, l.name), l.name)}
      <div style="flex:1;min-width:0"><div class="t1" style="font-weight:500">${esc(l.name)}</div><div class="t2" style="font-size:12.5px;color:var(--text2)">${esc(l.lender)}</div></div>
      <div style="text-align:right"><b class="num">${money(num(l.emi))}</b><div style="font-size:11.5px;color:var(--text3)">per month</div></div></div>
      <div class="bar"><i style="width:${(pr * 100).toFixed(1)}%"></i></div>
      <div class="meta"><span>${paid} / ${l.tenureMonths} EMIs paid · ${Math.round(pr * 100)}%</span>${status}</div>
      <div class="meta"><span>Outstanding</span><b class="num" style="color:var(--text)">${money(loanOutstanding(l))}</b></div></div>`;
  }

  // ───────────────────────────────────────── INVEST
  function vInvest() {
    const inv = S.invs.slice().sort((a, b) => num(b.currentValue) - num(a.currentValue));
    const invested = sum(inv, i => num(i.invested)), current = sum(inv, i => num(i.currentValue)), pnl = current - invested;
    const pct = invested > 0 ? pnl / invested * 100 : 0;
    const alloc = new Map(); inv.forEach(i => alloc.set(i.type, (alloc.get(i.type) || 0) + num(i.currentValue)));
    const slices = [...alloc.entries()].map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount);
    return `<div>
      <div class="hdr"><div class="eyebrow">Portfolio value</div>
        <div class="big num"><span class="sym">${esc(sym())}</span>${fmt(current)}</div>
        <div class="sub"><span class="${pnl >= 0 ? 'pos' : 'neg'}">${pnl >= 0 ? '▲' : '▼'} ${sym()}${fmt(pnl)} (${pct.toFixed(1)}%)</span> · invested ${sym()}${fmt(invested)}</div></div>
      ${inv.length ? `<div class="card p"><div class="where" style="padding:0">${donut(slices, { size: 124, stroke: 12, label: 'Assets', value: String(inv.length) })}
        <div class="lg">${slices.map(s => { const tn = tone(s.category); return `<div class="lline"><div class="r"><span style="width:8px;height:8px;border-radius:50%;background:${tn.fg}"></span><span class="n">${esc(s.category)}</span><b>${current ? Math.round(s.amount / current * 100) : 0}%</b></div></div>`; }).join('')}</div></div></div>
        <div class="card"><div class="list">${inv.map(i => { const p = num(i.currentValue) - num(i.invested), pp = num(i.invested) > 0 ? p / num(i.invested) * 100 : 0;
          return `<div class="item" data-act="inv" data-id="${esc(i.id)}">${disc(iconFor(INV_TYPES, i.type), i.type)}
            <div class="mid"><div class="t1">${esc(i.name)}</div><div class="t2">${esc(i.type)} · invested ${sym()}${fmtS(num(i.invested))} · ${fmtDate(i.date, true)}</div></div>
            <div class="amt num">${money(num(i.currentValue))}<small class="${p >= 0 ? 'pos' : 'neg'}">${p >= 0 ? '+' : '−'}${Math.abs(pp).toFixed(1)}%</small></div></div>`; }).join('')}</div></div>`
        : empty('show_chart', 'Add stocks, funds, gold, crypto or deposits to track your portfolio')}
      <button class="fab" data-act="add-inv">${icon('add')}</button></div>`;
  }

  // ───────────────────────────────────────── GOALS
  function vGoals() {
    const active = S.goals.filter(g => !goalReached(g)), reached = S.goals.filter(goalReached);
    const gT = sum(S.goals, g => num(g.target)), gS = sum(S.goals, g => num(g.saved));
    const card = g => { const p = goalProgress(g), m = goalMonthly(g);
      return `<div class="lcard" data-act="goal" data-id="${esc(g.id)}"><div class="top">${disc(iconFor(GOAL_CATS, g.category), g.category === 'Home' ? 'Rent' : g.category)}
        <div style="flex:1;min-width:0"><div style="font-weight:500">${esc(g.name)}</div><div style="font-size:12.5px;color:var(--text2)">${esc(g.category)}${g.deadline ? ' · by ' + fmtDate(g.deadline, true) : ''}</div></div>
        <b class="num">${Math.round(p * 100)}%</b></div>
        <div class="bar"><i style="width:${(p * 100).toFixed(1)}%;background:${goalReached(g) ? 'var(--pos)' : 'var(--accent)'}"></i></div>
        <div class="meta"><span class="num">${money(num(g.saved))} of ${money(num(g.target))}</span>${goalReached(g) ? '<span class="badge green">Reached</span>' : m != null ? `<span>${sym()}${fmtS(m)}/mo needed</span>` : ''}</div></div>`; };
    return `<div>
      <div class="hdr"><div class="eyebrow">Savings goals</div>
        <div class="big num"><span class="sym">${esc(sym())}</span>${fmt(gS)}</div>
        <div class="sub">saved of ${sym()}${fmt(gT)} · ${active.length} active · ${reached.length} reached</div></div>
      ${active.length ? `<div class="card">${active.map(card).join('')}</div>` : (reached.length ? '' : empty('flag', 'Set a goal — emergency fund, travel, a home…'))}
      ${reached.length ? `<div class="sect"><span class="t">Reached</span></div><div class="card" style="margin-top:0">${reached.map(card).join('')}</div>` : ''}
      <button class="fab" data-act="add-goal">${icon('add')}</button></div>`;
  }

  // ───────────────────────────────────────── CONFIG
  function vConfig() {
    const u = S.user, st = S.settings, canCapture = !!(A && A.captureIsAccessGranted);
    const toggle = (on, act) => `<button class="toggle ${on ? 'on' : ''}" data-act="${act}" aria-pressed="${on}"></button>`;
    return `<div>
      <div class="hdr"><div class="eyebrow">Settings</div><div style="font-size:22px;font-weight:600;margin-top:2px">Config</div></div>
      <div class="slabel">Preferences</div>
      <div class="srow">${icon('payments', 'lead')}<div class="mid"><div class="t1">Currency</div></div>
        <select id="cursel">${CURRENCIES.map(([v, l]) => `<option value="${esc(v)}" ${st.currency === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></div>
      <div class="slabel">Bank accounts</div>
      <div class="srow" data-act="bank-track">${icon('account_balance', 'lead')}<div class="mid"><div class="t1">Bank tracking</div><div class="t2">Tag transactions with the card or account used</div></div>${toggle(st.bankTrackingOn, 'bank-track')}</div>
      ${st.bankTrackingOn ? S.banks.map(b => `<div class="srow">${icon('credit_card', 'lead')}<div class="mid"><div class="t1">${esc(b.name)} ··${esc(b.lastTwo)}</div><div class="t2">${b.isActive === false ? 'Hidden from payment sources' : 'Active'}</div></div>
          ${toggle(b.isActive !== false, 'bank-active" data-id="' + esc(b.id))}<button class="iconbtn" data-act="bank-del" data-id="${esc(b.id)}">${icon('delete')}</button></div>`).join('') +
          `<div class="srow" data-act="bank-add">${icon('add', 'lead acc')}<div class="mid"><div class="t1 acc">Add bank account</div></div></div>` : ''}
      ${canCapture ? `<div class="slabel">Auto-capture</div>
        <div class="srow" data-act="capture-toggle">${icon('notifications_active', 'lead')}<div class="mid"><div class="t1">Capture bank alerts</div>
          <div class="t2 ${S.autoCapture && !S.captureAccess ? 'neg' : ''}">${!S.autoCapture ? 'Turn bank SMS & app alerts into drafts' : S.captureAccess ? 'On · listening for bank alerts' : 'On · notification access needed'}</div></div>${toggle(S.autoCapture, 'capture-toggle')}</div>
        ${S.autoCapture && !S.captureAccess ? `<div class="srow" data-act="capture-settings">${icon('lock_open', 'lead acc')}<div class="mid"><div class="t1 acc">Grant notification access</div></div>${icon('open_in_new', 'acc')}</div>` : ''}
        ${S.autoCapture ? `<div class="srow" data-act="inbox">${icon('inbox', 'lead')}<div class="mid"><div class="t1">Review captured alerts</div></div><span class="badge">${pendingCaptures().length} pending</span></div>` : ''}` : ''}
      <div class="slabel">Account</div>
      <div class="srow">${icon('account_circle', 'lead')}<div class="mid"><div class="t1">${esc(u.displayName || 'Signed in')}</div><div class="t2">${esc(u.email || '')}</div></div>${icon('cloud_done', 'pos')}</div>
      <div class="srow" data-act="signout">${icon('logout', 'lead')}<div class="mid"><div class="t1">Sign out</div></div></div>
      <div class="slabel">Data</div>
      <div class="srow" data-act="export">${icon('ios_share', 'lead')}<div class="mid"><div class="t1">Export backup</div><div class="t2">Share a JSON copy of all your data</div></div></div>
      <div class="srow" data-act="import">${icon('download', 'lead')}<div class="mid"><div class="t1">Import backup</div><div class="t2">Paste JSON · merges by id</div></div></div>
      <div class="srow" data-act="clear">${icon('delete_forever', 'lead neg')}<div class="mid"><div class="t1 neg">Clear all data</div></div></div>
      <div class="slabel">About</div>
      <div class="srow">${icon('info', 'lead')}<div class="mid"><div class="t1">Version</div></div><span class="muted">${VERSION}</span></div>
      <div class="srow">${icon('cloud', 'lead')}<div class="mid"><div class="t1">Data storage</div></div><span class="muted">Google Cloud · Firebase</span></div>
      <div style="text-align:center;padding:28px 0 8px;color:var(--text3);font-size:12px">FinSync · your money, in sync</div>
    </div>`;
  }

  // ───────────────────────────────────────── sheets
  const sheets = [];
  function openSheet(opts) {
    const el = document.createElement('div');
    el.className = 'sheet';
    el.innerHTML = `<div class="grab"></div><div class="sh"><h2>${esc(opts.title)}</h2><button class="iconbtn" data-x="close">${icon('close')}</button></div><div class="body"></div>`;
    document.body.appendChild(el);
    const sh = { el, body: $('.body', el), opts, refresh: null };
    sheets.push(sh);
    el.addEventListener('click', e => {
      if (e.target.closest('[data-x="close"]')) { closeSheet(sh); return; }
      opts.onClick && opts.onClick(e, sh);
    });
    opts.onInput && el.addEventListener('input', e => opts.onInput(e, sh));
    opts.onChange && el.addEventListener('change', e => opts.onChange(e, sh));
    opts.render(sh);
    $('#scrim').classList.add('on');
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on')));
    return sh;
  }
  function closeSheet(sh) {
    sh = sh || sheets[sheets.length - 1];
    if (!sh) return;
    const i = sheets.indexOf(sh); if (i >= 0) sheets.splice(i, 1);
    sh.el.classList.remove('on');
    setTimeout(() => sh.el.remove(), 300);
    if (!sheets.length) $('#scrim').classList.remove('on');
    sh.opts.onClose && sh.opts.onClose();
  }
  function closeAllSheets() { while (sheets.length) closeSheet(sheets[sheets.length - 1]); }
  function confirmSheet(title, text, okLabel, onOk, danger) {
    openSheet({ title, render: sh => { sh.body.innerHTML = `<div class="note">${text}</div><div class="actions">
      <button class="btn outline" data-x="close">Cancel</button><button class="btn ${danger === false ? 'primary' : 'danger'}" data-f="ok">${esc(okLabel)}</button></div>`; },
      onClick: (e, sh) => { if (e.target.closest('[data-f="ok"]')) { closeSheet(sh); onOk(); } } });
  }
  const field = (label, inner) => `<div class="field"><label>${esc(label)}</label>${inner}</div>`;
  const amountInput = (val, id) => `<div class="amount"><span class="s">${esc(sym().trim())}</span><input id="${id || 'f-amt'}" inputmode="decimal" placeholder="0.00" value="${val ? esc(val) : ''}"></div>`;
  const readNum = (root, sel) => { const v = parseFloat(String($(sel, root).value).replace(/,/g, '')); return isFinite(v) ? v : NaN; };
  const amtStr = v => (v == null ? '' : (Math.round(v) === v ? String(v) : Number(v).toFixed(2)));

  // Transaction add / edit / from bank alert
  function txSheet(o) {
    o = o || {};
    const base = o.edit || o.draft;
    const f = {
      type: base ? base.type : 'expense', category: base ? base.category : 'Food',
      source: base ? (base.paymentSource || 'cash') : 'cash', date: base ? ymd(base.date) : ymd(new Date()),
    };
    const title = o.edit ? 'Edit transaction' : o.draft ? 'Add from bank alert' : 'Add transaction';
    openSheet({
      title,
      render: sh => {
        const cats = f.type === 'expense' ? EXP : INC;
        const keep = sh.body.querySelector('#f-amt');
        const amt = keep ? keep.value : (base ? amtStr(num(base.amount)) : '');
        const note = sh.body.querySelector('#f-note') ? sh.body.querySelector('#f-note').value : (base && base.note !== base.category ? base.note : '');
        sh.body.innerHTML = `
          <div class="typeseg"><button class="${f.type === 'expense' ? 'on exp' : ''}" data-f="type" data-v="expense">− Expense</button><button class="${f.type === 'income' ? 'on inc' : ''}" data-f="type" data-v="income">+ Income</button></div>
          ${amountInput(amt)}
          ${field('Category', `<div class="cats">${cats.map(([c, ic]) => { const tn = tone(c); return `<button class="cat ${f.category === c ? 'on' : ''}" style="${f.category === c ? `color:${tn.fg};background:${tn.bg}` : ''}" data-f="cat" data-v="${c}">${icon(ic)}${c}</button>`; }).join('')}</div>`)}
          ${S.settings.bankTrackingOn ? field('Paid with', `<div class="srcs"><button class="src ${f.source === 'cash' ? 'on' : ''}" data-f="src" data-v="cash">Cash</button>${S.banks.filter(b => b.isActive !== false || String(b.id) === f.source).map(b =>
            `<button class="src ${f.source === String(b.id) ? 'on' : ''}" data-f="src" data-v="${esc(b.id)}">${esc(bankTag(b))}</button>`).join('')}</div>`) : ''}
          ${field('Note', `<input class="inp" id="f-note" placeholder="Optional description" value="${esc(note)}">`)}
          ${field('Date', `<input class="inp" id="f-date" type="date" max="${ymd(new Date())}" value="${f.date}">`)}
          ${o.foreign ? `<div class="warnline" style="margin-top:10px">This alert was in ${esc(o.foreign)} — convert the amount to ${esc(S.settings.currency)} before saving.</div>` : ''}
          <div class="actions">${o.edit ? `<button class="btn danger" data-f="delete">${icon('delete')}Delete</button>` : ''}<button class="btn primary" data-f="save">${o.edit ? 'Save changes' : 'Add transaction'}</button></div>`;
      },
      onClick: (e, sh) => {
        const b = e.target.closest('[data-f]'); if (!b) return;
        const k = b.dataset.f;
        if (k === 'type') { f.type = b.dataset.v; f.category = f.type === 'expense' ? 'Food' : 'Salary'; sh.opts.render(sh); }
        else if (k === 'cat') { f.category = b.dataset.v; sh.opts.render(sh); }
        else if (k === 'src') { f.source = b.dataset.v; sh.opts.render(sh); }
        else if (k === 'delete') confirmSheet('Delete transaction?', esc(o.edit.note || o.edit.category), 'Delete', () => { del('transactions', o.edit.id); closeSheet(sh); });
        else if (k === 'save') {
          const amount = readNum(sh.body, '#f-amt');
          if (!(amount > 0)) { toast('Enter an amount'); $('#f-amt', sh.body).focus(); return; }
          f.date = $('#f-date', sh.body).value || ymd(new Date());
          let date;
          if (base && ymd(base.date) === f.date) date = D(base.date);
          else if (f.date === ymd(new Date())) date = new Date();
          else date = fromYmd(f.date);
          const note = $('#f-note', sh.body).value.trim();
          const tx = { id: o.edit ? o.edit.id : newId(), type: f.type, amount, category: f.category, note: note || f.category,
            date: iso(date), paymentSource: f.source || 'cash' };
          put('transactions', tx);
          closeSheet(sh);
          o.onSaved && o.onSaved();
        }
      },
    });
  }

  function debtSheet(type) {
    const f = { type: type || 'debt' };
    openSheet({
      title: 'Add debt or credit',
      render: sh => {
        sh.body.innerHTML = `<div class="typeseg"><button class="${f.type === 'debt' ? 'on exp' : ''}" data-f="t" data-v="debt">I owe</button><button class="${f.type === 'credit' ? 'on inc' : ''}" data-f="t" data-v="credit">Owed to me</button></div>
          ${amountInput($('#f-amt', sh.body) ? $('#f-amt', sh.body).value : '')}
          ${field('Person', `<input class="inp" id="f-person" placeholder="Who?" value="${esc($('#f-person', sh.body) ? $('#f-person', sh.body).value : '')}">`)}
          ${field('Note', `<input class="inp" id="f-note" placeholder="Optional" value="${esc($('#f-note', sh.body) ? $('#f-note', sh.body).value : '')}">`)}
          ${field('Due date (optional)', `<input class="inp" id="f-due" type="date" value="${esc($('#f-due', sh.body) ? $('#f-due', sh.body).value : '')}">`)}
          <div class="actions"><button class="btn primary" data-f="save">Save</button></div>`;
      },
      onClick: (e, sh) => {
        const b = e.target.closest('[data-f]'); if (!b) return;
        if (b.dataset.f === 't') { f.type = b.dataset.v; sh.opts.render(sh); return; }
        if (b.dataset.f !== 'save') return;
        const amount = readNum(sh.body, '#f-amt'), person = $('#f-person', sh.body).value.trim(), due = $('#f-due', sh.body).value;
        if (!(amount > 0)) return toast('Enter an amount');
        if (!person) return toast('Enter a name');
        put('debts', { id: newId(), type: f.type, amount, person, dueDate: due ? iso(fromYmd(due)) : null,
          note: $('#f-note', sh.body).value.trim(), settled: false, createdAt: iso(new Date()) });
        S.debtTab = f.type; closeSheet(sh);
      },
    });
  }
  function debtActions(d) {
    openSheet({ title: d.person, render: sh => {
      sh.body.innerHTML = `<div class="note"><b class="num" style="font-size:24px;color:var(--text)">${money(num(d.amount))}</b><br>
        ${d.type === 'credit' ? 'Owes you' : 'You owe'}${d.note ? ' · ' + esc(d.note) : ''}${d.dueDate ? '<br>Due ' + fmtDate(d.dueDate, true) : ''}${d.settled ? '<br>Settled' : ''}</div>
        <div class="actions"><button class="btn danger" data-f="del">${icon('delete')}Delete</button>${d.settled ? '' : `<button class="btn primary" data-f="settle">${icon('check')}Mark settled</button>`}</div>`;
    }, onClick: (e, sh) => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      if (b.dataset.f === 'settle') { put('debts', Object.assign({}, d, { settled: true })); closeSheet(sh); toast('Marked settled'); }
      if (b.dataset.f === 'del') confirmSheet('Delete this entry?', esc(d.person) + ' · ' + money(num(d.amount)), 'Delete', () => { del('debts', d.id); closeSheet(sh); });
    } });
  }

  function loanSheet() {
    const f = { name: 'Home Loan' };
    openSheet({
      title: 'Add loan',
      render: sh => {
        const v = id => ($('#' + id, sh.body) ? $('#' + id, sh.body).value : '');
        sh.body.innerHTML = `${field('Type', `<div class="srcs">${LOAN_TYPES.map(([n]) => `<button class="src ${f.name === n ? 'on' : ''}" data-f="n" data-v="${n}">${n}</button>`).join('')}</div>`)}
          ${field('Lender', `<input class="inp" id="l-lender" placeholder="e.g. Emirates NBD" value="${esc(v('l-lender'))}">`)}
          ${field('Principal (' + S.settings.currency + ')', `<input class="inp" id="l-principal" inputmode="decimal" placeholder="0.00" value="${esc(v('l-principal'))}">`)}
          ${field('Monthly EMI (' + S.settings.currency + ')', `<input class="inp" id="l-emi" inputmode="decimal" placeholder="0.00" value="${esc(v('l-emi'))}">`)}
          ${field('Tenure (months)', `<input class="inp" id="l-tenure" inputmode="numeric" placeholder="e.g. 240" value="${esc(v('l-tenure'))}">`)}
          ${field('Start date', `<input class="inp" id="l-start" type="date" value="${esc(v('l-start') || ymd(new Date()))}">`)}
          ${field('EMI due day', `<select class="inp" id="l-day">${Array.from({ length: 28 }, (_, i) => i + 1).map(d => `<option ${String(d) === (v('l-day') || '5') ? 'selected' : ''}>${d}</option>`).join('')}</select>`)}
          <div class="actions"><button class="btn primary" data-f="save">Add loan</button></div>`;
      },
      onClick: (e, sh) => {
        const b = e.target.closest('[data-f]'); if (!b) return;
        if (b.dataset.f === 'n') { f.name = b.dataset.v; sh.opts.render(sh); return; }
        if (b.dataset.f !== 'save') return;
        const principal = readNum(sh.body, '#l-principal'), emi = readNum(sh.body, '#l-emi'), tenure = parseInt($('#l-tenure', sh.body).value, 10);
        if (!(emi > 0)) return toast('Enter the EMI');
        if (!(tenure > 0)) return toast('Enter the tenure in months');
        put('loans', { id: newId(), name: f.name, lender: $('#l-lender', sh.body).value.trim(), principal: principal > 0 ? principal : emi * tenure,
          emi, tenureMonths: tenure, startDate: iso(fromYmd($('#l-start', sh.body).value || ymd(new Date()))),
          dueDay: parseInt($('#l-day', sh.body).value, 10) || 5, paidMonths: [], closed: false });
        S.debtTab = 'loans'; closeSheet(sh);
      },
    });
  }
  function loanActions(l) {
    openSheet({ title: l.name, render: sh => {
      sh.body.innerHTML = `<div class="note">${esc(l.lender)}<br><b class="num" style="font-size:22px;color:var(--text)">${money(num(l.emi))}</b> / month · due on day ${l.dueDay}<br>
        ${loanPaid(l)} of ${l.tenureMonths} EMIs paid · ${money(loanOutstanding(l))} outstanding</div>
        <div class="actions"><button class="btn danger" data-f="del">${icon('delete')}</button>
          ${l.closed ? '' : `<button class="btn outline" data-f="close">Close loan</button>`}
          ${loanDue(l) ? `<button class="btn primary" data-f="paid">${icon('check')}EMI paid</button>` : ''}</div>`;
    }, onClick: (e, sh) => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      if (b.dataset.f === 'paid') {
        const pm = (l.paidMonths || []).slice(); const k = ym(new Date()); if (!pm.includes(k)) pm.push(k);
        const nl = Object.assign({}, l, { paidMonths: pm }); if (loanLeft(nl) === 0) nl.closed = true;
        put('loans', nl); closeSheet(sh); toast('EMI marked paid');
      }
      if (b.dataset.f === 'close') { put('loans', Object.assign({}, l, { closed: true })); closeSheet(sh); }
      if (b.dataset.f === 'del') confirmSheet('Delete loan?', esc(l.name), 'Delete', () => { del('loans', l.id); closeSheet(sh); });
    } });
  }

  function invSheet() {
    const f = { type: 'Stocks' };
    openSheet({ title: 'Add investment', render: sh => {
      const v = id => ($('#' + id, sh.body) ? $('#' + id, sh.body).value : '');
      sh.body.innerHTML = `${field('Name', `<input class="inp" id="i-name" placeholder="e.g. S&P 500 ETF" value="${esc(v('i-name'))}">`)}
        ${field('Type', `<div class="cats">${INV_TYPES.map(([t, ic]) => { const tn = tone(t); return `<button class="cat ${f.type === t ? 'on' : ''}" style="${f.type === t ? `color:${tn.fg};background:${tn.bg}` : ''}" data-f="t" data-v="${t}">${icon(ic)}${t}</button>`; }).join('')}</div>`)}
        ${field('Amount invested', `<input class="inp" id="i-inv" inputmode="decimal" placeholder="0.00" value="${esc(v('i-inv'))}">`)}
        ${field('Current value (optional)', `<input class="inp" id="i-cur" inputmode="decimal" placeholder="Same as invested" value="${esc(v('i-cur'))}">`)}
        ${field('Date invested', `<input class="inp" id="i-date" type="date" value="${esc(v('i-date') || ymd(new Date()))}">`)}
        ${field('Note', `<input class="inp" id="i-note" placeholder="Optional" value="${esc(v('i-note'))}">`)}
        <div class="actions"><button class="btn primary" data-f="save">Add investment</button></div>`;
    }, onClick: (e, sh) => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      if (b.dataset.f === 't') { f.type = b.dataset.v; sh.opts.render(sh); return; }
      if (b.dataset.f !== 'save') return;
      const name = $('#i-name', sh.body).value.trim(), invested = readNum(sh.body, '#i-inv'); let cur = readNum(sh.body, '#i-cur');
      if (!name) return toast('Enter a name');
      if (!(invested > 0)) return toast('Enter the amount invested');
      if (!(cur >= 0)) cur = invested;
      put('investments', { id: newId(), name, type: f.type, invested, currentValue: cur, date: iso(fromYmd($('#i-date', sh.body).value || ymd(new Date()))), note: $('#i-note', sh.body).value.trim() });
      closeSheet(sh);
    } });
  }
  function invActions(i) {
    openSheet({ title: i.name, render: sh => {
      sh.body.innerHTML = `<div class="note">${esc(i.type)} · invested ${money(num(i.invested))} on ${fmtDate(i.date, true)}${i.note ? '<br>' + esc(i.note) : ''}</div>
        ${field('Current value', `<input class="inp" id="i-cur" inputmode="decimal" value="${esc(amtStr(num(i.currentValue)))}">`)}
        <div class="actions"><button class="btn danger" data-f="del">${icon('delete')}</button><button class="btn primary" data-f="save">Update value</button></div>`;
    }, onClick: (e, sh) => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      if (b.dataset.f === 'save') { const v = readNum(sh.body, '#i-cur'); if (!(v >= 0)) return toast('Enter a value'); put('investments', Object.assign({}, i, { currentValue: v })); closeSheet(sh); }
      if (b.dataset.f === 'del') confirmSheet('Delete investment?', esc(i.name), 'Delete', () => { del('investments', i.id); closeSheet(sh); });
    } });
  }

  function goalSheet(g) {
    const f = { category: g ? g.category : 'Emergency' };
    openSheet({ title: g ? 'Edit goal' : 'New goal', render: sh => {
      const v = (id, d) => ($('#' + id, sh.body) ? $('#' + id, sh.body).value : d);
      sh.body.innerHTML = `${field('Goal name', `<input class="inp" id="g-name" placeholder="e.g. Emergency fund" value="${esc(v('g-name', g ? g.name : ''))}">`)}
        ${field('Category', `<div class="cats">${GOAL_CATS.map(([c, ic]) => { const tn = tone(c === 'Home' ? 'Rent' : c); return `<button class="cat ${f.category === c ? 'on' : ''}" style="${f.category === c ? `color:${tn.fg};background:${tn.bg}` : ''}" data-f="c" data-v="${c}">${icon(ic)}${c}</button>`; }).join('')}</div>`)}
        ${field('Target (' + S.settings.currency + ')', `<input class="inp" id="g-target" inputmode="decimal" placeholder="0" value="${esc(v('g-target', g ? amtStr(num(g.target)) : ''))}">`)}
        ${field('Already saved', `<input class="inp" id="g-saved" inputmode="decimal" placeholder="0" value="${esc(v('g-saved', g ? amtStr(num(g.saved)) : ''))}">`)}
        ${field('Target date (optional)', `<input class="inp" id="g-date" type="date" value="${esc(v('g-date', g && g.deadline ? ymd(g.deadline) : ''))}">`)}
        <div class="actions"><button class="btn primary" data-f="save">${g ? 'Save goal' : 'Create goal'}</button></div>`;
    }, onClick: (e, sh) => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      if (b.dataset.f === 'c') { f.category = b.dataset.v; sh.opts.render(sh); return; }
      if (b.dataset.f !== 'save') return;
      const name = $('#g-name', sh.body).value.trim(), target = readNum(sh.body, '#g-target'); let saved = readNum(sh.body, '#g-saved');
      if (!name) return toast('Name your goal');
      if (!(target > 0)) return toast('Enter a target');
      if (!(saved >= 0)) saved = 0;
      const dd = $('#g-date', sh.body).value;
      put('goals', { id: g ? g.id : newId(), name, category: f.category, target, saved, deadline: dd ? iso(fromYmd(dd)) : null, createdAt: g ? g.createdAt : iso(new Date()) });
      closeSheet(sh);
    } });
  }
  function goalActions(g) {
    openSheet({ title: g.name, render: sh => {
      const m = goalMonthly(g);
      sh.body.innerHTML = `<div class="note"><b class="num" style="font-size:22px;color:var(--text)">${money(num(g.saved))}</b> of ${money(num(g.target))} · ${Math.round(goalProgress(g) * 100)}%
        ${m != null ? `<br>Save ${money(m)} a month to hit ${fmtDate(g.deadline, true)}` : ''}</div>
        <div class="bar" style="margin-top:12px"><i style="width:${(goalProgress(g) * 100).toFixed(1)}%"></i></div>
        ${field('Add or withdraw', `<input class="inp" id="g-amt" inputmode="decimal" placeholder="0.00">`)}
        <div class="actions"><button class="btn outline" data-f="out">${icon('remove')}Withdraw</button><button class="btn primary" data-f="in">${icon('add')}Add</button></div>
        <div class="actions" style="margin-top:8px"><button class="btn danger" data-f="del">${icon('delete')}Delete</button><button class="btn tonal" data-f="edit">${icon('edit')}Edit</button></div>`;
    }, onClick: (e, sh) => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      const k = b.dataset.f;
      if (k === 'in' || k === 'out') {
        const a = readNum(sh.body, '#g-amt'); if (!(a > 0)) return toast('Enter an amount');
        put('goals', Object.assign({}, g, { saved: Math.max(0, num(g.saved) + (k === 'in' ? a : -a)) })); closeSheet(sh);
      }
      if (k === 'edit') { closeSheet(sh); goalSheet(g); }
      if (k === 'del') confirmSheet('Delete goal?', esc(g.name), 'Delete', () => { del('goals', g.id); closeSheet(sh); });
    } });
  }

  function bankSheet() {
    openSheet({ title: 'Add bank account', render: sh => {
      sh.body.innerHTML = `${field('Bank or card name', `<input class="inp" id="b-name" placeholder="e.g. ENBD, ADCB, HDFC">`)}
        ${field('Last 2 digits of account or card', `<input class="inp" id="b-two" inputmode="numeric" maxlength="2" placeholder="00">`)}
        <div class="note" style="margin-top:10px">Bank alerts that mention a card or account ending in these digits are matched to this account automatically.</div>
        <div class="actions"><button class="btn primary" data-f="save">Add bank</button></div>`;
    }, onClick: (e, sh) => {
      if (!e.target.closest('[data-f="save"]')) return;
      const name = $('#b-name', sh.body).value.trim(), two = $('#b-two', sh.body).value.trim();
      if (!name) return toast('Enter a name');
      if (!/^\d{2}$/.test(two)) return toast('Enter exactly 2 digits');
      put('bankAccounts', { id: newId(), name, lastTwo: two, isActive: true }); closeSheet(sh);
    } });
  }

  // ───────────────────────────────────────── backup
  function exportJson() {
    return JSON.stringify({ app: 'FinSync', exportedAt: iso(new Date()), settings: { isDark: S.settings.isDark, currency: S.settings.currency, bankTrackingOn: S.settings.bankTrackingOn },
      transactions: S.tx, debts: S.debts, loans: S.loans, investments: S.invs, bankAccounts: S.banks, goals: S.goals }, null, 2);
  }
  function doExport() {
    const json = exportJson();
    if (A && A.shareText) { A.shareText('FinSync backup ' + ymd(new Date()), json); return; }
    (navigator.clipboard ? navigator.clipboard.writeText(json) : Promise.reject()).then(() => toast('Backup copied'), () => toast('Could not copy'));
  }
  function importSheet() {
    openSheet({ title: 'Import backup', render: sh => {
      sh.body.innerHTML = `<div class="note">Paste the backup JSON. Items with the same id are overwritten; everything else is added.</div>
        <div class="field"><textarea class="inp" id="imp" placeholder='{ "app": "FinSync", … }'></textarea></div>
        <div class="actions"><button class="btn primary" data-f="go">Import</button></div>`;
    }, onClick: async (e, sh) => {
      if (!e.target.closest('[data-f="go"]')) return;
      let data; try { data = JSON.parse($('#imp', sh.body).value); } catch (err) { return toast('That isn’t valid JSON'); }
      let n = 0;
      try {
        const batch = []; for (const col of Object.keys(COLS)) for (const item of (data[col] || [])) { if (item && item.id != null) { batch.push([col, item]); n++; } }
        await writeInChunks(batch.map(([col, item]) => b => b.set(ref(col, item.id), clean(item))));
        if (data.settings && data.settings.currency) saveSettings({ currency: data.settings.currency, bankTrackingOn: !!data.settings.bankTrackingOn });
        closeSheet(sh); toast(`Imported ${n} items`);
      } catch (err) { toast('Import failed: ' + (err.code || err.message)); }
    } });
  }
  async function writeInChunks(ops) {
    for (let i = 0; i < ops.length; i += 400) {
      const b = FB.writeBatch(db); ops.slice(i, i + 400).forEach(op => op(b));
      await b.commit();
    }
  }
  function clearAll() {
    confirmSheet('Clear all data?', 'This permanently deletes every transaction, debt, loan, investment, bank account and goal from your account.', 'Clear everything', async () => {
      const ops = [];
      for (const [col, key] of Object.entries(COLS)) for (const x of S[key]) ops.push(b => b.delete(ref(col, x.id)));
      try { await writeInChunks(ops); toast('All data cleared'); } catch (err) { toast('Clear failed: ' + (err.code || err.message)); }
    });
  }

  // ───────────────────────────────────────── bank-alert capture
  const pendingCaptures = () => (S.autoCapture ? S.captures : []);
  function initCapture() {
    if (!A || !A.captureSetEnabled) return;
    A.captureSetEnabled(S.autoCapture);
    refreshCaptures();
  }
  function refreshCaptures() {
    if (!A || !A.captureGetPending || !S.ready) return;
    S.captureAccess = !!A.captureIsAccessGranted();
    if (!S.autoCapture) { S.captures = []; render(); return; }
    let raws = [];
    try { raws = JSON.parse(A.captureGetPending() || '[]'); } catch (e) { raws = []; }
    const keep = [], junk = [];
    for (const r of raws) {
      const p = BankParser.parse(r.title, r.text, r.app);
      if (!p) { junk.push(r.id); continue; }
      keep.push({ raw: r, p, bankId: matchBank(p, `${r.title} ${r.app}`) });
    }
    keep.sort((a, b) => b.raw.postedAt - a.raw.postedAt);
    S.captures = keep;
    if (junk.length) A.captureRemove(JSON.stringify(junk));
    render();
  }
  function matchBank(p, source) {
    const src = source.toLowerCase();
    if (p.lastDigits && p.lastDigits.length >= 2) {
      const tail = p.lastDigits.slice(-2), hits = S.banks.filter(b => b.lastTwo === tail);
      if (hits.length === 1) return hits[0].id;
      if (hits.length > 1) { const n = hits.find(b => src.includes(String(b.name).toLowerCase())); return (n || hits[0]).id; }
    }
    const byName = S.banks.find(b => String(b.name).length >= 3 && src.includes(String(b.name).toLowerCase()));
    return byName ? byName.id : null;
  }
  const capLabel = c => c.p.merchant || (c.raw.title && c.raw.title.length <= 28 ? c.raw.title : (c.p.type === 'income' ? 'Bank credit' : 'Card payment'));
  function normCur(c) { const u = String(c).trim().toUpperCase(); return ({ '$': 'USD', '€': 'EUR', '£': 'GBP', '¥': 'JPY', '₹': 'INR' })[u] || u; }
  const isForeign = c => normCur(c.p.currency) !== normCur(S.settings.currency);
  function draftOf(c) {
    return { id: c.raw.postedAt, type: c.p.type, amount: c.p.amount, category: c.p.category, note: capLabel(c),
      date: iso(new Date(c.raw.postedAt)), paymentSource: c.bankId != null ? String(c.bankId) : 'cash' };
  }
  function dismissCapture(id) {
    S.captures = S.captures.filter(c => c.raw.id !== id);
    if (A && A.captureRemove) A.captureRemove(JSON.stringify([id]));
    render();
  }
  function acceptCapture(c) {
    dismissCapture(c.raw.id); // first, so it can never be added twice
    put('transactions', Object.assign(draftOf(c), { id: newId() }));
    toast('Added ' + capLabel(c));
  }
  function inboxSheet() {
    openSheet({ title: 'Bank alerts', render: sh => {
      const items = pendingCaptures();
      sh.body.innerHTML = items.length ? `<div class="note" style="margin-bottom:6px">Tap to edit first · ✓ adds as-is · ✕ dismisses</div>` +
        items.map(c => { const inc = c.p.type === 'income', b = c.bankId != null ? bankById(c.bankId) : null;
          const meta = [c.p.category, new Date(c.raw.postedAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }),
            b ? bankTag(b) : c.p.lastDigits ? '··' + c.p.lastDigits : null].filter(Boolean).join(' · ');
          return `<div class="item" style="padding:10px 0;align-items:flex-start" data-f="edit" data-id="${esc(c.raw.id)}">${disc(txIcon(c.p.category), c.p.category)}
            <div class="mid"><div class="row"><span class="t1" style="flex:1">${esc(capLabel(c))}</span><b class="num ${inc ? 'pos' : ''}">${inc ? '+' : '−'}${esc(c.p.currency)} ${fmt(c.p.amount)}</b></div>
              <div class="t2">${esc(meta)}</div><div class="raw">${esc(c.raw.text)}</div>
              ${isForeign(c) ? `<div class="warnline">In ${esc(c.p.currency)} — FinSync uses ${esc(S.settings.currency)}; tap to convert.</div>` : ''}</div>
            <div style="display:flex;flex-direction:column"><button class="iconbtn acc" data-f="ok" data-id="${esc(c.raw.id)}">${icon('check_circle', 'fill')}</button>
              <button class="iconbtn" data-f="no" data-id="${esc(c.raw.id)}">${icon('close')}</button></div></div>`; }).join('') +
        (items.length > 1 ? `<div class="actions"><button class="btn outline" data-f="clear">Dismiss all</button></div>` : '')
        : empty('done_all', 'All caught up');
    }, onClick: (e, sh) => {
      const b = e.target.closest('[data-f]'); if (!b) return;
      const c = S.captures.find(x => x.raw.id === b.dataset.id);
      if (b.dataset.f === 'clear') { const ids = S.captures.map(x => x.raw.id); S.captures = []; if (A) A.captureRemove(JSON.stringify(ids)); render(); return; }
      if (!c) return;
      if (b.dataset.f === 'no') dismissCapture(c.raw.id);
      else if (b.dataset.f === 'ok' && !isForeign(c)) acceptCapture(c);
      else txSheet({ draft: draftOf(c), foreign: isForeign(c) ? c.p.currency : null, onSaved: () => dismissCapture(c.raw.id) });
    } }).refresh = function () { this.opts.render(this); };
  }
  function enableCaptureFlow() {
    openSheet({ title: 'Capture bank alerts?', render: sh => {
      sh.body.innerHTML = `<div class="note">FinSync can read the notifications on this phone to spot bank and card alerts (from SMS and banking apps) and turn them into draft transactions for you to review.
        <ul><li>Alerts are read and parsed on this phone only.</li><li>Nothing is uploaded until you add it as a transaction.</li>
        <li>OTPs and non-bank notifications are ignored and discarded.</li><li>You can turn this off here or in Android settings at any time.</li></ul>
        Next, Android asks you to allow notification access for FinSync.</div>
        <div class="actions"><button class="btn outline" data-x="close">Not now</button><button class="btn primary" data-f="go">Continue</button></div>`;
    }, onClick: (e, sh) => {
      if (!e.target.closest('[data-f="go"]')) return;
      closeSheet(sh); setAutoCapture(true);
      if (!A.captureIsAccessGranted()) A.captureOpenSettings();
    } });
  }
  function setAutoCapture(on) {
    S.autoCapture = on; lsSet('autoCaptureOn', on ? '1' : '0');
    if (A && A.captureSetEnabled) A.captureSetEnabled(on);
    refreshCaptures(); render();
  }

  // ───────────────────────────────────────── events
  const ACT = {
    tab: d => { if (d.sub) S.debtTab = d.sub; S.tab = d.v; render(); },
    signin: startSignIn,
    'add-tx': () => txSheet(),
    'edit-tx': d => { const t = S.tx.find(x => String(x.id) === d.id); if (t) txSheet({ edit: t }); },
    chart: d => { S.flows.chart = d.v; S.flows.cat = null; render(); },
    period: d => {
      if (d.v === 'CUSTOM') { customRange(); return; }
      S.flows.period = d.v; S.flows.cat = null; render();
    },
    month: d => { const m = new Date(S.year, S.month + Number(d.v), 1); S.month = m.getMonth(); S.year = m.getFullYear(); S.flows.cat = null; render(); },
    cat: d => { S.flows.cat = S.flows.cat === d.v ? null : d.v; render(); },
    ffilter: d => { S.flows.filter = d.v; render(); },
    dtab: d => { S.debtTab = d.v; render(); },
    'add-debt': () => debtSheet(S.debtTab === 'credit' ? 'credit' : 'debt'),
    debt: d => { const x = S.debts.find(y => String(y.id) === d.id); if (x) debtActions(x); },
    'add-loan': loanSheet,
    loan: d => { const x = S.loans.find(y => String(y.id) === d.id); if (x) loanActions(x); },
    'add-inv': invSheet,
    inv: d => { const x = S.invs.find(y => String(y.id) === d.id); if (x) invActions(x); },
    'add-goal': () => goalSheet(),
    goal: d => { const x = S.goals.find(y => String(y.id) === d.id); if (x) goalActions(x); },
    'bank-track': () => saveSettings({ bankTrackingOn: !S.settings.bankTrackingOn }),
    'bank-add': bankSheet,
    'bank-active': d => { const b = bankById(d.id); if (b) put('bankAccounts', Object.assign({}, b, { isActive: b.isActive === false })); },
    'bank-del': d => { const b = bankById(d.id); if (b) confirmSheet(`Remove ${esc(b.name)}?`, 'Past transactions linked to this bank stay as they are.', 'Remove', () => del('bankAccounts', b.id)); },
    'capture-toggle': () => (S.autoCapture ? setAutoCapture(false) : enableCaptureFlow()),
    'capture-settings': () => A && A.captureOpenSettings(),
    inbox: inboxSheet,
    signout: () => confirmSheet('Sign out?', 'Your data stays safe in your Google account.', 'Sign out', signOutAll, false),
    export: doExport,
    import: importSheet,
    clear: clearAll,
  };
  function customRange() {
    const c = S.flows.custom || { from: ymd(new Date(Date.now() - 29 * 864e5)), to: ymd(new Date()) };
    openSheet({ title: 'Custom range', render: sh => {
      sh.body.innerHTML = `${field('From', `<input class="inp" id="r-from" type="date" max="${ymd(new Date())}" value="${c.from}">`)}
        ${field('To', `<input class="inp" id="r-to" type="date" max="${ymd(new Date())}" value="${c.to}">`)}
        <div class="actions"><button class="btn primary" data-f="ok">Apply</button></div>`;
    }, onClick: (e, sh) => {
      if (!e.target.closest('[data-f="ok"]')) return;
      let from = $('#r-from', sh.body).value, to = $('#r-to', sh.body).value;
      if (!from || !to) return toast('Pick both dates');
      if (from > to) [from, to] = [to, from];
      S.flows.custom = { from, to }; S.flows.period = 'CUSTOM'; S.flows.cat = null; closeSheet(sh); render();
    } });
  }
  document.addEventListener('click', e => {
    if (e.target.closest('.sheet')) return;
    const el = e.target.closest('[data-act]');
    if (!el) return;
    // a toggle inside a row: let the toggle's own action win
    const fn = ACT[el.dataset.act];
    if (fn) { e.stopPropagation(); fn(el.dataset, el); }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'fsearch') { S.flows.q = e.target.value.trim(); const l = $('#flist'); if (l) l.innerHTML = flowsList(); }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'cursel') saveSettings({ currency: e.target.value });
  });
  $('#scrim').addEventListener('click', () => closeSheet());

  // ───────────────────────────────────────── native hooks
  window.FinSync = {
    onGoogleToken, onGoogleError,
    onCaptureChanged: refreshCaptures,
    onResume: () => refreshCaptures(),
    onBack: () => {
      if (sheets.length) { closeSheet(); return true; }
      if (S.user && S.tab !== 'home') { S.tab = 'home'; render(); return true; }
      return false;
    },
    exportJson: () => exportJson(), // debugging
  };

  initFirebase();
})();
