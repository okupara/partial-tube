import * as t from 'io-ts';
declare const BaseStringId: t.TypeC<{
    value: t.Type<string, string, unknown>;
}>;
export declare type BaseStringId = t.TypeOf<typeof BaseStringId>;
export declare const createIdType: <T extends {
    value: string;
}>(f: (i: string) => T) => t.Type<T, string, unknown>;
export declare namespace PlayItem {
    type Id = {
        tag: 'PlayItemId';
    } & BaseStringId;
    const Id: t.Type<Id, string, unknown>;
    const create: (i: unknown) => import("fp-ts/lib/Either").Either<t.Errors, Id>;
}
export declare namespace Playlist {
    type Id = {
        tag: 'PlaylistId';
    } & BaseStringId;
    const Id: t.Type<Id, string, unknown>;
    const create: (i: unknown) => import("fp-ts/lib/Either").Either<t.Errors, Id>;
}
export {};
