"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var EnsureAuthedUser_1 = require("./EnsureAuthedUser");
exports.unAuthedMock = Either_1.left(EnsureAuthedUser_1.emptyTokenError());
//# sourceMappingURL=Mock.js.map