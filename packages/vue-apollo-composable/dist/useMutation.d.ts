import { DocumentNode } from 'graphql';
import { MutationOptions, OperationVariables, FetchResult, TypedDocumentNode, ApolloError } from '@apollo/client/core/index.js';
import { Ref } from 'vue-demi';
import { ReactiveFunction } from './util/ReactiveFunction';
/**
 * `useMutation` options for mutations that don't require `variables`.
 */
export interface UseMutationOptions<TResult = any, TVariables = OperationVariables> extends Omit<MutationOptions<TResult, TVariables>, 'mutation'> {
    clientId?: string;
    throws?: 'auto' | 'always' | 'never';
}
type DocumentParameter<TResult, TVariables> = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode> | TypedDocumentNode<TResult, TVariables> | Ref<TypedDocumentNode<TResult, TVariables>> | ReactiveFunction<TypedDocumentNode<TResult, TVariables>>;
type OptionsParameter<TResult, TVariables> = UseMutationOptions<TResult, TVariables> | Ref<UseMutationOptions<TResult, TVariables>> | ReactiveFunction<UseMutationOptions<TResult, TVariables>>;
export type MutateOverrideOptions<TResult> = Pick<UseMutationOptions<TResult, OperationVariables>, 'update' | 'optimisticResponse' | 'context' | 'updateQueries' | 'refetchQueries' | 'awaitRefetchQueries' | 'errorPolicy' | 'fetchPolicy' | 'clientId'>;
export type MutateResult<TResult> = Promise<FetchResult<TResult, Record<string, any>, Record<string, any>> | null>;
export type MutateFunction<TResult, TVariables> = (variables?: TVariables | null, overrideOptions?: MutateOverrideOptions<TResult>) => MutateResult<TResult>;
export interface UseMutationReturn<TResult, TVariables> {
    mutate: MutateFunction<TResult, TVariables>;
    loading: Ref<boolean>;
    error: Ref<ApolloError | null>;
    called: Ref<boolean>;
    onDone: (fn: (param: FetchResult<TResult, Record<string, any>, Record<string, any>>) => void) => {
        off: () => void;
    };
    onError: (fn: (param: ApolloError) => void) => {
        off: () => void;
    };
}
export declare function useMutation<TResult = any, TVariables extends OperationVariables = OperationVariables>(document: DocumentParameter<TResult, TVariables>, options?: OptionsParameter<TResult, TVariables>): UseMutationReturn<TResult, TVariables>;
export {};
