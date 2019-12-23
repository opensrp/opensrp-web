"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultHeaders = getDefaultHeaders;
exports.getPayloadFn = getPayloadFn;
exports.getURLParams = getURLParams;
exports.getFilterParams = getFilterParams;
exports.getURLFn = getURLFn;
exports.OpenSRPService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var OPENSRP_API_BASE_URL = 'https://test.smartregister.org/opensrp/rest/';

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

function getPayloadFn(signal, method) {
  return {
    headers: getDefaultHeaders(),
    method: method,
    signal: signal
  };
}

function getURLParams(obj) {
  return Object.entries(obj).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return "".concat(key, "=").concat(val);
  }).join('&');
}

function getFilterParams(obj) {
  return Object.entries(obj).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    return "".concat(key, ":").concat(val);
  }).join(',');
}

function getURLFn(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var result = url;

  if (params) {
    result = "".concat(result, "?").concat(getURLParams(params));
  }

  return result;
}

var OpenSRPService = function () {
  function OpenSRPService() {
    var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OPENSRP_API_BASE_URL;
    var endpoint = arguments.length > 1 ? arguments[1] : undefined;
    var getPayload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getPayloadFn;
    var signal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new AbortController().signal;
    var getURL = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : getURLFn;
    (0, _classCallCheck2["default"])(this, OpenSRPService);
    (0, _defineProperty2["default"])(this, "baseURL", void 0);
    (0, _defineProperty2["default"])(this, "endpoint", void 0);
    (0, _defineProperty2["default"])(this, "generalURL", void 0);
    (0, _defineProperty2["default"])(this, "getURL", void 0);
    (0, _defineProperty2["default"])(this, "getPayload", void 0);
    (0, _defineProperty2["default"])(this, "signal", void 0);
    this.endpoint = endpoint;
    this.getPayload = getPayload;
    this.signal = signal;
    this.baseURL = baseURL;
    this.generalURL = "".concat(this.baseURL).concat(this.endpoint);
    this.getURL = getURL;
  }

  (0, _createClass2["default"])(OpenSRPService, [{
    key: "create",
    value: function create(data) {
      var params,
          method,
          url,
          payload,
          response,
          _args = arguments;
      return _regenerator["default"].async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
              method = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'POST';
              url = this.getURL(this.generalURL, params);
              payload = _objectSpread({}, this.getPayload(this.signal, method), {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                body: JSON.stringify(data)
              });
              _context.next = 6;
              return _regenerator["default"].awrap(fetch(url, payload));

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
      }, null, this);
    }
  }, {
    key: "read",
    value: function read(id) {
      var params,
          method,
          url,
          response,
          _args2 = arguments;
      return _regenerator["default"].async(function read$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
              method = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'GET';
              url = this.getURL("".concat(this.generalURL, "/").concat(id), params);
              _context2.next = 5;
              return _regenerator["default"].awrap(fetch(url, this.getPayload(this.signal, method)));

            case 5:
              response = _context2.sent;

              if (response.ok) {
                _context2.next = 8;
                break;
              }

              throw new Error("OpenSRPService read on ".concat(this.endpoint, " failed, HTTP status ").concat(response.status));

            case 8:
              _context2.next = 10;
              return _regenerator["default"].awrap(response.json());

            case 10:
              return _context2.abrupt("return", _context2.sent);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "update",
    value: function update(data) {
      var params,
          method,
          url,
          payload,
          response,
          _args3 = arguments;
      return _regenerator["default"].async(function update$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
              method = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'PUT';
              url = this.getURL(this.generalURL, params);
              payload = _objectSpread({}, this.getPayload(this.signal, method), {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                body: JSON.stringify(data)
              });
              _context3.next = 6;
              return _regenerator["default"].awrap(fetch(url, payload));

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
      }, null, this);
    }
  }, {
    key: "list",
    value: function list() {
      var params,
          method,
          url,
          response,
          _args4 = arguments;
      return _regenerator["default"].async(function list$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
              method = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 'GET';
              url = this.getURL(this.generalURL, params);
              _context4.next = 5;
              return _regenerator["default"].awrap(fetch(url, this.getPayload(this.signal, method)));

            case 5:
              response = _context4.sent;

              if (response.ok) {
                _context4.next = 8;
                break;
              }

              throw new Error("OpenSRPService list on ".concat(this.endpoint, " failed, HTTP status ").concat(response.status));

            case 8:
              _context4.next = 10;
              return _regenerator["default"].awrap(response.json());

            case 10:
              return _context4.abrupt("return", _context4.sent);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var params,
          method,
          url,
          response,
          _args5 = arguments;
      return _regenerator["default"].async(function _delete$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
              method = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 'DELETE';
              url = this.getURL(this.generalURL, params);
              _context5.next = 5;
              return _regenerator["default"].awrap(fetch(url, this.getPayload(this.signal, method)));

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
      }, null, this);
    }
  }]);
  return OpenSRPService;
}();

exports.OpenSRPService = OpenSRPService;