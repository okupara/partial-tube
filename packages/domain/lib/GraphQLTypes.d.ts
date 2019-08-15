import * as t from 'io-ts';
export declare type PlayItem = {
    id: string;
    title: string;
    videoId: string;
    startSec: number;
    endSec: number;
    description: string | null;
    created: string;
};
export declare type ParamedPlayItem = {
    [k in keyof PlayItem]: t.Mixed;
};
export declare type Playlist = {
    id: string;
    title: string;
    description: string;
    items: PlayItem[];
    created: string;
};
export declare type ParamedPlaylist = {
    [K in keyof Playlist]: t.Mixed;
};
export declare type PlaylistCollection = {
    items: Playlist[];
    count: number;
};
export declare type ParamedPlaylistCollection = {
    [K in keyof PlaylistCollection]: t.Mixed;
};
export declare type MixedType<T> = {
    [k in keyof T]: t.Mixed;
};
