"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDownload = exports.DownloadFile = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var DownloadFile = function DownloadFile(file, fileName) {
  var url = window.URL.createObjectURL(file);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

exports.DownloadFile = DownloadFile;

var handleDownload = function () {
  var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(data, fileName) {
    var content, blob;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            content = JSON.parse(data);
            blob = new Blob([content], {
              type: 'application/json'
            });
            DownloadFile(blob, fileName);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleDownload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleDownload = handleDownload;