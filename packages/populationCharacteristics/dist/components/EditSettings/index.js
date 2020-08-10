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

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _locations = require("../../ducks/locations");

var _LocationsMenu = require("../LocationsMenu");

var _SearchForm = require("../SearchForm");

var _utils = require("../../helpers/utils");

var _constants = require("../../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faSearch, _freeSolidSvgIcons.faQuestionCircle);

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
      v2BaseUrl = props.v2BaseUrl,
      tableClass = props.tableClass;
  var actionLabel = labels.actionLabel,
      pageTitle = labels.pageTitle,
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

  var getLocationSettings = function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(currentLocId) {
      var params, clientService;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(locationSettings.length < 1);
              params = {
                identifier: _constants.POP_CHARACTERISTICS_PARAM,
                locationId: currentLocId,
                resolve: true,
                serverVersion: 0
              };
              clientService = new _serverService.OpenSRPService(v2BaseUrl, settingsEndpoint, getPayload);
              _context.next = 5;
              return clientService.list(params).then(function (res) {
                fetchSettings(res, currentLocId, true);
              })["catch"](function (error) {
                return customAlert && customAlert(String(error), {
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

    return function getLocationSettings(_x) {
      return _ref.apply(this, arguments);
    };
  }();

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
    var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
      var userLocs, userLocMap, userLocId, hierarchy;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return getUserLocHierarchy();

            case 3:
              userLocs = _context2.sent;
              userLocMap = userLocs.locations.locationsHierarchy.map;
              userLocId = Object.keys(userLocMap)[0];
              _context2.next = 8;
              return getLocations(userLocId);

            case 8:
              hierarchy = _context2.sent;
              fetchLocations(hierarchy);
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              customAlert && customAlert(String(_context2.t0), {
                type: 'error'
              });

            case 15:
              _context2.prev = 15;
              setLoading(false);
              return _context2.finish(15);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12, 15, 18]]);
    }));

    return function getLocsandSettings() {
      return _ref2.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    if (!defaultLocId) {
      getLocsandSettings();
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (activeLocationId) {
      getLocationSettings(activeLocationId);
    }
  }, [props.activeLocationId]);
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

  var updateSetting = function updateSetting(row, value) {
    if (row.value === value) {
      return;
    }

    if (value !== 'inherit') {
      fetchSettings([_objectSpread({}, row, {
        value: value,
        inheritedFrom: ''
      })], activeLocationId);
    } else {
      var _locationDetails$node;

      var _locationDetails = (0, _locations.getLocDetails)(state, row.locationId);

      var parentId = (_locationDetails$node = _locationDetails.node.parentLocation) === null || _locationDetails$node === void 0 ? void 0 : _locationDetails$node.locationId;

      if (parentId) {
        fetchSettings([_objectSpread({}, row, {
          value: value,
          inheritedFrom: parentId
        })], activeLocationId);
      } else {
        fetchSettings([_objectSpread({}, row, {
          value: value
        })], activeLocationId);
      }
    }
  };

  var changeSetting = function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(e, row, value) {
      var deleteUrl, clientService, data, _clientService, putUrl, _clientService2;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              e.preventDefault();

              if (!(value === row.value)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", false);

            case 3:
              if (!(value === 'inherit')) {
                _context3.next = 10;
                break;
              }

              deleteUrl = "".concat(settingsEndpoint).concat(row.settingMetadataId);
              clientService = new _serverService.OpenSRPService(v2BaseUrl, deleteUrl, getPayload);
              _context3.next = 8;
              return clientService["delete"]().then(function () {
                updateSetting(row, value);
              })["catch"](function (error) {
                customAlert && customAlert(String(error), {
                  type: 'error'
                });
              });

            case 8:
              _context3.next = 25;
              break;

            case 10:
              data = (0, _utils.preparePutData)(row, value);

              if (!(activeLocationId !== row.locationId)) {
                _context3.next = 21;
                break;
              }

              data.locationId = activeLocationId;
              delete data.uuid;
              delete data._id;
              _clientService = new _serverService.OpenSRPService(v2BaseUrl, settingsEndpoint, getPayload);
              _context3.next = 18;
              return _clientService.create(data).then(function () {
                updateSetting(row, value);
              })["catch"](function (error) {
                customAlert && customAlert(String(error), {
                  type: 'error'
                });
              });

            case 18:
              return _context3.abrupt("return", _context3.sent);

            case 21:
              putUrl = "".concat(settingsEndpoint).concat(row.settingMetadataId);
              _clientService2 = new _serverService.OpenSRPService(v2BaseUrl, putUrl, getPayload);
              _context3.next = 25;
              return _clientService2.update(data).then(function () {
                updateSetting(row, value);
              })["catch"](function (error) {
                customAlert && customAlert(String(error), {
                  type: 'error'
                });
              });

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function changeSetting(_x2, _x3, _x4) {
      return _ref3.apply(this, arguments);
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
    var _ref4 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(e, activeLocId) {
      var selectedLocs, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              e.preventDefault();
              selectedLocs = [].concat((0, _toConsumableArray2["default"])(selectedLocations), [activeLocId]);
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

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function loadLocsettings(_x5, _x6) {
      return _ref4.apply(this, arguments);
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

  var iheritedFrom = _react["default"].createElement("span", null, inheritedLable, " ", _react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "question-circle"
  }));

  var listViewProps = {
    data: locSettings.map(function (row) {
      var _row$inheritedFrom;

      var value = typeof row.value === 'string' ? row.value === 'true' : row.value;
      var inheritedFrom = (_row$inheritedFrom = row.inheritedFrom) === null || _row$inheritedFrom === void 0 ? void 0 : _row$inheritedFrom.trim();
      var inheritedFromInvalid = false;

      if (inheritedFrom) {
        var label = (0, _locations.getLocDetails)(state, inheritedFrom).label;

        if (label) {
          inheritedFrom = label;
        } else {
          inheritedFromInvalid = true;
        }
      } else {
        inheritedFrom = '_';
      }

      return [row.label, row.description, _react["default"].createElement("p", {
        key: row.key
      }, value ? 'Yes' : 'No'), inheritedFrom, _react["default"].createElement(_utils.EditSettingsButton, {
        key: row.documentId,
        changeSetting: changeSetting,
        editLabel: editLabel,
        inheritSettingsLabel: inheritSettingsLabel,
        openEditModal: openEditModal,
        row: row,
        setToNoLabel: setToNoLabel,
        setToYesLabel: setToYesLabel,
        value: value,
        showInheritSettingsLabel: !row.inheritedFrom || inheritedFromInvalid
      })];
    }),
    headerItems: [nameLabel, descriptionLabel, settingLabel, iheritedFrom, actionLabel],
    tableClass: tableClass
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
  state: {},
  tableClass: 'table table-striped'
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
    locationDetails = (0, _locations.getLocDetails)(state, defaultLocId);
    currentLocName = (0, _locations.getLocDetails)(state, selectedLocations[selectedLocations.length - 1]).label;
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