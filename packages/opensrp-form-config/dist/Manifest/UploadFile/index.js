"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UploadConfigFile = void 0;

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

var UploadConfigFile = function UploadConfigFile(props) {
  var isJsonValidator = props.isJsonValidator,
      formId = props.formId,
      draftFilesUrl = props.draftFilesUrl,
      formInitialValues = props.formInitialValues,
      endpoint = props.endpoint,
      getPayload = props.getPayload,
      baseURL = props.baseURL,
      growl = props.growl,
      validatorsUrl = props.validatorsUrl;

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
    var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(data) {
      var _getPayload, headers, postData, response, defaultMessage;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _getPayload = getPayload(new AbortController().signal, 'POST'), headers = _getPayload.headers;
              postData = new FormData();
              Object.keys(data).forEach(function (dt) {
                postData.append(dt, data[dt]);
              });

              if (isJsonValidator) {
                postData.append('is_json_validator', 'true');
              }

              _context.next = 6;
              return fetch("".concat(baseURL).concat(endpoint), {
                body: postData,
                headers: {
                  Authorization: headers.authorization || headers.Authorization
                },
                method: 'POST'
              });

            case 6:
              response = _context.sent;

              if (!response) {
                _context.next = 13;
                break;
              }

              if (!(response.status == 201 || response.ok)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", setIfDoneHere(true));

            case 12:
              if (response.status === 400) {
                response.text().then(function (text) {
                  text.length ? growl && growl(text, {
                    type: 'error'
                  }) : setIfDoneHere(true);
                  return true;
                });
              } else {
                defaultMessage = "OpenSRPService create on ".concat(endpoint, " failed, HTTP status ").concat(response === null || response === void 0 ? void 0 : response.status);
                growl && growl(defaultMessage, {
                  type: 'error'
                });
              }

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function uploadData(_x) {
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
    onSubmit: function onSubmit(values) {
      uploadData(values);
    }
  }, function (_ref2) {
    var values = _ref2.values,
        setFieldValue = _ref2.setFieldValue,
        handleChange = _ref2.handleChange,
        handleSubmit = _ref2.handleSubmit,
        errors = _ref2.errors,
        touched = _ref2.touched,
        isSubmitting = _ref2.isSubmitting;
    return _react["default"].createElement(_reactstrap.Form, {
      onSubmit: handleSubmit,
      "data-enctype": "multipart/form-data"
    }, _react["default"].createElement(_reactstrap.Row, null, _react["default"].createElement(_reactstrap.Col, {
      md: 6
    }, _react["default"].createElement(_reactstrap.FormGroup, null, _react["default"].createElement("div", null, _react["default"].createElement(_reactstrap.Label, {
      "for": "form_name"
    }, "File Name *")), _react["default"].createElement(_reactstrap.Input, {
      type: "text",
      name: "form_name",
      disabled: isEditMode,
      value: values.form_name,
      onChange: handleChange
    }), errors.form_name && touched.form_name && _react["default"].createElement("small", {
      className: "form-text text-danger jurisdictions-error"
    }, errors.form_name))), _react["default"].createElement(_reactstrap.Col, {
      md: 6
    }, _react["default"].createElement(_reactstrap.FormGroup, null, _react["default"].createElement("div", null, _react["default"].createElement(_reactstrap.Label, {
      "for": "module"
    }, "Module")), _react["default"].createElement(_reactstrap.Input, {
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
    }, "Related to")), _react["default"].createElement(_reactstrap.Input, {
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
    }, "Upload file *"), _react["default"].createElement(_reactstrap.Input, {
      type: "file",
      name: "form",
      onChange: function onChange(event) {
        setFieldValue('form', event && event.target && event.target.files && event.target.files[0]);
      }
    }), errors.form && touched.form && _react["default"].createElement("small", {
      className: "form-text text-danger jurisdictions-error"
    }, errors.form)), _react["default"].createElement("div", null, _react["default"].createElement(_reactstrap.Button, {
      type: "submit",
      id: "exportform-submit-button",
      className: "btn btn-md btn btn-primary float-right",
      color: "primary",
      disabled: isSubmitting
    }, "Upload file")));
  });
};

exports.UploadConfigFile = UploadConfigFile;
var defaultProp = {
  formData: null,
  formInitialValues: _helpers.defaultInitialValues
};
UploadConfigFile.defaultProp = defaultProp;

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

  return {
    formData: formData,
    formInitialValues: formInitialValues
  };
};

var ConnectedUploadConfigFile = (0, _reactRedux.connect)(mapStateToProps)(UploadConfigFile);
var _default = ConnectedUploadConfigFile;
exports["default"] = _default;