"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectedEditSetings = exports.EditSetings = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _listView = _interopRequireDefault(require("@onaio/list-view"));

var _serverService = require("@opensrp/server-service");

var _react = _interopRequireWildcard(require("react"));

var _settings = require("../../ducks/settings");

var _reactRedux = require("react-redux");

var _locations = require("../../ducks/locations");

var _LocationsMenu = require("../LocationsMenu");

var _SearchForm = require("../SearchForm");

var _utils = require("../../helpers/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var EditSetings = function EditSetings(props) {
  var labels = props.labels,
      locationSettings = props.locationSettings,
      fetchSettings = props.fetchSettings,
      fetchLocations = props.fetchLocations,
      activeLocationId = props.activeLocationId,
      selectedLocations = props.selectedLocations,
      locationDetails = props.locationDetails,
      defaultLocId = props.defaultLocId,
      state = props.state,
      currentLocName = props.currentLocName,
      LoadingComponent = props.LoadingComponent,
      baseURL = props.baseURL,
      restBaseURL = props.restBaseURL,
      getPayload = props.getPayload,
      locationsEndpoint = props.locationsEndpoint,
      secAuthEndpoint = props.secAuthEndpoint,
      settingsEndpoint = props.settingsEndpoint,
      customAlert = props.customAlert,
      debounceTime = props.debounceTime,
      v2BaseUrl = props.v2BaseUrl;
  var pageTitle = labels.pageTitle,
      placeholder = labels.placeholder,
      descriptionLabel = labels.descriptionLabel,
      nameLabel = labels.nameLabel,
      settingLabel = labels.settingLabel,
      inheritedLable = labels.inheritedLable,
      editLabel = labels.editLabel,
      inheritSettingsLabel = labels.inheritSettingsLabel,
      setToNoLabel = labels.setToNoLabel,
      setToYesLabel = labels.setToYesLabel,
      noDataFound = labels.noDataFound;

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      showLocPopUp = _useState2[0],
      setShowLocPopup = _useState2[1];

  var _useState3 = (0, _react.useState)(locationSettings),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      locSettings = _useState4[0],
      setLocSettings = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var getLocationSettings = function getLocationSettings(currentLocId) {
    setLoading(true);
    var params = {
      locationId: currentLocId
    };
    var clientService = new _serverService.OpenSRPService(v2BaseUrl, settingsEndpoint, getPayload);
    return clientService.list(params);
  };

  var getLocations = function getLocations(currentLocId) {
    setLoading(true);
    var clientService = new _serverService.OpenSRPService(baseURL, locationsEndpoint, getPayload);
    return clientService.read(currentLocId);
  };

  var getUserLocHierarchy = function getUserLocHierarchy() {
    setLoading(true);
    var clientService = new _serverService.OpenSRPService(baseURL, secAuthEndpoint, getPayload);
    return clientService.list();
  };

  var getLocsandSettings = function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
      var userLocs, userLocMap, userLocId, hierarchy, map, locId, settings;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return getUserLocHierarchy();

            case 3:
              userLocs = _context.sent;
              userLocMap = userLocs.locations.locationsHierarchy.map;
              userLocId = Object.keys(userLocMap)[0];
              _context.next = 8;
              return getLocations(userLocId);

            case 8:
              hierarchy = _context.sent;
              map = hierarchy.locationsHierarchy.map;
              locId = Object.keys(map)[0];
              _context.next = 13;
              return getLocationSettings(locId);

            case 13:
              settings = _context.sent;
              fetchLocations(hierarchy);
              fetchSettings(settings, locId);
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              customAlert && customAlert(String(_context.t0), {
                type: 'error'
              });

            case 21:
              _context.prev = 21;
              setLoading(false);
              return _context.finish(21);

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 18, 21, 24]]);
    }));

    return function getLocsandSettings() {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    if (!defaultLocId) {
      getLocsandSettings();
    }
  }, []);
  (0, _react.useEffect)(function () {
    setLocSettings(props.locationSettings);
  }, [props.locationSettings]);

  var handleSearchInput = function handleSearchInput(e) {
    e.preventDefault();
    var input = e.target.value;
    input = input.replace(/\s+/g, ' ').trimStart();

    if (!input) {
      setLocSettings(locationSettings);
      return false;
    }

    if (locationSettings.length) {
      input = input.toUpperCase();
      var results = locationSettings.filter(function (seting) {
        return seting.label.toUpperCase().includes(input);
      });
      setLocSettings(results);
      return true;
    }
  };

  var openEditModal = function openEditModal(e, row) {
    e.preventDefault();
    var activeLoc = activeLocationId;
    fetchSettings([_objectSpread({}, row, {
      editing: !row.editing
    })], activeLoc);
  };

  var changeSetting = function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(e, row, value) {
      var activeLoc, data, clientService;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();

              if (!(value === row.value)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", false);

            case 3:
              activeLoc = activeLocationId;
              data = (0, _utils.preparePutData)(row, value);
              clientService = new _serverService.OpenSRPService(restBaseURL, settingsEndpoint, getPayload);
              _context2.next = 8;
              return clientService.update(data).then(function () {
                fetchSettings([_objectSpread({}, row, {
                  value: value
                })], activeLoc);
              })["catch"](function (error) {
                customAlert && customAlert(String(error), {
                  type: 'error'
                });
              })["finally"](function () {
                return setLoading(false);
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function changeSetting(_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var popLocPopup = function popLocPopup(e, id) {
    e.preventDefault();
    var isClossing = showLocPopUp === id;

    if (isClossing) {
      setShowLocPopup('');
    } else {
      setShowLocPopup(id);
    }

    var lastSelectedloc = (0, _toConsumableArray2["default"])(selectedLocations).pop();

    if (lastSelectedloc !== id && selectedLocations.includes(id) && !isClossing) {
      var index = selectedLocations.indexOf(id);
      var selectedLocs = (0, _toConsumableArray2["default"])(selectedLocations);
      selectedLocs = selectedLocs.slice(0, index + 1);
      var data = {
        locationsHierarchy: {
          map: {},
          parentChildren: {},
          activeLocId: id,
          selectedLocs: selectedLocs,
          defaultLocId: defaultLocId
        }
      };
      fetchLocations(data);
    }
  };

  var loadLocsettings = function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(e, activeLocId) {
      var selectedLocs, locSettings, data;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              e.preventDefault();
              selectedLocs = [].concat((0, _toConsumableArray2["default"])(selectedLocations), [activeLocId]);
              locSettings = (0, _settings.getLocSettings)(state, activeLocId);

              if (locSettings.length) {
                _context3.next = 6;
                break;
              }

              _context3.next = 6;
              return getLocationSettings(activeLocId).then(function (res) {
                return fetchSettings(res, activeLocId);
              })["catch"](function (error) {
                return customAlert && customAlert(String(error), {
                  type: 'error'
                });
              })["finally"](function () {
                return setLoading(false);
              });

            case 6:
              data = {
                locationsHierarchy: {
                  map: {},
                  parentChildren: {},
                  activeLocId: activeLocId,
                  selectedLocs: selectedLocs,
                  defaultLocId: defaultLocId
                }
              };
              fetchLocations(data);
              setShowLocPopup('');

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function loadLocsettings(_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }();

  var locationMenu = [];

  if (selectedLocations.length && Object.keys(locationDetails).length) {
    var locDetails = _objectSpread({}, locationDetails);

    var isLast = selectedLocations.length === 1;
    var LocMenuProps = {
      locationDetails: locDetails,
      activeLocationId: activeLocationId,
      showLocPopUp: showLocPopUp,
      popLocPopup: popLocPopup,
      loadLocsettings: loadLocsettings,
      isLast: isLast
    };
    locationMenu.push(_react["default"].createElement(_LocationsMenu.LocationMenu, (0, _extends2["default"])({
      key: locDetails.id
    }, LocMenuProps)));

    for (var i = 1; i < selectedLocations.length; i++) {
      if (locDetails.children) {
        isLast = i === selectedLocations.length - 1;
        locDetails = locDetails.children[selectedLocations[i]];
        LocMenuProps = _objectSpread({}, LocMenuProps, {
          locationDetails: locDetails,
          isLast: isLast
        });
        locationMenu.push(_react["default"].createElement(_LocationsMenu.LocationMenu, (0, _extends2["default"])({
          key: locDetails.id
        }, LocMenuProps)));
      }
    }
  }

  var listViewProps = {
    data: locSettings.map(function (row) {
      var _row$inheritedFrom;

      var value = typeof row.value === 'string' ? row.value === 'true' : row.value;
      return [row.label, row.description, _react["default"].createElement("p", {
        key: row.key
      }, value ? 'Yes' : 'No'), ((_row$inheritedFrom = row.inheritedFrom) === null || _row$inheritedFrom === void 0 ? void 0 : _row$inheritedFrom.trim()) || '_', _react["default"].createElement(_utils.EditSettingsButton, {
        key: row.documentId,
        changeSetting: changeSetting,
        editLabel: editLabel,
        inheritSettingsLabel: inheritSettingsLabel,
        openEditModal: openEditModal,
        row: row,
        setToNoLabel: setToNoLabel,
        setToYesLabel: setToYesLabel,
        value: value
      })];
    }),
    headerItems: [nameLabel, descriptionLabel, settingLabel, inheritedLable, editLabel],
    tableClass: 'table table-striped'
  };
  var searchProps = {
    debounceTime: debounceTime,
    onChangeHandler: handleSearchInput,
    placeholder: placeholder
  };

  if (LoadingComponent && loading) {
    return _react["default"].createElement("div", null, LoadingComponent);
  }

  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    className: "title"
  }, _react["default"].createElement("h4", null, pageTitle, " ", currentLocName && _react["default"].createElement("span", null, "(", currentLocName, ")")), _react["default"].createElement(_SearchForm.SearchForm, searchProps)), _react["default"].createElement("div", {
    className: "box"
  }, locationMenu), _react["default"].createElement(_listView["default"], listViewProps), !locSettings.length && _react["default"].createElement("div", {
    className: "no-data"
  }, noDataFound));
};

exports.EditSetings = EditSetings;
var defaultProps = {
  activeLocationId: '',
  currentLocName: '',
  debounceTime: 1000,
  defaultLocId: '',
  fetchSettings: _settings.fetchLocSettings,
  fetchLocations: _locations.fetchLocs,
  labels: _utils.labels,
  locationDetails: {},
  locationSettings: [],
  selectedLocations: [],
  state: {}
};
EditSetings.defaultProps = defaultProps;
var mapDispatchToProps = {
  fetchSettings: _settings.fetchLocSettings,
  fetchLocations: _locations.fetchLocs
};

var mapStateToProps = function mapStateToProps(state) {
  var activeLocationId = (0, _locations.getActiveLocId)(state);
  var selectedLocations = (0, _locations.getSelectedLocs)(state);
  var defaultLocId = (0, _locations.getDefaultLocId)(state);
  var locationDetails = {};
  var locationSettings = [];
  var currentLocName = '';

  if (defaultLocId && activeLocationId && selectedLocations.length) {
    locationDetails = (0, _locations.getLocDetails)(state, [defaultLocId]);
    currentLocName = (0, _locations.getLocDetails)(state, selectedLocations).label;
    locationSettings = (0, _settings.getLocSettings)(state, activeLocationId);
  }

  return {
    activeLocationId: activeLocationId,
    selectedLocations: selectedLocations,
    locationDetails: locationDetails,
    locationSettings: locationSettings,
    state: state,
    defaultLocId: defaultLocId,
    currentLocName: currentLocName
  };
};

var ConnectedEditSetings = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EditSetings);
exports.ConnectedEditSetings = ConnectedEditSetings;