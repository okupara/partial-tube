"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ds = require("./DateFromString");
var id = require("./Id");
var t = require("io-ts");
var Id = id.createIdType(function (i) { return ({ tag: 'PlaylistId', value: i }); });
var Command = t.type({
    id: Id,
    name: t.string,
    created: ds.DateFromStringType
});
exports.create = Command.decode;
//# sourceMappingURL=Playlist.js.map