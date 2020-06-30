"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getAllManifestDraftFilesArray = exports.getManifestDraftFilesById = exports.getAllManifestDraftFilesById = exports.removeManifestDraftFiles = exports.fetchManifestDraftFiles = exports.draftReducerName = void 0;

var _reducerFactory = require("@opensrp/reducer-factory");

var draftReducerName = 'manifestDraftFiles';
exports.draftReducerName = draftReducerName;
var draftReducer = (0, _reducerFactory.reducerFactory)(draftReducerName);
var fetchManifestDraftFiles = (0, _reducerFactory.fetchActionCreatorFactory)(draftReducerName, 'id');
exports.fetchManifestDraftFiles = fetchManifestDraftFiles;
var removeManifestDraftFiles = (0, _reducerFactory.removeActionCreatorFactory)(draftReducerName);
exports.removeManifestDraftFiles = removeManifestDraftFiles;
var getAllManifestDraftFilesById = (0, _reducerFactory.getItemsByIdFactory)(draftReducerName);
exports.getAllManifestDraftFilesById = getAllManifestDraftFilesById;
var getManifestDraftFilesById = (0, _reducerFactory.getItemByIdFactory)(draftReducerName);
exports.getManifestDraftFilesById = getManifestDraftFilesById;
var getAllManifestDraftFilesArray = (0, _reducerFactory.getItemsArrayFactory)(draftReducerName);
exports.getAllManifestDraftFilesArray = getAllManifestDraftFilesArray;
var _default = draftReducer;
exports["default"] = _default;