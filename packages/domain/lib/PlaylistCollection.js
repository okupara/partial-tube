"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("io-ts");
var id = require("./Id");
var PlayItem;
(function (PlayItem) {
    PlayItem.runtimeType = t.type({
        id: id.PlayItem.Id,
        videoId: t.string
    });
    PlayItem.create = PlayItem.runtimeType.decode;
})(PlayItem = exports.PlayItem || (exports.PlayItem = {}));
var Playlist;
(function (Playlist) {
    Playlist.runtimeType = t.type({
        id: id.Playlist.Id,
        title: t.string,
        description: t.string,
        items: t.array(PlayItem.runtimeType)
    });
    Playlist.create = Playlist.runtimeType.decode;
})(Playlist = exports.Playlist || (exports.Playlist = {}));
var runtimeType = t.type({
    items: t.array(Playlist.runtimeType),
    count: t.number
});
exports.create = runtimeType.decode;
//# sourceMappingURL=PlaylistCollection.js.map