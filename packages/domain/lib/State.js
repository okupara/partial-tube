"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tags;
(function (Tags) {
    Tags["Init"] = "Init";
    Tags["Error"] = "Error";
    Tags["Waiting"] = "Waiting";
    Tags["Done"] = "Done";
})(Tags = exports.Tags || (exports.Tags = {}));
exports.init = function () { return ({
    tag: Tags.Init
}); };
exports.wait = function () { return ({
    tag: Tags.Waiting
}); };
exports.fail = function (error) { return ({
    tag: Tags.Error,
    error: error
}); };
exports.complete = function (result) { return ({
    tag: Tags.Done,
    result: result
}); };
exports.notFinished = function (s) {
    return s.tag === Tags.Init || s.tag === Tags.Waiting;
};
exports.isInit = function (s) { return s.tag === Tags.Init; };
//# sourceMappingURL=State.js.map