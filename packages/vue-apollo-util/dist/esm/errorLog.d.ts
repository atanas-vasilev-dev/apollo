import { ApolloError } from '@apollo/client/core/index.js';
import { ErrorResponse } from '@apollo/client/link/error/index.js';
export declare function getErrorMessages(error: ErrorResponse | ApolloError): string[];
export declare function logErrorMessages(error: ApolloError | ErrorResponse, printStack?: boolean): void;
