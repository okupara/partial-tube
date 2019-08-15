"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("io-ts");
var validation = function (d) {
    return d instanceof Date && d.toString() !== 'Invalid Date';
};
var DateConverter = new t.Type('DateConverter', validation, function (i, c) {
    var date = new Date(i);
    return validation(date) ? t.success(date) : t.failure(date, c);
}, Date);
exports.DateFromStringType = t.string.pipe(DateConverter, 'DateFromStringType');
//# sourceMappingURL=DateFromString.js.map