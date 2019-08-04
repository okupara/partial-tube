"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var State = require("./State");
exports.createToken = function (tokenStr) {
    if (!tokenStr || tokenStr.length < 10) {
        return Either_1.left(exports.createInvalidTokenError());
    }
    return Either_1.right({ value: tokenStr });
};
exports.createInvalidTokenError = function () { return ({
    tag: "InvalidTokenError" /* InvalidTokenError */
}); };
exports.retrieveToken = function (getTokenFunc) {
    var tokenStr = getTokenFunc();
    return exports.createToken(tokenStr);
};
exports.processAuthState = function (s, cases) {
    switch (s.tag) {
        case State.Tags.Init:
        default:
            return cases.Verifying ? cases.Verifying() : null;
        case State.Tags.Error:
            return cases.Rejected ? cases.Rejected(s.error) : null;
        case State.Tags.Done:
            return cases.Authed ? cases.Authed(s.result) : null;
    }
};
//# sourceMappingURL=Auth.js.map