// src/useQuery.ts
import {
  ref as ref3,
  unref,
  computed as computed3,
  watch as watch2,
  onServerPrefetch,
  getCurrentInstance as getCurrentInstance3,
  onBeforeUnmount as onBeforeUnmount2,
  nextTick
} from "vue-demi";
import {throttle, debounce} from "throttle-debounce";

// src/useApolloClient.ts
import {getCurrentInstance, inject} from "vue-demi";
var DefaultApolloClient = Symbol("default-apollo-client");
var ApolloClients = Symbol("apollo-clients");
function resolveDefaultClient(providedApolloClients, providedApolloClient) {
  const resolvedClient = providedApolloClients ? providedApolloClients.default : providedApolloClient != null ? providedApolloClient : void 0;
  return resolvedClient;
}
function resolveClientWithId(providedApolloClients, clientId) {
  if (!providedApolloClients) {
    throw new Error(`No apolloClients injection found, tried to resolve '${clientId}' clientId`);
  }
  return providedApolloClients[clientId];
}
function useApolloClient(clientId) {
  let resolveImpl;
  const savedCurrentClients = currentApolloClients;
  if (!getCurrentInstance()) {
    resolveImpl = (id) => {
      if (id) {
        return resolveClientWithId(savedCurrentClients, id);
      }
      return resolveDefaultClient(savedCurrentClients, savedCurrentClients.default);
    };
  } else {
    const providedApolloClients = inject(ApolloClients, null);
    const providedApolloClient = inject(DefaultApolloClient, null);
    resolveImpl = (id) => {
      if (id) {
        const client2 = resolveClientWithId(providedApolloClients, id);
        if (client2) {
          return client2;
        }
        return resolveClientWithId(savedCurrentClients, id);
      }
      const client = resolveDefaultClient(providedApolloClients, providedApolloClient);
      if (client) {
        return client;
      }
      return resolveDefaultClient(savedCurrentClients, savedCurrentClients.default);
    };
  }
  function resolveClient(id = clientId) {
    const client = resolveImpl(id);
    if (!client) {
      throw new Error(`Apollo client with id ${id != null ? id : "default"} not found. Use provideApolloClient() if you are outside of a component setup.`);
    }
    return client;
  }
  return {
    resolveClient,
    get client() {
      return resolveClient();
    }
  };
}
var currentApolloClients = {};
function provideApolloClient(client) {
  currentApolloClients = {
    default: client
  };
  return function(fn) {
    const result = fn();
    currentApolloClients = {};
    return result;
  };
}
function provideApolloClients(clients) {
  currentApolloClients = clients;
  return function(fn) {
    const result = fn();
    currentApolloClients = {};
    return result;
  };
}

// src/util/paramToRef.ts
import {isRef, computed, ref} from "vue-demi";
function paramToRef(param) {
  if (isRef(param)) {
    return param;
  } else if (typeof param === "function") {
    return computed(param);
  } else {
    return ref(param);
  }
}

// src/util/paramToReactive.ts
import {isRef as isRef2, reactive, computed as computed2} from "vue-demi";
function paramToReactive(param) {
  if (isRef2(param)) {
    return param;
  } else if (typeof param === "function") {
    return computed2(param);
  } else if (param) {
    return reactive(param);
  } else {
    return param;
  }
}

// src/util/useEventHook.ts
function useEventHook() {
  const fns = [];
  function on(fn) {
    fns.push(fn);
    return {
      off: () => off(fn)
    };
  }
  function off(fn) {
    const index = fns.indexOf(fn);
    if (index !== -1) {
      fns.splice(index, 1);
    }
  }
  function trigger(param) {
    for (const fn of fns) {
      fn(param);
    }
  }
  function getCount() {
    return fns.length;
  }
  return {
    on,
    off,
    trigger,
    getCount
  };
}

// src/util/loadingTracking.ts
import {watch, onUnmounted, ref as ref2, getCurrentInstance as getCurrentInstance2, onBeforeUnmount} from "vue-demi";

// src/util/env.ts
var isServer = typeof window === "undefined";

