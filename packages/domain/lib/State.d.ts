export declare enum Tags {
    Init = "Init",
    Error = "Error",
    Waiting = "Waiting",
    Done = "Done"
}
export interface Init {
    tag: Tags.Init;
}
export interface Error<E> {
    tag: Tags.Error;
    error: E;
}
export interface Waiting {
    tag: Tags.Waiting;
}
export interface Done<T> {
    tag: Tags.Done;
    result: T;
}
export declare type Type<E, T> = Init | Done<T> | Error<E> | Waiting;
export declare const init: () => Init;
export declare const wait: () => Waiting;
export declare const fail: <E>(error: E) => Error<E>;
export declare const complete: <T>(result: T) => Done<T>;
export interface Cases<E, T, J> {
    [Tags.Init]?: () => J;
    [Tags.Waiting]?: () => J;
    [Tags.Error]?: (error: E) => J;
    [Tags.Done]?: (result: T) => J;
}
export declare const notFinished: <E, T>(s: Type<E, T>) => boolean;
export declare const isInit: <E, T>(s: Type<E, T>) => s is Init;
