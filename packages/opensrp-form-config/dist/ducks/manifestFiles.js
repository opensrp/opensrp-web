"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getAllManifestFilesArray = exports.getManifestFilesById = exports.getAllManifestFilesById = exports.removeManifestFiles = exports.fetchManifestFiles = exports.filesReducerName = void 0;

var _reducerFactory = require("@opensrp/reducer-factory");

var filesReducerName = 'manifestFiles';
exports.filesReducerName = filesReducerName;
var reducer = (0, _reducerFactory.reducerFactory)(filesReducerName);
var fetchManifestFiles = (0, _reducerFactory.fetchActionCreatorFactory)(filesReducerName, 'id');
exports.fetchManifestFiles = fetchManifestFiles;
var removeManifestFiles = (0, _reducerFactory.removeActionCreatorFactory)(filesReducerName);
exports.removeManifestFiles = removeManifestFiles;
var getAllManifestFilesById = (0, _reducerFactory.getItemsByIdFactory)(filesReducerName);
exports.getAllManifestFilesById = getAllManifestFilesById;
var getManifestFilesById = (0, _reducerFactory.getItemByIdFactory)(filesReducerName);
exports.getManifestFilesById = getManifestFilesById;
var getAllManifestFilesArray = (0, _reducerFactory.getItemsArrayFactory)(filesReducerName);
exports.getAllManifestFilesArray = getAllManifestFilesArray;
var _default = reducer;
exports["default"] = _default;