// src/util/loadingTracking.ts
var globalTracking = {
  queries: ref2(0),
  mutations: ref2(0),
  subscriptions: ref2(0),
  components: new Map()
};
function getCurrentTracking() {
  const vm = getCurrentInstance2();
  if (!vm) {
    return {};
  }
  let tracking;
  if (!globalTracking.components.has(vm)) {
    globalTracking.components.set(vm, tracking = {
      queries: ref2(0),
      mutations: ref2(0),
      subscriptions: ref2(0)
    });
    onUnmounted(() => {
      globalTracking.components.delete(vm);
    });
  } else {
    tracking = globalTracking.components.get(vm);
  }
  return {
    tracking
  };
}
function track(loading, type) {
  if (isServer)
    return;
  const {tracking} = getCurrentTracking();
  watch(loading, (value, oldValue) => {
    if (oldValue != null && value !== oldValue) {
      const mod = value ? 1 : -1;
      if (tracking)
        tracking[type].value += mod;
      globalTracking[type].value += mod;
    }
  }, {
    immediate: true
  });
  onBeforeUnmount(() => {
    if (loading.value) {
      if (tracking)
        tracking[type].value--;
      globalTracking[type].value--;
    }
  });
}
function trackQuery(loading) {
  track(loading, "queries");
}
function trackMutation(loading) {
  track(loading, "mutations");
}
function trackSubscription(loading) {
  track(loading, "subscriptions");
}

// src/util/toApolloError.ts
import {ApolloError, isApolloError} from "@apollo/client/core/index.js";
function toApolloError(error) {
  if (!(error instanceof Error)) {
    return new ApolloError({
      networkError: Object.assign(new Error(), {originalError: error}),
      errorMessage: String(error)
    });
  }
  if (isApolloError(error)) {
    return error;
  }
  return new ApolloError({networkError: error, errorMessage: error.message});
}
function resultErrorsToApolloError(errors) {
  return new ApolloError({
    graphQLErrors: errors,
    errorMessage: `GraphQL response contains errors: ${errors.map((e) => e.message).join(" | ")}`
  });
}

