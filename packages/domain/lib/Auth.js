"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("fp-ts/lib/Either");
var pipeable_1 = require("fp-ts/lib/pipeable");
var User = require("./User");
var Token = require("./Token");
var StateTags;
(function (StateTags) {
    StateTags["MisMatchError"] = "MissMatchError";
    StateTags["NetworkError"] = "NetworkError";
    StateTags["RejectedError"] = "RejectedError";
    StateTags["InvalidTokenError"] = "InvalidTokenError";
})(StateTags || (StateTags = {}));
var Init;
(function (Init) {
    Init.tag = 'Init';
    Init.createState = function () {
        return E.right({
            tag: Init.tag
        });
    };
})(Init || (Init = {}));
var GotToken;
(function (GotToken) {
    GotToken.tag = 'GotToken';
    GotToken.create = function (token) { return ({
        tag: GotToken.tag,
        token: token
    }); };
    GotToken.takeToken = function (anything) {
        return pipeable_1.pipe(Token.create(anything), E.fold(function (_) { return E.left(NoStoredTokenError.create()); }, function (a) { return E.right(GotToken.create(a)); }));
    };
})(GotToken || (GotToken = {}));
var Done;
(function (Done) {
    Done.tag = 'Done';
    Done.create = function (record) { return ({
        tag: Done.tag,
        record: record
    }); };
    Done.takeResult = function (anything) {
        return pipeable_1.pipe(User.create(anything), E.fold(function (_) { return E.left(MismatchError.cereate()); }, function (a) { return E.right(Done.create(a)); }));
    };
})(Done || (Done = {}));
var NoStoredTokenError;
(function (NoStoredTokenError) {
    NoStoredTokenError.tag = 'NoStoredTokenError';
    NoStoredTokenError.create = function () { return ({
        tag: NoStoredTokenError.tag
    }); };
})(NoStoredTokenError || (NoStoredTokenError = {}));
var MismatchError;
(function (MismatchError) {
    MismatchError.cereate = function () { return ({
        tag: StateTags.MisMatchError
    }); };
})(MismatchError || (MismatchError = {}));
var NetworkError;
(function (NetworkError) {
    NetworkError.create = function () { return ({
        tag: StateTags.NetworkError
    }); };
    NetworkError.createState = function () { return E.left(NetworkError.create()); };
})(NetworkError || (NetworkError = {}));
var InvalidTokenError;
(function (InvalidTokenError) {
    InvalidTokenError.tag = 'InvalidTokenError';
    InvalidTokenError.create = function () { return ({
        tag: InvalidTokenError.tag
    }); };
})(InvalidTokenError = exports.InvalidTokenError || (exports.InvalidTokenError = {}));
var RejectedError;
(function (RejectedError) {
    RejectedError.createState = function () {
        return E.left({
            tag: StateTags.RejectedError
        });
    };
})(RejectedError || (RejectedError = {}));
exports.isStateInit = function (s) {
    return E.isRight(s) && s.right.tag === Init.tag;
};
exports.isStateGotToken = function (s) {
    return E.isRight(s) && s.right.tag === GotToken.tag;
};
exports.isStateDone = function (s) {
    return E.isRight(s) && s.right.tag === Done.tag;
};
exports.isErrorState = function (s) { return E.isLeft(s); };
exports.isNetworkError = function (e) {
    return e.tag === StateTags.NetworkError;
};
// const IsStateLeft = (s: State): s is E.Left<LeftState> => E.isLeft(s)
// assume the function returns unkown because domain doesn't have to know what it is.
exports.takeToken = function (token) { return GotToken.takeToken(token); };
exports.init = Init.createState;
exports.takeQueryResult = function (state, queryResult) {
    return E.isLeft(state) ? state : Done.takeResult(queryResult);
};
exports.beNetWorkError = function () { return NetworkError.createState(); };
exports.beRejectedError = function () { return RejectedError.createState(); };
exports.takeLoggedIn = function (saveStorage, command) {
    return pipeable_1.pipe(Token.create(command.token), E.fold(RejectedError.createState, function (a) {
        saveStorage(a);
        return Done.takeResult(command.user);
    }));
};
//# sourceMappingURL=Auth.js.map