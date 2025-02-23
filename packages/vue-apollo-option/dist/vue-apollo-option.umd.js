(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['vue-apollo'] = {}));
}(this, (function (exports) { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /* eslint-disable no-undefined,no-param-reassign,no-shadow */

  /**
   * Throttle execution of a function. Especially useful for rate limiting
   * execution of handlers on events like resize and scroll.
   *
   * @param  {number}    delay -          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param  {boolean}   [noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
   *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
   *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
   *                                    the internal counter is reset).
   * @param  {Function}  callback -       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
   *                                    to `callback` when the throttled-function is executed.
   * @param  {boolean}   [debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
   *                                    schedule `callback` to execute after `delay` ms.
   *
   * @returns {Function}  A new, throttled, function.
   */
  function throttle(delay, noTrailing, callback, debounceMode) {
    /*
     * After wrapper has stopped being called, this timeout ensures that
     * `callback` is executed at the proper times in `throttle` and `end`
     * debounce modes.
     */
    var timeoutID;
    var cancelled = false; // Keep track of the last time `callback` was executed.

    var lastExec = 0; // Function to clear existing timeout

    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    } // Function to cancel next exec

    function cancel() {
      clearExistingTimeout();
      cancelled = true;
    } // `noTrailing` defaults to falsy.

    if (typeof noTrailing !== 'boolean') {
      debounceMode = callback;
      callback = noTrailing;
      noTrailing = undefined;
    }
    /*
     * The `wrapper` function encapsulates all of the throttling / debouncing
     * functionality and when executed will limit the rate at which `callback`
     * is executed.
     */

    function wrapper() {
      for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
        arguments_[_key] = arguments[_key];
      }
      var self = this;
      var elapsed = Date.now() - lastExec;
      if (cancelled) {
        return;
      } // Execute `callback` and update the `lastExec` timestamp.

      function exec() {
        lastExec = Date.now();
        callback.apply(self, arguments_);
      }
      /*
       * If `debounceMode` is true (at begin) this is used to clear the flag
       * to allow future `callback` executions.
       */

      function clear() {
        timeoutID = undefined;
      }
      if (debounceMode && !timeoutID) {
        /*
         * Since `wrapper` is being called for the first time and
         * `debounceMode` is true (at begin), execute `callback`.
         */
        exec();
      }
      clearExistingTimeout();
      if (debounceMode === undefined && elapsed > delay) {
        /*
         * In throttle mode, if `delay` time has been exceeded, execute
         * `callback`.
         */
        exec();
      } else if (noTrailing !== true) {
        /*
         * In trailing throttle mode, since `delay` time has not been
         * exceeded, schedule `callback` to execute `delay` ms after most
         * recent execution.
         *
         * If `debounceMode` is true (at begin), schedule `clear` to execute
         * after `delay` ms.
         *
         * If `debounceMode` is false (at end), schedule `callback` to
         * execute after `delay` ms.
         */
        timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
      }
    }
    wrapper.cancel = cancel; // Return the wrapper function.

    return wrapper;
  }

  /* eslint-disable no-undefined */
  /**
   * Debounce execution of a function. Debouncing, unlike throttling,
   * guarantees that a function is only executed a single time, either at the
   * very beginning of a series of calls, or at the very end.
   *
   * @param  {number}   delay -         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param  {boolean}  [atBegin] -     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
   *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
   *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
   * @param  {Function} callback -      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
   *                                  to `callback` when the debounced-function is executed.
   *
   * @returns {Function} A new, debounced function.
   */

  function debounce(delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
  }

  var esm = /*#__PURE__*/Object.freeze({
    __proto__: null,
    debounce: debounce,
    throttle: throttle
  });

  function factory(action) {
    return function (cb, time) {
      return action(time, cb);
    };
  }
  var throttle$1 = factory(esm.throttle);
  var debounce$1 = factory(esm.debounce);
  var reapply = function reapply(options, context) {
    while (typeof options === 'function') {
      options = options.call(context);
    }
    return options;
  };
  var omit = function omit(obj, properties) {
    return Object.entries(obj).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        key = _ref2[0];
      return !properties.includes(key);
    }).reduce(function (c, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];
      c[key] = val;
      return c;
    }, {});
  };
  var addGqlError = function addGqlError(error) {
    if (error.graphQLErrors && error.graphQLErrors.length) {
      error.gqlError = error.graphQLErrors[0];
    }
  };

  var isServer = typeof window === 'undefined';

  var skippAllKeys = {
    query: '_skipAllQueries',
    subscription: '_skipAllSubscriptions'
  };
  var SmartApollo = /*#__PURE__*/function () {
    function SmartApollo(vm, key, options) {
      _classCallCheck(this, SmartApollo);
      _defineProperty(this, "type", null);
      _defineProperty(this, "vueApolloSpecialKeys", []);
      this.vm = vm;
      this.key = key;
      this.initialOptions = options;
      this.options = Object.assign({}, options);
      this._skip = false;
      this._pollInterval = null;
      this._watchers = [];
      this._destroyed = false;
      this.lastApolloOptions = null;
    }
    _createClass(SmartApollo, [{
      key: "autostart",
      value: function autostart() {
        var _this = this;
        if (typeof this.options.skip === 'function') {
          this._skipWatcher = this.vm.$watch(function () {
            return _this.options.skip.call(_this.vm, _this.vm, _this.key);
          }, this.skipChanged.bind(this), {
            immediate: true,
            deep: this.options.deep
          });
        } else if (!this.options.skip && !this.allSkip) {
          this.start();
        } else {
          this._skip = true;
        }
        if (typeof this.options.pollInterval === 'function') {
          this._pollWatcher = this.vm.$watch(this.options.pollInterval.bind(this.vm), this.pollIntervalChanged.bind(this), {
            immediate: true
          });
        }
      }
    }, {
      key: "pollIntervalChanged",
      value: function pollIntervalChanged(value, oldValue) {
        if (value !== oldValue) {
          this.pollInterval = value;
          if (value == null) {
            this.stopPolling();
          } else {
            this.startPolling(value);
          }
        }
      }
    }, {
      key: "skipChanged",
      value: function skipChanged(value, oldValue) {
        if (value !== oldValue) {
          this.skip = value;
        }
      }
    }, {
      key: "pollInterval",
      get: function get() {
        return this._pollInterval;
      },
      set: function set(value) {
        this._pollInterval = value;
      }
    }, {
      key: "skip",
      get: function get() {
        return this._skip;
      },
      set: function set(value) {
        if (value || this.allSkip) {
          this.stop();
        } else {
          this.start();
        }
        this._skip = value;
      }
    }, {
      key: "allSkip",
      get: function get() {
        return this.vm.$apollo[skippAllKeys[this.type]];
      }
    }, {
      key: "refresh",
      value: function refresh() {
        if (!this._skip) {
          this.stop();
          this.start();
        }
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;
        this.starting = true;

        // Reactive options
        var _loop = function _loop() {
          var prop = _ref2[_i2];
          if (typeof _this2.initialOptions[prop] === 'function') {
            var queryCb = _this2.initialOptions[prop].bind(_this2.vm);
            _this2.options[prop] = queryCb();
            var cb = function cb(query) {
              if (_this2._destroyed) return;
              _this2.options[prop] = query;
              _this2.refresh();
            };
            if (!isServer) {
              cb = _this2.options.throttle ? throttle$1(cb, _this2.options.throttle) : cb;
              cb = _this2.options.debounce ? debounce$1(cb, _this2.options.debounce) : cb;
            }
            _this2._watchers.push(_this2.vm.$watch(queryCb, cb, {
              deep: _this2.options.deep
            }));
          }
        };
        for (var _i2 = 0, _ref2 = ['query', 'document', 'context']; _i2 < _ref2.length; _i2++) {
          _loop();
        } // GraphQL Variables
        if (typeof this.options.variables === 'function') {
          var cb = this.executeApollo.bind(this);
          if (!isServer) {
            cb = this.options.throttle ? throttle$1(cb, this.options.throttle) : cb;
            cb = this.options.debounce ? debounce$1(cb, this.options.debounce) : cb;
          }
          this._watchers.push(this.vm.$watch(function () {
            return typeof _this2.options.variables === 'function' ? _this2.options.variables.call(_this2.vm) : _this2.options.variables;
          }, cb, {
            immediate: true,
            deep: this.options.deep
          }));
        } else {
          this.executeApollo(this.options.variables);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        for (var _i4 = 0, _this$_watchers2 = this._watchers; _i4 < _this$_watchers2.length; _i4++) {
          var unwatch = _this$_watchers2[_i4];
          unwatch();
        }
        if (this.sub) {
          this.sub.unsubscribe();
          this.sub = null;
        }
      }
    }, {
      key: "generateApolloOptions",
      value: function generateApolloOptions(variables) {
        var apolloOptions = omit(this.options, this.vueApolloSpecialKeys);
        apolloOptions.variables = variables;
        this.lastApolloOptions = apolloOptions;
        return apolloOptions;
      }
    }, {
      key: "executeApollo",
      value: function executeApollo(variables) {
        this.starting = false;
      }
    }, {
      key: "nextResult",
      value: function nextResult(result) {
        var error = result.error;
        if (error) addGqlError(error);
      }
    }, {
      key: "callHandlers",
      value: function callHandlers(handlers) {
        var catched = false;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        for (var _i6 = 0; _i6 < handlers.length; _i6++) {
          var handler = handlers[_i6];
          if (handler) {
            catched = true;
            var result = handler.apply(this.vm, args);
            if (typeof result !== 'undefined' && !result) {
              break;
            }
          }
        }
        return catched;
      }
    }, {
      key: "errorHandler",
      value: function errorHandler() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return this.callHandlers.apply(this, [[this.options.error, this.vm.$apollo.error, this.vm.$apollo.provider.errorHandler]].concat(args));
      }
    }, {
      key: "catchError",
      value: function catchError(error) {
        addGqlError(error);
        var catched = this.errorHandler(error, this.vm, this.key, this.type, this.lastApolloOptions);
        if (catched) return;
        if (error.graphQLErrors && error.graphQLErrors.length !== 0) {
          console.error("GraphQL execution errors for ".concat(this.type, " '").concat(this.key, "'"));
          for (var _i8 = 0, _error$graphQLErrors2 = error.graphQLErrors; _i8 < _error$graphQLErrors2.length; _i8++) {
            var e = _error$graphQLErrors2[_i8];
            console.error(e);
          }
        } else if (error.networkError) {
          console.error("Error sending the ".concat(this.type, " '").concat(this.key, "'"), error.networkError);
        } else {
          console.error("[vue-apollo] An error has occurred for ".concat(this.type, " '").concat(this.key, "'"));
          if (Array.isArray(error)) {
            var _console;
            (_console = console).error.apply(_console, _toConsumableArray(error));
          } else {
            console.error(error);
          }
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this._destroyed) return;
        this._destroyed = true;
        this.stop();
        if (this._skipWatcher) {
          this._skipWatcher();
        }
      }
    }]);
    return SmartApollo;
  }();

  var VUE_APOLLO_QUERY_KEYWORDS = ['variables', 'watch', 'update', 'result', 'error', 'loadingKey', 'watchLoading', 'skip', 'throttle', 'debounce', 'subscribeToMore', 'prefetch', 'manual'];

  var SmartQuery = /*#__PURE__*/function (_SmartApollo) {
    _inherits(SmartQuery, _SmartApollo);
    var _super = _createSuper(SmartQuery);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function SmartQuery(vm, key, options) {
      var _this;
      var autostart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      _classCallCheck(this, SmartQuery);
      // Add reactive data related to the query
      if (vm.$data.$apolloData && !vm.$data.$apolloData.queries[key]) {
        vm.$data.$apolloData.queries[key] = {
          loading: false
        };
      }
      _this = _super.call(this, vm, key, options);
      _defineProperty(_assertThisInitialized(_this), "type", 'query');
      _defineProperty(_assertThisInitialized(_this), "vueApolloSpecialKeys", VUE_APOLLO_QUERY_KEYWORDS);
      _defineProperty(_assertThisInitialized(_this), "_loading", false);
      _defineProperty(_assertThisInitialized(_this), "_linkedSubscriptions", []);
      if (isServer) {
        _this.firstRun = new Promise(function (resolve, reject) {
          _this._firstRunResolve = resolve;
          _this._firstRunReject = reject;
        });
      }
      if (isServer) {
        _this.options.fetchPolicy = 'network-only';
      }
      if (!options.manual) {
        _this.hasDataField = Object.prototype.hasOwnProperty.call(_this.vm.$data, key);
        if (_this.hasDataField) {
          Object.defineProperty(_this.vm.$data.$apolloData.data, key, {
            get: function get() {
              return _this.vm.$data[key];
            },
            enumerable: true,
            configurable: true
          });
        } else {
          Object.defineProperty(_this.vm.$data, key, {
            get: function get() {
              return _this.vm.$data.$apolloData.data[key];
            },
            enumerable: true,
            configurable: true
          });
        }
      }
      if (autostart) {
        _this.autostart();
      }
      return _this;
    }
    _createClass(SmartQuery, [{
      key: "client",
      get: function get() {
        return this.vm.$apollo.getClient(this.options);
      }
    }, {
      key: "loading",
      get: function get() {
        return this.vm.$data.$apolloData && this.vm.$data.$apolloData.queries[this.key] ? this.vm.$data.$apolloData.queries[this.key].loading : this._loading;
      },
      set: function set(value) {
        if (this._loading !== value) {
          this._loading = value;
          if (this.vm.$data.$apolloData && this.vm.$data.$apolloData.queries[this.key]) {
            this.vm.$data.$apolloData.queries[this.key].loading = value;
            this.vm.$data.$apolloData.loading += value ? 1 : -1;
          }
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        _get(_getPrototypeOf(SmartQuery.prototype), "stop", this).call(this);
        this.loadingDone();
        if (this.observer) {
          this.observer.stopPolling();
          this.observer = null;
        }
      }
    }, {
      key: "generateApolloOptions",
      value: function generateApolloOptions(variables) {
        var apolloOptions = _get(_getPrototypeOf(SmartQuery.prototype), "generateApolloOptions", this).call(this, variables);
        if (this.vm.$isServer) {
          // Don't poll on the server, that would run indefinitely
          delete apolloOptions.pollInterval;
        }
        return apolloOptions;
      }
    }, {
      key: "executeApollo",
      value: function executeApollo(variables) {
        if (this._destroyed) return;
        var variablesJson = JSON.stringify(variables);
        if (this.sub) {
          if (variablesJson === this.previousVariablesJson) {
            return;
          }
          this.sub.unsubscribe();

          // Subscribe to more subs
          for (var _i2 = 0, _this$_linkedSubscrip2 = this._linkedSubscriptions; _i2 < _this$_linkedSubscrip2.length; _i2++) {
            var sub = _this$_linkedSubscrip2[_i2];
            sub.stop();
          }
        }
        this.previousVariablesJson = variablesJson;

        // Create observer
        this.observer = this.vm.$apollo.watchQuery(this.generateApolloOptions(variables));
        this.startQuerySubscription();
        if (this.options.fetchPolicy !== 'no-cache' || this.options.notifyOnNetworkStatusChange) {
          var currentResult = this.retrieveCurrentResult();
          if (this.options.notifyOnNetworkStatusChange ||
          // Initial call of next result when it's not loading (for Apollo Client 3)
          this.observer.getCurrentResult && !currentResult.loading) {
            this.nextResult(currentResult);
          }
        }
        _get(_getPrototypeOf(SmartQuery.prototype), "executeApollo", this).call(this, variables);

        // Subscribe to more subs
        for (var _i4 = 0, _this$_linkedSubscrip4 = this._linkedSubscriptions; _i4 < _this$_linkedSubscrip4.length; _i4++) {
          var _sub = _this$_linkedSubscrip4[_i4];
          _sub.start();
        }
      }
    }, {
      key: "startQuerySubscription",
      value: function startQuerySubscription() {
        if (this.sub && !this.sub.closed) return;

        // Create subscription
        this.sub = this.observer.subscribe({
          next: this.nextResult.bind(this),
          error: this.catchError.bind(this)
        });
      }

      /**
       * May update loading state
       */
    }, {
      key: "retrieveCurrentResult",
      value: function retrieveCurrentResult() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var currentResult = this.observer.getCurrentResult ? this.observer.getCurrentResult() : this.observer.currentResult();
        if (force || currentResult.loading) {
          if (!this.loading) {
            this.applyLoadingModifier(1);
          }
          this.loading = true;
        }
        return currentResult;
      }
    }, {
      key: "nextResult",
      value: function nextResult(result) {
        _get(_getPrototypeOf(SmartQuery.prototype), "nextResult", this).call(this, result);
        var data = result.data,
          loading = result.loading,
          error = result.error,
          errors = result.errors;
        var anyErrors = errors && errors.length;
        if (error || anyErrors) {
          this.firstRunReject(error);
        }
        if (!loading) {
          this.loadingDone();
        }

        // If `errorPolicy` is set to `all`, an error won't be thrown
        // Instead result will have an `errors` array of GraphQL Errors
        // so we need to reconstruct an error object similar to the normal one
        if (!error && anyErrors) {
          var e = new Error("GraphQL error: ".concat(errors.map(function (e) {
            return e.message;
          }).join(' | ')));
          Object.assign(e, {
            graphQLErrors: errors,
            networkError: null
          });
          // We skip query catchError logic
          // as we only want to dispatch the error
          _get(_getPrototypeOf(SmartQuery.prototype), "catchError", this).call(this, e);
        }
        if (this.observer.options.errorPolicy === 'none' && (error || anyErrors)) {
          // Don't apply result
          return;
        }
        var hasResultCallback = typeof this.options.result === 'function';
        if (data == null) ; else if (!this.options.manual) {
          if (typeof this.options.update === 'function') {
            this.setData(this.options.update.call(this.vm, data));
          } else if (typeof data[this.key] === 'undefined' && Object.keys(data).length) {
            console.error("Missing ".concat(this.key, " attribute on result"), data);
          } else {
            this.setData(data[this.key]);
          }
        } else if (!hasResultCallback) {
          console.error("".concat(this.key, " query must have a 'result' hook in manual mode"));
        }
        if (hasResultCallback) {
          this.options.result.call(this.vm, result, this.key);
        }
      }
    }, {
      key: "setData",
      value: function setData(value) {
        var target = this.hasDataField ? this.vm.$data : this.vm.$data.$apolloData.data;
        target[this.key] = value;
      }
    }, {
      key: "catchError",
      value: function catchError(error) {
        _get(_getPrototypeOf(SmartQuery.prototype), "catchError", this).call(this, error);
        this.firstRunReject(error);
        this.loadingDone(error);
        this.nextResult(this.observer.getCurrentResult ? this.observer.getCurrentResult() : this.observer.currentResult());
        // The observable closes the sub if an error occurs
        this.resubscribeToQuery();
      }
    }, {
      key: "resubscribeToQuery",
      value: function resubscribeToQuery() {
        var lastError = this.observer.getLastError();
        var lastResult = this.observer.getLastResult();
        this.observer.resetLastResults();
        this.startQuerySubscription();
        Object.assign(this.observer, {
          lastError: lastError,
          lastResult: lastResult
        });
      }
    }, {
      key: "loadingKey",
      get: function get() {
        return this.options.loadingKey || this.vm.$apollo.loadingKey;
      }
    }, {
      key: "watchLoading",
      value: function watchLoading() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return this.callHandlers.apply(this, [[this.options.watchLoading, this.vm.$apollo.watchLoading, this.vm.$apollo.provider.watchLoading]].concat(args, [this]));
      }
    }, {
      key: "applyLoadingModifier",
      value: function applyLoadingModifier(value) {
        var loadingKey = this.loadingKey;
        if (loadingKey && typeof this.vm[loadingKey] === 'number') {
          this.vm[loadingKey] += value;
        }
        this.watchLoading(value === 1, value);
      }
    }, {
      key: "loadingDone",
      value: function loadingDone() {
        var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (this.loading) {
          this.applyLoadingModifier(-1);
        }
        this.loading = false;
        if (!error) {
          this.firstRunResolve();
        }
      }
    }, {
      key: "fetchMore",
      value: function fetchMore() {
        var _this2 = this;
        if (this.observer) {
          var _this$observer;
          this.retrieveCurrentResult(true);
          return (_this$observer = this.observer).fetchMore.apply(_this$observer, arguments).then(function (result) {
            if (!result.loading) {
              _this2.loadingDone();
            }
            return result;
          });
        }
      }
    }, {
      key: "subscribeToMore",
      value: function subscribeToMore() {
        if (this.observer) {
          var _this$observer2;
          return {
            unsubscribe: (_this$observer2 = this.observer).subscribeToMore.apply(_this$observer2, arguments)
          };
        }
      }
    }, {
      key: "refetch",
      value: function refetch(variables) {
        var _this3 = this;
        variables && (this.options.variables = variables);
        if (this.observer) {
          var result = this.observer.refetch(variables).then(function (result) {
            if (!result.loading) {
              _this3.loadingDone();
            }
            return result;
          });
          this.retrieveCurrentResult();
          return result;
        }
      }
    }, {
      key: "setVariables",
      value: function setVariables(variables, tryFetch) {
        this.options.variables = variables;
        if (this.observer) {
          var result = this.observer.setVariables(variables, tryFetch);
          this.retrieveCurrentResult();
          return result;
        }
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        Object.assign(this.options, options);
        if (this.observer) {
          var result = this.observer.setOptions(options);
          this.retrieveCurrentResult();
          return result;
        }
      }
    }, {
      key: "startPolling",
      value: function startPolling() {
        if (this.observer) {
          var _this$observer3;
          return (_this$observer3 = this.observer).startPolling.apply(_this$observer3, arguments);
        }
      }
    }, {
      key: "stopPolling",
      value: function stopPolling() {
        if (this.observer) {
          var _this$observer4;
          return (_this$observer4 = this.observer).stopPolling.apply(_this$observer4, arguments);
        }
      }
    }, {
      key: "firstRunResolve",
      value: function firstRunResolve() {
        if (this._firstRunResolve) {
          this._firstRunResolve();
          this._firstRunResolve = null;
        }
      }
    }, {
      key: "firstRunReject",
      value: function firstRunReject(error) {
        if (this._firstRunReject) {
          this._firstRunReject(error);
          this._firstRunReject = null;
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_getPrototypeOf(SmartQuery.prototype), "destroy", this).call(this);
        if (this.loading) {
          this.watchLoading(false, -1);
        }
        this.loading = false;
      }
    }]);
    return SmartQuery;
  }(SmartApollo);

  var SmartSubscription = /*#__PURE__*/function (_SmartApollo) {
    _inherits(SmartSubscription, _SmartApollo);
    var _super = _createSuper(SmartSubscription);
    function SmartSubscription(vm, key, options) {
      var _this;
      var autostart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      _classCallCheck(this, SmartSubscription);
      _this = _super.call(this, vm, key, options);
      _defineProperty(_assertThisInitialized(_this), "type", 'subscription');
      _defineProperty(_assertThisInitialized(_this), "vueApolloSpecialKeys", ['variables', 'result', 'error', 'throttle', 'debounce', 'linkedQuery']);
      if (autostart) {
        _this.autostart();
      }
      return _this;
    }
    _createClass(SmartSubscription, [{
      key: "generateApolloOptions",
      value: function generateApolloOptions(variables) {
        var apolloOptions = _get(_getPrototypeOf(SmartSubscription.prototype), "generateApolloOptions", this).call(this, variables);
        apolloOptions.onError = this.catchError.bind(this);
        return apolloOptions;
      }
    }, {
      key: "executeApollo",
      value: function executeApollo(variables) {
        if (this._destroyed) return;
        var variablesJson = JSON.stringify(variables);
        if (this.sub) {
          // do nothing if subscription is already running using exactly the same variables
          if (variablesJson === this.previousVariablesJson) {
            return;
          }
          this.sub.unsubscribe();
        }
        this.previousVariablesJson = variablesJson;
        var apolloOptions = this.generateApolloOptions(variables);
        if (typeof apolloOptions.updateQuery === 'function') {
          apolloOptions.updateQuery = apolloOptions.updateQuery.bind(this.vm);
        }
        if (this.options.linkedQuery) {
          if (typeof this.options.result === 'function') {
            var rcb = this.options.result.bind(this.vm);
            var ucb = apolloOptions.updateQuery && apolloOptions.updateQuery.bind(this.vm);
            apolloOptions.updateQuery = function () {
              rcb.apply(void 0, arguments);
              return ucb && ucb.apply(void 0, arguments);
            };
          }
          this.sub = this.options.linkedQuery.subscribeToMore(apolloOptions);
        } else {
          // Create observer
          this.observer = this.vm.$apollo.subscribe(apolloOptions);

          // Create subscription
          this.sub = this.observer.subscribe({
            next: this.nextResult.bind(this),
            error: this.catchError.bind(this)
          });
        }
        _get(_getPrototypeOf(SmartSubscription.prototype), "executeApollo", this).call(this, variables);
      }
    }, {
      key: "nextResult",
      value: function nextResult(data) {
        _get(_getPrototypeOf(SmartSubscription.prototype), "nextResult", this).call(this, data);
        if (typeof this.options.result === 'function') {
          this.options.result.call(this.vm, data, this.key);
        }
      }
    }, {
      key: "catchError",
      value: function catchError(error) {
        _get(_getPrototypeOf(SmartSubscription.prototype), "catchError", this).call(this, error);
        // Restart the subscription
        if (!this.skip) {
          this.stop();
          this.start();
        }
      }
    }]);
    return SmartSubscription;
  }(SmartApollo);

  var DollarApollo = /*#__PURE__*/function () {
    function DollarApollo(vm, provider) {
      _classCallCheck(this, DollarApollo);
      this._apolloSubscriptions = [];
      this._watchers = [];
      this.vm = vm;
      this.provider = provider;
      this.queries = {};
      this.subscriptions = {};
      this.client = undefined;
      this.loadingKey = undefined;
      this.error = undefined;
    }
    _createClass(DollarApollo, [{
      key: "getClient",
      value: function getClient() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (!options || !options.client) {
          if (_typeof(this.client) === 'object') {
            return this.client;
          }
          if (this.client) {
            if (!this.provider.clients) {
              throw new Error("[vue-apollo] Missing 'clients' options in 'apolloProvider'");
            } else {
              var _client = this.provider.clients[this.client];
              if (!_client) {
                throw new Error("[vue-apollo] Missing client '".concat(this.client, "' in 'apolloProvider'"));
              }
              return _client;
            }
          }
          return this.provider.defaultClient;
        }
        var client = this.provider.clients[options.client];
        if (!client) {
          throw new Error("[vue-apollo] Missing client '".concat(options.client, "' in 'apolloProvider'"));
        }
        return client;
      }
    }, {
      key: "query",
      value: function query(options) {
        return this.getClient(options).query(options);
      }
    }, {
      key: "watchQuery",
      value: function watchQuery(options) {
        var _this = this;
        var observable = this.getClient(options).watchQuery(options);
        var _subscribe = observable.subscribe.bind(observable);
        observable.subscribe = function (options) {
          var sub = _subscribe(options);
          _this._apolloSubscriptions.push(sub);
          return sub;
        };
        return observable;
      }
    }, {
      key: "mutate",
      value: function mutate(options) {
        return this.getClient(options).mutate(options);
      }
    }, {
      key: "subscribe",
      value: function subscribe(options) {
        var _this2 = this;
        if (!isServer) {
          var observable = this.getClient(options).subscribe(options);
          var _subscribe = observable.subscribe.bind(observable);
          observable.subscribe = function (options) {
            var sub = _subscribe(options);
            _this2._apolloSubscriptions.push(sub);
            return sub;
          };
          return observable;
        }
      }
    }, {
      key: "loading",
      get: function get() {
        return this.vm.$data.$apolloData.loading !== 0;
      }
    }, {
      key: "data",
      get: function get() {
        return this.vm.$data.$apolloData.data;
      }
    }, {
      key: "addSmartQuery",
      value: function addSmartQuery(key, options) {
        var _this3 = this;
        var finalOptions = reapply(options, this.vm);

        // Simple query
        if (!finalOptions.query) {
          var query = finalOptions;
          finalOptions = {
            query: query
          };
        }
        var apollo = this.vm.$options.apollo;
        var defaultOptions = this.provider.defaultOptions;
        var $query;
        if (defaultOptions && defaultOptions.$query) {
          $query = defaultOptions.$query;
        }
        if (apollo && apollo.$query) {
          $query = _objectSpread2(_objectSpread2({}, $query || {}), apollo.$query);
        }
        if ($query) {
          // Also replaces 'undefined' values
          for (var _key in $query) {
            if (typeof finalOptions[_key] === 'undefined') {
              finalOptions[_key] = $query[_key];
            }
          }
        }
        var smart = this.queries[key] = new SmartQuery(this.vm, key, finalOptions, false);
        if (!isServer || finalOptions.prefetch !== false) {
          smart.autostart();
        }
        if (!isServer) {
          var subs = finalOptions.subscribeToMore;
          if (subs) {
            if (Array.isArray(subs)) {
              subs.forEach(function (sub, index) {
                _this3.addSmartSubscription("".concat(key).concat(index), _objectSpread2(_objectSpread2({}, sub), {}, {
                  linkedQuery: smart
                }));
              });
            } else {
              this.addSmartSubscription(key, _objectSpread2(_objectSpread2({}, subs), {}, {
                linkedQuery: smart
              }));
            }
          }
        }
        return smart;
      }
    }, {
      key: "addSmartSubscription",
      value: function addSmartSubscription(key, options) {
        if (!isServer) {
          options = reapply(options, this.vm);
          var smart = this.subscriptions[key] = new SmartSubscription(this.vm, key, options, false);
          smart.autostart();
          if (options.linkedQuery) {
            // prevent subscriptions leak on fetching query with another parameters
            var index = options.linkedQuery._linkedSubscriptions.findIndex(function (x) {
              return x.key === key;
            });
            if (index !== -1) {
              options.linkedQuery._linkedSubscriptions[index] = smart;
            } else {
              options.linkedQuery._linkedSubscriptions.push(smart);
            }
          }
          return smart;
        }
      }
    }, {
      key: "defineReactiveSetter",
      value: function defineReactiveSetter(key, func, deep) {
        var _this4 = this;
        this._watchers.push(this.vm.$watch(func, function (value) {
          _this4[key] = value;
        }, {
          immediate: true,
          deep: deep
        }));
      }
    }, {
      key: "skipAllQueries",
      set: function set(value) {
        this._skipAllQueries = value;
        for (var key in this.queries) {
          this.queries[key].skip = value;
        }
      }
    }, {
      key: "skipAllSubscriptions",
      set: function set(value) {
        this._skipAllSubscriptions = value;
        for (var key in this.subscriptions) {
          this.subscriptions[key].skip = value;
        }
      }
    }, {
      key: "skipAll",
      set: function set(value) {
        this.skipAllQueries = value;
        this.skipAllSubscriptions = value;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        for (var _i2 = 0, _this$_watchers2 = this._watchers; _i2 < _this$_watchers2.length; _i2++) {
          var unwatch = _this$_watchers2[_i2];
          unwatch();
        }
        for (var key in this.queries) {
          this.queries[key].destroy();
        }
        for (var _key2 in this.subscriptions) {
          this.subscriptions[_key2].destroy();
        }
        this._apolloSubscriptions.forEach(function (sub) {
          sub.unsubscribe();
        });
        this._apolloSubscriptions = null;
        this.vm = null;
      }
    }]);
    return DollarApollo;
  }();

  function hasProperty(holder, key) {
    return typeof holder !== 'undefined' && Object.prototype.hasOwnProperty.call(holder, key);
  }
  function launch() {
    var _this = this;
    var apolloProvider = this.$apolloProvider;
    if (this._apolloLaunched || !apolloProvider) return;
    this._apolloLaunched = true;

    // Prepare properties
    var apollo = this.$options.apollo;
    if (apollo) {
      this.$_apolloPromises = [];
      if (!apollo.$init) {
        apollo.$init = true;

        // Default options applied to `apollo` options
        if (apolloProvider.defaultOptions) {
          apollo = this.$options.apollo = Object.assign({}, apolloProvider.defaultOptions, apollo);
        }
      }
      defineReactiveSetter(this.$apollo, 'skipAll', apollo.$skipAll, apollo.$deep);
      defineReactiveSetter(this.$apollo, 'skipAllQueries', apollo.$skipAllQueries, apollo.$deep);
      defineReactiveSetter(this.$apollo, 'skipAllSubscriptions', apollo.$skipAllSubscriptions, apollo.$deep);
      defineReactiveSetter(this.$apollo, 'client', apollo.$client, apollo.$deep);
      defineReactiveSetter(this.$apollo, 'loadingKey', apollo.$loadingKey, apollo.$deep);
      defineReactiveSetter(this.$apollo, 'error', apollo.$error, apollo.$deep);
      defineReactiveSetter(this.$apollo, 'watchLoading', apollo.$watchLoading, apollo.$deep);

      // Apollo Data
      Object.defineProperty(this, '$apolloData', {
        get: function get() {
          return _this.$data.$apolloData;
        },
        enumerable: true,
        configurable: true
      });

      // watchQuery
      for (var key in apollo) {
        if (key.charAt(0) !== '$') {
          var options = apollo[key];
          var smart = this.$apollo.addSmartQuery(key, options);
          if (isServer) {
            options = reapply(options, this);
            if (apolloProvider.prefetch !== false && options.prefetch !== false && apollo.$prefetch !== false && !smart.skip) {
              this.$_apolloPromises.push(smart.firstRun);
            }
          }
        }
      }
      if (apollo.subscribe) {
        console.warn('vue-apollo -> `subscribe` option is deprecated. Use the `$subscribe` option instead.');
      }
      if (apollo.$subscribe) {
        for (var _key in apollo.$subscribe) {
          this.$apollo.addSmartSubscription(_key, apollo.$subscribe[_key]);
        }
      }
    }
  }
  function defineReactiveSetter($apollo, key, value, deep) {
    if (typeof value !== 'undefined') {
      if (typeof value === 'function') {
        $apollo.defineReactiveSetter(key, value, deep);
      } else {
        $apollo[key] = value;
      }
    }
  }
  function destroy() {
    if (this.$apollo) {
      this.$apollo.destroy();
      this.$apollo = null;
    }
  }
  function installMixin(app, provider) {
    app.mixin({
      data: function data() {
        var result = {
          $apolloData: {
            queries: {},
            loading: 0,
            data: {}
          }
        };
        // Init data props
        var apollo = this.$options.apollo;
        if (apollo) {
          for (var key in apollo) {
            if (key.charAt(0) !== '$') {
              var options = apollo[key];
              if (!options.manual && !hasProperty(this.$options.props, key) && !hasProperty(this.$options.computed, key) && !hasProperty(this.$options.methods, key)) {
                result[key] = null;
              }
            }
          }
        }
        return result;
      },
      beforeCreate: function beforeCreate() {
        var _this2 = this;
        this.$apollo = new DollarApollo(this, provider);
        if (isServer) {
          // Patch render function to cleanup apollo
          var render = this.$options.ssrRender;
          this.$options.ssrRender = function (h) {
            var result = render.call(_this2, h);
            destroy.call(_this2);
            return result;
          };
        }
      },
      serverPrefetch: function serverPrefetch() {
        var _this3 = this;
        if (this.$_apolloPromises) {
          return Promise.all(this.$_apolloPromises).then(function () {
            // Mock `$apollo` for the render function
            var mocked = {
              vm: _this3,
              provider: _this3.$apollo.provider,
              loading: false,
              queries: {},
              subscriptions: {}
            };
            destroy.call(_this3);
            _this3.$apollo = mocked;
          })["catch"](function (e) {
            destroy.call(_this3);
            return Promise.reject(e);
          });
        }
      },
      created: launch,
      unmounted: destroy
    });
  }

  var keywords = ['$subscribe'];
  var ApolloProvider = /*#__PURE__*/function () {
    function ApolloProvider(options) {
      _classCallCheck(this, ApolloProvider);
      if (!options) {
        throw new Error('Options argument required');
      }
      this.clients = options.clients || {};
      if (options.defaultClient) {
        this.clients.defaultClient = this.defaultClient = options.defaultClient;
      }
      this.defaultOptions = options.defaultOptions;
      this.watchLoading = options.watchLoading;
      this.errorHandler = options.errorHandler;
      this.prefetch = options.prefetch;
    }
    _createClass(ApolloProvider, [{
      key: "install",
      value: function install(app) {
        // Options merging
        app.config.optionMergeStrategies.apollo = function (toVal, fromVal, vm) {
          if (!toVal) return fromVal;
          if (!fromVal) return toVal;
          var toData = Object.assign({}, omit(toVal, keywords), toVal.data);
          var fromData = Object.assign({}, omit(fromVal, keywords), fromVal.data);
          var map = {};
          for (var i = 0; i < keywords.length; i++) {
            var key = keywords[i];
            map[key] = mergeObjectOptions(toVal[key], fromVal[key]);
          }
          return Object.assign(map, mergeObjectOptions(toData, fromData));
        };
        app.config.globalProperties.$apolloProvider = this;
        installMixin(app, this);
      }
    }]);
    return ApolloProvider;
  }();
  function mergeObjectOptions(to, from) {
    return to ? Object.assign(Object.assign(Object.create(null), to), from) : from;
  }

  function createApolloProvider(options) {
    return new ApolloProvider(options);
  }

  exports.ApolloProvider = ApolloProvider;
  exports.createApolloProvider = createApolloProvider;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
