"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectedUploadConfigFile = exports.UploadConfigFile = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _reactstrap = require("reactstrap");

var _helpers = require("./helpers");

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _manifestFiles = require("../../ducks/manifestFiles");

var _constants = require("../../constants");

var _services = require("../../helpers/services");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var UploadConfigFile = function UploadConfigFile(props) {
  var isJsonValidator = props.isJsonValidator,
      formId = props.formId,
      draftFilesUrl = props.draftFilesUrl,
      formInitialValues = props.formInitialValues,
      endpoint = props.endpoint,
      getPayload = props.getPayload,
      baseURL = props.baseURL,
      customAlert = props.customAlert,
      validatorsUrl = props.validatorsUrl,
      fileNameLabel = props.fileNameLabel,
      moduleLabel = props.moduleLabel,
      fileUploadLabel = props.fileUploadLabel,
      relatedToLabel = props.relatedToLabel,
      formNameRequiredLable = props.formNameRequiredLable,
      formRequiredLabel = props.formRequiredLabel;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      ifDoneHere = _useState2[0],
      setIfDoneHere = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      isEditMode = _useState4[0],
      setIsEditMode = _useState4[1];

  var redirectUrl = isJsonValidator ? validatorsUrl : draftFilesUrl;
  (0, _react.useEffect)(function () {
    if (formId) {
      setIsEditMode(true);
    }
  }, [formId]);

  var uploadData = function () {
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(data, setSubmitting) {
      var postData, clientService;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postData = new FormData();
              Object.keys(data).forEach(function (dt) {
                postData.append(dt, data[dt]);
              });

              if (isJsonValidator) {
                postData.append('is_json_validator', 'true');
              }

              clientService = new _services.OpenSRPServiceExtend(baseURL, endpoint, getPayload);
              _context.next = 6;
              return clientService.postData(postData).then(function () {
                return setIfDoneHere(true);
              })["catch"](function (err) {
                customAlert && customAlert(String(err), {
                  type: 'error'
                });
                setSubmitting(false);
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function uploadData(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  if (ifDoneHere) {
    return _react["default"].createElement(_reactRouter.Redirect, {
      to: redirectUrl
    });
  }

  return _react["default"].createElement(_formik.Formik, {
    initialValues: formInitialValues,
    validationSchema: _helpers.uploadValidationSchema,
    onSubmit: function onSubmit(values, _ref2) {
      var setSubmitting = _ref2.setSubmitting;
      uploadData(values, setSubmitting);
    }
  }, function (_ref3) {
    var values = _ref3.values,
        setFieldValue = _ref3.setFieldValue,
        handleChange = _ref3.handleChange,
        handleSubmit = _ref3.handleSubmit,
        errors = _ref3.errors,
        touched = _ref3.touched,
        isSubmitting = _ref3.isSubmitting;
    return _react["default"].createElement(_reactstrap.Form, {
      onSubmit: handleSubmit,
      "data-enctype": "multipart/form-data"
    }, _react["default"].createElement(_reactstrap.Row, null, _react["default"].createElement(_reactstrap.Col, {
      md: 6
    }, _react["default"].createElement(_reactstrap.FormGroup, null, _react["default"].createElement("div", null, _react["default"].createElement(_reactstrap.Label, {
      "for": "form_name"
    }, fileNameLabel, " *")), _react["default"].createElement(_reactstrap.Input, {
      type: "text",
      name: "form_name",
      disabled: isEditMode,
      value: values.form_name,
      onChange: handleChange
    }), errors.form_name && touched.form_name && _react["default"].createElement("small", {
      className: "form-text text-danger jurisdictions-error"
    }, formNameRequiredLable))), _react["default"].createElement(_reactstrap.Col, {
      md: 6
    }, _react["default"].createElement(_reactstrap.FormGroup, null, _react["default"].createElement("div", null, _react["default"].createElement(_reactstrap.Label, {
      "for": "module"
    }, moduleLabel)), _react["default"].createElement(_reactstrap.Input, {
      type: "text",
      name: "module",
      disabled: isEditMode,
      value: values.module,
      onChange: handleChange
    }), errors.module && touched.module && _react["default"].createElement("small", {
      className: "form-text text-danger jurisdictions-error"
    }, errors.module)))), _react["default"].createElement(_reactstrap.Row, null, _react["default"].createElement(_reactstrap.Col, {
      md: 6
    }, _react["default"].createElement(_reactstrap.FormGroup, null, _react["default"].createElement("div", null, _react["default"].createElement(_reactstrap.Label, {
      "for": "form_relation"
    }, relatedToLabel)), _react["default"].createElement(_reactstrap.Input, {
      type: "text",
      name: "form_relation",
      disabled: isEditMode,
      value: values.form_relation,
      onChange: handleChange
    }), errors.form_relation && touched.form_relation && _react["default"].createElement("small", {
      className: "form-text text-danger jurisdictions-error"
    }, errors.form_relation))), _react["default"].createElement(_reactstrap.Col, {
      md: 6
    })), _react["default"].createElement(_reactstrap.FormGroup, null, _react["default"].createElement(_reactstrap.Label, {
      "for": "upload-file"
    }, fileUploadLabel, " *"), _react["default"].createElement(_reactstrap.Input, {
      type: "file",
      name: "form",
      onChange: function onChange(event) {
        setFieldValue('form', event && event.target && event.target.files && event.target.files[0]);
      }
    }), errors.form && touched.form && _react["default"].createElement("small", {
      className: "form-text text-danger jurisdictions-error"
    }, formRequiredLabel)), _react["default"].createElement("div", null, _react["default"].createElement(_reactstrap.Button, {
      type: "submit",
      id: "exportform-submit-button",
      className: "btn btn-md btn btn-primary float-right",
      color: "primary",
      disabled: isSubmitting
    }, fileUploadLabel)));
  });
};

exports.UploadConfigFile = UploadConfigFile;
var defaultProps = {
  fileNameLabel: _constants.FILE_NAME_LABEL,
  fileUploadLabel: _constants.FILE_UPLOAD_LABEL,
  formData: null,
  formInitialValues: _helpers.defaultInitialValues,
  formNameRequiredLable: _constants.FORM_NAME_REQUIRED_LABEL,
  formRequiredLabel: _constants.FORM_REQUIRED_LABEL,
  moduleLabel: _constants.MODULE_LABEL,
  relatedToLabel: _constants.RELATED_TO_LABEL
};
UploadConfigFile.defaultProps = defaultProps;
;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var formId = ownProps.formId;
  var formInitialValues = _helpers.defaultInitialValues;
  var formData = null;

  if (formId) {
    formData = (0, _manifestFiles.getManifestFilesById)(state, formId);
  }

  if (formId && formData) {
    formInitialValues = {
      form: null,
      form_name: formData.label,
      form_relation: formData.form_relation || '',
      module: formData.module
    };
  }

  return _objectSpread({}, defaultProps, {}, ownProps, {
    formData: formData,
    formInitialValues: formInitialValues
  });
};

var mapDispatchToProps = {};
var ConnectedUploadConfigFile = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadConfigFile);
exports.ConnectedUploadConfigFile = ConnectedUploadConfigFile;