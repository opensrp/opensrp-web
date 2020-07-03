"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditSettingsButton = exports.labels = exports.preparePutData = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

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
  setToYesLabel: _constants.SET_TO_YES_LABEL
};
exports.labels = labels;

var EditSettingsButton = function EditSettingsButton(props) {
  var _row$inheritedFrom;

  var editLabel = props.editLabel,
      inheritSettingsLabel = props.inheritSettingsLabel,
      value = props.value,
      setToYesLabel = props.setToYesLabel,
      setToNoLabel = props.setToNoLabel,
      row = props.row,
      openEditModal = props.openEditModal,
      changeSetting = props.changeSetting;
  return _react["default"].createElement("div", {
    className: "popup",
    key: row.key
  }, _react["default"].createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return openEditModal(e, row);
    }
  }, editLabel), _react["default"].createElement("div", {
    className: "popuptext ".concat(row.editing ? 'show' : '')
  }, _react["default"].createElement("div", {
    onClick: function onClick(e) {
      return changeSetting(e, row, 'true');
    }
  }, _react["default"].createElement("span", {
    className: value ? 'check' : 'empty-check'
  }), _react["default"].createElement("span", null, setToYesLabel)), _react["default"].createElement("div", {
    onClick: function onClick(e) {
      return changeSetting(e, row, 'false');
    }
  }, _react["default"].createElement("span", {
    className: value ? 'empty-check' : 'check'
  }), _react["default"].createElement("span", null, setToNoLabel)), _react["default"].createElement("div", {
    className: "inherit-from"
  }, _react["default"].createElement("span", {
    className: ((_row$inheritedFrom = row.inheritedFrom) === null || _row$inheritedFrom === void 0 ? void 0 : _row$inheritedFrom.trim()) ? 'check' : 'empty-check'
  }), inheritSettingsLabel)));
};

exports.EditSettingsButton = EditSettingsButton;