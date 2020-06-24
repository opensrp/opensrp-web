"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSRPServiceExtend = exports.getToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _serverService = require("@opensrp/server-service");

var getToken = function getToken(getPayload) {
  var _getPayload = getPayload(new AbortController().signal, 'POST'),
      headers = _getPayload.headers;

  return headers.authorization || headers.Authorization;
};

exports.getToken = getToken;

var OpenSRPServiceExtend = function (_OpenSRPService) {
  (0, _inherits2["default"])(OpenSRPServiceExtend, _OpenSRPService);

  function OpenSRPServiceExtend(baseURL, endpoint) {
    var _this;

    var getPayload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _serverService.getFetchOptions;
    (0, _classCallCheck2["default"])(this, OpenSRPServiceExtend);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(OpenSRPServiceExtend).call(this, baseURL, endpoint, getPayload));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "token", void 0);
    _this.token = getToken(getPayload);
    return _this;
  }

  (0, _createClass2["default"])(OpenSRPServiceExtend, [{
    key: "postData",
    value: function () {
      var _postData = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(data) {
        var params,
            url,
            response,
            defaultMessage,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                url = _serverService.OpenSRPService.getURL("".concat(this.generalURL), params);
                _context.next = 4;
                return fetch(url, {
                  body: data,
                  headers: {
                    Authorization: this.token
                  },
                  method: 'POST'
                });

              case 4:
                response = _context.sent;

                if (!response) {
                  _context.next = 11;
                  break;
                }

                if (!(response.ok || response.status === 201)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {});

              case 8:
                defaultMessage = "OpenSRPService create on ".concat(this.endpoint, " failed, HTTP status ").concat(response === null || response === void 0 ? void 0 : response.status);
                _context.next = 11;
                return (0, _serverService.throwHTTPError)(response, defaultMessage);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postData(_x) {
        return _postData.apply(this, arguments);
      }

      return postData;
    }()
  }]);
  return OpenSRPServiceExtend;
}(_serverService.OpenSRPService);

exports.OpenSRPServiceExtend = OpenSRPServiceExtend;