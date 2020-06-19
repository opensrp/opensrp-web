"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ManifestFilesList = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reduxReducerRegistry = _interopRequireDefault(require("@onaio/redux-reducer-registry"));

var _serverService = require("@opensrp/server-service");

var _searchBar = _interopRequireDefault(require("../../SearchBar/searchBar"));

var _drillDownTable = require("@onaio/drill-down-table");

var _reactRedux = require("react-redux");

var _fileDownload = require("../../helpers/fileDownload");

var _reactRouterDom = require("react-router-dom");

var _manifestFiles = _interopRequireWildcard(require("../../ducks/manifestFiles"));

var _reactstrap = require("reactstrap");

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
      growl = props.growl,
      formVersion = props.formVersion,
      downloadEndPoint = props.downloadEndPoint,
      removeFiles = props.removeFiles,
      uploadTypeUrl = props.uploadTypeUrl;

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
                growl && growl(String(error), {
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
                growl && growl(String(error), {
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
    downloadFile(identifier, params);
  };

  var linkToEditFile = function linkToEditFile(obj) {
    return _react["default"].createElement(_reactRouterDom.Link, {
      to: "".concat(fileUploadUrl, "/").concat(uploadTypeUrl, "/").concat(obj.id)
    }, "Upload Edit");
  };

  var columns = [{
    Header: 'Identifier',
    accessor: "identifier"
  }, {
    Header: 'File Name',
    accessor: "label"
  }, {
    Header: 'File Version',
    accessor: "version"
  }, {
    Header: 'Module',
    accessor: function accessor(obj) {
      return function () {
        return _react["default"].createElement("span", null, obj.module || '_');
      }();
    },
    disableSortBy: true
  }, {
    Header: 'Edit',
    accessor: function accessor(obj) {
      return linkToEditFile(obj);
    },
    disableSortBy: true
  }, {
    Header: ' ',
    accessor: function accessor(obj) {
      return function () {
        return _react["default"].createElement("a", {
          href: "#",
          onClick: function onClick(e) {
            return onDownloadClick(e, obj);
          }
        }, "Download");
      }();
    },
    disableSortBy: true
  }];

  if (isJsonValidator) {
    columns = columns.filter(function (col) {
      return col.Header !== 'Module';
    });
  }

  var DrillDownTableProps = {
    columns: columns,
    data: stateData,
    paginate: false,
    useDrillDown: false
  };
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
  }, _react["default"].createElement(_searchBar["default"], searchBarProps)), _react["default"].createElement(_reactstrap.Col, {
    xs: "4"
  }, isJsonValidator && _react["default"].createElement(_reactRouterDom.Link, {
    className: "btn btn-secondary float-right",
    to: "".concat(fileUploadUrl, "/").concat(uploadTypeUrl)
  }, "Upload New File"))), _react["default"].createElement(_drillDownTable.DrillDownTable, DrillDownTableProps));
};

exports.ManifestFilesList = ManifestFilesList;
var defaultProps = {
  data: [],
  debounceTime: 1000,
  fetchFiles: _manifestFiles.fetchManifestFiles,
  placeholder: 'Find Release Files',
  removeFiles: _manifestFiles.removeManifestFiles
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
var _default = ConnectedManifestFilesList;
exports["default"] = _default;