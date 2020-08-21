"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInheritedFromLabel = exports.isInheritedFromValid = exports.editSetting = exports.onEditSuccess = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("../../constants");

var _locations = require("../../ducks/locations");

var _serverService = require("@opensrp/server-service");

var _utils = require("../..//helpers/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var onEditSuccess = function onEditSuccess(state, row, value, fetchSettings, activeLocationId) {
  if (row.value === value) {
    return;
  }

  if (value !== _constants.SETTINGS_INHERIT) {
    fetchSettings([_objectSpread({}, row, {
      value: value,
      inheritedFrom: ''
    })], activeLocationId);
  } else {
    var _locationDetails$node;

    var locationDetails = (0, _locations.getLocDetails)(state, row.locationId);
    var parentId = (_locationDetails$node = locationDetails.node.parentLocation) === null || _locationDetails$node === void 0 ? void 0 : _locationDetails$node.locationId;

    if (parentId) {
      fetchSettings([_objectSpread({}, row, {
        inheritedFrom: parentId
      })], activeLocationId);
    }
  }
};

exports.onEditSuccess = onEditSuccess;

var editSetting = function () {
  var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(state, row, value, v2BaseUrl, settingsEndpoint, getPayload, fetchSettings, activeLocationId, customAlert) {
    var endPoint, clientService, data, _clientService, _clientService2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(value === row.value)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            endPoint = value === _constants.SETTINGS_INHERIT || activeLocationId === row.locationId ? "".concat(settingsEndpoint).concat(row.settingMetadataId) : settingsEndpoint;

            if (!(value === _constants.SETTINGS_INHERIT)) {
              _context.next = 9;
              break;
            }

            clientService = new _serverService.OpenSRPService(v2BaseUrl, endPoint, getPayload);
            _context.next = 7;
            return clientService["delete"]().then(function () {
              onEditSuccess(state, row, value, fetchSettings, activeLocationId);
            })["catch"](function (error) {
              customAlert && customAlert(String(error), {
                type: 'error'
              });
            });

          case 7:
            _context.next = 22;
            break;

          case 9:
            data = (0, _utils.preparePutData)(row, value);

            if (!(activeLocationId !== row.locationId)) {
              _context.next = 19;
              break;
            }

            data.locationId = activeLocationId;
            delete data.uuid;
            delete data._id;
            _clientService = new _serverService.OpenSRPService(v2BaseUrl, endPoint, getPayload);
            _context.next = 17;
            return _clientService.create(data).then(function () {
              onEditSuccess(state, row, value, fetchSettings, activeLocationId);
            })["catch"](function (error) {
              customAlert && customAlert(String(error), {
                type: 'error'
              });
            });

          case 17:
            _context.next = 22;
            break;

          case 19:
            _clientService2 = new _serverService.OpenSRPService(v2BaseUrl, endPoint, getPayload);
            _context.next = 22;
            return _clientService2.update(data).then(function () {
              onEditSuccess(state, row, value, fetchSettings, activeLocationId);
            })["catch"](function (error) {
              customAlert && customAlert(String(error), {
                type: 'error'
              });
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function editSetting(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
    return _ref.apply(this, arguments);
  };
}();

exports.editSetting = editSetting;

var isInheritedFromValid = function isInheritedFromValid(state, inheritedFrom) {
  var label = (0, _locations.getLocDetails)(state, inheritedFrom).label;

  if (!label) {
    return false;
  }

  return true;
};

exports.isInheritedFromValid = isInheritedFromValid;

var getInheritedFromLabel = function getInheritedFromLabel(state, inheritedFrom) {
  if (inheritedFrom) {
    var label = (0, _locations.getLocDetails)(state, inheritedFrom).label;

    if (label) {
      inheritedFrom = label;
    }
  } else {
    inheritedFrom = '_';
  }

  return inheritedFrom;
};

exports.getInheritedFromLabel = getInheritedFromLabel;