import * as E from 'fp-ts/lib/Either';
import * as User from './User';
import * as Token from './Token';
declare enum StateTags {
    MisMatchError = "MissMatchError",
    NetworkError = "NetworkError",
    RejectedError = "RejectedError",
    InvalidTokenError = "InvalidTokenError"
}
declare namespace Init {
    const tag = "Init";
    interface Type {
        tag: typeof tag;
    }
    const createState: () => E.Either<ErrorTypes, RightState>;
}
declare namespace GotToken {
    const tag = "GotToken";
    interface Type {
        tag: typeof tag;
        token: Token.Record;
    }
    const create: (token: Token.Record) => Type;
    const takeToken: (anything: unknown) => E.Either<ErrorTypes, RightState>;
}
declare namespace Done {
    const tag = "Done";
    interface Type {
        tag: typeof tag;
        record: User.Record;
    }
    const create: (record: User.Record) => Type;
    const takeResult: (anything: unknown) => E.Either<ErrorTypes, RightState>;
}
declare namespace NoStoredTokenError {
    const tag = "NoStoredTokenError";
    interface Type {
        tag: typeof tag;
    }
    const create: () => Type;
}
declare namespace MismatchError {
    interface Type {
        tag: StateTags.MisMatchError;
    }
    const cereate: () => Type;
}
declare namespace NetworkError {
    interface Type {
        tag: StateTags.NetworkError;
    }
    const create: () => Type;
    const createState: () => E.Either<ErrorTypes, RightState>;
}
export declare namespace InvalidTokenError {
    const tag = "InvalidTokenError";
    interface Type {
        tag: typeof tag;
    }
    const create: () => Type;
    const createState: () => E.Either<ErrorTypes, RightState>;
}
declare namespace RejectedError {
    interface Type {
        tag: StateTags.RejectedError;
    }
    const createState: () => E.Either<ErrorTypes, RightState>;
}
declare type RightState = Init.Type | GotToken.Type | Done.Type;
export declare type ErrorTypes = MismatchError.Type | NetworkError.Type | NoStoredTokenError.Type | RejectedError.Type | InvalidTokenError.Type;
declare type LeftState = ErrorTypes;
export declare type State = E.Either<LeftState, RightState>;
export declare const isStateInit: (s: E.Either<ErrorTypes, RightState>) => s is E.Right<Init.Type>;
export declare const isStateGotToken: (s: E.Either<ErrorTypes, RightState>) => s is E.Right<Init.Type>;
export declare const isStateDone: (s: E.Either<ErrorTypes, RightState>) => s is E.Right<Done.Type>;
export declare const isErrorState: (s: E.Either<ErrorTypes, RightState>) => s is E.Left<ErrorTypes>;
export declare const isNetworkError: (e: ErrorTypes) => e is NetworkError.Type;
export declare const takeToken: (token: unknown) => E.Either<ErrorTypes, RightState>;
export declare const init: () => E.Either<ErrorTypes, RightState>;
export declare const takeQueryResult: (state: E.Either<ErrorTypes, RightState>, queryResult: unknown) => E.Either<ErrorTypes, RightState>;
export declare const beNetworkError: () => E.Either<ErrorTypes, RightState>;
export declare const beInvalidTokenError: () => E.Either<ErrorTypes, RightState>;
export declare const beRejectedError: () => E.Either<ErrorTypes, RightState>;
export interface takeLoggedInCommand {
    token: unknown;
    user: unknown;
}
export declare const takeLoggedIn: (saveStorage: (token: Token.Record) => void, command: takeLoggedInCommand) => E.Either<ErrorTypes, RightState>;
export {};
