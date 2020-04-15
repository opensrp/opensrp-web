"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultHeaders = getDefaultHeaders;
exports.getFetchOptions = getFetchOptions;
exports.OpenSRPService = exports.OPENSRP_API_BASE_URL = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _querystring = _interopRequireDefault(require("querystring"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var OPENSRP_API_BASE_URL = 'https://test.smartregister.org/opensrp/rest/';
exports.OPENSRP_API_BASE_URL = OPENSRP_API_BASE_URL;

function getDefaultHeaders() {
  var accessToken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hunter2';
  var accept = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'application/json';
  var authorizationType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Bearer';
  var contentType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'application/json;charset=UTF-8';
  return {
    accept: accept,
    authorization: "".concat(authorizationType, " ").concat(accessToken),
    'content-type': contentType
  };
}

function getFetchOptions(signal, method) {
  return {
    headers: getDefaultHeaders(),
    method: method
  };
}

var OpenSRPService = function () {
  function OpenSRPService() {
    var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OPENSRP_API_BASE_URL;
    var endpoint = arguments.length > 1 ? arguments[1] : undefined;
    var getPayload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getFetchOptions;
    var signal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new AbortController().signal;
    (0, _classCallCheck2["default"])(this, OpenSRPService);
    (0, _defineProperty2["default"])(this, "baseURL", void 0);
    (0, _defineProperty2["default"])(this, "endpoint", void 0);
    (0, _defineProperty2["default"])(this, "generalURL", void 0);
    (0, _defineProperty2["default"])(this, "getOptions", void 0);
    (0, _defineProperty2["default"])(this, "signal", void 0);
    this.endpoint = endpoint;
    this.getOptions = getPayload;
    this.signal = signal;
    this.baseURL = baseURL;
    this.generalURL = "".concat(this.baseURL).concat(this.endpoint);
  }

  (0, _createClass2["default"])(OpenSRPService, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(data) {
        var params,
            method,
            url,
            payload,
            response,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                method = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'POST';
                url = OpenSRPService.getURL(this.generalURL, params);
                payload = _objectSpread({}, this.getOptions(this.signal, method), {
                  'Cache-Control': 'no-cache',
                  Pragma: 'no-cache',
                  body: JSON.stringify(data)
                });
                _context.next = 6;
                return fetch(url, payload);

              case 6:
                response = _context.sent;

                if (!(!response.ok || response.status !== 201)) {
                  _context.next = 9;
                  break;
                }

                throw new Error("OpenSRPService create on ".concat(this.endpoint, " failed, HTTP status ").concat(response.status));

              case 9:
                return _context.abrupt("return", {});

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "read",
    value: function () {
      var _read = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(id) {
        var params,
            method,
            url,
            response,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
                method = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'GET';
                url = OpenSRPService.getURL("".concat(this.generalURL, "/").concat(id), params);
                _context2.next = 5;
                return fetch(url, this.getOptions(this.signal, method));

              case 5:
                response = _context2.sent;

                if (response.ok) {
                  _context2.next = 8;
                  break;
                }

                throw new Error("OpenSRPService read on ".concat(this.endpoint, " failed, HTTP status ").concat(response.status));

              case 8:
                _context2.next = 10;
                return response.json();

              case 10:
                return _context2.abrupt("return", _context2.sent);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read(_x2) {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(data) {
        var params,
            method,
            url,
            payload,
            response,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
                method = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'PUT';
                url = OpenSRPService.getURL(this.generalURL, params);
                payload = _objectSpread({}, this.getOptions(this.signal, method), {
                  'Cache-Control': 'no-cache',
                  Pragma: 'no-cache',
                  body: JSON.stringify(data)
                });
                _context3.next = 6;
                return fetch(url, payload);

              case 6:
                response = _context3.sent;

                if (response.ok) {
                  _context3.next = 9;
                  break;
                }

                throw new Error("OpenSRPService update on ".concat(this.endpoint, " failed, HTTP status ").concat(response.status));

              case 9:
                return _context3.abrupt("return", {});

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update(_x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4() {
        var params,
            method,
            url,
            response,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
                method = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 'GET';
                url = OpenSRPService.getURL(this.generalURL, params);
                _context4.next = 5;
                return fetch(url, this.getOptions(this.signal, method));

              case 5:
                response = _context4.sent;

                if (response.ok) {
                  _context4.next = 8;
                  break;
                }

                throw new Error("OpenSRPService list on ".concat(this.endpoint, " failed, HTTP status ").concat(response.status));

              case 8:
                _context4.next = 10;
                return response.json();

              case 10:
                return _context4.abrupt("return", _context4.sent);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function list() {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5() {
        var params,
            method,
            url,
            response,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
                method = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 'DELETE';
                url = OpenSRPService.getURL(this.generalURL, params);
                _context5.next = 5;
                return fetch(url, this.getOptions(this.signal, method));

              case 5:
                response = _context5.sent;

                if (!(response.ok || response.status === 204 || response.status === 200)) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", {});

              case 10:
                throw new Error("OpenSRPService delete on ".concat(this.endpoint, " failed, HTTP status ").concat(response.status));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }], [{
    key: "getURL",
    value: function getURL(generalUrl, params) {
      if (params) {
        return "".concat(generalUrl, "?").concat(_querystring["default"].stringify(params));
      }

      return generalUrl;
    }
  }, {
    key: "getFilterParams",
    value: function getFilterParams(obj) {
      return Object.entries(obj).map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        return "".concat(key, ":").concat(val);
      }).join(',');
    }
  }]);
  return OpenSRPService;
}();

exports.OpenSRPService = OpenSRPService;