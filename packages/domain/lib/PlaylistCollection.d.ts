import * as t from 'io-ts';
import * as gqlt from './GraphQLTypes';
export declare namespace PlayItem {
    type NeededFileds = Pick<gqlt.PlayItem, 'id' | 'videoId'>;
    const runtimeType: t.Type<NeededFileds>;
    const create: (i: unknown) => import("fp-ts/lib/Either").Either<t.Errors, Pick<gqlt.PlayItem, "id" | "videoId">>;
    type Type = t.TypeOf<typeof runtimeType>;
}
export declare namespace Playlist {
    type NeededFields = Pick<gqlt.Playlist, 'id' | 'title' | 'description' | 'items'>;
    const runtimeType: t.Type<NeededFields>;
    const create: (i: unknown) => import("fp-ts/lib/Either").Either<t.Errors, Pick<gqlt.Playlist, "title" | "id" | "description" | "items">>;
    type Type = t.TypeOf<typeof runtimeType>;
}
declare const runtimeType: t.Type<gqlt.PlaylistCollection>;
export declare type Type = t.TypeOf<typeof runtimeType>;
export declare const create: (i: unknown) => import("fp-ts/lib/Either").Either<t.Errors, gqlt.PlaylistCollection>;
export {};
