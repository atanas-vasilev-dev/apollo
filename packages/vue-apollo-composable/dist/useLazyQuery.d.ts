import { DocumentNode } from 'graphql';
import { DocumentParameter, VariablesParameter, OptionsParameter, UseQueryOptions } from './useQuery';
export declare function useLazyQuery<TResult = any, TVariables extends Record<string, unknown> = any>(document: DocumentParameter<TResult, TVariables>, variables?: VariablesParameter<TVariables>, options?: OptionsParameter<TResult, TVariables>): {
    load: (document?: DocumentNode | null, variables?: TVariables | null, options?: UseQueryOptions | null) => boolean;
    result: import("vue-demi").Ref<TResult | undefined>;
    loading: import("vue-demi").Ref<boolean>;
    networkStatus: import("vue-demi").Ref<number | undefined>;
    error: import("vue-demi").Ref<import("@apollo/client/errors").ApolloError | null>;
    start: () => void;
    stop: () => void;
    restart: () => void;
    forceDisabled: import("vue-demi").Ref<boolean>;
    document: import("vue-demi").Ref<DocumentNode | null | undefined>;
    variables: import("vue-demi").Ref<TVariables | undefined>;
    options: UseQueryOptions<TResult, TVariables> | import("vue-demi").Ref<UseQueryOptions<TResult, TVariables>>;
    query: import("vue-demi").Ref<import("@apollo/client/core").ObservableQuery<TResult, TVariables> | null | undefined>;
    refetch: (variables?: TVariables | undefined) => Promise<import("@apollo/client/core").ApolloQueryResult<TResult>> | undefined;
    fetchMore: (options: import("@apollo/client/core").FetchMoreQueryOptions<TVariables, TResult> & import("@apollo/client/core").FetchMoreOptions<TResult, TVariables>) => Promise<import("@apollo/client/core").ApolloQueryResult<TResult>> | undefined;
    subscribeToMore: <TSubscriptionVariables = import("@apollo/client/core").OperationVariables, TSubscriptionData = TResult>(options: import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData> | import("vue-demi").Ref<import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>> | import("./util/ReactiveFunction").ReactiveFunction<import("@apollo/client/core").SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>>) => void;
    onResult: (fn: (param: import("@apollo/client/core").ApolloQueryResult<TResult>) => void) => {
        off: () => void;
    };
    onError: (fn: (param: import("@apollo/client/errors").ApolloError) => void) => {
        off: () => void;
    };
};
