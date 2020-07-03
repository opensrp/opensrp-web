"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;
exports.getLocChildren = getLocChildren;
exports.getActiveLocId = getActiveLocId;
exports.getDefaultLocId = getDefaultLocId;
exports.getSelectedLocs = getSelectedLocs;
exports.getLocDetails = getLocDetails;
exports.fetchLocs = exports.removeLocAction = exports.REMOVE_LOC = exports.LOC_FETCHED = exports.locationReducerName = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _seamlessImmutable = _interopRequireDefault(require("seamless-immutable"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var locationReducerName = 'locHierarchy';
exports.locationReducerName = locationReducerName;
var LOC_FETCHED = 'location/LOC_FETCHED';
exports.LOC_FETCHED = LOC_FETCHED;
var REMOVE_LOC = 'location/REMOVE_LOC';
exports.REMOVE_LOC = REMOVE_LOC;
var initialState = (0, _seamlessImmutable["default"])({
  locations: {
    map: {},
    parentChildren: {},
    activeLocId: null
  }
});

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case LOC_FETCHED:
      return (0, _seamlessImmutable["default"])(_objectSpread({}, state, {
        locations: _objectSpread({}, state.locations, {}, action.locations, {
          map: _objectSpread({}, state.locations.map, {}, action.locations.map),
          parentChildren: _objectSpread({}, state.locations.parentChildren, {}, action.locations.parentChildren)
        })
      }));

    case REMOVE_LOC:
      return (0, _seamlessImmutable["default"])(_objectSpread({}, state, {
        locations: action.locations
      }));

    default:
      return state;
  }
}

var removeLocAction = function removeLocAction() {
  return {
    locations: {
      map: {},
      parentChildren: {}
    },
    type: REMOVE_LOC
  };
};

exports.removeLocAction = removeLocAction;

var fetchLocs = function fetchLocs(locs) {
  var map = locs.locationsHierarchy.map;
  var parentChildren = locs.locationsHierarchy.parentChildren;
  var defaultLoc = map && Object.keys(map)[0];
  var activeLocId = locs.locationsHierarchy.activeLocId || defaultLoc;
  var defaultLocId = locs.locationsHierarchy.defaultLocId || defaultLoc;
  var selectedLocs = locs.locationsHierarchy.selectedLocs;

  if (!selectedLocs) {
    selectedLocs = activeLocId ? [activeLocId] : [];
  }

  return {
    locations: {
      map: map,
      parentChildren: parentChildren,
      activeLocId: activeLocId,
      selectedLocs: selectedLocs,
      defaultLocId: defaultLocId
    },
    type: LOC_FETCHED
  };
};

exports.fetchLocs = fetchLocs;

function getLocChildren(state, locId) {
  return state[locationReducerName].locations.parentChildren[locId] || [];
}

function getActiveLocId(state) {
  return state[locationReducerName].locations.activeLocId || null;
}

function getDefaultLocId(state) {
  return state[locationReducerName].locations.defaultLocId || null;
}

function getSelectedLocs(state) {
  return state[locationReducerName].locations.selectedLocs || [];
}

function getLocDetails(state, locIds) {
  var locDetails = state[locationReducerName].locations.map[locIds[0]];

  if (locIds.length === 1) {
    return locDetails || {};
  } else {
    for (var i = 1; i < locIds.length; i++) {
      locDetails = locDetails.children[locIds[i]];
    }
  }

  return locDetails;
}