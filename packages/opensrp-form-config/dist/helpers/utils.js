"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = void 0;

var formatDate = function formatDate(stringDate) {
  var date = new Date(stringDate);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyy = date.getFullYear();
  if (dd < 10) dd = "0".concat(dd);
  if (mm < 10) mm = "0".concat(mm);
  return "".concat(yyy, "-").concat(mm, "-").concat(dd);
};

exports.formatDate = formatDate;