"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditSettingsButton = exports.ClickOutside = exports.labels = exports.preparePutData = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var preparePutData = function preparePutData(data, value) {
  var description = data.description,
      key = data.key,
      label = data.label,
      locationId = data.locationId,
      providerId = data.providerId,
      uuid = data.uuid,
      identifier = data.settingIdentifier,
      _id = data.settingMetadataId,
      team = data.team,
      teamId = data.teamId,
      type = data.type,
      documentId = data.documentId;
  var postData = {
    _id: _id,
    description: description,
    identifier: identifier,
    key: key,
    label: label,
    locationId: locationId,
    uuid: uuid,
    settingsId: documentId,
    type: type,
    value: value
  };
  if (team) postData = _objectSpread({}, postData, {
    team: team
  });
  if (teamId) postData = _objectSpread({}, postData, {
    teamId: teamId
  });
  if (providerId) postData = _objectSpread({}, postData, {
    providerId: providerId
  });
  return postData;
};

exports.preparePutData = preparePutData;
var labels = {
  actionLabel: _constants.ACTION_LABEL,
  descriptionLabel: _constants.DESCRIPTION_LABEL,
  editLabel: _constants.EDIT_LABEL,
  inheritedLable: _constants.INHERITED_FROM_LABEL,
  inheritSettingsLabel: _constants.INHERIT_SETTING_LABEL,
  nameLabel: _constants.NAME_LABEL,
  noDataFound: _constants.NO_DATA_FOUND,
  pageTitle: _constants.PAGE_TITLE_LABEL,
  placeholder: _constants.SEARCH_SETTINGS_LABEL,
  settingLabel: _constants.SETTINGS_LABEL,
  setToNoLabel: _constants.SET_TO_NO_LABEL,
  setToYesLabel: _constants.SET_TO_YES_LABEL,
  toolTipInheritedFrom: _constants.TOOLTIP_INHERITED_FROM
};
exports.labels = labels;

var ClickOutside = function ClickOutside(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick;
  var ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClick(e);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClick]);
  return _react["default"].createElement(_react["default"].Fragment, null, (0, _react.cloneElement)(children, {
    ref: ref
  }));
};

exports.ClickOutside = ClickOutside;

var EditSettingsButton = function EditSettingsButton(props) {
  var _row$inheritedFrom;

  var editLabel = props.editLabel,
      inheritSettingsLabel = props.inheritSettingsLabel,
      value = props.value,
      setToYesLabel = props.setToYesLabel,
      setToNoLabel = props.setToNoLabel,
      row = props.row,
      openEditModal = props.openEditModal,
      changeSetting = props.changeSetting,
      showInheritSettingsLabel = props.showInheritSettingsLabel;

  var onClickOutSide = _react["default"].useCallback(function (e) {
    if (row.editing) {
      openEditModal(e, row);
    }
  }, [row.editing]);

  return _react["default"].createElement("div", {
    className: "popup",
    key: row.key
  }, _react["default"].createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return openEditModal(e, row);
    }
  }, editLabel), _react["default"].createElement(ClickOutside, {
    onClick: onClickOutSide
  }, _react["default"].createElement("div", {
    className: "popuptext ".concat(row.editing ? 'show' : '')
  }, _react["default"].createElement("div", {
    onClick: function onClick(e) {
      return changeSetting(e, row, _constants.SETTINGS_TRUE);
    }
  }, _react["default"].createElement("span", {
    className: value && !row.inheritedFrom ? 'check' : 'empty-check'
  }), _react["default"].createElement("span", null, setToYesLabel)), _react["default"].createElement("div", {
    onClick: function onClick(e) {
      return changeSetting(e, row, _constants.SETTINGS_FALSE);
    }
  }, _react["default"].createElement("span", {
    className: value || row.inheritedFrom ? 'empty-check' : 'check'
  }), _react["default"].createElement("span", null, setToNoLabel)), showInheritSettingsLabel && _react["default"].createElement("div", {
    onClick: function onClick(e) {
      return changeSetting(e, row, _constants.SETTINGS_INHERIT);
    },
    className: "inherit-from"
  }, _react["default"].createElement("span", {
    className: ((_row$inheritedFrom = row.inheritedFrom) === null || _row$inheritedFrom === void 0 ? void 0 : _row$inheritedFrom.trim()) ? 'check' : 'empty-check'
  }), _react["default"].createElement("span", null, inheritSettingsLabel)))));
};

exports.EditSettingsButton = EditSettingsButton;