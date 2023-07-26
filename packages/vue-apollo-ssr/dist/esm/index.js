import * as serializeJs from 'serialize-javascript';
export function serializeStates(apolloClients, options = {}) {
    const state = getStates(apolloClients, options);
    return options.useUnsafeSerializer
        ? JSON.stringify(state)
        : serializeJs(state);
}
export function getStates(apolloClients, options = {}) {
    const finalOptions = Object.assign({}, {
        exportNamespace: '',
    }, options);
    const states = {};
    for (const key in apolloClients) {
        const client = apolloClients[key];
        const state = client.cache.extract();
        states[`${finalOptions.exportNamespace}${key}`] = state;
    }
    return states;
}
export function exportStates(apolloClients, options = {}) {
    const finalOptions = Object.assign({}, {
        globalName: '__APOLLO_STATE__',
        attachTo: 'window',
        useUnsafeSerializer: false,
    }, options);
    return `${finalOptions.attachTo}.${finalOptions.globalName} = ${serializeStates(apolloClients, options)};`;
}
//# sourceMappingURL=index.js.map