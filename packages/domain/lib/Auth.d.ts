import { Either } from 'fp-ts/lib/Either';
import * as User from './User';
import * as State from './State';
export declare const enum ErrorTags {
    InvalidTokenError = "InvalidTokenError"
}
export interface Token {
    value: string;
}
export interface InvalidTokenError {
    tag: ErrorTags.InvalidTokenError;
}
export declare type Error = InvalidTokenError;
export declare type Result = Either<Error, User.Record>;
export declare type State = State.Type<Error, User.Record>;
export declare const createToken: (tokenStr: String | null) => Either<InvalidTokenError, Token>;
export declare const createInvalidTokenError: () => InvalidTokenError;
export declare const retrieveToken: (getTokenFunc: () => string | null) => Either<InvalidTokenError, Token>;
interface CasesFunctions<J> {
    Verifying?: () => J;
    Rejected?: (error: Error) => J;
    Authed?: (result: User.Record) => J;
}
export declare const processAuthState: <J>(s: State.Type<InvalidTokenError, User.Record>, cases: CasesFunctions<J>) => J | null;
export {};
