"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("io-ts");
var pipeable_1 = require("fp-ts/lib/pipeable");
var Either_1 = require("fp-ts/lib/Either");
exports.create = function (anything) {
    var result = pipeable_1.pipe(io.string.decode(anything), Either_1.map(function (t) { return ({ value: t }); }));
    return result;
};
//# sourceMappingURL=Token.js.map