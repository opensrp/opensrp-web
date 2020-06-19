"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultInitialValues = exports.uploadValidationSchema = void 0;

var Yup = _interopRequireWildcard(require("yup"));

var uploadValidationSchema = Yup.object().shape({
  form: Yup.mixed().required('Form is required'),
  form_name: Yup.string().required('Form name is required'),
  form_relation: Yup.string(),
  module: Yup.string()
});
exports.uploadValidationSchema = uploadValidationSchema;
var defaultInitialValues = {
  form: null,
  form_name: '',
  form_relation: '',
  module: ''
};
exports.defaultInitialValues = defaultInitialValues;