import * as id from './Id';
import * as t from 'io-ts';
declare type TagForId = {
    tag: 'PlaylistId';
};
export declare type Id = TagForId & id.BaseStringId;
declare const Command: t.TypeC<{
    id: t.Type<Id, string, unknown>;
    name: t.StringC;
    created: t.Type<Date, string, unknown>;
}>;
export declare const create: (i: unknown) => import("fp-ts/lib/Either").Either<t.Errors, {
    id: Id;
    name: string;
    created: Date;
}>;
export declare type Record = t.TypeOf<typeof Command>;
export {};
