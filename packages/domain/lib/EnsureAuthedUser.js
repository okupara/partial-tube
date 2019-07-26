"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var Option_1 = require("fp-ts/lib/Option");
exports.emptyTokenError = function () { return ({
    tag: "EmptyTokenError" /* EmptyTokenError */,
    error: new Error("couldn't find anything")
}); };
var createToken = function (token) { return token; };
var getAuthedInfo = function () {
    var a = createToken('');
    return Option_1.some(a);
};
var verifyToken = function (token) {
    return Either_1.right({
        name: 'hoge',
        avatarUrl: 'fooo'
    });
};
var toEitherToken = Either_1.fromOption(function () { return exports.emptyTokenError(); });
exports.default = (function () {
    return Either_1.either.chain(toEitherToken(getAuthedInfo()), verifyToken);
});
// const foo = pipe(
//     toEitherToken(getAuthedInfo()),
//     eitherMap(a => verifyToken(a)),
// )
//# sourceMappingURL=EnsureAuthedUser.js.map