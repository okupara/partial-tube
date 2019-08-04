export declare const enum ErrorTypes {
    NoStoredTokenError = "NoStoredTokenError"
}
export interface NoStoredTokenError {
    code: ErrorTypes.NoStoredTokenError;
    message: string;
}
export declare const createNoStoredTokenError: () => {
    code: ErrorTypes;
    message: string;
};
export declare type PTError = NoStoredTokenError;
