"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// so far, I don't think the id which we should deal them as a Number comes
// I assume all of id that I use in this app are String
var t = require("io-ts");
var validation = function (i) { return i.length > 0; };
var FilledStringChecker = new t.Type('FilledStringChecker', validation, function (i, c) { return (validation(i) ? t.success(i) : t.failure(i, c)); }, t.identity);
var FilledString = t.string.pipe(FilledStringChecker, 'FilledString');
var BaseStringId = t.type({ value: FilledString });
exports.createIdType = function (f) {
    var StringId = new t.Type('StringId', function (i) { return BaseStringId.is(i); }, function (i, c) { return (FilledString.is(i) ? t.success(f(i)) : t.failure(i, c)); }, function (a) { return a.value; });
    return StringId;
};
var PlayItem;
(function (PlayItem) {
    PlayItem.Id = exports.createIdType(function (i) { return ({ tag: 'PlayItemId', value: i }); });
    PlayItem.create = PlayItem.Id.decode;
})(PlayItem = exports.PlayItem || (exports.PlayItem = {}));
var Playlist;
(function (Playlist) {
    Playlist.Id = exports.createIdType(function (i) { return ({ tag: 'PlaylistId', value: i }); });
    Playlist.create = Playlist.Id.decode;
})(Playlist = exports.Playlist || (exports.Playlist = {}));
//# sourceMappingURL=Id.js.map