// src/useQuery.ts
function useQuery(document, variables, options) {
  return useQueryImpl(document, variables, options);
}
function useQueryImpl(document, variables, options = {}, lazy = false) {
  var _a;
  const vm = getCurrentInstance3();
  const currentOptions = ref3();
  const documentRef = paramToRef(document);
  const variablesRef = paramToRef(variables);
  const optionsRef = paramToReactive(options);
  const result = ref3();
  const resultEvent = useEventHook();
  const error = ref3(null);
  const errorEvent = useEventHook();
  const loading = ref3(false);
  vm && trackQuery(loading);
  const networkStatus = ref3();
  let firstResolve;
  let firstResolveTriggered = false;
  let firstReject;
  let firstRejectError;
  const tryFirstResolve = () => {
    firstResolveTriggered = true;
    if (firstResolve)
      firstResolve();
  };
  const tryFirstReject = (apolloError) => {
    firstRejectError = apolloError;
    if (firstReject)
      firstReject(apolloError);
  };
  const resetFirstResolveReject = () => {
    firstResolve = void 0;
    firstReject = void 0;
    firstResolveTriggered = false;
    firstRejectError = void 0;
  };
  vm && ((_a = onServerPrefetch) == null ? void 0 : _a(() => {
    var _a2;
    if (!isEnabled.value || isServer && ((_a2 = currentOptions.value) == null ? void 0 : _a2.prefetch) === false)
      return;
    return new Promise((resolve, reject) => {
      firstResolve = () => {
        resetFirstResolveReject();
        resolve();
      };
      firstReject = (apolloError) => {
        resetFirstResolveReject();
        reject(apolloError);
      };
      if (firstResolveTriggered) {
        firstResolve();
      } else if (firstRejectError) {
        firstReject(firstRejectError);
      }
    }).finally(stop);
  }));
  const {resolveClient} = useApolloClient();
  const query = ref3();
  let observer;
  let started = false;
  let ignoreNextResult = false;
  let firstStart = true;
  function start() {
    var _a2, _b, _c, _d, _e, _f;
    if (started || !isEnabled.value || isServer && ((_a2 = currentOptions.value) == null ? void 0 : _a2.prefetch) === false || !currentDocument) {
      tryFirstResolve();
      return;
    }
    started = true;
    error.value = null;
    loading.value = true;
    const client = resolveClient((_b = currentOptions.value) == null ? void 0 : _b.clientId);
    query.value = client.watchQuery({
      query: currentDocument,
      variables: currentVariables != null ? currentVariables : {},
      ...currentOptions.value,
      ...isServer && ((_c = currentOptions.value) == null ? void 0 : _c.fetchPolicy) !== "no-cache" ? {
        fetchPolicy: "network-only"
      } : {}
    });
    startQuerySubscription();
    if (!isServer && (firstStart || !((_d = currentOptions.value) == null ? void 0 : _d.keepPreviousResult)) && (((_e = currentOptions.value) == null ? void 0 : _e.fetchPolicy) !== "no-cache" || currentOptions.value.notifyOnNetworkStatusChange)) {
      const currentResult = query.value.getCurrentResult(false);
      if (!currentResult.loading || currentResult.partial || ((_f = currentOptions.value) == null ? void 0 : _f.notifyOnNetworkStatusChange)) {
        onNextResult(currentResult);
        ignoreNextResult = !currentResult.loading;
      } else if (currentResult.error) {
        onError(currentResult.error);
        ignoreNextResult = true;
      }
    }
    if (!isServer) {
      for (const item of subscribeToMoreItems) {
        addSubscribeToMore(item);
      }
    }
    firstStart = false;
  }
  function startQuerySubscription() {
    if (observer && !observer.closed)
      return;
    if (!query.value)
      return;
    ignoreNextResult = false;
    observer = query.value.subscribe({
      next: onNextResult,
      error: onError
    });
  }
  function getErrorPolicy() {
    var _a2, _b, _c, _d;
    const client = resolveClient((_a2 = currentOptions.value) == null ? void 0 : _a2.clientId);
    return ((_b = currentOptions.value) == null ? void 0 : _b.errorPolicy) || ((_d = (_c = client.defaultOptions) == null ? void 0 : _c.watchQuery) == null ? void 0 : _d.errorPolicy);
  }
  function onNextResult(queryResult) {
    var _a2;
    if (ignoreNextResult) {
      ignoreNextResult = false;
      return;
    }
    error.value = null;
    processNextResult(queryResult);
    const errorPolicy = getErrorPolicy();
    if (errorPolicy && errorPolicy === "all" && !queryResult.error && ((_a2 = queryResult.errors) == null ? void 0 : _a2.length)) {
      processError(resultErrorsToApolloError(queryResult.errors));
    }
    tryFirstResolve();
  }
  function processNextResult(queryResult) {
    result.value = queryResult.data && Object.keys(queryResult.data).length === 0 ? void 0 : queryResult.data;
    loading.value = queryResult.loading;
    networkStatus.value = queryResult.networkStatus;
    nextTick(() => {
      resultEvent.trigger(queryResult);
    });
  }
  function onError(queryError) {
    if (ignoreNextResult) {
      ignoreNextResult = false;
      return;
    }
    const apolloError = toApolloError(queryError);
    const errorPolicy = getErrorPolicy();
    if (errorPolicy && errorPolicy !== "none") {
      processNextResult(query.value.getCurrentResult());
    }
    processError(apolloError);
    tryFirstReject(apolloError);
    resubscribeToQuery();
  }
  function processError(apolloError) {
    error.value = apolloError;
    loading.value = false;
    networkStatus.value = 8;
    nextTick(() => {
      errorEvent.trigger(apolloError);
    });
  }
  function resubscribeToQuery() {
    if (!query.value)
      return;
    const lastError = query.value.getLastError();
    const lastResult = query.value.getLastResult();
    query.value.resetLastResults();
    startQuerySubscription();
    Object.assign(query.value, {lastError, lastResult});
  }
  let onStopHandlers = [];
  function stop() {
    tryFirstResolve();
    if (!started)
      return;
    started = false;
    loading.value = false;
    onStopHandlers.forEach((handler) => handler());
    onStopHandlers = [];
    if (query.value) {
      query.value.stopPolling();
      query.value = null;
    }
    if (observer) {
      observer.unsubscribe();
      observer = void 0;
    }
  }
  let restarting = false;
  function baseRestart() {
    if (!started || restarting)
      return;
    restarting = true;
    nextTick(() => {
      if (started) {
        stop();
        start();
      }
      restarting = false;
    });
  }
  let debouncedRestart;
  let isRestartDebounceSetup = false;
  function updateRestartFn() {
    var _a2, _b;
    if (!currentOptions.value) {
      debouncedRestart = baseRestart;
    } else {
      if ((_a2 = currentOptions.value) == null ? void 0 : _a2.throttle) {
        debouncedRestart = throttle(currentOptions.value.throttle, baseRestart);
      } else if ((_b = currentOptions.value) == null ? void 0 : _b.debounce) {
        debouncedRestart = debounce(currentOptions.value.debounce, baseRestart);
      } else {
        debouncedRestart = baseRestart;
      }
      isRestartDebounceSetup = true;
    }
  }
  function restart() {
    if (!isRestartDebounceSetup)
      updateRestartFn();
    debouncedRestart();
  }
  let currentDocument = documentRef.value;
  const forceDisabled = ref3(lazy);
  const enabledOption = computed3(() => !currentOptions.value || currentOptions.value.enabled == null || currentOptions.value.enabled);
  const isEnabled = computed3(() => enabledOption.value && !forceDisabled.value && !!documentRef.value);
  watch2(() => unref(optionsRef), (value) => {
    if (currentOptions.value && (currentOptions.value.throttle !== value.throttle || currentOptions.value.debounce !== value.debounce)) {
      updateRestartFn();
    }
    currentOptions.value = value;
    restart();
  }, {
    deep: true,
    immediate: true
  });
  watch2(documentRef, (value) => {
    currentDocument = value;
    restart();
  });
  let currentVariables;
  let currentVariablesSerialized;
  watch2(() => {
    if (isEnabled.value) {
      return variablesRef.value;
    } else {
      return void 0;
    }
  }, (value) => {
    const serialized = JSON.stringify([value, isEnabled.value]);
    if (serialized !== currentVariablesSerialized) {
      currentVariables = value;
      restart();
    }
    currentVariablesSerialized = serialized;
  }, {
    deep: true,
    immediate: true
  });
  function refetch(variables2 = void 0) {
    if (query.value) {
      if (variables2) {
        currentVariables = variables2;
      }
      error.value = null;
      loading.value = true;
      return query.value.refetch(variables2).then((refetchResult) => {
        var _a2;
        const currentResult = (_a2 = query.value) == null ? void 0 : _a2.getCurrentResult();
        currentResult && processNextResult(currentResult);
        return refetchResult;
      });
    }
  }
  function fetchMore(options2) {
    if (query.value) {
      error.value = null;
      loading.value = true;
      return query.value.fetchMore(options2).then((fetchMoreResult) => {
        var _a2;
        const currentResult = (_a2 = query.value) == null ? void 0 : _a2.getCurrentResult();
        currentResult && processNextResult(currentResult);
        return fetchMoreResult;
      });
    }
  }
  const subscribeToMoreItems = [];
  function subscribeToMore(options2) {
    if (isServer)
      return;
    const optionsRef2 = paramToRef(options2);
    watch2(optionsRef2, (value, oldValue, onCleanup) => {
      const index = subscribeToMoreItems.findIndex((item2) => item2.options === oldValue);
      if (index !== -1) {
        subscribeToMoreItems.splice(index, 1);
      }
      const item = {
        options: value,
        unsubscribeFns: []
      };
      subscribeToMoreItems.push(item);
      addSubscribeToMore(item);
      onCleanup(() => {
        item.unsubscribeFns.forEach((fn) => fn());
        item.unsubscribeFns = [];
      });
    }, {
      immediate: true
    });
  }
  function addSubscribeToMore(item) {
    if (!started)
      return;
    if (!query.value) {
      throw new Error("Query is not defined");
    }
    const unsubscribe = query.value.subscribeToMore(item.options);
    onStopHandlers.push(unsubscribe);
    item.unsubscribeFns.push(unsubscribe);
  }
  watch2(isEnabled, (value) => {
    if (value) {
      nextTick(() => {
        start();
      });
    } else {
      stop();
    }
  });
  if (isEnabled.value) {
    start();
  }
  vm && onBeforeUnmount2(() => {
    stop();
    subscribeToMoreItems.length = 0;
  });
  return {
    result,
    loading,
    networkStatus,
    error,
    start,
    stop,
    restart,
    forceDisabled,
    document: documentRef,
    variables: variablesRef,
    options: optionsRef,
    query,
    refetch,
    fetchMore,
    subscribeToMore,
    onResult: resultEvent.on,
    onError: errorEvent.on
  };
}

