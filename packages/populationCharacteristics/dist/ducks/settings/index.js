"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;
exports.getLocSettings = getLocSettings;
exports.fetchLocSettings = exports.removeLocSettingAction = exports.REMOVE_LOC_SETTINGS = exports.LOC_SETTINGS_FETCHED = exports.settingsReducerName = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var settingsReducerName = 'populationCharacteristics';
exports.settingsReducerName = settingsReducerName;
var LOC_SETTINGS_FETCHED = 'settings/location/SETTINGS_FETCHED';
exports.LOC_SETTINGS_FETCHED = LOC_SETTINGS_FETCHED;
var REMOVE_LOC_SETTINGS = 'settings/location/REMOVE_SETTINGS';
exports.REMOVE_LOC_SETTINGS = REMOVE_LOC_SETTINGS;
var initialState = (0, _seamlessImmutable["default"])({
  settingsByLocId: {}
});

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case LOC_SETTINGS_FETCHED:
      var locId = action.locId;
      return (0, _seamlessImmutable["default"])(_objectSpread({}, state, {
        settingsByLocId: _objectSpread({}, state.settingsByLocId, (0, _defineProperty2["default"])({}, locId, _objectSpread({}, state.settingsByLocId[locId], {}, action.settingsByLocId[locId])))
      }));

    case REMOVE_LOC_SETTINGS:
      return (0, _seamlessImmutable["default"])(_objectSpread({}, state, {
        settingsByLocId: action.settingsByLocId
      }));

    default:
      return state;
  }
}

var removeLocSettingAction = function removeLocSettingAction() {
  return {
    settingsByLocId: {},
    type: REMOVE_LOC_SETTINGS
  };
};

exports.removeLocSettingAction = removeLocSettingAction;

var fetchLocSettings = function fetchLocSettings() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locId = arguments.length > 1 ? arguments[1] : undefined;
  return {
    settingsByLocId: (0, _defineProperty2["default"])({}, locId, (0, _lodash.keyBy)(settings.map(function (set) {
      set['editing'] = set['editing'] ? set['editing'] : false;
      return set;
    }), function (setting) {
      return setting.settingMetadataId;
    })),
    type: LOC_SETTINGS_FETCHED,
    locId: locId
  };
};

exports.fetchLocSettings = fetchLocSettings;

function getLocSettings(state, locId) {
  var allLocSettings = state[settingsReducerName].settingsByLocId[locId];
  if (!allLocSettings) return [];
  return Object.keys(allLocSettings).map(function (key) {
    return allLocSettings[key];
  });
}