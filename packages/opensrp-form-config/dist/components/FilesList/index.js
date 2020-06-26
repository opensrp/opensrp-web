"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectedManifestFilesList = exports.ManifestFilesList = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reduxReducerRegistry = _interopRequireDefault(require("@onaio/redux-reducer-registry"));

var _serverService = require("@opensrp/server-service");

var _SearchBar = require("../SearchBar");

var _drillDownTable = require("@onaio/drill-down-table");

var _reactRedux = require("react-redux");

var _fileDownload = require("../../helpers/fileDownload");

var _reactRouterDom = require("react-router-dom");

var _manifestFiles = _interopRequireWildcard(require("../../ducks/manifestFiles"));

var _reactstrap = require("reactstrap");

var _constants = require("../../constants");

var _utils = require("../../helpers/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_reduxReducerRegistry["default"].register(_manifestFiles.filesReducerName, _manifestFiles["default"]);

var ManifestFilesList = function ManifestFilesList(props) {
  var baseURL = props.baseURL,
      endpoint = props.endpoint,
      getPayload = props.getPayload,
      LoadingComponent = props.LoadingComponent,
      data = props.data,
      debounceTime = props.debounceTime,
      placeholder = props.placeholder,
      fetchFiles = props.fetchFiles,
      fileUploadUrl = props.fileUploadUrl,
      isJsonValidator = props.isJsonValidator,
      customAlert = props.customAlert,
      formVersion = props.formVersion,
      downloadEndPoint = props.downloadEndPoint,
      removeFiles = props.removeFiles,
      uploadTypeUrl = props.uploadTypeUrl,
      identifierLabel = props.identifierLabel,
      fileNameLabel = props.fileNameLabel,
      fileVersionLabel = props.fileVersionLabel,
      moduleLabel = props.moduleLabel,
      editLabel = props.editLabel,
      uploadEditLabel = props.uploadEditLabel,
      downloadLabel = props.downloadLabel,
      uploadFileLabel = props.uploadFileLabel,
      createdAt = props.createdAt,
      drillDownProps = props.drillDownProps;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(data),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      stateData = _useState4[0],
      setStateData = _useState4[1];

  var getManifestForms = function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
      var params, clientService;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              params = null;
              params = formVersion ? {
                identifier: formVersion
              } : {
                is_json_validator: true
              };
              removeFiles();
              clientService = new _serverService.OpenSRPService(baseURL, endpoint, getPayload);
              _context.next = 7;
              return clientService.list(params).then(function (res) {
                fetchFiles(res);
              })["catch"](function (error) {
                customAlert && customAlert(String(error), {
                  type: 'error'
                });
              })["finally"](function () {
                return setLoading(false);
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getManifestForms() {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    getManifestForms();
  }, []);
  (0, _react.useEffect)(function () {
    setStateData(data);
  }, [data]);

  var downloadFile = function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(name, params) {
      var clientService;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              clientService = new _serverService.OpenSRPService(baseURL, downloadEndPoint, getPayload);
              _context2.next = 3;
              return clientService.list(params).then(function (res) {
                (0, _fileDownload.handleDownload)(res.clientForm.json, name);
              })["catch"](function (error) {
                customAlert && customAlert(String(error), {
                  type: 'error'
                });
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function downloadFile(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var onChangeHandler = function onChangeHandler(e) {
    var input = e.target.value.toUpperCase();
    var searchResult = data.filter(function (dt) {
      return dt.label.toUpperCase().includes(input) || dt.identifier.toUpperCase().includes(input) || dt.module && dt.module.toUpperCase().includes(input);
    });
    setStateData(searchResult);
  };

  var onDownloadClick = function onDownloadClick(e, obj) {
    e.preventDefault();
    var identifier = obj.identifier;
    var params = {
      form_identifier: identifier,
      form_version: obj.version
    };

    if (isJsonValidator) {
      params['is_json_validator'] = true;
    }

    downloadFile(identifier, params);
  };

  var linkToEditFile = function linkToEditFile(obj) {
    return _react["default"].createElement(_reactRouterDom.Link, {
      to: "".concat(fileUploadUrl, "/").concat(uploadTypeUrl, "/").concat(obj.id)
    }, uploadEditLabel);
  };

  var columns = [{
    Header: identifierLabel,
    accessor: "identifier"
  }, {
    Header: fileNameLabel,
    accessor: "label"
  }, {
    Header: fileVersionLabel,
    accessor: "version",
    maxWidth: 100
  }, {
    Header: createdAt,
    accessor: 'createdAt',
    Cell: function Cell(_ref3) {
      var value = _ref3.value;
      return function () {
        return _react["default"].createElement("span", null, (0, _utils.formatDate)(value));
      }();
    },
    maxWidth: 100
  }, {
    Header: editLabel,
    accessor: function accessor(obj) {
      return linkToEditFile(obj);
    },
    disableSortBy: true,
    maxWidth: 80
  }, {
    Header: ' ',
    accessor: function accessor(obj) {
      return function () {
        return _react["default"].createElement("a", {
          href: "#",
          onClick: function onClick(e) {
            return onDownloadClick(e, obj);
          }
        }, downloadLabel);
      }();
    },
    disableSortBy: true,
    maxWidth: 80
  }];
  var moduleColumn = {
    Header: moduleLabel,
    accessor: function accessor(obj) {
      return function () {
        return _react["default"].createElement("span", null, obj.module || '_');
      }();
    },
    disableSortBy: true,
    maxWidth: 100
  };

  if (!isJsonValidator) {
    var moduleIndex = columns.length - 2;
    columns.splice(moduleIndex, 0, moduleColumn);
  }

  var DrillDownTableProps = _objectSpread({
    columns: columns,
    data: stateData,
    useDrillDown: false
  }, drillDownProps);

  var searchBarProps = {
    debounceTime: debounceTime,
    onChangeHandler: onChangeHandler,
    placeholder: placeholder
  };

  if (LoadingComponent && loading) {
    return _react["default"].createElement("div", null, LoadingComponent);
  }

  return _react["default"].createElement("div", null, _react["default"].createElement(_reactstrap.Row, null, _react["default"].createElement(_reactstrap.Col, {
    xs: "8"
  }, _react["default"].createElement(_SearchBar.SearchBar, searchBarProps)), _react["default"].createElement(_reactstrap.Col, {
    xs: "4"
  }, isJsonValidator && _react["default"].createElement(_reactRouterDom.Link, {
    className: "btn btn-secondary float-right",
    to: "".concat(fileUploadUrl, "/").concat(uploadTypeUrl)
  }, uploadFileLabel))), _react["default"].createElement(_drillDownTable.DrillDownTable, DrillDownTableProps));
};

exports.ManifestFilesList = ManifestFilesList;
var defaultProps = {
  createdAt: _constants.CREATED_AT_LABEL,
  data: [],
  debounceTime: 1000,
  downloadLabel: _constants.DOWNLOAD_LABEL,
  drillDownProps: {
    paginate: false
  },
  editLabel: _constants.EDIT_LABEL,
  fetchFiles: _manifestFiles.fetchManifestFiles,
  fileNameLabel: _constants.FILE_NAME_LABEL,
  fileVersionLabel: _constants.FILE_VERSION_LABEL,
  identifierLabel: _constants.IDENTIFIER_LABEL,
  moduleLabel: _constants.MODULE_LABEL,
  placeholder: _constants.FIND_FILES_LABEL,
  removeFiles: _manifestFiles.removeManifestFiles,
  uploadEditLabel: _constants.UPLOAD_EDIT_LABEL,
  uploadFileLabel: _constants.UPOL0AD_FILE_LABEL
};
ManifestFilesList.defaultProps = defaultProps;

var mapStateToProps = function mapStateToProps(state) {
  var data = (0, _manifestFiles.getAllManifestFilesArray)(state);
  data.sort(function (a, b) {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
  return {
    data: data
  };
};

var mapDispatchToProps = {
  fetchFiles: _manifestFiles.fetchManifestFiles,
  removeFiles: _manifestFiles.removeManifestFiles
};
var ConnectedManifestFilesList = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ManifestFilesList);
exports.ConnectedManifestFilesList = ConnectedManifestFilesList;