// src/useLazyQuery.ts
import {isRef as isRef3} from "vue-demi";
function useLazyQuery(document, variables, options) {
  const query = useQueryImpl(document, variables, options, true);
  function load(document2, variables2, options2) {
    if (document2) {
      query.document.value = document2;
    }
    if (variables2) {
      query.variables.value = variables2;
    }
    if (options2) {
      Object.assign(isRef3(query.options) ? query.options.value : query.options, options2);
    }
    const oldForceDisabled = query.forceDisabled.value;
    query.forceDisabled.value = false;
    return oldForceDisabled;
  }
  return {
    ...query,
    load
  };
}

// src/useMutation.ts
import {ref as ref4, onBeforeUnmount as onBeforeUnmount3, isRef as isRef4, getCurrentInstance as getCurrentInstance4} from "vue-demi";
function useMutation(document, options = {}) {
  const vm = getCurrentInstance4();
  const loading = ref4(false);
  vm && trackMutation(loading);
  const error = ref4(null);
  const called = ref4(false);
  const doneEvent = useEventHook();
  const errorEvent = useEventHook();
  const {resolveClient} = useApolloClient();
  async function mutate(variables, overrideOptions = {}) {
    let currentDocument;
    if (typeof document === "function") {
      currentDocument = document();
    } else if (isRef4(document)) {
      currentDocument = document.value;
    } else {
      currentDocument = document;
    }
    let currentOptions;
    if (typeof options === "function") {
      currentOptions = options();
    } else if (isRef4(options)) {
      currentOptions = options.value;
    } else {
      currentOptions = options;
    }
    const client = resolveClient(currentOptions.clientId);
    error.value = null;
    loading.value = true;
    called.value = true;
    try {
      const result = await client.mutate({
        mutation: currentDocument,
        ...currentOptions,
        ...overrideOptions,
        variables: (variables != null ? variables : currentOptions.variables) ? {
          ...currentOptions.variables,
          ...variables
        } : void 0
      });
      loading.value = false;
      doneEvent.trigger(result);
      return result;
    } catch (e) {
      const apolloError = toApolloError(e);
      error.value = apolloError;
      loading.value = false;
      errorEvent.trigger(apolloError);
      if (currentOptions.throws === "always" || currentOptions.throws !== "never" && !errorEvent.getCount()) {
        throw apolloError;
      }
    }
    return null;
  }
  vm && onBeforeUnmount3(() => {
    loading.value = false;
  });
  return {
    mutate,
    loading,
    error,
    called,
    onDone: doneEvent.on,
    onError: errorEvent.on
  };
}

