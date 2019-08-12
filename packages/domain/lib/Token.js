"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pipeable_1 = require("fp-ts/lib/pipeable");
var Either_1 = require("fp-ts/lib/Either");
var t = require("io-ts");
var FilledString = /** @class */ (function (_super) {
    __extends(FilledString, _super);
    function FilledString() {
        var _this = _super.call(this, 'FilledString', function (u) { return typeof u === 'string' && u.length > 0; }, function (input, context) {
            return _this.is(input) ? t.success(input) : t.failure(input, context);
        }, t.identity) || this;
        _this._tag = 'FilledString';
        return _this;
    }
    return FilledString;
}(t.Type));
var filledString = new FilledString();
exports.create = function (anything) {
    var result = pipeable_1.pipe(filledString.decode(anything), Either_1.map(function (t) { return ({ value: t }); }));
    return result;
};
//# sourceMappingURL=Token.js.map