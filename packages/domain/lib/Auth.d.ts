import * as E from 'fp-ts/lib/Either';
import * as User from './User';
import * as Token from './Token';
export declare const enum ErrorTags {
    InvalidTokenError = "InvalidTokenError"
}
declare enum StateTags {
    Init = "Init",
    GotToken = "GotToken",
    Done = "Done",
    NoStoredTokenError = "NoStoredTokenError",
    MisMatchError = "MissMatchError",
    NetworkError = "NetworkError",
    RejectedError = "RejectedError"
}
export declare namespace Init {
    interface Type {
        tag: StateTags.Init;
    }
    const createState: () => E.Either<AuthError, RightState>;
    const next: (anything: unknown) => E.Either<AuthError, RightState>;
}
export declare namespace GotToken {
    interface Type {
        tag: StateTags.GotToken;
        token: Token.Record;
    }
    const create: (token: Token.Record) => Type;
    const next: (anything: unknown) => E.Either<AuthError, RightState>;
}
export declare namespace Done {
    interface Type {
        tag: StateTags.Done;
        record: User.Record;
    }
    const create: (record: User.Record) => Type;
}
export declare namespace NoStoredTokenError {
    interface Type {
        tag: StateTags.NoStoredTokenError;
    }
    const create: () => Type;
}
export declare namespace MismatchError {
    interface Type {
        tag: StateTags.MisMatchError;
    }
    const cereate: () => Type;
}
export declare namespace NetworkError {
    interface Type {
        tag: StateTags.NetworkError;
    }
    const create: () => Type;
    const createState: () => E.Either<AuthError, RightState>;
}
export declare namespace RejectedError {
    interface Type {
        tag: StateTags.RejectedError;
    }
    const createState: () => E.Either<AuthError, RightState>;
}
declare type RightState = Init.Type | GotToken.Type | Done.Type;
declare type AuthError = MismatchError.Type | NetworkError.Type | NoStoredTokenError.Type | RejectedError.Type;
declare type LeftState = AuthError;
export declare type State = E.Either<LeftState, RightState>;
export declare type StateExperiment = RightState | LeftState;
export declare const isStateInit: (s: E.Either<AuthError, RightState>) => s is E.Right<Init.Type>;
export declare const isStateGotToken: (s: E.Either<AuthError, RightState>) => s is E.Right<Init.Type>;
export declare const done: (s: E.Either<AuthError, RightState>) => s is E.Right<Done.Type>;
export declare const isError: (s: E.Either<AuthError, RightState>) => s is E.Left<AuthError>;
export declare const getToken: (getTokenFn: () => unknown) => E.Either<AuthError, RightState>;
export declare const receiveQuery: (queryResult: unknown) => E.Either<AuthError, RightState>;
export declare const updateNetWorkError: () => E.Either<AuthError, RightState>;
export declare const updateLoggedIn: (saveStorage: (token: Token.Record) => void, tokenStr: unknown, user: unknown) => E.Either<AuthError, RightState>;
export {};
