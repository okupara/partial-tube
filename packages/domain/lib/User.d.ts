import * as t from 'io-ts';
declare namespace Id {
    type Type = {
        tag: 'userId';
        value: string;
    };
    const create: (value: string) => Type;
}
export interface Record {
    userId: Id.Type;
    name: string;
    avatarUrl: string | null;
}
export declare const create: (anything: unknown) => import("fp-ts/lib/Either").Either<t.Errors, Record>;
export {};
