"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocationMenu = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LocationMenu = function LocationMenu(props) {
  var locationDetails = props.locationDetails,
      activeLocationId = props.activeLocationId,
      showLocPopUp = props.showLocPopUp,
      popLocPopup = props.popLocPopup,
      loadLocsettings = props.loadLocsettings,
      isLast = props.isLast;

  var locDetails = _objectSpread({}, locationDetails);

  var isActiveLocId = activeLocationId === locDetails.id;
  var children = locDetails.children || {};
  var childrenKeys = Object.keys(children);
  return _react["default"].createElement("div", {
    className: "locations-menu",
    key: locDetails.id
  }, _react["default"].createElement("a", {
    className: "locations ".concat(isActiveLocId ? 'active-loc' : ''),
    onClick: function onClick(e) {
      return popLocPopup(e, locDetails.id);
    }
  }, _react["default"].createElement("span", null, locDetails.label), childrenKeys.length ? _react["default"].createElement("span", {
    className: "drop-down"
  }) : null, isLast ? null : '/'), childrenKeys.length ? _react["default"].createElement("div", {
    className: "popup"
  }, _react["default"].createElement("div", {
    className: "popuptext loc-popup ".concat(showLocPopUp === locDetails.id ? 'show' : '')
  }, childrenKeys.map(function (key) {
    return _react["default"].createElement("div", {
      key: children[key].id,
      onClick: function onClick(e) {
        return loadLocsettings(e, children[key].id);
      }
    }, children[key].label);
  }))) : null);
};

exports.LocationMenu = LocationMenu;