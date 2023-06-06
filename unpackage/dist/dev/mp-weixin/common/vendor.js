"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove$1 = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$2.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx2 = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx2, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode$1 = encodeURIComponent;
function stringifyQuery(obj, encodeStr2 = encode$1) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr2(key) + "=" + encodeStr2(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E$1 = function() {
};
E$1.prototype = {
  on: function(name, callback, ctx2) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx: ctx2
    });
    return this;
  },
  once: function(name, callback, ctx2) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx2, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx2);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1$1 = E$1;
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse$1(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile$1(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse$1(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile$1(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages2) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages2 && messages2[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages2 && Object.keys(messages2).length > 0) {
    locales = Object.keys(messages2);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages2 || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index !== "undefined" && index.getLocale) {
    return index.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages2] = [
      messages2,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages: messages2,
    watcher
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t2(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t2(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn$1(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required: required2, validator } = prop;
  if (required2 && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required2) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types2 = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types2.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types2[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$1(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$1(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove$1(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$1(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$1(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__5F637A1",
    appName: "test",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.8.4",
    uniRuntimeVersion: "3.8.4",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__5F637A1",
      appName: "test",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$1(target, key)) {
        return target[key];
      }
      if (hasOwn$1(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$1(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  let global2 = wx;
  if (typeof globalThis !== "undefined" && globalThis.wx && wx !== globalThis.wx) {
    global2 = globalThis.wx;
  }
  const newWx = {};
  for (const key in global2) {
    if (isWxKey(key)) {
      newWx[key] = global2[key];
    }
  }
  if (typeof globalThis !== "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn$1(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$2(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$2(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$2(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$2,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$2(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$2,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$2(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$2.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$2(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$2.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$1(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError$2(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError$2(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError$2(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer$1 = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer$1.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer$1.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer$1 = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer$1 = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer$1 = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn(`injection "${String(key)}" not found.`);
    }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(
          s2,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove$1(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx2, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx2;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove$1(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve$1(instance[type] || Component2[type], name) || // global registration
      resolve$1(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve$1(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx: ctx2, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx2[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx2 !== EMPTY_OBJ && hasOwn$1(ctx2, key)) {
        accessCache[key] = 4;
        return ctx2[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx2 !== EMPTY_OBJ && hasOwn$1(ctx2, key)) {
      accessCache[key] = 4;
      return ctx2[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$1(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx: ctx2 } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx2, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx2[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx: ctx2, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx2, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx: ctx2, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx2, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx: ctx2, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx2, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx2 = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx2, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx2, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx2, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx2, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx2, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx2, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx2, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx2[key] = injected;
      }
    } else {
      ctx2[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx2, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx2[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx2, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx2[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required: required2, validator } = prop;
  if (required2 && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types2 = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types2.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types2[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context2 = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context2.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context2,
      _instance: null,
      version: version$5,
      get config() {
        return context2.config;
      },
      set config(v) {
        {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context2.mixins.includes(mixin)) {
            context2.mixins.push(mixin);
          } else {
            warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context2.config);
        }
        if (!component) {
          return context2.components[name];
        }
        if (context2.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context2.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context2.directives[name];
        }
        if (context2.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context2.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context2.provides) {
          warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context2.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version$5 = "3.2.47";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx2 = instance.ctx;
  const callbacks = ctx2.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx2 = instance.ctx;
  if (!ctx2.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx2.__next_tick_callbacks) {
    ctx2.__next_tick_callbacks = [];
  }
  ctx2.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
        /* ErrorCodes.SCHEDULER */
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src2, seen) {
  src2 = unwrapper(src2);
  const type = typeof src2;
  if (type === "object" && src2 !== null) {
    let copy = seen.get(src2);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src2)) {
      const len = src2.length;
      copy = new Array(len);
      seen.set(src2, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src2[i], seen);
      }
    } else {
      copy = {};
      seen.set(src2, copy);
      for (const name in src2) {
        if (hasOwn$1(src2, name)) {
          copy[name] = clone(src2[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src2;
  }
}
function deepCopy(src2) {
  return clone(src2, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx2 = instance.ctx;
  const mpType = ctx2.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx2.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx2.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx2.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx2 = instance.ctx;
      if (!ctx2.$computedKeys) {
        ctx2.$computedKeys = [];
      }
      ctx2.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || [])
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$1(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r, f: f2 }, refValue, setupState) {
  if (isFunction(r)) {
    r(refValue, {});
  } else {
    const _isString = isString(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove$1(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx: ctx2, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx2);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError$2(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update: update2 }, allowed) {
  effect.allowRecurse = update2.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
    // track it in component's effect scope
  );
  const update2 = instance.update = effect.run.bind(effect);
  update2.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update2.ownerInstance = instance;
  }
  update2();
}
function unmountComponent(instance) {
  const { bum, scope, update: update2, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update2) {
    update2.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version$5);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set$3(target, key, val) {
  return target[key] = val;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$3;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx2 = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx2.$mpPlatform === "mp-weixin" || ctx2.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx2.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx2) {
  return function emit2(event, ...args) {
    const scope = ctx2.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx2 = instance.ctx;
  ctx2.mpType = options.mpType;
  ctx2.$mpType = options.mpType;
  ctx2.$mpPlatform = "mp-weixin";
  ctx2.$scope = options.mpInstance;
  ctx2.$mp = {};
  {
    ctx2._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx2.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx2.$hasHook = hasHook;
  ctx2.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx2);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx2 = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx2[method] = function(...args) {
      const mpInstance = ctx2.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx2 = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$1(mpInstance, mock)) {
      instance[mock] = ctx2[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx2 = internalInstance.ctx;
      if (this.$vm && ctx2.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx2.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      properties.name = {
        type: null,
        value: ""
      };
      properties.value = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$1(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var module$1 = {};
var SupabaseClient$1 = {};
var src$4 = {};
var FunctionsClient$1 = {};
var helper = {};
Object.defineProperty(helper, "__esModule", { value: true });
helper.resolveFetch = void 0;
const resolveFetch$2 = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined")
    ;
  else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
helper.resolveFetch = resolveFetch$2;
var types$2 = {};
Object.defineProperty(types$2, "__esModule", { value: true });
types$2.FunctionsHttpError = types$2.FunctionsRelayError = types$2.FunctionsFetchError = types$2.FunctionsError = void 0;
class FunctionsError extends Error {
  constructor(message, name = "FunctionsError", context2) {
    super(message);
    super.name = name;
    this.context = context2;
  }
}
types$2.FunctionsError = FunctionsError;
class FunctionsFetchError extends FunctionsError {
  constructor(context2) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", context2);
  }
}
types$2.FunctionsFetchError = FunctionsFetchError;
class FunctionsRelayError extends FunctionsError {
  constructor(context2) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", context2);
  }
}
types$2.FunctionsRelayError = FunctionsRelayError;
class FunctionsHttpError extends FunctionsError {
  constructor(context2) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context2);
  }
}
types$2.FunctionsHttpError = FunctionsHttpError;
var __awaiter$b = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(FunctionsClient$1, "__esModule", { value: true });
FunctionsClient$1.FunctionsClient = void 0;
const helper_1 = helper;
const types_1 = types$2;
class FunctionsClient {
  constructor(url, { headers = {}, customFetch } = {}) {
    this.url = url;
    this.headers = headers;
    this.fetch = (0, helper_1.resolveFetch)(customFetch);
  }
  /**
   * Updates the authorization header
   * @param token - the new jwt token sent in the authorisation header
   */
  setAuth(token) {
    this.headers.Authorization = `Bearer ${token}`;
  }
  /**
   * Invokes a function
   * @param functionName - the name of the function to invoke
   */
  invoke(functionName, invokeOptions = {}) {
    var _a2;
    return __awaiter$b(this, void 0, void 0, function* () {
      try {
        const { headers, body: functionArgs } = invokeOptions;
        let _headers = {};
        let body;
        if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
          if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
            _headers["Content-Type"] = "application/octet-stream";
            body = functionArgs;
          } else if (typeof functionArgs === "string") {
            _headers["Content-Type"] = "text/plain";
            body = functionArgs;
          } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
            body = functionArgs;
          } else {
            _headers["Content-Type"] = "application/json";
            body = JSON.stringify(functionArgs);
          }
        }
        const response = yield this.fetch(`${this.url}/${functionName}`, {
          method: "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
          body
        }).catch((fetchError) => {
          throw new types_1.FunctionsFetchError(fetchError);
        });
        const isRelayError = response.headers.get("x-relay-error");
        if (isRelayError && isRelayError === "true") {
          throw new types_1.FunctionsRelayError(response);
        }
        if (!response.ok) {
          throw new types_1.FunctionsHttpError(response);
        }
        let responseType = ((_a2 = response.headers.get("Content-Type")) !== null && _a2 !== void 0 ? _a2 : "text/plain").split(";")[0].trim();
        let data;
        if (responseType === "application/json") {
          data = yield response.json();
        } else if (responseType === "application/octet-stream") {
          data = yield response.blob();
        } else if (responseType === "multipart/form-data") {
          data = yield response.formData();
        } else {
          data = yield response.text();
        }
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    });
  }
}
FunctionsClient$1.FunctionsClient = FunctionsClient;
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.FunctionsRelayError = exports2.FunctionsHttpError = exports2.FunctionsFetchError = exports2.FunctionsError = exports2.FunctionsClient = void 0;
  var FunctionsClient_1 = FunctionsClient$1;
  Object.defineProperty(exports2, "FunctionsClient", { enumerable: true, get: function() {
    return FunctionsClient_1.FunctionsClient;
  } });
  var types_12 = types$2;
  Object.defineProperty(exports2, "FunctionsError", { enumerable: true, get: function() {
    return types_12.FunctionsError;
  } });
  Object.defineProperty(exports2, "FunctionsFetchError", { enumerable: true, get: function() {
    return types_12.FunctionsFetchError;
  } });
  Object.defineProperty(exports2, "FunctionsHttpError", { enumerable: true, get: function() {
    return types_12.FunctionsHttpError;
  } });
  Object.defineProperty(exports2, "FunctionsRelayError", { enumerable: true, get: function() {
    return types_12.FunctionsRelayError;
  } });
})(src$4);
var src$3 = {};
var PostgrestClient$1 = {};
var PostgrestQueryBuilder$1 = {};
var PostgrestFilterBuilder$1 = {};
var PostgrestTransformBuilder$1 = {};
var PostgrestBuilder$1 = {};
var __awaiter$a = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(PostgrestBuilder$1, "__esModule", { value: true });
class PostgrestBuilder {
  constructor(builder) {
    this.shouldThrowOnError = false;
    this.method = builder.method;
    this.url = builder.url;
    this.headers = builder.headers;
    this.schema = builder.schema;
    this.body = builder.body;
    this.shouldThrowOnError = builder.shouldThrowOnError;
    this.signal = builder.signal;
    this.allowEmpty = builder.allowEmpty;
    if (builder.fetch) {
      this.fetch = builder.fetch;
    } else if (typeof fetch === "undefined")
      ;
    else {
      this.fetch = fetch;
    }
  }
  /**
   * If there's an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   *
   * {@link https://github.com/supabase/supabase-js/issues/92}
   */
  throwOnError() {
    this.shouldThrowOnError = true;
    return this;
  }
  then(onfulfilled, onrejected) {
    if (this.schema === void 0)
      ;
    else if (["GET", "HEAD"].includes(this.method)) {
      this.headers["Accept-Profile"] = this.schema;
    } else {
      this.headers["Content-Profile"] = this.schema;
    }
    if (this.method !== "GET" && this.method !== "HEAD") {
      this.headers["Content-Type"] = "application/json";
    }
    const _fetch = this.fetch;
    let res = _fetch(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then((res2) => __awaiter$a(this, void 0, void 0, function* () {
      var _a2, _b, _c;
      let error = null;
      let data = null;
      let count = null;
      let status = res2.status;
      let statusText = res2.statusText;
      if (res2.ok) {
        if (this.method !== "HEAD") {
          const body = res2;
          if (body === "")
            ;
          else if (this.headers["Accept"] === "text/csv") {
            data = body;
          } else if (this.headers["Accept"] && this.headers["Accept"].includes("application/vnd.pgrst.plan+text")) {
            data = body;
          } else {
            data = body;
          }
        }
        const countHeader = (_a2 = this.headers["Prefer"]) === null || _a2 === void 0 ? void 0 : _a2.match(/count=(exact|planned|estimated)/);
        const contentRange = (_b = res2.headers.get("content-range")) === null || _b === void 0 ? void 0 : _b.split("/");
        if (countHeader && contentRange && contentRange.length > 1) {
          count = parseInt(contentRange[1]);
        }
      } else {
        const body = res2;
        try {
          error = body;
          if (Array.isArray(error) && res2.status === 404) {
            data = [];
            error = null;
            status = 200;
            statusText = "OK";
          }
        } catch (_d) {
          if (res2.status === 404 && body === "") {
            status = 204;
            statusText = "No Content";
          } else {
            error = {
              message: body
            };
          }
        }
        if (error && this.allowEmpty && ((_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c.includes("Results contain 0 rows"))) {
          error = null;
          status = 200;
          statusText = "OK";
        }
        if (error && this.shouldThrowOnError) {
          throw error;
        }
      }
      const postgrestResponse = {
        error,
        data,
        count,
        status,
        statusText
      };
      return postgrestResponse;
    }));
    if (!this.shouldThrowOnError) {
      res = res.catch((fetchError) => ({
        error: {
          message: `FetchError: ${fetchError.message}`,
          details: "",
          hint: "",
          code: fetchError.code || ""
        },
        data: null,
        count: null,
        status: 0,
        statusText: ""
      }));
    }
    return res.then(onfulfilled, onrejected);
  }
}
PostgrestBuilder$1.default = PostgrestBuilder;
var __importDefault$6 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(PostgrestTransformBuilder$1, "__esModule", { value: true });
const PostgrestBuilder_1 = __importDefault$6(PostgrestBuilder$1);
class PostgrestTransformBuilder extends PostgrestBuilder_1.default {
  /**
   * Perform a SELECT on the query result.
   *
   * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
   * return modified rows. By calling this method, modified rows are returned in
   * `data`.
   *
   * @param columns - The columns to retrieve, separated by commas
   */
  select(columns) {
    let quoted = false;
    const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
      if (/\s/.test(c) && !quoted) {
        return "";
      }
      if (c === '"') {
        quoted = !quoted;
      }
      return c;
    }).join("");
    this.url.searchParams.set("select", cleanedColumns);
    if (this.headers["Prefer"]) {
      this.headers["Prefer"] += ",";
    }
    this.headers["Prefer"] += "return=representation";
    return this;
  }
  /**
   * Order the query result by `column`.
   *
   * You can call this method multiple times to order by multiple columns.
   *
   * You can order foreign tables, but it doesn't affect the ordering of the
   * current table.
   *
   * @param column - The column to order by
   * @param options - Named parameters
   * @param options.ascending - If `true`, the result will be in ascending order
   * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
   * `null`s appear last.
   * @param options.foreignTable - Set this to order a foreign table by foreign
   * columns
   */
  order(column, { ascending = true, nullsFirst, foreignTable } = {}) {
    const key = foreignTable ? `${foreignTable}.order` : "order";
    const existingOrder = this.url.searchParams.get(key);
    this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
    return this;
  }
  /**
   * Limit the query result by `count`.
   *
   * @param count - The maximum number of rows to return
   * @param options - Named parameters
   * @param options.foreignTable - Set this to limit rows of foreign tables
   * instead of the current table
   */
  limit(count, { foreignTable } = {}) {
    const key = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
    this.url.searchParams.set(key, `${count}`);
    return this;
  }
  /**
   * Limit the query result by `from` and `to` inclusively.
   *
   * @param from - The starting index from which to limit the result
   * @param to - The last index to which to limit the result
   * @param options - Named parameters
   * @param options.foreignTable - Set this to limit rows of foreign tables
   * instead of the current table
   */
  range(from, to, { foreignTable } = {}) {
    const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
    const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
    this.url.searchParams.set(keyOffset, `${from}`);
    this.url.searchParams.set(keyLimit, `${to - from + 1}`);
    return this;
  }
  /**
   * Set the AbortSignal for the fetch request.
   *
   * @param signal - The AbortSignal to use for the fetch request
   */
  abortSignal(signal) {
    this.signal = signal;
    return this;
  }
  /**
   * Return `data` as a single object instead of an array of objects.
   *
   * Query result must be one row (e.g. using `.limit(1)`), otherwise this
   * returns an error.
   */
  single() {
    this.headers["Accept"] = "application/vnd.pgrst.object+json";
    return this;
  }
  /**
   * Return `data` as a single object instead of an array of objects.
   *
   * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
   * this returns an error.
   */
  maybeSingle() {
    this.headers["Accept"] = "application/vnd.pgrst.object+json";
    this.allowEmpty = true;
    return this;
  }
  /**
   * Return `data` as a string in CSV format.
   */
  csv() {
    this.headers["Accept"] = "text/csv";
    return this;
  }
  /**
   * Return `data` as an object in [GeoJSON](https://geojson.org) format.
   */
  geojson() {
    this.headers["Accept"] = "application/geo+json";
    return this;
  }
  /**
   * Return `data` as the EXPLAIN plan for the query.
   *
   * @param options - Named parameters
   *
   * @param options.analyze - If `true`, the query will be executed and the
   * actual run time will be returned
   *
   * @param options.verbose - If `true`, the query identifier will be returned
   * and `data` will include the output columns of the query
   *
   * @param options.settings - If `true`, include information on configuration
   * parameters that affect query planning
   *
   * @param options.buffers - If `true`, include information on buffer usage
   *
   * @param options.wal - If `true`, include information on WAL record generation
   *
   * @param options.format - The format of the output, can be `"text"` (default)
   * or `"json"`
   */
  explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
    const options = [
      analyze ? "analyze" : null,
      verbose ? "verbose" : null,
      settings ? "settings" : null,
      buffers ? "buffers" : null,
      wal ? "wal" : null
    ].filter(Boolean).join("|");
    const forMediatype = this.headers["Accept"];
    this.headers["Accept"] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`;
    if (format === "json")
      return this;
    else
      return this;
  }
  /**
   * Rollback the query.
   *
   * `data` will still be returned, but the query is not committed.
   */
  rollback() {
    var _a2;
    if (((_a2 = this.headers["Prefer"]) !== null && _a2 !== void 0 ? _a2 : "").trim().length > 0) {
      this.headers["Prefer"] += ",tx=rollback";
    } else {
      this.headers["Prefer"] = "tx=rollback";
    }
    return this;
  }
  /**
   * Override the type of the returned `data`.
   *
   * @typeParam NewResult - The new result type to override with
   */
  returns() {
    return this;
  }
}
PostgrestTransformBuilder$1.default = PostgrestTransformBuilder;
var __importDefault$5 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(PostgrestFilterBuilder$1, "__esModule", { value: true });
const PostgrestTransformBuilder_1 = __importDefault$5(PostgrestTransformBuilder$1);
class PostgrestFilterBuilder extends PostgrestTransformBuilder_1.default {
  /**
   * Match only rows where `column` is equal to `value`.
   *
   * To check if the value of `column` is NULL, you should use `.is()` instead.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  eq(column, value) {
    this.url.searchParams.append(column, `eq.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is not equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  neq(column, value) {
    this.url.searchParams.append(column, `neq.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is greater than `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  gt(column, value) {
    this.url.searchParams.append(column, `gt.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is greater than or equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  gte(column, value) {
    this.url.searchParams.append(column, `gte.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is less than `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  lt(column, value) {
    this.url.searchParams.append(column, `lt.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is less than or equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  lte(column, value) {
    this.url.searchParams.append(column, `lte.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` matches `pattern` case-sensitively.
   *
   * @param column - The column to filter on
   * @param pattern - The pattern to match with
   */
  like(column, pattern) {
    this.url.searchParams.append(column, `like.${pattern}`);
    return this;
  }
  /**
   * Match only rows where `column` matches `pattern` case-insensitively.
   *
   * @param column - The column to filter on
   * @param pattern - The pattern to match with
   */
  ilike(column, pattern) {
    this.url.searchParams.append(column, `ilike.${pattern}`);
    return this;
  }
  /**
   * Match only rows where `column` IS `value`.
   *
   * For non-boolean columns, this is only relevant for checking if the value of
   * `column` is NULL by setting `value` to `null`.
   *
   * For boolean columns, you can also set `value` to `true` or `false` and it
   * will behave the same way as `.eq()`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  is(column, value) {
    this.url.searchParams.append(column, `is.${value}`);
    return this;
  }
  /**
   * Match only rows where `column` is included in the `values` array.
   *
   * @param column - The column to filter on
   * @param values - The values array to filter with
   */
  in(column, values) {
    const cleanedValues = values.map((s2) => {
      if (typeof s2 === "string" && new RegExp("[,()]").test(s2))
        return `"${s2}"`;
      else
        return `${s2}`;
    }).join(",");
    this.url.searchParams.append(column, `in.(${cleanedValues})`);
    return this;
  }
  /**
   * Only relevant for jsonb, array, and range columns. Match only rows where
   * `column` contains every element appearing in `value`.
   *
   * @param column - The jsonb, array, or range column to filter on
   * @param value - The jsonb, array, or range value to filter with
   */
  contains(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(column, `cs.${value}`);
    } else if (Array.isArray(value)) {
      this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
    } else {
      this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
    }
    return this;
  }
  /**
   * Only relevant for jsonb, array, and range columns. Match only rows where
   * every element appearing in `column` is contained by `value`.
   *
   * @param column - The jsonb, array, or range column to filter on
   * @param value - The jsonb, array, or range value to filter with
   */
  containedBy(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(column, `cd.${value}`);
    } else if (Array.isArray(value)) {
      this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
    } else {
      this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
    }
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is greater than any element in `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeGt(column, range) {
    this.url.searchParams.append(column, `sr.${range}`);
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is either contained in `range` or greater than any element in
   * `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeGte(column, range) {
    this.url.searchParams.append(column, `nxl.${range}`);
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is less than any element in `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeLt(column, range) {
    this.url.searchParams.append(column, `sl.${range}`);
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is either contained in `range` or less than any element in
   * `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeLte(column, range) {
    this.url.searchParams.append(column, `nxr.${range}`);
    return this;
  }
  /**
   * Only relevant for range columns. Match only rows where `column` is
   * mutually exclusive to `range` and there can be no element between the two
   * ranges.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeAdjacent(column, range) {
    this.url.searchParams.append(column, `adj.${range}`);
    return this;
  }
  /**
   * Only relevant for array and range columns. Match only rows where
   * `column` and `value` have an element in common.
   *
   * @param column - The array or range column to filter on
   * @param value - The array or range value to filter with
   */
  overlaps(column, value) {
    if (typeof value === "string") {
      this.url.searchParams.append(column, `ov.${value}`);
    } else {
      this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
    }
    return this;
  }
  /**
   * Only relevant for text and tsvector columns. Match only rows where
   * `column` matches the query string in `query`.
   *
   * @param column - The text or tsvector column to filter on
   * @param query - The query text to match with
   * @param options - Named parameters
   * @param options.config - The text search configuration to use
   * @param options.type - Change how the `query` text is interpreted
   */
  textSearch(column, query, { config, type } = {}) {
    let typePart = "";
    if (type === "plain") {
      typePart = "pl";
    } else if (type === "phrase") {
      typePart = "ph";
    } else if (type === "websearch") {
      typePart = "w";
    }
    const configPart = config === void 0 ? "" : `(${config})`;
    this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
    return this;
  }
  /**
   * Match only rows where each column in `query` keys is equal to its
   * associated value. Shorthand for multiple `.eq()`s.
   *
   * @param query - The object to filter with, with column names as keys mapped
   * to their filter values
   */
  match(query) {
    Object.entries(query).forEach(([column, value]) => {
      this.url.searchParams.append(column, `eq.${value}`);
    });
    return this;
  }
  /**
   * Match only rows which doesn't satisfy the filter.
   *
   * Unlike most filters, `opearator` and `value` are used as-is and need to
   * follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure they are properly sanitized.
   *
   * @param column - The column to filter on
   * @param operator - The operator to be negated to filter with, following
   * PostgREST syntax
   * @param value - The value to filter with, following PostgREST syntax
   */
  not(column, operator, value) {
    this.url.searchParams.append(column, `not.${operator}.${value}`);
    return this;
  }
  /**
   * Match only rows which satisfy at least one of the filters.
   *
   * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure it's properly sanitized.
   *
   * It's currently not possible to do an `.or()` filter across multiple tables.
   *
   * @param filters - The filters to use, following PostgREST syntax
   * @param foreignTable - Set this to filter on foreign tables instead of the
   * current table
   */
  or(filters, { foreignTable } = {}) {
    const key = foreignTable ? `${foreignTable}.or` : "or";
    this.url.searchParams.append(key, `(${filters})`);
    return this;
  }
  /**
   * Match only rows which satisfy the filter. This is an escape hatch - you
   * should use the specific filter methods wherever possible.
   *
   * Unlike most filters, `opearator` and `value` are used as-is and need to
   * follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure they are properly sanitized.
   *
   * @param column - The column to filter on
   * @param operator - The operator to filter with, following PostgREST syntax
   * @param value - The value to filter with, following PostgREST syntax
   */
  filter(column, operator, value) {
    this.url.searchParams.append(column, `${operator}.${value}`);
    return this;
  }
}
PostgrestFilterBuilder$1.default = PostgrestFilterBuilder;
var __importDefault$4 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(PostgrestQueryBuilder$1, "__esModule", { value: true });
const PostgrestFilterBuilder_1$1 = __importDefault$4(PostgrestFilterBuilder$1);
class PostgrestQueryBuilder {
  constructor(url, { headers = {}, schema, fetch: fetch2 }) {
    this.url = url;
    this.headers = headers;
    this.schema = schema;
    this.fetch = fetch2;
  }
  /**
   * Perform a SELECT query on the table or view.
   *
   * @param columns - The columns to retrieve, separated by commas
   *
   * @param options - Named parameters
   *
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   *
   * @param options.count - Count algorithm to use to count rows in the table or view.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  select(columns, { head = false, count } = {}) {
    const method = head ? "HEAD" : "GET";
    let quoted = false;
    const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
      if (/\s/.test(c) && !quoted) {
        return "";
      }
      if (c === '"') {
        quoted = !quoted;
      }
      return c;
    }).join("");
    this.url.searchParams.set("select", cleanedColumns);
    if (count) {
      this.headers["Prefer"] = `count=${count}`;
    }
    return new PostgrestFilterBuilder_1$1.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
  /**
   * Perform an INSERT into the table or view.
   *
   * By default, inserted rows are not returned. To return it, chain the call
   * with `.select()`.
   *
   * @param values - The values to insert. Pass an object to insert a single row
   * or an array to insert multiple rows.
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count inserted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  insert(values, { count } = {}) {
    const method = "POST";
    const prefersHeaders = [];
    const body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers["Prefer"]) {
      prefersHeaders.unshift(this.headers["Prefer"]);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    if (Array.isArray(values)) {
      const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
      if (columns.length > 0) {
        const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
        this.url.searchParams.set("columns", uniqueColumns.join(","));
      }
    }
    return new PostgrestFilterBuilder_1$1.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
  /**
   * Perform an UPSERT on the table or view. Depending on the column(s) passed
   * to `onConflict`, `.upsert()` allows you to perform the equivalent of
   * `.insert()` if a row with the corresponding `onConflict` columns doesn't
   * exist, or if it does exist, perform an alternative action depending on
   * `ignoreDuplicates`.
   *
   * By default, upserted rows are not returned. To return it, chain the call
   * with `.select()`.
   *
   * @param values - The values to upsert with. Pass an object to upsert a
   * single row or an array to upsert multiple rows.
   *
   * @param options - Named parameters
   *
   * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
   * duplicate rows are determined. Two rows are duplicates if all the
   * `onConflict` columns are equal.
   *
   * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
   * `false`, duplicate rows are merged with existing rows.
   *
   * @param options.count - Count algorithm to use to count upserted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  upsert(values, { onConflict, ignoreDuplicates = false, count } = {}) {
    const method = "POST";
    const prefersHeaders = [`resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`];
    if (onConflict !== void 0)
      this.url.searchParams.set("on_conflict", onConflict);
    const body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers["Prefer"]) {
      prefersHeaders.unshift(this.headers["Prefer"]);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder_1$1.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
  /**
   * Perform an UPDATE on the table or view.
   *
   * By default, updated rows are not returned. To return it, chain the call
   * with `.select()` after filters.
   *
   * @param values - The values to update with
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count updated rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  update(values, { count } = {}) {
    const method = "PATCH";
    const prefersHeaders = [];
    const body = values;
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers["Prefer"]) {
      prefersHeaders.unshift(this.headers["Prefer"]);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder_1$1.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
  /**
   * Perform a DELETE on the table or view.
   *
   * By default, deleted rows are not returned. To return it, chain the call
   * with `.select()` after filters.
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count deleted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  delete({ count } = {}) {
    const method = "DELETE";
    const prefersHeaders = [];
    if (count) {
      prefersHeaders.push(`count=${count}`);
    }
    if (this.headers["Prefer"]) {
      prefersHeaders.unshift(this.headers["Prefer"]);
    }
    this.headers["Prefer"] = prefersHeaders.join(",");
    return new PostgrestFilterBuilder_1$1.default({
      method,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
}
PostgrestQueryBuilder$1.default = PostgrestQueryBuilder;
var constants$5 = {};
var version$4 = {};
Object.defineProperty(version$4, "__esModule", { value: true });
version$4.version = void 0;
version$4.version = "1.1.1";
Object.defineProperty(constants$5, "__esModule", { value: true });
constants$5.DEFAULT_HEADERS = void 0;
const version_1$3 = version$4;
constants$5.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${version_1$3.version}` };
var querystringifyWechat = {};
var has = Object.prototype.hasOwnProperty, undef;
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, " "));
  } catch (e2) {
    return null;
  }
}
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e2) {
    return null;
  }
}
function querystring$2(query) {
  var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
  while (part = parser.exec(query)) {
    var key = decode(part[1]), value = decode(part[2]);
    if (key === null || value === null || key in result)
      continue;
    result[key] = value;
  }
  return result;
}
function querystringify(obj, prefix) {
  prefix = prefix || "";
  var pairs = [], value, key;
  if ("string" !== typeof prefix)
    prefix = "?";
  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = "";
      }
      key = encode(key);
      value = encode(value);
      if (key === null || value === null)
        continue;
      pairs.push(key + "=" + value);
    }
  }
  return pairs.length ? prefix + pairs.join("&") : "";
}
querystringifyWechat.stringify = querystringify;
querystringifyWechat.parse = querystring$2;
var qs = querystringifyWechat, controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, CRHTLF = /[\n\r\t]/g, slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, port = /:\d+$/, protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, windowsDriveLetter = /^[a-zA-Z]:/;
function trimLeft(str) {
  return (str ? str : "").toString().replace(controlOrWhitespace, "");
}
function required(port2, protocol) {
  protocol = protocol.split(":")[0];
  port2 = +port2;
  if (!port2)
    return false;
  switch (protocol) {
    case "http":
    case "ws":
      return port2 !== 80;
    case "https":
    case "wss":
      return port2 !== 443;
    case "ftp":
      return port2 !== 21;
    case "gopher":
      return port2 !== 70;
    case "file":
      return false;
  }
  return port2 !== 0;
}
var rules = [
  ["#", "hash"],
  ["?", "query"],
  function sanitize(address, url) {
    return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
  },
  ["/", "pathname"],
  ["@", "auth", 1],
  [NaN, "host", void 0, 1, 1],
  [/:(\d*)$/, "port", void 0, 1],
  [NaN, "hostname", void 0, 1, 1]
  // Set left over.
];
var ignore = { hash: 1, query: 1 };
function lolcation(loc) {
  var globalVar;
  if (typeof window !== "undefined")
    globalVar = window;
  else if (typeof commonjsGlobal !== "undefined")
    globalVar = commonjsGlobal;
  else if (typeof self !== "undefined")
    globalVar = self;
  else
    globalVar = {};
  var location = globalVar.location || {};
  loc = loc || location;
  var finaldestination = {}, type = typeof loc, key;
  if ("blob:" === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ("string" === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore)
      delete finaldestination[key];
  } else if ("object" === type) {
    for (key in loc) {
      if (key in ignore)
        continue;
      finaldestination[key] = loc[key];
    }
    if (finaldestination.slashes === void 0) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }
  return finaldestination;
}
function isSpecial(scheme) {
  return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
}
function extractProtocol(address, location) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, "");
  location = location || {};
  var match = protocolre.exec(address);
  var protocol = match[1] ? match[1].toLowerCase() : "";
  var forwardSlashes = !!match[2];
  var otherSlashes = !!match[3];
  var slashesCount = 0;
  var rest;
  if (forwardSlashes) {
    if (otherSlashes) {
      rest = match[2] + match[3] + match[4];
      slashesCount = match[2].length + match[3].length;
    } else {
      rest = match[2] + match[4];
      slashesCount = match[2].length;
    }
  } else {
    if (otherSlashes) {
      rest = match[3] + match[4];
      slashesCount = match[3].length;
    } else {
      rest = match[4];
    }
  }
  if (protocol === "file:") {
    if (slashesCount >= 2) {
      rest = rest.slice(2);
    }
  } else if (isSpecial(protocol)) {
    rest = match[4];
  } else if (protocol) {
    if (forwardSlashes) {
      rest = rest.slice(2);
    }
  } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
    rest = match[4];
  }
  return {
    protocol,
    slashes: forwardSlashes || isSpecial(protocol),
    slashesCount,
    rest
  };
}
function resolve(relative, base) {
  if (relative === "")
    return base;
  var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
  while (i--) {
    if (path[i] === ".") {
      path.splice(i, 1);
    } else if (path[i] === "..") {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0)
        unshift = true;
      path.splice(i, 1);
      up--;
    }
  }
  if (unshift)
    path.unshift("");
  if (last === "." || last === "..")
    path.push("");
  return path.join("/");
}
function Url(address, location, parser) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, "");
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }
  var relative, extracted, parse2, instruction, index2, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
  if ("object" !== type && "string" !== type) {
    parser = location;
    location = null;
  }
  if (parser && "function" !== typeof parser)
    parser = qs.parse;
  location = lolcation(location);
  extracted = extractProtocol(address || "", location);
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || "";
  address = extracted.rest;
  if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
    instructions[3] = [/(.*)/, "pathname"];
  }
  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    if (typeof instruction === "function") {
      address = instruction(address, url);
      continue;
    }
    parse2 = instruction[0];
    key = instruction[1];
    if (parse2 !== parse2) {
      url[key] = address;
    } else if ("string" === typeof parse2) {
      index2 = parse2 === "@" ? address.lastIndexOf(parse2) : address.indexOf(parse2);
      if (~index2) {
        if ("number" === typeof instruction[2]) {
          url[key] = address.slice(0, index2);
          address = address.slice(index2 + instruction[2]);
        } else {
          url[key] = address.slice(index2);
          address = address.slice(0, index2);
        }
      }
    } else if (index2 = parse2.exec(address)) {
      url[key] = index2[1];
      address = address.slice(0, index2.index);
    }
    url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
    if (instruction[4])
      url[key] = url[key].toLowerCase();
  }
  if (parser)
    url.query = parser(url.query);
  if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
    url.pathname = resolve(url.pathname, location.pathname);
  }
  if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
    url.pathname = "/" + url.pathname;
  }
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = "";
  }
  url.username = url.password = "";
  if (url.auth) {
    index2 = url.auth.indexOf(":");
    if (~index2) {
      url.username = url.auth.slice(0, index2);
      url.username = encodeURIComponent(decodeURIComponent(url.username));
      url.password = url.auth.slice(index2 + 1);
      url.password = encodeURIComponent(decodeURIComponent(url.password));
    } else {
      url.username = encodeURIComponent(decodeURIComponent(url.auth));
    }
    url.auth = url.password ? url.username + ":" + url.password : url.username;
  }
  url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
  url.href = url.toString();
}
function set(part, value, fn) {
  var url = this;
  switch (part) {
    case "query":
      if ("string" === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }
      url[part] = value;
      break;
    case "port":
      url[part] = value;
      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = "";
      } else if (value) {
        url.host = url.hostname + ":" + value;
      }
      break;
    case "hostname":
      url[part] = value;
      if (url.port)
        value += ":" + url.port;
      url.host = value;
      break;
    case "host":
      url[part] = value;
      if (port.test(value)) {
        value = value.split(":");
        url.port = value.pop();
        url.hostname = value.join(":");
      } else {
        url.hostname = value;
        url.port = "";
      }
      break;
    case "protocol":
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;
    case "pathname":
    case "hash":
      if (value) {
        var char = part === "pathname" ? "/" : "#";
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;
    case "username":
    case "password":
      url[part] = encodeURIComponent(value);
      break;
    case "auth":
      var index2 = value.indexOf(":");
      if (~index2) {
        url.username = value.slice(0, index2);
        url.username = encodeURIComponent(decodeURIComponent(url.username));
        url.password = value.slice(index2 + 1);
        url.password = encodeURIComponent(decodeURIComponent(url.password));
      } else {
        url.username = encodeURIComponent(decodeURIComponent(value));
      }
  }
  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];
    if (ins[4])
      url[ins[1]] = url[ins[1]].toLowerCase();
  }
  url.auth = url.password ? url.username + ":" + url.password : url.username;
  url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
  url.href = url.toString();
  return url;
}
function toString(stringify2) {
  if (!stringify2 || "function" !== typeof stringify2)
    stringify2 = qs.stringify;
  var query, url = this, host2 = url.host, protocol = url.protocol;
  if (protocol && protocol.charAt(protocol.length - 1) !== ":")
    protocol += ":";
  var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
  if (url.username) {
    result += url.username;
    if (url.password)
      result += ":" + url.password;
    result += "@";
  } else if (url.password) {
    result += ":" + url.password;
    result += "@";
  } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host2 && url.pathname !== "/") {
    result += "@";
  }
  if (host2[host2.length - 1] === ":" || port.test(url.hostname) && !url.port) {
    host2 += ":";
  }
  result += host2 + url.pathname;
  query = "object" === typeof url.query ? stringify2(url.query) : url.query;
  if (query)
    result += "?" !== query.charAt(0) ? "?" + query : query;
  if (url.hash)
    result += url.hash;
  return result;
}
Url.prototype = { set, toString };
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;
var urlParseWechat = Url;
const hexTable$1 = new Array(256);
for (let i = 0; i < 256; ++i)
  hexTable$1[i] = "%" + ((i < 16 ? "0" : "").toUpperCase() + // StringPrototypeToUpperCase((i < 16 ? '0' : '') +
  i.toString(16));
const isHexTable$1 = new Int8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
  // ... 256
]);
var querystring$1 = {
  hexTable: hexTable$1,
  isHexTable: isHexTable$1
};
const colorRegExp = /\u001b\[\d\d?m/g;
function toUSVString$1(val) {
  return `${val}`;
}
function removeColors$1(str) {
  return str.replace(colorRegExp, "");
}
const kEnumerableProperty$1 = /* @__PURE__ */ Object.create(null);
kEnumerableProperty$1.enumerable = true;
Object.freeze(kEnumerableProperty$1);
const kEmptyObject = Object.freeze(/* @__PURE__ */ Object.create(null));
var util$1 = {
  toUSVString: toUSVString$1,
  removeColors: removeColors$1,
  kEmptyObject,
  kEnumerableProperty: kEnumerableProperty$1
};
const kIsNodeError = Symbol("kIsNodeError");
const codes = {};
const classRegExp = /^([A-Z][a-z0-9]*)+$/;
const kTypes = [
  "string",
  "function",
  "number",
  "object",
  // Accept 'Function' and 'Object' as alternative to the lower cased version.
  "Function",
  "Object",
  "boolean",
  "bigint",
  "symbol"
];
const MainContextError = Error;
const kNoOverride = Symbol("kNoOverride");
let userStackTraceLimit;
const nodeInternalPrefix = "__node_internal_";
const prepareStackTrace = (globalThis2, error, trace) => {
  var _a2, _b;
  const firstFrame = (_a2 = trace[0]) === null || _a2 === void 0 ? void 0 : _a2.getFunctionName();
  if (firstFrame && StringPrototypeStartsWith(firstFrame, nodeInternalPrefix)) {
    for (let l = trace.length - 1; l >= 0; l--) {
      const fn = (_b = trace[l]) === null || _b === void 0 ? void 0 : _b.getFunctionName();
      if (fn && StringPrototypeStartsWith(fn, nodeInternalPrefix)) {
        ArrayPrototypeSplice(trace, 0, l + 1);
        break;
      }
    }
    if (trace.length > userStackTraceLimit)
      ArrayPrototypeSplice(trace, userStackTraceLimit);
  }
  const globalOverride = maybeOverridePrepareStackTrace(globalThis2, error, trace);
  if (globalOverride !== kNoOverride)
    return globalOverride;
  let errorString;
  if (kIsNodeError in error) {
    errorString = `${error.name} [${error.code}]: ${error.message}`;
  } else {
    errorString = ErrorPrototypeToString(error);
  }
  if (trace.length === 0) {
    return errorString;
  }
  return `${errorString}
    at ${ArrayPrototypeJoin(trace, "\n    at ")}`;
};
const maybeOverridePrepareStackTrace = (globalThis2, error, trace) => {
  var _a2;
  if (typeof ((_a2 = globalThis2.Error) === null || _a2 === void 0 ? void 0 : _a2.prepareStackTrace) === "function") {
    return globalThis2.Error.prepareStackTrace(error, trace);
  }
  if (typeof MainContextError.prepareStackTrace === "function") {
    return MainContextError.prepareStackTrace(error, trace);
  }
  return kNoOverride;
};
const aggregateTwoErrors = hideStackFrames$1((innerError, outerError) => {
  if (innerError && outerError && innerError !== outerError) {
    if (ArrayIsArray(outerError.errors)) {
      ArrayPrototypePush(outerError.errors, innerError);
      return outerError;
    }
    const err = new AggregateError(new SafeArrayIterator([outerError, innerError]), outerError.message);
    err.code = outerError.code;
    return err;
  }
  return innerError || outerError;
});
let util;
let assert;
let internalUtil = null;
function lazyInternalUtil() {
  return internalUtil;
}
let internalUtilInspect = null;
function lazyInternalUtilInspect() {
  return internalUtilInspect;
}
let buffer;
function lazyBuffer() {
  return buffer;
}
function isErrorStackTraceLimitWritable() {
  const desc = ObjectGetOwnPropertyDescriptor(Error, "stackTraceLimit");
  if (desc === void 0) {
    return ObjectIsExtensible(Error);
  }
  return ObjectPrototypeHasOwnProperty(desc, "writable") ? desc.writable : desc.set !== void 0;
}
function inspectWithNoCustomRetry(obj, options) {
  const utilInspect = lazyInternalUtilInspect();
  try {
    return utilInspect.inspect(obj, options);
  } catch (_a2) {
    return utilInspect.inspect(obj, Object.assign(Object.assign({}, options), { customInspect: false }));
  }
}
class SystemError extends Error {
  constructor(key, context2) {
    const limit = Error.stackTraceLimit;
    if (isErrorStackTraceLimitWritable())
      Error.stackTraceLimit = 0;
    super();
    if (isErrorStackTraceLimitWritable())
      Error.stackTraceLimit = limit;
    const prefix = getMessage(key, []);
    let message = `${prefix}: ${context2.syscall} returned ${context2.code} (${context2.message})`;
    if (context2.path !== void 0)
      message += ` ${context2.path}`;
    if (context2.dest !== void 0)
      message += ` => ${context2.dest}`;
    captureLargerStackTrace(this);
    this.code = key;
    ObjectDefineProperties(this, {
      [kIsNodeError]: {
        __proto__: null,
        value: true,
        enumerable: false,
        writable: false,
        configurable: true
      },
      name: {
        __proto__: null,
        value: "SystemError",
        enumerable: false,
        writable: true,
        configurable: true
      },
      message: {
        __proto__: null,
        value: message,
        enumerable: false,
        writable: true,
        configurable: true
      },
      info: {
        __proto__: null,
        value: context2,
        enumerable: true,
        configurable: true,
        writable: false
      },
      errno: {
        __proto__: null,
        get() {
          return context2.errno;
        },
        set: (value) => {
          context2.errno = value;
        },
        enumerable: true,
        configurable: true
      },
      syscall: {
        __proto__: null,
        get() {
          return context2.syscall;
        },
        set: (value) => {
          context2.syscall = value;
        },
        enumerable: true,
        configurable: true
      }
    });
    if (context2.path !== void 0) {
      Object.defineProperty(this, "path", {
        __proto__: null,
        get() {
          return context2.path != null ? context2.path.toString() : context2.path;
        },
        set: (value) => {
          context2.path = value ? lazyBuffer().from(value.toString()) : void 0;
        },
        enumerable: true,
        configurable: true
      });
    }
    if (context2.dest !== void 0) {
      Object.defineProperty(this, "dest", {
        __proto__: null,
        get() {
          return context2.dest != null ? context2.dest.toString() : context2.dest;
        },
        set: (value) => {
          context2.dest = value ? lazyBuffer().from(value.toString()) : void 0;
        },
        enumerable: true,
        configurable: true
      });
    }
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
}
function makeSystemErrorWithCode(key) {
  return class NodeError extends SystemError {
    constructor(ctx2) {
      super(key, ctx2);
    }
  };
}
function makeNodeErrorWithCode(Base, key) {
  return function NodeError(...args) {
    const limit = Error.stackTraceLimit;
    if (isErrorStackTraceLimitWritable())
      Error.stackTraceLimit = 0;
    const error = new Base();
    if (isErrorStackTraceLimitWritable())
      Error.stackTraceLimit = limit;
    const message = getMessage(key, args);
    ObjectDefineProperties(error, {
      [kIsNodeError]: {
        __proto__: null,
        value: true,
        enumerable: false,
        writable: false,
        configurable: true
      },
      message: {
        __proto__: null,
        value: message,
        enumerable: false,
        writable: true,
        configurable: true
      },
      toString: {
        __proto__: null,
        value() {
          return `${this.name} [${key}]: ${this.message}`;
        },
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    captureLargerStackTrace(error);
    error.code = key;
    return error;
  };
}
function hideStackFrames$1(fn) {
  const hidden = nodeInternalPrefix + fn.name;
  Object.defineProperty(fn, "name", { __proto__: null, value: hidden });
  return fn;
}
function E(sym, val, def2, ...otherClasses) {
  if (def2 === SystemError) {
    def2 = makeSystemErrorWithCode(sym);
  } else {
    def2 = makeNodeErrorWithCode(def2, sym);
  }
  if (otherClasses.length !== 0) {
    otherClasses.forEach((clazz) => {
      def2[clazz.name] = makeNodeErrorWithCode(clazz, sym);
    });
  }
  codes[sym] = def2;
}
function getMessage(key, args, self2) {
  const msg = "";
  const regex = /%[dfijoOs]/g;
  let expectedLength = 0;
  while (RegExpPrototypeExec(regex, msg) !== null)
    expectedLength++;
  assert(expectedLength === args.length, `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`);
  if (args.length === 0)
    return msg;
  ArrayPrototypeUnshift(args, msg);
  return ReflectApply(lazyInternalUtilInspect().format, null, args);
}
let uvBinding;
function lazyUv() {
  uvBinding !== null && uvBinding !== void 0 ? uvBinding : uvBinding = internalBinding("uv");
  return uvBinding;
}
const uvUnmappedError = ["UNKNOWN", "unknown error"];
function uvErrmapGet(name) {
  var _a2;
  uvBinding = lazyUv();
  (_a2 = uvBinding.errmap) !== null && _a2 !== void 0 ? _a2 : uvBinding.errmap = uvBinding.getErrorMap();
  return MapPrototypeGet(uvBinding.errmap, name);
}
const captureLargerStackTrace = hideStackFrames$1(function captureLargerStackTrace2(err) {
  const stackTraceLimitIsWritable = isErrorStackTraceLimitWritable();
  if (stackTraceLimitIsWritable) {
    userStackTraceLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = Infinity;
  }
  ErrorCaptureStackTrace(err);
  if (stackTraceLimitIsWritable)
    Error.stackTraceLimit = userStackTraceLimit;
  return err;
});
const uvException = hideStackFrames$1(function uvException2(ctx2) {
  const { 0: code, 1: uvmsg } = uvErrmapGet(ctx2.errno) || uvUnmappedError;
  let message = `${code}: ${ctx2.message || uvmsg}, ${ctx2.syscall}`;
  let path;
  let dest;
  if (ctx2.path) {
    path = ctx2.path.toString();
    message += ` '${path}'`;
  }
  if (ctx2.dest) {
    dest = ctx2.dest.toString();
    message += ` -> '${dest}'`;
  }
  const tmpLimit = Error.stackTraceLimit;
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = 0;
  const err = new Error(message);
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = tmpLimit;
  for (const prop of ObjectKeys(ctx2)) {
    if (prop === "message" || prop === "path" || prop === "dest") {
      continue;
    }
    err[prop] = ctx2[prop];
  }
  err.code = code;
  if (path) {
    err.path = path;
  }
  if (dest) {
    err.dest = dest;
  }
  return captureLargerStackTrace(err);
});
const uvExceptionWithHostPort = hideStackFrames$1(function uvExceptionWithHostPort2(err, syscall, address, port2) {
  const { 0: code, 1: uvmsg } = uvErrmapGet(err) || uvUnmappedError;
  const message = `${syscall} ${code}: ${uvmsg}`;
  let details = "";
  if (port2 && port2 > 0) {
    details = ` ${address}:${port2}`;
  } else if (address) {
    details = ` ${address}`;
  }
  const tmpLimit = Error.stackTraceLimit;
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = 0;
  const ex = new Error(`${message}${details}`);
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = tmpLimit;
  ex.code = code;
  ex.errno = err;
  ex.syscall = syscall;
  ex.address = address;
  if (port2) {
    ex.port = port2;
  }
  return captureLargerStackTrace(ex);
});
const errnoException = hideStackFrames$1(function errnoException2(err, syscall, original) {
  const code = util.getSystemErrorName(err);
  const message = original ? `${syscall} ${code} ${original}` : `${syscall} ${code}`;
  const tmpLimit = Error.stackTraceLimit;
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = 0;
  const ex = new Error(message);
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = tmpLimit;
  ex.errno = err;
  ex.code = code;
  ex.syscall = syscall;
  return captureLargerStackTrace(ex);
});
const exceptionWithHostPort = hideStackFrames$1(function exceptionWithHostPort2(err, syscall, address, port2, additional) {
  const code = util.getSystemErrorName(err);
  let details = "";
  if (port2 && port2 > 0) {
    details = ` ${address}:${port2}`;
  } else if (address) {
    details = ` ${address}`;
  }
  if (additional) {
    details += ` - Local (${additional})`;
  }
  const tmpLimit = Error.stackTraceLimit;
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = 0;
  const ex = new Error(`${syscall} ${code}${details}`);
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = tmpLimit;
  ex.errno = err;
  ex.code = code;
  ex.syscall = syscall;
  ex.address = address;
  if (port2) {
    ex.port = port2;
  }
  return captureLargerStackTrace(ex);
});
const dnsException = hideStackFrames$1(function(code, syscall, hostname) {
  let errno;
  if (typeof code === "number") {
    errno = code;
    if (code === lazyUv().UV_EAI_NODATA || code === lazyUv().UV_EAI_NONAME) {
      code = "ENOTFOUND";
    } else {
      code = lazyInternalUtil().getSystemErrorName(code);
    }
  }
  const message = `${syscall} ${code}${hostname ? ` ${hostname}` : ""}`;
  const tmpLimit = Error.stackTraceLimit;
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = 0;
  const ex = new Error(message);
  if (isErrorStackTraceLimitWritable())
    Error.stackTraceLimit = tmpLimit;
  ex.errno = errno;
  ex.code = code;
  ex.syscall = syscall;
  if (hostname) {
    ex.hostname = hostname;
  }
  return captureLargerStackTrace(ex);
});
function connResetException(msg) {
  const ex = new Error(msg);
  ex.code = "ECONNRESET";
  return ex;
}
let maxStack_ErrorName;
let maxStack_ErrorMessage;
function isStackOverflowError(err) {
  if (maxStack_ErrorMessage === void 0) {
    try {
      let overflowStack = function() {
        overflowStack();
      };
      overflowStack();
    } catch (err2) {
      maxStack_ErrorMessage = err2.message;
      maxStack_ErrorName = err2.name;
    }
  }
  return err && err.name === maxStack_ErrorName && err.message === maxStack_ErrorMessage;
}
const kEnhanceStackBeforeInspector = Symbol("kEnhanceStackBeforeInspector");
const fatalExceptionStackEnhancers = {
  beforeInspector(error) {
    if (typeof error[kEnhanceStackBeforeInspector] !== "function") {
      return error.stack;
    }
    try {
      error.stack = error[kEnhanceStackBeforeInspector]();
    } catch (_a2) {
    }
    return error.stack;
  },
  afterInspector(error) {
    const originalStack = error.stack;
    let useColors = true;
    if (process.platform === "win32") {
      const info = internalBinding("os").getOSInformation();
      const ver = ArrayPrototypeMap(StringPrototypeSplit(info[2], "."), Number);
      if (ver[0] !== 10 || ver[2] < 14393) {
        useColors = false;
      }
    }
    const { inspect: inspect2, inspectDefaultOptions: { colors: defaultColors } } = lazyInternalUtilInspect();
    const colors = useColors && (internalBinding("util").guessHandleType(2) === "TTY" || defaultColors);
    try {
      return inspect2(error, {
        colors,
        customInspect: false,
        depth: MathMax(inspect2.defaultOptions.depth, 5)
      });
    } catch (_a2) {
      return originalStack;
    }
  }
};
let _kArrowMessagePrivateSymbol, _setHiddenValue;
function setArrowMessage(err, arrowMessage) {
  if (!_kArrowMessagePrivateSymbol) {
    ({
      arrow_message_private_symbol: _kArrowMessagePrivateSymbol,
      setHiddenValue: _setHiddenValue
    } = internalBinding("util"));
  }
  _setHiddenValue(err, _kArrowMessagePrivateSymbol, arrowMessage);
}
function hideInternalStackFrames(error) {
}
class AbortError extends Error {
  constructor(message = "The operation was aborted", options = void 0) {
    if (options !== void 0 && typeof options !== "object") {
      throw new codes.ERR_INVALID_ARG_TYPE("options", "Object", options);
    }
    super(message, options);
    this.code = "ABORT_ERR";
    this.name = "AbortError";
  }
}
const genericNodeError = hideStackFrames$1(function genericNodeError2(message, errorProperties) {
  const err = new Error(message);
  ObjectAssign(err, errorProperties);
  return err;
});
function determineSpecificType(value) {
  var _a2;
  if (value == null) {
    return "" + value;
  }
  if (typeof value === "function" && value.name) {
    return `function ${value.name}`;
  }
  if (typeof value === "object") {
    if ((_a2 = value.constructor) === null || _a2 === void 0 ? void 0 : _a2.name) {
      return `an instance of ${value.constructor.name}`;
    }
    return `${lazyInternalUtilInspect().inspect(value, { depth: -1 })}`;
  }
  let inspected = lazyInternalUtilInspect().inspect(value, { colors: false });
  if (inspected.length > 28) {
    inspected = `${StringPrototypeSlice(inspected, 0, 25)}...`;
  }
  return `type ${typeof value} (${inspected})`;
}
var errors$2 = {
  AbortError,
  aggregateTwoErrors,
  captureLargerStackTrace,
  codes,
  connResetException,
  dnsException,
  // This is exported only to facilitate testing.
  determineSpecificType,
  E,
  errnoException,
  exceptionWithHostPort,
  fatalExceptionStackEnhancers,
  genericNodeError,
  getMessage,
  hideInternalStackFrames,
  hideStackFrames: hideStackFrames$1,
  inspectWithNoCustomRetry,
  isErrorStackTraceLimitWritable,
  isStackOverflowError,
  kEnhanceStackBeforeInspector,
  kIsNodeError,
  kNoOverride,
  maybeOverridePrepareStackTrace,
  // overrideStackTrace,
  prepareStackTrace,
  setArrowMessage,
  SystemError,
  uvErrmapGet,
  uvException,
  uvExceptionWithHostPort
};
E("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError);
E("ERR_ARG_NOT_ITERABLE", "%s must be iterable", TypeError);
E("ERR_ASSERTION", "%s", Error);
E("ERR_ASSERT_SNAPSHOT_NOT_SUPPORTED", "Snapshot is not supported in this context ", TypeError);
E("ERR_ASYNC_CALLBACK", "%s must be a function", TypeError);
E("ERR_ASYNC_TYPE", 'Invalid name for async "type": %s', TypeError);
E("ERR_BROTLI_INVALID_PARAM", "%s is not a valid Brotli parameter", RangeError);
E(
  "ERR_BUFFER_OUT_OF_BOUNDS",
  // Using a default argument here is important so the argument is not counted
  // towards `Function#length`.
  (name = void 0) => {
    if (name) {
      return `"${name}" is outside of buffer bounds`;
    }
    return "Attempt to access memory outside buffer bounds";
  },
  RangeError
);
E("ERR_BUFFER_TOO_LARGE", "Cannot create a Buffer larger than %s bytes", RangeError);
E("ERR_CANNOT_WATCH_SIGINT", "Cannot watch for SIGINT signals", Error);
E("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received", Error);
E("ERR_CHILD_PROCESS_IPC_REQUIRED", "Forked processes must have an IPC channel, missing value 'ipc' in %s", Error);
E("ERR_CHILD_PROCESS_STDIO_MAXBUFFER", "%s maxBuffer length exceeded", RangeError);
E("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s", TypeError);
E("ERR_CONTEXT_NOT_INITIALIZED", "context used is not initialized", Error);
E("ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED", "Custom engines not supported by this OpenSSL", Error);
E("ERR_CRYPTO_ECDH_INVALID_FORMAT", "Invalid ECDH format: %s", TypeError);
E("ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY", "Public key is not valid for specified curve", Error);
E("ERR_CRYPTO_ENGINE_UNKNOWN", 'Engine "%s" was not found', Error);
E("ERR_CRYPTO_FIPS_FORCED", "Cannot set FIPS mode, it was forced with --force-fips at startup.", Error);
E("ERR_CRYPTO_FIPS_UNAVAILABLE", "Cannot set FIPS mode in a non-FIPS build.", Error);
E("ERR_CRYPTO_HASH_FINALIZED", "Digest already called", Error);
E("ERR_CRYPTO_HASH_UPDATE_FAILED", "Hash update failed", Error);
E("ERR_CRYPTO_INCOMPATIBLE_KEY", "Incompatible %s: %s", Error);
E("ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS", "The selected key encoding %s %s.", Error);
E("ERR_CRYPTO_INVALID_DIGEST", "Invalid digest: %s", TypeError);
E("ERR_CRYPTO_INVALID_JWK", "Invalid JWK data", TypeError);
E("ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE", "Invalid key object type %s, expected %s.", TypeError);
E("ERR_CRYPTO_INVALID_STATE", "Invalid state for operation %s", Error);
E("ERR_CRYPTO_PBKDF2_ERROR", "PBKDF2 error", Error);
E("ERR_CRYPTO_SCRYPT_INVALID_PARAMETER", "Invalid scrypt parameter", Error);
E("ERR_CRYPTO_SCRYPT_NOT_SUPPORTED", "Scrypt algorithm not supported", Error);
E("ERR_CRYPTO_SIGN_KEY_REQUIRED", "No key provided to sign", Error);
E("ERR_DEBUGGER_ERROR", "%s", Error);
E("ERR_DEBUGGER_STARTUP_ERROR", "%s", Error);
E("ERR_DIR_CLOSED", "Directory handle was closed", Error);
E("ERR_DIR_CONCURRENT_OPERATION", "Cannot do synchronous work on directory handle with concurrent asynchronous operations", Error);
E("ERR_DNS_SET_SERVERS_FAILED", 'c-ares failed to set servers: "%s" [%s]', Error);
E("ERR_DOMAIN_CALLBACK_NOT_AVAILABLE", "A callback was registered through process.setUncaughtExceptionCaptureCallback(), which is mutually exclusive with using the `domain` module", Error);
E("ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE", "The `domain` module is in use, which is mutually exclusive with calling process.setUncaughtExceptionCaptureCallback()", Error);
E("ERR_DUPLICATE_STARTUP_SNAPSHOT_MAIN_FUNCTION", "Deserialize main function is already configured.", Error);
E("ERR_ENCODING_INVALID_ENCODED_DATA", function(encoding, ret) {
  this.errno = ret;
  return `The encoded data was not valid for encoding ${encoding}`;
}, TypeError);
E("ERR_ENCODING_NOT_SUPPORTED", 'The "%s" encoding is not supported', RangeError);
E("ERR_EVAL_ESM_CANNOT_PRINT", "--print cannot be used with ESM input", Error);
E("ERR_EVENT_RECURSION", 'The event "%s" is already being dispatched', Error);
E("ERR_FALSY_VALUE_REJECTION", function(reason) {
  this.reason = reason;
  return "Promise was rejected with falsy value";
}, Error);
E("ERR_FEATURE_UNAVAILABLE_ON_PLATFORM", "The feature %s is unavailable on the current platform, which is being used to run Node.js", TypeError);
E("ERR_FS_CP_DIR_TO_NON_DIR", "Cannot overwrite directory with non-directory", SystemError);
E("ERR_FS_CP_EEXIST", "Target already exists", SystemError);
E("ERR_FS_CP_EINVAL", "Invalid src or dest", SystemError);
E("ERR_FS_CP_FIFO_PIPE", "Cannot copy a FIFO pipe", SystemError);
E("ERR_FS_CP_NON_DIR_TO_DIR", "Cannot overwrite non-directory with directory", SystemError);
E("ERR_FS_CP_SOCKET", "Cannot copy a socket file", SystemError);
E("ERR_FS_CP_SYMLINK_TO_SUBDIRECTORY", "Cannot overwrite symlink in subdirectory of self", SystemError);
E("ERR_FS_CP_UNKNOWN", "Cannot copy an unknown file type", SystemError);
E("ERR_FS_EISDIR", "Path is a directory", SystemError);
E("ERR_FS_FILE_TOO_LARGE", "File size (%s) is greater than 2 GiB", RangeError);
E("ERR_FS_INVALID_SYMLINK_TYPE", 'Symlink type must be one of "dir", "file", or "junction". Received "%s"', Error);
E("ERR_HTTP2_ALTSVC_INVALID_ORIGIN", "HTTP/2 ALTSVC frames require a valid origin", TypeError);
E("ERR_HTTP2_ALTSVC_LENGTH", "HTTP/2 ALTSVC frames are limited to 16382 bytes", TypeError);
E("ERR_HTTP2_CONNECT_AUTHORITY", ":authority header is required for CONNECT requests", Error);
E("ERR_HTTP2_CONNECT_PATH", "The :path header is forbidden for CONNECT requests", Error);
E("ERR_HTTP2_CONNECT_SCHEME", "The :scheme header is forbidden for CONNECT requests", Error);
E("ERR_HTTP2_GOAWAY_SESSION", "New streams cannot be created after receiving a GOAWAY", Error);
E("ERR_HTTP2_HEADERS_AFTER_RESPOND", "Cannot specify additional headers after response initiated", Error);
E("ERR_HTTP2_HEADERS_SENT", "Response has already been initiated.", Error);
E("ERR_HTTP2_HEADER_SINGLE_VALUE", 'Header field "%s" must only have a single value', TypeError);
E("ERR_HTTP2_INFO_STATUS_NOT_ALLOWED", "Informational status codes cannot be used", RangeError);
E("ERR_HTTP2_INVALID_CONNECTION_HEADERS", 'HTTP/1 Connection specific headers are forbidden: "%s"', TypeError);
E("ERR_HTTP2_INVALID_HEADER_VALUE", 'Invalid value "%s" for header "%s"', TypeError);
E("ERR_HTTP2_INVALID_INFO_STATUS", "Invalid informational status code: %s", RangeError);
E("ERR_HTTP2_INVALID_ORIGIN", "HTTP/2 ORIGIN frames require a valid origin", TypeError);
E("ERR_HTTP2_INVALID_PACKED_SETTINGS_LENGTH", "Packed settings length must be a multiple of six", RangeError);
E("ERR_HTTP2_INVALID_PSEUDOHEADER", '"%s" is an invalid pseudoheader or is used incorrectly', TypeError);
E("ERR_HTTP2_INVALID_SESSION", "The session has been destroyed", Error);
E(
  "ERR_HTTP2_INVALID_SETTING_VALUE",
  // Using default arguments here is important so the arguments are not counted
  // towards `Function#length`.
  function(name, actual, min = void 0, max = void 0) {
    this.actual = actual;
    if (min !== void 0) {
      this.min = min;
      this.max = max;
    }
    return `Invalid value for setting "${name}": ${actual}`;
  },
  TypeError,
  RangeError
);
E("ERR_HTTP2_INVALID_STREAM", "The stream has been destroyed", Error);
E("ERR_HTTP2_MAX_PENDING_SETTINGS_ACK", "Maximum number of pending settings acknowledgements", Error);
E("ERR_HTTP2_NESTED_PUSH", "A push stream cannot initiate another push stream.", Error);
E("ERR_HTTP2_NO_MEM", "Out of memory", Error);
E("ERR_HTTP2_NO_SOCKET_MANIPULATION", "HTTP/2 sockets should not be directly manipulated (e.g. read and written)", Error);
E("ERR_HTTP2_ORIGIN_LENGTH", "HTTP/2 ORIGIN frames are limited to 16382 bytes", TypeError);
E("ERR_HTTP2_OUT_OF_STREAMS", "No stream ID is available because maximum stream ID has been reached", Error);
E("ERR_HTTP2_PAYLOAD_FORBIDDEN", "Responses with %s status must not have a payload", Error);
E("ERR_HTTP2_PING_CANCEL", "HTTP2 ping cancelled", Error);
E("ERR_HTTP2_PING_LENGTH", "HTTP2 ping payload must be 8 bytes", RangeError);
E("ERR_HTTP2_PSEUDOHEADER_NOT_ALLOWED", "Cannot set HTTP/2 pseudo-headers", TypeError);
E("ERR_HTTP2_PUSH_DISABLED", "HTTP/2 client has disabled push streams", Error);
E("ERR_HTTP2_SEND_FILE", "Directories cannot be sent", Error);
E("ERR_HTTP2_SEND_FILE_NOSEEK", "Offset or length can only be specified for regular files", Error);
E("ERR_HTTP2_SESSION_ERROR", "Session closed with error code %s", Error);
E("ERR_HTTP2_SETTINGS_CANCEL", "HTTP2 session settings canceled", Error);
E("ERR_HTTP2_SOCKET_BOUND", "The socket is already bound to an Http2Session", Error);
E("ERR_HTTP2_SOCKET_UNBOUND", "The socket has been disconnected from the Http2Session", Error);
E("ERR_HTTP2_STATUS_101", "HTTP status code 101 (Switching Protocols) is forbidden in HTTP/2", Error);
E("ERR_HTTP2_STATUS_INVALID", "Invalid status code: %s", RangeError);
E("ERR_HTTP2_STREAM_CANCEL", function(error) {
  let msg = "The pending stream has been canceled";
  if (error) {
    this.cause = error;
    if (typeof error.message === "string")
      msg += ` (caused by: ${error.message})`;
  }
  return msg;
}, Error);
E("ERR_HTTP2_STREAM_ERROR", "Stream closed with error code %s", Error);
E("ERR_HTTP2_STREAM_SELF_DEPENDENCY", "A stream cannot depend on itself", Error);
E("ERR_HTTP2_TOO_MANY_INVALID_FRAMES", "Too many invalid HTTP/2 frames", Error);
E("ERR_HTTP2_TRAILERS_ALREADY_SENT", "Trailing headers have already been sent", Error);
E("ERR_HTTP2_TRAILERS_NOT_READY", "Trailing headers cannot be sent until after the wantTrailers event is emitted", Error);
E("ERR_HTTP2_UNSUPPORTED_PROTOCOL", 'protocol "%s" is unsupported.', Error);
E("ERR_HTTP_HEADERS_SENT", "Cannot %s headers after they are sent to the client", Error);
E("ERR_HTTP_INVALID_HEADER_VALUE", 'Invalid value "%s" for header "%s"', TypeError);
E("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s", RangeError);
E("ERR_HTTP_REQUEST_TIMEOUT", "Request timeout", Error);
E("ERR_HTTP_SOCKET_ENCODING", "Changing the socket encoding is not allowed per RFC7230 Section 3.", Error);
E("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding", Error);
E("ERR_ILLEGAL_CONSTRUCTOR", "Illegal constructor", TypeError);
E("ERR_IMPORT_ASSERTION_TYPE_FAILED", 'Module "%s" is not of type "%s"', TypeError);
E("ERR_IMPORT_ASSERTION_TYPE_MISSING", 'Module "%s" needs an import assertion of type "%s"', TypeError);
E("ERR_IMPORT_ASSERTION_TYPE_UNSUPPORTED", 'Import assertion type "%s" is unsupported', TypeError);
E("ERR_INCOMPATIBLE_OPTION_PAIR", 'Option "%s" cannot be used in combination with option "%s"', TypeError);
E("ERR_INPUT_TYPE_NOT_ALLOWED", "--input-type can only be used with string input via --eval, --print, or STDIN", Error);
E("ERR_INSPECTOR_ALREADY_ACTIVATED", "Inspector is already activated. Close it with inspector.close() before activating it again.", Error);
E("ERR_INSPECTOR_ALREADY_CONNECTED", "%s is already connected", Error);
E("ERR_INSPECTOR_CLOSED", "Session was closed", Error);
E("ERR_INSPECTOR_COMMAND", "Inspector error %d: %s", Error);
E("ERR_INSPECTOR_NOT_ACTIVE", "Inspector is not active", Error);
E("ERR_INSPECTOR_NOT_AVAILABLE", "Inspector is not available", Error);
E("ERR_INSPECTOR_NOT_CONNECTED", "Session is not connected", Error);
E("ERR_INSPECTOR_NOT_WORKER", "Current thread is not a worker", Error);
E("ERR_INTERNAL_ASSERTION", (message) => {
  const suffix = "This is caused by either a bug in Node.js or incorrect usage of Node.js internals.\nPlease open an issue with this stack trace at https://github.com/nodejs/node/issues\n";
  return message === void 0 ? suffix : `${message}
${suffix}`;
}, Error);
E("ERR_INVALID_ADDRESS_FAMILY", function(addressType, host2, port2) {
  this.host = host2;
  this.port = port2;
  return `Invalid address family: ${addressType} ${host2}:${port2}`;
}, RangeError);
E("ERR_INVALID_ARG_TYPE", (name, expected, actual) => {
  assert(typeof name === "string", "'name' must be a string");
  if (!ArrayIsArray(expected)) {
    expected = [expected];
  }
  let msg = "The ";
  if (StringPrototypeEndsWith(name, " argument")) {
    msg += `${name} `;
  } else {
    const type = StringPrototypeIncludes(name, ".") ? "property" : "argument";
    msg += `"${name}" ${type} `;
  }
  msg += "must be ";
  const types2 = [];
  const instances = [];
  const other = [];
  for (const value of expected) {
    assert(typeof value === "string", "All expected entries have to be of type string");
    if (ArrayPrototypeIncludes(kTypes, value)) {
      ArrayPrototypePush(types2, StringPrototypeToLowerCase(value));
    } else if (RegExpPrototypeExec(classRegExp, value) !== null) {
      ArrayPrototypePush(instances, value);
    } else {
      assert(value !== "object", 'The value "object" should be written as "Object"');
      ArrayPrototypePush(other, value);
    }
  }
  if (instances.length > 0) {
    const pos = ArrayPrototypeIndexOf(types2, "object");
    if (pos !== -1) {
      ArrayPrototypeSplice(types2, pos, 1);
      ArrayPrototypePush(instances, "Object");
    }
  }
  if (types2.length > 0) {
    if (types2.length > 2) {
      const last = ArrayPrototypePop(types2);
      msg += `one of type ${ArrayPrototypeJoin(types2, ", ")}, or ${last}`;
    } else if (types2.length === 2) {
      msg += `one of type ${types2[0]} or ${types2[1]}`;
    } else {
      msg += `of type ${types2[0]}`;
    }
    if (instances.length > 0 || other.length > 0)
      msg += " or ";
  }
  if (instances.length > 0) {
    if (instances.length > 2) {
      const last = ArrayPrototypePop(instances);
      msg += `an instance of ${ArrayPrototypeJoin(instances, ", ")}, or ${last}`;
    } else {
      msg += `an instance of ${instances[0]}`;
      if (instances.length === 2) {
        msg += ` or ${instances[1]}`;
      }
    }
    if (other.length > 0)
      msg += " or ";
  }
  if (other.length > 0) {
    if (other.length > 2) {
      const last = ArrayPrototypePop(other);
      msg += `one of ${ArrayPrototypeJoin(other, ", ")}, or ${last}`;
    } else if (other.length === 2) {
      msg += `one of ${other[0]} or ${other[1]}`;
    } else {
      if (StringPrototypeToLowerCase(other[0]) !== other[0])
        msg += "an ";
      msg += `${other[0]}`;
    }
  }
  msg += `. Received ${determineSpecificType(actual)}`;
  return msg;
}, TypeError);
E("ERR_INVALID_ARG_VALUE", (name, value, reason = "is invalid") => {
  let inspected = lazyInternalUtilInspect().inspect(value);
  if (inspected.length > 128) {
    inspected = `${StringPrototypeSlice(inspected, 0, 128)}...`;
  }
  const type = StringPrototypeIncludes(name, ".") ? "property" : "argument";
  return `The ${type} '${name}' ${reason}. Received ${inspected}`;
}, TypeError, RangeError);
E("ERR_INVALID_ASYNC_ID", "Invalid %s value: %s", RangeError);
E("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s", RangeError);
E(
  "ERR_INVALID_CHAR",
  // Using a default argument here is important so the argument is not counted
  // towards `Function#length`.
  (name, field = void 0) => {
    let msg = `Invalid character in ${name}`;
    if (field !== void 0) {
      msg += ` ["${field}"]`;
    }
    return msg;
  },
  TypeError
);
E("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column", TypeError);
E("ERR_INVALID_FD", '"fd" must be a positive integer: %s', RangeError);
E("ERR_INVALID_FD_TYPE", "Unsupported fd type: %s", TypeError);
E("ERR_INVALID_FILE_URL_HOST", 'File URL host must be "localhost" or empty on %s', TypeError);
E("ERR_INVALID_FILE_URL_PATH", "File URL path %s", TypeError);
E("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent", TypeError);
E("ERR_INVALID_HTTP_TOKEN", '%s must be a valid HTTP token ["%s"]', TypeError);
E("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s", TypeError);
E("ERR_INVALID_MODULE_SPECIFIER", (request, reason, base = void 0) => {
  return `Invalid module "${request}" ${reason}${base ? ` imported from ${base}` : ""}`;
}, TypeError);
E("ERR_INVALID_PACKAGE_CONFIG", (path, base, message) => {
  return `Invalid package config ${path}${base ? ` while importing ${base}` : ""}${message ? `. ${message}` : ""}`;
}, Error);
E("ERR_INVALID_PACKAGE_TARGET", (pkgPath, key, target, isImport = false, base = void 0) => {
  const relError = typeof target === "string" && !isImport && target.length && !StringPrototypeStartsWith(target, "./");
  if (key === ".") {
    assert(isImport === false);
    return `Invalid "exports" main target ${JSONStringify(target)} defined in the package config ${pkgPath}package.json${base ? ` imported from ${base}` : ""}${relError ? '; targets must start with "./"' : ""}`;
  }
  return `Invalid "${isImport ? "imports" : "exports"}" target ${JSONStringify(target)} defined for '${key}' in the package config ${pkgPath}package.json${base ? ` imported from ${base}` : ""}${relError ? '; targets must start with "./"' : ""}`;
}, Error);
E("ERR_INVALID_PROTOCOL", 'Protocol "%s" not supported. Expected "%s"', TypeError);
E("ERR_INVALID_REPL_EVAL_CONFIG", 'Cannot specify both "breakEvalOnSigint" and "eval" for REPL', TypeError);
E("ERR_INVALID_REPL_INPUT", "%s", TypeError);
E("ERR_INVALID_RETURN_PROPERTY", (input, name, prop, value) => {
  return `Expected a valid ${input} to be returned for the "${prop}" from the "${name}" function but got ${value}.`;
}, TypeError);
E("ERR_INVALID_RETURN_PROPERTY_VALUE", (input, name, prop, value) => {
  var _a2;
  let type;
  if ((_a2 = value === null || value === void 0 ? void 0 : value.constructor) === null || _a2 === void 0 ? void 0 : _a2.name) {
    type = `instance of ${value.constructor.name}`;
  } else {
    type = `type ${typeof value}`;
  }
  return `Expected ${input} to be returned for the "${prop}" from the "${name}" function but got ${type}.`;
}, TypeError);
E("ERR_INVALID_RETURN_VALUE", (input, name, value) => {
  const type = determineSpecificType(value);
  return `Expected ${input} to be returned from the "${name}" function but got ${type}.`;
}, TypeError, RangeError);
E("ERR_INVALID_STATE", "Invalid state: %s", Error, TypeError, RangeError);
E("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, TypedArray, DataView or string input: %s", TypeError);
E("ERR_INVALID_THIS", 'Value of "this" must be of type %s', TypeError);
E("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple", TypeError);
E("ERR_INVALID_URI", "URI malformed", URIError);
E("ERR_INVALID_URL", function(input) {
  this.input = input;
  return "Invalid URL";
}, TypeError);
E("ERR_INVALID_URL_SCHEME", (expected) => {
  if (typeof expected === "string")
    expected = [expected];
  assert(expected.length <= 2);
  const res = expected.length === 2 ? `one of scheme ${expected[0]} or ${expected[1]}` : `of scheme ${expected[0]}`;
  return `The URL must be ${res}`;
}, TypeError);
E("ERR_IPC_CHANNEL_CLOSED", "Channel closed", Error);
E("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected", Error);
E("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe", Error);
E("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks", Error);
E("ERR_LOADER_CHAIN_INCOMPLETE", '"%s" did not call the next hook in its chain and did not explicitly signal a short circuit. If this is intentional, include `shortCircuit: true` in the hook\'s return.', Error);
E("ERR_MANIFEST_ASSERT_INTEGRITY", (moduleURL, realIntegrities) => {
  let msg = `The content of "${moduleURL}" does not match the expected integrity.`;
  if (realIntegrities.size) {
    const sri = ArrayPrototypeJoin(ArrayFrom(realIntegrities.entries(), ({ 0: alg, 1: dgs }) => `${alg}-${dgs}`), " ");
    msg += ` Integrities found are: ${sri}`;
  } else {
    msg += " The resource was not found in the policy.";
  }
  return msg;
}, Error);
E("ERR_MANIFEST_DEPENDENCY_MISSING", "Manifest resource %s does not list %s as a dependency specifier for conditions: %s", Error);
E("ERR_MANIFEST_INTEGRITY_MISMATCH", "Manifest resource %s has multiple entries but integrity lists do not match", SyntaxError);
E("ERR_MANIFEST_INVALID_RESOURCE_FIELD", "Manifest resource %s has invalid property value for %s", TypeError);
E("ERR_MANIFEST_INVALID_SPECIFIER", "Manifest resource %s has invalid dependency mapping %s", TypeError);
E("ERR_MANIFEST_TDZ", "Manifest initialization has not yet run", Error);
E("ERR_MANIFEST_UNKNOWN_ONERROR", 'Manifest specified unknown error behavior "%s".', SyntaxError);
E("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
E("ERR_MISSING_ARGS", (...args) => {
  assert(args.length > 0, "At least one arg needs to be specified");
  let msg = "The ";
  const len = args.length;
  const wrap = (a) => `"${a}"`;
  args = ArrayPrototypeMap(args, (a) => ArrayIsArray(a) ? ArrayPrototypeJoin(ArrayPrototypeMap(a, wrap), " or ") : wrap(a));
  switch (len) {
    case 1:
      msg += `${args[0]} argument`;
      break;
    case 2:
      msg += `${args[0]} and ${args[1]} arguments`;
      break;
    default:
      msg += ArrayPrototypeJoin(ArrayPrototypeSlice(args, 0, len - 1), ", ");
      msg += `, and ${args[len - 1]} arguments`;
      break;
  }
  return `${msg} must be specified`;
}, TypeError);
E("ERR_PACKAGE_IMPORT_NOT_DEFINED", (specifier, packagePath, base) => {
  return `Package import specifier "${specifier}" is not defined${packagePath ? ` in package ${packagePath}package.json` : ""} imported from ${base}`;
}, TypeError);
E("ERR_PACKAGE_PATH_NOT_EXPORTED", (pkgPath, subpath, base = void 0) => {
  if (subpath === ".")
    return `No "exports" main defined in ${pkgPath}package.json${base ? ` imported from ${base}` : ""}`;
  return `Package subpath '${subpath}' is not defined by "exports" in ${pkgPath}package.json${base ? ` imported from ${base}` : ""}`;
}, Error);
E("ERR_PARSE_ARGS_INVALID_OPTION_VALUE", "%s", TypeError);
E("ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL", "Unexpected argument '%s'. This command does not take positional arguments", TypeError);
E("ERR_PARSE_ARGS_UNKNOWN_OPTION", (option, allowPositionals) => {
  const suggestDashDash = allowPositionals ? `. To specify a positional argument starting with a '-', place it at the end of the command after '--', as in '-- ${JSONStringify(option)}` : "";
  return `Unknown option '${option}'${suggestDashDash}`;
}, TypeError);
E("ERR_PERFORMANCE_INVALID_TIMESTAMP", "%d is not a valid timestamp", TypeError);
E("ERR_PERFORMANCE_MEASURE_INVALID_OPTIONS", "%s", TypeError);
E("ERR_SCRIPT_EXECUTION_INTERRUPTED", "Script execution was interrupted by `SIGINT`", Error);
E("ERR_SERVER_ALREADY_LISTEN", "Listen method has been called more than once without closing.", Error);
E("ERR_SERVER_NOT_RUNNING", "Server is not running.", Error);
E("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound", Error);
E("ERR_SOCKET_BAD_BUFFER_SIZE", "Buffer size must be a positive integer", TypeError);
E("ERR_SOCKET_BAD_PORT", (name, port2, allowZero = true) => {
  assert(typeof allowZero === "boolean", "The 'allowZero' argument must be of type boolean.");
  const operator = allowZero ? ">=" : ">";
  return `${name} should be ${operator} 0 and < 65536. Received ${port2}.`;
}, RangeError);
E("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6", TypeError);
E("ERR_SOCKET_BUFFER_SIZE", "Could not get or set buffer size", SystemError);
E("ERR_SOCKET_CLOSED", "Socket is closed", Error);
E("ERR_SOCKET_DGRAM_IS_CONNECTED", "Already connected", Error);
E("ERR_SOCKET_DGRAM_NOT_CONNECTED", "Not connected", Error);
E("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running", Error);
E("ERR_SRI_PARSE", "Subresource Integrity string %j had an unexpected %j at position %d", SyntaxError);
E("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
E("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
E("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
E("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
E("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
E("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
E("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
E("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode", Error);
E("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
E("ERR_SYNTHETIC", "JavaScript Callstack", Error);
E("ERR_SYSTEM_ERROR", "A system error occurred", SystemError);
E("ERR_TEST_FAILURE", function(error, failureType) {
  var _a2;
  assert(typeof failureType === "string", "The 'failureType' argument must be of type string.");
  let msg = (_a2 = error === null || error === void 0 ? void 0 : error.message) !== null && _a2 !== void 0 ? _a2 : error;
  if (typeof msg !== "string") {
    msg = inspectWithNoCustomRetry(msg);
  }
  this.failureType = failureType;
  this.cause = error;
  return msg;
}, Error);
E("ERR_TLS_CERT_ALTNAME_FORMAT", "Invalid subject alternative name string", SyntaxError);
E("ERR_TLS_CERT_ALTNAME_INVALID", function(reason, host2, cert) {
  this.reason = reason;
  this.host = host2;
  this.cert = cert;
  return `Hostname/IP does not match certificate's altnames: ${reason}`;
}, Error);
E("ERR_TLS_DH_PARAM_SIZE", "DH parameter size %s is less than 2048", Error);
E("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout", Error);
E("ERR_TLS_INVALID_CONTEXT", "%s must be a SecureContext", TypeError);
E("ERR_TLS_INVALID_PROTOCOL_VERSION", "%j is not a valid %s TLS protocol version", TypeError);
E("ERR_TLS_INVALID_STATE", "TLS socket connection must be securely established", Error);
E("ERR_TLS_PROTOCOL_VERSION_CONFLICT", "TLS protocol version %j conflicts with secureProtocol %j", TypeError);
E("ERR_TLS_RENEGOTIATION_DISABLED", "TLS session renegotiation disabled for this socket", Error);
E("ERR_TLS_REQUIRED_SERVER_NAME", '"servername" is required parameter for Server.addContext', Error);
E("ERR_TLS_SESSION_ATTACK", "TLS session renegotiation attack detected", Error);
E("ERR_TLS_SNI_FROM_SERVER", "Cannot issue SNI from a TLS server-side socket", Error);
E("ERR_TRACE_EVENTS_CATEGORY_REQUIRED", "At least one category is required", TypeError);
E("ERR_TRACE_EVENTS_UNAVAILABLE", "Trace events are unavailable", Error);
E("ERR_TTY_INIT_FAILED", "TTY initialization failed", SystemError);
E("ERR_UNAVAILABLE_DURING_EXIT", "Cannot call function in process exit handler", Error);
E("ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET", "`process.setupUncaughtExceptionCapture()` was called while a capture callback was already active", Error);
E("ERR_UNESCAPED_CHARACTERS", "%s contains unescaped characters", TypeError);
E(
  "ERR_UNHANDLED_ERROR",
  // Using a default argument here is important so the argument is not counted
  // towards `Function#length`.
  (err = void 0) => {
    const msg = "Unhandled error.";
    if (err === void 0)
      return msg;
    return `${msg} (${err})`;
  },
  Error
);
E("ERR_UNKNOWN_BUILTIN_MODULE", "No such built-in module: %s", Error);
E("ERR_UNKNOWN_CREDENTIAL", "%s identifier does not exist: %s", Error);
E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
E("ERR_UNKNOWN_MODULE_FORMAT", "Unknown module format: %s for URL %s", RangeError);
E("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s", TypeError);
E("ERR_UNSUPPORTED_DIR_IMPORT", "Directory import '%s' is not supported resolving ES modules imported from %s", Error);
E("ERR_UNSUPPORTED_ESM_URL_SCHEME", (url, supported2) => {
  let msg = `Only URLs with a scheme in: ${ArrayPrototypeJoin(supported2, ", ")} are supported by the default ESM loader`;
  if (url.protocol.length === 2) {
    msg += ". On Windows, absolute paths must be valid file:// URLs";
  }
  msg += `. Received protocol '${url.protocol}'`;
  return msg;
}, Error);
E("ERR_USE_AFTER_CLOSE", "%s was closed", Error);
E("ERR_VALID_PERFORMANCE_ENTRY_TYPE", "At least one valid performance entry type is required", Error);
E("ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING", "A dynamic import callback was not specified.", TypeError);
E("ERR_VM_MODULE_ALREADY_LINKED", "Module has already been linked", Error);
E("ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA", "Cached data cannot be created for a module which has been evaluated", Error);
E("ERR_VM_MODULE_DIFFERENT_CONTEXT", "Linked modules must use the same context", Error);
E("ERR_VM_MODULE_LINK_FAILURE", function(message, cause) {
  this.cause = cause;
  return message;
}, Error);
E("ERR_VM_MODULE_NOT_MODULE", "Provided module is not an instance of Module", Error);
E("ERR_VM_MODULE_STATUS", "Module status %s", Error);
E("ERR_WASI_ALREADY_STARTED", "WASI instance has already started", Error);
E("ERR_WEBASSEMBLY_RESPONSE", "WebAssembly response %s", TypeError);
E("ERR_WORKER_INIT_FAILED", "Worker initialization failure: %s", Error);
E("ERR_WORKER_INVALID_EXEC_ARGV", (errors2, msg = "invalid execArgv flags") => `Initiated Worker with ${msg}: ${ArrayPrototypeJoin(errors2, ", ")}`, Error);
E("ERR_WORKER_NOT_RUNNING", "Worker instance not running", Error);
E("ERR_WORKER_OUT_OF_MEMORY", "Worker terminated due to reaching memory limit: %s", Error);
E("ERR_WORKER_PATH", (filename) => "The worker script or module filename must be an absolute path or a relative path starting with './' or '../'." + (StringPrototypeStartsWith(filename, "file://") ? " Wrap file:// URLs with `new URL`." : "") + (StringPrototypeStartsWith(filename, "data:text/javascript") ? " Wrap data: URLs with `new URL`." : "") + ` Received "${filename}"`, TypeError);
E("ERR_WORKER_UNSERIALIZABLE_ERROR", "Serializing an uncaught exception failed", Error);
E("ERR_WORKER_UNSUPPORTED_OPERATION", "%s is not supported in workers", TypeError);
E("ERR_ZLIB_INITIALIZATION_FAILED", "Initialization failed", Error);
var constants$4 = {
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65,
  CHAR_LOWERCASE_A: 97,
  CHAR_UPPERCASE_Z: 90,
  CHAR_LOWERCASE_Z: 122,
  CHAR_UPPERCASE_C: 67,
  CHAR_LOWERCASE_B: 98,
  CHAR_LOWERCASE_E: 101,
  CHAR_LOWERCASE_N: 110,
  // Non-alphabetic chars.
  CHAR_DOT: 46,
  CHAR_FORWARD_SLASH: 47,
  CHAR_BACKWARD_SLASH: 92,
  CHAR_VERTICAL_LINE: 124,
  CHAR_COLON: 58,
  CHAR_QUESTION_MARK: 63,
  CHAR_UNDERSCORE: 95,
  CHAR_LINE_FEED: 10,
  CHAR_CARRIAGE_RETURN: 13,
  CHAR_TAB: 9,
  CHAR_FORM_FEED: 12,
  CHAR_EXCLAMATION_MARK: 33,
  CHAR_HASH: 35,
  CHAR_SPACE: 32,
  CHAR_NO_BREAK_SPACE: 160,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
  CHAR_LEFT_SQUARE_BRACKET: 91,
  CHAR_RIGHT_SQUARE_BRACKET: 93,
  CHAR_LEFT_ANGLE_BRACKET: 60,
  CHAR_RIGHT_ANGLE_BRACKET: 62,
  CHAR_LEFT_CURLY_BRACKET: 123,
  CHAR_RIGHT_CURLY_BRACKET: 125,
  CHAR_HYPHEN_MINUS: 45,
  CHAR_PLUS: 43,
  CHAR_DOUBLE_QUOTE: 34,
  CHAR_SINGLE_QUOTE: 39,
  CHAR_PERCENT: 37,
  CHAR_SEMICOLON: 59,
  CHAR_CIRCUMFLEX_ACCENT: 94,
  CHAR_GRAVE_ACCENT: 96,
  CHAR_AT: 64,
  CHAR_AMPERSAND: 38,
  CHAR_EQUAL: 61,
  // Digits
  CHAR_0: 48,
  CHAR_9: 57,
  EOL: "\n"
};
const { hideStackFrames, codes: { ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$1 } } = errors$2;
function getOwnPropertyValueOrDefault(options, key, defaultValue) {
  return options == null || !options.hasOwnProperty(key) ? defaultValue : options[key];
}
const validateObject$1 = hideStackFrames((value, name, options = null) => {
  const allowArray = getOwnPropertyValueOrDefault(options, "allowArray", false);
  const allowFunction = getOwnPropertyValueOrDefault(options, "allowFunction", false);
  const nullable = getOwnPropertyValueOrDefault(options, "nullable", false);
  if (!nullable && value === null || !allowArray && Array.isArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
    throw new ERR_INVALID_ARG_TYPE$1(name, "Object", value);
  }
});
const validateFunction$1 = hideStackFrames((value, name) => {
  if (typeof value !== "function")
    throw new ERR_INVALID_ARG_TYPE$1(name, "Function", value);
});
var validators = {
  validateFunction: validateFunction$1,
  validateObject: validateObject$1
};
var url_parse = urlParseWechat;
function inspect(value, opts) {
  const ctx2 = {
    budget: {},
    indentationLvl: 0,
    seen: [],
    currentDepth: 0,
    stylize: stylizeNoColor,
    showHidden: inspectDefaultOptions.showHidden,
    depth: inspectDefaultOptions.depth,
    colors: inspectDefaultOptions.colors,
    customInspect: inspectDefaultOptions.customInspect,
    showProxy: inspectDefaultOptions.showProxy,
    maxArrayLength: inspectDefaultOptions.maxArrayLength,
    maxStringLength: inspectDefaultOptions.maxStringLength,
    breakLength: inspectDefaultOptions.breakLength,
    compact: inspectDefaultOptions.compact,
    sorted: inspectDefaultOptions.sorted,
    getters: inspectDefaultOptions.getters,
    numericSeparator: inspectDefaultOptions.numericSeparator
  };
  if (arguments.length > 1) {
    if (arguments.length > 2) {
      if (arguments[2] !== void 0) {
        ctx2.depth = arguments[2];
      }
      if (arguments.length > 3 && arguments[3] !== void 0) {
        ctx2.colors = arguments[3];
      }
    }
    if (typeof opts === "boolean") {
      ctx2.showHidden = opts;
    } else if (opts) {
      const optKeys = Object.keys(opts);
      for (let i = 0; i < optKeys.length; ++i) {
        const key = optKeys[i];
        if (ObjectPrototypeHasOwnProperty(inspectDefaultOptions, key) || key === "stylize") {
          ctx2[key] = opts[key];
        } else if (ctx2.userOptions === void 0) {
          ctx2.userOptions = opts;
        }
      }
    }
  }
  if (ctx2.colors)
    ctx2.stylize = stylizeWithColor;
  if (ctx2.maxArrayLength === null)
    ctx2.maxArrayLength = Infinity;
  if (ctx2.maxStringLength === null)
    ctx2.maxStringLength = Infinity;
  return formatValue(ctx2, value, 0);
}
const { encodeStr, hexTable, isHexTable } = querystring$1;
const { getConstructorOf, removeColors, toUSVString, kEnumerableProperty } = util$1;
const { codes: { ERR_ARG_NOT_ITERABLE, ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE, ERR_INVALID_FILE_URL_HOST, ERR_INVALID_FILE_URL_PATH, ERR_INVALID_THIS, ERR_INVALID_TUPLE, ERR_INVALID_URL, ERR_INVALID_URL_SCHEME, ERR_MISSING_ARGS, ERR_NO_CRYPTO } } = errors$2;
const { CHAR_AMPERSAND, CHAR_BACKWARD_SLASH, CHAR_EQUAL, CHAR_FORWARD_SLASH, CHAR_LOWERCASE_A, CHAR_LOWERCASE_Z, CHAR_PERCENT, CHAR_PLUS } = constants$4;
const { validateFunction, validateObject } = validators;
const querystring = querystring$1;
const context = Symbol("context");
const cannotBeBase = Symbol("cannot-be-base");
const cannotHaveUsernamePasswordPort = Symbol("cannot-have-username-password-port");
const special = Symbol("special");
const searchParams = Symbol("query");
const kFormat = Symbol("format");
const IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
const kOpaqueOrigin = "null";
function serializeTupleOrigin(scheme, host2, port2) {
  return `${scheme}//${host2}${port2 === null ? "" : `:${port2}`}`;
}
class URLContext {
  constructor() {
    this.flags = 0;
    this.scheme = ":";
    this.username = "";
    this.password = "";
    this.host = null;
    this.port = null;
    this.path = [];
    this.query = null;
    this.fragment = null;
    this.pathname = "";
  }
}
function isURLSearchParams(self2) {
  return self2 && self2[searchParams] && !self2[searchParams][searchParams];
}
let URLSearchParams$3 = class URLSearchParams {
  // URL Standard says the default value is '', but as undefined and '' have
  // the same result, undefined is used to prevent unnecessary parsing.
  // Default parameter is necessary to keep URLSearchParams.length === 0 in
  // accordance with Web IDL spec.
  constructor(init = void 0) {
    if (init === null || init === void 0) {
      this[searchParams] = [];
    } else if (typeof init === "object" || typeof init === "function") {
      const method = init[Symbol.iterator];
      if (method === this[Symbol.iterator]) {
        const childParams = init[searchParams];
        this[searchParams] = childParams.slice();
      } else if (method !== null && method !== void 0) {
        if (typeof method !== "function") {
          throw new ERR_ARG_NOT_ITERABLE("Query pairs");
        }
        const pairs = [];
        for (const pair of init) {
          if (typeof pair !== "object" && typeof pair !== "function" || pair === null || typeof pair[Symbol.iterator] !== "function") {
            throw new ERR_INVALID_TUPLE("Each query pair", "[name, value]");
          }
          const convertedPair = [];
          for (const element of pair)
            push(convertedPair, toUSVString(element));
          push(pairs, convertedPair);
        }
        this[searchParams] = [];
        for (const pair of pairs) {
          if (pair.length !== 2) {
            throw new ERR_INVALID_TUPLE("Each query pair", "[name, value]");
          }
          this[searchParams].push(pair[0], pair[1]);
        }
      } else {
        const visited = {};
        this[searchParams] = [];
        const keys = Reflect.ownKeys(init);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const desc = Reflect.getOwnPropertyDescriptor(init, key);
          if (desc !== void 0 && desc.enumerable) {
            const typedKey = toUSVString(key);
            const typedValue = toUSVString(init[key]);
            if (visited[typedKey] !== void 0) {
              this[searchParams][visited[typedKey]] = typedValue;
            } else {
              visited[typedKey] = this[searchParams].push(typedKey, typedValue) - 1;
            }
          }
        }
      }
    } else {
      init = toUSVString(init);
      if (init[0] === "?")
        init = init.slice(1);
      initSearchParams(this, init);
    }
    this[context] = null;
  }
  [inspect.custom](recurseTimes, ctx2) {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    if (typeof recurseTimes === "number" && recurseTimes < 0)
      return ctx2.stylize("[Object]", "special");
    const separator = ", ";
    const innerOpts = Object.assign({}, ctx2);
    if (recurseTimes !== null) {
      innerOpts.depth = recurseTimes - 1;
    }
    const innerInspect = (v) => inspect(v, innerOpts);
    const list = this[searchParams];
    const output = [];
    for (let i = 0; i < list.length; i += 2)
      output.push(`${innerInspect(list[i])} => ${innerInspect(list[i + 1])}`);
    const length = output.reduce((prev, cur) => prev + removeColors(cur).length + separator.length, -separator.length);
    if (length > ctx2.breakLength) {
      return `${this.constructor.name} {
  ${output.join(",\n  ")} }`;
    } else if (output.length) {
      return `${this.constructor.name} { ${output.join(separator)} }`;
    }
    return `${this.constructor.name} {}`;
  }
  append(name, value) {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("name", "value");
    }
    name = toUSVString(name);
    value = toUSVString(value);
    this[searchParams].push(name, value);
    update(this[context], this);
  }
  delete(name) {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    if (arguments.length < 1) {
      throw new ERR_MISSING_ARGS("name");
    }
    const list = this[searchParams];
    name = toUSVString(name);
    for (let i = 0; i < list.length; ) {
      const cur = list[i];
      if (cur === name) {
        list.splice(i, 2);
      } else {
        i += 2;
      }
    }
    update(this[context], this);
  }
  get(name) {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    if (arguments.length < 1) {
      throw new ERR_MISSING_ARGS("name");
    }
    const list = this[searchParams];
    name = toUSVString(name);
    for (let i = 0; i < list.length; i += 2) {
      if (list[i] === name) {
        return list[i + 1];
      }
    }
    return null;
  }
  getAll(name) {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    if (arguments.length < 1) {
      throw new ERR_MISSING_ARGS("name");
    }
    const list = this[searchParams];
    const values = [];
    name = toUSVString(name);
    for (let i = 0; i < list.length; i += 2) {
      if (list[i] === name) {
        values.push(list[i + 1]);
      }
    }
    return values;
  }
  has(name) {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    if (arguments.length < 1) {
      throw new ERR_MISSING_ARGS("name");
    }
    const list = this[searchParams];
    name = toUSVString(name);
    for (let i = 0; i < list.length; i += 2) {
      if (list[i] === name) {
        return true;
      }
    }
    return false;
  }
  set(name, value) {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    if (arguments.length < 2) {
      throw new ERR_MISSING_ARGS("name", "value");
    }
    const list = this[searchParams];
    name = toUSVString(name);
    value = toUSVString(value);
    let found = false;
    for (let i = 0; i < list.length; ) {
      const cur = list[i];
      if (cur === name) {
        if (!found) {
          list[i + 1] = value;
          found = true;
          i += 2;
        } else {
          list.splice(i, 2);
        }
      } else {
        i += 2;
      }
    }
    if (!found) {
      list.push(name, value);
    }
    update(this[context], this);
  }
  sort() {
    const a = this[searchParams];
    const len = a.length;
    if (len <= 2)
      ;
    else if (len < 100) {
      for (let i = 2; i < len; i += 2) {
        const curKey = a[i];
        const curVal = a[i + 1];
        let j;
        for (j = i - 2; j >= 0; j -= 2) {
          if (a[j] > curKey) {
            a[j + 2] = a[j];
            a[j + 3] = a[j + 1];
          } else {
            break;
          }
        }
        a[j + 2] = curKey;
        a[j + 3] = curVal;
      }
    } else {
      const lBuffer = new Array(len);
      const rBuffer = new Array(len);
      for (let step = 2; step < len; step *= 2) {
        for (let start = 0; start < len - 2; start += 2 * step) {
          const mid = start + step;
          let end = mid + step;
          end = end < len ? end : len;
          if (mid > end)
            continue;
          merge(a, start, mid, end, lBuffer, rBuffer);
        }
      }
    }
    update(this[context], this);
  }
  // https://heycam.github.io/webidl/#es-iterators
  // Define entries here rather than [Symbol.iterator] as the function name
  // must be set to `entries`.
  entries() {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    return createSearchParamsIterator(this, "key+value");
  }
  forEach(callback, thisArg = void 0) {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    validateFunction(callback, "callback");
    let list = this[searchParams];
    let i = 0;
    while (i < list.length) {
      const key = list[i];
      const value = list[i + 1];
      callback.call(thisArg, value, key, this);
      list = this[searchParams];
      i += 2;
    }
  }
  // https://heycam.github.io/webidl/#es-iterable
  keys() {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    return createSearchParamsIterator(this, "key");
  }
  values() {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    return createSearchParamsIterator(this, "value");
  }
  // https://heycam.github.io/webidl/#es-stringifier
  // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
  toString() {
    if (!isURLSearchParams(this))
      throw new ERR_INVALID_THIS("URLSearchParams");
    return serializeParams(this[searchParams]);
  }
};
Object.defineProperties(URLSearchParams$3.prototype, {
  append: kEnumerableProperty,
  delete: kEnumerableProperty,
  get: kEnumerableProperty,
  getAll: kEnumerableProperty,
  has: kEnumerableProperty,
  set: kEnumerableProperty,
  sort: kEnumerableProperty,
  entries: kEnumerableProperty,
  forEach: kEnumerableProperty,
  keys: kEnumerableProperty,
  values: kEnumerableProperty,
  toString: kEnumerableProperty,
  [Object.prototype.toString()]: { __proto__: null, configurable: true, value: "URLSearchParams" },
  // https://heycam.github.io/webidl/#es-iterable-entries
  [Symbol.iterator]: {
    __proto__: null,
    configurable: true,
    writable: true,
    value: URLSearchParams$3.prototype.entries
  }
});
function onParseComplete(obj, flags2, protocol, username, password, host2, port2, path, query, fragment, pathname, href) {
  const ctx2 = obj[context];
  ctx2.flags = flags2;
  ctx2.scheme = protocol;
  ctx2.protocol = protocol;
  ctx2.username = username;
  ctx2.password = password;
  ctx2.port = port2;
  ctx2.path = path;
  ctx2.query = query;
  ctx2.fragment = fragment;
  ctx2.host = host2;
  ctx2.href = href;
  ctx2.pathname = pathname;
  if (!obj[searchParams]) {
    obj[searchParams] = new URLSearchParams$3();
    obj[searchParams][context] = obj;
  }
  initSearchParams(obj[searchParams], query);
}
function onParseProtocolComplete(obj, protocol, port2) {
  const ctx2 = obj[context];
  ctx2.scheme = protocol;
  ctx2.port = port2;
}
function onhrefComplete(obj, href) {
  const ctx2 = obj[context];
  ctx2.href = href;
}
function onParseHostnameComplete(obj, host2) {
  const ctx2 = obj[context];
  if ((flags & URL_FLAGS_HAS_HOST) !== 0) {
    ctx2.host = host2;
  } else {
    ctx2.host = null;
  }
}
function onParsePortComplete(obj, port2) {
  obj[context].port = port2;
}
function onParseHostComplete(flags2, protocol, username, password, host2, port2, path, query, fragment) {
  ReflectApply(onParseHostnameComplete, this, arguments);
  if (port2 !== null || (flags2 & URL_FLAGS_IS_DEFAULT_SCHEME_PORT) !== 0)
    ReflectApply(onParsePortComplete, this, arguments);
}
function onParsePathComplete(obj, host2, pathname) {
  const ctx2 = obj[context];
  if ((flags & URL_FLAGS_HAS_PATH) !== 0) {
    ctx2.pathname = pathname;
  }
  if ((flags & URL_FLAGS_HAS_HOST) !== 0) {
    ctx2.host = host2;
  }
}
function onParseSearchComplete(obj, query) {
  obj[context].query = query;
}
function isURLThis(self2) {
  return self2 !== void 0 && self2 !== null && self2[context] !== void 0;
}
let URL$2 = class URL {
  constructor(input, base = void 0) {
    input = `${input}`;
    if (base !== void 0) {
      new URL(base)[context];
    }
    this[context] = new URLContext();
    let ourl = url_parse(input);
    onParseComplete(this, "", ourl.protocol, ourl.username, ourl.password, ourl.host, ourl.port, ourl.pathname, ourl.query, "", ourl.pathname, ourl.href);
  }
  get [special]() {
    return this[context].flags !== 0;
  }
  get [cannotBeBase]() {
    return this[context].flags !== 0;
  }
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  get [cannotHaveUsernamePasswordPort]() {
    const { host: host2, scheme } = this[context];
    return host2 == null || host2 === "" || this[cannotBeBase] || scheme === "file:";
  }
  [inspect.custom](depth, opts) {
    if (this == null || Object.getPrototypeOf(this[context]) !== URLContext.prototype) {
      throw new ERR_INVALID_THIS("URL");
    }
    if (typeof depth === "number" && depth < 0)
      return this;
    const constructor = getConstructorOf(this) || URL;
    const obj = /* @__PURE__ */ Object.create({ constructor });
    obj.href = this.href;
    obj.origin = this.origin;
    obj.protocol = this.protocol;
    obj.username = this.username;
    obj.password = this.password;
    obj.host = this.host;
    obj.hostname = this.hostname;
    obj.port = this.port;
    obj.pathname = this.pathname;
    obj.search = this.search;
    obj.searchParams = this.searchParams;
    obj.hash = this.hash;
    if (opts.showHidden) {
      obj.cannotBeBase = this[cannotBeBase];
      obj.special = this[special];
      obj[context] = this[context];
    }
    return `${constructor.name} ${inspect(obj, opts)}`;
  }
  [kFormat](options) {
    if (options)
      validateObject(options, "options");
    options = Object.assign({ fragment: true, unicode: false, search: true, auth: true }, options);
    const ctx2 = this[context];
    let ret = ctx2.scheme;
    if (ctx2.host !== null) {
      ret += "//";
      const has_username = ctx2.username !== "";
      const has_password = ctx2.password !== "";
      if (options.auth && (has_username || has_password)) {
        if (has_username)
          ret += ctx2.username;
        if (has_password)
          ret += `:${ctx2.password}`;
        ret += "@";
      }
      ret += options.unicode ? domainToUnicode(ctx2.host) : ctx2.host;
      if (ctx2.port !== "")
        ret += `:${ctx2.port}`;
    }
    if (this[cannotBeBase]) {
      ret += ctx2.path;
    }
    if (options.search && ctx2.query !== null)
      ret += `?${ctx2.query}`;
    if (options.fragment && ctx2.fragment !== null)
      ret += `#${ctx2.fragment}`;
    return ret;
  }
  // https://heycam.github.io/webidl/#es-stringifier
  toString() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    return this[kFormat]({});
  }
  get href() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    return this[kFormat]({});
  }
  set href(input) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const ctx2 = this[context];
    onhrefComplete(this, ctx2.href);
  }
  // readonly
  get origin() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const ctx2 = this[context];
    switch (ctx2.scheme) {
      case "blob:":
        if (ctx2.path.length > 0) {
          try {
            return new URL(ctx2.path[0]).origin;
          } catch (_a2) {
          }
        }
        return kOpaqueOrigin;
      case "ftp:":
      case "http:":
      case "https:":
      case "ws:":
      case "wss:":
        return serializeTupleOrigin(ctx2.scheme, ctx2.host, ctx2.port);
    }
    return kOpaqueOrigin;
  }
  get protocol() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    return this[context].scheme;
  }
  set protocol(scheme) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    scheme = `${scheme}`;
    if (scheme.length === 0)
      return;
    const ctx2 = this[context];
    onParseProtocolComplete(this, ctx2.protocol, ctx2.port);
  }
  get username() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    return this[context].username;
  }
  set username(username) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    username = `${username}`;
    if (this[cannotHaveUsernamePasswordPort])
      return;
    const ctx2 = this[context];
    if (username === "") {
      ctx2.username = "";
      ctx2.flags &= ~URL_FLAGS_HAS_USERNAME;
      return;
    }
    ctx2.username = encodeAuth(username);
    ctx2.flags |= URL_FLAGS_HAS_USERNAME;
  }
  get password() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    return this[context].password;
  }
  set password(password) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    password = `${password}`;
    if (this[cannotHaveUsernamePasswordPort])
      return;
    const ctx2 = this[context];
    if (password === "") {
      ctx2.password = "";
      ctx2.flags &= ~URL_FLAGS_HAS_PASSWORD;
      return;
    }
    ctx2.password = encodeAuth(password);
    ctx2.flags |= URL_FLAGS_HAS_PASSWORD;
  }
  get host() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const ctx2 = this[context];
    let ret = ctx2.host || "";
    if (ctx2.port !== null)
      ret += `:${ctx2.port}`;
    return ret;
  }
  set host(host2) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const ctx2 = this[context];
    host2 = `${host2}`;
    if (this[cannotBeBase]) {
      return;
    }
    parse(host2, kHost, null, ctx2, Function.prototype.bind(onParseHostComplete, this));
  }
  get hostname() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    return this[context].host || "";
  }
  set hostname(host2) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const ctx2 = this[context];
    if (this[cannotBeBase]) {
      return;
    }
    onParseHostnameComplete(this, ctx2.host);
  }
  get port() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const port2 = this[context].port;
    return port2 === null ? "" : String(port2);
  }
  set port(port2) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    port2 = `${port2}`;
    if (this[cannotHaveUsernamePasswordPort])
      return;
    const ctx2 = this[context];
    if (port2 === "") {
      ctx2.port = null;
      return;
    }
    onParsePortComplete(this, ctx2.post);
  }
  get pathname() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const ctx2 = this[context];
    if (this[cannotBeBase])
      return ctx2.pathname;
  }
  set pathname(pathname) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    if (this[cannotBeBase])
      return;
    onParsePathComplete(this, ctx.host, ctx.path);
  }
  get search() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const { query } = this[context];
    if (query === null || query === "")
      return "";
    return `?${query}`;
  }
  set search(search) {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    const ctx2 = this[context];
    search = toUSVString(search);
    if (search === "") {
      ctx2.query = null;
    } else {
      if (search[0] === "?")
        search = StringPrototypeSlice(search, 1);
      ctx2.query = "";
      if (search) {
        onParseSearchComplete(this, ctx2.query);
      }
    }
    initSearchParams(this[searchParams], search);
  }
  // // readonly
  get searchParams() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    return this[searchParams];
  }
  // get hash() {
  //   if (!isURLThis(this))
  //     throw new ERR_INVALID_THIS('URL');
  //   const { fragment } = this[context];
  //   if (fragment === null || fragment === '')
  //     return '';
  //   return `#${fragment}`;
  // }
  // set hash(hash) {
  //   if (!isURLThis(this))
  //     throw new ERR_INVALID_THIS('URL');
  //   const ctx = this[context];
  //   // toUSVString is not needed.
  //   hash = `${hash}`;
  //   if (!hash) {
  //     ctx.fragment = null;
  //     ctx.flags &= ~URL_FLAGS_HAS_FRAGMENT;
  //     return;
  //   }
  //   if (hash[0] === '#') hash = StringPrototypeSlice(hash, 1);
  //   ctx.fragment = '';
  //   ctx.flags |= URL_FLAGS_HAS_FRAGMENT;
  //   parse(hash, kFragment, null, ctx,
  //         Function.prototype.bind(onParseHashComplete, this));
  // }
  toJSON() {
    if (!isURLThis(this))
      throw new ERR_INVALID_THIS("URL");
    return this[kFormat]({});
  }
  static revokeObjectURL(url) {
    url = `${url}`;
    try {
      const parsed = new URL(url);
      const split = StringPrototypeSplit(parsed.pathname, ":");
      if (split.length === 2)
        revokeObjectURL(split[1]);
    } catch (_a2) {
    }
  }
};
Object.defineProperties(URL$2.prototype, {
  [kFormat]: { __proto__: null, configurable: false, writable: false },
  [Object.prototype.toString.call()]: { __proto__: null, configurable: true, value: "URL" },
  toString: kEnumerableProperty,
  href: kEnumerableProperty,
  origin: kEnumerableProperty,
  protocol: kEnumerableProperty,
  username: kEnumerableProperty,
  password: kEnumerableProperty,
  host: kEnumerableProperty,
  hostname: kEnumerableProperty,
  port: kEnumerableProperty,
  pathname: kEnumerableProperty,
  search: kEnumerableProperty,
  searchParams: kEnumerableProperty,
  hash: kEnumerableProperty,
  toJSON: kEnumerableProperty
});
function update(url, params) {
  if (!url)
    return;
  const ctx2 = url[context];
  let serializedParams = params.toString();
  serializedParams = serializedParams.replace(/\+/g, "%2B").replace(/\"/g, "%22").replace(/\'/g, "%27").replace(/\//g, "%2F").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\~/g, "%7E").replace(/\,/g, "%2C");
  if (serializedParams) {
    ctx2.query = serializedParams;
  } else {
    ctx2.query = null;
  }
}
function initSearchParams(url, init) {
  if (!init) {
    url[searchParams] = [];
    return;
  }
  url[searchParams] = parseParams(init);
}
function parseParams(qs2) {
  const out = [];
  let pairStart = 0;
  let lastPos = 0;
  let seenSep = false;
  let buf = "";
  let encoded = false;
  let encodeCheck = 0;
  let i;
  for (i = 0; i < qs2.length; ++i) {
    const code = StringPrototypeCharCodeAt(qs2, i);
    if (code === CHAR_AMPERSAND) {
      if (pairStart === i) {
        lastPos = pairStart = i + 1;
        continue;
      }
      if (lastPos < i)
        buf += qs2.slice(lastPos, i);
      if (encoded)
        buf = querystring.unescape(buf);
      out.push(buf);
      if (!seenSep)
        out.push("");
      seenSep = false;
      buf = "";
      encoded = false;
      encodeCheck = 0;
      lastPos = pairStart = i + 1;
      continue;
    }
    if (!seenSep && code === CHAR_EQUAL) {
      if (lastPos < i)
        buf += qs2.slice(lastPos, i);
      if (encoded)
        buf = querystring.unescape(buf);
      out.push(buf);
      seenSep = true;
      buf = "";
      encoded = false;
      encodeCheck = 0;
      lastPos = i + 1;
      continue;
    }
    if (code === CHAR_PLUS) {
      if (lastPos < i)
        buf += StringPrototypeSlice(qs2, lastPos, i);
      buf += " ";
      lastPos = i + 1;
    } else if (!encoded) {
      if (code === CHAR_PERCENT) {
        encodeCheck = 1;
      } else if (encodeCheck > 0) {
        if (isHexTable[code] === 1) {
          if (++encodeCheck === 3) {
            encoded = true;
          }
        } else {
          encodeCheck = 0;
        }
      }
    }
  }
  if (pairStart === i)
    return out;
  if (lastPos < i)
    buf += StringPrototypeSlice(qs2, lastPos, i);
  if (encoded)
    buf = querystring.unescape(buf);
  out.push(buf);
  if (!seenSep)
    out.push("");
  return out;
}
const paramHexTable = hexTable.slice();
paramHexTable[32] = "+";
function serializeParams(array) {
  const len = array.length;
  if (len === 0)
    return "";
  const firstEncodedParam = array[0];
  const firstEncodedValue = array[1];
  let output = `${firstEncodedParam}=${firstEncodedValue}`;
  for (let i = 2; i < len; i += 2) {
    const encodedParam = array[i];
    const encodedValue = array[i + 1];
    output += `&${encodedParam}=${encodedValue}`;
  }
  return output;
}
function defineIDLClass(proto, classStr, obj) {
  Object.defineProperty(proto, Object.prototype.toString(), {
    __proto__: null,
    writable: false,
    enumerable: false,
    configurable: true,
    value: classStr
  });
  for (const key of Object.keys(obj)) {
    Object.defineProperty(proto, key, {
      __proto__: null,
      writable: true,
      enumerable: true,
      configurable: true,
      value: obj[key]
    });
  }
  for (const key of Object.getOwnPropertySymbols(obj)) {
    Object.defineProperty(proto, key, {
      __proto__: null,
      writable: true,
      enumerable: false,
      configurable: true,
      value: obj[key]
    });
  }
}
function merge(out, start, mid, end, lBuffer, rBuffer) {
  const sizeLeft = mid - start;
  const sizeRight = end - mid;
  let l, r, o2;
  for (l = 0; l < sizeLeft; l++)
    lBuffer[l] = out[start + l];
  for (r = 0; r < sizeRight; r++)
    rBuffer[r] = out[mid + r];
  l = 0;
  r = 0;
  o2 = start;
  while (l < sizeLeft && r < sizeRight) {
    if (lBuffer[l] <= rBuffer[r]) {
      out[o2++] = lBuffer[l++];
      out[o2++] = lBuffer[l++];
    } else {
      out[o2++] = rBuffer[r++];
      out[o2++] = rBuffer[r++];
    }
  }
  while (l < sizeLeft)
    out[o2++] = lBuffer[l++];
  while (r < sizeRight)
    out[o2++] = rBuffer[r++];
}
function createSearchParamsIterator(target, kind) {
  const iterator = Object.create(URLSearchParamsIteratorPrototype);
  iterator[context] = {
    target,
    kind,
    index: 0
  };
  return iterator;
}
const URLSearchParamsIteratorPrototype = Object.create(IteratorPrototype);
defineIDLClass(URLSearchParamsIteratorPrototype, "URLSearchParams Iterator", {
  next() {
    if (!this || Object.getPrototypeOf(this) !== URLSearchParamsIteratorPrototype) {
      throw new ERR_INVALID_THIS("URLSearchParamsIterator");
    }
    const { target, kind, index: index2 } = this[context];
    const values = target[searchParams];
    const len = values.length;
    if (index2 >= len) {
      return {
        value: void 0,
        done: true
      };
    }
    const name = values[index2];
    const value = values[index2 + 1];
    this[context].index = index2 + 2;
    let result;
    if (kind === "key") {
      result = name;
    } else if (kind === "value") {
      result = value;
    } else {
      result = [name, value];
    }
    return {
      value: result,
      done: false
    };
  },
  [inspect.custom](recurseTimes, ctx2) {
    if (this == null || this[context] == null || this[context].target == null)
      throw new ERR_INVALID_THIS("URLSearchParamsIterator");
    if (typeof recurseTimes === "number" && recurseTimes < 0)
      return ctx2.stylize("[Object]", "special");
    const innerOpts = Object.assign({}, ctx2);
    if (recurseTimes !== null) {
      innerOpts.depth = recurseTimes - 1;
    }
    const { target, kind, index: index2 } = this[context];
    const output = ArrayPrototypeReduce(ArrayPrototypeSlice(target[searchParams], index2), (prev, cur, i) => {
      const key = i % 2 === 0;
      if (kind === "key" && key) {
        prev.push(cur);
      } else if (kind === "value" && !key) {
        prev.push(cur);
      } else if (kind === "key+value" && !key) {
        prev.push([target[searchParams][index2 + i - 1], cur]);
      }
      return prev;
    }, []);
    const breakLn = inspect(output, innerOpts).includes("\n");
    const outputStrs = ArrayPrototypeMap(output, (p2) => inspect(p2, innerOpts));
    let outputStr;
    if (breakLn) {
      outputStr = `
  ${ArrayPrototypeJoin(outputStrs, ",\n  ")}`;
    } else {
      outputStr = ` ${ArrayPrototypeJoin(outputStrs, ", ")}`;
    }
    return `${this[Object.prototype.toString()]} {${outputStr} }`;
  }
});
function domainToUnicode(domain) {
  if (arguments.length < 1)
    throw new ERR_MISSING_ARGS("domain");
  return _domainToUnicode(`${domain}`);
}
function urlToHttpOptions(url) {
  const options = {
    protocol: url.protocol,
    hostname: typeof url.hostname === "string" && url.hostname.startsWith("[") ? url.hostname.slice(1, -1) : url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: `${url.pathname || ""}${url.search || ""}`,
    href: url.href
  };
  if (url.port !== "") {
    options.port = Number(url.port);
  }
  if (url.username || url.password) {
    options.auth = `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`;
  }
  return options;
}
var wechaturlParse = {
  URL: URL$2,
  URLSearchParams: URLSearchParams$3,
  urlToHttpOptions
};
var __importDefault$3 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(PostgrestClient$1, "__esModule", { value: true });
const PostgrestQueryBuilder_1 = __importDefault$3(PostgrestQueryBuilder$1);
const PostgrestFilterBuilder_1 = __importDefault$3(PostgrestFilterBuilder$1);
const constants_1$5 = constants$5;
let { URL: URL$1 } = wechaturlParse;
class PostgrestClient {
  // TODO: Add back shouldThrowOnError once we figure out the typings
  /**
   * Creates a PostgREST client.
   *
   * @param url - URL of the PostgREST endpoint
   * @param options - Named parameters
   * @param options.headers - Custom headers
   * @param options.schema - Postgres schema to switch to
   * @param options.fetch - Custom fetch
   */
  constructor(url, { headers = {}, schema, fetch: fetch2 } = {}) {
    this.url = url;
    this.headers = Object.assign(Object.assign({}, constants_1$5.DEFAULT_HEADERS), headers);
    this.schema = schema;
    this.fetch = fetch2;
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(relation) {
    const url = new URL$1(`${this.url}/${relation}`);
    return new PostgrestQueryBuilder_1.default(url, {
      headers: Object.assign({}, this.headers),
      schema: this.schema,
      fetch: this.fetch
    });
  }
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(fn, args = {}, { head = false, count } = {}) {
    let method;
    const url = new URL$1(`${this.url}/rpc/${fn}`);
    let body;
    if (head) {
      method = "HEAD";
      Object.entries(args).forEach(([name, value]) => {
        url.searchParams.append(name, `${value}`);
      });
    } else {
      method = "POST";
      body = args;
    }
    const headers = Object.assign({}, this.headers);
    if (count) {
      headers["Prefer"] = `count=${count}`;
    }
    return new PostgrestFilterBuilder_1.default({
      method,
      url,
      headers,
      schema: this.schema,
      body,
      fetch: this.fetch,
      allowEmpty: false
    });
  }
}
PostgrestClient$1.default = PostgrestClient;
(function(exports2) {
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.PostgrestBuilder = exports2.PostgrestTransformBuilder = exports2.PostgrestFilterBuilder = exports2.PostgrestQueryBuilder = exports2.PostgrestClient = void 0;
  var PostgrestClient_1 = PostgrestClient$1;
  Object.defineProperty(exports2, "PostgrestClient", { enumerable: true, get: function() {
    return __importDefault2(PostgrestClient_1).default;
  } });
  var PostgrestQueryBuilder_12 = PostgrestQueryBuilder$1;
  Object.defineProperty(exports2, "PostgrestQueryBuilder", { enumerable: true, get: function() {
    return __importDefault2(PostgrestQueryBuilder_12).default;
  } });
  var PostgrestFilterBuilder_12 = PostgrestFilterBuilder$1;
  Object.defineProperty(exports2, "PostgrestFilterBuilder", { enumerable: true, get: function() {
    return __importDefault2(PostgrestFilterBuilder_12).default;
  } });
  var PostgrestTransformBuilder_12 = PostgrestTransformBuilder$1;
  Object.defineProperty(exports2, "PostgrestTransformBuilder", { enumerable: true, get: function() {
    return __importDefault2(PostgrestTransformBuilder_12).default;
  } });
  var PostgrestBuilder_12 = PostgrestBuilder$1;
  Object.defineProperty(exports2, "PostgrestBuilder", { enumerable: true, get: function() {
    return __importDefault2(PostgrestBuilder_12).default;
  } });
})(src$3);
var src$2 = {};
var RealtimeClient$1 = {};
var constants$3 = {};
var version$3 = {};
Object.defineProperty(version$3, "__esModule", { value: true });
version$3.version = void 0;
version$3.version = "2.4.0";
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.CONNECTION_STATE = exports2.TRANSPORTS = exports2.CHANNEL_EVENTS = exports2.CHANNEL_STATES = exports2.SOCKET_STATES = exports2.WS_CLOSE_NORMAL = exports2.DEFAULT_TIMEOUT = exports2.VSN = exports2.DEFAULT_HEADERS = void 0;
  const version_12 = version$3;
  exports2.DEFAULT_HEADERS = { "X-Client-Info": `realtime-js/${version_12.version}` };
  exports2.VSN = "1.0.0";
  exports2.DEFAULT_TIMEOUT = 1e4;
  exports2.WS_CLOSE_NORMAL = 1e3;
  (function(SOCKET_STATES) {
    SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
    SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
    SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
    SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
  })(exports2.SOCKET_STATES || (exports2.SOCKET_STATES = {}));
  (function(CHANNEL_STATES) {
    CHANNEL_STATES["closed"] = "closed";
    CHANNEL_STATES["errored"] = "errored";
    CHANNEL_STATES["joined"] = "joined";
    CHANNEL_STATES["joining"] = "joining";
    CHANNEL_STATES["leaving"] = "leaving";
  })(exports2.CHANNEL_STATES || (exports2.CHANNEL_STATES = {}));
  (function(CHANNEL_EVENTS) {
    CHANNEL_EVENTS["close"] = "phx_close";
    CHANNEL_EVENTS["error"] = "phx_error";
    CHANNEL_EVENTS["join"] = "phx_join";
    CHANNEL_EVENTS["reply"] = "phx_reply";
    CHANNEL_EVENTS["leave"] = "phx_leave";
    CHANNEL_EVENTS["access_token"] = "access_token";
  })(exports2.CHANNEL_EVENTS || (exports2.CHANNEL_EVENTS = {}));
  (function(TRANSPORTS) {
    TRANSPORTS["websocket"] = "websocket";
  })(exports2.TRANSPORTS || (exports2.TRANSPORTS = {}));
  (function(CONNECTION_STATE) {
    CONNECTION_STATE["Connecting"] = "connecting";
    CONNECTION_STATE["Open"] = "open";
    CONNECTION_STATE["Closing"] = "closing";
    CONNECTION_STATE["Closed"] = "closed";
  })(exports2.CONNECTION_STATE || (exports2.CONNECTION_STATE = {}));
})(constants$3);
var timer = {};
Object.defineProperty(timer, "__esModule", { value: true });
class Timer {
  constructor(callback, timerCalc) {
    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = void 0;
    this.tries = 0;
    this.callback = callback;
    this.timerCalc = timerCalc;
  }
  reset() {
    this.tries = 0;
    clearTimeout(this.timer);
  }
  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.tries = this.tries + 1;
      this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}
timer.default = Timer;
var serializer = {};
Object.defineProperty(serializer, "__esModule", { value: true });
class Serializer {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(rawPayload, callback) {
    if (rawPayload.constructor === ArrayBuffer) {
      return callback(this._binaryDecode(rawPayload));
    }
    if (typeof rawPayload === "string") {
      return callback(JSON.parse(rawPayload));
    }
    return callback({});
  }
  _binaryDecode(buffer2) {
    const view = new DataView(buffer2);
    const decoder = new TextDecoder();
    return this._decodeBroadcast(buffer2, view, decoder);
  }
  _decodeBroadcast(buffer2, view, decoder) {
    const topicSize = view.getUint8(1);
    const eventSize = view.getUint8(2);
    let offset = this.HEADER_LENGTH + 2;
    const topic = decoder.decode(buffer2.slice(offset, offset + topicSize));
    offset = offset + topicSize;
    const event = decoder.decode(buffer2.slice(offset, offset + eventSize));
    offset = offset + eventSize;
    const data = JSON.parse(decoder.decode(buffer2.slice(offset, buffer2.byteLength)));
    return { ref: null, topic, event, payload: data };
  }
}
serializer.default = Serializer;
var RealtimeChannel = {};
var push$1 = {};
Object.defineProperty(push$1, "__esModule", { value: true });
const constants_1$4 = constants$3;
class Push {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(channel, event, payload = {}, timeout = constants_1$4.DEFAULT_TIMEOUT) {
    this.channel = channel;
    this.event = event;
    this.payload = payload;
    this.timeout = timeout;
    this.sent = false;
    this.timeoutTimer = void 0;
    this.ref = "";
    this.receivedResp = null;
    this.recHooks = [];
    this.refEvent = null;
    this.rateLimited = false;
  }
  resend(timeout) {
    this.timeout = timeout;
    this._cancelRefEvent();
    this.ref = "";
    this.refEvent = null;
    this.receivedResp = null;
    this.sent = false;
    this.send();
  }
  send() {
    if (this._hasReceived("timeout")) {
      return;
    }
    this.startTimeout();
    this.sent = true;
    const status = this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel._joinRef()
    });
    if (status === "rate limited") {
      this.rateLimited = true;
    }
  }
  updatePayload(payload) {
    this.payload = Object.assign(Object.assign({}, this.payload), payload);
  }
  receive(status, callback) {
    var _a2;
    if (this._hasReceived(status)) {
      callback((_a2 = this.receivedResp) === null || _a2 === void 0 ? void 0 : _a2.response);
    }
    this.recHooks.push({ status, callback });
    return this;
  }
  startTimeout() {
    if (this.timeoutTimer) {
      return;
    }
    this.ref = this.channel.socket._makeRef();
    this.refEvent = this.channel._replyEventName(this.ref);
    const callback = (payload) => {
      this._cancelRefEvent();
      this._cancelTimeout();
      this.receivedResp = payload;
      this._matchReceive(payload);
    };
    this.channel._on(this.refEvent, {}, callback);
    this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(status, response) {
    if (this.refEvent)
      this.channel._trigger(this.refEvent, { status, response });
  }
  destroy() {
    this._cancelRefEvent();
    this._cancelTimeout();
  }
  _cancelRefEvent() {
    if (!this.refEvent) {
      return;
    }
    this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = void 0;
  }
  _matchReceive({ status, response }) {
    this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
  }
  _hasReceived(status) {
    return this.receivedResp && this.receivedResp.status === status;
  }
}
push$1.default = Push;
var RealtimePresence = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.REALTIME_PRESENCE_LISTEN_EVENTS = void 0;
  (function(REALTIME_PRESENCE_LISTEN_EVENTS) {
    REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
    REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
    REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
  })(exports2.REALTIME_PRESENCE_LISTEN_EVENTS || (exports2.REALTIME_PRESENCE_LISTEN_EVENTS = {}));
  class RealtimePresence2 {
    /**
     * Initializes the Presence.
     *
     * @param channel - The RealtimeChannel
     * @param opts - The options,
     *        for example `{events: {state: 'state', diff: 'diff'}}`
     */
    constructor(channel, opts) {
      this.channel = channel;
      this.state = {};
      this.pendingDiffs = [];
      this.joinRef = null;
      this.caller = {
        onJoin: () => {
        },
        onLeave: () => {
        },
        onSync: () => {
        }
      };
      const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
        state: "presence_state",
        diff: "presence_diff"
      };
      this.channel._on(events.state, {}, (newState) => {
        const { onJoin, onLeave, onSync } = this.caller;
        this.joinRef = this.channel._joinRef();
        this.state = RealtimePresence2.syncState(this.state, newState, onJoin, onLeave);
        this.pendingDiffs.forEach((diff2) => {
          this.state = RealtimePresence2.syncDiff(this.state, diff2, onJoin, onLeave);
        });
        this.pendingDiffs = [];
        onSync();
      });
      this.channel._on(events.diff, {}, (diff2) => {
        const { onJoin, onLeave, onSync } = this.caller;
        if (this.inPendingSyncState()) {
          this.pendingDiffs.push(diff2);
        } else {
          this.state = RealtimePresence2.syncDiff(this.state, diff2, onJoin, onLeave);
          onSync();
        }
      });
      this.onJoin((key, currentPresences, newPresences) => {
        this.channel._trigger("presence", {
          event: "join",
          key,
          currentPresences,
          newPresences
        });
      });
      this.onLeave((key, currentPresences, leftPresences) => {
        this.channel._trigger("presence", {
          event: "leave",
          key,
          currentPresences,
          leftPresences
        });
      });
      this.onSync(() => {
        this.channel._trigger("presence", { event: "sync" });
      });
    }
    /**
     * Used to sync the list of presences on the server with the
     * client's state.
     *
     * An optional `onJoin` and `onLeave` callback can be provided to
     * react to changes in the client's local presences across
     * disconnects and reconnects with the server.
     *
     * @internal
     */
    static syncState(currentState, newState, onJoin, onLeave) {
      const state = this.cloneDeep(currentState);
      const transformedState = this.transformState(newState);
      const joins = {};
      const leaves = {};
      this.map(state, (key, presences) => {
        if (!transformedState[key]) {
          leaves[key] = presences;
        }
      });
      this.map(transformedState, (key, newPresences) => {
        const currentPresences = state[key];
        if (currentPresences) {
          const newPresenceRefs = newPresences.map((m) => m.presence_ref);
          const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
          const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
          const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
          if (joinedPresences.length > 0) {
            joins[key] = joinedPresences;
          }
          if (leftPresences.length > 0) {
            leaves[key] = leftPresences;
          }
        } else {
          joins[key] = newPresences;
        }
      });
      return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
    }
    /**
     * Used to sync a diff of presence join and leave events from the
     * server, as they happen.
     *
     * Like `syncState`, `syncDiff` accepts optional `onJoin` and
     * `onLeave` callbacks to react to a user joining or leaving from a
     * device.
     *
     * @internal
     */
    static syncDiff(state, diff2, onJoin, onLeave) {
      const { joins, leaves } = {
        joins: this.transformState(diff2.joins),
        leaves: this.transformState(diff2.leaves)
      };
      if (!onJoin) {
        onJoin = () => {
        };
      }
      if (!onLeave) {
        onLeave = () => {
        };
      }
      this.map(joins, (key, newPresences) => {
        var _a2;
        const currentPresences = (_a2 = state[key]) !== null && _a2 !== void 0 ? _a2 : [];
        state[key] = this.cloneDeep(newPresences);
        if (currentPresences.length > 0) {
          const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
          const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
          state[key].unshift(...curPresences);
        }
        onJoin(key, currentPresences, newPresences);
      });
      this.map(leaves, (key, leftPresences) => {
        let currentPresences = state[key];
        if (!currentPresences)
          return;
        const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
        currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
        state[key] = currentPresences;
        onLeave(key, currentPresences, leftPresences);
        if (currentPresences.length === 0)
          delete state[key];
      });
      return state;
    }
    /** @internal */
    static map(obj, func) {
      return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
    }
    /**
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     * @internal
     */
    static transformState(state) {
      state = this.cloneDeep(state);
      return Object.getOwnPropertyNames(state).reduce((newState, key) => {
        const presences = state[key];
        if ("metas" in presences) {
          newState[key] = presences.metas.map((presence) => {
            presence["presence_ref"] = presence["phx_ref"];
            delete presence["phx_ref"];
            delete presence["phx_ref_prev"];
            return presence;
          });
        } else {
          newState[key] = presences;
        }
        return newState;
      }, {});
    }
    /** @internal */
    static cloneDeep(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    /** @internal */
    onJoin(callback) {
      this.caller.onJoin = callback;
    }
    /** @internal */
    onLeave(callback) {
      this.caller.onLeave = callback;
    }
    /** @internal */
    onSync(callback) {
      this.caller.onSync = callback;
    }
    /** @internal */
    inPendingSyncState() {
      return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
  }
  exports2.default = RealtimePresence2;
})(RealtimePresence);
var transformers = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.toTimestampString = exports2.toArray = exports2.toJson = exports2.toNumber = exports2.toBoolean = exports2.convertCell = exports2.convertColumn = exports2.convertChangeData = exports2.PostgresTypes = void 0;
  var PostgresTypes;
  (function(PostgresTypes2) {
    PostgresTypes2["abstime"] = "abstime";
    PostgresTypes2["bool"] = "bool";
    PostgresTypes2["date"] = "date";
    PostgresTypes2["daterange"] = "daterange";
    PostgresTypes2["float4"] = "float4";
    PostgresTypes2["float8"] = "float8";
    PostgresTypes2["int2"] = "int2";
    PostgresTypes2["int4"] = "int4";
    PostgresTypes2["int4range"] = "int4range";
    PostgresTypes2["int8"] = "int8";
    PostgresTypes2["int8range"] = "int8range";
    PostgresTypes2["json"] = "json";
    PostgresTypes2["jsonb"] = "jsonb";
    PostgresTypes2["money"] = "money";
    PostgresTypes2["numeric"] = "numeric";
    PostgresTypes2["oid"] = "oid";
    PostgresTypes2["reltime"] = "reltime";
    PostgresTypes2["text"] = "text";
    PostgresTypes2["time"] = "time";
    PostgresTypes2["timestamp"] = "timestamp";
    PostgresTypes2["timestamptz"] = "timestamptz";
    PostgresTypes2["timetz"] = "timetz";
    PostgresTypes2["tsrange"] = "tsrange";
    PostgresTypes2["tstzrange"] = "tstzrange";
  })(PostgresTypes = exports2.PostgresTypes || (exports2.PostgresTypes = {}));
  const convertChangeData = (columns, record, options = {}) => {
    var _a2;
    const skipTypes = (_a2 = options.skipTypes) !== null && _a2 !== void 0 ? _a2 : [];
    return Object.keys(record).reduce((acc, rec_key) => {
      acc[rec_key] = (0, exports2.convertColumn)(rec_key, columns, record, skipTypes);
      return acc;
    }, {});
  };
  exports2.convertChangeData = convertChangeData;
  const convertColumn = (columnName, columns, record, skipTypes) => {
    const column = columns.find((x) => x.name === columnName);
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) {
      return (0, exports2.convertCell)(colType, value);
    }
    return noop2(value);
  };
  exports2.convertColumn = convertColumn;
  const convertCell = (type, value) => {
    if (type.charAt(0) === "_") {
      const dataType = type.slice(1, type.length);
      return (0, exports2.toArray)(value, dataType);
    }
    switch (type) {
      case PostgresTypes.bool:
        return (0, exports2.toBoolean)(value);
      case PostgresTypes.float4:
      case PostgresTypes.float8:
      case PostgresTypes.int2:
      case PostgresTypes.int4:
      case PostgresTypes.int8:
      case PostgresTypes.numeric:
      case PostgresTypes.oid:
        return (0, exports2.toNumber)(value);
      case PostgresTypes.json:
      case PostgresTypes.jsonb:
        return (0, exports2.toJson)(value);
      case PostgresTypes.timestamp:
        return (0, exports2.toTimestampString)(value);
      case PostgresTypes.abstime:
      case PostgresTypes.date:
      case PostgresTypes.daterange:
      case PostgresTypes.int4range:
      case PostgresTypes.int8range:
      case PostgresTypes.money:
      case PostgresTypes.reltime:
      case PostgresTypes.text:
      case PostgresTypes.time:
      case PostgresTypes.timestamptz:
      case PostgresTypes.timetz:
      case PostgresTypes.tsrange:
      case PostgresTypes.tstzrange:
        return noop2(value);
      default:
        return noop2(value);
    }
  };
  exports2.convertCell = convertCell;
  const noop2 = (value) => {
    return value;
  };
  const toBoolean = (value) => {
    switch (value) {
      case "t":
        return true;
      case "f":
        return false;
      default:
        return value;
    }
  };
  exports2.toBoolean = toBoolean;
  const toNumber = (value) => {
    if (typeof value === "string") {
      const parsedValue = parseFloat(value);
      if (!Number.isNaN(parsedValue)) {
        return parsedValue;
      }
    }
    return value;
  };
  exports2.toNumber = toNumber;
  const toJson = (value) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.log(`JSON parse error: ${error}`);
        return value;
      }
    }
    return value;
  };
  exports2.toJson = toJson;
  const toArray = (value, type) => {
    if (typeof value !== "string") {
      return value;
    }
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    if (openBrace === "{" && closeBrace === "}") {
      let arr;
      const valTrim = value.slice(1, lastIdx);
      try {
        arr = JSON.parse("[" + valTrim + "]");
      } catch (_) {
        arr = valTrim ? valTrim.split(",") : [];
      }
      return arr.map((val) => (0, exports2.convertCell)(type, val));
    }
    return value;
  };
  exports2.toArray = toArray;
  const toTimestampString = (value) => {
    if (typeof value === "string") {
      return value.replace(" ", "T");
    }
    return value;
  };
  exports2.toTimestampString = toTimestampString;
})(transformers);
(function(exports2) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o2, k2, desc);
  } : function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o2[k2] = m[k];
  });
  var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o2, v) {
    Object.defineProperty(o2, "default", { enumerable: true, value: v });
  } : function(o2, v) {
    o2["default"] = v;
  });
  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.REALTIME_SUBSCRIBE_STATES = exports2.REALTIME_LISTEN_TYPES = exports2.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = void 0;
  const constants_12 = constants$3;
  const push_1 = __importDefault2(push$1);
  const timer_12 = __importDefault2(timer);
  const RealtimePresence_1 = __importDefault2(RealtimePresence);
  const Transformers = __importStar(transformers);
  (function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
  })(exports2.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (exports2.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
  (function(REALTIME_LISTEN_TYPES) {
    REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
    REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
    REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
  })(exports2.REALTIME_LISTEN_TYPES || (exports2.REALTIME_LISTEN_TYPES = {}));
  (function(REALTIME_SUBSCRIBE_STATES) {
    REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
    REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
    REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
    REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
  })(exports2.REALTIME_SUBSCRIBE_STATES || (exports2.REALTIME_SUBSCRIBE_STATES = {}));
  class RealtimeChannel2 {
    constructor(topic, params = { config: {} }, socket) {
      this.topic = topic;
      this.params = params;
      this.socket = socket;
      this.bindings = {};
      this.state = constants_12.CHANNEL_STATES.closed;
      this.joinedOnce = false;
      this.pushBuffer = [];
      this.params.config = Object.assign({
        broadcast: { ack: false, self: false },
        presence: { key: "" }
      }, params.config);
      this.timeout = this.socket.timeout;
      this.joinPush = new push_1.default(this, constants_12.CHANNEL_EVENTS.join, this.params, this.timeout);
      this.rejoinTimer = new timer_12.default(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
      this.joinPush.receive("ok", () => {
        this.state = constants_12.CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this._onClose(() => {
        this.rejoinTimer.reset();
        this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
        this.state = constants_12.CHANNEL_STATES.closed;
        this.socket._remove(this);
      });
      this._onError((reason) => {
        if (this._isLeaving() || this._isClosed()) {
          return;
        }
        this.socket.log("channel", `error ${this.topic}`, reason);
        this.state = constants_12.CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this.joinPush.receive("timeout", () => {
        if (!this._isJoining()) {
          return;
        }
        this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
        this.state = constants_12.CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this._on(constants_12.CHANNEL_EVENTS.reply, {}, (payload, ref2) => {
        this._trigger(this._replyEventName(ref2), payload);
      });
      this.presence = new RealtimePresence_1.default(this);
    }
    /** Subscribe registers your client with the server */
    subscribe(callback, timeout = this.timeout) {
      var _a2, _b;
      if (this.joinedOnce) {
        throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
      } else {
        const { config: { broadcast, presence } } = this.params;
        this._onError((e2) => callback && callback("CHANNEL_ERROR", e2));
        this._onClose(() => callback && callback("CLOSED"));
        const accessTokenPayload = {};
        const config = {
          broadcast,
          presence,
          postgres_changes: (_b = (_a2 = this.bindings.postgres_changes) === null || _a2 === void 0 ? void 0 : _a2.map((r) => r.filter)) !== null && _b !== void 0 ? _b : []
        };
        if (this.socket.accessToken) {
          accessTokenPayload.access_token = this.socket.accessToken;
        }
        this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
        this.joinedOnce = true;
        this._rejoin(timeout);
        this.joinPush.receive("ok", ({ postgres_changes: serverPostgresFilters }) => {
          var _a3;
          this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
          if (serverPostgresFilters === void 0) {
            callback && callback("SUBSCRIBED");
            return;
          } else {
            const clientPostgresBindings = this.bindings.postgres_changes;
            const bindingsLen = (_a3 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a3 !== void 0 ? _a3 : 0;
            const newPostgresBindings = [];
            for (let i = 0; i < bindingsLen; i++) {
              const clientPostgresBinding = clientPostgresBindings[i];
              const { filter: { event, schema, table, filter } } = clientPostgresBinding;
              const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i];
              if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
              } else {
                this.unsubscribe();
                callback && callback("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                return;
              }
            }
            this.bindings.postgres_changes = newPostgresBindings;
            callback && callback("SUBSCRIBED");
            return;
          }
        }).receive("error", (error) => {
          callback && callback("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
          return;
        }).receive("timeout", () => {
          callback && callback("TIMED_OUT");
          return;
        });
      }
      return this;
    }
    presenceState() {
      return this.presence.state;
    }
    track(payload, opts = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        return yield this.send({
          type: "presence",
          event: "track",
          payload
        }, opts.timeout || this.timeout);
      });
    }
    untrack(opts = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        return yield this.send({
          type: "presence",
          event: "untrack"
        }, opts);
      });
    }
    on(type, filter, callback) {
      return this._on(type, filter, callback);
    }
    send(payload, opts = {}) {
      return new Promise((resolve2) => {
        var _a2, _b, _c;
        const push2 = this._pushEvent(payload.type, payload, opts.timeout || this.timeout);
        if (push2.rateLimited) {
          resolve2("rate limited");
        }
        if (payload.type === "broadcast" && !((_c = (_b = (_a2 = this.params) === null || _a2 === void 0 ? void 0 : _a2.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
          resolve2("ok");
        }
        push2.receive("ok", () => resolve2("ok"));
        push2.receive("timeout", () => resolve2("timed out"));
      });
    }
    updateJoinPayload(payload) {
      this.joinPush.updatePayload(payload);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     */
    unsubscribe(timeout = this.timeout) {
      this.state = constants_12.CHANNEL_STATES.leaving;
      const onClose = () => {
        this.socket.log("channel", `leave ${this.topic}`);
        this._trigger(constants_12.CHANNEL_EVENTS.close, "leave", this._joinRef());
      };
      this.rejoinTimer.reset();
      this.joinPush.destroy();
      return new Promise((resolve2) => {
        const leavePush = new push_1.default(this, constants_12.CHANNEL_EVENTS.leave, {}, timeout);
        leavePush.receive("ok", () => {
          onClose();
          resolve2("ok");
        }).receive("timeout", () => {
          onClose();
          resolve2("timed out");
        }).receive("error", () => {
          resolve2("error");
        });
        leavePush.send();
        if (!this._canPush()) {
          leavePush.trigger("ok", {});
        }
      });
    }
    /** @internal */
    _pushEvent(event, payload, timeout = this.timeout) {
      if (!this.joinedOnce) {
        throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
      }
      let pushEvent = new push_1.default(this, event, payload, timeout);
      if (this._canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling before dispatching to the channel callbacks.
     * Must return the payload, modified or unmodified.
     *
     * @internal
     */
    _onMessage(_event, payload, _ref) {
      return payload;
    }
    /** @internal */
    _isMember(topic) {
      return this.topic === topic;
    }
    /** @internal */
    _joinRef() {
      return this.joinPush.ref;
    }
    /** @internal */
    _trigger(type, payload, ref2) {
      var _a2, _b;
      const typeLower = type.toLocaleLowerCase();
      const { close, error, leave, join } = constants_12.CHANNEL_EVENTS;
      const events = [close, error, leave, join];
      if (ref2 && events.indexOf(typeLower) >= 0 && ref2 !== this._joinRef()) {
        return;
      }
      let handledPayload = this._onMessage(typeLower, payload, ref2);
      if (payload && !handledPayload) {
        throw "channel onMessage callbacks must return the payload, modified or unmodified";
      }
      if (["insert", "update", "delete"].includes(typeLower)) {
        (_a2 = this.bindings.postgres_changes) === null || _a2 === void 0 ? void 0 : _a2.filter((bind) => {
          var _a3, _b2, _c;
          return ((_a3 = bind.filter) === null || _a3 === void 0 ? void 0 : _a3.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
        }).map((bind) => bind.callback(handledPayload, ref2));
      } else {
        (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
          var _a3, _b2, _c, _d, _e, _f;
          if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
            if ("id" in bind) {
              const bindId = bind.id;
              const bindEvent = (_a3 = bind.filter) === null || _a3 === void 0 ? void 0 : _a3.event;
              return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
            } else {
              const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
              return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
            }
          } else {
            return bind.type.toLocaleLowerCase() === typeLower;
          }
        }).map((bind) => {
          if (typeof handledPayload === "object" && "ids" in handledPayload) {
            const postgresChanges = handledPayload.data;
            const { schema, table, commit_timestamp, type: type2, errors: errors2 } = postgresChanges;
            const enrichedPayload = {
              schema,
              table,
              commit_timestamp,
              eventType: type2,
              new: {},
              old: {},
              errors: errors2
            };
            handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
          }
          bind.callback(handledPayload, ref2);
        });
      }
    }
    /** @internal */
    _isClosed() {
      return this.state === constants_12.CHANNEL_STATES.closed;
    }
    /** @internal */
    _isJoined() {
      return this.state === constants_12.CHANNEL_STATES.joined;
    }
    /** @internal */
    _isJoining() {
      return this.state === constants_12.CHANNEL_STATES.joining;
    }
    /** @internal */
    _isLeaving() {
      return this.state === constants_12.CHANNEL_STATES.leaving;
    }
    /** @internal */
    _replyEventName(ref2) {
      return `chan_reply_${ref2}`;
    }
    /** @internal */
    _on(type, filter, callback) {
      const typeLower = type.toLocaleLowerCase();
      const binding = {
        type: typeLower,
        filter,
        callback
      };
      if (this.bindings[typeLower]) {
        this.bindings[typeLower].push(binding);
      } else {
        this.bindings[typeLower] = [binding];
      }
      return this;
    }
    /** @internal */
    _off(type, filter) {
      const typeLower = type.toLocaleLowerCase();
      this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
        var _a2;
        return !(((_a2 = bind.type) === null || _a2 === void 0 ? void 0 : _a2.toLocaleLowerCase()) === typeLower && RealtimeChannel2.isEqual(bind.filter, filter));
      });
      return this;
    }
    /** @internal */
    static isEqual(obj1, obj2) {
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }
      for (const k in obj1) {
        if (obj1[k] !== obj2[k]) {
          return false;
        }
      }
      return true;
    }
    /** @internal */
    _rejoinUntilConnected() {
      this.rejoinTimer.scheduleTimeout();
      if (this.socket.isConnected()) {
        this._rejoin();
      }
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */
    _onClose(callback) {
      this._on(constants_12.CHANNEL_EVENTS.close, {}, callback);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */
    _onError(callback) {
      this._on(constants_12.CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
    }
    /**
     * Returns `true` if the socket is connected and the channel has been joined.
     *
     * @internal
     */
    _canPush() {
      return this.socket.isConnected() && this._isJoined();
    }
    /** @internal */
    _rejoin(timeout = this.timeout) {
      if (this._isLeaving()) {
        return;
      }
      this.socket._leaveOpenTopic(this.topic);
      this.state = constants_12.CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    /** @internal */
    _getPayloadRecords(payload) {
      const records = {
        new: {},
        old: {}
      };
      if (payload.type === "INSERT" || payload.type === "UPDATE") {
        records.new = Transformers.convertChangeData(payload.columns, payload.record);
      }
      if (payload.type === "UPDATE" || payload.type === "DELETE") {
        records.old = Transformers.convertChangeData(payload.columns, payload.old_record);
      }
      return records;
    }
  }
  exports2.default = RealtimeChannel2;
})(RealtimeChannel);
var __awaiter$9 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(RealtimeClient$1, "__esModule", { value: true });
let { URLSearchParams: URLSearchParams$2 } = wechaturlParse;
const constants_1$3 = constants$3;
const timer_1 = __importDefault$2(timer);
const serializer_1 = __importDefault$2(serializer);
const RealtimeChannel_1 = __importDefault$2(RealtimeChannel);
const noop = () => {
};
class RealtimeClient {
  /**
   * Initializes the Socket.
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket.
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers The optional headers to pass when connecting.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   */
  constructor(endPoint, options) {
    var _a2;
    this.accessToken = null;
    this.channels = [];
    this.endPoint = "";
    this.headers = constants_1$3.DEFAULT_HEADERS;
    this.params = {};
    this.timeout = constants_1$3.DEFAULT_TIMEOUT;
    this.transport = null;
    this.heartbeatIntervalMs = 3e4;
    this.heartbeatTimer = void 0;
    this.pendingHeartbeatRef = null;
    this.ref = 0;
    this.logger = noop;
    this.conn = null;
    this.sendBuffer = [];
    this.serializer = new serializer_1.default();
    this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    };
    this.eventsPerSecondLimitMs = 100;
    this.inThrottle = false;
    this.endPoint = `${endPoint}/${constants_1$3.TRANSPORTS.websocket}`;
    if (options === null || options === void 0 ? void 0 : options.params)
      this.params = options.params;
    if (options === null || options === void 0 ? void 0 : options.headers)
      this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
    if (options === null || options === void 0 ? void 0 : options.timeout)
      this.timeout = options.timeout;
    if (options === null || options === void 0 ? void 0 : options.logger)
      this.logger = options.logger;
    if (options === null || options === void 0 ? void 0 : options.transport)
      this.transport = options.transport;
    if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs)
      this.heartbeatIntervalMs = options.heartbeatIntervalMs;
    const eventsPerSecond = (_a2 = options === null || options === void 0 ? void 0 : options.params) === null || _a2 === void 0 ? void 0 : _a2.eventsPerSecond;
    if (eventsPerSecond)
      this.eventsPerSecondLimitMs = Math.floor(1e3 / eventsPerSecond);
    this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : (tries) => {
      return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
    };
    this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback) => {
      return callback(JSON.stringify(payload));
    };
    this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
    this.reconnectTimer = new timer_1.default(() => __awaiter$9(this, void 0, void 0, function* () {
      this.disconnect();
      this.connect();
    }), this.reconnectAfterMs);
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (this.conn) {
      return;
    }
    this.conn = wx$1.connectSocket({ url: this._endPointURL(), header: this.headers });
    if (this.conn) {
      this.conn.binaryType = "arraybuffer";
      this.conn.onOpen((res) => {
        this._onConnOpen();
      });
      this.conn.onClose((event) => {
        this._onConnClose(event);
      });
      this.conn.onError((error) => {
        this._onConnError(error);
      });
      this.conn.onMessage((event) => {
        this._onConnMessage(event);
      });
    }
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(code, reason) {
    if (this.conn) {
      this.conn.onClose = function() {
      };
      if (code) {
        this.conn.close({
          success(data) {
          }
        });
      } else {
        this.conn.close();
      }
      this.conn = null;
      this.heartbeatTimer && clearInterval(this.heartbeatTimer);
      this.reconnectTimer.reset();
    }
  }
  /**
   * Returns all created channels
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Unsubscribes and removes a single channel
   * @param channel A RealtimeChannel instance
   */
  removeChannel(channel) {
    return channel.unsubscribe().then((status) => {
      if (this.channels.length === 0) {
        this.disconnect();
      }
      return status;
    });
  }
  /**
   * Unsubscribes and removes all channels
   */
  removeAllChannels() {
    return Promise.all(this.channels.map((channel) => channel.unsubscribe())).then((values) => {
      this.disconnect();
      return values;
    });
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(kind, msg, data) {
    this.logger(kind, msg, data);
  }
  /**
   * Returns the current state of the socket.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case constants_1$3.SOCKET_STATES.connecting:
        return constants_1$3.CONNECTION_STATE.Connecting;
      case constants_1$3.SOCKET_STATES.open:
        return constants_1$3.CONNECTION_STATE.Open;
      case constants_1$3.SOCKET_STATES.closing:
        return constants_1$3.CONNECTION_STATE.Closing;
      default:
        return constants_1$3.CONNECTION_STATE.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === constants_1$3.CONNECTION_STATE.Open;
  }
  channel(topic, params = { config: {} }) {
    if (!this.isConnected()) {
      this.connect();
    }
    const chan = new RealtimeChannel_1.default(`realtime:${topic}`, params, this);
    this.channels.push(chan);
    return chan;
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(data) {
    const { topic, event, payload, ref: ref2 } = data;
    let callback = () => {
      this.encode(data, (result) => {
        var _a2;
        (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.send({
          data: result
        });
      });
    };
    this.log("push", `${topic} ${event} (${ref2})`, payload);
    if (this.isConnected()) {
      if (["broadcast", "presence", "postgres_changes"].includes(event)) {
        const isThrottled = this._throttle(callback)();
        if (isThrottled) {
          return "rate limited";
        }
      } else {
        callback();
      }
    } else {
      this.sendBuffer.push(callback);
    }
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * @param token A JWT string.
   */
  setAuth(token) {
    this.accessToken = token;
    this.channels.forEach((channel) => {
      token && channel.updateJoinPayload({ access_token: token });
      if (channel.joinedOnce && channel._isJoined()) {
        channel._pushEvent(constants_1$3.CHANNEL_EVENTS.access_token, { access_token: token });
      }
    });
  }
  /**
   * Return the next message ref, accounting for overflows
   *
   * @internal
   */
  _makeRef() {
    let newRef = this.ref + 1;
    if (newRef === this.ref) {
      this.ref = 0;
    } else {
      this.ref = newRef;
    }
    return this.ref.toString();
  }
  /**
   * Unsubscribe from channels with the specified topic.
   *
   * @internal
   */
  _leaveOpenTopic(topic) {
    let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
    if (dupChannel) {
      this.log("transport", `leaving duplicate topic "${topic}"`);
      dupChannel.unsubscribe();
    }
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   *
   * @internal
   */
  _remove(channel) {
    this.channels = this.channels.filter((c) => c._joinRef() !== channel._joinRef());
  }
  /**
   * Returns the URL of the websocket.
   *
   * @internal
   */
  _endPointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: constants_1$3.VSN }));
  }
  /** @internal */
  _onConnMessage(rawMessage) {
    this.decode(rawMessage.data, (msg) => {
      let { topic, event, payload, ref: ref2 } = msg;
      if (ref2 && ref2 === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
        this.pendingHeartbeatRef = null;
      }
      this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref2 && "(" + ref2 + ")" || ""}`, payload);
      this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref2));
      this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
    });
  }
  /** @internal */
  _onConnOpen() {
    this.log("transport", `connected to ${this._endPointURL()}`);
    this._flushSendBuffer();
    this.reconnectTimer.reset();
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
    this.stateChangeCallbacks.open.forEach((callback) => callback());
  }
  /** @internal */
  _onConnClose(event) {
    this.log("transport", "close", event);
    this._triggerChanError();
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.reconnectTimer.scheduleTimeout();
    this.stateChangeCallbacks.close.forEach((callback) => callback(event));
  }
  /** @internal */
  _onConnError(error) {
    this.log("transport", error.message);
    this._triggerChanError();
    this.stateChangeCallbacks.error.forEach((callback) => callback(error));
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach((channel) => channel._trigger(constants_1$3.CHANNEL_EVENTS.error));
  }
  /** @internal */
  _appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }
    const prefix = url.match(/\?/) ? "&" : "?";
    const query = new URLSearchParams$2(params);
    return `${url}${prefix}${query}`;
  }
  /** @internal */
  _flushSendBuffer() {
    if (this.isConnected() && this.sendBuffer.length > 0) {
      this.sendBuffer.forEach((callback) => callback());
      this.sendBuffer = [];
    }
  }
  /** @internal */
  _sendHeartbeat() {
    var _a2;
    if (!this.isConnected()) {
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null;
      this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      (_a2 = this.conn) === null || _a2 === void 0 ? void 0 : _a2.close(constants_1$3.WS_CLOSE_NORMAL, "hearbeat timeout");
      return;
    }
    this.pendingHeartbeatRef = this._makeRef();
    this.push({
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    this.setAuth(this.accessToken);
  }
  /** @internal */
  _throttle(callback, eventsPerSecondLimitMs = this.eventsPerSecondLimitMs) {
    return () => {
      if (this.inThrottle)
        return true;
      callback();
      if (eventsPerSecondLimitMs > 0) {
        this.inThrottle = true;
        setTimeout(() => {
          this.inThrottle = false;
        }, eventsPerSecondLimitMs);
      }
      return false;
    };
  }
}
RealtimeClient$1.default = RealtimeClient;
(function(exports2) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o2, k2, desc);
  } : function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o2[k2] = m[k];
  });
  var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o2, v) {
    Object.defineProperty(o2, "default", { enumerable: true, value: v });
  } : function(o2, v) {
    o2["default"] = v;
  });
  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.REALTIME_SUBSCRIBE_STATES = exports2.REALTIME_PRESENCE_LISTEN_EVENTS = exports2.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = exports2.REALTIME_LISTEN_TYPES = exports2.RealtimeClient = exports2.RealtimeChannel = exports2.RealtimePresence = void 0;
  const RealtimeClient_1 = __importDefault2(RealtimeClient$1);
  exports2.RealtimeClient = RealtimeClient_1.default;
  const RealtimeChannel_12 = __importStar(RealtimeChannel);
  exports2.RealtimeChannel = RealtimeChannel_12.default;
  Object.defineProperty(exports2, "REALTIME_LISTEN_TYPES", { enumerable: true, get: function() {
    return RealtimeChannel_12.REALTIME_LISTEN_TYPES;
  } });
  Object.defineProperty(exports2, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", { enumerable: true, get: function() {
    return RealtimeChannel_12.REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
  } });
  Object.defineProperty(exports2, "REALTIME_SUBSCRIBE_STATES", { enumerable: true, get: function() {
    return RealtimeChannel_12.REALTIME_SUBSCRIBE_STATES;
  } });
  const RealtimePresence_1 = __importStar(RealtimePresence);
  exports2.RealtimePresence = RealtimePresence_1.default;
  Object.defineProperty(exports2, "REALTIME_PRESENCE_LISTEN_EVENTS", { enumerable: true, get: function() {
    return RealtimePresence_1.REALTIME_PRESENCE_LISTEN_EVENTS;
  } });
})(src$2);
var src$1 = {};
var StorageClient$1 = {};
var StorageFileApi$1 = {};
var errors$1 = {};
Object.defineProperty(errors$1, "__esModule", { value: true });
errors$1.StorageUnknownError = errors$1.StorageApiError = errors$1.isStorageError = errors$1.StorageError = void 0;
class StorageError extends Error {
  constructor(message) {
    super(message);
    this.__isStorageError = true;
    this.name = "StorageError";
  }
}
errors$1.StorageError = StorageError;
function isStorageError(error) {
  return typeof error === "object" && error !== null && "__isStorageError" in error;
}
errors$1.isStorageError = isStorageError;
class StorageApiError extends StorageError {
  constructor(message, status) {
    super(message);
    this.name = "StorageApiError";
    this.status = status;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
}
errors$1.StorageApiError = StorageApiError;
class StorageUnknownError extends StorageError {
  constructor(message, originalError) {
    super(message);
    this.name = "StorageUnknownError";
    this.originalError = originalError;
  }
}
errors$1.StorageUnknownError = StorageUnknownError;
var fetch$3 = {};
var helpers$2 = {};
var __awaiter$8 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(helpers$2, "__esModule", { value: true });
helpers$2.resolveResponse = helpers$2.resolveFetch = void 0;
const resolveFetch$1 = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined")
    ;
  else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
helpers$2.resolveFetch = resolveFetch$1;
const resolveResponse = () => __awaiter$8(void 0, void 0, void 0, function* () {
  return Response;
});
helpers$2.resolveResponse = resolveResponse;
var __awaiter$7 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(fetch$3, "__esModule", { value: true });
fetch$3.remove = fetch$3.put = fetch$3.post = fetch$3.get = void 0;
const errors_1$5 = errors$1;
const helpers_1$7 = helpers$2;
const _getErrorMessage$1 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError$1 = (error, reject) => __awaiter$7(void 0, void 0, void 0, function* () {
  const Res = yield (0, helpers_1$7.resolveResponse)();
  if (error instanceof Res) {
    error.json().then((err) => {
      reject(new errors_1$5.StorageApiError(_getErrorMessage$1(err), error.status || 500));
    });
  } else {
    reject(new errors_1$5.StorageUnknownError(_getErrorMessage$1(error), error));
  }
});
const _getRequestParams$1 = (method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "application/json" }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest$1(fetcher, method, url, options, parameters, body) {
  return __awaiter$7(this, void 0, void 0, function* () {
    return new Promise((resolve2, reject) => {
      fetcher(url, _getRequestParams$1(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        return result;
      }).then((data) => resolve2(data)).catch((error) => handleError$1(error, reject));
    });
  });
}
function get(fetcher, url, options, parameters) {
  return __awaiter$7(this, void 0, void 0, function* () {
    return _handleRequest$1(fetcher, "GET", url, options, parameters);
  });
}
fetch$3.get = get;
function post(fetcher, url, body, options, parameters) {
  return __awaiter$7(this, void 0, void 0, function* () {
    return _handleRequest$1(fetcher, "POST", url, options, parameters, body);
  });
}
fetch$3.post = post;
function put(fetcher, url, body, options, parameters) {
  return __awaiter$7(this, void 0, void 0, function* () {
    return _handleRequest$1(fetcher, "PUT", url, options, parameters, body);
  });
}
fetch$3.put = put;
function remove(fetcher, url, body, options, parameters) {
  return __awaiter$7(this, void 0, void 0, function* () {
    return _handleRequest$1(fetcher, "DELETE", url, options, parameters, body);
  });
}
fetch$3.remove = remove;
var mimeMap;
var hasRequiredMimeMap;
function requireMimeMap() {
  if (hasRequiredMimeMap)
    return mimeMap;
  hasRequiredMimeMap = 1;
  mimeMap = {
    1e-3: "application/x-001",
    0.323: "text/h323",
    0.907: "drawing/907",
    ".acp": "audio/x-mei-aac",
    ".aif": "audio/aiff",
    ".aiff": "audio/aiff",
    ".asa": "text/asa",
    ".asp": "text/asp",
    ".au": "audio/basic",
    ".awf": "application/vnd.adobe.workflow",
    ".bmp": "application/x-bmp",
    ".c4t": "application/x-c4t",
    ".cal": "application/x-cals",
    ".cdf": "application/x-netcdf",
    ".cel": "application/x-cel",
    ".cg4": "application/x-g4",
    ".cit": "application/x-cit",
    ".cml": "text/xml",
    ".cmx": "application/x-cmx",
    ".crl": "application/pkix-crl",
    ".csi": "application/x-csi",
    ".cut": "application/x-cut",
    ".dbm": "application/x-dbm",
    ".dcd": "text/xml",
    ".der": "application/x-x509-ca-cert",
    ".dib": "application/x-dib",
    ".doc": "application/msword",
    ".drw": "application/x-drw",
    ".dwf": "Model/vnd.dwf",
    ".dwg": "application/x-dwg",
    ".dxf": "application/x-dxf",
    ".emf": "application/x-emf",
    ".ent": "text/xml",
    ".eps": "application/x-ps",
    ".etd": "application/x-ebx",
    ".fax": "image/fax",
    ".fif": "application/fractals",
    ".frm": "application/x-frm",
    ".gbr": "application/x-gbr",
    ".gif": "image/gif",
    ".gp4": "application/x-gp4",
    ".hmr": "application/x-hmr",
    ".hpl": "application/x-hpl",
    ".hrf": "application/x-hrf",
    ".htc": "text/x-component",
    ".html": "text/html",
    ".htx": "text/html",
    ".ico": "image/x-icon",
    ".iff": "application/x-iff",
    ".igs": "application/x-igs",
    ".img": "application/x-img",
    ".isp": "application/x-internet-signup",
    ".java": "java/*",
    ".jpe": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".jpg": "application/x-jpg",
    ".jsp": "text/html",
    ".lar": "application/x-laplayer-reg",
    ".lavs": "audio/x-liquid-secure",
    ".lmsff": "audio/x-la-lms",
    ".ltr": "application/x-ltr",
    ".m2v": "video/x-mpeg",
    ".m4e": "video/mpeg4",
    ".man": "application/x-troff-man",
    ".mdb": "application/msaccess",
    ".mfp": "application/x-shockwave-flash",
    ".mhtml": "message/rfc822",
    ".mid": "audio/mid",
    ".mil": "application/x-mil",
    ".mnd": "audio/x-musicnet-download",
    ".mocha": "application/x-javascript",
    ".mp1": "audio/mp1",
    ".mp2v": "video/mpeg",
    ".mp4": "video/mpeg4",
    ".mpd": "application/vnd.ms-project",
    ".mpeg": "video/mpg",
    ".mpga": "audio/rn-mpeg",
    ".mps": "video/x-mpeg",
    ".mpv": "video/mpg",
    ".mpw": "application/vnd.ms-project",
    ".mtx": "text/xml",
    ".net": "image/pnetvue",
    ".nws": "message/rfc822",
    ".out": "application/x-out",
    ".p12": "application/x-pkcs12",
    ".p7c": "application/pkcs7-mime",
    ".p7r": "application/x-pkcs7-certreqresp",
    ".pc5": "application/x-pc5",
    ".pcl": "application/x-pcl",
    ".pdf": "application/pdf",
    ".pdx": "application/vnd.adobe.pdx",
    ".pgl": "application/x-pgl",
    ".pko": "application/vnd.ms-pki.pko",
    ".plg": "text/html",
    ".plt": "application/x-plt",
    ".png": "application/x-png",
    ".ppa": "application/vnd.ms-powerpoint",
    ".pps": "application/vnd.ms-powerpoint",
    ".ppt": "application/x-ppt",
    ".prf": "application/pics-rules",
    ".prt": "application/x-prt",
    ".ps": "application/postscript",
    ".pwz": "application/vnd.ms-powerpoint",
    ".ra": "audio/vnd.rn-realaudio",
    ".ras": "application/x-ras",
    ".rdf": "text/xml",
    ".red": "application/x-red",
    ".rjs": "application/vnd.rn-realsystem-rjs",
    ".rlc": "application/x-rlc",
    ".rm": "application/vnd.rn-realmedia",
    ".rmi": "audio/mid",
    ".rmm": "audio/x-pn-realaudio",
    ".rms": "application/vnd.rn-realmedia-secure",
    ".rmx": "application/vnd.rn-realsystem-rmx",
    ".rp": "image/vnd.rn-realpix",
    ".rsml": "application/vnd.rn-rsml",
    ".rtf": "application/msword",
    ".rv": "video/vnd.rn-realvideo",
    ".sat": "application/x-sat",
    ".sdw": "application/x-sdw",
    ".slb": "application/x-slb",
    ".slk": "drawing/x-slk",
    ".smil": "application/smil",
    ".snd": "audio/basic",
    ".sor": "text/plain",
    ".spl": "application/futuresplash",
    ".ssm": "application/streamingmedia",
    ".stl": "application/vnd.ms-pki.stl",
    ".sty": "application/x-sty",
    ".swf": "application/x-shockwave-flash",
    ".tg4": "application/x-tg4",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
    ".top": "drawing/x-top",
    ".tsd": "text/xml",
    ".uin": "application/x-icq",
    ".vcf": "text/x-vcard",
    ".vdx": "application/vnd.visio",
    ".vpg": "application/x-vpeg005",
    ".vsd": "application/x-vsd",
    ".vst": "application/vnd.visio",
    ".vsw": "application/vnd.visio",
    ".vtx": "application/vnd.visio",
    ".wav": "audio/wav",
    ".wb1": "application/x-wb1",
    ".wb3": "application/x-wb3",
    ".wiz": "application/msword",
    ".wk4": "application/x-wk4",
    ".wks": "application/x-wks",
    ".wma": "audio/x-ms-wma",
    ".wmf": "application/x-wmf",
    ".wmv": "video/x-ms-wmv",
    ".wmz": "application/x-ms-wmz",
    ".wpd": "application/x-wpd",
    ".wpl": "application/vnd.ms-wpl",
    ".wr1": "application/x-wr1",
    ".wrk": "application/x-wrk",
    ".ws2": "application/x-ws",
    ".wsdl": "text/xml",
    ".xdp": "application/vnd.adobe.xdp",
    ".xfd": "application/vnd.adobe.xfd",
    ".xhtml": "text/html",
    ".xls": "application/x-xls",
    ".xml": "text/xml",
    ".xq": "text/xml",
    ".xquery": "text/xml",
    ".xsl": "text/xml",
    ".xwd": "application/x-xwd",
    ".sis": "application/vnd.symbian.install",
    ".x_t": "application/x-x_t",
    ".apk": "application/vnd.android.package-archive",
    0.301: "application/x-301",
    0.906: "application/x-906",
    ".a11": "application/x-a11",
    ".ai": "application/postscript",
    ".aifc": "audio/aiff",
    ".anv": "application/x-anv",
    ".asf": "video/x-ms-asf",
    ".asx": "video/x-ms-asf",
    ".avi": "video/avi",
    ".biz": "text/xml",
    ".bot": "application/x-bot",
    ".c90": "application/x-c90",
    ".cat": "application/vnd.ms-pki.seccat",
    ".cdr": "application/x-cdr",
    ".cer": "application/x-x509-ca-cert",
    ".cgm": "application/x-cgm",
    ".class": "java/*",
    ".cmp": "application/x-cmp",
    ".cot": "application/x-cot",
    ".crt": "application/x-x509-ca-cert",
    ".css": "text/css",
    ".dbf": "application/x-dbf",
    ".dbx": "application/x-dbx",
    ".dcx": "application/x-dcx",
    ".dgn": "application/x-dgn",
    ".dll": "application/x-msdownload",
    ".dot": "application/msword",
    ".dtd": "text/xml",
    ".dwf": "application/x-dwf",
    ".dxb": "application/x-dxb",
    ".edn": "application/vnd.adobe.edn",
    ".eml": "message/rfc822",
    ".epi": "application/x-epi",
    ".eps": "application/postscript",
    ".exe": "application/x-msdownload",
    ".fdf": "application/vnd.fdf",
    ".fo": "text/xml",
    ".g4": "application/x-g4",
    ".tif": "image/tiff",
    ".gl2": "application/x-gl2",
    ".hgl": "application/x-hgl",
    ".hpg": "application/x-hpgl",
    ".hqx": "application/mac-binhex40",
    ".hta": "application/hta",
    ".htm": "text/html",
    ".htt": "text/webviewhtml",
    ".icb": "application/x-icb",
    ".ico": "application/x-ico",
    ".ig4": "application/x-g4",
    ".iii": "application/x-iphone",
    ".ins": "application/x-internet-signup",
    ".IVF": "video/x-ivf",
    ".jfif": "image/jpeg",
    ".jpe": "application/x-jpe",
    ".jpg": "image/jpeg",
    ".js": "application/x-javascript",
    ".la1": "audio/x-liquid-file",
    ".latex": "application/x-latex",
    ".lbm": "application/x-lbm",
    ".ls": "application/x-javascript",
    ".m1v": "video/x-mpeg",
    ".m3u": "audio/mpegurl",
    ".mac": "application/x-mac",
    ".math": "text/xml",
    ".mdb": "application/x-mdb",
    ".mht": "message/rfc822",
    ".mi": "application/x-mi",
    ".midi": "audio/mid",
    ".mml": "text/xml",
    ".mns": "audio/x-musicnet-stream",
    ".movie": "video/x-sgi-movie",
    ".mp2": "audio/mp2",
    ".mp3": "audio/mp3",
    ".mpa": "video/x-mpg",
    ".mpe": "video/x-mpeg",
    ".mpg": "video/mpg",
    ".mpp": "application/vnd.ms-project",
    ".mpt": "application/vnd.ms-project",
    ".mpv2": "video/mpeg",
    ".mpx": "application/vnd.ms-project",
    ".mxp": "application/x-mmxp",
    ".nrf": "application/x-nrf",
    ".odc": "text/x-ms-odc",
    ".p10": "application/pkcs10",
    ".p7b": "application/x-pkcs7-certificates",
    ".p7m": "application/pkcs7-mime",
    ".p7s": "application/pkcs7-signature",
    ".pci": "application/x-pci",
    ".pcx": "application/x-pcx",
    ".pdf": "application/pdf",
    ".pfx": "application/x-pkcs12",
    ".pic": "application/x-pic",
    ".pl": "application/x-perl",
    ".pls": "audio/scpls",
    ".png": "image/png",
    ".pot": "application/vnd.ms-powerpoint",
    ".ppm": "application/x-ppm",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pr": "application/x-pr",
    ".prn": "application/x-prn",
    ".ps": "application/x-ps",
    ".ptn": "application/x-ptn",
    ".r3t": "text/vnd.rn-realtext3d",
    ".ram": "audio/x-pn-realaudio",
    ".rat": "application/rat-file",
    ".rec": "application/vnd.rn-recording",
    ".rgb": "application/x-rgb",
    ".rjt": "application/vnd.rn-realsystem-rjt",
    ".rle": "application/x-rle",
    ".rmf": "application/vnd.adobe.rmf",
    ".rmj": "application/vnd.rn-realsystem-rmj",
    ".rmp": "application/vnd.rn-rn_music_package",
    ".rmvb": "application/vnd.rn-realmedia-vbr",
    ".rnx": "application/vnd.rn-realplayer",
    ".rpm": "audio/x-pn-realaudio-plugin",
    ".rt": "text/vnd.rn-realtext",
    ".rtf": "application/x-rtf",
    ".sam": "application/x-sam",
    ".sdp": "application/sdp",
    ".sit": "application/x-stuffit",
    ".sld": "application/x-sld",
    ".smi": "application/smil",
    ".smk": "application/x-smk",
    ".sol": "text/plain",
    ".spc": "application/x-pkcs7-certificates",
    ".spp": "text/xml",
    ".sst": "application/vnd.ms-pki.certstore",
    ".stm": "text/html",
    ".svg": "text/xml",
    ".tdf": "application/x-tdf",
    ".tga": "application/x-tga",
    ".tif": "application/x-tif",
    ".tld": "text/xml",
    ".torrent": "application/x-bittorrent",
    ".txt": "text/plain",
    ".uls": "text/iuls",
    ".vda": "application/x-vda",
    ".vml": "text/xml",
    ".vsd": "application/vnd.visio",
    ".vss": "application/vnd.visio",
    ".vst": "application/x-vst",
    ".vsx": "application/vnd.visio",
    ".vxml": "text/xml",
    ".wax": "audio/x-ms-wax",
    ".wb2": "application/x-wb2",
    ".wbmp": "image/vnd.wap.wbmp",
    ".wk3": "application/x-wk3",
    ".wkq": "application/x-wkq",
    ".wm": "video/x-ms-wm",
    ".wmd": "application/x-ms-wmd",
    ".wml": "text/vnd.wap.wml",
    ".wmx": "video/x-ms-wmx",
    ".wp6": "application/x-wp6",
    ".wpg": "application/x-wpg",
    ".wq1": "application/x-wq1",
    ".wri": "application/x-wri",
    ".ws": "application/x-ws",
    ".wsc": "text/scriptlet",
    ".wvx": "video/x-ms-wvx",
    ".xdr": "text/xml",
    ".xfdf": "application/vnd.adobe.xfdf",
    ".xls": "application/vnd.ms-excel",
    ".xlw": "application/x-xlw",
    ".xpl": "audio/scpls",
    ".xql": "text/xml",
    ".xsd": "text/xml",
    ".xslt": "text/xml",
    ".x_b": "application/x-x_b",
    ".sisx": "application/vnd.symbian.install",
    ".ipa": "application/vnd.iphone",
    ".xap": "application/x-silverlight-app",
    ".zip": "application/x-zip-compressed"
  };
  return mimeMap;
}
var formData;
var hasRequiredFormData;
function requireFormData() {
  if (hasRequiredFormData)
    return formData;
  hasRequiredFormData = 1;
  const mimeMap2 = requireMimeMap();
  function FormData2() {
    let fileManager = wx$1.getFileSystemManager();
    let data = {};
    let files = [];
    this.append = (name, value) => {
      data[name] = value;
      return true;
    };
    this.appendFile = (name, path, fileName) => {
      let buffer2 = fileManager.readFileSync(path);
      if (Object.prototype.toString.call(buffer2).indexOf("ArrayBuffer") < 0) {
        return false;
      }
      if (!fileName) {
        fileName = getFileNameFromPath(path);
      }
      files.push({
        name,
        buffer: buffer2,
        fileName
      });
      return true;
    };
    this.getData = () => convert(data, files);
  }
  function getFileNameFromPath(path) {
    let idx = path.lastIndexOf("/");
    return path.substr(idx + 1);
  }
  function convert(data, files) {
    let boundaryKey = "wxmpFormBoundary" + randString();
    let boundary = "--" + boundaryKey;
    let endBoundary = boundary + "--";
    let postArray = [];
    if (data && Object.prototype.toString.call(data) == "[object Object]") {
      for (let key in data) {
        postArray = postArray.concat(formDataArray(boundary, key, data[key]));
      }
    }
    if (files && Object.prototype.toString.call(files) == "[object Array]") {
      for (let i in files) {
        let file = files[i];
        postArray = postArray.concat(formDataArray(boundary, file.name, file.buffer, file.fileName));
      }
    }
    let endBoundaryArray = [];
    endBoundaryArray.push(...endBoundary.toUtf8Bytes());
    postArray = postArray.concat(endBoundaryArray);
    return {
      contentType: "multipart/form-data; boundary=" + boundaryKey,
      buffer: new Uint8Array(postArray).buffer
    };
  }
  function randString() {
    let res = "";
    for (let i = 0; i < 17; i++) {
      let n2 = parseInt(Math.random() * 62);
      if (n2 <= 9) {
        res += n2;
      } else if (n2 <= 35) {
        res += String.fromCharCode(n2 + 55);
      } else {
        res += String.fromCharCode(n2 + 61);
      }
    }
    return res;
  }
  function formDataArray(boundary, name, value, fileName) {
    let dataString = "";
    let isFile = !!fileName;
    dataString += boundary + "\r\n";
    dataString += 'Content-Disposition: form-data; name="' + name + '"';
    if (isFile) {
      dataString += '; filename="' + fileName + '"\r\n';
      dataString += "Content-Type: " + getFileMime(fileName) + "\r\n\r\n";
    } else {
      dataString += "\r\n\r\n";
      dataString += value;
    }
    var dataArray = [];
    dataArray.push(...dataString.toUtf8Bytes());
    if (isFile) {
      let fileArray = new Uint8Array(value);
      dataArray = dataArray.concat(Array.prototype.slice.call(fileArray));
    }
    dataArray.push(..."\r".toUtf8Bytes());
    dataArray.push(..."\n".toUtf8Bytes());
    return dataArray;
  }
  function getFileMime(fileName) {
    let idx = fileName.lastIndexOf(".");
    let mime = mimeMap2[fileName.substr(idx)];
    return mime ? mime : "application/octet-stream";
  }
  String.prototype.toUtf8Bytes = function() {
    var str = this;
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
      bytes.push(...str.utf8CodeAt(i));
      if (str.codePointAt(i) > 65535) {
        i++;
      }
    }
    return bytes;
  };
  String.prototype.utf8CodeAt = function(i) {
    var str = this;
    var out = [], p2 = 0;
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p2++] = c;
    } else if (c < 2048) {
      out[p2++] = c >> 6 | 192;
      out[p2++] = c & 63 | 128;
    } else if ((c & 64512) == 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) == 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p2++] = c >> 18 | 240;
      out[p2++] = c >> 12 & 63 | 128;
      out[p2++] = c >> 6 & 63 | 128;
      out[p2++] = c & 63 | 128;
    } else {
      out[p2++] = c >> 12 | 224;
      out[p2++] = c >> 6 & 63 | 128;
      out[p2++] = c & 63 | 128;
    }
    return out;
  };
  formData = FormData2;
  return formData;
}
var __awaiter$6 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(StorageFileApi$1, "__esModule", { value: true });
const errors_1$4 = errors$1;
const fetch_1$4 = fetch$3;
const helpers_1$6 = helpers$2;
const DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
};
const DEFAULT_FILE_OPTIONS = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: false
};
class StorageFileApi {
  constructor(url, headers = {}, bucketId, fetch2) {
    this.url = url;
    this.headers = headers;
    this.bucketId = bucketId;
    this.fetch = (0, helpers_1$6.resolveFetch)(fetch2);
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(method, path, fileBody, fileOptions) {
    return __awaiter$6(this, void 0, void 0, function* () {
      try {
        let body;
        const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
        const headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options.upsert) });
        const cleanPath = this._removeEmptyFolders(path);
        const _path = this._getFinalPath(cleanPath);
        const FormData2 = requireFormData();
        let formData2 = new FormData2();
        formData2.append("name", "value");
        formData2.appendFile("file", fileBody.tempFilePath, path);
        let data = formData2.getData();
        headers["cache-control"] = `max-age=${options.cacheControl}`;
        headers["content-type"] = data.contentType;
        const res = yield this.fetch(`${this.url}/object/${_path}`, {
          method,
          body: data.buffer,
          headers
        });
        if (res.ok) {
          return {
            data: { path: cleanPath },
            error: null
          };
        } else {
          const error = res;
          return { data: null, error };
        }
      } catch (error) {
        if ((0, errors_1$4.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Uploads a file to an existing bucket.
   *
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  upload(path, fileBody, fileOptions) {
    return __awaiter$6(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  update(path, fileBody, fileOptions) {
    return __awaiter$6(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
    });
  }
  /**
   * Moves an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   */
  move(fromPath, toPath) {
    return __awaiter$6(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$4.post)(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$4.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Copies an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
   */
  copy(fromPath, toPath) {
    return __awaiter$6(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$4.post)(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
        return { data: { path: data.Key }, error: null };
      } catch (error) {
        if ((0, errors_1$4.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  createSignedUrl(path, expiresIn, options) {
    return __awaiter$6(this, void 0, void 0, function* () {
      try {
        let _path = this._getFinalPath(path);
        let data = yield (0, fetch_1$4.post)(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, (options === null || options === void 0 ? void 0 : options.transform) ? { transform: options.transform } : {}), { headers: this.headers });
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
        const signedUrl = encodeURI(`${this.url}${data.data.signedURL}${downloadQueryParam}`);
        data = { signedUrl };
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$4.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
   * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   */
  createSignedUrls(paths, expiresIn, options) {
    return __awaiter$6(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$4.post)(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
        return {
          data: data.data.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
          error: null
        };
      } catch (error) {
        if ((0, errors_1$4.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Downloads a file.
   *
   * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
   * @param options.transform Transform the asset before serving it to the client.
   */
  download(path, options) {
    return __awaiter$6(this, void 0, void 0, function* () {
      const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
      const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
      const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
      const queryString = transformationQuery ? `?${transformationQuery}` : "";
      try {
        const _path = this._getFinalPath(path);
        const res = yield (0, fetch_1$4.get)(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
          headers: this.headers,
          noResolveJson: true
        });
        const data = yield res;
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$4.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the URL for an asset in a public bucket.
   * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
   *
   * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
   * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  getPublicUrl(path, options) {
    const _path = this._getFinalPath(path);
    const _queryString = [];
    const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? "" : options.download}` : "";
    if (downloadQueryParam !== "") {
      _queryString.push(downloadQueryParam);
    }
    const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
    const renderPath = wantsTransformation ? "render/image" : "object";
    const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
    if (transformationQuery !== "") {
      _queryString.push(transformationQuery);
    }
    let queryString = _queryString.join("&");
    if (queryString !== "") {
      queryString = `?${queryString}`;
    }
    return {
      data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) }
    };
  }
  /**
   * Deletes files within the same bucket
   *
   * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
   */
  remove(paths) {
    return __awaiter$6(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$4.remove)(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$4.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Get file metadata
   * @param id the file id to retrieve metadata
   */
  // async getMetadata(
  //   id: string
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Update file metadata
   * @param id the file id to update metadata
   * @param meta the new file metadata
   */
  // async updateMetadata(
  //   id: string,
  //   meta: Metadata
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await post(
  //       this.fetch,
  //       `${this.url}/metadata/${id}`,
  //       { ...meta },
  //       { headers: this.headers }
  //     )
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Lists all the files within a bucket.
   * @param path The folder path.
   */
  list(path, options, parameters) {
    return __awaiter$6(this, void 0, void 0, function* () {
      try {
        const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || "" });
        const data = yield (0, fetch_1$4.post)(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$4.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  _getFinalPath(path) {
    return `${this.bucketId}/${path}`;
  }
  _removeEmptyFolders(path) {
    return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(transform) {
    const params = [];
    if (transform.width) {
      params.push(`width=${transform.width}`);
    }
    if (transform.height) {
      params.push(`height=${transform.height}`);
    }
    if (transform.resize) {
      params.push(`resize=${transform.resize}`);
    }
    return params.join("&");
  }
}
StorageFileApi$1.default = StorageFileApi;
var StorageBucketApi$1 = {};
var constants$2 = {};
var version$2 = {};
Object.defineProperty(version$2, "__esModule", { value: true });
version$2.version = void 0;
version$2.version = "2.1.0";
Object.defineProperty(constants$2, "__esModule", { value: true });
constants$2.DEFAULT_HEADERS = void 0;
const version_1$2 = version$2;
constants$2.DEFAULT_HEADERS = { "X-Client-Info": `storage-js/${version_1$2.version}` };
var __awaiter$5 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(StorageBucketApi$1, "__esModule", { value: true });
const constants_1$2 = constants$2;
const errors_1$3 = errors$1;
const fetch_1$3 = fetch$3;
const helpers_1$5 = helpers$2;
class StorageBucketApi {
  constructor(url, headers = {}, fetch2) {
    this.url = url;
    this.headers = Object.assign(Object.assign({}, constants_1$2.DEFAULT_HEADERS), headers);
    this.fetch = (0, helpers_1$5.resolveFetch)(fetch2);
  }
  /**
   * Retrieves the details of all Storage buckets within an existing project.
   */
  listBuckets() {
    return __awaiter$5(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$3.get)(this.fetch, `${this.url}/bucket`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$3.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */
  getBucket(id) {
    return __awaiter$5(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$3.get)(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$3.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
   * @returns newly created bucket id
   */
  createBucket(id, options = { public: false }) {
    return __awaiter$5(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$3.post)(this.fetch, `${this.url}/bucket`, { id, name: id, public: options.public }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$3.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Updates a Storage bucket
   *
   * @param id A unique identifier for the bucket you are updating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
   */
  updateBucket(id, options) {
    return __awaiter$5(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$3.put)(this.fetch, `${this.url}/bucket/${id}`, { id, name: id, public: options.public }, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$3.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */
  emptyBucket(id) {
    return __awaiter$5(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$3.post)(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$3.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */
  deleteBucket(id) {
    return __awaiter$5(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$3.remove)(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$3.isStorageError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
}
StorageBucketApi$1.default = StorageBucketApi;
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(StorageClient$1, "__esModule", { value: true });
StorageClient$1.StorageClient = void 0;
const StorageFileApi_1 = __importDefault$1(StorageFileApi$1);
const StorageBucketApi_1 = __importDefault$1(StorageBucketApi$1);
class StorageClient extends StorageBucketApi_1.default {
  constructor(url, headers = {}, fetch2) {
    super(url, headers, fetch2);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(id) {
    return new StorageFileApi_1.default(this.url, this.headers, id, this.fetch);
  }
}
StorageClient$1.StorageClient = StorageClient;
var types$1 = {};
Object.defineProperty(types$1, "__esModule", { value: true });
(function(exports2) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o2, k2, desc);
  } : function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o2[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports3) {
    for (var p2 in m)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p2))
        __createBinding(exports3, m, p2);
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.StorageClient = void 0;
  var StorageClient_1 = StorageClient$1;
  Object.defineProperty(exports2, "StorageClient", { enumerable: true, get: function() {
    return StorageClient_1.StorageClient;
  } });
  __exportStar(types$1, exports2);
  __exportStar(errors$1, exports2);
})(src$1);
var constants$1 = {};
var version$1 = {};
Object.defineProperty(version$1, "__esModule", { value: true });
version$1.version = void 0;
version$1.version = "0.0.0-automated";
Object.defineProperty(constants$1, "__esModule", { value: true });
constants$1.DEFAULT_HEADERS = void 0;
const version_1$1 = version$1;
constants$1.DEFAULT_HEADERS = { "X-Client-Info": `supabase-js/${version_1$1.version}` };
var fetch$2 = {};
(function(exports2) {
  var __awaiter2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.fetchWithAuth = exports2.resolveHeaders = exports2.resolveFetch = void 0;
  const resolveFetch2 = (customFetch) => {
    let _fetch;
    if (customFetch) {
      _fetch = customFetch;
    } else if (typeof fetch === "undefined")
      ;
    else {
      _fetch = fetch;
    }
    return (...args) => _fetch(...args);
  };
  exports2.resolveFetch = resolveFetch2;
  const resolveHeaders = (init) => {
    return new Map(Object.entries(init.headers));
  };
  exports2.resolveHeaders = resolveHeaders;
  const fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
    const fetch2 = (0, exports2.resolveFetch)(customFetch);
    return (input, init) => __awaiter2(void 0, void 0, void 0, function* () {
      var _a2;
      const accessToken = (_a2 = yield getAccessToken()) !== null && _a2 !== void 0 ? _a2 : supabaseKey;
      let headers = (0, exports2.resolveHeaders)(init);
      if (!headers.has("apikey")) {
        headers.set("apikey", supabaseKey);
      }
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return fetch2(input, Object.assign(Object.assign({}, init), { headers }));
    });
  };
  exports2.fetchWithAuth = fetchWithAuth;
})(fetch$2);
var helpers$1 = {};
Object.defineProperty(helpers$1, "__esModule", { value: true });
helpers$1.applySettingDefaults = helpers$1.isBrowser = helpers$1.stripTrailingSlash = helpers$1.uuid = void 0;
function uuid$1() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
helpers$1.uuid = uuid$1;
function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}
helpers$1.stripTrailingSlash = stripTrailingSlash;
const isBrowser$1 = () => typeof window !== "undefined";
helpers$1.isBrowser = isBrowser$1;
function applySettingDefaults(options, defaults) {
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
  const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults;
  return {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
    global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions)
  };
}
helpers$1.applySettingDefaults = applySettingDefaults;
var SupabaseAuthClient$1 = {};
var src = {};
var GoTrueAdminApi$1 = {};
var fetch$1 = {};
var helpers = {};
var __awaiter$4 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(helpers, "__esModule", { value: true });
helpers.retryable = helpers.sleep = helpers.decodeJWTPayload = helpers.Deferred = helpers.decodeBase64URL = helpers.removeItemAsync = helpers.getItemAsync = helpers.setItemAsync = helpers.looksLikeFetchResponse = helpers.resolveFetch = helpers.getParameterByName = helpers.isBrowser = helpers.uuid = helpers.expiresAt = void 0;
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
helpers.expiresAt = expiresAt;
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
helpers.uuid = uuid;
const isBrowser = () => typeof document !== "undefined";
helpers.isBrowser = isBrowser;
function getParameterByName(name, url) {
  var _a2;
  if (!url)
    url = ((_a2 = window === null || window === void 0 ? void 0 : window.location) === null || _a2 === void 0 ? void 0 : _a2.href) || "";
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
helpers.getParameterByName = getParameterByName;
const resolveFetch = (customFetch) => {
  let _fetch;
  if (customFetch) {
    _fetch = customFetch;
  } else if (typeof fetch === "undefined")
    ;
  else {
    _fetch = fetch;
  }
  return (...args) => _fetch(...args);
};
helpers.resolveFetch = resolveFetch;
const looksLikeFetchResponse = (maybeResponse) => {
  return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
};
helpers.looksLikeFetchResponse = looksLikeFetchResponse;
const setItemAsync = (storage, key, data) => {
  wx$1.setStorageSync(key, JSON.stringify(data));
};
helpers.setItemAsync = setItemAsync;
const getItemAsync = (storage, key, data) => {
  const value = wx$1.getStorageSync(key) ? JSON.parse(wx$1.getStorageSync(key)) : "";
  if (!value) {
    return null;
  }
  return value;
};
helpers.getItemAsync = getItemAsync;
const removeItemAsync = (storage, key) => __awaiter$4(void 0, void 0, void 0, function* () {
  wx$1.removeStorageSync(key);
});
helpers.removeItemAsync = removeItemAsync;
function decodeBase64URL(value) {
  const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let base64 = "";
  let chr1, chr2, chr3;
  let enc1, enc2, enc3, enc4;
  let i = 0;
  value = value.replace("-", "+").replace("_", "/");
  while (i < value.length) {
    enc1 = key.indexOf(value.charAt(i++));
    enc2 = key.indexOf(value.charAt(i++));
    enc3 = key.indexOf(value.charAt(i++));
    enc4 = key.indexOf(value.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    base64 = base64 + String.fromCharCode(chr1);
    if (enc3 != 64 && chr2 != 0) {
      base64 = base64 + String.fromCharCode(chr2);
    }
    if (enc4 != 64 && chr3 != 0) {
      base64 = base64 + String.fromCharCode(chr3);
    }
  }
  return base64;
}
helpers.decodeBase64URL = decodeBase64URL;
class Deferred {
  constructor() {
    this.promise = new Deferred.promiseConstructor((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
}
helpers.Deferred = Deferred;
Deferred.promiseConstructor = Promise;
function decodeJWTPayload(token) {
  const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("JWT is not valid: not a JWT structure");
  }
  if (!base64UrlRegex.test(parts[1])) {
    throw new Error("JWT is not valid: payload is not in base64url format");
  }
  const base64Url = parts[1];
  return JSON.parse(decodeBase64URL(base64Url));
}
helpers.decodeJWTPayload = decodeJWTPayload;
function sleep(time) {
  return new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
helpers.sleep = sleep;
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    (() => __awaiter$4(this, void 0, void 0, function* () {
      for (let attempt = 0; attempt < Infinity; attempt++) {
        try {
          const result = yield fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e2) {
          if (!isRetryable(attempt, e2)) {
            reject(e2);
            return;
          }
        }
      }
    }))();
  });
  return promise;
}
helpers.retryable = retryable;
var errors = {};
Object.defineProperty(errors, "__esModule", { value: true });
errors.AuthRetryableFetchError = errors.AuthImplicitGrantRedirectError = errors.AuthInvalidCredentialsError = errors.AuthSessionMissingError = errors.CustomAuthError = errors.AuthUnknownError = errors.isAuthApiError = errors.AuthApiError = errors.isAuthError = errors.AuthError = void 0;
class AuthError extends Error {
  constructor(message, status) {
    super(message);
    this.__isAuthError = true;
    this.name = "AuthError";
    this.status = status;
  }
}
errors.AuthError = AuthError;
function isAuthError(error) {
  return typeof error === "object" && error !== null && "__isAuthError" in error;
}
errors.isAuthError = isAuthError;
class AuthApiError extends AuthError {
  constructor(message, status) {
    super(message, status);
    this.name = "AuthApiError";
    this.status = status;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
}
errors.AuthApiError = AuthApiError;
function isAuthApiError(error) {
  return isAuthError(error) && error.name === "AuthApiError";
}
errors.isAuthApiError = isAuthApiError;
class AuthUnknownError extends AuthError {
  constructor(message, originalError) {
    super(message);
    this.name = "AuthUnknownError";
    this.originalError = originalError;
  }
}
errors.AuthUnknownError = AuthUnknownError;
class CustomAuthError extends AuthError {
  constructor(message, name, status) {
    super(message);
    this.name = name;
    this.status = status;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
}
errors.CustomAuthError = CustomAuthError;
class AuthSessionMissingError extends CustomAuthError {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400);
  }
}
errors.AuthSessionMissingError = AuthSessionMissingError;
class AuthInvalidCredentialsError extends CustomAuthError {
  constructor(message) {
    super(message, "AuthInvalidCredentialsError", 400);
  }
}
errors.AuthInvalidCredentialsError = AuthInvalidCredentialsError;
class AuthImplicitGrantRedirectError extends CustomAuthError {
  constructor(message, details = null) {
    super(message, "AuthImplicitGrantRedirectError", 500);
    this.details = null;
    this.details = details;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
errors.AuthImplicitGrantRedirectError = AuthImplicitGrantRedirectError;
class AuthRetryableFetchError extends CustomAuthError {
  constructor(message, status) {
    super(message, "AuthRetryableFetchError", status);
  }
}
errors.AuthRetryableFetchError = AuthRetryableFetchError;
var __awaiter$3 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest$1 = commonjsGlobal && commonjsGlobal.__rest || function(s2, e2) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s2); i < p2.length; i++) {
      if (e2.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i]))
        t2[p2[i]] = s2[p2[i]];
    }
  return t2;
};
Object.defineProperty(fetch$1, "__esModule", { value: true });
fetch$1._noResolveJsonResponse = fetch$1._generateLinkResponse = fetch$1._ssoResponse = fetch$1._userResponse = fetch$1._sessionResponse = fetch$1._request = void 0;
const helpers_1$4 = helpers;
let { URLSearchParams: URLSearchParams$1 } = wechaturlParse;
const errors_1$2 = errors;
const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject) => __awaiter$3(void 0, void 0, void 0, function* () {
  const NETWORK_ERROR_CODES = [502, 503, 504];
  if (!(0, helpers_1$4.looksLikeFetchResponse)(error)) {
    reject(new errors_1$2.AuthRetryableFetchError(_getErrorMessage(error), 0));
  } else if (NETWORK_ERROR_CODES.includes(error.status)) {
    reject(new errors_1$2.AuthRetryableFetchError(_getErrorMessage(error), error.status));
  } else {
    error.json().then((err) => {
      reject(new errors_1$2.AuthApiError(_getErrorMessage(err), error.status || 500));
    }).catch((e2) => {
      reject(new errors_1$2.AuthUnknownError(_getErrorMessage(e2), e2));
    });
  }
});
const _getRequestParams = (method, options, parameters, body) => {
  const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
  if (method === "GET") {
    return params;
  }
  params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options === null || options === void 0 ? void 0 : options.headers);
  params.body = JSON.stringify(body);
  return Object.assign(Object.assign({}, params), parameters);
};
function _request(fetcher, method, url, options) {
  var _a2;
  return __awaiter$3(this, void 0, void 0, function* () {
    const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
    if (options === null || options === void 0 ? void 0 : options.jwt) {
      headers["Authorization"] = `Bearer ${options.jwt}`;
    }
    const qs2 = (_a2 = options === null || options === void 0 ? void 0 : options.query) !== null && _a2 !== void 0 ? _a2 : {};
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      qs2["redirect_to"] = options.redirectTo;
    }
    const queryString = Object.keys(qs2).length ? "?" + new URLSearchParams$1(qs2).toString() : "";
    const data = yield _handleRequest(fetcher, method, url + queryString, { headers, noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson }, {}, options === null || options === void 0 ? void 0 : options.body);
    return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : { data: Object.assign({}, data), error: null };
  });
}
fetch$1._request = _request;
function _handleRequest(fetcher, method, url, options, parameters, body) {
  return __awaiter$3(this, void 0, void 0, function* () {
    return new Promise((resolve2, reject) => {
      fetcher(url, _getRequestParams(method, options, parameters, body)).then((result) => {
        if (!result.ok)
          throw result;
        if (options === null || options === void 0 ? void 0 : options.noResolveJson)
          return result;
        return result;
      }).then((data) => resolve2(data)).catch((error) => handleError(error, reject));
    });
  });
}
function _sessionResponse(data) {
  var _a2;
  let session = null;
  if (hasSession(data.data)) {
    session = Object.assign({}, data.data);
    session.expires_at = (0, helpers_1$4.expiresAt)(data.data.expires_in);
  }
  const user = (_a2 = data.user) !== null && _a2 !== void 0 ? _a2 : data;
  return { data: { session, user }, error: null };
}
fetch$1._sessionResponse = _sessionResponse;
function _userResponse(data) {
  var _a2;
  const user = (_a2 = data.user) !== null && _a2 !== void 0 ? _a2 : data;
  return { data: { user }, error: null };
}
fetch$1._userResponse = _userResponse;
function _ssoResponse(data) {
  return { data, error: null };
}
fetch$1._ssoResponse = _ssoResponse;
function _generateLinkResponse(data) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest$1(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
fetch$1._generateLinkResponse = _generateLinkResponse;
function _noResolveJsonResponse(data) {
  return data;
}
fetch$1._noResolveJsonResponse = _noResolveJsonResponse;
function hasSession(data) {
  return data.access_token && data.refresh_token && data.expires_in;
}
var __awaiter$2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __rest = commonjsGlobal && commonjsGlobal.__rest || function(s2, e2) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s2); i < p2.length; i++) {
      if (e2.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i]))
        t2[p2[i]] = s2[p2[i]];
    }
  return t2;
};
Object.defineProperty(GoTrueAdminApi$1, "__esModule", { value: true });
const fetch_1$2 = fetch$1;
const helpers_1$3 = helpers;
const errors_1$1 = errors;
class GoTrueAdminApi {
  constructor({ url = "", headers = {}, fetch: fetch2 }) {
    this.url = url;
    this.headers = headers;
    this.fetch = (0, helpers_1$3.resolveFetch)(fetch2);
    this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   */
  signOut(jwt) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        yield (0, fetch_1$2._request)(this.fetch, "POST", `${this.url}/logout`, {
          headers: this.headers,
          jwt,
          noResolveJson: true
        });
        return { data: null, error: null };
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param options.redirectTo A URL or mobile deeplink to send the user to after they are confirmed.
   * @param options.data Optional user metadata
   */
  inviteUserByEmail(email, options = {}) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        return yield (0, fetch_1$2._request)(this.fetch, "POST", `${this.url}/invite`, {
          body: { email, data: options.data },
          headers: this.headers,
          redirectTo: options.redirectTo,
          xform: fetch_1$2._userResponse
        });
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Generates email links and OTPs to be sent via a custom email provider.
   * @param email The user's email.
   * @param options.password User password. For signup only.
   * @param options.data Optional user metadata. For signup only.
   * @param options.redirectTo The redirect url which should be appended to the generated link
   */
  generateLink(params) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        const { options } = params, rest = __rest(params, ["options"]);
        const body = Object.assign(Object.assign({}, rest), options);
        if ("newEmail" in rest) {
          body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
          delete body["newEmail"];
        }
        return yield (0, fetch_1$2._request)(this.fetch, "POST", `${this.url}/admin/generate_link`, {
          body,
          headers: this.headers,
          xform: fetch_1$2._generateLinkResponse,
          redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
        });
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return {
            data: {
              properties: null,
              user: null
            },
            error
          };
        }
        throw error;
      }
    });
  }
  // User Admin API
  /**
   * Creates a new user.
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  createUser(attributes) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        return yield (0, fetch_1$2._request)(this.fetch, "POST", `${this.url}/admin/users`, {
          body: attributes,
          headers: this.headers,
          xform: fetch_1$2._userResponse
        });
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
   */
  listUsers(params) {
    var _a2, _b, _c, _d, _e, _f, _g;
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        const pagination = { nextPage: null, lastPage: 0, total: 0 };
        const response = yield (0, fetch_1$2._request)(this.fetch, "GET", `${this.url}/admin/users`, {
          headers: this.headers,
          noResolveJson: true,
          query: {
            page: (_b = (_a2 = params === null || params === void 0 ? void 0 : params.page) === null || _a2 === void 0 ? void 0 : _a2.toString()) !== null && _b !== void 0 ? _b : "",
            per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
          },
          xform: fetch_1$2._noResolveJsonResponse
        });
        if (response.error)
          throw response.error;
        const users = response;
        const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
        const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
        if (links.length > 0) {
          links.forEach((link) => {
            const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
            const rel = JSON.parse(link.split(";")[1].split("=")[1]);
            pagination[`${rel}Page`] = page;
          });
          pagination.total = parseInt(total);
        }
        return { data: Object.assign(Object.assign({}, users), pagination), error: null };
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: { users: [] }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  getUserById(uid2) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        return yield (0, fetch_1$2._request)(this.fetch, "GET", `${this.url}/admin/users/${uid2}`, {
          headers: this.headers,
          xform: fetch_1$2._userResponse
        });
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  updateUserById(uid2, attributes) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        return yield (0, fetch_1$2._request)(this.fetch, "PUT", `${this.url}/admin/users/${uid2}`, {
          body: attributes,
          headers: this.headers,
          xform: fetch_1$2._userResponse
        });
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * @param id The user id you want to remove.
   * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema.
   * Defaults to false for backward compatibility.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  deleteUser(id, shouldSoftDelete = false) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        return yield (0, fetch_1$2._request)(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
          headers: this.headers,
          body: {
            should_soft_delete: shouldSoftDelete
          },
          xform: fetch_1$2._userResponse
        });
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  _listFactors(params) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        const { data, error } = yield (0, fetch_1$2._request)(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
          headers: this.headers,
          xform: (factors) => {
            return { data: { factors }, error: null };
          }
        });
        return { data, error };
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  _deleteFactor(params) {
    return __awaiter$2(this, void 0, void 0, function* () {
      try {
        const data = yield (0, fetch_1$2._request)(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
          headers: this.headers
        });
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1$1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
}
GoTrueAdminApi$1.default = GoTrueAdminApi;
var GoTrueClient$1 = {};
var constants = {};
var version = {};
Object.defineProperty(version, "__esModule", { value: true });
version.version = void 0;
version.version = "2.10.2";
Object.defineProperty(constants, "__esModule", { value: true });
constants.NETWORK_FAILURE = constants.EXPIRY_MARGIN = constants.DEFAULT_HEADERS = constants.AUDIENCE = constants.STORAGE_KEY = constants.GOTRUE_URL = void 0;
const version_1 = version;
constants.GOTRUE_URL = "http://localhost:9999";
constants.STORAGE_KEY = "supabase.auth.token";
constants.AUDIENCE = "";
constants.DEFAULT_HEADERS = { "X-Client-Info": `gotrue-js/${version_1.version}` };
constants.EXPIRY_MARGIN = 10;
constants.NETWORK_FAILURE = {
  MAX_RETRIES: 10,
  RETRY_INTERVAL: 2
  // in deciseconds
};
var localStorage = {};
Object.defineProperty(localStorage, "__esModule", { value: true });
const helpers_1$2 = helpers;
const localStorageAdapter = {
  getItem: (key) => {
    if (!(0, helpers_1$2.isBrowser)()) {
      return null;
    }
    return globalThis.localStorage.getItem(key);
  },
  setItem: (key, value) => {
    if (!(0, helpers_1$2.isBrowser)()) {
      return;
    }
    globalThis.localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    if (!(0, helpers_1$2.isBrowser)()) {
      return;
    }
    globalThis.localStorage.removeItem(key);
  }
};
localStorage.default = localStorageAdapter;
var polyfills = {};
Object.defineProperty(polyfills, "__esModule", { value: true });
polyfills.polyfillGlobalThis = void 0;
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e2) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}
polyfills.polyfillGlobalThis = polyfillGlobalThis;
var __awaiter$1 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(GoTrueClient$1, "__esModule", { value: true });
const GoTrueAdminApi_1 = __importDefault(GoTrueAdminApi$1);
let { URLSearchParams: URLSearchParams2 } = wechaturlParse;
const constants_1$1 = constants;
const errors_1 = errors;
const fetch_1$1 = fetch$1;
const helpers_1$1 = helpers;
const local_storage_1 = __importDefault(localStorage);
const polyfills_1 = polyfills;
(0, polyfills_1.polyfillGlobalThis)();
const DEFAULT_OPTIONS = {
  url: constants_1$1.GOTRUE_URL,
  storageKey: constants_1$1.STORAGE_KEY,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  headers: constants_1$1.DEFAULT_HEADERS
};
const AUTO_REFRESH_TICK_DURATION = 10 * 1e3;
const AUTO_REFRESH_TICK_THRESHOLD = 3;
class GoTrueClient {
  /**
   * Create a new client for use in the browser.
   */
  constructor(options) {
    this.stateChangeEmitters = /* @__PURE__ */ new Map();
    this.autoRefreshTicker = null;
    this.refreshingDeferred = null;
    this.initializePromise = null;
    this.detectSessionInUrl = true;
    const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    this.inMemorySession = null;
    this.storageKey = settings.storageKey;
    this.autoRefreshToken = settings.autoRefreshToken;
    this.persistSession = settings.persistSession;
    this.storage = settings.storage || local_storage_1.default;
    this.admin = new GoTrueAdminApi_1.default({
      url: settings.url,
      headers: settings.headers,
      fetch: settings.fetch
    });
    this.url = settings.url;
    this.headers = settings.headers;
    this.fetch = (0, helpers_1$1.resolveFetch)(settings.fetch);
    this.detectSessionInUrl = settings.detectSessionInUrl;
    this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    };
    this.initialize();
  }
  /**
   * Initializes the client session either from the url or from storage.
   * This method is automatically called when instantiating the client, but should also be called
   * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
   */
  initialize() {
    if (!this.initializePromise) {
      this.initializePromise = this._initialize();
    }
    return this.initializePromise;
  }
  /**
   * IMPORTANT:
   * 1. Never throw in this method, as it is called from the constructor
   * 2. Never return a session from this method as it would be cached over
   *    the whole lifetime of the client
   */
  _initialize() {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (this.initializePromise) {
        return this.initializePromise;
      }
      try {
        if (this.detectSessionInUrl && this._isImplicitGrantFlow()) {
          const { data, error } = yield this._getSessionFromUrl();
          if (error) {
            yield this._removeSession();
            return { error };
          }
          const { session, redirectType } = data;
          yield this._saveSession(session);
          this._notifyAllSubscribers("SIGNED_IN", session);
          if (redirectType === "recovery") {
            this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
          }
          return { error: null };
        }
        yield this._recoverAndRefresh();
        return { error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { error };
        }
        return {
          error: new errors_1.AuthUnknownError("Unexpected error during initialization", error)
        };
      } finally {
        yield this._handleVisibilityChange();
      }
    });
  }
  /**
   * wechat login
   *
   */
  signInWithWechat(credentials) {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        let res;
        if ("code" in credentials) {
          const { code } = credentials;
          res = yield (0, fetch_1$1._request)(this.fetch, "GET", `${this.url}/wechat_mini/login?code=${code}`, {
            headers: this.headers,
            body: {
              code
            },
            xform: fetch_1$1._sessionResponse
          });
        } else {
          throw new errors_1.AuthInvalidCredentialsError("code是必填项");
        }
        const { data, error } = res;
        if (error || !data)
          return { data: { user: null, session: null }, error };
        if (data.session) {
          yield this._saveSession(data.session);
          this._notifyAllSubscribers("SIGNED_IN", data.session);
        }
        return { data, error };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * wechat get phone
   *
   */
  wechatBindPhone(credentials) {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const { data: sessionData, error: sessionError } = yield this.getSession();
        if (sessionError) {
          throw sessionError;
        }
        if (!sessionData.session) {
          throw new errors_1.AuthSessionMissingError();
        }
        const session = sessionData.session;
        if ("code" in credentials) {
          const { code } = credentials;
          const { data, error: userError } = yield (0, fetch_1$1._request)(this.fetch, "GET", `${this.url}/wechat_mini/bind_phone?code=${code}`, {
            headers: this.headers,
            jwt: session.access_token,
            xform: fetch_1$1._userResponse
          });
          if (userError)
            throw userError;
          session.user = data.user;
        } else {
          throw new errors_1.AuthInvalidCredentialsError("code是必填项");
        }
        yield this._saveSession(session);
        return { data: { user: session.user }, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * wechat bind account
   *
   */
  wechatBindAccount(credentials) {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const { data: sessionData, error: sessionError } = yield this.getSession();
        if (sessionError) {
          throw sessionError;
        }
        if (!sessionData.session) {
          throw new errors_1.AuthSessionMissingError();
        }
        const session = sessionData.session;
        if ("code" in credentials) {
          const { code } = credentials;
          const { data, error: userError } = yield (0, fetch_1$1._request)(this.fetch, "GET", `${this.url}/wechat_mini/bind_account?code=${code}`, {
            headers: this.headers,
            jwt: session.access_token,
            xform: fetch_1$1._userResponse
          });
          if (userError)
            throw userError;
          session.user = data.user;
        } else {
          throw new errors_1.AuthInvalidCredentialsError("code是必填项");
        }
        yield this._saveSession(session);
        return { data: { user: session.user }, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * wechat get  QRcode
   *
   */
  getUnlimitedQRCode(credentials) {
    var _a2;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        let res;
        const { page, scene, check_path, env_version, width, auto_color, line_color, is_hyaline } = credentials;
        res = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/wechat_mini/unlimited_qrcode`, {
          headers: this.headers,
          // xform: _sessionResponse,
          body: {
            page,
            scene,
            check_path,
            env_version,
            width,
            auto_color,
            line_color,
            is_hyaline
          }
        });
        const { data, error } = res;
        if (error || !data) {
          return { data: { imgBase64: null }, error };
        }
        return { data: { imgBase64: (_a2 = data === null || data === void 0 ? void 0 : data.data) === null || _a2 === void 0 ? void 0 : _a2.imgBase64 }, error: null };
      } catch (error) {
        return { data: { imgBase64: null }, error };
      }
    });
  }
  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  signUp(credentials) {
    var _a2, _b;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        let res;
        if ("email" in credentials) {
          const { email, password, options } = credentials;
          res = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
            body: {
              email,
              password,
              data: (_a2 = options === null || options === void 0 ? void 0 : options.data) !== null && _a2 !== void 0 ? _a2 : {},
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            xform: fetch_1$1._sessionResponse
          });
        } else if ("phone" in credentials) {
          const { phone, password, options } = credentials;
          res = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            body: {
              phone,
              password,
              data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            xform: fetch_1$1._sessionResponse
          });
        } else {
          throw new errors_1.AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
        }
        const { data, error } = res;
        if (error || !data) {
          return { data: { user: null, session: null }, error };
        }
        const session = data.session;
        const user = data.user;
        if (data.session) {
          yield this._saveSession(data.session);
          this._notifyAllSubscribers("SIGNED_IN", session);
        }
        return { data: { user, session }, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distingish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  signInWithPassword(credentials) {
    var _a2, _b;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        let res;
        if ("email" in credentials) {
          const { email, password, options } = credentials;
          res = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
            headers: this.headers,
            body: {
              email,
              password,
              data: (_a2 = options === null || options === void 0 ? void 0 : options.data) !== null && _a2 !== void 0 ? _a2 : {},
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            xform: fetch_1$1._sessionResponse
          });
        } else if ("phone" in credentials) {
          const { phone, password, options } = credentials;
          res = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
            headers: this.headers,
            body: {
              phone,
              password,
              data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            xform: fetch_1$1._sessionResponse
          });
        } else {
          throw new errors_1.AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
        }
        const { data, error } = res;
        if (error || !data)
          return { data: { user: null, session: null }, error };
        if (data.session) {
          yield this._saveSession(data.session);
          this._notifyAllSubscribers("SIGNED_IN", data.session);
        }
        return { data, error };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Log in an existing user via a third-party provider.
   */
  signInWithOAuth(credentials) {
    var _a2, _b, _c, _d;
    return __awaiter$1(this, void 0, void 0, function* () {
      yield this._removeSession();
      return this._handleProviderSignIn(credentials.provider, {
        redirectTo: (_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo,
        scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
        queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
        skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
      });
    });
  }
  /**
   * Log in a user using magiclink or a one-time password (OTP).
   *
   * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
   * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
   * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or, that the account
   * can only be accessed via social login.
   */
  signInWithOtp(credentials) {
    var _a2, _b, _c, _d;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        if ("email" in credentials) {
          const { email, options } = credentials;
          const { error } = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/otp`, {
            headers: this.headers,
            body: {
              email,
              data: (_a2 = options === null || options === void 0 ? void 0 : options.data) !== null && _a2 !== void 0 ? _a2 : {},
              create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            },
            redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
          });
          return { data: { user: null, session: null }, error };
        }
        if ("phone" in credentials) {
          const { phone, options } = credentials;
          const { error } = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/otp`, {
            headers: this.headers,
            body: {
              phone,
              data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
              create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
              gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken }
            }
          });
          return { data: { user: null, session: null }, error };
        }
        throw new errors_1.AuthInvalidCredentialsError("You must provide either an email or phone number.");
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Log in a user given a User supplied OTP received via mobile.
   */
  verifyOtp(params) {
    var _a2, _b;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        const { data, error } = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/verify`, {
          headers: this.headers,
          body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: (_a2 = params.options) === null || _a2 === void 0 ? void 0 : _a2.captchaToken } }),
          redirectTo: (_b = params.options) === null || _b === void 0 ? void 0 : _b.redirectTo,
          xform: fetch_1$1._sessionResponse
        });
        if (error) {
          throw error;
        }
        if (!data) {
          throw "An error occurred on token verification.";
        }
        const session = data.session;
        const user = data.user;
        if (session === null || session === void 0 ? void 0 : session.access_token) {
          yield this._saveSession(session);
          this._notifyAllSubscribers("SIGNED_IN", session);
        }
        return { data: { user, session }, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Attempts a single-sign on using an enterprise Identity Provider. A
   * successful SSO attempt will redirect the current page to the identity
   * provider authorization page. The redirect URL is implementation and SSO
   * protocol specific.
   *
   * You can use it by providing a SSO domain. Typically you can extract this
   * domain by asking users for their email address. If this domain is
   * registered on the Auth instance the redirect will use that organization's
   * currently active SSO Identity Provider for the login.
   *
   * If you have built an organization-specific login page, you can use the
   * organization's SSO Identity Provider UUID directly instead.
   *
   * This API is experimental and availability is conditional on correct
   * settings on the Auth service.
   *
   * @experimental
   */
  signInWithSSO(params) {
    var _a2, _b, _c;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        yield this._removeSession();
        return yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/sso`, {
          body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a2 = params.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true }),
          headers: this.headers,
          xform: fetch_1$1._ssoResponse
        });
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Returns the session, refreshing it if necessary.
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   */
  getSession() {
    return __awaiter$1(this, void 0, void 0, function* () {
      yield this.initializePromise;
      let currentSession = null;
      if (this.persistSession) {
        const maybeSession = yield (0, helpers_1$1.getItemAsync)(this.storage, this.storageKey);
        if (maybeSession !== null) {
          if (this._isValidSession(maybeSession)) {
            currentSession = maybeSession;
          } else {
            yield this._removeSession();
          }
        }
      } else {
        currentSession = this.inMemorySession;
      }
      if (!currentSession) {
        return { data: { session: null }, error: null };
      }
      const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1e3 : false;
      if (!hasExpired) {
        return { data: { session: currentSession }, error: null };
      }
      const { session, error } = yield this._callRefreshToken(currentSession.refresh_token);
      if (error) {
        return { data: { session: null }, error };
      }
      return { data: { session }, error: null };
    });
  }
  /**
   * Gets the current user details if there is an existing session.
   * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
   */
  getUser(jwt) {
    var _a2, _b;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        if (!jwt) {
          const { data, error } = yield this.getSession();
          if (error) {
            throw error;
          }
          jwt = (_b = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) !== null && _b !== void 0 ? _b : void 0;
        }
        return yield (0, fetch_1$1._request)(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt,
          xform: fetch_1$1._userResponse
        });
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Updates user data, if there is a logged in user.
   */
  updateUser(attributes) {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const { data: sessionData, error: sessionError } = yield this.getSession();
        if (sessionError) {
          throw sessionError;
        }
        if (!sessionData.session) {
          throw new errors_1.AuthSessionMissingError();
        }
        const session = sessionData.session;
        const { data, error: userError } = yield (0, fetch_1$1._request)(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          body: attributes,
          jwt: session.access_token,
          xform: fetch_1$1._userResponse
        });
        if (userError)
          throw userError;
        session.user = data.user;
        yield this._saveSession(session);
        this._notifyAllSubscribers("USER_UPDATED", session);
        return { data: { user: session.user }, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Decodes a JWT (without performing any validation).
   */
  _decodeJWT(jwt) {
    return (0, helpers_1$1.decodeJWTPayload)(jwt);
  }
  /**
   * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
   * If the refresh token or access token in the current session is invalid, an error will be thrown.
   * @param currentSession The current session that minimally contains an access token and refresh token.
   */
  setSession(currentSession) {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        if (!currentSession.access_token || !currentSession.refresh_token) {
          throw new errors_1.AuthSessionMissingError();
        }
        const timeNow = Date.now() / 1e3;
        let expiresAt2 = timeNow;
        let hasExpired = true;
        let session = null;
        const payload = (0, helpers_1$1.decodeJWTPayload)(currentSession.access_token);
        if (payload.exp) {
          expiresAt2 = payload.exp;
          hasExpired = expiresAt2 <= timeNow;
        }
        if (hasExpired) {
          const { session: refreshedSession, error } = yield this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            return { data: { user: null, session: null }, error };
          }
          if (!refreshedSession) {
            return { data: { user: null, session: null }, error: null };
          }
          session = refreshedSession;
        } else {
          const { data, error } = yield this.getUser(currentSession.access_token);
          if (error) {
            throw error;
          }
          session = {
            access_token: currentSession.access_token,
            refresh_token: currentSession.refresh_token,
            user: data.user,
            token_type: "bearer",
            expires_in: expiresAt2 - timeNow,
            expires_at: expiresAt2
          };
          yield this._saveSession(session);
          this._notifyAllSubscribers("SIGNED_IN", session);
        }
        return { data: { user: session.user, session }, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { session: null, user: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Returns a new session, regardless of expiry status.
   * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
   * If the current session's refresh token is invalid, an error will be thrown.
   * @param currentSession The current session. If passed in, it must contain a refresh token.
   */
  refreshSession(currentSession) {
    var _a2;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        if (!currentSession) {
          const { data, error: error2 } = yield this.getSession();
          if (error2) {
            throw error2;
          }
          currentSession = (_a2 = data.session) !== null && _a2 !== void 0 ? _a2 : void 0;
        }
        if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
          throw new errors_1.AuthSessionMissingError();
        }
        const { session, error } = yield this._callRefreshToken(currentSession.refresh_token);
        if (error) {
          return { data: { user: null, session: null }, error };
        }
        if (!session) {
          return { data: { user: null, session: null }, error: null };
        }
        return { data: { user: session.user, session }, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { user: null, session: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Gets the session data from a URL string
   */
  _getSessionFromUrl() {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        if (!(0, helpers_1$1.isBrowser)())
          throw new errors_1.AuthImplicitGrantRedirectError("No browser detected.");
        if (!this._isImplicitGrantFlow()) {
          throw new errors_1.AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
        }
        const error_description = (0, helpers_1$1.getParameterByName)("error_description");
        if (error_description) {
          const error_code = (0, helpers_1$1.getParameterByName)("error_code");
          if (!error_code)
            throw new errors_1.AuthImplicitGrantRedirectError("No error_code detected.");
          const error2 = (0, helpers_1$1.getParameterByName)("error");
          if (!error2)
            throw new errors_1.AuthImplicitGrantRedirectError("No error detected.");
          throw new errors_1.AuthImplicitGrantRedirectError(error_description, { error: error2, code: error_code });
        }
        const provider_token = (0, helpers_1$1.getParameterByName)("provider_token");
        const provider_refresh_token = (0, helpers_1$1.getParameterByName)("provider_refresh_token");
        const access_token = (0, helpers_1$1.getParameterByName)("access_token");
        if (!access_token)
          throw new errors_1.AuthImplicitGrantRedirectError("No access_token detected.");
        const expires_in = (0, helpers_1$1.getParameterByName)("expires_in");
        if (!expires_in)
          throw new errors_1.AuthImplicitGrantRedirectError("No expires_in detected.");
        const refresh_token = (0, helpers_1$1.getParameterByName)("refresh_token");
        if (!refresh_token)
          throw new errors_1.AuthImplicitGrantRedirectError("No refresh_token detected.");
        const token_type = (0, helpers_1$1.getParameterByName)("token_type");
        if (!token_type)
          throw new errors_1.AuthImplicitGrantRedirectError("No token_type detected.");
        const timeNow = Math.round(Date.now() / 1e3);
        const expires_at = timeNow + parseInt(expires_in);
        const { data, error } = yield this.getUser(access_token);
        if (error)
          throw error;
        const user = data.user;
        const session = {
          provider_token,
          provider_refresh_token,
          access_token,
          expires_in: parseInt(expires_in),
          expires_at,
          refresh_token,
          token_type,
          user
        };
        const redirectType = (0, helpers_1$1.getParameterByName)("type");
        window.location.hash = "";
        return { data: { session, redirectType }, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { session: null, redirectType: null }, error };
        }
        throw error;
      }
    });
  }
  /**
   * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
   */
  _isImplicitGrantFlow() {
    return (0, helpers_1$1.isBrowser)() && (Boolean((0, helpers_1$1.getParameterByName)("access_token")) || Boolean((0, helpers_1$1.getParameterByName)("error_description")));
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session
   * and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
   *
   * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
   * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
   */
  signOut() {
    var _a2;
    return __awaiter$1(this, void 0, void 0, function* () {
      const { data, error: sessionError } = yield this.getSession();
      if (sessionError) {
        return { error: sessionError };
      }
      const accessToken = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token;
      if (accessToken) {
        const { error } = yield this.admin.signOut(accessToken);
        if (error) {
          if (!((0, errors_1.isAuthApiError)(error) && (error.status === 404 || error.status === 401))) {
            return { error };
          }
        }
      }
      yield this._removeSession();
      this._notifyAllSubscribers("SIGNED_OUT", null);
      return { error: null };
    });
  }
  /**
   * Receive a notification every time an auth event happens.
   * @param callback A callback function to be invoked when an auth event happens.
   */
  onAuthStateChange(callback) {
    const id = (0, helpers_1$1.uuid)();
    const subscription = {
      id,
      callback,
      unsubscribe: () => {
        this.stateChangeEmitters.delete(id);
      }
    };
    this.stateChangeEmitters.set(id, subscription);
    return { data: { subscription } };
  }
  /**
   * Sends a password reset request to an email address.
   * @param email The email address of the user.
   * @param options.redirectTo The URL to send the user to after they click the password reset link.
   * @param options.captchaToken Verification token received when the user completes the captcha on the site.
   */
  resetPasswordForEmail(email, options = {}) {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        return yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/recover`, {
          body: { email, gotrue_meta_security: { captcha_token: options.captchaToken } },
          headers: this.headers,
          redirectTo: options.redirectTo
        });
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */
  _refreshAccessToken(refreshToken) {
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const startedAt = Date.now();
        return yield (0, helpers_1$1.retryable)((attempt) => __awaiter$1(this, void 0, void 0, function* () {
          yield (0, helpers_1$1.sleep)(attempt * 200);
          return yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
            body: { refresh_token: refreshToken },
            headers: this.headers,
            xform: fetch_1$1._sessionResponse
          });
        }), (attempt, _, result) => result && result.error && result.error instanceof errors_1.AuthRetryableFetchError && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + (attempt + 1) * 200 - startedAt < AUTO_REFRESH_TICK_DURATION);
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: { session: null, user: null }, error };
        }
        throw error;
      }
    });
  }
  _isValidSession(maybeSession) {
    const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
    return isValidSession;
  }
  _handleProviderSignIn(provider, options = {}) {
    const url = this._getUrlForProvider(provider, {
      redirectTo: options.redirectTo,
      scopes: options.scopes,
      queryParams: options.queryParams
    });
    if ((0, helpers_1$1.isBrowser)() && !options.skipBrowserRedirect) {
      window.location.assign(url);
    }
    return { data: { provider, url }, error: null };
  }
  /**
   * Recovers the session from LocalStorage and refreshes
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  _recoverAndRefresh() {
    var _a2;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const currentSession = yield (0, helpers_1$1.getItemAsync)(this.storage, this.storageKey);
        if (!this._isValidSession(currentSession)) {
          if (currentSession !== null) {
            yield this._removeSession();
          }
          return;
        }
        const timeNow = Math.round(Date.now() / 1e3);
        if (((_a2 = currentSession.expires_at) !== null && _a2 !== void 0 ? _a2 : Infinity) < timeNow + constants_1$1.EXPIRY_MARGIN) {
          if (this.autoRefreshToken && currentSession.refresh_token) {
            const { error } = yield this._callRefreshToken(currentSession.refresh_token);
            if (error) {
              console.log(error.message);
              yield this._removeSession();
            }
          } else {
            yield this._removeSession();
          }
        } else {
          if (this.persistSession) {
            yield this._saveSession(currentSession);
          }
          this._notifyAllSubscribers("SIGNED_IN", currentSession);
        }
      } catch (err) {
        console.error(err);
        return;
      }
    });
  }
  _callRefreshToken(refreshToken) {
    var _a2, _b;
    return __awaiter$1(this, void 0, void 0, function* () {
      if (this.refreshingDeferred) {
        return this.refreshingDeferred.promise;
      }
      try {
        this.refreshingDeferred = new helpers_1$1.Deferred();
        if (!refreshToken) {
          throw new errors_1.AuthSessionMissingError();
        }
        const { data, error } = yield this._refreshAccessToken(refreshToken);
        if (error)
          throw error;
        if (!data.session)
          throw new errors_1.AuthSessionMissingError();
        yield this._saveSession(data.session);
        this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
        const result = { session: data.session, error: null };
        this.refreshingDeferred.resolve(result);
        return result;
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          const result = { session: null, error };
          (_a2 = this.refreshingDeferred) === null || _a2 === void 0 ? void 0 : _a2.resolve(result);
          return result;
        }
        (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
        throw error;
      } finally {
        this.refreshingDeferred = null;
      }
    });
  }
  _notifyAllSubscribers(event, session) {
    this.stateChangeEmitters.forEach((x) => x.callback(event, session));
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  _saveSession(session) {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (!this.persistSession) {
        this.inMemorySession = session;
      }
      if (this.persistSession && session.expires_at) {
        yield this._persistSession(session);
      }
    });
  }
  _persistSession(currentSession) {
    return (0, helpers_1$1.setItemAsync)(this.storage, this.storageKey, currentSession);
  }
  _removeSession() {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (this.persistSession) {
        yield (0, helpers_1$1.removeItemAsync)(this.storage, this.storageKey);
      } else {
        this.inMemorySession = null;
      }
    });
  }
  /**
   * Starts an auto-refresh process in the background. The session is checked
   * every few seconds. Close to the time of expiration a process is started to
   * refresh the session. If refreshing fails it will be retried for as long as
   * necessary.
   *
   * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
   * to call this function, it will be called for you.
   *
   * On browsers the refresh process works only when the tab/window is in the
   * foreground to conserve resources as well as prevent race conditions and
   * flooding auth with requests.
   *
   * On non-browser platforms the refresh process works *continuously* in the
   * background, which may not be desireable. You should hook into your
   * platform's foreground indication mechanism and call these methods
   * appropriately to conserve resources.
   *
   * {@see #stopAutoRefresh}
   */
  startAutoRefresh() {
    return __awaiter$1(this, void 0, void 0, function* () {
      yield this.stopAutoRefresh();
      const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
      this.autoRefreshTicker = ticker;
      if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
        ticker.unref();
      }
      yield this._autoRefreshTokenTick();
    });
  }
  /**
   * Stops an active auto refresh process running in the background (if any).
   * See {@link #startAutoRefresh} for more details.
   */
  stopAutoRefresh() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const ticker = this.autoRefreshTicker;
      this.autoRefreshTicker = null;
      if (ticker) {
        clearInterval(ticker);
      }
    });
  }
  /**
   * Runs the auto refresh token tick.
   */
  _autoRefreshTokenTick() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const now = Date.now();
      try {
        const { data: { session }, error } = yield this.getSession();
        if (!session || !session.refresh_token || !session.expires_at) {
          return;
        }
        const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION);
        if (expiresInTicks < AUTO_REFRESH_TICK_THRESHOLD) {
          yield this._callRefreshToken(session.refresh_token);
        }
      } catch (e2) {
        console.error("Auto refresh tick failed with error. This is likely a transient error.", e2);
      }
    });
  }
  /**
   * Registers callbacks on the browser / platform, which in-turn run
   * algorithms when the browser window/tab are in foreground. On non-browser
   * platforms it assumes always foreground.
   */
  _handleVisibilityChange() {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (!(0, helpers_1$1.isBrowser)() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
        if (this.autoRefreshToken) {
          this.startAutoRefresh();
        }
        return false;
      }
      try {
        window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", () => __awaiter$1(this, void 0, void 0, function* () {
          return yield this._onVisibilityChanged(false);
        }));
        yield this._onVisibilityChanged(true);
      } catch (error) {
        console.error("_handleVisibilityChange", error);
      }
    });
  }
  /**
   * Callback registered with `window.addEventListener('visibilitychange')`.
   */
  _onVisibilityChanged(isInitial) {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (document.visibilityState === "visible") {
        if (!isInitial) {
          yield this.initializePromise;
          yield this._recoverAndRefresh();
        }
        if (this.autoRefreshToken) {
          this.startAutoRefresh();
        }
      } else if (document.visibilityState === "hidden") {
        if (this.autoRefreshToken) {
          this.stopAutoRefresh();
        }
      }
    });
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param options.scopes A space-separated list of scopes granted to the OAuth application.
   * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
   */
  _getUrlForProvider(provider, options) {
    const urlParams = [`provider=${encodeURIComponent(provider)}`];
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
      urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
    }
    if (options === null || options === void 0 ? void 0 : options.scopes) {
      urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
    }
    if (options === null || options === void 0 ? void 0 : options.queryParams) {
      const query = new URLSearchParams2(options.queryParams);
      urlParams.push(query.toString());
    }
    return `${this.url}/authorize?${urlParams.join("&")}`;
  }
  _unenroll(params) {
    var _a2;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const { data: sessionData, error: sessionError } = yield this.getSession();
        if (sessionError) {
          return { data: null, error: sessionError };
        }
        return yield (0, fetch_1$1._request)(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
          headers: this.headers,
          jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
        });
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#enroll}
   */
  _enroll(params) {
    var _a2, _b;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const { data: sessionData, error: sessionError } = yield this.getSession();
        if (sessionError) {
          return { data: null, error: sessionError };
        }
        const { data, error } = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/factors`, {
          body: {
            friendly_name: params.friendlyName,
            factor_type: params.factorType,
            issuer: params.issuer
          },
          headers: this.headers,
          jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
        });
        if (error) {
          return { data: null, error };
        }
        if ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code) {
          data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
        }
        return { data, error: null };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#verify}
   */
  _verify(params) {
    var _a2;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const { data: sessionData, error: sessionError } = yield this.getSession();
        if (sessionError) {
          return { data: null, error: sessionError };
        }
        const { data, error } = yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
          body: { code: params.code, challenge_id: params.challengeId },
          headers: this.headers,
          jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
        });
        if (error) {
          return { data: null, error };
        }
        yield this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data.expires_in }, data));
        this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
        return { data, error };
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challenge}
   */
  _challenge(params) {
    var _a2;
    return __awaiter$1(this, void 0, void 0, function* () {
      try {
        const { data: sessionData, error: sessionError } = yield this.getSession();
        if (sessionError) {
          return { data: null, error: sessionError };
        }
        return yield (0, fetch_1$1._request)(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
          headers: this.headers,
          jwt: (_a2 = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a2 === void 0 ? void 0 : _a2.access_token
        });
      } catch (error) {
        if ((0, errors_1.isAuthError)(error)) {
          return { data: null, error };
        }
        throw error;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challengeAndVerify}
   */
  _challengeAndVerify(params) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const { data: challengeData, error: challengeError } = yield this._challenge({
        factorId: params.factorId
      });
      if (challengeError) {
        return { data: null, error: challengeError };
      }
      return yield this._verify({
        factorId: params.factorId,
        challengeId: challengeData.id,
        code: params.code
      });
    });
  }
  /**
   * {@see GoTrueMFAApi#listFactors}
   */
  _listFactors() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const { data: { user }, error: userError } = yield this.getUser();
      if (userError) {
        return { data: null, error: userError };
      }
      const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
      const totp = factors.filter((factor) => factor.factor_type === "totp" && factor.status === "verified");
      return {
        data: {
          all: factors,
          totp
        },
        error: null
      };
    });
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  _getAuthenticatorAssuranceLevel() {
    var _a2, _b;
    return __awaiter$1(this, void 0, void 0, function* () {
      const { data: { session }, error: sessionError } = yield this.getSession();
      if (sessionError) {
        return { data: null, error: sessionError };
      }
      if (!session) {
        return {
          data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
          error: null
        };
      }
      const payload = this._decodeJWT(session.access_token);
      let currentLevel = null;
      if (payload.aal) {
        currentLevel = payload.aal;
      }
      let nextLevel = currentLevel;
      const verifiedFactors = (_b = (_a2 = session.user.factors) === null || _a2 === void 0 ? void 0 : _a2.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
      if (verifiedFactors.length > 0) {
        nextLevel = "aal2";
      }
      const currentAuthenticationMethods = payload.amr || [];
      return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
    });
  }
}
GoTrueClient$1.default = GoTrueClient;
var types = {};
Object.defineProperty(types, "__esModule", { value: true });
(function(exports2) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o2, k2, desc);
  } : function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o2[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports3) {
    for (var p2 in m)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p2))
        __createBinding(exports3, m, p2);
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.GoTrueClient = exports2.GoTrueAdminApi = void 0;
  const GoTrueAdminApi_12 = __importDefault2(GoTrueAdminApi$1);
  exports2.GoTrueAdminApi = GoTrueAdminApi_12.default;
  const GoTrueClient_1 = __importDefault2(GoTrueClient$1);
  exports2.GoTrueClient = GoTrueClient_1.default;
  __exportStar(types, exports2);
  __exportStar(errors, exports2);
})(src);
Object.defineProperty(SupabaseAuthClient$1, "__esModule", { value: true });
SupabaseAuthClient$1.SupabaseAuthClient = void 0;
const index_1$1 = src;
class SupabaseAuthClient extends index_1$1.GoTrueClient {
  constructor(options) {
    super(options);
  }
}
SupabaseAuthClient$1.SupabaseAuthClient = SupabaseAuthClient;
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(SupabaseClient$1, "__esModule", { value: true });
const index_1 = src$4;
const index_2 = src$3;
const index_3 = src$2;
const index_4 = src$1;
const constants_1 = constants$1;
const fetch_1 = fetch$2;
const helpers_1 = helpers$1;
const SupabaseAuthClient_1 = SupabaseAuthClient$1;
let { URL: URL2 } = wechaturlParse;
const DEFAULT_GLOBAL_OPTIONS = {
  headers: constants_1.DEFAULT_HEADERS
};
const DEFAULT_DB_OPTIONS = {
  schema: "public"
};
const DEFAULT_AUTH_OPTIONS = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
};
const DEFAULT_REALTIME_OPTIONS = {};
class SupabaseClient {
  /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(supabaseUrl, supabaseKey, options) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    if (!supabaseUrl)
      throw new Error("supabaseUrl is required.");
    if (!supabaseKey)
      throw new Error("supabaseKey is required.");
    const _supabaseUrl = (0, helpers_1.stripTrailingSlash)(supabaseUrl);
    this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
    this.authUrl = `${_supabaseUrl}/auth/v1`;
    this.storageUrl = `${_supabaseUrl}/storage/v1`;
    const isPlatform = _supabaseUrl.match(/(supabase\.co)|(supabase\.in)/);
    if (isPlatform) {
      const urlParts = _supabaseUrl.split(".");
      this.functionsUrl = `${urlParts[0]}.functions.${urlParts[1]}.${urlParts[2]}`;
    } else {
      this.functionsUrl = `${_supabaseUrl}/functions/v1`;
    }
    const defaultStorageKey = `sb-${new URL2(this.authUrl).hostname.split(".")[0]}-auth-token`;
    const DEFAULTS = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
      global: DEFAULT_GLOBAL_OPTIONS
    };
    const settings = (0, helpers_1.applySettingDefaults)(options !== null && options !== void 0 ? options : {}, DEFAULTS);
    this.storageKey = (_b = (_a2 = settings.auth) === null || _a2 === void 0 ? void 0 : _a2.storageKey) !== null && _b !== void 0 ? _b : "";
    this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
    this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
    this.fetch = (0, fetch_1.fetchWithAuth)(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
    this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, settings.realtime));
    this.rest = new index_2.PostgrestClient(`${_supabaseUrl}/rest/v1`, {
      headers: this.headers,
      schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
      fetch: this.fetch
    });
    this._listenForAuthEvents();
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new index_1.FunctionsClient(this.functionsUrl, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  /**
   * Supabase Storage allows you to manage user-generated content, such as photos or videos.
   */
  get storage() {
    return new index_4.StorageClient(this.storageUrl, this.headers, this.fetch);
  }
  from(relation) {
    return this.rest.from(relation);
  }
  /**
   * Perform a function call.
   *
   * @param fn  The function name to call.
   * @param args  The parameters to pass to the function call.
   * @param options.head   When set to true, no data will be returned.
   * @param options.count  Count algorithm to use to count rows in a table.
   *
   */
  rpc(fn, args = {}, options) {
    return this.rest.rpc(fn, args, options);
  }
  /**
   * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
   *
   * @param {string} name - The name of the Realtime channel.
   * @param {Object} opts - The options to pass to the Realtime channel.
   *
   */
  channel(name, opts = { config: {} }) {
    return this.realtime.channel(name, opts);
  }
  /**
   * Returns all Realtime channels.
   */
  getChannels() {
    return this.realtime.getChannels();
  }
  /**
   * Unsubscribes and removes Realtime channel from Realtime client.
   *
   * @param {RealtimeChannel} channel - The name of the Realtime channel.
   *
   */
  removeChannel(channel) {
    return this.realtime.removeChannel(channel);
  }
  /**
   * Unsubscribes and removes all Realtime channels from Realtime client.
   */
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var _a2, _b;
    return __awaiter(this, void 0, void 0, function* () {
      const { data } = yield this.auth.getSession();
      return (_b = (_a2 = data.session) === null || _a2 === void 0 ? void 0 : _a2.access_token) !== null && _b !== void 0 ? _b : null;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, storageKey }, headers, fetch2) {
    const authHeaders = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient_1.SupabaseAuthClient({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, authHeaders), headers),
      storageKey,
      autoRefreshToken,
      persistSession,
      detectSessionInUrl,
      storage,
      fetch: fetch2
    });
  }
  _initRealtimeClient(options) {
    return new index_3.RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
  }
  _listenForAuthEvents() {
    let data = this.auth.onAuthStateChange((event, session) => {
      this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, "CLIENT");
    });
    return data;
  }
  _handleTokenChanged(event, token, source) {
    if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
      this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
      this.changedAccessToken = token;
    } else if (event === "SIGNED_OUT" || event === "USER_DELETED") {
      this.realtime.setAuth(this.supabaseKey);
      if (source == "STORAGE")
        this.auth.signOut();
      this.changedAccessToken = void 0;
    }
  }
}
SupabaseClient$1.default = SupabaseClient;
var wefetch = {};
Object.defineProperty(wefetch, "__esModule", { value: true });
function myfetch(url, options) {
  return new Promise((resolve2, reject) => {
    wx$1.request({
      url,
      data: options.body,
      method: options.method,
      dataType: "json",
      header: Object.prototype.toString.call(options.headers) == "[object Map]" ? Object.fromEntries(options.headers.entries()) : options.headers,
      success: resolve2,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          res.ok = true;
        } else {
          res.ok = false;
        }
        res.headers = new Map(Object.entries(lowerJSONKey(res.header)));
        res.status = res.statusCode;
        res.json = function() {
          return new Promise((resolve3, reject2) => {
            resolve3(res.data);
          });
        };
        delete res.header;
        delete res.statusCode;
        resolve2(res);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}
function lowerJSONKey(jsonObj) {
  for (var key in jsonObj) {
    jsonObj[key.toLowerCase()] = jsonObj[key];
    delete jsonObj[key];
  }
  return jsonObj;
}
wefetch.default = myfetch;
(function(exports2) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o2, k2, desc);
  } : function(o2, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o2[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports3) {
    for (var p2 in m)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p2))
        __createBinding(exports3, m, p2);
  };
  var __importDefault2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.createClient = exports2.SupabaseClient = exports2.FunctionsError = exports2.FunctionsRelayError = exports2.FunctionsFetchError = exports2.FunctionsHttpError = void 0;
  const SupabaseClient_1 = __importDefault2(SupabaseClient$1);
  __exportStar(src, exports2);
  var index_12 = src$4;
  Object.defineProperty(exports2, "FunctionsHttpError", { enumerable: true, get: function() {
    return index_12.FunctionsHttpError;
  } });
  Object.defineProperty(exports2, "FunctionsFetchError", { enumerable: true, get: function() {
    return index_12.FunctionsFetchError;
  } });
  Object.defineProperty(exports2, "FunctionsRelayError", { enumerable: true, get: function() {
    return index_12.FunctionsRelayError;
  } });
  Object.defineProperty(exports2, "FunctionsError", { enumerable: true, get: function() {
    return index_12.FunctionsError;
  } });
  __exportStar(src$2, exports2);
  var SupabaseClient_2 = SupabaseClient$1;
  Object.defineProperty(exports2, "SupabaseClient", { enumerable: true, get: function() {
    return __importDefault2(SupabaseClient_2).default;
  } });
  const wefetch_1 = __importDefault2(wefetch);
  const createClient = (supabaseUrl, supabaseKey, options) => {
    var _a2;
    return new SupabaseClient_1.default(supabaseUrl, supabaseKey, Object.assign(Object.assign({}, options), { global: {
      fetch: (...args) => (0, wefetch_1.default)(...args),
      headers: ((_a2 = options === null || options === void 0 ? void 0 : options.global) === null || _a2 === void 0 ? void 0 : _a2.headers) || {}
    } }));
  };
  exports2.createClient = createClient;
})(module$1);
const en = {
  "uni-search-bar.cancel": "cancel",
  "uni-search-bar.placeholder": "Search enter content"
};
const zhHans = {
  "uni-search-bar.cancel": "cancel",
  "uni-search-bar.placeholder": "请输入搜索内容"
};
const zhHant = {
  "uni-search-bar.cancel": "cancel",
  "uni-search-bar.placeholder": "請輸入搜索內容"
};
const messages = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant
};
const icons = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
    {
      "icon_id": "25027049",
      "name": "yanse",
      "font_class": "color",
      "unicode": "e6cf",
      "unicode_decimal": 59087
    },
    {
      "icon_id": "25027048",
      "name": "wallet",
      "font_class": "wallet",
      "unicode": "e6b1",
      "unicode_decimal": 59057
    },
    {
      "icon_id": "25015720",
      "name": "settings-filled",
      "font_class": "settings-filled",
      "unicode": "e6ce",
      "unicode_decimal": 59086
    },
    {
      "icon_id": "25015434",
      "name": "shimingrenzheng-filled",
      "font_class": "auth-filled",
      "unicode": "e6cc",
      "unicode_decimal": 59084
    },
    {
      "icon_id": "24934246",
      "name": "shop-filled",
      "font_class": "shop-filled",
      "unicode": "e6cd",
      "unicode_decimal": 59085
    },
    {
      "icon_id": "24934159",
      "name": "staff-filled-01",
      "font_class": "staff-filled",
      "unicode": "e6cb",
      "unicode_decimal": 59083
    },
    {
      "icon_id": "24932461",
      "name": "VIP-filled",
      "font_class": "vip-filled",
      "unicode": "e6c6",
      "unicode_decimal": 59078
    },
    {
      "icon_id": "24932462",
      "name": "plus_circle_fill",
      "font_class": "plus-filled",
      "unicode": "e6c7",
      "unicode_decimal": 59079
    },
    {
      "icon_id": "24932463",
      "name": "folder_add-filled",
      "font_class": "folder-add-filled",
      "unicode": "e6c8",
      "unicode_decimal": 59080
    },
    {
      "icon_id": "24932464",
      "name": "yanse-filled",
      "font_class": "color-filled",
      "unicode": "e6c9",
      "unicode_decimal": 59081
    },
    {
      "icon_id": "24932465",
      "name": "tune-filled",
      "font_class": "tune-filled",
      "unicode": "e6ca",
      "unicode_decimal": 59082
    },
    {
      "icon_id": "24932455",
      "name": "a-rilidaka-filled",
      "font_class": "calendar-filled",
      "unicode": "e6c0",
      "unicode_decimal": 59072
    },
    {
      "icon_id": "24932456",
      "name": "notification-filled",
      "font_class": "notification-filled",
      "unicode": "e6c1",
      "unicode_decimal": 59073
    },
    {
      "icon_id": "24932457",
      "name": "wallet-filled",
      "font_class": "wallet-filled",
      "unicode": "e6c2",
      "unicode_decimal": 59074
    },
    {
      "icon_id": "24932458",
      "name": "paihangbang-filled",
      "font_class": "medal-filled",
      "unicode": "e6c3",
      "unicode_decimal": 59075
    },
    {
      "icon_id": "24932459",
      "name": "gift-filled",
      "font_class": "gift-filled",
      "unicode": "e6c4",
      "unicode_decimal": 59076
    },
    {
      "icon_id": "24932460",
      "name": "fire-filled",
      "font_class": "fire-filled",
      "unicode": "e6c5",
      "unicode_decimal": 59077
    },
    {
      "icon_id": "24928001",
      "name": "refreshempty",
      "font_class": "refreshempty",
      "unicode": "e6bf",
      "unicode_decimal": 59071
    },
    {
      "icon_id": "24926853",
      "name": "location-ellipse",
      "font_class": "location-filled",
      "unicode": "e6af",
      "unicode_decimal": 59055
    },
    {
      "icon_id": "24926735",
      "name": "person-filled",
      "font_class": "person-filled",
      "unicode": "e69d",
      "unicode_decimal": 59037
    },
    {
      "icon_id": "24926703",
      "name": "personadd-filled",
      "font_class": "personadd-filled",
      "unicode": "e698",
      "unicode_decimal": 59032
    },
    {
      "icon_id": "24923351",
      "name": "back",
      "font_class": "back",
      "unicode": "e6b9",
      "unicode_decimal": 59065
    },
    {
      "icon_id": "24923352",
      "name": "forward",
      "font_class": "forward",
      "unicode": "e6ba",
      "unicode_decimal": 59066
    },
    {
      "icon_id": "24923353",
      "name": "arrowthinright",
      "font_class": "arrow-right",
      "unicode": "e6bb",
      "unicode_decimal": 59067
    },
    {
      "icon_id": "24923353",
      "name": "arrowthinright",
      "font_class": "arrowthinright",
      "unicode": "e6bb",
      "unicode_decimal": 59067
    },
    {
      "icon_id": "24923354",
      "name": "arrowthinleft",
      "font_class": "arrow-left",
      "unicode": "e6bc",
      "unicode_decimal": 59068
    },
    {
      "icon_id": "24923354",
      "name": "arrowthinleft",
      "font_class": "arrowthinleft",
      "unicode": "e6bc",
      "unicode_decimal": 59068
    },
    {
      "icon_id": "24923355",
      "name": "arrowthinup",
      "font_class": "arrow-up",
      "unicode": "e6bd",
      "unicode_decimal": 59069
    },
    {
      "icon_id": "24923355",
      "name": "arrowthinup",
      "font_class": "arrowthinup",
      "unicode": "e6bd",
      "unicode_decimal": 59069
    },
    {
      "icon_id": "24923356",
      "name": "arrowthindown",
      "font_class": "arrow-down",
      "unicode": "e6be",
      "unicode_decimal": 59070
    },
    {
      "icon_id": "24923356",
      "name": "arrowthindown",
      "font_class": "arrowthindown",
      "unicode": "e6be",
      "unicode_decimal": 59070
    },
    {
      "icon_id": "24923349",
      "name": "arrowdown",
      "font_class": "bottom",
      "unicode": "e6b8",
      "unicode_decimal": 59064
    },
    {
      "icon_id": "24923349",
      "name": "arrowdown",
      "font_class": "arrowdown",
      "unicode": "e6b8",
      "unicode_decimal": 59064
    },
    {
      "icon_id": "24923346",
      "name": "arrowright",
      "font_class": "right",
      "unicode": "e6b5",
      "unicode_decimal": 59061
    },
    {
      "icon_id": "24923346",
      "name": "arrowright",
      "font_class": "arrowright",
      "unicode": "e6b5",
      "unicode_decimal": 59061
    },
    {
      "icon_id": "24923347",
      "name": "arrowup",
      "font_class": "top",
      "unicode": "e6b6",
      "unicode_decimal": 59062
    },
    {
      "icon_id": "24923347",
      "name": "arrowup",
      "font_class": "arrowup",
      "unicode": "e6b6",
      "unicode_decimal": 59062
    },
    {
      "icon_id": "24923348",
      "name": "arrowleft",
      "font_class": "left",
      "unicode": "e6b7",
      "unicode_decimal": 59063
    },
    {
      "icon_id": "24923348",
      "name": "arrowleft",
      "font_class": "arrowleft",
      "unicode": "e6b7",
      "unicode_decimal": 59063
    },
    {
      "icon_id": "24923334",
      "name": "eye",
      "font_class": "eye",
      "unicode": "e651",
      "unicode_decimal": 58961
    },
    {
      "icon_id": "24923335",
      "name": "eye-filled",
      "font_class": "eye-filled",
      "unicode": "e66a",
      "unicode_decimal": 58986
    },
    {
      "icon_id": "24923336",
      "name": "eye-slash",
      "font_class": "eye-slash",
      "unicode": "e6b3",
      "unicode_decimal": 59059
    },
    {
      "icon_id": "24923337",
      "name": "eye-slash-filled",
      "font_class": "eye-slash-filled",
      "unicode": "e6b4",
      "unicode_decimal": 59060
    },
    {
      "icon_id": "24923305",
      "name": "info-filled",
      "font_class": "info-filled",
      "unicode": "e649",
      "unicode_decimal": 58953
    },
    {
      "icon_id": "24923299",
      "name": "reload-01",
      "font_class": "reload",
      "unicode": "e6b2",
      "unicode_decimal": 59058
    },
    {
      "icon_id": "24923195",
      "name": "mic_slash_fill",
      "font_class": "micoff-filled",
      "unicode": "e6b0",
      "unicode_decimal": 59056
    },
    {
      "icon_id": "24923165",
      "name": "map-pin-ellipse",
      "font_class": "map-pin-ellipse",
      "unicode": "e6ac",
      "unicode_decimal": 59052
    },
    {
      "icon_id": "24923166",
      "name": "map-pin",
      "font_class": "map-pin",
      "unicode": "e6ad",
      "unicode_decimal": 59053
    },
    {
      "icon_id": "24923167",
      "name": "location",
      "font_class": "location",
      "unicode": "e6ae",
      "unicode_decimal": 59054
    },
    {
      "icon_id": "24923064",
      "name": "starhalf",
      "font_class": "starhalf",
      "unicode": "e683",
      "unicode_decimal": 59011
    },
    {
      "icon_id": "24923065",
      "name": "star",
      "font_class": "star",
      "unicode": "e688",
      "unicode_decimal": 59016
    },
    {
      "icon_id": "24923066",
      "name": "star-filled",
      "font_class": "star-filled",
      "unicode": "e68f",
      "unicode_decimal": 59023
    },
    {
      "icon_id": "24899646",
      "name": "a-rilidaka",
      "font_class": "calendar",
      "unicode": "e6a0",
      "unicode_decimal": 59040
    },
    {
      "icon_id": "24899647",
      "name": "fire",
      "font_class": "fire",
      "unicode": "e6a1",
      "unicode_decimal": 59041
    },
    {
      "icon_id": "24899648",
      "name": "paihangbang",
      "font_class": "medal",
      "unicode": "e6a2",
      "unicode_decimal": 59042
    },
    {
      "icon_id": "24899649",
      "name": "font",
      "font_class": "font",
      "unicode": "e6a3",
      "unicode_decimal": 59043
    },
    {
      "icon_id": "24899650",
      "name": "gift",
      "font_class": "gift",
      "unicode": "e6a4",
      "unicode_decimal": 59044
    },
    {
      "icon_id": "24899651",
      "name": "link",
      "font_class": "link",
      "unicode": "e6a5",
      "unicode_decimal": 59045
    },
    {
      "icon_id": "24899652",
      "name": "notification",
      "font_class": "notification",
      "unicode": "e6a6",
      "unicode_decimal": 59046
    },
    {
      "icon_id": "24899653",
      "name": "staff",
      "font_class": "staff",
      "unicode": "e6a7",
      "unicode_decimal": 59047
    },
    {
      "icon_id": "24899654",
      "name": "VIP",
      "font_class": "vip",
      "unicode": "e6a8",
      "unicode_decimal": 59048
    },
    {
      "icon_id": "24899655",
      "name": "folder_add",
      "font_class": "folder-add",
      "unicode": "e6a9",
      "unicode_decimal": 59049
    },
    {
      "icon_id": "24899656",
      "name": "tune",
      "font_class": "tune",
      "unicode": "e6aa",
      "unicode_decimal": 59050
    },
    {
      "icon_id": "24899657",
      "name": "shimingrenzheng",
      "font_class": "auth",
      "unicode": "e6ab",
      "unicode_decimal": 59051
    },
    {
      "icon_id": "24899565",
      "name": "person",
      "font_class": "person",
      "unicode": "e699",
      "unicode_decimal": 59033
    },
    {
      "icon_id": "24899566",
      "name": "email-filled",
      "font_class": "email-filled",
      "unicode": "e69a",
      "unicode_decimal": 59034
    },
    {
      "icon_id": "24899567",
      "name": "phone-filled",
      "font_class": "phone-filled",
      "unicode": "e69b",
      "unicode_decimal": 59035
    },
    {
      "icon_id": "24899568",
      "name": "phone",
      "font_class": "phone",
      "unicode": "e69c",
      "unicode_decimal": 59036
    },
    {
      "icon_id": "24899570",
      "name": "email",
      "font_class": "email",
      "unicode": "e69e",
      "unicode_decimal": 59038
    },
    {
      "icon_id": "24899571",
      "name": "personadd",
      "font_class": "personadd",
      "unicode": "e69f",
      "unicode_decimal": 59039
    },
    {
      "icon_id": "24899558",
      "name": "chatboxes-filled",
      "font_class": "chatboxes-filled",
      "unicode": "e692",
      "unicode_decimal": 59026
    },
    {
      "icon_id": "24899559",
      "name": "contact",
      "font_class": "contact",
      "unicode": "e693",
      "unicode_decimal": 59027
    },
    {
      "icon_id": "24899560",
      "name": "chatbubble-filled",
      "font_class": "chatbubble-filled",
      "unicode": "e694",
      "unicode_decimal": 59028
    },
    {
      "icon_id": "24899561",
      "name": "contact-filled",
      "font_class": "contact-filled",
      "unicode": "e695",
      "unicode_decimal": 59029
    },
    {
      "icon_id": "24899562",
      "name": "chatboxes",
      "font_class": "chatboxes",
      "unicode": "e696",
      "unicode_decimal": 59030
    },
    {
      "icon_id": "24899563",
      "name": "chatbubble",
      "font_class": "chatbubble",
      "unicode": "e697",
      "unicode_decimal": 59031
    },
    {
      "icon_id": "24881290",
      "name": "upload-filled",
      "font_class": "upload-filled",
      "unicode": "e68e",
      "unicode_decimal": 59022
    },
    {
      "icon_id": "24881292",
      "name": "upload",
      "font_class": "upload",
      "unicode": "e690",
      "unicode_decimal": 59024
    },
    {
      "icon_id": "24881293",
      "name": "weixin",
      "font_class": "weixin",
      "unicode": "e691",
      "unicode_decimal": 59025
    },
    {
      "icon_id": "24881274",
      "name": "compose",
      "font_class": "compose",
      "unicode": "e67f",
      "unicode_decimal": 59007
    },
    {
      "icon_id": "24881275",
      "name": "qq",
      "font_class": "qq",
      "unicode": "e680",
      "unicode_decimal": 59008
    },
    {
      "icon_id": "24881276",
      "name": "download-filled",
      "font_class": "download-filled",
      "unicode": "e681",
      "unicode_decimal": 59009
    },
    {
      "icon_id": "24881277",
      "name": "pengyouquan",
      "font_class": "pyq",
      "unicode": "e682",
      "unicode_decimal": 59010
    },
    {
      "icon_id": "24881279",
      "name": "sound",
      "font_class": "sound",
      "unicode": "e684",
      "unicode_decimal": 59012
    },
    {
      "icon_id": "24881280",
      "name": "trash-filled",
      "font_class": "trash-filled",
      "unicode": "e685",
      "unicode_decimal": 59013
    },
    {
      "icon_id": "24881281",
      "name": "sound-filled",
      "font_class": "sound-filled",
      "unicode": "e686",
      "unicode_decimal": 59014
    },
    {
      "icon_id": "24881282",
      "name": "trash",
      "font_class": "trash",
      "unicode": "e687",
      "unicode_decimal": 59015
    },
    {
      "icon_id": "24881284",
      "name": "videocam-filled",
      "font_class": "videocam-filled",
      "unicode": "e689",
      "unicode_decimal": 59017
    },
    {
      "icon_id": "24881285",
      "name": "spinner-cycle",
      "font_class": "spinner-cycle",
      "unicode": "e68a",
      "unicode_decimal": 59018
    },
    {
      "icon_id": "24881286",
      "name": "weibo",
      "font_class": "weibo",
      "unicode": "e68b",
      "unicode_decimal": 59019
    },
    {
      "icon_id": "24881288",
      "name": "videocam",
      "font_class": "videocam",
      "unicode": "e68c",
      "unicode_decimal": 59020
    },
    {
      "icon_id": "24881289",
      "name": "download",
      "font_class": "download",
      "unicode": "e68d",
      "unicode_decimal": 59021
    },
    {
      "icon_id": "24879601",
      "name": "help",
      "font_class": "help",
      "unicode": "e679",
      "unicode_decimal": 59001
    },
    {
      "icon_id": "24879602",
      "name": "navigate-filled",
      "font_class": "navigate-filled",
      "unicode": "e67a",
      "unicode_decimal": 59002
    },
    {
      "icon_id": "24879603",
      "name": "plusempty",
      "font_class": "plusempty",
      "unicode": "e67b",
      "unicode_decimal": 59003
    },
    {
      "icon_id": "24879604",
      "name": "smallcircle",
      "font_class": "smallcircle",
      "unicode": "e67c",
      "unicode_decimal": 59004
    },
    {
      "icon_id": "24879605",
      "name": "minus-filled",
      "font_class": "minus-filled",
      "unicode": "e67d",
      "unicode_decimal": 59005
    },
    {
      "icon_id": "24879606",
      "name": "micoff",
      "font_class": "micoff",
      "unicode": "e67e",
      "unicode_decimal": 59006
    },
    {
      "icon_id": "24879588",
      "name": "closeempty",
      "font_class": "closeempty",
      "unicode": "e66c",
      "unicode_decimal": 58988
    },
    {
      "icon_id": "24879589",
      "name": "clear",
      "font_class": "clear",
      "unicode": "e66d",
      "unicode_decimal": 58989
    },
    {
      "icon_id": "24879590",
      "name": "navigate",
      "font_class": "navigate",
      "unicode": "e66e",
      "unicode_decimal": 58990
    },
    {
      "icon_id": "24879591",
      "name": "minus",
      "font_class": "minus",
      "unicode": "e66f",
      "unicode_decimal": 58991
    },
    {
      "icon_id": "24879592",
      "name": "image",
      "font_class": "image",
      "unicode": "e670",
      "unicode_decimal": 58992
    },
    {
      "icon_id": "24879593",
      "name": "mic",
      "font_class": "mic",
      "unicode": "e671",
      "unicode_decimal": 58993
    },
    {
      "icon_id": "24879594",
      "name": "paperplane",
      "font_class": "paperplane",
      "unicode": "e672",
      "unicode_decimal": 58994
    },
    {
      "icon_id": "24879595",
      "name": "close",
      "font_class": "close",
      "unicode": "e673",
      "unicode_decimal": 58995
    },
    {
      "icon_id": "24879596",
      "name": "help-filled",
      "font_class": "help-filled",
      "unicode": "e674",
      "unicode_decimal": 58996
    },
    {
      "icon_id": "24879597",
      "name": "plus-filled",
      "font_class": "paperplane-filled",
      "unicode": "e675",
      "unicode_decimal": 58997
    },
    {
      "icon_id": "24879598",
      "name": "plus",
      "font_class": "plus",
      "unicode": "e676",
      "unicode_decimal": 58998
    },
    {
      "icon_id": "24879599",
      "name": "mic-filled",
      "font_class": "mic-filled",
      "unicode": "e677",
      "unicode_decimal": 58999
    },
    {
      "icon_id": "24879600",
      "name": "image-filled",
      "font_class": "image-filled",
      "unicode": "e678",
      "unicode_decimal": 59e3
    },
    {
      "icon_id": "24855900",
      "name": "locked-filled",
      "font_class": "locked-filled",
      "unicode": "e668",
      "unicode_decimal": 58984
    },
    {
      "icon_id": "24855901",
      "name": "info",
      "font_class": "info",
      "unicode": "e669",
      "unicode_decimal": 58985
    },
    {
      "icon_id": "24855903",
      "name": "locked",
      "font_class": "locked",
      "unicode": "e66b",
      "unicode_decimal": 58987
    },
    {
      "icon_id": "24855884",
      "name": "camera-filled",
      "font_class": "camera-filled",
      "unicode": "e658",
      "unicode_decimal": 58968
    },
    {
      "icon_id": "24855885",
      "name": "chat-filled",
      "font_class": "chat-filled",
      "unicode": "e659",
      "unicode_decimal": 58969
    },
    {
      "icon_id": "24855886",
      "name": "camera",
      "font_class": "camera",
      "unicode": "e65a",
      "unicode_decimal": 58970
    },
    {
      "icon_id": "24855887",
      "name": "circle",
      "font_class": "circle",
      "unicode": "e65b",
      "unicode_decimal": 58971
    },
    {
      "icon_id": "24855888",
      "name": "checkmarkempty",
      "font_class": "checkmarkempty",
      "unicode": "e65c",
      "unicode_decimal": 58972
    },
    {
      "icon_id": "24855889",
      "name": "chat",
      "font_class": "chat",
      "unicode": "e65d",
      "unicode_decimal": 58973
    },
    {
      "icon_id": "24855890",
      "name": "circle-filled",
      "font_class": "circle-filled",
      "unicode": "e65e",
      "unicode_decimal": 58974
    },
    {
      "icon_id": "24855891",
      "name": "flag",
      "font_class": "flag",
      "unicode": "e65f",
      "unicode_decimal": 58975
    },
    {
      "icon_id": "24855892",
      "name": "flag-filled",
      "font_class": "flag-filled",
      "unicode": "e660",
      "unicode_decimal": 58976
    },
    {
      "icon_id": "24855893",
      "name": "gear-filled",
      "font_class": "gear-filled",
      "unicode": "e661",
      "unicode_decimal": 58977
    },
    {
      "icon_id": "24855894",
      "name": "home",
      "font_class": "home",
      "unicode": "e662",
      "unicode_decimal": 58978
    },
    {
      "icon_id": "24855895",
      "name": "home-filled",
      "font_class": "home-filled",
      "unicode": "e663",
      "unicode_decimal": 58979
    },
    {
      "icon_id": "24855896",
      "name": "gear",
      "font_class": "gear",
      "unicode": "e664",
      "unicode_decimal": 58980
    },
    {
      "icon_id": "24855897",
      "name": "smallcircle-filled",
      "font_class": "smallcircle-filled",
      "unicode": "e665",
      "unicode_decimal": 58981
    },
    {
      "icon_id": "24855898",
      "name": "map-filled",
      "font_class": "map-filled",
      "unicode": "e666",
      "unicode_decimal": 58982
    },
    {
      "icon_id": "24855899",
      "name": "map",
      "font_class": "map",
      "unicode": "e667",
      "unicode_decimal": 58983
    },
    {
      "icon_id": "24855825",
      "name": "refresh-filled",
      "font_class": "refresh-filled",
      "unicode": "e656",
      "unicode_decimal": 58966
    },
    {
      "icon_id": "24855826",
      "name": "refresh",
      "font_class": "refresh",
      "unicode": "e657",
      "unicode_decimal": 58967
    },
    {
      "icon_id": "24855808",
      "name": "cloud-upload",
      "font_class": "cloud-upload",
      "unicode": "e645",
      "unicode_decimal": 58949
    },
    {
      "icon_id": "24855809",
      "name": "cloud-download-filled",
      "font_class": "cloud-download-filled",
      "unicode": "e646",
      "unicode_decimal": 58950
    },
    {
      "icon_id": "24855810",
      "name": "cloud-download",
      "font_class": "cloud-download",
      "unicode": "e647",
      "unicode_decimal": 58951
    },
    {
      "icon_id": "24855811",
      "name": "cloud-upload-filled",
      "font_class": "cloud-upload-filled",
      "unicode": "e648",
      "unicode_decimal": 58952
    },
    {
      "icon_id": "24855813",
      "name": "redo",
      "font_class": "redo",
      "unicode": "e64a",
      "unicode_decimal": 58954
    },
    {
      "icon_id": "24855814",
      "name": "images-filled",
      "font_class": "images-filled",
      "unicode": "e64b",
      "unicode_decimal": 58955
    },
    {
      "icon_id": "24855815",
      "name": "undo-filled",
      "font_class": "undo-filled",
      "unicode": "e64c",
      "unicode_decimal": 58956
    },
    {
      "icon_id": "24855816",
      "name": "more",
      "font_class": "more",
      "unicode": "e64d",
      "unicode_decimal": 58957
    },
    {
      "icon_id": "24855817",
      "name": "more-filled",
      "font_class": "more-filled",
      "unicode": "e64e",
      "unicode_decimal": 58958
    },
    {
      "icon_id": "24855818",
      "name": "undo",
      "font_class": "undo",
      "unicode": "e64f",
      "unicode_decimal": 58959
    },
    {
      "icon_id": "24855819",
      "name": "images",
      "font_class": "images",
      "unicode": "e650",
      "unicode_decimal": 58960
    },
    {
      "icon_id": "24855821",
      "name": "paperclip",
      "font_class": "paperclip",
      "unicode": "e652",
      "unicode_decimal": 58962
    },
    {
      "icon_id": "24855822",
      "name": "settings",
      "font_class": "settings",
      "unicode": "e653",
      "unicode_decimal": 58963
    },
    {
      "icon_id": "24855823",
      "name": "search",
      "font_class": "search",
      "unicode": "e654",
      "unicode_decimal": 58964
    },
    {
      "icon_id": "24855824",
      "name": "redo-filled",
      "font_class": "redo-filled",
      "unicode": "e655",
      "unicode_decimal": 58965
    },
    {
      "icon_id": "24841702",
      "name": "list",
      "font_class": "list",
      "unicode": "e644",
      "unicode_decimal": 58948
    },
    {
      "icon_id": "24841489",
      "name": "mail-open-filled",
      "font_class": "mail-open-filled",
      "unicode": "e63a",
      "unicode_decimal": 58938
    },
    {
      "icon_id": "24841491",
      "name": "hand-thumbsdown-filled",
      "font_class": "hand-down-filled",
      "unicode": "e63c",
      "unicode_decimal": 58940
    },
    {
      "icon_id": "24841492",
      "name": "hand-thumbsdown",
      "font_class": "hand-down",
      "unicode": "e63d",
      "unicode_decimal": 58941
    },
    {
      "icon_id": "24841493",
      "name": "hand-thumbsup-filled",
      "font_class": "hand-up-filled",
      "unicode": "e63e",
      "unicode_decimal": 58942
    },
    {
      "icon_id": "24841494",
      "name": "hand-thumbsup",
      "font_class": "hand-up",
      "unicode": "e63f",
      "unicode_decimal": 58943
    },
    {
      "icon_id": "24841496",
      "name": "heart-filled",
      "font_class": "heart-filled",
      "unicode": "e641",
      "unicode_decimal": 58945
    },
    {
      "icon_id": "24841498",
      "name": "mail-open",
      "font_class": "mail-open",
      "unicode": "e643",
      "unicode_decimal": 58947
    },
    {
      "icon_id": "24841488",
      "name": "heart",
      "font_class": "heart",
      "unicode": "e639",
      "unicode_decimal": 58937
    },
    {
      "icon_id": "24839963",
      "name": "loop",
      "font_class": "loop",
      "unicode": "e633",
      "unicode_decimal": 58931
    },
    {
      "icon_id": "24839866",
      "name": "pulldown",
      "font_class": "pulldown",
      "unicode": "e632",
      "unicode_decimal": 58930
    },
    {
      "icon_id": "24813798",
      "name": "scan",
      "font_class": "scan",
      "unicode": "e62a",
      "unicode_decimal": 58922
    },
    {
      "icon_id": "24813786",
      "name": "bars",
      "font_class": "bars",
      "unicode": "e627",
      "unicode_decimal": 58919
    },
    {
      "icon_id": "24813788",
      "name": "cart-filled",
      "font_class": "cart-filled",
      "unicode": "e629",
      "unicode_decimal": 58921
    },
    {
      "icon_id": "24813790",
      "name": "checkbox",
      "font_class": "checkbox",
      "unicode": "e62b",
      "unicode_decimal": 58923
    },
    {
      "icon_id": "24813791",
      "name": "checkbox-filled",
      "font_class": "checkbox-filled",
      "unicode": "e62c",
      "unicode_decimal": 58924
    },
    {
      "icon_id": "24813794",
      "name": "shop",
      "font_class": "shop",
      "unicode": "e62f",
      "unicode_decimal": 58927
    },
    {
      "icon_id": "24813795",
      "name": "headphones",
      "font_class": "headphones",
      "unicode": "e630",
      "unicode_decimal": 58928
    },
    {
      "icon_id": "24813796",
      "name": "cart",
      "font_class": "cart",
      "unicode": "e631",
      "unicode_decimal": 58929
    }
  ]
};
let mpMixins = {};
mpMixins = {
  data() {
    return {
      is_show: "none"
    };
  },
  watch: {
    show(newVal) {
      this.is_show = this.show;
    }
  },
  created() {
    this.swipeaction = this.getSwipeAction();
    if (this.swipeaction && Array.isArray(this.swipeaction.children)) {
      this.swipeaction.children.push(this);
    }
  },
  mounted() {
    this.is_show = this.show;
  },
  methods: {
    // wxs 中调用
    closeSwipe(e2) {
      if (this.autoClose && this.swipeaction) {
        this.swipeaction.closeOther(this);
      }
    },
    change(e2) {
      this.$emit("change", e2.open);
      if (this.is_show !== e2.open) {
        this.is_show = e2.open;
      }
    },
    appTouchStart(e2) {
      const {
        clientX
      } = e2.changedTouches[0];
      this.clientX = clientX;
      this.timestamp = (/* @__PURE__ */ new Date()).getTime();
    },
    appTouchEnd(e2, index2, item, position) {
      const {
        clientX
      } = e2.changedTouches[0];
      let diff2 = Math.abs(this.clientX - clientX);
      let time = (/* @__PURE__ */ new Date()).getTime() - this.timestamp;
      if (diff2 < 40 && time < 300) {
        this.$emit("click", {
          content: item,
          index: index2,
          position
        });
      }
    },
    onClickForPC(index2, item, position) {
      return;
    }
  }
};
const mpwxs = mpMixins;
let bindIngXMixins = {};
let otherMixins = {};
class MPAnimation {
  constructor(options, _this) {
    this.options = options;
    this.animation = index.createAnimation({
      ...options
    });
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;
  }
  _nvuePushAnimates(type, args) {
    let aniObj = this.currentStepAnimates[this.next];
    let styles = {};
    if (!aniObj) {
      styles = {
        styles: {},
        config: {}
      };
    } else {
      styles = aniObj;
    }
    if (animateTypes1.includes(type)) {
      if (!styles.styles.transform) {
        styles.styles.transform = "";
      }
      let unit = "";
      if (type === "rotate") {
        unit = "deg";
      }
      styles.styles.transform += `${type}(${args + unit}) `;
    } else {
      styles.styles[type] = `${args}`;
    }
    this.currentStepAnimates[this.next] = styles;
  }
  _animateRun(styles = {}, config = {}) {
    let ref2 = this.$.$refs["ani"].ref;
    if (!ref2)
      return;
    return new Promise((resolve2, reject) => {
      nvueAnimation.transition(ref2, {
        styles,
        ...config
      }, (res) => {
        resolve2();
      });
    });
  }
  _nvueNextAnimate(animates, step = 0, fn) {
    let obj = animates[step];
    if (obj) {
      let {
        styles,
        config
      } = obj;
      this._animateRun(styles, config).then(() => {
        step += 1;
        this._nvueNextAnimate(animates, step, fn);
      });
    } else {
      this.currentStepAnimates = {};
      typeof fn === "function" && fn();
      this.isEnd = true;
    }
  }
  step(config = {}) {
    this.animation.step(config);
    return this;
  }
  run(fn) {
    this.$.animationData = this.animation.export();
    this.$.timer = setTimeout(() => {
      typeof fn === "function" && fn();
    }, this.$.durationTime);
  }
}
const animateTypes1 = [
  "matrix",
  "matrix3d",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scale3d",
  "scaleX",
  "scaleY",
  "scaleZ",
  "skew",
  "skewX",
  "skewY",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ"
];
const animateTypes2 = ["opacity", "backgroundColor"];
const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
  MPAnimation.prototype[type] = function(...args) {
    this.animation[type](...args);
    return this;
  };
});
function createAnimation(option, _this) {
  if (!_this)
    return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
exports._export_sfc = _export_sfc;
exports.bindIngXMixins = bindIngXMixins;
exports.createAnimation = createAnimation;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.f = f;
exports.icons = icons;
exports.index = index;
exports.initVueI18n = initVueI18n;
exports.messages = messages;
exports.module = module$1;
exports.mpwxs = mpwxs;
exports.n = n;
exports.o = o;
exports.otherMixins = otherMixins;
exports.p = p;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.sr = sr;
exports.t = t;
exports.wx$1 = wx$1;
