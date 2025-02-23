(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('graphql-tag'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'graphql-tag', 'vue'], factory) :
  (global = global || self, factory(global['vue-apollo-components'] = {}, global.gql, global.vue));
}(this, (function (exports, gql, vue) { 'use strict';

  gql = gql && Object.prototype.hasOwnProperty.call(gql, 'default') ? gql['default'] : gql;

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

  function isDataFilled(data) {
    return data && Object.keys(data).length > 0;
  }
  var CApolloQuery = {
    name: 'ApolloQuery',
    provide: function provide() {
      return {
        getDollarApollo: this.getDollarApollo,
        getApolloQuery: this.getApolloQuery
      };
    },
    props: {
      query: {
        type: [Function, Object],
        required: true
      },
      variables: {
        type: Object,
        "default": undefined
      },
      fetchPolicy: {
        type: String,
        "default": undefined
      },
      pollInterval: {
        type: Number,
        "default": undefined
      },
      notifyOnNetworkStatusChange: {
        type: Boolean,
        "default": undefined
      },
      context: {
        type: Object,
        "default": undefined
      },
      update: {
        type: Function,
        "default": function _default(data) {
          return data;
        }
      },
      skip: {
        type: Boolean,
        "default": false
      },
      debounce: {
        type: Number,
        "default": 0
      },
      throttle: {
        type: Number,
        "default": 0
      },
      clientId: {
        type: String,
        "default": undefined
      },
      deep: {
        type: Boolean,
        "default": undefined
      },
      tag: {
        type: String,
        "default": 'div'
      },
      prefetch: {
        type: Boolean,
        "default": true
      },
      options: {
        type: Object,
        "default": function _default() {
          return {};
        }
      }
    },
    data: function data() {
      return {
        result: {
          data: null,
          loading: false,
          networkStatus: 7,
          error: null
        },
        times: 0
      };
    },
    watch: {
      fetchPolicy: function fetchPolicy(value) {
        this.$apollo.queries.query.setOptions({
          fetchPolicy: value
        });
      },
      pollInterval: function pollInterval(value) {
        this.$apollo.queries.query.setOptions({
          pollInterval: value
        });
      },
      notifyOnNetworkStatusChange: function notifyOnNetworkStatusChange(value) {
        this.$apollo.queries.query.setOptions({
          notifyOnNetworkStatusChange: value
        });
      },
      '$data.$apolloData.loading': function $data$apolloDataLoading(value) {
        this.$emit('loading', !!value);
      }
    },
    apollo: {
      $client: function $client() {
        return this.clientId;
      },
      query: function query() {
        return _objectSpread2(_objectSpread2({
          query: function query() {
            if (typeof this.query === 'function') {
              return this.query(gql);
            }
            return this.query;
          },
          variables: function variables() {
            return this.variables;
          },
          fetchPolicy: this.fetchPolicy,
          pollInterval: this.pollInterval,
          debounce: this.debounce,
          throttle: this.throttle,
          notifyOnNetworkStatusChange: this.notifyOnNetworkStatusChange,
          context: function context() {
            return this.context;
          },
          skip: function skip() {
            return this.skip;
          },
          deep: this.deep,
          prefetch: this.prefetch
        }, this.options), {}, {
          manual: true,
          result: function result(_result) {
            var _result2 = _result,
              errors = _result2.errors,
              loading = _result2.loading,
              networkStatus = _result2.networkStatus;
            var _result3 = _result,
              error = _result3.error;
            _result = Object.assign({}, _result);
            if (errors && errors.length) {
              error = new Error("Apollo errors occurred (".concat(errors.length, ")"));
              error.graphQLErrors = errors;
            }
            var data = {};
            if (loading) {
              Object.assign(data, this.$_previousData, _result.data);
            } else if (error) {
              Object.assign(data, this.$apollo.queries.query.observer.getLastResult() || {}, _result.data);
            } else {
              data = _result.data;
              this.$_previousData = _result.data;
            }
            var dataNotEmpty = isDataFilled(data);
            this.result = {
              data: dataNotEmpty ? this.update(data) : undefined,
              fullData: dataNotEmpty ? data : undefined,
              loading: loading,
              error: error,
              networkStatus: networkStatus
            };
            this.times = ++this.$_times;
            this.$emit('result', this.result);
          },
          error: function error(_error) {
            this.result.loading = false;
            this.result.error = _error;
            this.$emit('error', _error);
          }
        });
      }
    },
    created: function created() {
      this.$_times = 0;
    },
    methods: {
      getDollarApollo: function getDollarApollo() {
        return this.$apollo;
      },
      getApolloQuery: function getApolloQuery() {
        return this.$apollo.queries.query;
      }
    },
    render: function render() {
      var result = this.$slots["default"]({
        result: this.result,
        times: this.times,
        query: this.$apollo.queries.query,
        isLoading: this.$apolloData.loading,
        gqlError: this.result && this.result.error && this.result.error.gqlError
      });
      return this.tag ? vue.h(this.tag, result) : result;
    }
  };

  var uid = 0;
  var CApolloSubscribeToMore = {
    name: 'ApolloSubscribeToMore',
    inject: ['getDollarApollo', 'getApolloQuery'],
    props: {
      document: {
        type: [Function, Object],
        required: true
      },
      variables: {
        type: Object,
        "default": undefined
      },
      updateQuery: {
        type: Function,
        "default": undefined
      }
    },
    watch: {
      document: 'refresh',
      variables: 'refresh'
    },
    created: function created() {
      this.$_key = "sub_component_".concat(uid++);
    },
    mounted: function mounted() {
      this.refresh();
    },
    beforeUnmount: function beforeUnmount() {
      this.destroy();
    },
    methods: {
      destroy: function destroy() {
        if (this.$_sub) {
          this.$_sub.destroy();
        }
      },
      refresh: function refresh() {
        this.destroy();
        var document = this.document;
        if (typeof document === 'function') {
          document = document(gql);
        }
        this.$_sub = this.getDollarApollo().addSmartSubscription(this.$_key, {
          document: document,
          variables: this.variables,
          updateQuery: this.updateQuery,
          linkedQuery: this.getApolloQuery()
        });
      }
    },
    render: function render() {
      return null;
    }
  };

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
  var addGqlError = function addGqlError(error) {
    if (error.graphQLErrors && error.graphQLErrors.length) {
      error.gqlError = error.graphQLErrors[0];
    }
  };

  var CApolloMutation = {
    props: {
      mutation: {
        type: [Function, Object],
        required: true
      },
      variables: {
        type: Object,
        "default": undefined
      },
      optimisticResponse: {
        type: Object,
        "default": undefined
      },
      update: {
        type: Function,
        "default": undefined
      },
      refetchQueries: {
        type: Function,
        "default": undefined
      },
      clientId: {
        type: String,
        "default": undefined
      },
      tag: {
        type: String,
        "default": 'div'
      },
      context: {
        type: Object,
        "default": undefined
      }
    },
    data: function data() {
      return {
        loading: false,
        error: null
      };
    },
    watch: {
      loading: function loading(value) {
        this.$emit('loading', value);
      }
    },
    methods: {
      mutate: function mutate(options) {
        var _this = this;
        this.loading = true;
        this.error = null;
        var mutation = this.mutation;
        if (typeof mutation === 'function') {
          mutation = mutation(gql);
        }
        return this.$apollo.mutate(_objectSpread2({
          mutation: mutation,
          client: this.clientId,
          variables: this.variables,
          optimisticResponse: this.optimisticResponse,
          update: this.update,
          refetchQueries: this.refetchQueries,
          context: this.context
        }, options)).then(function (result) {
          _this.$emit('done', result);
          _this.loading = false;
        })["catch"](function (e) {
          addGqlError(e);
          _this.error = e;
          _this.$emit('error', e);
          _this.loading = false;
        });
      }
    },
    render: function render() {
      var result = this.$slots["default"]({
        mutate: this.mutate,
        loading: this.loading,
        error: this.error,
        gqlError: this.error && this.error.gqlError
      });
      return this.tag ? vue.h(this.tag, result) : result;
    }
  };

  var plugin = {};
  function install(app, options) {
    app.component('ApolloQuery', CApolloQuery);
    app.component('ApolloSubscribeToMore', CApolloSubscribeToMore);
    app.component('ApolloMutation', CApolloMutation);
  }
  plugin.install = install;

  // eslint-disable-next-line no-undef
  plugin.version = "4.0.0-beta.5";

  // Apollo provider
  var ApolloProvider = plugin;

  // Components
  var ApolloQuery = CApolloQuery;
  var ApolloSubscribeToMore = CApolloSubscribeToMore;
  var ApolloMutation = CApolloMutation;

  exports.ApolloMutation = ApolloMutation;
  exports.ApolloProvider = ApolloProvider;
  exports.ApolloQuery = ApolloQuery;
  exports.ApolloSubscribeToMore = ApolloSubscribeToMore;
  exports.default = plugin;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
