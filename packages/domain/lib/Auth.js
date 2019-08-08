"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("fp-ts/lib/Either");
var pipeable_1 = require("fp-ts/lib/pipeable");
var User = require("./User");
var Token = require("./Token");
var StateTags;
(function (StateTags) {
    StateTags["Init"] = "Init";
    StateTags["GotToken"] = "GotToken";
    StateTags["Done"] = "Done";
    StateTags["NoStoredTokenError"] = "NoStoredTokenError";
    StateTags["MisMatchError"] = "MissMatchError";
    StateTags["NetworkError"] = "NetworkError";
    StateTags["RejectedError"] = "RejectedError";
})(StateTags || (StateTags = {}));
var Init;
(function (Init) {
    Init.createState = function () {
        return E.right({
            tag: StateTags.Init
        });
    };
    Init.next = function (anything) {
        return pipeable_1.pipe(Token.create(anything), E.fold(function (_) { return E.left(NoStoredTokenError.create()); }, function (a) { return E.right(GotToken.create(a)); }));
    };
})(Init = exports.Init || (exports.Init = {}));
var GotToken;
(function (GotToken) {
    GotToken.create = function (token) { return ({
        tag: StateTags.GotToken,
        token: token
    }); };
    GotToken.next = function (anything) {
        return pipeable_1.pipe(User.create(anything), E.fold(function (_) { return E.left(MismatchError.cereate()); }, function (a) { return E.right(Done.create(a)); }));
    };
})(GotToken = exports.GotToken || (exports.GotToken = {}));
var Done;
(function (Done) {
    Done.create = function (record) { return ({
        tag: StateTags.Done,
        record: record
    }); };
})(Done = exports.Done || (exports.Done = {}));
var NoStoredTokenError;
(function (NoStoredTokenError) {
    NoStoredTokenError.create = function () { return ({
        tag: StateTags.NoStoredTokenError
    }); };
})(NoStoredTokenError = exports.NoStoredTokenError || (exports.NoStoredTokenError = {}));
var MismatchError;
(function (MismatchError) {
    MismatchError.cereate = function () { return ({
        tag: StateTags.MisMatchError
    }); };
})(MismatchError = exports.MismatchError || (exports.MismatchError = {}));
var NetworkError;
(function (NetworkError) {
    NetworkError.create = function () { return ({
        tag: StateTags.NetworkError
    }); };
    NetworkError.createState = function () { return E.left(NetworkError.create()); };
})(NetworkError = exports.NetworkError || (exports.NetworkError = {}));
var RejectedError;
(function (RejectedError) {
    RejectedError.createState = function () {
        return E.left({
            tag: StateTags.RejectedError
        });
    };
})(RejectedError = exports.RejectedError || (exports.RejectedError = {}));
exports.isStateInit = function (s) {
    return E.isRight(s) && s.right.tag === StateTags.Init;
};
exports.isStateGotToken = function (s) {
    return E.isRight(s) && s.right.tag === StateTags.GotToken;
};
exports.done = function (s) {
    return E.isRight(s) && s.right.tag === StateTags.Done;
};
exports.isError = function (s) { return E.isLeft(s); };
// const IsStateLeft = (s: State): s is E.Left<LeftState> => E.isLeft(s)
// assume the function returns unkown because domain doesn't have to know what it is.
exports.getToken = function (getTokenFn) {
    var r = getTokenFn();
    return Init.next(r);
};
exports.receiveQuery = function (queryResult) { return GotToken.next(queryResult); };
exports.updateNetWorkError = function () { return NetworkError.createState(); };
exports.updateLoggedIn = function (saveStorage, tokenStr, user) {
    return pipeable_1.pipe(Token.create(tokenStr), E.fold(RejectedError.createState, function (a) {
        saveStorage(a);
        return GotToken.next(user);
    }));
};
//# sourceMappingURL=Auth.js.map