// src/useSubscription.ts
import {
  ref as ref5,
  watch as watch3,
  isRef as isRef5,
  computed as computed4,
  getCurrentInstance as getCurrentInstance5,
  onBeforeUnmount as onBeforeUnmount4,
  nextTick as nextTick2
} from "vue-demi";
import {throttle as throttle2, debounce as debounce2} from "throttle-debounce";
function useSubscription(document, variables = void 0, options = {}) {
  const vm = getCurrentInstance5();
  const documentRef = paramToRef(document);
  const variablesRef = paramToRef(variables);
  const optionsRef = paramToReactive(options);
  const result = ref5();
  const resultEvent = useEventHook();
  const error = ref5(null);
  const errorEvent = useEventHook();
  const loading = ref5(false);
  vm && trackSubscription(loading);
  const {resolveClient} = useApolloClient();
  const subscription = ref5(null);
  let observer = null;
  let started = false;
  function start() {
    var _a;
    if (started || !isEnabled.value || isServer)
      return;
    started = true;
    loading.value = true;
    const client = resolveClient((_a = currentOptions.value) == null ? void 0 : _a.clientId);
    subscription.value = client.subscribe({
      query: currentDocument,
      variables: currentVariables,
      ...currentOptions.value
    });
    observer = subscription.value.subscribe({
      next: onNextResult,
      error: onError
    });
  }
  function onNextResult(fetchResult) {
    result.value = fetchResult.data;
    loading.value = false;
    resultEvent.trigger(fetchResult);
  }
  function onError(fetchError) {
    const apolloError = toApolloError(fetchError);
    error.value = apolloError;
    loading.value = false;
    errorEvent.trigger(apolloError);
  }
  function stop() {
    if (!started)
      return;
    started = false;
    loading.value = false;
    if (subscription.value) {
      subscription.value = null;
    }
    if (observer) {
      observer.unsubscribe();
      observer = null;
    }
  }
  let restarting = false;
  function baseRestart() {
    if (!started || restarting)
      return;
    restarting = true;
    nextTick2(() => {
      if (started) {
        stop();
        start();
      }
      restarting = false;
    });
  }
  let debouncedRestart;
  function updateRestartFn() {
    var _a, _b;
    if ((_a = currentOptions.value) == null ? void 0 : _a.throttle) {
      debouncedRestart = throttle2(currentOptions.value.throttle, baseRestart);
    } else if ((_b = currentOptions.value) == null ? void 0 : _b.debounce) {
      debouncedRestart = debounce2(currentOptions.value.debounce, baseRestart);
    } else {
      debouncedRestart = baseRestart;
    }
  }
  function restart() {
    if (!debouncedRestart)
      updateRestartFn();
    debouncedRestart();
  }
  const currentOptions = ref5();
  watch3(() => isRef5(optionsRef) ? optionsRef.value : optionsRef, (value) => {
    if (currentOptions.value && (currentOptions.value.throttle !== value.throttle || currentOptions.value.debounce !== value.debounce)) {
      updateRestartFn();
    }
    currentOptions.value = value;
    restart();
  }, {
    deep: true,
    immediate: true
  });
  let currentDocument;
  watch3(documentRef, (value) => {
    currentDocument = value;
    restart();
  }, {
    immediate: true
  });
  let currentVariables;
  let currentVariablesSerialized;
  watch3(variablesRef, (value, oldValue) => {
    const serialized = JSON.stringify(value);
    if (serialized !== currentVariablesSerialized) {
      currentVariables = value;
      restart();
    }
    currentVariablesSerialized = serialized;
  }, {
    deep: true,
    immediate: true
  });
  const enabledOption = computed4(() => !currentOptions.value || currentOptions.value.enabled == null || currentOptions.value.enabled);
  const isEnabled = enabledOption;
  watch3(isEnabled, (value) => {
    if (value) {
      start();
    } else {
      stop();
    }
  }, {
    immediate: true
  });
  vm && onBeforeUnmount4(stop);
  return {
    result,
    loading,
    error,
    start,
    stop,
    restart,
    document: documentRef,
    variables: variablesRef,
    options: optionsRef,
    subscription,
    onResult: resultEvent.on,
    onError: errorEvent.on
  };
}

