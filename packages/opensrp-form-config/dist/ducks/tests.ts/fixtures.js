"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadFile = exports.FixManifestDraftFiles = exports.fixManifestFiles = exports.fixManifestReleases = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fixManifestReleases = [{
  identifier: '1.0.11',
  json: '{"forms_version":"1.0.11","identifiers":["blood_screening.json"}',
  appId: 'org.smartregister.reveal',
  appVersion: '1.2.14',
  createdAt: '2020-06-08T15:00:38.413+02:00',
  updatedAt: '2020-06-08T15:00:38.413+02:00'
}, {
  identifier: '1.0.12',
  json: '{"forms_version":"1.0.12","identifiers":["blood_screening.json"}',
  appId: 'org.smartregister.reveal',
  appVersion: '1.2.14',
  createdAt: '2020-06-08T15:03:00.950+02:00',
  updatedAt: '2020-06-08T15:03:00.950+02:00'
}, {
  identifier: '1.0.16',
  json: '{"forms_version":"1.0.16","identifiers":["blood_screening.json"}',
  appId: 'org.smartregister.reveal',
  appVersion: '1.2.16',
  createdAt: '2020-06-09T14:40:04.189+02:00',
  updatedAt: '2020-06-09T14:40:04.189+02:00'
}];
exports.fixManifestReleases = fixManifestReleases;
var fixManifestFiles = [{
  createdAt: 'Jun 19, 2020, 12:31:37 PM',
  form_relation: '',
  id: '52',
  identifier: 'test-form-1.json',
  isDraft: false,
  isJsonValidator: false,
  jursdiction: '',
  label: 'test form',
  module: '',
  version: '1.0.26'
}, {
  createdAt: 'Jun 19, 2020, 4:23:22 PM',
  form_relation: '',
  id: '53',
  identifier: 'reveal-test-file.json',
  isDraft: false,
  isJsonValidator: false,
  jursdiction: '',
  label: 'test publish',
  module: '',
  version: '1.0.27'
}];
exports.fixManifestFiles = fixManifestFiles;
var FixManifestDraftFiles = [_objectSpread({}, fixManifestFiles[0], {
  isDraft: false
}), _objectSpread({}, fixManifestFiles[1], {
  isDraft: false
})];
exports.FixManifestDraftFiles = FixManifestDraftFiles;
var downloadFile = {
  clientForm: {
    json: JSON.stringify(fixManifestFiles[0])
  }
};
exports.downloadFile = downloadFile;