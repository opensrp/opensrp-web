"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ManifestDraftFiles = void 0;

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

var _manifestDraftFiles = _interopRequireWildcard(require("../../ducks/manifestDraftFiles"));

var _reactstrap = require("reactstrap");

var _reactRouter = require("react-router");

_reduxReducerRegistry["default"].register(_manifestDraftFiles.reducerName, _manifestDraftFiles["default"]);

var ManifestDraftFiles = function ManifestDraftFiles(props) {
  var baseURL = props.baseURL,
      endpoint = props.endpoint,
      getPayload = props.getPayload,
      LoadingComponent = props.LoadingComponent,
      data = props.data,
      debounceTime = props.debounceTime,
      placeholder = props.placeholder,
      fetchDraftFiles = props.fetchDraftFiles,
      clearDraftFiles = props.clearDraftFiles,
      growl = props.growl,
      downloadEndPoint = props.downloadEndPoint,
      releasesUrl = props.releasesUrl,
      manifestEndPoint = props.manifestEndPoint;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(data),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      stateData = _useState4[0],
      setStateData = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      ifDoneHere = _useState6[0],
      setIfDoneHere = _useState6[1];

  var getManifestForms = function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
      var params, clientService;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(data.length < 1);
              params = {
                is_draft: true
              };
              clientService = new _serverService.OpenSRPService(baseURL, endpoint, getPayload);
              _context.next = 5;
              return clientService.list(params).then(function (res) {
                fetchDraftFiles(res);
              })["catch"](function (error) {
                growl && growl(String(error), {
                  type: 'error'
                });
              })["finally"](function () {
                return setLoading(false);
              });

            case 5:
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

  var onMakeReleaseClick = function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(e) {
      var _getPayload, headers, identifiers, json, postdata, response, defaultMessage;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();
              _getPayload = getPayload(new AbortController().signal, 'POST'), headers = _getPayload.headers;
              identifiers = data.map(function (form) {
                return form.identifier;
              });
              json = {
                forms_version: data[0].version,
                identifiers: identifiers
              };
              postdata = JSON.stringify({
                json: JSON.stringify(json)
              });
              _context2.next = 7;
              return fetch("".concat(baseURL).concat(manifestEndPoint), {
                body: postdata,
                headers: {
                  Authorization: headers.authorization || headers.Authorization,
                  'Content-Type': 'application/json'
                },
                method: 'POST'
              });

            case 7:
              response = _context2.sent;

              if (!response) {
                _context2.next = 15;
                break;
              }

              if (!(response.status == 201 || response.ok)) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", setIfDoneHere(true));

            case 13:
              defaultMessage = "OpenSRPService create on ".concat(manifestEndPoint, " failed, HTTP status ").concat(response === null || response === void 0 ? void 0 : response.status);
              growl && growl(defaultMessage, {
                type: 'error'
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function onMakeReleaseClick(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var downloadFile = function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(name, params) {
      var clientService;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              clientService = new _serverService.OpenSRPService(baseURL, downloadEndPoint, getPayload);
              _context3.next = 3;
              return clientService.list(params).then(function (res) {
                (0, _fileDownload.handleDownload)(res.clientForm.json, name);
              })["catch"](function (error) {
                growl && growl(String(error), {
                  type: 'error'
                });
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function downloadFile(_x2, _x3) {
      return _ref3.apply(this, arguments);
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

  var onDeleteClick = function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(e) {
      var clientService;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              e.preventDefault();
              setLoading(true);
              clientService = new _serverService.OpenSRPService(baseURL, endpoint, getPayload);
              _context4.next = 5;
              return clientService["delete"]().then(function () {
                clearDraftFiles();
              })["catch"](function (error) {
                growl && growl(String(error), {
                  type: 'error'
                });
              })["finally"](function () {
                return setLoading(false);
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function onDeleteClick(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deleteColumn = {
    Header: ' delete ',
    accessor: function accessor(_) {
      return function () {
        return _react["default"].createElement(_reactstrap.Button, {
          color: "link",
          className: "cancel-icon",
          href: "#",
          onClick: function onClick(e) {
            return onDeleteClick(e);
          }
        }, _react["default"].createElement("span", {
          style: {
            margin: '3px'
          }
        }, "X"));
      }();
    },
    disableSortBy: true
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

  if (ifDoneHere) {
    return _react["default"].createElement(_reactRouter.Redirect, {
      to: releasesUrl
    });
  }

  return _react["default"].createElement("div", null, _react["default"].createElement(_searchBar["default"], searchBarProps), _react["default"].createElement(_drillDownTable.DrillDownTable, DrillDownTableProps), data.length > 0 && _react["default"].createElement(_reactstrap.Button, {
    className: "btn btn-md btn btn-primary float-right",
    color: "primary",
    onClick: onMakeReleaseClick
  }, "Make Release"));
};

exports.ManifestDraftFiles = ManifestDraftFiles;
var defaultProps = {
  clearDraftFiles: _manifestDraftFiles.fetchManifestDraftFiles,
  data: [],
  debounceTime: 1000,
  fetchDraftFiles: _manifestDraftFiles.fetchManifestDraftFiles,
  placeholder: 'Find Draft Files'
};
ManifestDraftFiles.defaultProps = defaultProps;

var mapStateToProps = function mapStateToProps(state) {
  var data = (0, _manifestDraftFiles.getAllManifestDraftFilesArray)(state);
  data.sort(function (a, b) {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
  return {
    data: data
  };
};

var mapDispatchToProps = {
  clearDraftFiles: _manifestDraftFiles.fetchManifestDraftFiles,
  fetchDraftFiles: _manifestDraftFiles.fetchManifestDraftFiles
};
var ConnectedManifestDraftFiles = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ManifestDraftFiles);
var _default = ConnectedManifestDraftFiles;
exports["default"] = _default;