"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("io-ts");
var validator = t.type({
    name: t.string,
    avatarUrl: t.union([t.string, t.null])
});
// MEMO: supposed to be used like below,
// import * as User from "..."
// User.create(something)
exports.create = function (anything) { return (console.log(anything), validator.decode(anything)); };
//# sourceMappingURL=User.js.map