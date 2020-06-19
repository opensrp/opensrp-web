"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ManifestReleases = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reduxReducerRegistry = _interopRequireDefault(require("@onaio/redux-reducer-registry"));

var _serverService = require("@opensrp/server-service");

var _drillDownTable = require("@onaio/drill-down-table");

var _reactRedux = require("react-redux");

var _manifestReleases = _interopRequireWildcard(require("../../ducks/manifestReleases"));

var _searchBar = _interopRequireDefault(require("../../SearchBar/searchBar"));

var _reactRouterDom = require("react-router-dom");

var _reactstrap = require("reactstrap");

_reduxReducerRegistry["default"].register(_manifestReleases.reducerName, _manifestReleases["default"]);

var ManifestReleases = function ManifestReleases(props) {
  var baseURL = props.baseURL,
      endpoint = props.endpoint,
      getPayload = props.getPayload,
      fetchReleases = props.fetchReleases,
      data = props.data,
      LoadingComponent = props.LoadingComponent,
      debounceTime = props.debounceTime,
      placeholder = props.placeholder,
      currentUrl = props.currentUrl,
      formUploadUrl = props.formUploadUrl,
      growl = props.growl,
      uploadTypeUrl = props.uploadTypeUrl;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(data),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      stateData = _useState4[0],
      setStateData = _useState4[1];

  var getManifests = function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
      var clientService;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(data.length < 1);
              clientService = new _serverService.OpenSRPService(baseURL, endpoint, getPayload);
              _context.next = 4;
              return clientService.list().then(function (res) {
                return fetchReleases(res);
              })["catch"](function (error) {
                growl && growl(String(error), {
                  type: 'error'
                });
              })["finally"](function () {
                return setLoading(false);
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getManifests() {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    getManifests();
  }, []);
  (0, _react.useEffect)(function () {
    setStateData(data);
  }, [data]);

  var linkToFiles = function linkToFiles(obj) {
    return _react["default"].createElement(_reactRouterDom.Link, {
      to: "".concat(currentUrl, "/").concat(obj.identifier)
    }, "View Files");
  };

  var columns = [{
    Header: 'Identifier',
    accessor: function accessor(obj) {
      return "V".concat(obj.identifier);
    }
  }, {
    Header: 'APP Id',
    accessor: 'appId'
  }, {
    Header: 'App Version',
    accessor: function accessor(obj) {
      return "V".concat(obj.appVersion);
    }
  }, {
    Header: ' ',
    accessor: function accessor(obj) {
      return linkToFiles(obj);
    },
    disableSortBy: true
  }];
  var DrillDownTableProps = {
    columns: columns,
    data: stateData,
    paginate: false,
    useDrillDown: false
  };

  var onChangeHandler = function onChangeHandler(e) {
    var input = e.target.value.toUpperCase();
    var searchResult = data.filter(function (dt) {
      return dt.appId.toUpperCase().includes(input) || dt.appVersion.toUpperCase().includes(input) || dt.identifier.toUpperCase().includes(input);
    });
    setStateData(searchResult);
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
  }, _react["default"].createElement(_reactRouterDom.Link, {
    className: "btn btn-secondary float-right",
    to: "".concat(formUploadUrl, "/").concat(uploadTypeUrl)
  }, "Upload New File"))), _react["default"].createElement(_drillDownTable.DrillDownTable, DrillDownTableProps));
};

exports.ManifestReleases = ManifestReleases;
var defaultProps = {
  data: [],
  debounceTime: 1000,
  fetchReleases: _manifestReleases.fetchManifestReleases,
  formUploadUrl: '',
  placeholder: 'Find Release'
};
ManifestReleases.defaultProps = defaultProps;

var mapStateToProps = function mapStateToProps(state) {
  var data = (0, _manifestReleases.getAllManifestReleasesArray)(state);
  data.sort(function (a, b) {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
  return {
    data: data
  };
};

var mapDispatchToProps = {
  fetchReleases: _manifestReleases.fetchManifestReleases
};
var ConnectedManifestReleases = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ManifestReleases);
var _default = ConnectedManifestReleases;
exports["default"] = _default;