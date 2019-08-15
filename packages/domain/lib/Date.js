"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("io-ts");
var validation = function (d) {
    return d instanceof Date && d.toString() !== 'Invalid Date';
};
var DateConverter = new t.Type('DateFromStringType', validation, function (i, c) {
    var date = new Date(i);
    return validation(date) ? t.success(date) : t.failure(date, c);
}, Date);
var DateFromStringType = t.string.pipe(DateConverter, 'DateFromStringType');
//# sourceMappingURL=Date.js.map