// src/useResult.ts
import {computed as computed5} from "vue-demi";
function useResult(result, defaultValue, pick) {
  console.warn(`'useResult' is deprecated and will be removed soon. Please use 'computed' instead.
Before:
const items = useResult(result, [], data => data.someField.myItems)
After:
const items = computed(() => result.value?.someField.myItems ?? [])`);
  return computed5(() => {
    const value = result.value;
    if (value) {
      if (pick) {
        try {
          return pick(value);
        } catch (e) {
        }
      } else {
        const keys = Object.keys(value);
        if (keys.length === 1) {
          return value[keys[0]];
        } else {
          return value;
        }
      }
    }
    return defaultValue;
  });
}

// src/useLoading.ts
import {computed as computed6} from "vue-demi";
function useQueryLoading() {
  const {tracking} = getCurrentTracking();
  if (!tracking)
    throw new Error("useQueryLoading must be called inside a setup function.");
  return computed6(() => tracking.queries.value > 0);
}
function useMutationLoading() {
  const {tracking} = getCurrentTracking();
  if (!tracking)
    throw new Error("useMutationLoading must be called inside a setup function.");
  return computed6(() => tracking.mutations.value > 0);
}
function useSubscriptionLoading() {
  const {tracking} = getCurrentTracking();
  if (!tracking)
    throw new Error("useSubscriptionLoading must be called inside a setup function.");
  return computed6(() => tracking.subscriptions.value > 0);
}
function useGlobalQueryLoading() {
  return computed6(() => globalTracking.queries.value > 0);
}
function useGlobalMutationLoading() {
  return computed6(() => globalTracking.mutations.value > 0);
}
function useGlobalSubscriptionLoading() {
  return computed6(() => globalTracking.subscriptions.value > 0);
}
export {
  ApolloClients,
  DefaultApolloClient,
  provideApolloClient,
  provideApolloClients,
  useApolloClient,
  useGlobalMutationLoading,
  useGlobalQueryLoading,
  useGlobalSubscriptionLoading,
  useLazyQuery,
  useMutation,
  useMutationLoading,
  useQuery,
  useQueryLoading,
  useResult,
  useSubscription,
  useSubscriptionLoading
};
//# sourceMappingURL=index.mjs.map
