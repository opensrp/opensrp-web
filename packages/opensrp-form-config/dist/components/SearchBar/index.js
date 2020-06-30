"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchBar = exports.SearchBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

require("../../styles/index.css");

var _constants = require("../../constants");

var SearchBar = function SearchBar(props) {
  var placeholder = props.placeholder,
      debounceTime = props.debounceTime,
      onChangeHandler = props.onChangeHandler;

  var debouncedOnChangeHandler = function debouncedOnChangeHandler(event) {
    event.persist();
    var debouncedFn = (0, _lodash.debounce)(function (ev) {
      return onChangeHandler(ev);
    }, debounceTime);
    debouncedFn(event);
  };

  return _react["default"].createElement("div", {
    className: "search-input-wrapper"
  }, _react["default"].createElement("div", {
    className: "input-group"
  }, _react["default"].createElement("div", {
    className: "input-group-prepend"
  }, _react["default"].createElement("span", {
    className: "input-group-text bg-transparent border-right-0"
  }, _react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "search-icon",
    icon: "search"
  }))), _react["default"].createElement("input", {
    type: "text",
    className: "form-control border-left-0 border search-input",
    "aria-label": "search",
    "aria-describedby": "basic-addon1",
    name: "search",
    placeholder: placeholder,
    onInput: debouncedOnChangeHandler
  })));
};

exports.SearchBar = exports.SearchBar = SearchBar;
var defaultProps = {
  placeholder: _constants.SEARCH_LABEL,
  debounceTime: 1000
};
SearchBar.defaultProps = defaultProps;