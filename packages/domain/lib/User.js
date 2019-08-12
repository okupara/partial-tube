"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("io-ts");
var pipeable_1 = require("fp-ts/lib/pipeable");
var Either_1 = require("fp-ts/lib/Either");
var Id;
(function (Id) {
    Id.create = function (value) { return ({ tag: 'userId', value: value }); };
})(Id || (Id = {}));
var IdType = new t.Type('id-object', function (u) { return typeof u === 'string' && u.length > 0; }, function (input, context) {
    return typeof input === 'string' ? t.success(input) : t.failure(input, context);
}, function (v) { return ({ tag: 'userId', value: v }); });
var validator = t.type({
    userId: IdType,
    name: t.string,
    avatarUrl: t.union([t.string, t.null])
});
exports.create = function (anything) {
    return pipeable_1.pipe(validator.decode(anything), Either_1.map(function (_a) {
        var name = _a.name, userId = _a.userId, avatarUrl = _a.avatarUrl;
        return ({
            name: name,
            avatarUrl: avatarUrl,
            userId: Id.create(userId)
        });
    }));
};
//# sourceMappingURL=User.js.map