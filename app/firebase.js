(()=>{var Xd=()=>{};var ef=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},hy=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],a=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{let s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},tf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],a=i+1<n.length,c=a?n[i+1]:0,u=i+2<n.length,h=u?n[i+2]:0,f=s>>2,m=(s&3)<<4|c>>4,v=(c&15)<<2|h>>6,S=h&63;u||(S=64,a||(v=64)),r.push(t[f],t[m],t[v],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ef(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):hy(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let h=i<n.length?t[n.charAt(i)]:64;++i;let m=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||h==null||m==null)throw new rc;let v=s<<2|c>>4;if(r.push(v),h!==64){let S=c<<4&240|h>>2;if(r.push(S),m!==64){let C=h<<6&192|m;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},rc=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},dy=function(n){let e=ef(n);return tf.encodeByteArray(e,!0)},sc=function(n){return dy(n).replace(/\./g,"")},ws=function(n){try{return tf.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function oc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var fy=()=>oc().__FIREBASE_DEFAULTS__,py=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},my=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&ws(n[1]);return e&&JSON.parse(e)},ac=()=>{try{return Xd()||fy()||py()||my()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}};var nf=()=>{var n;return(n=ac())===null||n===void 0?void 0:n.config},rf=n=>{var e;return(e=ac())===null||e===void 0?void 0:e[`_${n}`]};var Is=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function jn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function cc(n){return(await fetch(n,{credentials:"include"})).ok}function ce(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function sf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ce())}function of(){var n;let e=(n=ac())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function af(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function cf(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function uf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function lf(){let n=ce();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function uc(){return!of()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function lc(){return!of()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Es(){try{return typeof indexedDB=="object"}catch{return!1}}function hf(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var gy="FirebaseError",Fe=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=gy,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ut.prototype.create)}},ut=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?_y(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Fe(i,c,r)}};function _y(n,e){return n.replace(yy,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var yy=/\{\$([^}]+)}/g;function df(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Tt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],a=e[i];if(Zd(s)&&Zd(a)){if(!Tt(s,a))return!1}else if(s!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Zd(n){return n!==null&&typeof n=="object"}function zn(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function $n(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Gn(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function ff(n,e){let t=new ic(n,e);return t.subscribe.bind(t)}var ic=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");vy(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=nc),i.error===void 0&&(i.error=nc),i.complete===void 0&&(i.complete=nc);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function vy(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function nc(){}var RT=4*60*60*1e3;function de(n){return n&&n._delegate?n._delegate:n}var je=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var tn="[DEFAULT]";var hc=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Is;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wy(e))try{this.getOrInitializeService({instanceIdentifier:tn})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tn){return this.instances.has(e)}getOptions(e=tn){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,a]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Iy(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=tn){return this.component?this.component.multipleInstances?e:tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Iy(n){return n===tn?void 0:n}function wy(n){return n.instantiationMode==="EAGER"}var Ts=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new hc(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Ey=[],H;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(H||(H={}));var Ty={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},Ay=H.INFO,by={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},Sy=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=by[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},At=class{constructor(e){this.name=e,this._logLevel=Ay,this._logHandler=Sy,this._userLogHandler=null,Ey.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ty[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}};var Ry=(n,e)=>e.some(t=>n instanceof t),pf,mf;function Py(){return pf||(pf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Cy(){return mf||(mf=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var gf=new WeakMap,fc=new WeakMap,_f=new WeakMap,dc=new WeakMap,mc=new WeakMap;function Dy(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Xe(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&gf.set(t,n)}).catch(()=>{}),mc.set(e,n),e}function ky(n){if(fc.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});fc.set(n,e)}var pc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return fc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||_f.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Xe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function yf(n){pc=n(pc)}function Ny(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(As(this),e,...t);return _f.set(r,e.sort?e.sort():[e]),Xe(r)}:Cy().includes(n)?function(...e){return n.apply(As(this),e),Xe(gf.get(this))}:function(...e){return Xe(n.apply(As(this),e))}}function Oy(n){return typeof n=="function"?Ny(n):(n instanceof IDBTransaction&&ky(n),Ry(n,Py())?new Proxy(n,pc):n)}function Xe(n){if(n instanceof IDBRequest)return Dy(n);if(dc.has(n))return dc.get(n);let e=Oy(n);return e!==n&&(dc.set(n,e),mc.set(e,n)),e}var As=n=>mc.get(n);function If(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(n,e),c=Xe(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Xe(a.result),u.oldVersion,u.newVersion,Xe(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}var Vy=["get","getKey","getAll","getAllKeys","count"],xy=["put","add","delete","clear"],gc=new Map;function vf(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(gc.get(e))return gc.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=xy.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Vy.includes(t)))return;let s=async function(a,...c){let u=this.transaction(a,i?"readwrite":"readonly"),h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),i&&u.done]))[0]};return gc.set(e,s),s}yf(n=>({...n,get:(e,t,r)=>vf(e,t)||n.get(e,t,r),has:(e,t)=>!!vf(e,t)||n.has(e,t)}));var yc=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ly(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Ly(n){let e=n.getComponent();return e?.type==="VERSION"}var vc="@firebase/app",wf="0.13.2";var lt=new At("@firebase/app"),My="@firebase/app-compat",Fy="@firebase/analytics-compat",Uy="@firebase/analytics",By="@firebase/app-check-compat",qy="@firebase/app-check",jy="@firebase/auth",zy="@firebase/auth-compat",$y="@firebase/database",Gy="@firebase/data-connect",Wy="@firebase/database-compat",Ky="@firebase/functions",Hy="@firebase/functions-compat",Qy="@firebase/installations",Jy="@firebase/installations-compat",Yy="@firebase/messaging",Xy="@firebase/messaging-compat",Zy="@firebase/performance",ev="@firebase/performance-compat",tv="@firebase/remote-config",nv="@firebase/remote-config-compat",rv="@firebase/storage",iv="@firebase/storage-compat",sv="@firebase/firestore",ov="@firebase/ai",av="@firebase/firestore-compat",cv="firebase",uv="11.10.0";var lv="[DEFAULT]",hv={[vc]:"fire-core",[My]:"fire-core-compat",[Uy]:"fire-analytics",[Fy]:"fire-analytics-compat",[qy]:"fire-app-check",[By]:"fire-app-check-compat",[jy]:"fire-auth",[zy]:"fire-auth-compat",[$y]:"fire-rtdb",[Gy]:"fire-data-connect",[Wy]:"fire-rtdb-compat",[Ky]:"fire-fn",[Hy]:"fire-fn-compat",[Qy]:"fire-iid",[Jy]:"fire-iid-compat",[Yy]:"fire-fcm",[Xy]:"fire-fcm-compat",[Zy]:"fire-perf",[ev]:"fire-perf-compat",[tv]:"fire-rc",[nv]:"fire-rc-compat",[rv]:"fire-gcs",[iv]:"fire-gcs-compat",[sv]:"fire-fst",[av]:"fire-fst-compat",[ov]:"fire-vertex","fire-js":"fire-js",[cv]:"fire-js-all"};var Ic=new Map,dv=new Map,wc=new Map;function Ef(n,e){try{n.container.addComponent(e)}catch(t){lt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function bt(n){let e=n.name;if(wc.has(e))return lt.debug(`There were multiple attempts to register component ${e}.`),!1;wc.set(e,n);for(let t of Ic.values())Ef(t,n);for(let t of dv.values())Ef(t,n);return!0}function bs(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ve(n){return n==null?!1:n.settings!==void 0}var fv={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},nn=new ut("app","Firebase",fv);var Ec=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new je("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw nn.create("app-deleted",{appName:this._name})}};var St=uv;function Sf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:lv,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw nn.create("bad-app-name",{appName:String(i)});if(t||(t=nf()),!t)throw nn.create("no-options");let s=Ic.get(i);if(s){if(Tt(t,s.options)&&Tt(r,s.config))return s;throw nn.create("duplicate-app",{appName:i})}let a=new Ts(i);for(let u of wc.values())a.addComponent(u);let c=new Ec(t,r,a);return Ic.set(i,c),c}function Ke(n,e,t){var r;let i=(r=hv[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),lt.warn(c.join(" "));return}bt(new je(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var pv="firebase-heartbeat-database",mv=1,ei="firebase-heartbeat-store",_c=null;function Rf(){return _c||(_c=If(pv,mv,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ei)}catch(t){console.warn(t)}}}}).catch(n=>{throw nn.create("idb-open",{originalErrorMessage:n.message})})),_c}async function gv(n){try{let t=(await Rf()).transaction(ei),r=await t.objectStore(ei).get(Pf(n));return await t.done,r}catch(e){if(e instanceof Fe)lt.warn(e.message);else{let t=nn.create("idb-get",{originalErrorMessage:e?.message});lt.warn(t.message)}}}async function Tf(n,e){try{let r=(await Rf()).transaction(ei,"readwrite");await r.objectStore(ei).put(e,Pf(n)),await r.done}catch(t){if(t instanceof Fe)lt.warn(t.message);else{let r=nn.create("idb-set",{originalErrorMessage:t?.message});lt.warn(r.message)}}}function Pf(n){return`${n.name}!${n.options.appId}`}var _v=1024,yv=30,Tc=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Ac(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Af();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>yv){let a=Iv(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){lt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Af(),{heartbeatsToSend:r,unsentEntries:i}=vv(this._heartbeatsCache.heartbeats),s=sc(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return lt.warn(t),""}}};function Af(){return new Date().toISOString().substring(0,10)}function vv(n,e=_v){let t=[],r=n.slice();for(let i of n){let s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),bf(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),bf(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Ac=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Es()?hf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await gv(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Tf(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Tf(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function bf(n){return sc(JSON.stringify({version:2,heartbeats:n})).length}function Iv(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function wv(n){bt(new je("platform-logger",e=>new yc(e),"PRIVATE")),bt(new je("heartbeat",e=>new Tc(e),"PRIVATE")),Ke(vc,wf,n),Ke(vc,wf,"esm2017"),Ke("fire-js","")}wv("");var Ev="firebase",Tv="11.10.0";Ke(Ev,Tv,"app");function Ss(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Gf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Wf=Gf,Kf=new ut("auth","Firebase",Gf());var Os=new At("@firebase/auth");function Sv(n,...e){Os.logLevel<=H.WARN&&Os.warn(`Auth (${St}): ${n}`,...e)}function Ps(n,...e){Os.logLevel<=H.ERROR&&Os.error(`Auth (${St}): ${n}`,...e)}function ze(n,...e){throw Qc(n,...e)}function He(n,...e){return Qc(n,...e)}function Hc(n,e,t){let r=Object.assign(Object.assign({},Wf()),{[e]:t});return new ut("auth","Firebase",r).create(e,{appName:n.name})}function Ct(n){return Hc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Hf(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&ze(n,"argument-error"),Hc(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Qc(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Kf.create(n,...e)}function U(n,e,...t){if(!n)throw Qc(e,...t)}function Ze(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Ps(e),new Error(e)}function dt(n,e){n||Ze(e)}function Dc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Rv(){return Cf()==="http:"||Cf()==="https:"}function Cf(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Pv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Rv()||cf()||"connection"in navigator)?navigator.onLine:!0}function Cv(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var rn=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,dt(t>e,"Short delay should be less than long delay!"),this.isMobile=sf()||uf()}get(){return Pv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Jc(n,e){dt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Vs=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ze("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ze("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ze("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Dv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var kv=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Nv=new rn(3e4,6e4);function ge(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ae(n,e,t,r,i={}){return Qf(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});let c=zn(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);let h=Object.assign({method:e,headers:u},s);return af()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&jn(n.emulatorConfig.host)&&(h.credentials="include"),Vs.fetch()(await Jf(n,n.config.apiHost,t,c),h)})}async function Qf(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},Dv),e);try{let i=new kc(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await s.json();if("needConfirmation"in a)throw ni(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{let c=s.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ni(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ni(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw ni(n,"user-disabled",a);let f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Hc(n,f,h);ze(n,f)}}catch(i){if(i instanceof Fe)throw i;ze(n,"network-request-failed",{message:String(i)})}}async function ln(n,e,t,r,i={}){let s=await Ae(n,e,t,r,i);return"mfaPendingCredential"in s&&ze(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Jf(n,e,t,r){let i=`${e}${t}?${r}`,s=n,a=s.config.emulator?Jc(n.config,i):`${n.config.apiScheme}://${i}`;return kv.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Ov(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var kc=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(He(this.auth,"network-request-failed")),Nv.get())})}};function ni(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=He(n,e,r);return i.customData._tokenResponse=t,i}function Df(n){return n!==void 0&&n.enterprise!==void 0}var xs=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Ov(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function Yf(n,e){return Ae(n,"GET","/v2/recaptchaConfig",ge(n,e))}async function Vv(n,e){return Ae(n,"POST","/v1/accounts:delete",e)}async function Ls(n,e){return Ae(n,"POST","/v1/accounts:lookup",e)}function ri(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Xf(n,e=!1){let t=de(n),r=await t.getIdToken(e),i=Yc(r);U(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:r,authTime:ri(bc(i.auth_time)),issuedAtTime:ri(bc(i.iat)),expirationTime:ri(bc(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function bc(n){return Number(n)*1e3}function Yc(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ps("JWT malformed, contained fewer than 3 sections"),null;try{let i=ws(t);return i?JSON.parse(i):(Ps("Failed to decode base64 JWT payload"),null)}catch(i){return Ps("Caught error parsing JWT payload as JSON",i?.toString()),null}}function kf(n){let e=Yc(n);return U(e,"internal-error"),U(typeof e.exp<"u","internal-error"),U(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function ai(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Fe&&xv(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function xv({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Nc=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var ci=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ri(this.lastLoginAt),this.creationTime=ri(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Ms(n){var e;let t=n.auth,r=await n.getIdToken(),i=await ai(n,Ls(t,{idToken:r}));U(i?.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ep(s.providerUserInfo):[],c=Lv(n.providerData,a),u=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!c?.length,f=u?h:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new ci(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,m)}async function Zf(n){let e=de(n);await Ms(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Lv(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ep(n){return n.map(e=>{var{providerId:t}=e,r=Ss(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function Mv(n,e){let t=await Qf(n,{},async()=>{let r=zn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await Jf(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";let u={method:"POST",headers:c,body:r};return n.emulatorConfig&&jn(n.emulatorConfig.host)&&(u.credentials="include"),Vs.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Fv(n,e){return Ae(n,"POST","/v2/accounts:revokeToken",ge(n,e))}var ii=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken<"u","internal-error"),U(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):kf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){U(e.length!==0,"internal-error");let t=kf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await Mv(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new n;return r&&(U(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(U(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(U(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Ze("not implemented")}};function Rt(n,e){U(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Pt=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Ss(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Nc(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ci(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await ai(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Xf(this,e)}reload(){return Zf(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ms(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ve(this.auth.app))return Promise.reject(Ct(this.auth));let e=await this.getIdToken();return await ai(this,Vv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,u,h,f;let m=(r=t.displayName)!==null&&r!==void 0?r:void 0,v=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(a=t.photoURL)!==null&&a!==void 0?a:void 0,N=(c=t.tenantId)!==null&&c!==void 0?c:void 0,k=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,z=(h=t.createdAt)!==null&&h!==void 0?h:void 0,B=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:M,emailVerified:K,isAnonymous:Y,providerData:$,stsTokenManager:I}=t;U(M&&I,e,"internal-error");let g=ii.fromJSON(this.name,I);U(typeof M=="string",e,"internal-error"),Rt(m,e.name),Rt(v,e.name),U(typeof K=="boolean",e,"internal-error"),U(typeof Y=="boolean",e,"internal-error"),Rt(S,e.name),Rt(C,e.name),Rt(N,e.name),Rt(k,e.name),Rt(z,e.name),Rt(B,e.name);let y=new n({uid:M,auth:e,email:v,emailVerified:K,displayName:m,isAnonymous:Y,photoURL:C,phoneNumber:S,tenantId:N,stsTokenManager:g,createdAt:z,lastLoginAt:B});return $&&Array.isArray($)&&(y.providerData=$.map(w=>Object.assign({},w))),k&&(y._redirectEventId=k),y}static async _fromIdTokenResponse(e,t,r=!1){let i=new ii;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ms(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];U(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?ep(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,c=new ii;c.updateFromIdToken(r);let u=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ci(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(u,h),u}};var Nf=new Map;function ht(n){dt(n instanceof Function,"Expected a class definition");let e=Nf.get(n);return e?(dt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Nf.set(n,e),e)}var Fs=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Fs.type="NONE";var Oc=Fs;function Cs(n,e,t){return`firebase:${n}:${e}:${t}`}var Us=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=Cs(this.userKey,i.apiKey,s),this.fullPersistenceKey=Cs("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await Ls(this.auth,{idToken:e}).catch(()=>{});return t?Pt._fromGetAccountInfoResponse(this.auth,t,e):null}return Pt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(ht(Oc),e,r);let i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h),s=i[0]||ht(Oc),a=Cs(r,e.config.apiKey,e.name),c=null;for(let h of t)try{let f=await h._get(a);if(f){let m;if(typeof f=="string"){let v=await Ls(e,{idToken:f}).catch(()=>{});if(!v)break;m=await Pt._fromGetAccountInfoResponse(e,v,f)}else m=Pt._fromJSON(e,f);h!==s&&(c=m),s=h;break}}catch{}let u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new n(s,e,r):(s=u[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(a)}catch{}})),new n(s,e,r))}};function Of(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ip(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(tp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(op(e))return"Blackberry";if(ap(e))return"Webos";if(np(e))return"Safari";if((e.includes("chrome/")||rp(e))&&!e.includes("edge/"))return"Chrome";if(sp(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function tp(n=ce()){return/firefox\//i.test(n)}function np(n=ce()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function rp(n=ce()){return/crios\//i.test(n)}function ip(n=ce()){return/iemobile/i.test(n)}function sp(n=ce()){return/android/i.test(n)}function op(n=ce()){return/blackberry/i.test(n)}function ap(n=ce()){return/webos/i.test(n)}function Xc(n=ce()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Uv(n=ce()){var e;return Xc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Bv(){return lf()&&document.documentMode===10}function cp(n=ce()){return Xc(n)||sp(n)||ap(n)||op(n)||/windows phone/i.test(n)||ip(n)}function up(n,e=[]){let t;switch(n){case"Browser":t=Of(ce());break;case"Worker":t=`${Of(ce())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${St}/${r}`}var Vc=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((a,c)=>{try{let u=e(s);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function qv(n,e={}){return Ae(n,"GET","/v2/passwordPolicy",ge(n,e))}var jv=6,xc=class{constructor(e){var t,r,i,s;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:jv,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;let u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Lc=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bs(this),this.idTokenSubscription=new Bs(this),this.beforeStateQueue=new Vc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Kf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ht(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Us.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Ls(this,{idToken:e}),r=await Pt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ve(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&u?.user&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ms(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Cv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ve(this.app))return Promise.reject(Ct(this));let t=e?de(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ve(this.app)?Promise.reject(Ct(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ve(this.app)?Promise.reject(Ct(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ht(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await qv(this),t=new xc(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ut("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Fv(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ht(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await Us.create(this,[ht(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),a=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){let u=e.addObserver(t,r,i);return()=>{a=!0,u()}}else{let u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=up(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(Ve(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Sv(`Error while retrieving App Check token: ${t.error}`),t?.token}};function ft(n){return de(n)}var Bs=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=ff(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var io={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function zv(n){io=n}function lp(n){return io.loadJS(n)}function $v(){return io.recaptchaEnterpriseScript}function Gv(){return io.gapiScript}function hp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Mc=class{constructor(){this.enterprise=new Fc}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},Fc=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var Wv="recaptcha-enterprise",si="NO_RECAPTCHA",qs=class{constructor(e){this.type=Wv,this.auth=ft(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{Yf(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let h=new xs(u);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,a(h.siteKey)}}).catch(u=>{c(u)})})}function i(s,a,c){let u=window.grecaptcha;Df(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(h=>{a(h)}).catch(()=>{a(si)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Mc().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&Df(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=$v();u.length!==0&&(u+=c),lp(u).then(()=>{i(c,s,a)}).catch(h=>{a(h)})}}).catch(c=>{a(c)})})}};async function ti(n,e,t,r=!1,i=!1){let s=new qs(n),a;if(i)a=si;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}let c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){let u=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){let u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function oi(n,e,t,r,i){var s,a;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let c=await ti(n,e,t,t==="getOobCode");return r(n,c)}else return r(n,e).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let u=await ti(n,e,t,t==="getOobCode");return r(n,u)}else return Promise.reject(c)});else if(i==="PHONE_PROVIDER")if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("PHONE_PROVIDER")){let c=await ti(n,e,t);return r(n,c).catch(async u=>{var h;if(((h=n._getRecaptchaConfig())===null||h===void 0?void 0:h.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(u.code==="auth/missing-recaptcha-token"||u.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let f=await ti(n,e,t,!1,!0);return r(n,f)}return Promise.reject(u)})}else{let c=await ti(n,e,t,!1,!0);return r(n,c)}else return Promise.reject(i+" provider is not supported.")}async function Kv(n){let e=ft(n),t=await Yf(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new xs(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new qs(e).verify()}function Zc(n,e){let t=bs(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(Tt(s,e??{}))return i;ze(i,"already-initialized")}return t.initialize({options:e})}function Hv(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(ht);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}var sn=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ze("not implemented")}_getIdTokenResponse(e){return Ze("not implemented")}_linkToIdToken(e,t){return Ze("not implemented")}_getReauthenticationResolver(e){return Ze("not implemented")}};async function Qv(n,e){return Ae(n,"POST","/v1/accounts:signUp",e)}async function Jv(n,e){return ln(n,"POST","/v1/accounts:signInWithPassword",ge(n,e))}async function Yv(n,e){return ln(n,"POST","/v1/accounts:signInWithEmailLink",ge(n,e))}async function Xv(n,e){return ln(n,"POST","/v1/accounts:signInWithEmailLink",ge(n,e))}var ui=class n extends sn{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return oi(e,t,"signInWithPassword",Jv,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Yv(e,{email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return oi(e,r,"signUpPassword",Qv,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Xv(e,{idToken:t,email:this._email,oobCode:this._password});default:ze(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Wn(n,e){return ln(n,"POST","/v1/accounts:signInWithIdp",ge(n,e))}var Zv="http://localhost",on=class n extends sn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ze("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Ss(t,["providerId","signInMethod"]);if(!r||!i)return null;let a=new n(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return Wn(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Wn(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Wn(e,t)}buildRequest(){let e={requestUri:Zv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=zn(t)}return e}};async function Vf(n,e){return Ae(n,"POST","/v1/accounts:sendVerificationCode",ge(n,e))}async function eI(n,e){return ln(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,e))}async function tI(n,e){let t=await ln(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,e));if(t.temporaryProof)throw ni(n,"account-exists-with-different-credential",t);return t}var nI={USER_NOT_FOUND:"user-not-found"};async function rI(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return ln(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,t),nI)}var li=class n extends sn{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return eI(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return tI(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return rI(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function iI(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function sI(n){let e=$n(Gn(n)).link,t=e?$n(Gn(e)).deep_link_id:null,r=$n(Gn(n)).deep_link_id;return(r?$n(Gn(r)).link:null)||r||t||e||n}var js=class n{constructor(e){var t,r,i,s,a,c;let u=$n(Gn(e)),h=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,m=iI((i=u.mode)!==null&&i!==void 0?i:null);U(h&&f&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=u.lang)!==null&&a!==void 0?a:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=sI(e);try{return new n(t)}catch{return null}}};var Kn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return ui._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=js.parseLink(t);return U(r,"argument-error"),ui._fromEmailAndCode(e,r.code,r.tenantId)}};Kn.PROVIDER_ID="password";Kn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Kn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Hn=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var an=class extends Hn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var hi=class n extends an{constructor(){super("facebook.com")}static credential(e){return on._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};hi.FACEBOOK_SIGN_IN_METHOD="facebook.com";hi.PROVIDER_ID="facebook.com";var cn=class n extends an{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return on._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};cn.GOOGLE_SIGN_IN_METHOD="google.com";cn.PROVIDER_ID="google.com";var di=class n extends an{constructor(){super("github.com")}static credential(e){return on._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};di.GITHUB_SIGN_IN_METHOD="github.com";di.PROVIDER_ID="github.com";var fi=class n extends an{constructor(){super("twitter.com")}static credential(e,t){return on._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};fi.TWITTER_SIGN_IN_METHOD="twitter.com";fi.PROVIDER_ID="twitter.com";var pi=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await Pt._fromIdTokenResponse(e,r,i),a=xf(r);return new n({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=xf(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function xf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Uc=class n extends Fe{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function dp(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Uc._fromErrorAndOperation(n,s,e,r):s})}async function oI(n,e,t=!1){let r=await ai(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return pi._forOperation(n,"link",r)}async function aI(n,e,t=!1){let{auth:r}=n;if(Ve(r.app))return Promise.reject(Ct(r));let i="reauthenticate";try{let s=await ai(n,dp(r,i,e,n),t);U(s.idToken,r,"internal-error");let a=Yc(s.idToken);U(a,r,"internal-error");let{sub:c}=a;return U(n.uid===c,r,"user-mismatch"),pi._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&ze(r,"user-mismatch"),s}}async function fp(n,e,t=!1){if(Ve(n.app))return Promise.reject(Ct(n));let r="signIn",i=await dp(n,r,e),s=await pi._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function eu(n,e){return fp(ft(n),e)}function tu(n,e,t,r){return de(n).onAuthStateChanged(e,t,r)}function nu(n){return de(n).signOut()}function Lf(n,e){return Ae(n,"POST","/v2/accounts/mfaEnrollment:start",ge(n,e))}function cI(n,e){return Ae(n,"POST","/v2/accounts/mfaEnrollment:finalize",ge(n,e))}function uI(n,e){return Ae(n,"POST","/v2/accounts/mfaEnrollment:start",ge(n,e))}function lI(n,e){return Ae(n,"POST","/v2/accounts/mfaEnrollment:finalize",ge(n,e))}var zs="__sak";var $s=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(zs,"1"),this.storage.removeItem(zs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var hI=1e3,dI=10,Gs=class extends $s{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=cp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}let r=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);Bv()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,dI):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},hI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Gs.type="LOCAL";var ru=Gs;var fI=1e3;function Sc(n){var e,t;let r=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),i=RegExp(`${r}=([^;]+)`);return(t=(e=document.cookie.match(i))===null||e===void 0?void 0:e[1])!==null&&t!==void 0?t:null}function Rc(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var Bc=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){var e;return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:(e=navigator.cookieEnabled)!==null&&e!==void 0?e:!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=Rc(e);if(window.cookieStore){let r=await window.cookieStore.get(t);return r?.value}return Sc(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=Rc(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=Rc(e);if(window.cookieStore){let c=h=>{let f=h.changed.find(v=>v.name===r);f&&t(f.value),h.deleted.find(v=>v.name===r)&&t(null)},u=()=>window.cookieStore.removeEventListener("change",c);return this.listenerUnsubscribes.set(t,u),window.cookieStore.addEventListener("change",c)}let i=Sc(r),s=setInterval(()=>{let c=Sc(r);c!==i&&(t(c),i=c)},fI),a=()=>clearInterval(s);this.listenerUnsubscribes.set(t,a)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};Bc.type="COOKIE";var Ws=class extends $s{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Ws.type="SESSION";var pp=Ws;function pI(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Ks=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(a).map(async h=>h(t.origin,s)),u=await pI(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Ks.receivers=[];function iu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var qc=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,u)=>{let h=iu("",20);i.port1.start();let f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(m){let v=m;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(v.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function et(){return window}function mI(n){et().location.href=n}function mp(){return typeof et().WorkerGlobalScope<"u"&&typeof et().importScripts=="function"}async function gI(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function _I(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function yI(){return mp()?self:null}var gp="firebaseLocalStorageDb",vI=1,Hs="firebaseLocalStorage",_p="fbase_key",un=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function so(n,e){return n.transaction([Hs],e?"readwrite":"readonly").objectStore(Hs)}function II(){let n=indexedDB.deleteDatabase(gp);return new un(n).toPromise()}function jc(){let n=indexedDB.open(gp,vI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Hs,{keyPath:_p})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Hs)?e(r):(r.close(),await II(),e(await jc()))})})}async function Mf(n,e,t){let r=so(n,!0).put({[_p]:e,value:t});return new un(r).toPromise()}async function wI(n,e){let t=so(n,!1).get(e),r=await new un(t).toPromise();return r===void 0?null:r.value}function Ff(n,e){let t=so(n,!0).delete(e);return new un(t).toPromise()}var EI=800,TI=3,Qs=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await jc(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>TI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return mp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ks._getInstance(yI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await gI(),!this.activeServiceWorker)return;this.sender=new qc(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||_I()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await jc();return await Mf(e,zs,"1"),await Ff(e,zs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Mf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>wI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ff(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=so(i,!1).getAll();return new un(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),EI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Qs.type="LOCAL";var su=Qs;function Uf(n,e){return Ae(n,"POST","/v2/accounts/mfaSignIn:start",ge(n,e))}function AI(n,e){return Ae(n,"POST","/v2/accounts/mfaSignIn:finalize",ge(n,e))}function bI(n,e){return Ae(n,"POST","/v2/accounts/mfaSignIn:finalize",ge(n,e))}var nA=hp("rcb"),rA=new rn(3e4,6e4);var Ds="recaptcha";async function SI(n,e,t){var r;if(!n._getRecaptchaConfig())try{await Kv(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){let s=i.session;if("phoneNumber"in i){U(s.type==="enroll",n,"internal-error");let a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await oi(n,a,"mfaSmsEnrollment",async(f,m)=>{if(m.phoneEnrollmentInfo.captchaResponse===si){U(t?.type===Ds,f,"argument-error");let v=await Pc(f,m,t);return Lf(f,v)}return Lf(f,m)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneSessionInfo.sessionInfo}else{U(s.type==="signin",n,"internal-error");let a=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;U(a,n,"missing-multi-factor-info");let c={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await oi(n,c,"mfaSmsSignIn",async(m,v)=>{if(v.phoneSignInInfo.captchaResponse===si){U(t?.type===Ds,m,"argument-error");let S=await Pc(m,v,t);return Uf(m,S)}return Uf(m,v)},"PHONE_PROVIDER").catch(m=>Promise.reject(m))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await oi(n,s,"sendVerificationCode",async(h,f)=>{if(f.captchaResponse===si){U(t?.type===Ds,h,"argument-error");let m=await Pc(h,f,t);return Vf(h,m)}return Vf(h,f)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).sessionInfo}}finally{t?._reset()}}async function Pc(n,e,t){U(t.type===Ds,n,"argument-error");let r=await t.verify();U(typeof r=="string",n,"argument-error");let i=Object.assign({},e);if("phoneEnrollmentInfo"in i){let s=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,c=i.phoneEnrollmentInfo.clientType,u=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:a,clientType:c,recaptchaVersion:u}}),i}else if("phoneSignInInfo"in i){let s=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,c=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:a,recaptchaVersion:c}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var mi=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=ft(e)}verifyPhoneNumber(e,t){return SI(this.auth,e,de(t))}static credential(e,t){return li._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?li._fromTokenResponse(t,r):null}};mi.PROVIDER_ID="phone";mi.PHONE_SIGN_IN_METHOD="phone";function ou(n,e){return e?ht(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var gi=class extends sn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Wn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Wn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Wn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function RI(n){return fp(n.auth,new gi(n),n.bypassAuthState)}function PI(n){let{auth:e,user:t}=n;return U(t,e,"internal-error"),aI(t,new gi(n),n.bypassAuthState)}async function CI(n){let{auth:e,user:t}=n;return U(t,e,"internal-error"),oI(t,new gi(n),n.bypassAuthState)}var Js=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}let u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return RI;case"linkViaPopup":case"linkViaRedirect":return CI;case"reauthViaPopup":case"reauthViaRedirect":return PI;default:ze(this.auth,"internal-error")}}resolve(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var DI=new rn(2e3,1e4);async function au(n,e,t){if(Ve(n.app))return Promise.reject(He(n,"operation-not-supported-in-this-environment"));let r=ft(n);Hf(n,e,Hn);let i=ou(r,t);return new Ys(r,"signInViaPopup",e,i).executeNotNull()}var Ys=class n extends Js{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){dt(this.filter.length===1,"Popup operations only handle one event");let e=iu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(He(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(He(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(He(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,DI.get())};e()}};Ys.currentPopupAction=null;var kI="pendingRedirect",ks=new Map,zc=class extends Js{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ks.get(this.auth._key());if(!e){try{let r=await NI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ks.set(this.auth._key(),e)}return this.bypassAuthState||ks.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function NI(n,e){let t=vp(e),r=yp(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}async function OI(n,e){return yp(n)._set(vp(e),"true")}function VI(n,e){ks.set(n._key(),e)}function yp(n){return ht(n._redirectPersistence)}function vp(n){return Cs(kI,n.config.apiKey,n.name)}function cu(n,e,t){return xI(n,e,t)}async function xI(n,e,t){if(Ve(n.app))return Promise.reject(Ct(n));let r=ft(n);Hf(n,e,Hn),await r._initializationPromise;let i=ou(r,t);return await OI(i,r),i._openRedirect(r,e,"signInViaRedirect")}async function uu(n,e){return await ft(n)._initializationPromise,Ip(n,e,!1)}async function Ip(n,e,t=!1){if(Ve(n.app))return Promise.reject(Ct(n));let r=ft(n),i=ou(r,e),a=await new zc(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var LI=10*60*1e3,$c=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!MI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!wp(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(He(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=LI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Bf(e))}saveEventToCache(e){this.cachedEventUids.add(Bf(e)),this.lastProcessedEventTime=Date.now()}};function Bf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function wp({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function MI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return wp(n);default:return!1}}async function FI(n,e={}){return Ae(n,"GET","/v1/projects",e)}var UI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,BI=/^https?/;async function qI(n){if(n.config.emulator)return;let{authorizedDomains:e}=await FI(n);for(let t of e)try{if(jI(t))return}catch{}ze(n,"unauthorized-domain")}function jI(n){let e=Dc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!BI.test(t))return!1;if(UI.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var zI=new rn(3e4,6e4);function qf(){let n=et().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function $I(n){return new Promise((e,t)=>{var r,i,s;function a(){qf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qf(),t(He(n,"network-request-failed"))},timeout:zI.get()})}if(!((i=(r=et().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=et().gapi)===null||s===void 0)&&s.load)a();else{let c=hp("iframefcb");return et()[c]=()=>{gapi.load?a():t(He(n,"network-request-failed"))},lp(`${Gv()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ns=null,e})}var Ns=null;function GI(n){return Ns=Ns||$I(n),Ns}var WI=new rn(5e3,15e3),KI="__/auth/iframe",HI="emulator/auth/iframe",QI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},JI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function YI(n){let e=n.config;U(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Jc(e,HI):`https://${n.config.authDomain}/${KI}`,r={apiKey:e.apiKey,appName:n.name,v:St},i=JI.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${zn(r).slice(1)}`}async function XI(n){let e=await GI(n),t=et().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:YI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:QI,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let a=He(n,"network-request-failed"),c=et().setTimeout(()=>{s(a)},WI.get());function u(){et().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(a)})}))}var ZI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ew=500,tw=600,nw="_blank",rw="http://localhost",Xs=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function iw(n,e,t,r=ew,i=tw){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",u=Object.assign(Object.assign({},ZI),{width:r.toString(),height:i.toString(),top:s,left:a}),h=ce().toLowerCase();t&&(c=rp(h)?nw:t),tp(h)&&(e=e||rw,u.scrollbars="yes");let f=Object.entries(u).reduce((v,[S,C])=>`${v}${S}=${C},`,"");if(Uv(h)&&c!=="_self")return sw(e||"",c),new Xs(null);let m=window.open(e||"",c,f);U(m,n,"popup-blocked");try{m.focus()}catch{}return new Xs(m)}function sw(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var ow="__/auth/handler",aw="emulator/auth/handler",cw=encodeURIComponent("fac");async function jf(n,e,t,r,i,s){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:St,eventId:i};if(e instanceof Hn){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",df(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[f,m]of Object.entries(s||{}))a[f]=m}if(e instanceof an){let f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);let c=a;for(let f of Object.keys(c))c[f]===void 0&&delete c[f];let u=await n._getAppCheckToken(),h=u?`#${cw}=${encodeURIComponent(u)}`:"";return`${uw(n)}?${zn(c).slice(1)}${h}`}function uw({config:n}){return n.emulator?Jc(n,aw):`https://${n.authDomain}/${ow}`}var Cc="webStorageSupport",Gc=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=pp,this._completeRedirectFn=Ip,this._overrideRedirectResult=VI}async _openPopup(e,t,r,i){var s;dt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let a=await jf(e,t,r,Dc(),i);return iw(e,a,iu())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await jf(e,t,r,Dc(),i);return mI(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(dt(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await XI(e),r=new $c(e);return t.register("authEvent",i=>(U(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Cc,{type:Cc},i=>{var s;let a=(s=i?.[0])===null||s===void 0?void 0:s[Cc];a!==void 0&&t(!!a),ze(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=qI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return cp()||np()||Xc()}},lu=Gc,Zs=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Ze("unexpected MultiFactorSessionType")}}},Wc=class n extends Zs{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return cI(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return AI(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},eo=class{constructor(){}static assertion(e){return Wc._fromCredential(e)}};eo.FACTOR_ID="phone";var to=class{static assertionForEnrollment(e,t){return no._fromSecret(e,t)}static assertionForSignIn(e,t){return no._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;U(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let i=await uI(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return ro._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};to.FACTOR_ID="totp";var no=class n extends Zs{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return U(typeof this.secret<"u",e,"argument-error"),lI(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){U(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return bI(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},ro=class n{constructor(e,t,r,i,s,a,c){this.sessionInfo=a,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(Rs(e)||Rs(t))&&(i=!0),i&&(Rs(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Rs(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Rs(n){return typeof n>"u"||n?.length===0}var zf="@firebase/auth",$f="1.10.8";var Kc=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function lw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function hw(n){bt(new je("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;U(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:up(n)},h=new Lc(r,i,s,u);return Hv(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),bt(new je("auth-internal",e=>{let t=ft(e.getProvider("auth").getImmediate());return(r=>new Kc(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ke(zf,$f,lw(n)),Ke(zf,$f,"esm2017")}var dw=5*60,iA=rf("authIdTokenMaxAge")||dw;function fw(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}zv({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=He("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",fw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});hw("Browser");var Ep=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Tp={};var pt,hu;(function(){var n;function e(I,g){function y(){}y.prototype=g.prototype,I.D=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(w,E,A){for(var _=Array(arguments.length-2),ot=2;ot<arguments.length;ot++)_[ot-2]=arguments[ot];return g.prototype[E].apply(w,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,g,y){y||(y=0);var w=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)w[E]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(E=0;16>E;++E)w[E]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],E=I.g[2];var A=I.g[3],_=g+(A^y&(E^A))+w[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[1]+3905402710&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[2]+606105819&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[5]+1200080426&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[6]+2821735955&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[9]+2336552879&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[10]+4294925233&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[13]+4254626195&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[14]+2792965006&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(E^A&(y^E))+w[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[6]+3225465664&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[11]+643717713&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[10]+38016083&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[15]+3634488961&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[14]+3275163606&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[3]+4107603335&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[2]+4243563512&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[7]+1735328473&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(y^E^A)+w[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[8]+2272392833&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[11]+1839030562&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[4]+1272893353&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[7]+4139469664&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[0]+3936430074&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[3]+3572445317&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[12]+3873151461&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[15]+530742520&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(E^(y|~A))+w[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[7]+1126891415&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[14]+2878612391&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[3]+2399980690&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[10]+4293915773&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[15]+4264355552&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[6]+2734768916&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[11]+3174756917&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[2]+718787259&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+A&4294967295}r.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var y=g-this.blockSize,w=this.B,E=this.h,A=0;A<g;){if(E==0)for(;A<=y;)i(this,I,A),A+=this.blockSize;if(typeof I=="string"){for(;A<g;)if(w[E++]=I.charCodeAt(A++),E==this.blockSize){i(this,w),E=0;break}}else for(;A<g;)if(w[E++]=I[A++],E==this.blockSize){i(this,w),E=0;break}}this.h=E,this.o+=g},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var y=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=y&255,y/=256;for(this.u(I),I=Array(16),g=y=0;4>g;++g)for(var w=0;32>w;w+=8)I[y++]=this.g[g]>>>w&255;return I};function s(I,g){var y=c;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function a(I,g){this.h=g;for(var y=[],w=!0,E=I.length-1;0<=E;E--){var A=I[E]|0;w&&A==g||(y[E]=A,w=!1)}this.g=y}var c={};function u(I){return-128<=I&&128>I?s(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return k(h(-I));for(var g=[],y=1,w=0;I>=y;w++)g[w]=I/y|0,y*=4294967296;return new a(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return k(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(g,8)),w=m,E=0;E<I.length;E+=8){var A=Math.min(8,I.length-E),_=parseInt(I.substring(E,E+A),g);8>A?(A=h(Math.pow(g,A)),w=w.j(A).add(h(_))):(w=w.j(y),w=w.add(h(_)))}return w}var m=u(0),v=u(1),S=u(16777216);n=a.prototype,n.m=function(){if(N(this))return-k(this).m();for(var I=0,g=1,y=0;y<this.g.length;y++){var w=this.i(y);I+=(0<=w?w:4294967296+w)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(N(this))return"-"+k(this).toString(I);for(var g=h(Math.pow(I,6)),y=this,w="";;){var E=K(y,g).g;y=z(y,E.j(g));var A=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=E,C(y))return A+w;for(;6>A.length;)A="0"+A;w=A+w}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function N(I){return I.h==-1}n.l=function(I){return I=z(this,I),N(I)?-1:C(I)?0:1};function k(I){for(var g=I.g.length,y=[],w=0;w<g;w++)y[w]=~I.g[w];return new a(y,~I.h).add(v)}n.abs=function(){return N(this)?k(this):this},n.add=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0,E=0;E<=g;E++){var A=w+(this.i(E)&65535)+(I.i(E)&65535),_=(A>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=_>>>16,A&=65535,_&=65535,y[E]=_<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function z(I,g){return I.add(k(g))}n.j=function(I){if(C(this)||C(I))return m;if(N(this))return N(I)?k(this).j(k(I)):k(k(this).j(I));if(N(I))return k(this.j(k(I)));if(0>this.l(S)&&0>I.l(S))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,y=[],w=0;w<2*g;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<I.g.length;E++){var A=this.i(w)>>>16,_=this.i(w)&65535,ot=I.i(E)>>>16,xr=I.i(E)&65535;y[2*w+2*E]+=_*xr,B(y,2*w+2*E),y[2*w+2*E+1]+=A*xr,B(y,2*w+2*E+1),y[2*w+2*E+1]+=_*ot,B(y,2*w+2*E+1),y[2*w+2*E+2]+=A*ot,B(y,2*w+2*E+2)}for(w=0;w<g;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=g;w<2*g;w++)y[w]=0;return new a(y,0)};function B(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function M(I,g){this.g=I,this.h=g}function K(I,g){if(C(g))throw Error("division by zero");if(C(I))return new M(m,m);if(N(I))return g=K(k(I),g),new M(k(g.g),k(g.h));if(N(g))return g=K(I,k(g)),new M(k(g.g),g.h);if(30<I.g.length){if(N(I)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var y=v,w=g;0>=w.l(I);)y=Y(y),w=Y(w);var E=$(y,1),A=$(w,1);for(w=$(w,2),y=$(y,2);!C(w);){var _=A.add(w);0>=_.l(I)&&(E=E.add(y),A=_),w=$(w,1),y=$(y,1)}return g=z(I,E.j(g)),new M(E,g)}for(E=m;0<=I.l(g);){for(y=Math.max(1,Math.floor(I.m()/g.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),A=h(y),_=A.j(g);N(_)||0<_.l(I);)y-=w,A=h(y),_=A.j(g);C(A)&&(A=v),E=E.add(A),I=z(I,_)}return new M(E,I)}n.A=function(I){return K(this,I).h},n.and=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)&I.i(w);return new a(y,this.h&I.h)},n.or=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)|I.i(w);return new a(y,this.h|I.h)},n.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)^I.i(w);return new a(y,this.h^I.h)};function Y(I){for(var g=I.g.length+1,y=[],w=0;w<g;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(y,I.h)}function $(I,g){var y=g>>5;g%=32;for(var w=I.g.length-y,E=[],A=0;A<w;A++)E[A]=0<g?I.i(A+y)>>>g|I.i(A+y+1)<<32-g:I.i(A+y);return new a(E,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,hu=Tp.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,pt=Tp.Integer=a}).apply(typeof Ep<"u"?Ep:typeof self<"u"?self:typeof window<"u"?window:{});var oo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},mt={};var du,pw,Qn,fu,_i,ao,pu,mu,gu;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,d){return o==Array.prototype||o==Object.prototype||(o[l]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof oo=="object"&&oo];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(o,l){if(l)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var T=o[p];if(!(T in d))break e;d=d[T]}o=o[o.length-1],p=d[o],l=l(p),l!=p&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}function s(o,l){o instanceof String&&(o+="");var d=0,p=!1,T={next:function(){if(!p&&d<o.length){var R=d++;return{value:l(R,o[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(o){return o||function(){return s(this,function(l,d){return d})}});var a=a||{},c=this||self;function u(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function h(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function f(o,l,d){return o.call.apply(o.bind,arguments)}function m(o,l,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,p),o.apply(l,T)}}return function(){return o.apply(l,arguments)}}function v(o,l,d){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,v.apply(null,arguments)}function S(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function C(o,l){function d(){}d.prototype=l.prototype,o.aa=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,T,R){for(var O=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)O[ne-2]=arguments[ne];return l.prototype[T].apply(p,O)}}function N(o){let l=o.length;if(0<l){let d=Array(l);for(let p=0;p<l;p++)d[p]=o[p];return d}return[]}function k(o,l){for(let d=1;d<arguments.length;d++){let p=arguments[d];if(u(p)){let T=o.length||0,R=p.length||0;o.length=T+R;for(let O=0;O<R;O++)o[T+O]=p[O]}else o.push(p)}}class z{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function B(o){return/^[\s\xa0]*$/.test(o)}function M(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function K(o){return K[" "](o),o}K[" "]=function(){};var Y=M().indexOf("Gecko")!=-1&&!(M().toLowerCase().indexOf("webkit")!=-1&&M().indexOf("Edge")==-1)&&!(M().indexOf("Trident")!=-1||M().indexOf("MSIE")!=-1)&&M().indexOf("Edge")==-1;function $(o,l,d){for(let p in o)l.call(d,o[p],p,o)}function I(o,l){for(let d in o)l.call(void 0,o[d],d,o)}function g(o){let l={};for(let d in o)l[d]=o[d];return l}let y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,l){let d,p;for(let T=1;T<arguments.length;T++){p=arguments[T];for(d in p)o[d]=p[d];for(let R=0;R<y.length;R++)d=y[R],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function E(o){var l=1;o=o.split(":");let d=[];for(;0<l&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function A(o){c.setTimeout(()=>{throw o},0)}function _(){var o=ka;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class ot{constructor(){this.h=this.g=null}add(l,d){let p=xr.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var xr=new z(()=>new k_,o=>o.reset());class k_{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Lr,Mr=!1,ka=new ot,Yh=()=>{let o=c.Promise.resolve(void 0);Lr=()=>{o.then(N_)}};var N_=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(d){A(d)}var l=xr;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}Mr=!1};function vt(){this.s=this.s,this.C=this.C}vt.prototype.s=!1,vt.prototype.ma=function(){this.s||(this.s=!0,this.N())},vt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ie(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}Ie.prototype.h=function(){this.defaultPrevented=!0};var O_=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return o}();function Fr(o,l){if(Ie.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(Y){e:{try{K(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:V_[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Fr.aa.h.call(this)}}C(Fr,Ie);var V_={2:"touch",3:"pen",4:"mouse"};Fr.prototype.h=function(){Fr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ur="closure_listenable_"+(1e6*Math.random()|0),x_=0;function L_(o,l,d,p,T){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=T,this.key=++x_,this.da=this.fa=!1}function rs(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function is(o){this.src=o,this.g={},this.h=0}is.prototype.add=function(o,l,d,p,T){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var O=Oa(o,l,p,T);return-1<O?(l=o[O],d||(l.fa=!1)):(l=new L_(l,this.src,R,!!p,T),l.fa=d,o.push(l)),l};function Na(o,l){var d=l.type;if(d in o.g){var p=o.g[d],T=Array.prototype.indexOf.call(p,l,void 0),R;(R=0<=T)&&Array.prototype.splice.call(p,T,1),R&&(rs(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Oa(o,l,d,p){for(var T=0;T<o.length;++T){var R=o[T];if(!R.da&&R.listener==l&&R.capture==!!d&&R.ha==p)return T}return-1}var Va="closure_lm_"+(1e6*Math.random()|0),xa={};function Xh(o,l,d,p,T){if(p&&p.once)return ed(o,l,d,p,T);if(Array.isArray(l)){for(var R=0;R<l.length;R++)Xh(o,l[R],d,p,T);return null}return d=Ua(d),o&&o[Ur]?o.K(l,d,h(p)?!!p.capture:!!p,T):Zh(o,l,d,!1,p,T)}function Zh(o,l,d,p,T,R){if(!l)throw Error("Invalid event type");var O=h(T)?!!T.capture:!!T,ne=Ma(o);if(ne||(o[Va]=ne=new is(o)),d=ne.add(l,d,p,O,R),d.proxy)return d;if(p=M_(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)O_||(T=O),T===void 0&&(T=!1),o.addEventListener(l.toString(),p,T);else if(o.attachEvent)o.attachEvent(nd(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function M_(){function o(d){return l.call(o.src,o.listener,d)}let l=F_;return o}function ed(o,l,d,p,T){if(Array.isArray(l)){for(var R=0;R<l.length;R++)ed(o,l[R],d,p,T);return null}return d=Ua(d),o&&o[Ur]?o.L(l,d,h(p)?!!p.capture:!!p,T):Zh(o,l,d,!0,p,T)}function td(o,l,d,p,T){if(Array.isArray(l))for(var R=0;R<l.length;R++)td(o,l[R],d,p,T);else p=h(p)?!!p.capture:!!p,d=Ua(d),o&&o[Ur]?(o=o.i,l=String(l).toString(),l in o.g&&(R=o.g[l],d=Oa(R,d,p,T),-1<d&&(rs(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete o.g[l],o.h--)))):o&&(o=Ma(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Oa(l,d,p,T)),(d=-1<o?l[o]:null)&&La(d))}function La(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Ur])Na(l.i,o);else{var d=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(d,p,o.capture):l.detachEvent?l.detachEvent(nd(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=Ma(l))?(Na(d,o),d.h==0&&(d.src=null,l[Va]=null)):rs(o)}}}function nd(o){return o in xa?xa[o]:xa[o]="on"+o}function F_(o,l){if(o.da)o=!0;else{l=new Fr(l,this);var d=o.listener,p=o.ha||o.src;o.fa&&La(o),o=d.call(p,l)}return o}function Ma(o){return o=o[Va],o instanceof is?o:null}var Fa="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ua(o){return typeof o=="function"?o:(o[Fa]||(o[Fa]=function(l){return o.handleEvent(l)}),o[Fa])}function we(){vt.call(this),this.i=new is(this),this.M=this,this.F=null}C(we,vt),we.prototype[Ur]=!0,we.prototype.removeEventListener=function(o,l,d,p){td(this,o,l,d,p)};function Pe(o,l){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new Ie(l,o);else if(l instanceof Ie)l.target=l.target||o;else{var T=l;l=new Ie(p,o),w(l,T)}if(T=!0,d)for(var R=d.length-1;0<=R;R--){var O=l.g=d[R];T=ss(O,p,!0,l)&&T}if(O=l.g=o,T=ss(O,p,!0,l)&&T,T=ss(O,p,!1,l)&&T,d)for(R=0;R<d.length;R++)O=l.g=d[R],T=ss(O,p,!1,l)&&T}we.prototype.N=function(){if(we.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var d=o.g[l],p=0;p<d.length;p++)rs(d[p]);delete o.g[l],o.h--}}this.F=null},we.prototype.K=function(o,l,d,p){return this.i.add(String(o),l,!1,d,p)},we.prototype.L=function(o,l,d,p){return this.i.add(String(o),l,!0,d,p)};function ss(o,l,d,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,R=0;R<l.length;++R){var O=l[R];if(O&&!O.da&&O.capture==d){var ne=O.listener,_e=O.ha||O.src;O.fa&&Na(o.i,O),T=ne.call(_e,p)!==!1&&T}}return T&&!p.defaultPrevented}function rd(o,l,d){if(typeof o=="function")d&&(o=v(o,d));else if(o&&typeof o.handleEvent=="function")o=v(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function id(o){o.g=rd(()=>{o.g=null,o.i&&(o.i=!1,id(o))},o.l);let l=o.h;o.h=null,o.m.apply(null,l)}class U_ extends vt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:id(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Br(o){vt.call(this),this.h=o,this.g={}}C(Br,vt);var sd=[];function od(o){$(o.g,function(l,d){this.g.hasOwnProperty(d)&&La(l)},o),o.g={}}Br.prototype.N=function(){Br.aa.N.call(this),od(this)},Br.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ba=c.JSON.stringify,B_=c.JSON.parse,q_=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function qa(){}qa.prototype.h=null;function ad(o){return o.h||(o.h=o.i())}function cd(){}var qr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ja(){Ie.call(this,"d")}C(ja,Ie);function za(){Ie.call(this,"c")}C(za,Ie);var Yt={},ud=null;function os(){return ud=ud||new we}Yt.La="serverreachability";function ld(o){Ie.call(this,Yt.La,o)}C(ld,Ie);function jr(o){let l=os();Pe(l,new ld(l))}Yt.STAT_EVENT="statevent";function hd(o,l){Ie.call(this,Yt.STAT_EVENT,o),this.stat=l}C(hd,Ie);function Ce(o){let l=os();Pe(l,new hd(l,o))}Yt.Ma="timingevent";function dd(o,l){Ie.call(this,Yt.Ma,o),this.size=l}C(dd,Ie);function zr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function $r(){this.g=!0}$r.prototype.xa=function(){this.g=!1};function j_(o,l,d,p,T,R){o.info(function(){if(o.g)if(R)for(var O="",ne=R.split("&"),_e=0;_e<ne.length;_e++){var X=ne[_e].split("=");if(1<X.length){var Ee=X[0];X=X[1];var Te=Ee.split("_");O=2<=Te.length&&Te[1]=="type"?O+(Ee+"="+X+"&"):O+(Ee+"=redacted&")}}else O=null;else O=R;return"XMLHTTP REQ ("+p+") [attempt "+T+"]: "+l+`
`+d+`
`+O})}function z_(o,l,d,p,T,R,O){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+T+"]: "+l+`
`+d+`
`+R+" "+O})}function Fn(o,l,d,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+G_(o,d)+(p?" "+p:"")})}function $_(o,l){o.info(function(){return"TIMEOUT: "+l})}$r.prototype.info=function(){};function G_(o,l){if(!o.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var T=p[1];if(Array.isArray(T)&&!(1>T.length)){var R=T[0];if(R!="noop"&&R!="stop"&&R!="close")for(var O=1;O<T.length;O++)T[O]=""}}}}return Ba(d)}catch{return l}}var as={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},fd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},$a;function cs(){}C(cs,qa),cs.prototype.g=function(){return new XMLHttpRequest},cs.prototype.i=function(){return{}},$a=new cs;function It(o,l,d,p){this.j=o,this.i=l,this.l=d,this.R=p||1,this.U=new Br(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new pd}function pd(){this.i=null,this.g="",this.h=!1}var md={},Ga={};function Wa(o,l,d){o.L=1,o.v=ds(at(l)),o.m=d,o.P=!0,gd(o,null)}function gd(o,l){o.F=Date.now(),us(o),o.A=at(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),Dd(d.i,"t",p),o.C=0,d=o.j.J,o.h=new pd,o.g=Hd(o.j,d?l:null,!o.m),0<o.O&&(o.M=new U_(v(o.Y,o,o.g),o.O)),l=o.U,d=o.g,p=o.ca;var T="readystatechange";Array.isArray(T)||(T&&(sd[0]=T.toString()),T=sd);for(var R=0;R<T.length;R++){var O=Xh(d,T[R],p||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),jr(),j_(o.i,o.u,o.A,o.l,o.R,o.m)}It.prototype.ca=function(o){o=o.target;let l=this.M;l&&ct(o)==3?l.j():this.Y(o)},It.prototype.Y=function(o){try{if(o==this.g)e:{let Te=ct(this.g);var l=this.g.Ba();let qn=this.g.Z();if(!(3>Te)&&(Te!=3||this.g&&(this.h.h||this.g.oa()||Md(this.g)))){this.J||Te!=4||l==7||(l==8||0>=qn?jr(3):jr(2)),Ka(this);var d=this.g.Z();this.X=d;t:if(_d(this)){var p=Md(this.g);o="";var T=p.length,R=ct(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Xt(this),Gr(this);var O="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,o+=this.h.i.decode(p[l],{stream:!(R&&l==T-1)});p.length=0,this.h.g+=o,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,z_(this.i,this.u,this.A,this.l,this.R,Te,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,_e=this.g;if((ne=_e.g?_e.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(ne)){var X=ne;break t}}X=null}if(d=X)Fn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ha(this,d);else{this.o=!1,this.s=3,Ce(12),Xt(this),Gr(this);break e}}if(this.P){d=!0;let We;for(;!this.J&&this.C<O.length;)if(We=W_(this,O),We==Ga){Te==4&&(this.s=4,Ce(14),d=!1),Fn(this.i,this.l,null,"[Incomplete Response]");break}else if(We==md){this.s=4,Ce(15),Fn(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else Fn(this.i,this.l,We,null),Ha(this,We);if(_d(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Te!=4||O.length!=0||this.h.h||(this.s=1,Ce(16),d=!1),this.o=this.o&&d,!d)Fn(this.i,this.l,O,"[Invalid Chunked Response]"),Xt(this),Gr(this);else if(0<O.length&&!this.W){this.W=!0;var Ee=this.j;Ee.g==this&&Ee.ba&&!Ee.M&&(Ee.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),ec(Ee),Ee.M=!0,Ce(11))}}else Fn(this.i,this.l,O,null),Ha(this,O);Te==4&&Xt(this),this.o&&!this.J&&(Te==4?$d(this.j,this):(this.o=!1,us(this)))}else uy(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Ce(12)):(this.s=0,Ce(13)),Xt(this),Gr(this)}}}catch{}finally{}};function _d(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function W_(o,l){var d=o.C,p=l.indexOf(`
`,d);return p==-1?Ga:(d=Number(l.substring(d,p)),isNaN(d)?md:(p+=1,p+d>l.length?Ga:(l=l.slice(p,p+d),o.C=p+d,l)))}It.prototype.cancel=function(){this.J=!0,Xt(this)};function us(o){o.S=Date.now()+o.I,yd(o,o.I)}function yd(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=zr(v(o.ba,o),l)}function Ka(o){o.B&&(c.clearTimeout(o.B),o.B=null)}It.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?($_(this.i,this.A),this.L!=2&&(jr(),Ce(17)),Xt(this),this.s=2,Gr(this)):yd(this,this.S-o)};function Gr(o){o.j.G==0||o.J||$d(o.j,o)}function Xt(o){Ka(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,od(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function Ha(o,l){try{var d=o.j;if(d.G!=0&&(d.g==o||Qa(d.h,o))){if(!o.K&&Qa(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var T=p;if(T[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)_s(d),ms(d);else break e;Za(d),Ce(18)}}else d.za=T[1],0<d.za-d.T&&37500>T[2]&&d.F&&d.v==0&&!d.C&&(d.C=zr(v(d.Za,d),6e3));if(1>=wd(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else en(d,11)}else if((o.K||d.g==o)&&_s(d),!B(l))for(T=d.Da.g.parse(l),l=0;l<T.length;l++){let X=T[l];if(d.T=X[0],X=X[1],d.G==2)if(X[0]=="c"){d.K=X[1],d.ia=X[2];let Ee=X[3];Ee!=null&&(d.la=Ee,d.j.info("VER="+d.la));let Te=X[4];Te!=null&&(d.Aa=Te,d.j.info("SVER="+d.Aa));let qn=X[5];qn!=null&&typeof qn=="number"&&0<qn&&(p=1.5*qn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;let We=o.g;if(We){let vs=We.g?We.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(vs){var R=p.h;R.g||vs.indexOf("spdy")==-1&&vs.indexOf("quic")==-1&&vs.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Ja(R,R.h),R.h=null))}if(p.D){let tc=We.g?We.g.getResponseHeader("X-HTTP-Session-Id"):null;tc&&(p.ya=tc,re(p.I,p.D,tc))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var O=o;if(p.qa=Kd(p,p.J?p.ia:null,p.W),O.K){Ed(p.h,O);var ne=O,_e=p.L;_e&&(ne.I=_e),ne.B&&(Ka(ne),us(ne)),p.g=O}else jd(p);0<d.i.length&&gs(d)}else X[0]!="stop"&&X[0]!="close"||en(d,7);else d.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?en(d,7):Xa(d):X[0]!="noop"&&d.l&&d.l.ta(X),d.v=0)}}jr(4)}catch{}}var K_=class{constructor(o,l){this.g=o,this.map=l}};function vd(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Id(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function wd(o){return o.h?1:o.g?o.g.size:0}function Qa(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Ja(o,l){o.g?o.g.add(l):o.h=l}function Ed(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}vd.prototype.cancel=function(){if(this.i=Td(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Td(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(let d of o.g.values())l=l.concat(d.D);return l}return N(o.i)}function H_(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var l=[],d=o.length,p=0;p<d;p++)l.push(o[p]);return l}l=[],d=0;for(p in o)l[d++]=o[p];return l}function Q_(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var l=[];o=o.length;for(var d=0;d<o;d++)l.push(d);return l}l=[],d=0;for(let p in o)l[d++]=p;return l}}}function Ad(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var d=Q_(o),p=H_(o),T=p.length,R=0;R<T;R++)l.call(void 0,p[R],d&&d[R],o)}var bd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function J_(o,l){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),T=null;if(0<=p){var R=o[d].substring(0,p);T=o[d].substring(p+1)}else R=o[d];l(R,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Zt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Zt){this.h=o.h,ls(this,o.j),this.o=o.o,this.g=o.g,hs(this,o.s),this.l=o.l;var l=o.i,d=new Hr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Sd(this,d),this.m=o.m}else o&&(l=String(o).match(bd))?(this.h=!1,ls(this,l[1]||"",!0),this.o=Wr(l[2]||""),this.g=Wr(l[3]||"",!0),hs(this,l[4]),this.l=Wr(l[5]||"",!0),Sd(this,l[6]||"",!0),this.m=Wr(l[7]||"")):(this.h=!1,this.i=new Hr(null,this.h))}Zt.prototype.toString=function(){var o=[],l=this.j;l&&o.push(Kr(l,Rd,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Kr(l,Rd,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Kr(d,d.charAt(0)=="/"?Z_:X_,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Kr(d,ty)),o.join("")};function at(o){return new Zt(o)}function ls(o,l,d){o.j=d?Wr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function hs(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function Sd(o,l,d){l instanceof Hr?(o.i=l,ny(o.i,o.h)):(d||(l=Kr(l,ey)),o.i=new Hr(l,o.h))}function re(o,l,d){o.i.set(l,d)}function ds(o){return re(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Wr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Kr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,Y_),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Y_(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Rd=/[#\/\?@]/g,X_=/[#\?:]/g,Z_=/[#\?]/g,ey=/[#\?@]/g,ty=/#/g;function Hr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function wt(o){o.g||(o.g=new Map,o.h=0,o.i&&J_(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Hr.prototype,n.add=function(o,l){wt(this),this.i=null,o=Un(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function Pd(o,l){wt(o),l=Un(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Cd(o,l){return wt(o),l=Un(o,l),o.g.has(l)}n.forEach=function(o,l){wt(this),this.g.forEach(function(d,p){d.forEach(function(T){o.call(l,T,p,this)},this)},this)},n.na=function(){wt(this);let o=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){let T=o[p];for(let R=0;R<T.length;R++)d.push(l[p])}return d},n.V=function(o){wt(this);let l=[];if(typeof o=="string")Cd(this,o)&&(l=l.concat(this.g.get(Un(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)l=l.concat(o[d])}return l},n.set=function(o,l){return wt(this),this.i=null,o=Un(this,o),Cd(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function Dd(o,l,d){Pd(o,l),0<d.length&&(o.i=null,o.g.set(Un(o,l),N(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];let R=encodeURIComponent(String(p)),O=this.V(p);for(p=0;p<O.length;p++){var T=R;O[p]!==""&&(T+="="+encodeURIComponent(String(O[p]))),o.push(T)}}return this.i=o.join("&")};function Un(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function ny(o,l){l&&!o.j&&(wt(o),o.i=null,o.g.forEach(function(d,p){var T=p.toLowerCase();p!=T&&(Pd(this,p),Dd(this,T,d))},o)),o.j=l}function ry(o,l){let d=new $r;if(c.Image){let p=new Image;p.onload=S(Et,d,"TestLoadImage: loaded",!0,l,p),p.onerror=S(Et,d,"TestLoadImage: error",!1,l,p),p.onabort=S(Et,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=S(Et,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function iy(o,l){let d=new $r,p=new AbortController,T=setTimeout(()=>{p.abort(),Et(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(R=>{clearTimeout(T),R.ok?Et(d,"TestPingServer: ok",!0,l):Et(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),Et(d,"TestPingServer: error",!1,l)})}function Et(o,l,d,p,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),p(d)}catch{}}function sy(){this.g=new q_}function oy(o,l,d){let p=d||"";try{Ad(o,function(T,R){let O=T;h(T)&&(O=Ba(T)),l.push(p+R+"="+encodeURIComponent(O))})}catch(T){throw l.push(p+"type="+encodeURIComponent("_badmap")),T}}function Qr(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Qr,qa),Qr.prototype.g=function(){return new fs(this.l,this.j)},Qr.prototype.i=function(o){return function(){return o}}({});function fs(o,l){we.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(fs,we),n=fs.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Yr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Jr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Yr(this)),this.g&&(this.readyState=3,Yr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;kd(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function kd(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Jr(this):Yr(this),this.readyState==3&&kd(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Jr(this))},n.Qa=function(o){this.g&&(this.response=o,Jr(this))},n.ga=function(){this.g&&Jr(this)};function Jr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Yr(o)}n.setRequestHeader=function(o,l){this.u.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Yr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(fs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Nd(o){let l="";return $(o,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function Ya(o,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Nd(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):re(o,l,d))}function ae(o){we.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(ae,we);var ay=/^https?$/i,cy=["POST","PUT"];n=ae.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():$a.g(),this.v=this.o?ad(this.o):ad($a),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(R){Od(this,R);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var T in p)d.set(T,p[T]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let R of p.keys())d.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),T=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(cy,l,void 0))||p||T||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[R,O]of d)this.g.setRequestHeader(R,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ld(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){Od(this,R)}};function Od(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,Vd(o),ps(o)}function Vd(o){o.A||(o.A=!0,Pe(o,"complete"),Pe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Pe(this,"complete"),Pe(this,"abort"),ps(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ps(this,!0)),ae.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?xd(this):this.bb())},n.bb=function(){xd(this)};function xd(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ct(o)!=4||o.Z()!=2)){if(o.u&&ct(o)==4)rd(o.Ea,0,o);else if(Pe(o,"readystatechange"),ct(o)==4){o.h=!1;try{let O=o.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=O===0){var T=String(o.D).match(bd)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),p=!ay.test(T?T.toLowerCase():"")}d=p}if(d)Pe(o,"complete"),Pe(o,"success");else{o.m=6;try{var R=2<ct(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",Vd(o)}}finally{ps(o)}}}}function ps(o,l){if(o.g){Ld(o);let d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Pe(o,"ready");try{d.onreadystatechange=p}catch{}}}function Ld(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function ct(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<ct(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),B_(l)}};function Md(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function uy(o){let l={};o=(o.g&&2<=ct(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(B(o[p]))continue;var d=E(o[p]);let T=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let R=l[T]||[];l[T]=R,R.push(d)}I(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function Fd(o){this.Aa=0,this.i=[],this.j=new $r,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Xr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Xr("baseRetryDelayMs",5e3,o),this.cb=Xr("retryDelaySeedMs",1e4,o),this.Wa=Xr("forwardChannelMaxRetries",2,o),this.wa=Xr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new vd(o&&o.concurrentRequestLimit),this.Da=new sy,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Fd.prototype,n.la=8,n.G=1,n.connect=function(o,l,d,p){Ce(0),this.W=o,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Kd(this,null,this.W),gs(this)};function Xa(o){if(Ud(o),o.G==3){var l=o.U++,d=at(o.I);if(re(d,"SID",o.K),re(d,"RID",l),re(d,"TYPE","terminate"),Zr(o,d),l=new It(o,o.j,l),l.L=2,l.v=ds(at(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=Hd(l.j,null),l.g.ea(l.v)),l.F=Date.now(),us(l)}Wd(o)}function ms(o){o.g&&(ec(o),o.g.cancel(),o.g=null)}function Ud(o){ms(o),o.u&&(c.clearTimeout(o.u),o.u=null),_s(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function gs(o){if(!Id(o.h)&&!o.s){o.s=!0;var l=o.Ga;Lr||Yh(),Mr||(Lr(),Mr=!0),ka.add(l,o),o.B=0}}function ly(o,l){return wd(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=zr(v(o.Ga,o,l),Gd(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let T=new It(this,this.j,o),R=this.o;if(this.S&&(R?(R=g(R),w(R,this.S)):R=this.S),this.m!==null||this.O||(T.H=R,R=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=qd(this,T,l),d=at(this.I),re(d,"RID",o),re(d,"CVER",22),this.D&&re(d,"X-HTTP-Session-Id",this.D),Zr(this,d),R&&(this.O?l="headers="+encodeURIComponent(String(Nd(R)))+"&"+l:this.m&&Ya(d,this.m,R)),Ja(this.h,T),this.Ua&&re(d,"TYPE","init"),this.P?(re(d,"$req",l),re(d,"SID","null"),T.T=!0,Wa(T,d,null)):Wa(T,d,l),this.G=2}}else this.G==3&&(o?Bd(this,o):this.i.length==0||Id(this.h)||Bd(this))};function Bd(o,l){var d;l?d=l.l:d=o.U++;let p=at(o.I);re(p,"SID",o.K),re(p,"RID",d),re(p,"AID",o.T),Zr(o,p),o.m&&o.o&&Ya(p,o.m,o.o),d=new It(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),l&&(o.i=l.D.concat(o.i)),l=qd(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ja(o.h,d),Wa(d,p,l)}function Zr(o,l){o.H&&$(o.H,function(d,p){re(l,p,d)}),o.l&&Ad({},function(d,p){re(l,p,d)})}function qd(o,l,d){d=Math.min(o.i.length,d);var p=o.l?v(o.l.Na,o.l,o):null;e:{var T=o.i;let R=-1;for(;;){let O=["count="+d];R==-1?0<d?(R=T[0].g,O.push("ofs="+R)):R=0:O.push("ofs="+R);let ne=!0;for(let _e=0;_e<d;_e++){let X=T[_e].g,Ee=T[_e].map;if(X-=R,0>X)R=Math.max(0,T[_e].g-100),ne=!1;else try{oy(Ee,O,"req"+X+"_")}catch{p&&p(Ee)}}if(ne){p=O.join("&");break e}}}return o=o.i.splice(0,d),l.D=o,p}function jd(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;Lr||Yh(),Mr||(Lr(),Mr=!0),ka.add(l,o),o.v=0}}function Za(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=zr(v(o.Fa,o),Gd(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,zd(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=zr(v(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ce(10),ms(this),zd(this))};function ec(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function zd(o){o.g=new It(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=at(o.qa);re(l,"RID","rpc"),re(l,"SID",o.K),re(l,"AID",o.T),re(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&re(l,"TO",o.ja),re(l,"TYPE","xmlhttp"),Zr(o,l),o.m&&o.o&&Ya(l,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=ds(at(l)),d.m=null,d.P=!0,gd(d,o)}n.Za=function(){this.C!=null&&(this.C=null,ms(this),Za(this),Ce(19))};function _s(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function $d(o,l){var d=null;if(o.g==l){_s(o),ec(o),o.g=null;var p=2}else if(Qa(o.h,l))d=l.D,Ed(o.h,l),p=1;else return;if(o.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var T=o.B;p=os(),Pe(p,new dd(p,d)),gs(o)}else jd(o);else if(T=l.s,T==3||T==0&&0<l.X||!(p==1&&ly(o,l)||p==2&&Za(o)))switch(d&&0<d.length&&(l=o.h,l.i=l.i.concat(d)),T){case 1:en(o,5);break;case 4:en(o,10);break;case 3:en(o,6);break;default:en(o,2)}}}function Gd(o,l){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*l}function en(o,l){if(o.j.info("Error code "+l),l==2){var d=v(o.fb,o),p=o.Xa;let T=!p;p=new Zt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||ls(p,"https"),ds(p),T?ry(p.toString(),d):iy(p.toString(),d)}else Ce(2);o.G=0,o.l&&o.l.sa(l),Wd(o),Ud(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Ce(2)):(this.j.info("Failed to ping google.com"),Ce(1))};function Wd(o){if(o.G=0,o.ka=[],o.l){let l=Td(o.h);(l.length!=0||o.i.length!=0)&&(k(o.ka,l),k(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function Kd(o,l,d){var p=d instanceof Zt?at(d):new Zt(d);if(p.g!="")l&&(p.g=l+"."+p.g),hs(p,p.s);else{var T=c.location;p=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var R=new Zt(null);p&&ls(R,p),l&&(R.g=l),T&&hs(R,T),d&&(R.l=d),p=R}return d=o.D,l=o.ya,d&&l&&re(p,d,l),re(p,"VER",o.la),Zr(o,p),p}function Hd(o,l,d){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new ae(new Qr({eb:d})):new ae(o.pa),l.Ha(o.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Qd(){}n=Qd.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ys(){}ys.prototype.g=function(o,l){return new Me(o,l)};function Me(o,l){we.call(this),this.g=new Fd(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!B(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!B(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Bn(this)}C(Me,we),Me.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Me.prototype.close=function(){Xa(this.g)},Me.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Ba(o),o=d);l.i.push(new K_(l.Ya++,o)),l.G==3&&gs(l)},Me.prototype.N=function(){this.g.l=null,delete this.j,Xa(this.g),delete this.g,Me.aa.N.call(this)};function Jd(o){ja.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(let d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}C(Jd,ja);function Yd(){za.call(this),this.status=1}C(Yd,za);function Bn(o){this.g=o}C(Bn,Qd),Bn.prototype.ua=function(){Pe(this.g,"a")},Bn.prototype.ta=function(o){Pe(this.g,new Jd(o))},Bn.prototype.sa=function(o){Pe(this.g,new Yd)},Bn.prototype.ra=function(){Pe(this.g,"b")},ys.prototype.createWebChannel=ys.prototype.g,Me.prototype.send=Me.prototype.o,Me.prototype.open=Me.prototype.m,Me.prototype.close=Me.prototype.close,gu=mt.createWebChannelTransport=function(){return new ys},mu=mt.getStatEventTarget=function(){return os()},pu=mt.Event=Yt,ao=mt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},as.NO_ERROR=0,as.TIMEOUT=8,as.HTTP_ERROR=6,_i=mt.ErrorCode=as,fd.COMPLETE="complete",fu=mt.EventType=fd,cd.EventType=qr,qr.OPEN="a",qr.CLOSE="b",qr.ERROR="c",qr.MESSAGE="d",we.prototype.listen=we.prototype.K,Qn=mt.WebChannel=cd,pw=mt.FetchXmlHttpFactory=Qr,ae.prototype.listenOnce=ae.prototype.L,ae.prototype.getLastError=ae.prototype.Ka,ae.prototype.getLastErrorCode=ae.prototype.Ba,ae.prototype.getStatus=ae.prototype.Z,ae.prototype.getResponseJson=ae.prototype.Oa,ae.prototype.getResponseText=ae.prototype.oa,ae.prototype.send=ae.prototype.ea,ae.prototype.setWithCredentials=ae.prototype.Ha,du=mt.XhrIo=ae}).apply(typeof oo<"u"?oo:typeof self<"u"?self:typeof window<"u"?window:{});var Ap="@firebase/firestore",bp="4.8.0";var ye=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};ye.UNAUTHENTICATED=new ye(null),ye.GOOGLE_CREDENTIALS=new ye("google-credentials-uid"),ye.FIRST_PARTY=new ye("first-party-uid"),ye.MOCK_USER=new ye("mock-user");var Or="11.10.0";var Rn=new At("@firebase/firestore");function nr(){return Rn.logLevel}function D(n,...e){if(Rn.logLevel<=H.DEBUG){let t=e.map(wh);Rn.debug(`Firestore (${Or}): ${n}`,...t)}}function De(n,...e){if(Rn.logLevel<=H.ERROR){let t=e.map(wh);Rn.error(`Firestore (${Or}): ${n}`,...t)}}function Ut(n,...e){if(Rn.logLevel<=H.WARN){let t=e.map(wh);Rn.warn(`Firestore (${Or}): ${n}`,...t)}}function wh(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function L(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Fm(n,r,t)}function Fm(n,e,t){let r=`FIRESTORE (${Or}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw De(r),new Error(r)}function F(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Fm(e,i,r)}function G(n,e){return n}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},V=class extends Fe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var rt=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Au=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},bu=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ye.UNAUTHENTICATED))}shutdown(){}};var Su=class{constructor(e){this.t=e,this.currentUser=ye.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0,42304);let r=this.i,i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve(),s=new rt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new rt,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){let u=this.t.getImmediate({optional:!0});u?c(u):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new rt)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(F(typeof r.accessToken=="string",31837,{l:r}),new Au(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string",2055,{h:e}),new ye(e)}},Ru=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ye.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Pu=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Ru(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ye.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Eo=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Cu=class{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ve(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){F(this.o===void 0,3512);let r=s=>{s.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let a=s.token!==this.m;return this.m=s.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.V.getImmediate({optional:!0});s?i(s):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Eo(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(F(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Eo(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function mw(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}function Um(){return new TextEncoder}var ki=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=mw(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}};function j(n,e){return n<e?-1:n>e?1:0}function Du(n,e){let t=0;for(;t<n.length&&t<e.length;){let r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return j(r,i);{let s=Um(),a=gw(s.encode(Sp(n,t)),s.encode(Sp(e,t)));return a!==0?a:j(r,i)}}t+=r>65535?2:1}return j(n.length,e.length)}function Sp(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function gw(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return j(n[t],e[t]);return j(n.length,e.length)}function dr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function Bm(n){return n+"\0"}var Rp="__name__",To=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&L(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&L(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=n.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return j(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),i=n.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(e).compare(n.extractNumericId(t)):Du(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return pt.fromString(e.substring(4,e.length-2))}},Z=class n extends To{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},_w=/^[_a-zA-Z][_a-zA-Z0-9]*$/,fe=class n extends To{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return _w.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Rp}static keyField(){return new n([Rp])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var x=class n{constructor(e){this.path=e}static fromPath(e){return new n(Z.fromString(e))}static fromName(e){return new n(Z.fromString(e).popFirst(5))}static empty(){return new n(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new Z(e.slice()))}};function qm(n,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function yw(n,e,t,r){if(e===!0&&r===!0)throw new V(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Pp(n){if(!x.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Cp(n){if(x.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function jm(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Eh(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":L(12329,{type:typeof n})}function wn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Eh(n);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function he(n,e){let t={typeString:n};return e&&(t.value=e),t}function Ji(n,e){if(!jm(n))throw new V(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}let a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new V(P.INVALID_ARGUMENT,t);return!0}var Dp=-62135596800,kp=1e6,se=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*kp);return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Dp)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/kp}_compareTo(e){return this.seconds===e.seconds?j(this.nanoseconds,e.nanoseconds):j(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ji(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-Dp;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:he("string",se._jsonSchemaVersion),seconds:he("number"),nanoseconds:he("number")};var q=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new se(0,0))}static max(){return new n(new se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Ni=-1,fr=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};function ku(n){return n.fields.find(e=>e.kind===2)}function dn(n){return n.fields.filter(e=>e.kind!==2)}fr.UNKNOWN_ID=-1;var cr=class{constructor(e,t){this.fieldPath=e,this.kind=t}};var Oi=class n{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new n(0,Ge.min())}};function vw(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=q.fromTimestamp(r===1e9?new se(t+1,0):new se(t,r));return new Ge(i,x.empty(),e)}function zm(n){return new Ge(n.readTime,n.key,Ni)}var Ge=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(q.min(),x.empty(),Ni)}static max(){return new n(q.max(),x.empty(),Ni)}};function Th(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:j(n.largestBatchId,e.largestBatchId))}var $m="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Ao=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function Ln(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==$m)throw n;D("LocalStore","Unexpectedly lost primary lease")}var b=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},u=>r(u))}),a=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,a=new Array(s),c=0;for(let u=0;u<s;u++){let h=u;t(e[h]).next(f=>{a[h]=f,++c,c===s&&r(a)},f=>i(f))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};var Ue="SimpleDb",bo=class n{static open(e,t,r,i){try{return new n(t,e.transaction(i,r))}catch(s){throw new En(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new rt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new En(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{let i=Ah(r.target.error);this.S.reject(new En(e,i))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(D(Ue,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}v(){let e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){let t=this.transaction.objectStore(e);return new Ou(t)}},pr=class n{static delete(e){return D(Ue,"Removing database:",e),pn(oc().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!Es())return!1;if(n.F())return!0;let e=ce(),t=n.M(e),r=0<t&&t<10,i=Gm(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.O)==="YES"}static N(e,t){return e.store(t)}static M(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.B=r,this.L=null,n.M(ce())===12.2&&De("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async k(e){return this.db||(D(Ue,"Opening database:",this.name),this.db=await new Promise((t,r)=>{let i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{let a=s.target.result;t(a)},i.onblocked=()=>{r(new En(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{let a=s.target.error;a.name==="VersionError"?r(new V(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?r(new V(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):r(new En(e,a))},i.onupgradeneeded=s=>{D(Ue,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);let a=s.target.result;if(this.L!==null&&this.L!==s.oldVersion)throw new Error(`refusing to open IndexedDB database due to potential corruption of the IndexedDB database data; this corruption could be caused by clicking the "clear site data" button in a web browser; try reloading the web page to re-initialize the IndexedDB database: lastClosedDbVersion=${this.L}, event.oldVersion=${s.oldVersion}, event.newVersion=${s.newVersion}, db.version=${a.version}`);this.B.q(a,i.transaction,s.oldVersion,this.version).next(()=>{D(Ue,"Database upgrade to version "+this.version+" complete")})}}),this.db.addEventListener("close",t=>{let r=t.target;this.L=r.version},{passive:!0})),this.db.addEventListener("versionchange",t=>{var r;t.newVersion===null&&(Ut('Received "versionchange" event with newVersion===null; notifying the registered DatabaseDeletedListener, if any'),(r=this.databaseDeletedListener)===null||r===void 0||r.call(this))},{passive:!0}),this.db}setDatabaseDeletedListener(e){if(this.databaseDeletedListener)throw new Error("setDatabaseDeletedListener() may only be called once, and it has already been called");this.databaseDeletedListener=e}async runTransaction(e,t,r,i){let s=t==="readonly",a=0;for(;;){++a;try{this.db=await this.k(e);let c=bo.open(this.db,e,s?"readonly":"readwrite",r),u=i(c).next(h=>(c.v(),h)).catch(h=>(c.abort(h),b.reject(h))).toPromise();return u.catch(()=>{}),await c.D,u}catch(c){let u=c,h=u.name!=="FirebaseError"&&a<3;if(D(Ue,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}};function Gm(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}var Nu=class{constructor(e){this.$=e,this.U=!1,this.K=null}get isDone(){return this.U}get W(){return this.K}set cursor(e){this.$=e}done(){this.U=!0}G(e){this.K=e}delete(){return pn(this.$.delete())}},En=class extends V{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}};function Qt(n){return n.name==="IndexedDbTransactionError"}var Ou=class{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(D(Ue,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(D(Ue,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),pn(r)}add(e){return D(Ue,"ADD",this.store.name,e,e),pn(this.store.add(e))}get(e){return pn(this.store.get(e)).next(t=>(t===void 0&&(t=null),D(Ue,"GET",this.store.name,e,t),t))}delete(e){return D(Ue,"DELETE",this.store.name,e),pn(this.store.delete(e))}count(){return D(Ue,"COUNT",this.store.name),pn(this.store.count())}j(e,t){let r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){let s=i.getAll(r.range);return new b((a,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{a(u.target.result)}})}{let s=this.cursor(r),a=[];return this.J(s,(c,u)=>{a.push(u)}).next(()=>a)}}H(e,t){let r=this.store.getAll(e,t===null?void 0:t);return new b((i,s)=>{r.onerror=a=>{s(a.target.error)},r.onsuccess=a=>{i(a.target.result)}})}Y(e,t){D(Ue,"DELETE ALL",this.store.name);let r=this.options(e,t);r.Z=!1;let i=this.cursor(r);return this.J(i,(s,a,c)=>c.delete())}X(e,t){let r;t?r=e:(r={},t=e);let i=this.cursor(r);return this.J(i,t)}ee(e){let t=this.cursor({});return new b((r,i)=>{t.onerror=s=>{let a=Ah(s.target.error);i(a)},t.onsuccess=s=>{let a=s.target.result;a?e(a.primaryKey,a.value).next(c=>{c?a.continue():r()}):r()}})}J(e,t){let r=[];return new b((i,s)=>{e.onerror=a=>{s(a.target.error)},e.onsuccess=a=>{let c=a.target.result;if(!c)return void i();let u=new Nu(c),h=t(c.primaryKey,c.value,u);if(h instanceof b){let f=h.catch(m=>(u.done(),b.reject(m)));r.push(f)}u.isDone?i():u.W===null?c.continue():c.continue(u.W)}}).next(()=>b.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let r=this.store.index(e.index);return e.Z?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}};function pn(n){return new b((e,t)=>{n.onsuccess=r=>{let i=r.target.result;e(i)},n.onerror=r=>{let i=Ah(r.target.error);t(i)}})}var Np=!1;function Ah(n){let e=pr.M(ce());if(e>=12.2&&e<13){let t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){let r=new V("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Np||(Np=!0,setTimeout(()=>{throw r},0)),r}}return n}var Ai="IndexBackfiller",Vu=class{constructor(e,t){this.asyncQueue=e,this.te=t,this.task=null}start(){this.ne(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}ne(e){D(Ai,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{let t=await this.te.re();D(Ai,`Documents written: ${t}`)}catch(t){Qt(t)?D(Ai,"Ignoring IndexedDB error during index backfill: ",t):await Ln(t)}await this.ne(6e4)})}},xu=class{constructor(e,t){this.localStore=e,this.persistence=t}async re(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.ie(t,e))}ie(e,t){let r=new Set,i=t,s=!0;return b.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(a=>{if(a!==null&&!r.has(a))return D(Ai,`Processing collection: ${a}`),this.se(e,a,i).next(c=>{i-=c,r.add(a)});s=!1})).next(()=>t-i)}se(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{let a=s.changes;return this.localStore.indexManager.updateIndexEntries(e,a).next(()=>this.oe(i,s)).next(c=>(D(Ai,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>a.size)}))}oe(e,t){let r=e;return t.changes.forEach((i,s)=>{let a=zm(s);Th(a,r)>0&&(r=a)}),new Ge(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}};var Le=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ae&&this.ae(e),e}};Le.ue=-1;var Tn=-1;function Ia(n){return n==null}function Vi(n){return n===0&&1/n==-1/0}function Iw(n){return typeof n=="number"&&Number.isInteger(n)&&!Vi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var So="";function Se(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Op(e)),e=ww(n.get(t),e);return Op(e)}function ww(n,e){let t=e,r=n.length;for(let i=0;i<r;i++){let s=n.charAt(i);switch(s){case"\0":t+="";break;case So:t+="";break;default:t+=s}}return t}function Op(n){return n+So+""}function tt(n){let e=n.length;if(F(e>=2,64408,{path:n}),e===2)return F(n.charAt(0)===So&&n.charAt(1)==="",56145,{path:n}),Z.emptyPath();let t=e-2,r=[],i="";for(let s=0;s<e;){let a=n.indexOf(So,s);switch((a<0||a>t)&&L(50515,{path:n}),n.charAt(a+1)){case"":let c=n.substring(s,a),u;i.length===0?u=c:(i+=c,u=i,i=""),r.push(u);break;case"":i+=n.substring(s,a),i+="\0";break;case"":i+=n.substring(s,a+1);break;default:L(61167,{path:n})}s=a+2}return new Z(r)}var fn="remoteDocuments",Yi="owner",Jn="owner",xi="mutationQueues",Ew="userId",Qe="mutations",Vp="batchId",yn="userMutationsIndex",xp=["userId","batchId"];function po(n,e){return[n,Se(e)]}function Wm(n,e,t){return[n,Se(e),t]}var Tw={},mr="documentMutations",Ro="remoteDocumentsV14",Aw=["prefixPath","collectionGroup","readTime","documentId"],mo="documentKeyIndex",bw=["prefixPath","collectionGroup","documentId"],Km="collectionGroupIndex",Sw=["collectionGroup","readTime","prefixPath","documentId"],Li="remoteDocumentGlobal",Lu="remoteDocumentGlobalKey",gr="targets",Hm="queryTargetsIndex",Rw=["canonicalId","targetId"],_r="targetDocuments",Pw=["targetId","path"],bh="documentTargetsIndex",Cw=["path","targetId"],Po="targetGlobalKey",An="targetGlobal",Mi="collectionParents",Dw=["collectionId","parent"],yr="clientMetadata",kw="clientId",wa="bundles",Nw="bundleId",Ea="namedQueries",Ow="name",Sh="indexConfiguration",Vw="indexId",Mu="collectionGroupIndex",xw="collectionGroup",bi="indexState",Lw=["indexId","uid"],Qm="sequenceNumberIndex",Mw=["uid","sequenceNumber"],Si="indexEntries",Fw=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Jm="documentKeyIndex",Uw=["indexId","uid","orderedDocumentKey"],Ta="documentOverlays",Bw=["userId","collectionPath","documentId"],Fu="collectionPathOverlayIndex",qw=["userId","collectionPath","largestBatchId"],Ym="collectionGroupOverlayIndex",jw=["userId","collectionGroup","largestBatchId"],Rh="globals",zw="name",Xm=[xi,Qe,mr,fn,gr,Yi,An,_r,yr,Li,Mi,wa,Ea],$w=[...Xm,Ta],Zm=[xi,Qe,mr,Ro,gr,Yi,An,_r,yr,Li,Mi,wa,Ea,Ta],eg=Zm,Ph=[...eg,Sh,bi,Si],Gw=Ph,tg=[...Ph,Rh],Ww=tg;var Fi=class extends Ao{constructor(e,t){super(),this.ce=e,this.currentSequenceNumber=t}};function me(n,e){let t=G(n);return pr.N(t.ce,e)}function Lp(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Jt(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function ng(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var oe=class n{constructor(e,t){this.comparator=e,this.root=t||it.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,it.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,it.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ar(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ar(this.root,e,this.comparator,!1)}getReverseIterator(){return new ar(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ar(this.root,e,this.comparator,!0)}},ar=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},it=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=s??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw L(27949);return e+(this.isRed()?0:1)}};it.EMPTY=null,it.RED=!0,it.BLACK=!1;it.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new it(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var te=class n{constructor(e){this.comparator=e,this.data=new oe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Co(this.data.getIterator())}getIteratorFrom(e){return new Co(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Co=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};function Yn(n){return n.hasNext()?n.getNext():void 0}var Be=class n{constructor(e){this.fields=e,e.sort(fe.comparator)}static empty(){return new n([])}unionWith(e){let t=new te(fe.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return dr(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Do=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var pe=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Do("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return j(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};pe.EMPTY_BYTE_STRING=new pe("");var Kw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function _t(n){if(F(!!n,39018),typeof n=="string"){let e=0,t=Kw.exec(n);if(F(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ie(n.seconds),nanos:ie(n.nanos)}}function ie(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function yt(n){return typeof n=="string"?pe.fromBase64String(n):pe.fromUint8Array(n)}var rg="server_timestamp",ig="__type__",sg="__previous_value__",og="__local_write_time__";function Ch(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[ig])===null||t===void 0?void 0:t.stringValue)===rg}function Aa(n){let e=n.mapValue.fields[sg];return Ch(e)?Aa(e):e}function Ui(n){let e=_t(n.mapValue.fields[og].timestampValue);return new se(e.seconds,e.nanos)}var Uu=class{constructor(e,t,r,i,s,a,c,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}},ko="(default)",vr=class n{constructor(e,t){this.projectId=e,this.database=t||ko}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===ko}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Dh="__type__",ag="__max__",Vt={mapValue:{fields:{__type__:{stringValue:ag}}}},kh="__vector__",Ir="value",go={nullValue:"NULL_VALUE"};function Bt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ch(n)?4:cg(n)?9007199254740991:ba(n)?10:11:L(28295,{value:n})}function st(n,e){if(n===e)return!0;let t=Bt(n);if(t!==Bt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ui(n).isEqual(Ui(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let a=_t(i.timestampValue),c=_t(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return yt(i.bytesValue).isEqual(yt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ie(i.geoPointValue.latitude)===ie(s.geoPointValue.latitude)&&ie(i.geoPointValue.longitude)===ie(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ie(i.integerValue)===ie(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let a=ie(i.doubleValue),c=ie(s.doubleValue);return a===c?Vi(a)===Vi(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return dr(n.arrayValue.values||[],e.arrayValue.values||[],st);case 10:case 11:return function(i,s){let a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Lp(a)!==Lp(c))return!1;for(let u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!st(a[u],c[u])))return!1;return!0}(n,e);default:return L(52216,{left:n})}}function Bi(n,e){return(n.values||[]).find(t=>st(t,e))!==void 0}function qt(n,e){if(n===e)return 0;let t=Bt(n),r=Bt(e);if(t!==r)return j(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,e.booleanValue);case 2:return function(s,a){let c=ie(s.integerValue||s.doubleValue),u=ie(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Mp(n.timestampValue,e.timestampValue);case 4:return Mp(Ui(n),Ui(e));case 5:return Du(n.stringValue,e.stringValue);case 6:return function(s,a){let c=yt(s),u=yt(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){let c=s.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){let f=j(c[h],u[h]);if(f!==0)return f}return j(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){let c=j(ie(s.latitude),ie(a.latitude));return c!==0?c:j(ie(s.longitude),ie(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Fp(n.arrayValue,e.arrayValue);case 10:return function(s,a){var c,u,h,f;let m=s.fields||{},v=a.fields||{},S=(c=m[Ir])===null||c===void 0?void 0:c.arrayValue,C=(u=v[Ir])===null||u===void 0?void 0:u.arrayValue,N=j(((h=S?.values)===null||h===void 0?void 0:h.length)||0,((f=C?.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:Fp(S,C)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===Vt.mapValue&&a===Vt.mapValue)return 0;if(s===Vt.mapValue)return 1;if(a===Vt.mapValue)return-1;let c=s.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){let v=Du(u[m],f[m]);if(v!==0)return v;let S=qt(c[u[m]],h[f[m]]);if(S!==0)return S}return j(u.length,f.length)}(n.mapValue,e.mapValue);default:throw L(23264,{le:t})}}function Mp(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return j(n,e);let t=_t(n),r=_t(e),i=j(t.seconds,r.seconds);return i!==0?i:j(t.nanos,r.nanos)}function Fp(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let s=qt(t[i],r[i]);if(s)return s}return j(t.length,r.length)}function wr(n){return Bu(n)}function Bu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=_t(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return yt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return x.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Bu(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let a of r)s?s=!1:i+=",",i+=`${a}:${Bu(t.fields[a])}`;return i+"}"}(n.mapValue):L(61005,{value:n})}function _o(n){switch(Bt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=Aa(n);return e?16+_o(e):16;case 5:return 2*n.stringValue.length;case 6:return yt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+_o(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Jt(r.fields,(s,a)=>{i+=s.length+_o(a)}),i}(n.mapValue);default:throw L(13486,{value:n})}}function Nh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function qu(n){return!!n&&"integerValue"in n}function qi(n){return!!n&&"arrayValue"in n}function Up(n){return!!n&&"nullValue"in n}function Bp(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function yo(n){return!!n&&"mapValue"in n}function ba(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{})[Dh])===null||t===void 0?void 0:t.stringValue)===kh}function Ri(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return Jt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ri(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ri(n.arrayValue.values[t]);return e}return Object.assign({},n)}function cg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===ag}var ug={mapValue:{fields:{[Dh]:{stringValue:kh},[Ir]:{arrayValue:{}}}}};function Hw(n){return"nullValue"in n?go:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Nh(vr.empty(),x.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ba(n)?ug:{mapValue:{}}:L(35942,{value:n})}function Qw(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Nh(vr.empty(),x.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?ug:"mapValue"in n?ba(n)?{mapValue:{}}:Vt:L(61959,{value:n})}function qp(n,e){let t=qt(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function jp(n,e){let t=qt(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}var ke=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!yo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ri(t)}setAll(e){let t=fe.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){let u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=Ri(a):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());yo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return st(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];yo(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Jt(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(Ri(this.value))}};function lg(n){let e=[];return Jt(n.fields,(t,r)=>{let i=new fe([t]);if(yo(r)){let s=lg(r.mapValue).fields;if(s.length===0)e.push(i);else for(let a of s)e.push(i.child(a))}else e.push(i)}),new Be(e)}var ve=class n{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new n(e,0,q.min(),q.min(),q.min(),ke.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,q.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,q.min(),q.min(),ke.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,q.min(),q.min(),ke.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ke.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ke.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var jt=class{constructor(e,t){this.position=e,this.inclusive=t}};function zp(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],a=n.position[i];if(s.field.isKeyField()?r=x.comparator(x.fromName(a.referenceValue),t.key):r=qt(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function $p(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!st(n.position[t],e.position[t]))return!1;return!0}var Er=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function Jw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var No=class{},Q=class n extends No{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new $u(e,t,r):t==="array-contains"?new Ku(e,r):t==="in"?new Oo(e,r):t==="not-in"?new Hu(e,r):t==="array-contains-any"?new Qu(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Gu(e,r):new Wu(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(qt(t,this.value)):t!==null&&Bt(this.value)===Bt(t)&&this.matchesComparison(qt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},ee=class n extends No{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new n(e,t)}matches(e){return Tr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function Tr(n){return n.op==="and"}function ju(n){return n.op==="or"}function Oh(n){return hg(n)&&Tr(n)}function hg(n){for(let e of n.filters)if(e instanceof ee)return!1;return!0}function zu(n){if(n instanceof Q)return n.field.canonicalString()+n.op.toString()+wr(n.value);if(Oh(n))return n.filters.map(e=>zu(e)).join(",");{let e=n.filters.map(t=>zu(t)).join(",");return`${n.op}(${e})`}}function dg(n,e){return n instanceof Q?function(r,i){return i instanceof Q&&r.op===i.op&&r.field.isEqual(i.field)&&st(r.value,i.value)}(n,e):n instanceof ee?function(r,i){return i instanceof ee&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&dg(a,i.filters[c]),!0):!1}(n,e):void L(19439)}function fg(n,e){let t=n.filters.concat(e);return ee.create(t,n.op)}function pg(n){return n instanceof Q?function(t){return`${t.field.canonicalString()} ${t.op} ${wr(t.value)}`}(n):n instanceof ee?function(t){return t.op.toString()+" {"+t.getFilters().map(pg).join(" ,")+"}"}(n):"Filter"}var $u=class extends Q{constructor(e,t,r){super(e,t,r),this.key=x.fromName(r.referenceValue)}matches(e){let t=x.comparator(e.key,this.key);return this.matchesComparison(t)}},Gu=class extends Q{constructor(e,t){super(e,"in",t),this.keys=mg("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Wu=class extends Q{constructor(e,t){super(e,"not-in",t),this.keys=mg("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function mg(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>x.fromName(r.referenceValue))}var Ku=class extends Q{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return qi(t)&&Bi(t.arrayValue,this.value)}},Oo=class extends Q{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&Bi(this.value.arrayValue,t)}},Hu=class extends Q{constructor(e,t){super(e,"not-in",t)}matches(e){if(Bi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Bi(this.value.arrayValue,t)}},Qu=class extends Q{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!qi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Bi(this.value.arrayValue,r))}};var Ju=class{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.Pe=null}};function Yu(n,e=null,t=[],r=[],i=null,s=null,a=null){return new Ju(n,e,t,r,i,s,a)}function Pn(n){let e=G(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>zu(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Ia(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>wr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>wr(r)).join(",")),e.Pe=t}return e.Pe}function Xi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Jw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!dg(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!$p(n.startAt,e.startAt)&&$p(n.endAt,e.endAt)}function Vo(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function xo(n,e){return n.filters.filter(t=>t instanceof Q&&t.field.isEqual(e))}function Gp(n,e,t){let r=go,i=!0;for(let s of xo(n,e)){let a=go,c=!0;switch(s.op){case"<":case"<=":a=Hw(s.value);break;case"==":case"in":case">=":a=s.value;break;case">":a=s.value,c=!1;break;case"!=":case"not-in":a=go}qp({value:r,inclusive:i},{value:a,inclusive:c})<0&&(r=a,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){let a=t.position[s];qp({value:r,inclusive:i},{value:a,inclusive:t.inclusive})<0&&(r=a,i=t.inclusive);break}}return{value:r,inclusive:i}}function Wp(n,e,t){let r=Vt,i=!0;for(let s of xo(n,e)){let a=Vt,c=!0;switch(s.op){case">=":case">":a=Qw(s.value),c=!1;break;case"==":case"in":case"<=":a=s.value;break;case"<":a=s.value,c=!1;break;case"!=":case"not-in":a=Vt}jp({value:r,inclusive:i},{value:a,inclusive:c})>0&&(r=a,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){let a=t.position[s];jp({value:r,inclusive:i},{value:a,inclusive:t.inclusive})>0&&(r=a,i=t.inclusive);break}}return{value:r,inclusive:i}}var Ar=class{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function Yw(n,e,t,r,i,s,a,c){return new Ar(n,e,t,r,i,s,a,c)}function Sa(n){return new Ar(n)}function Kp(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Xw(n){return n.collectionGroup!==null}function Pi(n){let e=G(n);if(e.Te===null){e.Te=[];let t=new Set;for(let s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new te(fe.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new Er(s,r))}),t.has(fe.keyField().canonicalString())||e.Te.push(new Er(fe.keyField(),r))}return e.Te}function $e(n){let e=G(n);return e.Ie||(e.Ie=Zw(e,Pi(n))),e.Ie}function Zw(n,e){if(n.limitType==="F")return Yu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new Er(i.field,s)});let t=n.endAt?new jt(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new jt(n.startAt.position,n.startAt.inclusive):null;return Yu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Xu(n,e,t){return new Ar(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ra(n,e){return Xi($e(n),$e(e))&&n.limitType===e.limitType}function gg(n){return`${Pn($e(n))}|lt:${n.limitType}`}function rr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>pg(i)).join(", ")}]`),Ia(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>wr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>wr(i)).join(",")),`Target(${r})`}($e(n))}; limitType=${n.limitType})`}function Zi(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):x.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of Pi(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,u){let h=zp(a,c,u);return a.inclusive?h<=0:h<0}(r.startAt,Pi(r),i)||r.endAt&&!function(a,c,u){let h=zp(a,c,u);return a.inclusive?h>=0:h>0}(r.endAt,Pi(r),i))}(n,e)}function eE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function _g(n){return(e,t)=>{let r=!1;for(let i of Pi(n)){let s=tE(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function tE(n,e,t){let r=n.field.isKeyField()?x.comparator(e.key,t.key):function(s,a,c){let u=a.data.field(s),h=c.data.field(s);return u!==null&&h!==null?qt(u,h):L(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return L(19790,{direction:n.dir})}}var Je=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Jt(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return ng(this.inner)}size(){return this.innerSize}};var nE=new oe(x.comparator);function qe(){return nE}var yg=new oe(x.comparator);function Ei(...n){let e=yg;for(let t of n)e=e.insert(t.key,t);return e}function vg(n){let e=yg;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function nt(){return Ci()}function Ig(){return Ci()}function Ci(){return new Je(n=>n.toString(),(n,e)=>n.isEqual(e))}var rE=new oe(x.comparator),iE=new te(x.comparator);function W(...n){let e=iE;for(let t of n)e=e.add(t);return e}var sE=new te(j);function oE(){return sE}function Vh(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Vi(e)?"-0":e}}function wg(n){return{integerValue:""+n}}function aE(n,e){return Iw(e)?wg(e):Vh(n,e)}var br=class{constructor(){this._=void 0}};function cE(n,e,t){return n instanceof Cn?function(i,s){let a={fields:{[ig]:{stringValue:rg},[og]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ch(s)&&(s=Aa(s)),s&&(a.fields[sg]=s),{mapValue:a}}(t,e):n instanceof zt?Tg(n,e):n instanceof $t?Ag(n,e):function(i,s){let a=Eg(i,s),c=Hp(a)+Hp(i.Ee);return qu(a)&&qu(i.Ee)?wg(c):Vh(i.serializer,c)}(n,e)}function uE(n,e,t){return n instanceof zt?Tg(n,e):n instanceof $t?Ag(n,e):t}function Eg(n,e){return n instanceof Dn?function(r){return qu(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var Cn=class extends br{},zt=class extends br{constructor(e){super(),this.elements=e}};function Tg(n,e){let t=bg(e);for(let r of n.elements)t.some(i=>st(i,r))||t.push(r);return{arrayValue:{values:t}}}var $t=class extends br{constructor(e){super(),this.elements=e}};function Ag(n,e){let t=bg(e);for(let r of n.elements)t=t.filter(i=>!st(i,r));return{arrayValue:{values:t}}}var Dn=class extends br{constructor(e,t){super(),this.serializer=e,this.Ee=t}};function Hp(n){return ie(n.integerValue||n.doubleValue)}function bg(n){return qi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var Zu=class{constructor(e,t){this.field=e,this.transform=t}};function lE(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof zt&&i instanceof zt||r instanceof $t&&i instanceof $t?dr(r.elements,i.elements,st):r instanceof Dn&&i instanceof Dn?st(r.Ee,i.Ee):r instanceof Cn&&i instanceof Cn}(n.transform,e.transform)}var el=class{constructor(e,t){this.version=e,this.transformResults=t}},Ne=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function vo(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Sr=class{};function Sg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new kn(n.key,Ne.none()):new Gt(n.key,n.data,Ne.none());{let t=n.data,r=ke.empty(),i=new te(fe.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Ye(n.key,r,new Be(i.toArray()),Ne.none())}}function hE(n,e,t){n instanceof Gt?function(i,s,a){let c=i.value.clone(),u=Jp(i.fieldTransforms,s,a.transformResults);c.setAll(u),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Ye?function(i,s,a){if(!vo(i.precondition,s))return void s.convertToUnknownDocument(a.version);let c=Jp(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(Rg(i)),u.setAll(c),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Di(n,e,t,r){return n instanceof Gt?function(s,a,c,u){if(!vo(s.precondition,a))return c;let h=s.value.clone(),f=Yp(s.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ye?function(s,a,c,u){if(!vo(s.precondition,a))return c;let h=Yp(s.fieldTransforms,u,a),f=a.data;return f.setAll(Rg(s)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(s,a,c){return vo(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function dE(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=Eg(r.transform,i||null);s!=null&&(t===null&&(t=ke.empty()),t.set(r.field,s))}return t||null}function Qp(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&dr(r,i,(s,a)=>lE(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Gt=class extends Sr{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Ye=class extends Sr{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function Rg(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Jp(n,e,t){let r=new Map;F(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){let s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,uE(a,c,t[i]))}return r}function Yp(n,e,t){let r=new Map;for(let i of n){let s=i.transform,a=t.data.field(i.field);r.set(i.field,cE(s,a,e))}return r}var kn=class extends Sr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Lo=class extends Sr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var ji=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&hE(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=Di(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=Di(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Ig();return this.mutations.forEach(i=>{let s=e.get(i.key),a=s.overlayedDocument,c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;let u=Sg(a,c);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument(q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&dr(this.mutations,e.mutations,(t,r)=>Qp(t,r))&&dr(this.baseMutations,e.baseMutations,(t,r)=>Qp(t,r))}},tl=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){F(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return rE}(),s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new n(e,t,r,i)}};var zi=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var nl=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var ue,J;function fE(n){switch(n){case P.OK:return L(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return L(15467,{code:n})}}function Pg(n){if(n===void 0)return De("GRPC error has no .code"),P.UNKNOWN;switch(n){case ue.OK:return P.OK;case ue.CANCELLED:return P.CANCELLED;case ue.UNKNOWN:return P.UNKNOWN;case ue.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ue.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ue.INTERNAL:return P.INTERNAL;case ue.UNAVAILABLE:return P.UNAVAILABLE;case ue.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ue.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ue.NOT_FOUND:return P.NOT_FOUND;case ue.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ue.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ue.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ue.ABORTED:return P.ABORTED;case ue.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ue.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ue.DATA_LOSS:return P.DATA_LOSS;default:return L(39323,{code:n})}}(J=ue||(ue={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";var Xp=null;var pE=new pt([4294967295,4294967295],0);function Zp(n){let e=Um().encode(n),t=new hu;return t.update(e),new Uint8Array(t.digest())}function em(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new pt([t,r],0),new pt([i,s],0)]}var rl=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new vn(`Invalid padding: ${t}`);if(r<0)throw new vn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new vn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new vn(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=pt.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(pt.fromNumber(r)));return i.compare(pE)===1&&(i=new pt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;let t=Zp(e),[r,i]=em(t);for(let s=0;s<this.hashCount;s++){let a=this.pe(r,i,s);if(!this.ye(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new n(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.fe===0)return;let t=Zp(e),[r,i]=em(t);for(let s=0;s<this.hashCount;s++){let a=this.pe(r,i,s);this.we(a)}}we(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},vn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Mo=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,$i.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(q.min(),i,new oe(j),qe(),W())}},$i=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,W(),W(),W())}};var ur=class{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}},Fo=class{constructor(e,t){this.targetId=e,this.De=t}},Uo=class{constructor(e,t,r=pe.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},Bo=class{constructor(){this.ve=0,this.Ce=tm(),this.Fe=pe.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=W(),t=W(),r=W();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:L(38017,{changeType:s})}}),new $i(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=tm()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,F(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},il=class{constructor(e){this.We=e,this.Ge=new Map,this.ze=qe(),this.je=co(),this.Je=co(),this.He=new oe(j)}Ye(e){for(let t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(let t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{let r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:L(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){let t=e.targetId,r=e.De.count,i=this.st(t);if(i){let s=i.target;if(Vo(s))if(r===0){let a=new x(s.path);this.Xe(t,a,ve.newNoDocument(a,q.min()))}else F(r===1,20013,{expectedCount:r});else{let a=this.ot(t);if(a!==r){let c=this._t(e),u=c?this.ut(c,e,a):1;if(u!==0){this.rt(t);let h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}Xp?.ct(function(f,m,v,S,C){var N,k,z,B,M,K;let Y={localCacheCount:f,existenceFilterCount:m.count,databaseId:v.database,projectId:v.projectId},$=m.unchangedNames;return $&&(Y.bloomFilter={applied:C===0,hashCount:(N=$?.hashCount)!==null&&N!==void 0?N:0,bitmapLength:(B=(z=(k=$?.bits)===null||k===void 0?void 0:k.bitmap)===null||z===void 0?void 0:z.length)!==null&&B!==void 0?B:0,padding:(K=(M=$?.bits)===null||M===void 0?void 0:M.padding)!==null&&K!==void 0?K:0,mightContain:I=>{var g;return(g=S?.mightContain(I))!==null&&g!==void 0&&g}}),Y}(a,e.De,this.We.lt(),c,u))}}}}_t(e){let t=e.De.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,a,c;try{a=yt(r).toUint8Array()}catch(u){if(u instanceof Do)return Ut("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new rl(a,i,s)}catch(u){return Ut(u instanceof vn?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.fe===0?null:c}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){let r=this.We.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let a=this.We.lt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Xe(t,s,null),i++)}),i}Pt(e){let t=new Map;this.Ge.forEach((s,a)=>{let c=this.st(a);if(c){if(s.current&&Vo(c.target)){let u=new x(c.target.path);this.Tt(u).has(a)||this.It(a,u)||this.Xe(a,u,ve.newNoDocument(u,e))}s.Ne&&(t.set(a,s.Le()),s.ke())}});let r=W();this.Je.forEach((s,a)=>{let c=!0;a.forEachWhile(u=>{let h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ze.forEach((s,a)=>a.setReadTime(e));let i=new Mo(e,t,this.He,this.ze,r);return this.ze=qe(),this.je=co(),this.Je=co(),this.He=new oe(j),i}Ze(e,t){if(!this.nt(e))return;let r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;let i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){let t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Bo,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new te(j),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new te(j),this.je=this.je.insert(e,t)),t}nt(e){let t=this.st(e)!==null;return t||D("WatchChangeAggregator","Detected inactive target",e),t}st(e){let t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Bo),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}};function co(){return new oe(x.comparator)}function tm(){return new oe(x.comparator)}var mE={asc:"ASCENDING",desc:"DESCENDING"},gE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},_E={and:"AND",or:"OR"},sl=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function ol(n,e){return n.useProto3Json||Ia(e)?e:{value:e}}function Rr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Cg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function yE(n,e){return Rr(n,e.toTimestamp())}function Oe(n){return F(!!n,49232),q.fromTimestamp(function(t){let r=_t(t);return new se(r.seconds,r.nanos)}(n))}function xh(n,e){return al(n,e).canonicalString()}function al(n,e){let t=function(i){return new Z(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Dg(n){let e=Z.fromString(n);return F(Ug(e),10190,{key:e.toString()}),e}function qo(n,e){return xh(n.databaseId,e.path)}function bn(n,e){let t=Dg(e);if(t.get(1)!==n.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(Og(t))}function kg(n,e){return xh(n.databaseId,e)}function Ng(n){let e=Dg(n);return e.length===4?Z.emptyPath():Og(e)}function cl(n){return new Z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Og(n){return F(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function nm(n,e,t){return{name:qo(n,e),fields:t.value.mapValue.fields}}function vE(n,e,t){let r=bn(n,e.name),i=Oe(e.updateTime),s=e.createTime?Oe(e.createTime):q.min(),a=new ke({mapValue:{fields:e.fields}}),c=ve.newFoundDocument(r,i,s,a);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function IE(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string",58123),pe.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),pe.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){let f=h.code===void 0?P.UNKNOWN:Pg(h.code);return new V(f,h.message||"")}(a);t=new Uo(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=bn(n,r.document.name),s=Oe(r.document.updateTime),a=r.document.createTime?Oe(r.document.createTime):q.min(),c=new ke({mapValue:{fields:r.document.fields}}),u=ve.newFoundDocument(i,s,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new ur(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=bn(n,r.document),s=r.readTime?Oe(r.readTime):q.min(),a=ve.newNoDocument(i,s),c=r.removedTargetIds||[];t=new ur([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=bn(n,r.document),s=r.removedTargetIds||[];t=new ur([],s,i,null)}else{if(!("filter"in e))return L(11601,{At:e});{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,a=new nl(i,s),c=r.targetId;t=new Fo(c,a)}}return t}function jo(n,e){let t;if(e instanceof Gt)t={update:nm(n,e.key,e.value)};else if(e instanceof kn)t={delete:qo(n,e.key)};else if(e instanceof Ye)t={update:nm(n,e.key,e.data),updateMask:SE(e.fieldMask)};else{if(!(e instanceof Lo))return L(16599,{Rt:e.type});t={verify:qo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){let c=a.transform;if(c instanceof Cn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof zt)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof $t)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Dn)return{fieldPath:a.field.canonicalString(),increment:c.Ee};throw L(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:yE(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:L(27497)}(n,e.precondition)),t}function ul(n,e){let t=e.currentDocument?function(s){return s.updateTime!==void 0?Ne.updateTime(Oe(s.updateTime)):s.exists!==void 0?Ne.exists(s.exists):Ne.none()}(e.currentDocument):Ne.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(a,c){let u=null;if("setToServerValue"in c)F(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new Cn;else if("appendMissingElements"in c){let f=c.appendMissingElements.values||[];u=new zt(f)}else if("removeAllFromArray"in c){let f=c.removeAllFromArray.values||[];u=new $t(f)}else"increment"in c?u=new Dn(a,c.increment):L(16584,{proto:c});let h=fe.fromServerFormat(c.fieldPath);return new Zu(h,u)}(n,i)):[];if(e.update){e.update.name;let i=bn(n,e.update.name),s=new ke({mapValue:{fields:e.update.fields}});if(e.updateMask){let a=function(u){let h=u.fieldPaths||[];return new Be(h.map(f=>fe.fromServerFormat(f)))}(e.updateMask);return new Ye(i,s,a,t,r)}return new Gt(i,s,t,r)}if(e.delete){let i=bn(n,e.delete);return new kn(i,t)}if(e.verify){let i=bn(n,e.verify);return new Lo(i,t)}return L(1463,{proto:e})}function wE(n,e){return n&&n.length>0?(F(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?Oe(i.updateTime):Oe(s);return a.isEqual(q.min())&&(a=Oe(s)),new el(a,i.transformResults||[])}(t,e))):[]}function Vg(n,e){return{documents:[kg(n,e.path)]}}function xg(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=kg(n,i);let s=function(h){if(h.length!==0)return Fg(ee.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let a=function(h){if(h.length!==0)return h.map(f=>function(v){return{field:ir(v.field),direction:TE(v.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let c=ol(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:i}}function Lg(n){let e=Ng(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){F(r===1,65062);let f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(m){let v=Mg(m);return v instanceof ee&&Oh(v)?v.getFilters():[v]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(v=>function(C){return new Er(sr(C.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(v))}(t.orderBy));let c=null;t.limit&&(c=function(m){let v;return v=typeof m=="object"?m.value:m,Ia(v)?null:v}(t.limit));let u=null;t.startAt&&(u=function(m){let v=!!m.before,S=m.values||[];return new jt(S,v)}(t.startAt));let h=null;return t.endAt&&(h=function(m){let v=!m.before,S=m.values||[];return new jt(S,v)}(t.endAt)),Yw(e,i,a,s,c,"F",u,h)}function EE(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Mg(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=sr(t.unaryFilter.field);return Q.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=sr(t.unaryFilter.field);return Q.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=sr(t.unaryFilter.field);return Q.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=sr(t.unaryFilter.field);return Q.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}}(n):n.fieldFilter!==void 0?function(t){return Q.create(sr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ee.create(t.compositeFilter.filters.map(r=>Mg(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return L(1026)}}(t.compositeFilter.op))}(n):L(30097,{filter:n})}function TE(n){return mE[n]}function AE(n){return gE[n]}function bE(n){return _E[n]}function ir(n){return{fieldPath:n.canonicalString()}}function sr(n){return fe.fromServerFormat(n.fieldPath)}function Fg(n){return n instanceof Q?function(t){if(t.op==="=="){if(Bp(t.value))return{unaryFilter:{field:ir(t.field),op:"IS_NAN"}};if(Up(t.value))return{unaryFilter:{field:ir(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Bp(t.value))return{unaryFilter:{field:ir(t.field),op:"IS_NOT_NAN"}};if(Up(t.value))return{unaryFilter:{field:ir(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ir(t.field),op:AE(t.op),value:t.value}}}(n):n instanceof ee?function(t){let r=t.getFilters().map(i=>Fg(i));return r.length===1?r[0]:{compositeFilter:{op:bE(t.op),filters:r}}}(n):L(54877,{filter:n})}function SE(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ug(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var Pr=class n{constructor(e,t,r,i,s=q.min(),a=q.min(),c=pe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var zo=class{constructor(e){this.gt=e}};function RE(n,e){let t;if(e.document)t=vE(n.gt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){let r=x.fromSegments(e.noDocument.path),i=On(e.noDocument.readTime);t=ve.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L(56709);{let r=x.fromSegments(e.unknownDocument.path),i=On(e.unknownDocument.version);t=ve.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){let s=new se(i[0],i[1]);return q.fromTimestamp(s)}(e.readTime)),t}function rm(n,e){let t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:$o(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,a){return{name:qo(s,a.key),fields:a.data.value.mapValue.fields,updateTime:Rr(s,a.version.toTimestamp()),createTime:Rr(s,a.createTime.toTimestamp())}}(n.gt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Nn(e.version)};else{if(!e.isUnknownDocument())return L(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:Nn(e.version)}}return r}function $o(n){let e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Nn(n){let e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function On(n){let e=new se(n.seconds,n.nanoseconds);return q.fromTimestamp(e)}function mn(n,e){let t=(e.baseMutations||[]).map(s=>ul(n.gt,s));for(let s=0;s<e.mutations.length-1;++s){let a=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){let c=e.mutations[s+1];a.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}let r=e.mutations.map(s=>ul(n.gt,s)),i=se.fromMillis(e.localWriteTimeMs);return new ji(e.batchId,i,t,r)}function Ti(n){let e=On(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?On(n.lastLimboFreeSnapshotVersion):q.min(),r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){let a=s.documents.length;return F(a===1,1966,{count:a}),$e(Sa(Ng(s.documents[0])))}(n.query):function(s){return $e(Lg(s))}(n.query),new Pr(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,pe.fromBase64String(n.resumeToken))}function Bg(n,e){let t=Nn(e.snapshotVersion),r=Nn(e.lastLimboFreeSnapshotVersion),i;i=Vo(e.target)?Vg(n.gt,e.target):xg(n.gt,e.target).Vt;let s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Pn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function qg(n){let e=Lg({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Xu(e,e.limit,"L"):e}function _u(n,e){return new zi(e.largestBatchId,ul(n.gt,e.overlayMutation))}function im(n,e){let t=e.path.lastSegment();return[n,Se(e.path.popLast()),t]}function sm(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Nn(r.readTime),documentKey:Se(r.documentKey.path),largestBatchId:r.largestBatchId}}var ll=class{getBundleMetadata(e,t){return om(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:On(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return om(e).put(function(i){return{bundleId:i.id,createTime:Nn(Oe(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return am(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:qg(s.bundledQuery),readTime:On(s.readTime)}}(r)})}saveNamedQuery(e,t){return am(e).put(function(i){return{name:i.name,readTime:Nn(Oe(i.readTime)),bundledQuery:i.bundledQuery}}(t))}};function om(n){return me(n,wa)}function am(n){return me(n,Ea)}var Go=class n{constructor(e,t){this.serializer=e,this.userId=t}static yt(e,t){let r=t.uid||"";return new n(e,r)}getOverlay(e,t){return yi(e).get(im(this.userId,t)).next(r=>r?_u(this.serializer,r):null)}getOverlays(e,t){let r=nt();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){let i=[];return r.forEach((s,a)=>{let c=new zi(t,a);i.push(this.wt(e,c))}),b.waitFor(i)}removeOverlaysForBatchId(e,t,r){let i=new Set;t.forEach(a=>i.add(Se(a.getCollectionPath())));let s=[];return i.forEach(a=>{let c=IDBKeyRange.bound([this.userId,a,r],[this.userId,a,r+1],!1,!0);s.push(yi(e).Y(Fu,c))}),b.waitFor(s)}getOverlaysForCollection(e,t,r){let i=nt(),s=Se(t),a=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return yi(e).j(Fu,a).next(c=>{for(let u of c){let h=_u(this.serializer,u);i.set(h.getKey(),h)}return i})}getOverlaysForCollectionGroup(e,t,r,i){let s=nt(),a,c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return yi(e).X({index:Ym,range:c},(u,h,f)=>{let m=_u(this.serializer,h);s.size()<i||m.largestBatchId===a?(s.set(m.getKey(),m),a=m.largestBatchId):f.done()}).next(()=>s)}wt(e,t){return yi(e).put(function(i,s,a){let[c,u,h]=im(s,a.mutation.key);return{userId:s,collectionPath:u,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:jo(i.gt,a.mutation)}}(this.serializer,this.userId,t))}};function yi(n){return me(n,Ta)}var hl=class{St(e){return me(e,Rh)}getSessionToken(e){return this.St(e).get("sessionToken").next(t=>{let r=t?.value;return r?pe.fromUint8Array(r):pe.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}};var gt=class{constructor(){}bt(e,t){this.Dt(e,t),t.vt()}Dt(e,t){if("nullValue"in e)this.Ct(t,5);else if("booleanValue"in e)this.Ct(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(t,15),t.Ft(ie(e.integerValue));else if("doubleValue"in e){let r=ie(e.doubleValue);isNaN(r)?this.Ct(t,13):(this.Ct(t,15),Vi(r)?t.Ft(0):t.Ft(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ct(t,20),typeof r=="string"&&(r=_t(r)),t.Mt(`${r.seconds||""}`),t.Ft(r.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.Ct(t,30),t.Nt(yt(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Ct(t,45),t.Ft(r.latitude||0),t.Ft(r.longitude||0)}else"mapValue"in e?cg(e)?this.Ct(t,Number.MAX_SAFE_INTEGER):ba(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):L(19022,{Qt:e})}xt(e,t){this.Ct(t,25),this.$t(e,t)}$t(e,t){t.Mt(e)}kt(e,t){let r=e.fields||{};this.Ct(t,55);for(let i of Object.keys(r))this.xt(i,t),this.Dt(r[i],t)}Lt(e,t){var r,i;let s=e.fields||{};this.Ct(t,53);let a=Ir,c=((i=(r=s[a].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Ct(t,15),t.Ft(ie(c)),this.xt(a,t),this.Dt(s[a],t)}qt(e,t){let r=e.values||[];this.Ct(t,50);for(let i of r)this.Dt(i,t)}Bt(e,t){this.Ct(t,37),x.fromName(e).path.forEach(r=>{this.Ct(t,60),this.$t(r,t)})}Ct(e,t){e.Ft(t)}Ot(e){e.Ft(2)}};gt.Ut=new gt;var Xn=255;function PE(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function cm(n){let e=64-function(r){let i=0;for(let s=0;s<8;++s){let a=PE(255&r[s]);if(i+=a,a!==8)break}return i}(n);return Math.ceil(e/8)}var dl=class{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Kt(e){let t=e[Symbol.iterator](),r=t.next();for(;!r.done;)this.Wt(r.value),r=t.next();this.Gt()}zt(e){let t=e[Symbol.iterator](),r=t.next();for(;!r.done;)this.jt(r.value),r=t.next();this.Jt()}Ht(e){for(let t of e){let r=t.charCodeAt(0);if(r<128)this.Wt(r);else if(r<2048)this.Wt(960|r>>>6),this.Wt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Wt(480|r>>>12),this.Wt(128|63&r>>>6),this.Wt(128|63&r);else{let i=t.codePointAt(0);this.Wt(240|i>>>18),this.Wt(128|63&i>>>12),this.Wt(128|63&i>>>6),this.Wt(128|63&i)}}this.Gt()}Yt(e){for(let t of e){let r=t.charCodeAt(0);if(r<128)this.jt(r);else if(r<2048)this.jt(960|r>>>6),this.jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.jt(480|r>>>12),this.jt(128|63&r>>>6),this.jt(128|63&r);else{let i=t.codePointAt(0);this.jt(240|i>>>18),this.jt(128|63&i>>>12),this.jt(128|63&i>>>6),this.jt(128|63&i)}}this.Jt()}Zt(e){let t=this.Xt(e),r=cm(t);this.en(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}tn(e){let t=this.Xt(e),r=cm(t);this.en(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}nn(){this.rn(Xn),this.rn(255)}sn(){this._n(Xn),this._n(255)}reset(){this.position=0}seed(e){this.en(e.length),this.buffer.set(e,this.position),this.position+=e.length}an(){return this.buffer.slice(0,this.position)}Xt(e){let t=function(s){let a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,s,!1),new Uint8Array(a.buffer)}(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Wt(e){let t=255&e;t===0?(this.rn(0),this.rn(255)):t===Xn?(this.rn(Xn),this.rn(0)):this.rn(t)}jt(e){let t=255&e;t===0?(this._n(0),this._n(255)):t===Xn?(this._n(Xn),this._n(0)):this._n(e)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(e){this.en(1),this.buffer[this.position++]=e}_n(e){this.en(1),this.buffer[this.position++]=~e}en(e){let t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);let i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}},fl=class{constructor(e){this.un=e}Nt(e){this.un.Kt(e)}Mt(e){this.un.Ht(e)}Ft(e){this.un.Zt(e)}vt(){this.un.nn()}},pl=class{constructor(e){this.un=e}Nt(e){this.un.zt(e)}Mt(e){this.un.Yt(e)}Ft(e){this.un.tn(e)}vt(){this.un.sn()}},gn=class{constructor(){this.un=new dl,this.cn=new fl(this.un),this.ln=new pl(this.un)}seed(e){this.un.seed(e)}hn(e){return e===0?this.cn:this.ln}an(){return this.un.an()}reset(){this.un.reset()}};var _n=class n{constructor(e,t,r,i){this.Pn=e,this.Tn=t,this.In=r,this.dn=i}En(){let e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.dn,0),t!==e?r.set([0],this.dn.length):++r[r.length-1],new n(this.Pn,this.Tn,this.In,r)}An(e,t,r){return{indexId:this.Pn,uid:e,arrayValue:Io(this.In),directionalValue:Io(this.dn),orderedDocumentKey:Io(t),documentKey:r.path.toArray()}}Rn(e,t,r){let i=this.An(e,t,r);return[i.indexId,i.uid,i.arrayValue,i.directionalValue,i.orderedDocumentKey,i.documentKey]}};function Dt(n,e){let t=n.Pn-e.Pn;return t!==0?t:(t=um(n.In,e.In),t!==0?t:(t=um(n.dn,e.dn),t!==0?t:x.comparator(n.Tn,e.Tn)))}function um(n,e){for(let t=0;t<n.length&&t<e.length;++t){let r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function Io(n){return lc()?function(t){let r="";for(let i=0;i<t.length;i++)r+=String.fromCharCode(t[i]);return r}(n):n}function lm(n){return typeof n!="string"?n:function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(n)}var Wo=class{constructor(e){this.Vn=new te((t,r)=>fe.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.mn=e.orderBy,this.fn=[];for(let t of e.filters){let r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.fn.push(r)}}get gn(){return this.Vn.size>1}pn(e){if(F(e.collectionGroup===this.collectionId,49279),this.gn)return!1;let t=ku(e);if(t!==void 0&&!this.yn(t))return!1;let r=dn(e),i=new Set,s=0,a=0;for(;s<r.length&&this.yn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Vn.size>0){let c=this.Vn.getIterator().getNext();if(!i.has(c.field.canonicalString())){let u=r[s];if(!this.wn(c,u)||!this.Sn(this.mn[a++],u))return!1}++s}for(;s<r.length;++s){let c=r[s];if(a>=this.mn.length||!this.Sn(this.mn[a++],c))return!1}return!0}bn(){if(this.gn)return null;let e=new te(fe.comparator),t=[];for(let r of this.fn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new cr(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new cr(r.field,0))}for(let r of this.mn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new cr(r.field,r.dir==="asc"?0:1)));return new fr(fr.UNKNOWN_ID,this.collectionId,t,Oi.empty())}yn(e){for(let t of this.fn)if(this.wn(t,e))return!0;return!1}wn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;let r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}Sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}};function jg(n){var e,t;if(F(n instanceof Q||n instanceof ee,20012),n instanceof Q){if(n instanceof Oo){let i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>Q.create(n.field,"==",s)))||[];return ee.create(i,"or")}return n}let r=n.filters.map(i=>jg(i));return ee.create(r,n.op)}function CE(n){if(n.getFilters().length===0)return[];let e=_l(jg(n));return F(zg(e),7391),ml(e)||gl(e)?[e]:e.getFilters()}function ml(n){return n instanceof Q}function gl(n){return n instanceof ee&&Oh(n)}function zg(n){return ml(n)||gl(n)||function(t){if(t instanceof ee&&ju(t)){for(let r of t.getFilters())if(!ml(r)&&!gl(r))return!1;return!0}return!1}(n)}function _l(n){if(F(n instanceof Q||n instanceof ee,34018),n instanceof Q)return n;if(n.filters.length===1)return _l(n.filters[0]);let e=n.filters.map(r=>_l(r)),t=ee.create(e,n.op);return t=Ko(t),zg(t)?t:(F(t instanceof ee,64498),F(Tr(t),40251),F(t.filters.length>1,57927),t.filters.reduce((r,i)=>Lh(r,i)))}function Lh(n,e){let t;return F(n instanceof Q||n instanceof ee,38388),F(e instanceof Q||e instanceof ee,25473),t=n instanceof Q?e instanceof Q?function(i,s){return ee.create([i,s],"and")}(n,e):hm(n,e):e instanceof Q?hm(e,n):function(i,s){if(F(i.filters.length>0&&s.filters.length>0,48005),Tr(i)&&Tr(s))return fg(i,s.getFilters());let a=ju(i)?i:s,c=ju(i)?s:i,u=a.filters.map(h=>Lh(h,c));return ee.create(u,"or")}(n,e),Ko(t)}function hm(n,e){if(Tr(e))return fg(e,n.getFilters());{let t=e.filters.map(r=>Lh(n,r));return ee.create(t,"or")}}function Ko(n){if(F(n instanceof Q||n instanceof ee,11850),n instanceof Q)return n;let e=n.getFilters();if(e.length===1)return Ko(e[0]);if(hg(n))return n;let t=e.map(i=>Ko(i)),r=[];return t.forEach(i=>{i instanceof Q?r.push(i):i instanceof ee&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ee.create(r,n.op)}var yl=class{constructor(){this.Dn=new Gi}addToCollectionParentIndex(e,t){return this.Dn.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(Ge.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(Ge.min())}updateCollectionGroup(e,t,r){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}},Gi=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new te(Z.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new te(Z.comparator)).toArray()}};var dm="IndexedDbIndexManager",uo=new Uint8Array(0),vl=class{constructor(e,t){this.databaseId=t,this.vn=new Gi,this.Cn=new Je(r=>Pn(r),(r,i)=>Xi(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){let r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.vn.add(t)});let s={collectionId:r,parent:Se(i)};return fm(e).put(s)}return b.resolve()}getCollectionParents(e,t){let r=[],i=IDBKeyRange.bound([t,""],[Bm(t),""],!1,!0);return fm(e).j(i).next(s=>{for(let a of s){if(a.collectionId!==t)break;r.push(tt(a.parent))}return r})}addFieldIndex(e,t){let r=vi(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;let s=r.add(i);if(t.indexState){let a=er(e);return s.next(c=>{a.put(sm(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){let r=vi(e),i=er(e),s=Zn(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){let t=vi(e),r=Zn(e),i=er(e);return t.Y().next(()=>r.Y()).next(()=>i.Y())}createTargetIndexes(e,t){return b.forEach(this.Fn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){let s=new Wo(r).bn();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){let r=Zn(e),i=!0,s=new Map;return b.forEach(this.Fn(t),a=>this.Mn(e,a).next(c=>{i&&(i=!!c),s.set(a,c)})).next(()=>{if(i){let a=W(),c=[];return b.forEach(s,(u,h)=>{D(dm,`Using index ${function(M){return`id=${M.indexId}|cg=${M.collectionGroup}|f=${M.fields.map(K=>`${K.fieldPath}:${K.kind}`).join(",")}`}(u)} to execute ${Pn(t)}`);let f=function(M,K){let Y=ku(K);if(Y===void 0)return null;for(let $ of xo(M,Y.fieldPath))switch($.op){case"array-contains-any":return $.value.arrayValue.values||[];case"array-contains":return[$.value]}return null}(h,u),m=function(M,K){let Y=new Map;for(let $ of dn(K))for(let I of xo(M,$.fieldPath))switch(I.op){case"==":case"in":Y.set($.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return Y.set($.fieldPath.canonicalString(),I.value),Array.from(Y.values())}return null}(h,u),v=function(M,K){let Y=[],$=!0;for(let I of dn(K)){let g=I.kind===0?Gp(M,I.fieldPath,M.startAt):Wp(M,I.fieldPath,M.startAt);Y.push(g.value),$&&($=g.inclusive)}return new jt(Y,$)}(h,u),S=function(M,K){let Y=[],$=!0;for(let I of dn(K)){let g=I.kind===0?Wp(M,I.fieldPath,M.endAt):Gp(M,I.fieldPath,M.endAt);Y.push(g.value),$&&($=g.inclusive)}return new jt(Y,$)}(h,u),C=this.xn(u,h,v),N=this.xn(u,h,S),k=this.On(u,h,m),z=this.Nn(u.indexId,f,C,v.inclusive,N,S.inclusive,k);return b.forEach(z,B=>r.H(B,t.limit).next(M=>{M.forEach(K=>{let Y=x.fromSegments(K.documentKey);a.has(Y)||(a=a.add(Y),c.push(Y))})}))}).next(()=>c)}return b.resolve(null)})}Fn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=CE(ee.create(e.filters,"and")).map(r=>Yu(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}Nn(e,t,r,i,s,a,c){let u=(t!=null?t.length:1)*Math.max(r.length,s.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){let v=t?this.Bn(t[m/h]):uo,S=this.Ln(e,v,r[m%h],i),C=this.kn(e,v,s[m%h],a),N=c.map(k=>this.Ln(e,v,k,!0));f.push(...this.createRange(S,C,N))}return f}Ln(e,t,r,i){let s=new _n(e,x.empty(),t,r);return i?s:s.En()}kn(e,t,r,i){let s=new _n(e,x.empty(),t,r);return i?s.En():s}Mn(e,t){let r=new Wo(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let a=null;for(let c of s)r.pn(c)&&(!a||c.fields.length>a.fields.length)&&(a=c);return a})}getIndexType(e,t){let r=2,i=this.Fn(t);return b.forEach(i,s=>this.Mn(e,s).next(a=>{a?r!==0&&a.fields.length<function(u){let h=new te(fe.comparator),f=!1;for(let m of u.filters)for(let v of m.getFlattenedFilters())v.field.isKeyField()||(v.op==="array-contains"||v.op==="array-contains-any"?f=!0:h=h.add(v.field));for(let m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(s)&&(r=1):r=0})).next(()=>function(a){return a.limit!==null}(t)&&i.length>1&&r===2?1:r)}qn(e,t){let r=new gn;for(let i of dn(e)){let s=t.data.field(i.fieldPath);if(s==null)return null;let a=r.hn(i.kind);gt.Ut.bt(s,a)}return r.an()}Bn(e){let t=new gn;return gt.Ut.bt(e,t.hn(0)),t.an()}Qn(e,t){let r=new gn;return gt.Ut.bt(Nh(this.databaseId,t),r.hn(function(s){let a=dn(s);return a.length===0?0:a[a.length-1].kind}(e))),r.an()}On(e,t,r){if(r===null)return[];let i=[];i.push(new gn);let s=0;for(let a of dn(e)){let c=r[s++];for(let u of i)if(this.$n(t,a.fieldPath)&&qi(c))i=this.Un(i,a,c);else{let h=u.hn(a.kind);gt.Ut.bt(c,h)}}return this.Kn(i)}xn(e,t,r){return this.On(e,t,r.position)}Kn(e){let t=[];for(let r=0;r<e.length;++r)t[r]=e[r].an();return t}Un(e,t,r){let i=[...e],s=[];for(let a of r.arrayValue.values||[])for(let c of i){let u=new gn;u.seed(c.an()),gt.Ut.bt(a,u.hn(t.kind)),s.push(u)}return s}$n(e,t){return!!e.filters.find(r=>r instanceof Q&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){let r=vi(e),i=er(e);return(t?r.j(Mu,IDBKeyRange.bound(t,t)):r.j()).next(s=>{let a=[];return b.forEach(s,c=>i.get([c.indexId,this.uid]).next(u=>{a.push(function(f,m){let v=m?new Oi(m.sequenceNumber,new Ge(On(m.readTime),new x(tt(m.documentKey)),m.largestBatchId)):Oi.empty(),S=f.fields.map(([C,N])=>new cr(fe.fromServerFormat(C),N));return new fr(f.indexId,f.collectionGroup,S,v)}(c,u))})).next(()=>a)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{let s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:j(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){let i=vi(e),s=er(e);return this.Wn(e).next(a=>i.j(Mu,IDBKeyRange.bound(t,t)).next(c=>b.forEach(c,u=>s.put(sm(u.indexId,this.uid,a,r)))))}updateIndexEntries(e,t){let r=new Map;return b.forEach(t,(i,s)=>{let a=r.get(i.collectionGroup);return(a?b.resolve(a):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(r.set(i.collectionGroup,c),b.forEach(c,u=>this.Gn(e,i,u).next(h=>{let f=this.zn(s,u);return h.isEqual(f)?b.resolve():this.jn(e,s,u,h,f)}))))})}Jn(e,t,r,i){return Zn(e).put(i.An(this.uid,this.Qn(r,t.key),t.key))}Hn(e,t,r,i){return Zn(e).delete(i.Rn(this.uid,this.Qn(r,t.key),t.key))}Gn(e,t,r){let i=Zn(e),s=new te(Dt);return i.X({index:Jm,range:IDBKeyRange.only([r.indexId,this.uid,Io(this.Qn(r,t))])},(a,c)=>{s=s.add(new _n(r.indexId,t,lm(c.arrayValue),lm(c.directionalValue)))}).next(()=>s)}zn(e,t){let r=new te(Dt),i=this.qn(t,e);if(i==null)return r;let s=ku(t);if(s!=null){let a=e.data.field(s.fieldPath);if(qi(a))for(let c of a.arrayValue.values||[])r=r.add(new _n(t.indexId,e.key,this.Bn(c),i))}else r=r.add(new _n(t.indexId,e.key,uo,i));return r}jn(e,t,r,i,s){D(dm,"Updating index entries for document '%s'",t.key);let a=[];return function(u,h,f,m,v){let S=u.getIterator(),C=h.getIterator(),N=Yn(S),k=Yn(C);for(;N||k;){let z=!1,B=!1;if(N&&k){let M=f(N,k);M<0?B=!0:M>0&&(z=!0)}else N!=null?B=!0:z=!0;z?(m(k),k=Yn(C)):B?(v(N),N=Yn(S)):(N=Yn(S),k=Yn(C))}}(i,s,Dt,c=>{a.push(this.Jn(e,t,r,c))},c=>{a.push(this.Hn(e,t,r,c))}),b.waitFor(a)}Wn(e){let t=1;return er(e).X({index:Qm,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((a,c)=>Dt(a,c)).filter((a,c,u)=>!c||Dt(a,u[c-1])!==0);let i=[];i.push(e);for(let a of r){let c=Dt(a,e),u=Dt(a,t);if(c===0)i[0]=e.En();else if(c>0&&u<0)i.push(a),i.push(a.En());else if(u>0)break}i.push(t);let s=[];for(let a=0;a<i.length;a+=2){if(this.Yn(i[a],i[a+1]))return[];let c=i[a].Rn(this.uid,uo,x.empty()),u=i[a+1].Rn(this.uid,uo,x.empty());s.push(IDBKeyRange.bound(c,u))}return s}Yn(e,t){return Dt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(pm)}getMinOffset(e,t){return b.mapArray(this.Fn(t),r=>this.Mn(e,r).next(i=>i||L(44426))).next(pm)}};function fm(n){return me(n,Mi)}function Zn(n){return me(n,Si)}function vi(n){return me(n,Sh)}function er(n){return me(n,bi)}function pm(n){F(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){let i=n[r].indexState.offset;Th(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Ge(e.readTime,e.documentKey,t)}var mm={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},$g=41943040,xe=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};function Gg(n,e,t){let r=n.store(Qe),i=n.store(mr),s=[],a=IDBKeyRange.only(t.batchId),c=0,u=r.X({range:a},(f,m,v)=>(c++,v.delete()));s.push(u.next(()=>{F(c===1,47070,{batchId:t.batchId})}));let h=[];for(let f of t.mutations){let m=Wm(e,f.key.path,t.batchId);s.push(i.delete(m)),h.push(f.key)}return b.waitFor(s).next(()=>h)}function Ho(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw L(14731);e=n.noDocument}return JSON.stringify(e).length}xe.DEFAULT_COLLECTION_PERCENTILE=10,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,xe.DEFAULT=new xe($g,xe.DEFAULT_COLLECTION_PERCENTILE,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),xe.DISABLED=new xe(-1,0,0);var Qo=class n{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Zn={}}static yt(e,t,r,i){F(e.uid!=="",64387);let s=e.isAuthenticated()?e.uid:"";return new n(s,t,r,i)}checkEmpty(e){let t=!0,r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return kt(e).X({index:yn,range:r},(i,s,a)=>{t=!1,a.done()}).next(()=>t)}addMutationBatch(e,t,r,i){let s=or(e),a=kt(e);return a.add({}).next(c=>{F(typeof c=="number",49019);let u=new ji(c,t,r,i),h=function(S,C,N){let k=N.baseMutations.map(B=>jo(S.gt,B)),z=N.mutations.map(B=>jo(S.gt,B));return{userId:C,batchId:N.batchId,localWriteTimeMs:N.localWriteTime.toMillis(),baseMutations:k,mutations:z}}(this.serializer,this.userId,u),f=[],m=new te((v,S)=>j(v.canonicalString(),S.canonicalString()));for(let v of i){let S=Wm(this.userId,v.key.path,c);m=m.add(v.key.path.popLast()),f.push(a.put(h)),f.push(s.put(S,Tw))}return m.forEach(v=>{f.push(this.indexManager.addToCollectionParentIndex(e,v))}),e.addOnCommittedListener(()=>{this.Zn[c]=u.keys()}),b.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return kt(e).get(t).next(r=>r?(F(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),mn(this.serializer,r)):null)}Xn(e,t){return this.Zn[t]?b.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){let i=r.keys();return this.Zn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]),s=null;return kt(e).X({index:yn,range:i},(a,c,u)=>{c.userId===this.userId&&(F(c.batchId>=r,47524,{er:r}),s=mn(this.serializer,c)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),r=Tn;return kt(e).X({index:yn,range:t,reverse:!0},(i,s,a)=>{r=s.batchId,a.done()}).next(()=>r)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,Tn],[this.userId,Number.POSITIVE_INFINITY]);return kt(e).j(yn,t).next(r=>r.map(i=>mn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){let r=po(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return or(e).X({range:i},(a,c,u)=>{let[h,f,m]=a,v=tt(f);if(h===this.userId&&t.path.isEqual(v))return kt(e).get(m).next(S=>{if(!S)throw L(61480,{tr:a,batchId:m});F(S.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:S.userId,batchId:m}),s.push(mn(this.serializer,S))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new te(j),i=[];return t.forEach(s=>{let a=po(this.userId,s.path),c=IDBKeyRange.lowerBound(a),u=or(e).X({range:c},(h,f,m)=>{let[v,S,C]=h,N=tt(S);v===this.userId&&s.path.isEqual(N)?r=r.add(C):m.done()});i.push(u)}),b.waitFor(i).next(()=>this.nr(e,r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=po(this.userId,r),a=IDBKeyRange.lowerBound(s),c=new te(j);return or(e).X({range:a},(u,h,f)=>{let[m,v,S]=u,C=tt(v);m===this.userId&&r.isPrefixOf(C)?C.length===i&&(c=c.add(S)):f.done()}).next(()=>this.nr(e,c))}nr(e,t){let r=[],i=[];return t.forEach(s=>{i.push(kt(e).get(s).next(a=>{if(a===null)throw L(35274,{batchId:s});F(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:s}),r.push(mn(this.serializer,a))}))}),b.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return Gg(e.ce,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.rr(t.batchId)}),b.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}rr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return b.resolve();let r=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),i=[];return or(e).X({range:r},(s,a,c)=>{if(s[0]===this.userId){let u=tt(s[1]);i.push(u)}else c.done()}).next(()=>{F(i.length===0,56720,{ir:i.map(s=>s.canonicalString())})})})}containsKey(e,t){return Wg(e,this.userId,t)}sr(e){return Kg(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Tn,lastStreamToken:""})}};function Wg(n,e,t){let r=po(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r),a=!1;return or(n).X({range:s,Z:!0},(c,u,h)=>{let[f,m,v]=c;f===e&&m===i&&(a=!0),h.done()}).next(()=>a)}function kt(n){return me(n,Qe)}function or(n){return me(n,mr)}function Kg(n){return me(n,xi)}var Cr=class n{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new n(0)}static ur(){return new n(-1)}};var Il=class{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.cr(e).next(t=>{let r=new Cr(t.highestTargetId);return t.highestTargetId=r.next(),this.lr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.cr(e).next(t=>q.fromTimestamp(new se(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.cr(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.cr(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.lr(e,i)))}addTargetData(e,t){return this.hr(e,t).next(()=>this.cr(e).next(r=>(r.targetCount+=1,this.Pr(t,r),this.lr(e,r))))}updateTargetData(e,t){return this.hr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>tr(e).delete(t.targetId)).next(()=>this.cr(e)).next(r=>(F(r.targetCount>0,8065),r.targetCount-=1,this.lr(e,r)))}removeTargets(e,t,r){let i=0,s=[];return tr(e).X((a,c)=>{let u=Ti(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))}).next(()=>b.waitFor(s)).next(()=>i)}forEachTarget(e,t){return tr(e).X((r,i)=>{let s=Ti(i);t(s)})}cr(e){return gm(e).get(Po).next(t=>(F(t!==null,2888),t))}lr(e,t){return gm(e).put(Po,t)}hr(e,t){return tr(e).put(Bg(this.serializer,t))}Pr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.cr(e).next(t=>t.targetCount)}getTargetData(e,t){let r=Pn(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]),s=null;return tr(e).X({range:i,index:Hm},(a,c,u)=>{let h=Ti(c);Xi(t,h.target)&&(s=h,u.done())}).next(()=>s)}addMatchingKeys(e,t,r){let i=[],s=Ot(e);return t.forEach(a=>{let c=Se(a.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,a))}),b.waitFor(i)}removeMatchingKeys(e,t,r){let i=Ot(e);return b.forEach(t,s=>{let a=Se(s.path);return b.waitFor([i.delete([r,a]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){let r=Ot(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){let r=IDBKeyRange.bound([t],[t+1],!1,!0),i=Ot(e),s=W();return i.X({range:r,Z:!0},(a,c,u)=>{let h=tt(a[1]),f=new x(h);s=s.add(f)}).next(()=>s)}containsKey(e,t){let r=Se(t.path),i=IDBKeyRange.bound([r],[Bm(r)],!1,!0),s=0;return Ot(e).X({index:bh,Z:!0,range:i},([a,c],u,h)=>{a!==0&&(s++,h.done())}).next(()=>s>0)}Et(e,t){return tr(e).get(t).next(r=>r?Ti(r):null)}};function tr(n){return me(n,gr)}function gm(n){return me(n,An)}function Ot(n){return me(n,_r)}var _m="LruGarbageCollector",Hg=1048576;function ym([n,e],[t,r]){let i=j(n,t);return i===0?j(e,r):i}var wl=class{constructor(e){this.Tr=e,this.buffer=new te(ym),this.Ir=0}dr(){return++this.Ir}Er(e){let t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();ym(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},Jo=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){D(_m,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Qt(t)?D(_m,"Ignoring IndexedDB error during garbage collection: ",t):await Ln(t)}await this.Rr(3e5)})}},El=class{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return b.resolve(Le.ue);let r=new wl(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(mm)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),mm):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,a,c,u,h,f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,a=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(h=Date.now(),nr()<=H.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}};function Qg(n,e){return new El(n,e)}var Tl=class{constructor(e,t){this.db=e,this.garbageCollector=Qg(this,t)}mr(e){let t=this.yr(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}gr(e,t){return this.wr(e,(r,i)=>t(i))}addReference(e,t,r){return lo(e,r)}removeReference(e,t,r){return lo(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return lo(e,t)}Sr(e,t){return function(i,s){let a=!1;return Kg(i).ee(c=>Wg(i,c,s).next(u=>(u&&(a=!0),b.resolve(!u)))).next(()=>a)}(e,t)}removeOrphanedDocuments(e,t){let r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[],s=0;return this.wr(e,(a,c)=>{if(c<=t){let u=this.Sr(e,a).next(h=>{if(!h)return s++,r.getEntry(e,a).next(()=>(r.removeEntry(a,q.min()),Ot(e).delete(function(m){return[0,Se(m.path)]}(a))))});i.push(u)}}).next(()=>b.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return lo(e,t)}wr(e,t){let r=Ot(e),i,s=Le.ue;return r.X({index:bh},([a,c],{path:u,sequenceNumber:h})=>{a===0?(s!==Le.ue&&t(new x(tt(i)),s),s=h,i=u):s=Le.ue}).next(()=>{s!==Le.ue&&t(new x(tt(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}};function lo(n,e){return Ot(n).put(function(r,i){return{targetId:0,path:Se(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}var Yo=class{constructor(){this.changes=new Je(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?b.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Al=class{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return hn(e).put(r)}removeEntry(e,t,r){return hn(e).delete(function(s,a){let c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],$o(a),c[c.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.br(e,r)))}getEntry(e,t){let r=ve.newInvalidDocument(t);return hn(e).X({index:mo,range:IDBKeyRange.only(Ii(t))},(i,s)=>{r=this.Dr(t,s)}).next(()=>r)}vr(e,t){let r={size:0,document:ve.newInvalidDocument(t)};return hn(e).X({index:mo,range:IDBKeyRange.only(Ii(t))},(i,s)=>{r={document:this.Dr(t,s),size:Ho(s)}}).next(()=>r)}getEntries(e,t){let r=qe();return this.Cr(e,t,(i,s)=>{let a=this.Dr(i,s);r=r.insert(i,a)}).next(()=>r)}Fr(e,t){let r=qe(),i=new oe(x.comparator);return this.Cr(e,t,(s,a)=>{let c=this.Dr(s,a);r=r.insert(s,c),i=i.insert(s,Ho(a))}).next(()=>({documents:r,Mr:i}))}Cr(e,t,r){if(t.isEmpty())return b.resolve();let i=new te(wm);t.forEach(u=>i=i.add(u));let s=IDBKeyRange.bound(Ii(i.first()),Ii(i.last())),a=i.getIterator(),c=a.getNext();return hn(e).X({index:mo,range:s},(u,h,f)=>{let m=x.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&wm(c,m)<0;)r(c,null),c=a.getNext();c&&c.isEqual(m)&&(r(c,h),c=a.hasNext()?a.getNext():null),c?f.G(Ii(c)):f.done()}).next(()=>{for(;c;)r(c,null),c=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){let a=t.path,c=[a.popLast().toArray(),a.lastSegment(),$o(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return hn(e).j(IDBKeyRange.bound(c,u,!0)).next(h=>{s?.incrementDocumentReadCount(h.length);let f=qe();for(let m of h){let v=this.Dr(x.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);v.isFoundDocument()&&(Zi(t,v)||i.has(v.key))&&(f=f.insert(v.key,v))}return f})}getAllFromCollectionGroup(e,t,r,i){let s=qe(),a=Im(t,r),c=Im(t,Ge.max());return hn(e).X({index:Km,range:IDBKeyRange.bound(a,c,!0)},(u,h,f)=>{let m=this.Dr(x.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);s=s.insert(m.key,m),s.size===i&&f.done()}).next(()=>s)}newChangeBuffer(e){return new bl(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return vm(e).get(Lu).next(t=>(F(!!t,20021),t))}br(e,t){return vm(e).put(Lu,t)}Dr(e,t){if(t){let r=RE(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(q.min())))return r}return ve.newInvalidDocument(e)}};function Jg(n){return new Al(n)}var bl=class extends Yo{constructor(e,t){super(),this.Or=e,this.trackRemovals=t,this.Nr=new Je(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){let t=[],r=0,i=new te((s,a)=>j(s.canonicalString(),a.canonicalString()));return this.changes.forEach((s,a)=>{let c=this.Nr.get(s);if(t.push(this.Or.removeEntry(e,s,c.readTime)),a.isValidDocument()){let u=rm(this.Or.serializer,a);i=i.add(s.path.popLast());let h=Ho(u);r+=h-c.size,t.push(this.Or.addEntry(e,s,u))}else if(r-=c.size,this.trackRemovals){let u=rm(this.Or.serializer,a.convertToNoDocument(q.min()));t.push(this.Or.addEntry(e,s,u))}}),i.forEach(s=>{t.push(this.Or.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.Or.updateMetadata(e,r)),b.waitFor(t)}getFromCache(e,t){return this.Or.vr(e,t).next(r=>(this.Nr.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.Or.Fr(e,t).next(({documents:r,Mr:i})=>(i.forEach((s,a)=>{this.Nr.set(s,{size:a,readTime:r.get(s).readTime})}),r))}};function vm(n){return me(n,Li)}function hn(n){return me(n,Ro)}function Ii(n){let e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Im(n,e){let t=e.documentKey.path.toArray();return[n,$o(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function wm(n,e){let t=n.path.toArray(),r=e.path.toArray(),i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=j(t[s],r[s]),i)return i;return i=j(t.length,r.length),i||(i=j(t[t.length-2],r[r.length-2]),i||j(t[t.length-1],r[r.length-1]))}var Sl=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var Xo=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Di(r.mutation,i,Be.empty(),se.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,W()).next(()=>r))}getLocalViewOfDocuments(e,t,r=W()){let i=nt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Ei();return s.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=nt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,W()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=qe(),a=Ci(),c=function(){return Ci()}();return t.forEach((u,h)=>{let f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Ye)?s=s.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Di(f.mutation,h,f.mutation.getFieldMask(),se.now())):a.set(h.key,Be.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var m;return c.set(h,new Sl(f,(m=a.get(h))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){let r=Ci(),i=new oe((a,c)=>a-c),s=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let c of a)c.keys().forEach(u=>{let h=t.get(u);if(h===null)return;let f=r.get(u)||Be.empty();f=c.applyToLocalView(h,f),r.set(u,f);let m=(i.get(c.batchId)||W()).add(u);i=i.insert(c.batchId,m)})}).next(()=>{let a=[],c=i.getReverseIterator();for(;c.hasNext();){let u=c.getNext(),h=u.key,f=u.value,m=Ig();f.forEach(v=>{if(!s.has(v)){let S=Sg(t.get(v),r.get(v));S!==null&&m.set(v,S),s=s.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return b.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return x.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Xw(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):b.resolve(nt()),c=Ni,u=s;return a.next(h=>b.forEach(h,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(f)?b.resolve():this.remoteDocumentCache.getEntry(e,f).next(v=>{u=u.insert(f,v)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,W())).next(f=>({batchId:c,changes:vg(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next(r=>{let i=Ei();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,a=Ei();return this.indexManager.getCollectionParents(e,s).next(c=>b.forEach(c,u=>{let h=function(m,v){return new Ar(v,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((m,v)=>{a=a.insert(m,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((u,h)=>{let f=h.getKey();a.get(f)===null&&(a=a.insert(f,ve.newInvalidDocument(f)))});let c=Ei();return a.forEach((u,h)=>{let f=s.get(u);f!==void 0&&Di(f.mutation,h,Be.empty(),se.now()),Zi(t,h)&&(c=c.insert(u,h))}),c})}};var Rl=class{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return b.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Oe(i.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:qg(i.bundledQuery),readTime:Oe(i.readTime)}}(t)),b.resolve()}};var Pl=class{constructor(){this.overlays=new oe(x.comparator),this.kr=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){let r=nt();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),b.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),b.resolve()}getOverlaysForCollection(e,t,r){let i=nt(),s=t.length+1,a=new x(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){let u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return b.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new oe((h,f)=>h-f),a=this.overlays.getIterator();for(;a.hasNext();){let h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=nt(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}let c=nt(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=i)););return b.resolve(c)}wt(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new zi(t,r));let s=this.kr.get(t);s===void 0&&(s=W(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}};var Cl=class{constructor(){this.sessionToken=pe.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}};var Wi=class{constructor(){this.qr=new te(le.Qr),this.$r=new te(le.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){let r=new le(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new le(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){let t=new x(new Z([])),r=new le(t,e),i=new le(t,e+1),s=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),s.push(a.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){let t=new x(new Z([])),r=new le(t,e),i=new le(t,e+1),s=W();return this.$r.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){let t=new le(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},le=class{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return x.comparator(e.key,t.key)||j(e.Hr,t.Hr)}static Ur(e,t){return j(e.Hr,t.Hr)||x.comparator(e.key,t.key)}};var Dl=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new te(le.Qr)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new ji(s,t,r,i);this.mutationQueue.push(a);for(let c of i)this.Yr=this.Yr.add(new le(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return b.resolve(a)}lookupMutationBatch(e,t){return b.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.Xr(r),s=i<0?0:i;return b.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?Tn:this.er-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new le(t,0),i=new le(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],a=>{let c=this.Zr(a.Hr);s.push(c)}),b.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new te(j);return t.forEach(i=>{let s=new le(i,0),a=new le(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,a],c=>{r=r.add(c.Hr)})}),b.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;x.isDocumentKey(s)||(s=s.child(""));let a=new le(new x(s),0),c=new te(j);return this.Yr.forEachWhile(u=>{let h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(c=c.add(u.Hr)),!0)},a),b.resolve(this.ei(c))}ei(e){let t=[];return e.forEach(r=>{let i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){F(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return b.forEach(t.mutations,i=>{let s=new le(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){let r=new le(t,0),i=this.Yr.firstAfterOrEqual(r);return b.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){let t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var kl=class{constructor(e){this.ni=e,this.docs=function(){return new oe(x.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return b.resolve(r?r.document.mutableCopy():ve.newInvalidDocument(t))}getEntries(e,t){let r=qe();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ve.newInvalidDocument(i))}),b.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=qe(),a=t.path,c=new x(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){let{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||Th(zm(f),r)<=0||(i.has(f.key)||Zi(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return b.resolve(s)}getAllFromCollectionGroup(e,t,r,i){L(9500)}ri(e,t){return b.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Nl(this)}getSize(e){return b.resolve(this.size)}},Nl=class extends Yo{constructor(e){super(),this.Or=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),b.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}};var Ol=class{constructor(e){this.persistence=e,this.ii=new Je(t=>Pn(t),Xi),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.si=0,this.oi=new Wi,this.targetCount=0,this._i=Cr.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),b.resolve()}hr(e){this.ii.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this._i=new Cr(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.hr(t),b.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.ii.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ii.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),b.waitFor(s).next(()=>i)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){let r=this.ii.get(t)||null;return b.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),b.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),b.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),b.resolve()}getMatchingKeysForTargetId(e,t){let r=this.oi.Jr(t);return b.resolve(r)}containsKey(e,t){return b.resolve(this.oi.containsKey(t))}};var Ki=class{constructor(e,t){this.ai={},this.overlays={},this.ui=new Le(0),this.ci=!1,this.ci=!0,this.li=new Cl,this.referenceDelegate=e(this),this.hi=new Ol(this),this.indexManager=new yl,this.remoteDocumentCache=function(i){return new kl(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new zo(t),this.Ti=new Rl(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Pl,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new Dl(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){D("MemoryPersistence","Starting transaction:",e);let i=new Vl(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return b.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}},Vl=class extends Ao{constructor(e){super(),this.currentSequenceNumber=e}},Zo=class n{constructor(e){this.persistence=e,this.Ai=new Wi,this.Ri=null}static Vi(e){return new n(e)}get mi(){if(this.Ri)return this.Ri;throw L(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),b.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),b.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.mi,r=>{let i=x.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,q.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return b.or([()=>b.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}},ea=class n{constructor(e,t){this.persistence=e,this.gi=new Je(r=>Se(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Qg(this,t)}static Vi(e,t){return new n(e,t)}Ii(){}di(e){return b.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){let t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return b.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?b.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,a=>this.Sr(e,a,t).next(c=>{c||(r++,s.removeEntry(a,q.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),b.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),b.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),b.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),b.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=_o(e.data.value)),t}Sr(e,t,r){return b.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let i=this.gi.get(t);return b.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var xl=class{constructor(e){this.serializer=e}q(e,t,r,i){let s=new bo("createOrUpgrade",t);r<1&&i>=1&&(function(u){u.createObjectStore(Yi)}(e),function(u){u.createObjectStore(xi,{keyPath:Ew}),u.createObjectStore(Qe,{keyPath:Vp,autoIncrement:!0}).createIndex(yn,xp,{unique:!0}),u.createObjectStore(mr)}(e),Em(e),function(u){u.createObjectStore(fn)}(e));let a=b.resolve();return r<3&&i>=3&&(r!==0&&(function(u){u.deleteObjectStore(_r),u.deleteObjectStore(gr),u.deleteObjectStore(An)}(e),Em(e)),a=a.next(()=>function(u){let h=u.store(An),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return h.put(Po,f)}(s))),r<4&&i>=4&&(r!==0&&(a=a.next(()=>function(u,h){return h.store(Qe).j().next(m=>{u.deleteObjectStore(Qe),u.createObjectStore(Qe,{keyPath:Vp,autoIncrement:!0}).createIndex(yn,xp,{unique:!0});let v=h.store(Qe),S=m.map(C=>v.put(C));return b.waitFor(S)})}(e,s))),a=a.next(()=>{(function(u){u.createObjectStore(yr,{keyPath:kw})})(e)})),r<5&&i>=5&&(a=a.next(()=>this.pi(s))),r<6&&i>=6&&(a=a.next(()=>(function(u){u.createObjectStore(Li)}(e),this.yi(s)))),r<7&&i>=7&&(a=a.next(()=>this.wi(s))),r<8&&i>=8&&(a=a.next(()=>this.Si(e,s))),r<9&&i>=9&&(a=a.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(a=a.next(()=>this.bi(s))),r<11&&i>=11&&(a=a.next(()=>{(function(u){u.createObjectStore(wa,{keyPath:Nw})})(e),function(u){u.createObjectStore(Ea,{keyPath:Ow})}(e)})),r<12&&i>=12&&(a=a.next(()=>{(function(u){let h=u.createObjectStore(Ta,{keyPath:Bw});h.createIndex(Fu,qw,{unique:!1}),h.createIndex(Ym,jw,{unique:!1})})(e)})),r<13&&i>=13&&(a=a.next(()=>function(u){let h=u.createObjectStore(Ro,{keyPath:Aw});h.createIndex(mo,bw),h.createIndex(Km,Sw)}(e)).next(()=>this.Di(e,s)).next(()=>e.deleteObjectStore(fn))),r<14&&i>=14&&(a=a.next(()=>this.Ci(e,s))),r<15&&i>=15&&(a=a.next(()=>function(u){u.createObjectStore(Sh,{keyPath:Vw,autoIncrement:!0}).createIndex(Mu,xw,{unique:!1}),u.createObjectStore(bi,{keyPath:Lw}).createIndex(Qm,Mw,{unique:!1}),u.createObjectStore(Si,{keyPath:Fw}).createIndex(Jm,Uw,{unique:!1})}(e))),r<16&&i>=16&&(a=a.next(()=>{t.objectStore(bi).clear()}).next(()=>{t.objectStore(Si).clear()})),r<17&&i>=17&&(a=a.next(()=>{(function(u){u.createObjectStore(Rh,{keyPath:zw})})(e)})),r<18&&i>=18&&lc()&&(a=a.next(()=>{t.objectStore(bi).clear()}).next(()=>{t.objectStore(Si).clear()})),a}yi(e){let t=0;return e.store(fn).X((r,i)=>{t+=Ho(i)}).next(()=>{let r={byteSize:t};return e.store(Li).put(Lu,r)})}pi(e){let t=e.store(xi),r=e.store(Qe);return t.j().next(i=>b.forEach(i,s=>{let a=IDBKeyRange.bound([s.userId,Tn],[s.userId,s.lastAcknowledgedBatchId]);return r.j(yn,a).next(c=>b.forEach(c,u=>{F(u.userId===s.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});let h=mn(this.serializer,u);return Gg(e,s.userId,h).next(()=>{})}))}))}wi(e){let t=e.store(_r),r=e.store(fn);return e.store(An).get(Po).next(i=>{let s=[];return r.X((a,c)=>{let u=new Z(a),h=function(m){return[0,Se(m)]}(u);s.push(t.get(h).next(f=>f?b.resolve():(m=>t.put({targetId:0,path:Se(m),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>b.waitFor(s))})}Si(e,t){e.createObjectStore(Mi,{keyPath:Dw});let r=t.store(Mi),i=new Gi,s=a=>{if(i.add(a)){let c=a.lastSegment(),u=a.popLast();return r.put({collectionId:c,parent:Se(u)})}};return t.store(fn).X({Z:!0},(a,c)=>{let u=new Z(a);return s(u.popLast())}).next(()=>t.store(mr).X({Z:!0},([a,c,u],h)=>{let f=tt(c);return s(f.popLast())}))}bi(e){let t=e.store(gr);return t.X((r,i)=>{let s=Ti(i),a=Bg(this.serializer,s);return t.put(a)})}Di(e,t){let r=t.store(fn),i=[];return r.X((s,a)=>{let c=t.store(Ro),u=function(m){return m.document?new x(Z.fromString(m.document.name).popFirst(5)):m.noDocument?x.fromSegments(m.noDocument.path):m.unknownDocument?x.fromSegments(m.unknownDocument.path):L(36783)}(a).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};i.push(c.put(h))}).next(()=>b.waitFor(i))}Ci(e,t){let r=t.store(Qe),i=Jg(this.serializer),s=new Ki(Zo.Vi,this.serializer.gt);return r.j().next(a=>{let c=new Map;return a.forEach(u=>{var h;let f=(h=c.get(u.userId))!==null&&h!==void 0?h:W();mn(this.serializer,u).keys().forEach(m=>f=f.add(m)),c.set(u.userId,f)}),b.forEach(c,(u,h)=>{let f=new ye(h),m=Go.yt(this.serializer,f),v=s.getIndexManager(f),S=Qo.yt(f,this.serializer,v,s.referenceDelegate);return new Xo(i,S,m,v).recalculateAndSaveOverlaysForDocumentKeys(new Fi(t,Le.ue),u).next()})})}};function Em(n){n.createObjectStore(_r,{keyPath:Pw}).createIndex(bh,Cw,{unique:!0}),n.createObjectStore(gr,{keyPath:"targetId"}).createIndex(Hm,Rw,{unique:!0}),n.createObjectStore(An)}var Nt="IndexedDbPersistence",yu=18e5,vu=5e3,Iu="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",DE="main",Ll=class n{constructor(e,t,r,i,s,a,c,u,h,f,m=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Fi=s,this.window=a,this.document=c,this.Mi=h,this.xi=f,this.Oi=m,this.ui=null,this.ci=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ni=null,this.inForeground=!1,this.Bi=null,this.Li=null,this.ki=Number.NEGATIVE_INFINITY,this.qi=v=>Promise.resolve(),!n.C())throw new V(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Tl(this,i),this.Qi=t+DE,this.serializer=new zo(u),this.$i=new pr(this.Qi,this.Oi,new xl(this.serializer)),this.li=new hl,this.hi=new Il(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Jg(this.serializer),this.Ti=new ll,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&De(Nt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ki().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new V(P.FAILED_PRECONDITION,Iu);return this.Wi(),this.Gi(),this.zi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.hi.getHighestSequenceNumber(e))}).then(e=>{this.ui=new Le(e,this.Mi)}).then(()=>{this.ci=!0}).catch(e=>(this.$i&&this.$i.close(),Promise.reject(e)))}ji(e){return this.qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.$i.setDatabaseDeletedListener(e)}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Fi.enqueueAndForget(async()=>{this.started&&await this.Ki()}))}Ki(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>ho(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Ji(e).next(t=>{t||(this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)))})}).next(()=>this.Hi(e)).next(t=>this.isPrimary&&!t?this.Yi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(Qt(e))return D(Nt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return D(Nt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Fi.enqueueRetryable(()=>this.qi(e)),this.isPrimary=e})}Ji(e){return wi(e).get(Jn).next(t=>b.resolve(this.Xi(t)))}es(e){return ho(e).delete(this.clientId)}async ts(){if(this.isPrimary&&!this.ns(this.ki,yu)){this.ki=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{let r=me(t,yr);return r.j().next(i=>{let s=this.rs(i,yu),a=i.filter(c=>s.indexOf(c)===-1);return b.forEach(a,c=>r.delete(c.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Ui)for(let t of e)this.Ui.removeItem(this.ss(t.clientId))}}zi(){this.Li=this.Fi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ki().then(()=>this.ts()).then(()=>this.zi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.xi?b.resolve(!0):wi(e).get(Jn).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,vu)&&!this._s(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new V(P.FAILED_PRECONDITION,Iu);return!1}}return!(!this.networkEnabled||!this.inForeground)||ho(e).j().next(r=>this.rs(r,vu).find(i=>{if(this.clientId!==i.clientId){let s=!this.networkEnabled&&i.networkEnabled,a=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||a&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&D(Nt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ci=!1,this.us(),this.Li&&(this.Li.cancel(),this.Li=null),this.cs(),this.ls(),await this.$i.runTransaction("shutdown","readwrite",[Yi,yr],e=>{let t=new Fi(e,Le.ue);return this.Yi(t).next(()=>this.es(t))}),this.$i.close(),this.hs()}rs(e,t){return e.filter(r=>this.ns(r.updateTimeMs,t)&&!this._s(r.clientId))}Ps(){return this.runTransaction("getActiveClients","readonly",e=>ho(e).j().next(t=>this.rs(t,yu).map(r=>r.clientId)))}get started(){return this.ci}getGlobalsCache(){return this.li}getMutationQueue(e,t){return Qo.yt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new vl(e,this.serializer.gt.databaseId)}getDocumentOverlayCache(e){return Go.yt(this.serializer,e)}getBundleCache(){return this.Ti}runTransaction(e,t,r){D(Nt,"Starting transaction:",e);let i=t==="readonly"?"readonly":"readwrite",s=function(u){return u===18?Ww:u===17?tg:u===16?Gw:u===15?Ph:u===14?eg:u===13?Zm:u===12?$w:u===11?Xm:void L(60245)}(this.Oi),a;return this.$i.runTransaction(e,i,s,c=>(a=new Fi(c,this.ui?this.ui.next():Le.ue),t==="readwrite-primary"?this.Ji(a).next(u=>!!u||this.Hi(a)).next(u=>{if(!u)throw De(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)),new V(P.FAILED_PRECONDITION,$m);return r(a)}).next(u=>this.Zi(a).next(()=>u)):this.Ts(a).next(()=>r(a)))).then(c=>(a.raiseOnCommittedEvent(),c))}Ts(e){return wi(e).get(Jn).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,vu)&&!this._s(t.ownerId)&&!this.Xi(t)&&!(this.xi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new V(P.FAILED_PRECONDITION,Iu)})}Zi(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return wi(e).put(Jn,t)}static C(){return pr.C()}Yi(e){let t=wi(e);return t.get(Jn).next(r=>this.Xi(r)?(D(Nt,"Releasing primary lease."),t.delete(Jn)):b.resolve())}ns(e,t){let r=Date.now();return!(e<r-t)&&(!(e>r)||(De(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Bi=()=>{this.Fi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ki()))},this.document.addEventListener("visibilitychange",this.Bi),this.inForeground=this.document.visibilityState==="visible")}cs(){this.Bi&&(this.document.removeEventListener("visibilitychange",this.Bi),this.Bi=null)}Gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ni=()=>{this.us();let t=/(?:Version|Mobile)\/1[456]/;uc()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Fi.enterRestrictedMode(!0),this.Fi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ni))}ls(){this.Ni&&(this.window.removeEventListener("pagehide",this.Ni),this.Ni=null)}_s(e){var t;try{let r=((t=this.Ui)===null||t===void 0?void 0:t.getItem(this.ss(e)))!==null;return D(Nt,`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return De(Nt,"Failed to get zombied client id.",r),!1}}us(){if(this.Ui)try{this.Ui.setItem(this.ss(this.clientId),String(Date.now()))}catch(e){De("Failed to set zombie client id.",e)}}hs(){if(this.Ui)try{this.Ui.removeItem(this.ss(this.clientId))}catch{}}ss(e){return`firestore_zombie_${this.persistenceKey}_${e}`}};function wi(n){return me(n,Yi)}function ho(n){return me(n,yr)}function kE(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}var Ml=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=W(),i=W();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var Fl=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var ta=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return uc()?8:Gm(ce())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ps(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;let a=new Fl;return this.ws(e,t,a).next(c=>{if(s.result=c,this.Rs)return this.Ss(e,t,a,c.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(nr()<=H.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",rr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),b.resolve()):(nr()<=H.DEBUG&&D("QueryEngine","Query:",rr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(nr()<=H.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",rr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,$e(t))):b.resolve())}ps(e,t){if(Kp(t))return b.resolve(null);let r=$e(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Xu(t,null,"F"),r=$e(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let a=W(...s);return this.gs.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{let h=this.bs(t,c);return this.Ds(t,h,a,u.readTime)?this.ps(e,Xu(t,null,"F")):this.vs(e,h,t,u)}))})))}ys(e,t,r,i){return Kp(t)||i.isEqual(q.min())?b.resolve(null):this.gs.getDocuments(e,r).next(s=>{let a=this.bs(t,s);return this.Ds(t,a,r,i)?b.resolve(null):(nr()<=H.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),rr(t)),this.vs(e,a,t,vw(i,Ni)).next(c=>c))})}bs(e,t){let r=new te(_g(e));return t.forEach((i,s)=>{Zi(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return nr()<=H.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",rr(t)),this.gs.getDocumentsMatchingQuery(e,t,Ge.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}};var Mh="LocalStore",NE=3e8,Ul=class{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new oe(j),this.Ms=new Je(s=>Pn(s),Xi),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Xo(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}};function Yg(n,e,t,r){return new Ul(n,e,t,r)}async function Xg(n,e){let t=G(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let a=[],c=[],u=W();for(let h of i){a.push(h.batchId);for(let f of h.mutations)u=u.add(f.key)}for(let h of s){c.push(h.batchId);for(let f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:c}))})})}function OE(n,e){let t=G(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){let m=h.batch,v=m.keys(),S=b.resolve();return v.forEach(C=>{S=S.next(()=>f.getEntry(u,C)).next(N=>{let k=h.docVersions.get(C);F(k!==null,48541),N.version.compareTo(k)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=W();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Zg(n){let e=G(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function VE(n,e){let t=G(n),r=e.snapshotVersion,i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let a=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;let c=[];e.targetChanges.forEach((f,m)=>{let v=i.get(m);if(!v)return;c.push(t.hi.removeMatchingKeys(s,f.removedDocuments,m).next(()=>t.hi.addMatchingKeys(s,f.addedDocuments,m)));let S=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(pe.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,r)),i=i.insert(m,S),function(N,k,z){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=NE?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(v,S,f)&&c.push(t.hi.updateTargetData(s,S))});let u=qe(),h=W();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(xE(s,a,e.documentUpdates).next(f=>{u=f.Ls,h=f.ks})),!r.isEqual(q.min())){let f=t.hi.getLastRemoteSnapshotVersion(s).next(m=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(f)}return b.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,h)).next(()=>u)}).then(s=>(t.Fs=i,s))}function xE(n,e,t){let r=W(),i=W();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=qe();return t.forEach((c,u)=>{let h=s.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(q.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):D(Mh,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{Ls:a,ks:i}})}function LE(n,e){let t=G(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Tn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function ME(n,e){let t=G(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,b.resolve(i)):t.hi.allocateTargetId(r).next(a=>(i=new Pr(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Bl(n,e,t){let r=G(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Qt(a))throw a;D(Mh,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function Tm(n,e,t){let r=G(n),i=q.min(),s=W();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){let m=G(u),v=m.Ms.get(f);return v!==void 0?b.resolve(m.Fs.get(v)):m.hi.getTargetData(h,f)}(r,a,$e(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,c.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:q.min(),t?s:W())).next(c=>(FE(r,eE(e),c),{documents:c,qs:s})))}function FE(n,e,t){let r=n.xs.get(e)||q.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}var na=class{constructor(){this.activeTargetIds=oE()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var ra=class{constructor(){this.Fo=new na,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new na,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var ql=class{xo(e){}shutdown(){}};var Am="ConnectivityMonitor",ia=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){D(Am,"Network connectivity changed: AVAILABLE");for(let e of this.ko)e(0)}Lo(){D(Am,"Network connectivity changed: UNAVAILABLE");for(let e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var fo=null;function jl(){return fo===null?fo=function(){return 268435456+Math.round(2147483648*Math.random())}():fo++,"0x"+fo.toString(16)}var wu="RestConnection",UE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},zl=class{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===ko?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){let a=jl(),c=this.Go(e,t.toUriEncodedString());D(wu,`Sending RPC '${e}' ${a}:`,c,r);let u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,s);let{host:h}=new URL(c),f=jn(h);return this.jo(e,c,u,r,f).then(m=>(D(wu,`Received RPC '${e}' ${a}: `,m),m),m=>{throw Ut(wu,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",r),m})}Jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Or}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){let r=UE[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}};var $l=class{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}};var be="WebChannelConnection",Gl=class extends zl{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){let a=jl();return new Promise((c,u)=>{let h=new du;h.setWithCredentials(!0),h.listenOnce(fu.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case _i.NO_ERROR:let m=h.getResponseJson();D(be,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case _i.TIMEOUT:D(be,`RPC '${e}' ${a} timed out`),u(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case _i.HTTP_ERROR:let v=h.getStatus();if(D(be,`RPC '${e}' ${a} failed with status:`,v,"response text:",h.getResponseText()),v>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);let C=S?.error;if(C&&C.status&&C.message){let N=function(z){let B=z.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(B)>=0?B:P.UNKNOWN}(C.status);u(new V(N,C.message))}else u(new V(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new V(P.UNAVAILABLE,"Connection failed."));break;default:L(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{D(be,`RPC '${e}' ${a} completed.`)}});let f=JSON.stringify(i);D(be,`RPC '${e}' ${a} sending request:`,i),h.send(t,"POST",f,r,15)})}P_(e,t,r){let i=jl(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=gu(),c=mu(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;let f=s.join("");D(be,`Creating RPC '${e}' stream ${i}: ${f}`,u);let m=a.createWebChannel(f,u);this.T_(m);let v=!1,S=!1,C=new $l({Ho:k=>{S?D(be,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(v||(D(be,`Opening RPC '${e}' stream ${i} transport.`),m.open(),v=!0),D(be,`RPC '${e}' stream ${i} sending:`,k),m.send(k))},Yo:()=>m.close()}),N=(k,z,B)=>{k.listen(z,M=>{try{B(M)}catch(K){setTimeout(()=>{throw K},0)}})};return N(m,Qn.EventType.OPEN,()=>{S||(D(be,`RPC '${e}' stream ${i} transport opened.`),C.s_())}),N(m,Qn.EventType.CLOSE,()=>{S||(S=!0,D(be,`RPC '${e}' stream ${i} transport closed`),C.__(),this.I_(m))}),N(m,Qn.EventType.ERROR,k=>{S||(S=!0,Ut(be,`RPC '${e}' stream ${i} transport errored. Name:`,k.name,"Message:",k.message),C.__(new V(P.UNAVAILABLE,"The operation could not be completed")))}),N(m,Qn.EventType.MESSAGE,k=>{var z;if(!S){let B=k.data[0];F(!!B,16349);let M=B,K=M?.error||((z=M[0])===null||z===void 0?void 0:z.error);if(K){D(be,`RPC '${e}' stream ${i} received error:`,K);let Y=K.status,$=function(y){let w=ue[y];if(w!==void 0)return Pg(w)}(Y),I=K.message;$===void 0&&($=P.INTERNAL,I="Unknown error status: "+Y+" with message "+K.message),S=!0,C.__(new V($,I)),m.close()}else D(be,`RPC '${e}' stream ${i} received:`,B),C.a_(B)}}),N(c,pu.STAT_EVENT,k=>{k.stat===ao.PROXY?D(be,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===ao.NOPROXY&&D(be,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}};function BE(){return typeof window<"u"?window:null}function wo(){return typeof document<"u"?document:null}function Pa(n){return new sl(n,!0)}var sa=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();let t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&D("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var bm="PersistentStream",oa=class{constructor(e,t,r,i,s,a,c,u){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new sa(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(De(t.toString()),De("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;let e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{let i=new V(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){let r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return D(bm,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(D(bm,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Wl=class extends oa{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();let t=IE(this.serializer,e),r=function(s){if(!("targetChange"in s))return q.min();let a=s.targetChange;return a.targetIds&&a.targetIds.length?q.min():a.readTime?Oe(a.readTime):q.min()}(e);return this.listener.J_(t,r)}H_(e){let t={};t.database=cl(this.serializer),t.addTarget=function(s,a){let c,u=a.target;if(c=Vo(u)?{documents:Vg(s,u)}:{query:xg(s,u).Vt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Cg(s,a.resumeToken);let h=ol(s,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(q.min())>0){c.readTime=Rr(s,a.snapshotVersion.toTimestamp());let h=ol(s,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);let r=EE(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){let t={};t.database=cl(this.serializer),t.removeTarget=e,this.k_(t)}},Kl=class extends oa{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return F(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){F(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();let t=wE(e.writeResults,e.commitTime),r=Oe(e.commitTime);return this.listener.ta(r,t)}na(){let e={};e.database=cl(this.serializer),this.k_(e)}X_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>jo(this.serializer,r))};this.k_(t)}};var Hl=class{},Ql=class extends Hl{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,al(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(P.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Jo(e,al(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(P.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},Jl=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(De(t),this._a=!1):D("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var Vn="RemoteStore",Yl=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{Mn(this)&&(D(Vn,"Restarting streams for network reachability change."),await async function(u){let h=G(u);h.Ia.add(4),await es(h),h.Aa.set("Unknown"),h.Ia.delete(4),await Ca(h)}(this))})}),this.Aa=new Jl(r,i)}};async function Ca(n){if(Mn(n))for(let e of n.da)await e(!0)}async function es(n){for(let e of n.da)await e(!1)}function e_(n,e){let t=G(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),qh(t)?Bh(t):Vr(t).x_()&&Uh(t,e))}function Fh(n,e){let t=G(n),r=Vr(t);t.Ta.delete(e),r.x_()&&t_(t,e),t.Ta.size===0&&(r.x_()?r.B_():Mn(t)&&t.Aa.set("Unknown"))}function Uh(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Vr(n).H_(e)}function t_(n,e){n.Ra.$e(e),Vr(n).Y_(e)}function Bh(n){n.Ra=new il({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),Vr(n).start(),n.Aa.aa()}function qh(n){return Mn(n)&&!Vr(n).M_()&&n.Ta.size>0}function Mn(n){return G(n).Ia.size===0}function n_(n){n.Ra=void 0}async function qE(n){n.Aa.set("Online")}async function jE(n){n.Ta.forEach((e,t)=>{Uh(n,e)})}async function zE(n,e){n_(n),qh(n)?(n.Aa.la(e),Bh(n)):n.Aa.set("Unknown")}async function $E(n,e,t){if(n.Aa.set("Online"),e instanceof Uo&&e.state===2&&e.cause)try{await async function(i,s){let a=s.cause;for(let c of s.targetIds)i.Ta.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.Ta.delete(c),i.Ra.removeTarget(c))}(n,e)}catch(r){D(Vn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await aa(n,r)}else if(e instanceof ur?n.Ra.Ye(e):e instanceof Fo?n.Ra.it(e):n.Ra.et(e),!t.isEqual(q.min()))try{let r=await Zg(n.localStore);t.compareTo(r)>=0&&await function(s,a){let c=s.Ra.Pt(a);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){let f=s.Ta.get(h);f&&s.Ta.set(h,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,h)=>{let f=s.Ta.get(u);if(!f)return;s.Ta.set(u,f.withResumeToken(pe.EMPTY_BYTE_STRING,f.snapshotVersion)),t_(s,u);let m=new Pr(f.target,u,h,f.sequenceNumber);Uh(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){D(Vn,"Failed to raise snapshot:",r),await aa(n,r)}}async function aa(n,e,t){if(!Qt(e))throw e;n.Ia.add(1),await es(n),n.Aa.set("Offline"),t||(t=()=>Zg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{D(Vn,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Ca(n)})}function r_(n,e){return e().catch(t=>aa(n,t,e))}async function ts(n){let e=G(n),t=Wt(e),r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Tn;for(;GE(e);)try{let i=await LE(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,WE(e,i)}catch(i){await aa(e,i)}i_(e)&&s_(e)}function GE(n){return Mn(n)&&n.Pa.length<10}function WE(n,e){n.Pa.push(e);let t=Wt(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function i_(n){return Mn(n)&&!Wt(n).M_()&&n.Pa.length>0}function s_(n){Wt(n).start()}async function KE(n){Wt(n).na()}async function HE(n){let e=Wt(n);for(let t of n.Pa)e.X_(t.mutations)}async function QE(n,e,t){let r=n.Pa.shift(),i=tl.from(r,e,t);await r_(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await ts(n)}async function JE(n,e){e&&Wt(n).Z_&&await async function(r,i){if(function(a){return fE(a)&&a!==P.ABORTED}(i.code)){let s=r.Pa.shift();Wt(r).N_(),await r_(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await ts(r)}}(n,e),i_(n)&&s_(n)}async function Sm(n,e){let t=G(n);t.asyncQueue.verifyOperationInProgress(),D(Vn,"RemoteStore received new credentials");let r=Mn(t);t.Ia.add(3),await es(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Ca(t)}async function YE(n,e){let t=G(n);e?(t.Ia.delete(2),await Ca(t)):e||(t.Ia.add(2),await es(t),t.Aa.set("Unknown"))}function Vr(n){return n.Va||(n.Va=function(t,r,i){let s=G(t);return s.ia(),new Wl(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:qE.bind(null,n),e_:jE.bind(null,n),n_:zE.bind(null,n),J_:$E.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),qh(n)?Bh(n):n.Aa.set("Unknown")):(await n.Va.stop(),n_(n))})),n.Va}function Wt(n){return n.ma||(n.ma=function(t,r,i){let s=G(t);return s.ia(),new Kl(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:KE.bind(null,n),n_:JE.bind(null,n),ea:HE.bind(null,n),ta:QE.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await ts(n)):(await n.ma.stop(),n.Pa.length>0&&(D(Vn,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}var Xl=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let a=Date.now()+r,c=new n(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function jh(n,e){if(De("AsyncQueue",`${e}: ${n}`),Qt(n))return new V(P.UNAVAILABLE,`${e}: ${n}`);throw n}var ca=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||x.comparator(t.key,r.key):(t,r)=>x.comparator(t.key,r.key),this.keyedMap=Ei(),this.sortedSet=new oe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var ua=class{constructor(){this.fa=new oe(x.comparator)}track(e){let t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):L(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){let e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}},Dr=class n{constructor(e,t,r,i,s,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,i,s){let a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new n(e,t,ca.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ra(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Zl=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}},eh=class{constructor(){this.queries=Rm(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){let i=G(t),s=i.queries;i.queries=Rm(),s.forEach((a,c)=>{for(let u of c.wa)u.onError(r)})})(this,new V(P.ABORTED,"Firestore shutting down"))}};function Rm(){return new Je(n=>gg(n),Ra)}async function XE(n,e){let t=G(n),r=3,i=e.query,s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new Zl,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let c=jh(a,`Initialization of query '${rr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&zh(t)}async function ZE(n,e){let t=G(n),r=e.query,i=3,s=t.queries.get(r);if(s){let a=s.wa.indexOf(e);a>=0&&(s.wa.splice(a,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function eT(n,e){let t=G(n),r=!1;for(let i of e){let s=i.query,a=t.queries.get(s);if(a){for(let c of a.wa)c.Ca(i)&&(r=!0);a.ya=i}}r&&zh(t)}function tT(n,e,t){let r=G(n),i=r.queries.get(e);if(i)for(let s of i.wa)s.onError(t);r.queries.delete(e)}function zh(n){n.Da.forEach(e=>{e.next()})}var th,Pm;(Pm=th||(th={})).Fa="default",Pm.Cache="cache";var nh=class{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new Dr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;let r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;let t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Dr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==th.Cache}};var la=class{constructor(e){this.key=e}},ha=class{constructor(e){this.key=e}},rh=class{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=W(),this.mutatedKeys=W(),this.Xa=_g(e),this.eu=new ca(this.Xa)}get tu(){return this.Ha}nu(e,t){let r=t?t.ru:new ua,i=t?t.eu:this.eu,s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1,u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{let v=i.get(f),S=Zi(this.query,m)?m:null,C=!!v&&this.mutatedKeys.has(v.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),k=!1;v&&S?v.data.isEqual(S.data)?C!==N&&(r.track({type:3,doc:S}),k=!0):this.iu(v,S)||(r.track({type:2,doc:S}),k=!0,(u&&this.Xa(S,u)>0||h&&this.Xa(S,h)<0)&&(c=!0)):!v&&S?(r.track({type:0,doc:S}),k=!0):v&&!S&&(r.track({type:1,doc:v}),k=!0,(u||h)&&(c=!0)),k&&(S?(a=a.add(S),s=N?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:c,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;let a=e.ru.pa();a.sort((f,m)=>function(S,C){let N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{At:k})}};return N(S)-N(C)}(f.type,m.type)||this.Xa(f.doc,m.doc)),this.su(r),i=i!=null&&i;let c=t&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,h=u!==this.Ya;return this.Ya=u,a.length!==0||h?{snapshot:new Dr(this.query,e.eu,s,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new ua,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];let e=this.Za;this.Za=W(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});let t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new ha(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new la(r))}),t}uu(e){this.Ha=e.qs,this.Za=W();let t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Dr.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},$h="SyncEngine",ih=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},sh=class{constructor(e){this.key=e,this.lu=!1}},oh=class{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Je(c=>gg(c),Ra),this.Tu=new Map,this.Iu=new Set,this.du=new oe(x.comparator),this.Eu=new Map,this.Au=new Wi,this.Ru={},this.Vu=new Map,this.mu=Cr.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function nT(n,e,t=!0){let r=h_(n),i,s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await o_(r,e,t,!0),i}async function rT(n,e){let t=h_(n);await o_(t,e,!0,!1)}async function o_(n,e,t,r){let i=await ME(n.localStore,$e(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t),c;return r&&(c=await iT(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&e_(n.remoteStore,i),c}async function iT(n,e,t,r,i){n.gu=(m,v,S)=>async function(N,k,z,B){let M=k.view.nu(z);M.Ds&&(M=await Tm(N.localStore,k.query,!1).then(({documents:I})=>k.view.nu(I,M)));let K=B&&B.targetChanges.get(k.targetId),Y=B&&B.targetMismatches.get(k.targetId)!=null,$=k.view.applyChanges(M,N.isPrimaryClient,K,Y);return Dm(N,k.targetId,$._u),$.snapshot}(n,m,v,S);let s=await Tm(n.localStore,e,!0),a=new rh(e,s.qs),c=a.nu(s.documents),u=$i.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),h=a.applyChanges(c,n.isPrimaryClient,u);Dm(n,t,h._u);let f=new ih(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function sT(n,e,t){let r=G(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(a=>!Ra(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Bl(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Fh(r.remoteStore,i.targetId),ah(r,i.targetId)}).catch(Ln)):(ah(r,i.targetId),await Bl(r.localStore,i.targetId,!0))}async function oT(n,e){let t=G(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Fh(t.remoteStore,r.targetId))}async function aT(n,e,t){let r=d_(n);try{let i=await function(a,c){let u=G(a),h=se.now(),f=c.reduce((S,C)=>S.add(C.key),W()),m,v;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let C=qe(),N=W();return u.Os.getEntries(S,f).next(k=>{C=k,C.forEach((z,B)=>{B.isValidDocument()||(N=N.add(z))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,C)).next(k=>{m=k;let z=[];for(let B of c){let M=dE(B,m.get(B.key).overlayedDocument);M!=null&&z.push(new Ye(B.key,M,lg(M.value.mapValue),Ne.exists(!0)))}return u.mutationQueue.addMutationBatch(S,h,z,c)}).next(k=>{v=k;let z=k.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(S,k.batchId,z)})}).then(()=>({batchId:v.batchId,changes:vg(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,u){let h=a.Ru[a.currentUser.toKey()];h||(h=new oe(j)),h=h.insert(c,u),a.Ru[a.currentUser.toKey()]=h}(r,i.batchId,t),await ns(r,i.changes),await ts(r.remoteStore)}catch(i){let s=jh(i,"Failed to persist write");t.reject(s)}}async function a_(n,e){let t=G(n);try{let r=await VE(t.localStore,e);e.targetChanges.forEach((i,s)=>{let a=t.Eu.get(s);a&&(F(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?F(a.lu,14607):i.removedDocuments.size>0&&(F(a.lu,42227),a.lu=!1))}),await ns(t,r,e)}catch(r){await Ln(r)}}function Cm(n,e,t){let r=G(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.Pu.forEach((s,a)=>{let c=a.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){let u=G(a);u.onlineState=c;let h=!1;u.queries.forEach((f,m)=>{for(let v of m.wa)v.va(c)&&(h=!0)}),h&&zh(u)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function cT(n,e,t){let r=G(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Eu.get(e),s=i&&i.key;if(s){let a=new oe(x.comparator);a=a.insert(s,ve.newNoDocument(s,q.min()));let c=W().add(s),u=new Mo(q.min(),new Map,new oe(j),a,c);await a_(r,u),r.du=r.du.remove(s),r.Eu.delete(e),Gh(r)}else await Bl(r.localStore,e,!1).then(()=>ah(r,e,t)).catch(Ln)}async function uT(n,e){let t=G(n),r=e.batch.batchId;try{let i=await OE(t.localStore,e);u_(t,r,null),c_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ns(t,i)}catch(i){await Ln(i)}}async function lT(n,e,t){let r=G(n);try{let i=await function(a,c){let u=G(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(m=>(F(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);u_(r,e,t),c_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ns(r,i)}catch(i){await Ln(i)}}function c_(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function u_(n,e,t){let r=G(n),i=r.Ru[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function ah(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||l_(n,r)})}function l_(n,e){n.Iu.delete(e.path.canonicalString());let t=n.du.get(e);t!==null&&(Fh(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Gh(n))}function Dm(n,e,t){for(let r of t)r instanceof la?(n.Au.addReference(r.key,e),hT(n,r)):r instanceof ha?(D($h,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||l_(n,r.key)):L(19791,{yu:r})}function hT(n,e){let t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(D($h,"New document in limbo: "+t),n.Iu.add(r),Gh(n))}function Gh(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){let e=n.Iu.values().next().value;n.Iu.delete(e);let t=new x(Z.fromString(e)),r=n.mu.next();n.Eu.set(r,new sh(t)),n.du=n.du.insert(t,r),e_(n.remoteStore,new Pr($e(Sa(t.path)),r,"TargetPurposeLimboResolution",Le.ue))}}async function ns(n,e,t){let r=G(n),i=[],s=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((c,u)=>{a.push(r.gu(u,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){let m=h?!h.fromCache:(f=t?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){i.push(h);let m=Ml.Es(u.targetId,h);s.push(m)}}))}),await Promise.all(a),r.hu.J_(i),await async function(u,h){let f=G(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>b.forEach(h,v=>b.forEach(v.Is,S=>f.persistence.referenceDelegate.addReference(m,v.targetId,S)).next(()=>b.forEach(v.ds,S=>f.persistence.referenceDelegate.removeReference(m,v.targetId,S)))))}catch(m){if(!Qt(m))throw m;D(Mh,"Failed to update sequence numbers: "+m)}for(let m of h){let v=m.targetId;if(!m.fromCache){let S=f.Fs.get(v),C=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(C);f.Fs=f.Fs.insert(v,N)}}}(r.localStore,s))}async function dT(n,e){let t=G(n);if(!t.currentUser.isEqual(e)){D($h,"User change. New user:",e.toKey());let r=await Xg(t.localStore,e);t.currentUser=e,function(s,a){s.Vu.forEach(c=>{c.forEach(u=>{u.reject(new V(P.CANCELLED,a))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ns(t,r.Bs)}}function fT(n,e){let t=G(n),r=t.Eu.get(e);if(r&&r.lu)return W().add(r.key);{let i=W(),s=t.Tu.get(e);if(!s)return i;for(let a of s){let c=t.Pu.get(a);i=i.unionWith(c.view.tu)}return i}}function h_(n){let e=G(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=a_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=fT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=cT.bind(null,e),e.hu.J_=eT.bind(null,e.eventManager),e.hu.pu=tT.bind(null,e.eventManager),e}function d_(n){let e=G(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=uT.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=lT.bind(null,e),e}var xn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Pa(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Yg(this.persistence,new ta,e.initialUser,this.serializer)}Du(e){return new Ki(Zo.Vi,this.serializer)}bu(e){return new ra}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};xn.provider={build:()=>new xn};var ch=class extends xn{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){F(this.persistence.referenceDelegate instanceof ea,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new Jo(r,e.asyncQueue,t)}Du(e){let t=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new Ki(r=>ea.Vi(r,t),this.serializer)}},uh=class extends xn{constructor(e,t,r){super(),this.Mu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Mu.initialize(this,e),await d_(this.Mu.syncEngine),await ts(this.Mu.remoteStore),await this.persistence.ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return Yg(this.persistence,new ta,e.initialUser,this.serializer)}Cu(e,t){let r=this.persistence.referenceDelegate.garbageCollector;return new Jo(r,e.asyncQueue,t)}Fu(e,t){let r=new xu(t,this.persistence);return new Vu(e.asyncQueue,r)}Du(e){let t=kE(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new Ll(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,BE(),wo(),this.serializer,this.sharedClientState,!!this.forceOwnership)}bu(e){return new ra}};var kr=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Cm(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=dT.bind(null,this.syncEngine),await YE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new eh}()}createDatastore(e){let t=Pa(e.databaseInfo.databaseId),r=function(s){return new Gl(s)}(e.databaseInfo);return function(s,a,c,u){return new Ql(s,a,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new Yl(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Cm(this.syncEngine,t,0),function(){return ia.C()?new ia:new ql}())}createSyncEngine(e,t){return function(i,s,a,c,u,h,f){let m=new oh(i,s,a,c,u,h);return f&&(m.fu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){let s=G(i);D(Vn,"RemoteStore shutting down."),s.Ia.add(5),await es(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};kr.provider={build:()=>new kr};var lh=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):De("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var Kt="FirestoreClient",hh=class{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=ye.UNAUTHENTICATED,this.clientId=ki.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{D(Kt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(D(Kt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=jh(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Eu(n,e){n.asyncQueue.verifyOperationInProgress(),D(Kt,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Xg(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{Ut("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{D("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{Ut("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function km(n,e){n.asyncQueue.verifyOperationInProgress();let t=await pT(n);D(Kt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Sm(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Sm(e.remoteStore,i)),n._onlineComponents=e}async function pT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D(Kt,"Using user provided OfflineComponentProvider");try{await Eu(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Ut("Error using user provided cache. Falling back to memory cache: "+t),await Eu(n,new xn)}}else D(Kt,"Using default OfflineComponentProvider"),await Eu(n,new ch(void 0));return n._offlineComponents}async function f_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D(Kt,"Using user provided OnlineComponentProvider"),await km(n,n._uninitializedComponentsProvider._online)):(D(Kt,"Using default OnlineComponentProvider"),await km(n,new kr))),n._onlineComponents}function mT(n){return f_(n).then(e=>e.syncEngine)}async function Nm(n){let e=await f_(n),t=e.eventManager;return t.onListen=nT.bind(null,e.syncEngine),t.onUnlisten=sT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=rT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=oT.bind(null,e.syncEngine),t}function p_(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Om=new Map;var gT="firestore.googleapis.com",Vm=!0,da=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=gT,this.ssl=Vm}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Vm;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=$g;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Hg)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}yw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=p_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Hi=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new da({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new da(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new bu;switch(r.type){case"firstParty":return new Pu(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Om.get(t);r&&(D("ComponentProvider","Removing Datastore"),Om.delete(t),r.terminate())}(this),Promise.resolve()}};var fa=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Re=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ji(t,n._jsonSchema))return new n(e,r||null,new x(Z.fromString(t.referencePath)))}};Re._jsonSchemaVersion="firestore/documentReference/1.0",Re._jsonSchema={type:he("string",Re._jsonSchemaVersion),referencePath:he("string")};var xt=class n extends fa{constructor(e,t,r){super(e,t,Sa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Re(this.firestore,null,new x(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function m_(n,e,...t){if(n=de(n),qm("collection","path",e),n instanceof Hi){let r=Z.fromString(e,...t);return Cp(r),new xt(n,null,r)}{if(!(n instanceof Re||n instanceof xt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(Z.fromString(e,...t));return Cp(r),new xt(n.firestore,null,r)}}function g_(n,e,...t){if(n=de(n),arguments.length===1&&(e=ki.newId()),qm("doc","path",e),n instanceof Hi){let r=Z.fromString(e,...t);return Pp(r),new Re(n,null,new x(r))}{if(!(n instanceof Re||n instanceof xt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(Z.fromString(e,...t));return Pp(r),new Re(n.firestore,n instanceof xt?n.converter:null,new x(r))}}var xm="AsyncQueue",pa=class{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new sa(this,"async_queue_retry"),this.oc=()=>{let r=wo();r&&D(xm,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;let t=wo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;let t=wo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});let t=new rt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Qt(e))throw e;D(xm,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){let t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,De("INTERNAL UNHANDLED ERROR: ",Lm(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);let i=Xl.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&L(47125,{hc:Lm(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(let t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){let t=this.ec.indexOf(e);this.ec.splice(t,1)}};function Lm(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}function Mm(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var Ht=class extends Hi{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new pa,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new pa(e),this._firestoreClient=void 0,await e}}};function __(n,e,t){t||(t=ko);let r=bs(n,"firestore");if(r.isInitialized(t)){let i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(Tt(s,e))return i;throw new V(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new V(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Hg)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&jn(e.host)&&cc(e.host),r.initialize({options:e,instanceIdentifier:t})}function Wh(n){if(n._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||_T(n),n._firestoreClient}function _T(n){var e,t,r;let i=n._freezeSettings(),s=function(c,u,h,f){return new Uu(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,p_(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new hh(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){let u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}}(n._componentsProvider))}var Lt=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(pe.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(pe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ji(e,n._jsonSchema))return n.fromBase64String(e.bytes)}};Lt._jsonSchemaVersion="firestore/bytes/1.0",Lt._jsonSchema={type:he("string",Lt._jsonSchemaVersion),bytes:he("string")};var Nr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Qi=class{constructor(e){this._methodName=e}};var Mt=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return j(this._lat,e._lat)||j(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(Ji(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};Mt._jsonSchemaVersion="firestore/geoPoint/1.0",Mt._jsonSchema={type:he("string",Mt._jsonSchemaVersion),latitude:he("number"),longitude:he("number")};var Ft=class n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ji(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new n(e.vectorValues);throw new V(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};Ft._jsonSchemaVersion="firestore/vectorValue/1.0",Ft._jsonSchema={type:he("string",Ft._jsonSchemaVersion),vectorValues:he("object")};var yT=/^__.*__$/,dh=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ye(e,this.data,this.fieldMask,t,this.fieldTransforms):new Gt(e,this.data,t,this.fieldTransforms)}},ma=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Ye(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function y_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{Ec:n})}}var fh=class n{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return _a(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(y_(this.Ec)&&yT.test(e))throw this.wc('Document fields cannot begin and end with "__"')}},ph=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Pa(e)}Dc(e,t,r,i=!1){return new fh({Ec:e,methodName:t,bc:r,path:fe.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function v_(n){let e=n._freezeSettings(),t=Pa(n._databaseId);return new ph(n._databaseId,!!e.ignoreUndefinedProperties,t)}function I_(n,e,t,r,i,s={}){let a=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);Kh("Data must be an object, but it was:",a,r);let c=w_(r,a),u,h;if(s.merge)u=new Be(a.fieldMask),h=a.fieldTransforms;else if(s.mergeFields){let f=[];for(let m of s.mergeFields){let v=mh(e,m,t);if(!a.contains(v))throw new V(P.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);T_(f,v)||f.push(v)}u=new Be(f),h=a.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=a.fieldTransforms;return new dh(new ke(c),u,h)}var ga=class n extends Qi{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function vT(n,e,t,r){let i=n.Dc(1,e,t);Kh("Data must be an object, but it was:",i,r);let s=[],a=ke.empty();Jt(r,(u,h)=>{let f=Hh(e,u,t);h=de(h);let m=i.gc(f);if(h instanceof ga)s.push(f);else{let v=Da(h,m);v!=null&&(s.push(f),a.set(f,v))}});let c=new Be(s);return new ma(a,c,i.fieldTransforms)}function IT(n,e,t,r,i,s){let a=n.Dc(1,e,t),c=[mh(e,r,t)],u=[i];if(s.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<s.length;v+=2)c.push(mh(e,s[v])),u.push(s[v+1]);let h=[],f=ke.empty();for(let v=c.length-1;v>=0;--v)if(!T_(h,c[v])){let S=c[v],C=u[v];C=de(C);let N=a.gc(S);if(C instanceof ga)h.push(S);else{let k=Da(C,N);k!=null&&(h.push(S),f.set(S,k))}}let m=new Be(h);return new ma(f,m,a.fieldTransforms)}function Da(n,e){if(E_(n=de(n)))return Kh("Unsupported field value:",e,n),w_(n,e);if(n instanceof Qi)return function(r,i){if(!y_(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){let s=[],a=0;for(let c of r){let u=Da(c,i.yc(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=de(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return aE(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=se.fromDate(r);return{timestampValue:Rr(i.serializer,s)}}if(r instanceof se){let s=new se(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Rr(i.serializer,s)}}if(r instanceof Mt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Lt)return{bytesValue:Cg(i.serializer,r._byteString)};if(r instanceof Re){let s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:xh(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Ft)return function(a,c){return{mapValue:{fields:{[Dh]:{stringValue:kh},[Ir]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw c.wc("VectorValues must only contain numeric values.");return Vh(c.serializer,h)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${Eh(r)}`)}(n,e)}function w_(n,e){let t={};return ng(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Jt(n,(r,i)=>{let s=Da(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function E_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof se||n instanceof Mt||n instanceof Lt||n instanceof Re||n instanceof Qi||n instanceof Ft)}function Kh(n,e,t){if(!E_(t)||!jm(t)){let r=Eh(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function mh(n,e,t){if((e=de(e))instanceof Nr)return e._internalPath;if(typeof e=="string")return Hh(n,e);throw _a("Field path arguments must be of type string or ",n,!1,void 0,t)}var wT=new RegExp("[~\\*/\\[\\]]");function Hh(n,e,t){if(e.search(wT)>=0)throw _a(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Nr(...e.split("."))._internalPath}catch{throw _a(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function _a(n,e,t,r,i){let s=r&&!r.isEmpty(),a=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new V(P.INVALID_ARGUMENT,c+n+u)}function T_(n,e){return n.some(t=>t.isEqual(e))}var ya=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new gh(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(A_("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},gh=class extends ya{data(){return super.data()}};function A_(n,e){return typeof e=="string"?Hh(n,e):e instanceof Nr?e._internalPath:e._delegate._internalPath}function ET(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var _h=class{convertValue(e,t="none"){switch(Bt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(yt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return Jt(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;let s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Ir].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>ie(a.doubleValue));return new Ft(s)}convertGeoPoint(e){return new Mt(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Aa(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ui(e));default:return null}}convertTimestamp(e){let t=_t(e);return new se(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=Z.fromString(e);F(Ug(r),9688,{name:e});let i=new vr(r.get(1),r.get(3)),s=new x(r.popFirst(5));return i.isEqual(t)||De(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function b_(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var In=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Sn=class n extends ya{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new lr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(A_("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};Sn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Sn._jsonSchema={type:he("string",Sn._jsonSchemaVersion),bundleSource:he("string","DocumentSnapshot"),bundleName:he("string"),bundle:he("string")};var lr=class extends Sn{data(e={}){return super.data(e)}},hr=class n{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new In(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new lr(this._firestore,this._userDataWriter,r.key,r,new In(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{let u=new lr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new In(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let u=new lr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new In(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:TT(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ki.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function TT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L(61501,{type:n})}}hr._jsonSchemaVersion="firestore/querySnapshot/1.0",hr._jsonSchema={type:he("string",hr._jsonSchemaVersion),bundleSource:he("string","QuerySnapshot"),bundleName:he("string"),bundle:he("string")};var va=class extends _h{constructor(e){super(),this.firestore=e}convertBytes(e){return new Lt(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}};function S_(n,e,t){n=wn(n,Re);let r=wn(n.firestore,Ht),i=b_(n.converter,e,t);return Qh(r,[I_(v_(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Ne.none())])}function R_(n){return Qh(wn(n.firestore,Ht),[new kn(n._key,Ne.none())])}function P_(n,...e){var t,r,i;n=de(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Mm(e[a])||(s=e[a++]);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Mm(e[a])){let m=e[a];e[a]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[a+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[a+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,h,f;if(n instanceof Re)h=wn(n.firestore,Ht),f=Sa(n._key.path),u={next:m=>{e[a]&&e[a](AT(h,n,m))},error:e[a+1],complete:e[a+2]};else{let m=wn(n,fa);h=wn(m.firestore,Ht),f=m._query;let v=new va(h);u={next:S=>{e[a]&&e[a](new hr(h,v,m,S))},error:e[a+1],complete:e[a+2]},ET(n._query)}return function(v,S,C,N){let k=new lh(N),z=new nh(S,k,C);return v.asyncQueue.enqueueAndForget(async()=>XE(await Nm(v),z)),()=>{k.Ou(),v.asyncQueue.enqueueAndForget(async()=>ZE(await Nm(v),z))}}(Wh(h),f,c,u)}function Qh(n,e){return function(r,i){let s=new rt;return r.asyncQueue.enqueueAndForget(async()=>aT(await mT(r),i,s)),s.promise}(Wh(n),e)}function AT(n,e,t){let r=t.docs.get(e._key),i=new va(n);return new Sn(n,i,e._key,r,new In(t.hasPendingWrites,t.fromCache),e.converter)}var yh=class{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Jh(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}};function C_(n){return new yh(n)}var vh=class{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=kr.provider,this._offlineComponentProvider={build:t=>new uh(t,e?.cacheSizeBytes,this.forceOwnership)}}};function Jh(n){return new vh(n?.forceOwnership)}var Ih=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=v_(e)}set(e,t,r){this._verifyNotCommitted();let i=Tu(e,this._firestore),s=b_(i.converter,t,r),a=I_(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,Ne.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=Tu(e,this._firestore),a;return a=typeof(t=de(t))=="string"||t instanceof Nr?IT(this._dataReader,"WriteBatch.update",s._key,t,r,i):vT(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,Ne.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=Tu(e,this._firestore);return this._mutations=this._mutations.concat(new kn(t._key,Ne.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function Tu(n,e){if((n=de(n)).firestore!==e)throw new V(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function D_(n){return Wh(n=wn(n,Ht)),new Ih(n,e=>Qh(n,e))}(function(e,t=!0){(function(i){Or=i})(St),bt(new je("firestore",(r,{instanceIdentifier:i,options:s})=>{let a=r.getProvider("app").getImmediate(),c=new Ht(new Su(r.getProvider("auth-internal")),new Cu(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vr(h.options.projectId,f)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Ke(Ap,bp,e),Ke(Ap,bp,"esm2017")})();window.FB={initializeApp:Sf,initializeAuth:Zc,indexedDBLocalPersistence:su,browserLocalPersistence:ru,browserPopupRedirectResolver:lu,GoogleAuthProvider:cn,signInWithCredential:eu,signInWithPopup:au,signInWithRedirect:cu,getRedirectResult:uu,signOut:nu,onAuthStateChanged:tu,initializeFirestore:__,persistentLocalCache:C_,persistentSingleTabManager:Jh,collection:m_,doc:g_,setDoc:S_,deleteDoc:R_,onSnapshot:P_,writeBatch:D_};})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
