import { User } from './User';
import { Either } from 'fp-ts/lib/Either';
export declare const enum ErrorTags {
    InvalidTokenError = "InvalidTokenError",
    ExpiredTokenError = "ExpiredTokenError",
    EmptyTokenError = "EmptyTokenError"
}
declare type InvalidTokenError = {
    error: Error;
    tag: ErrorTags.InvalidTokenError;
};
declare type ExpiredTokenError = {
    error: Error;
    tag: ErrorTags.ExpiredTokenError;
};
declare type EmptyTokenError = {
    error: Error;
    tag: ErrorTags.EmptyTokenError;
};
export declare type Result = Either<EnsureAuthedUserErrors, User>;
declare type EnsureAuthedUserErrors = InvalidTokenError | ExpiredTokenError | EmptyTokenError;
export declare const emptyTokenError: () => EmptyTokenError;
declare const _default: () => Either<EnsureAuthedUserErrors, User>;
export default _default;
