import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { SmsData } from './store/ducks/sms_events';

// internal urls
export const NBC_AND_PNC_URL = '/nbc_and_pnc';
export type NBC_AND_PNC_URL = typeof NBC_AND_PNC_URL;
export const HIERARCHICAL_DATA_URL = '/hierarchicaldata';
export type HIERARCHICAL_DATA_URL = typeof HIERARCHICAL_DATA_URL;
export const PREGNANCY_URL = '/pregnancy';
export type PREGNANCY_URL = typeof PREGNANCY_URL;
export const LOGIN_URL = '/login';
export type LOGIN_URL = typeof LOGIN_URL;
export const LOGOUT_URL = '/logout';
export type LOGOUT_URL = typeof LOGOUT_URL;
export const HOME_URL = '/';
export type HOME_URL = typeof HOME_URL;
export const PREGNANCY_COMPARTMENTS_URL = '/pregnancy_compartments';
export type PREGNANCY_COMPARTMENTS_URL = typeof PREGNANCY_COMPARTMENTS_URL;
export const NBC_AND_PNC_COMPARTMENTS_URL = '/nbc_and_pnc_compartments';
export type NBC_AND_PNC_COMPARTMENTS_URL = typeof NBC_AND_PNC_COMPARTMENTS_URL;
export const CLIENT_URL = '/clients';
export type CLIENT_URL = typeof CLIENT_URL;
export const LOGFACE_URL = '/log-face';
export type LOGFACE_URL = typeof LOGFACE_URL;
export const PREGNANCY_LOGFACE_URL = '/pregnancy_log_face';
export type PREGNANCY_LOGFACE_URL = typeof PREGNANCY_LOGFACE_URL;
export const NBC_AND_PNC_LOGFACE_URL = '/nbc_and_pnc_logface_url';
export type NBC_AND_PNC_LOGFACE_URL = typeof NBC_AND_PNC_LOGFACE_URL;
export const NUTRITION_LOGFACE_URL = '/nutrition_logface_url';
export type NUTRITION_LOGFACE_URL = typeof NUTRITION_LOGFACE_URL;
export const NUTRITION_COMPARTMENTS_URL = '/nutrition_commpartments_url';
export type NUTRITION_COMPARTMENTS_URL = typeof NUTRITION_COMPARTMENTS_URL;
export const PREGNANCY_ANALYSIS_URL = '/pregnancy_analysis';
export type PREGNANCY_ANALYSIS_URL = typeof PREGNANCY_ANALYSIS_URL;
export const NBC_AND_PNC_ANALYSIS_URL = '/nbc_and_pnc_analysis';
export type NBC_AND_PNC_ANALYSIS_URL = typeof NBC_AND_PNC_ANALYSIS_URL;
export const NUTRITION_ANALYSIS_URL = '/nutrition_analysis';
export type NUTRITION_ANALYSIS_URL = typeof NUTRITION_ANALYSIS_URL;
export const NUTRITION_URL = '/nutrition';
export type NUTRITION_URL = typeof NUTRITION_URL;
export const HOUSEHOLD_URL = '/404';
export type HOUSEHOLD_URL = typeof HOUSEHOLD_URL;
export const ANC_URL = '/404';
export type ANC_URL = typeof ANC_URL;
export const CHILD_URL = '/404';
export type CHILD_URL = typeof CHILD_URL;
export const USER_URL = '/404';
export type USER_URL = typeof USER_URL;
export const ROLE_URL = '/404';
export type ROLE_URL = typeof ROLE_URL;
export const TEAM_URL = '/404';
export type TEAM_URL = typeof TEAM_URL;
export const LOCATIONS_URL = '/404';
export type LOCATION_URL = typeof LOCATIONS_URL;
export const REPORTS_URL = '/';
export type REPORTS_URL = typeof REPORTS_URL;

// string literals
export const CHILD_WEIGHT_MONITORING = 'Child Weight Monitoring';
export type CHILD_WEIGHT_MONITORING = typeof CHILD_WEIGHT_MONITORING;
export const LENGTH_HEIGHT_MONITORING = 'Length/Height Monitoring';
export type LENGTH_HEIGHT_MONITORING = typeof LENGTH_HEIGHT_MONITORING;
export const CURRENT_NUTRTION = 'current nutrition';
export type CURRENT_NUTRTION = typeof CURRENT_NUTRTION;
export const LOCATION_OF_RESIDENCE = 'Location of Residence';
export type LOCATION_OF_RESIDENCE = typeof LOCATION_OF_RESIDENCE;
export const RISK_CARTEGORIZATION = 'Risk Cartegorization';
export type RISK_CARTEGORIZATION = typeof RISK_CARTEGORIZATION;
export const HIGH = 'high';
export type HIGH = typeof HIGH;
export const LOW = 'low';
export type LOW = typeof LOW;
export const RED = 'red';
export type RED = typeof RED;
export const NO = 'no';
export type NO = typeof NO;
export const NOT_SET_LOWERCASE = 'not set';
export type NOT_SET_LOWERCASE = typeof NOT_SET_LOWERCASE;
export type INDIVIDUAL_RISK_LEVELS = RED | HIGH | LOW | NOT_SET_LOWERCASE;
export const HOME = 'Home';
export type HOME = typeof HOME;
export const PREGNANCY = 'Pregnancy';
export type PREGNANCY = typeof PREGNANCY;
export const NBC_AND_PNC = 'NBC & PNC';
export type NBC_AND_PNC = typeof NBC_AND_PNC;
export const NBC_AND_PNC_CHILD = 'NBC & PNC_CHILD';
export type NBC_AND_PNC_CHILD = typeof NBC_AND_PNC_CHILD;
export const NBC_AND_PNC_WOMAN = 'NBC & PNC_WOMAN';
export type NBC_AND_PNC_WOMAN = typeof NBC_AND_PNC_WOMAN;
export const NUTRITION = 'Nutrition';
export type NUTRITION = typeof NUTRITION;
export const LOGFACE = 'Logface';
export type LOGFACE = typeof LOGFACE;
export const COMPARTMENTS = 'Compartments';
export type COMPARTMENTS = typeof COMPARTMENTS;
export const ANALYSIS = 'Analysis';
export type ANALYSIS = typeof ANALYSIS;
export const CLIENT = 'Client';
export type CLIENT = typeof CLIENT;
export const REPORT = 'Report';
export type REPORT = typeof REPORT;
export const ADMIN = 'Admin';
export type ADMIN = typeof ADMIN;
export const CLIENT_RECORDS = 'Client Records';
export type CLIENT_RECORDS = typeof CLIENT_RECORDS;
export const REPORTS = 'Reports';
export type REPORTS = typeof REPORTS;
export const ALL_CLIENTS = 'All clients';
export type ALL_CLIENTS = typeof ALL_CLIENTS;
export const HOUSEHOLD = 'Household';
export type HOUSEHOLD = typeof HOUSEHOLD;
export const ANC = 'ANC';
export type ANC = typeof ANC;
export const CHILD = 'Child';
export type CHILD = typeof CHILD;
export const USERS = 'Users';
export type USERS = typeof USERS;
export const ROLES = 'Roles';
export type ROLES = typeof ROLES;
export const TEAMS = 'Teams';
export type TEAMS = typeof TEAMS;
export const LOCATIONS = 'Locations';
export type LOCATIONS = typeof LOCATIONS;
export const LOGIN = 'Login';
export type LOGIN = typeof LOGIN;
export const SIGN_OUT = 'Sign Out';
export type SIGN_OUT = typeof SIGN_OUT;
export const PREGNANCY_LOGFACE_HEADING = 'Log Face - Pregnancy';
export type PREGNANCY_LOGFACE_HEADING = typeof PREGNANCY_LOGFACE_HEADING;
export const LOGFACE_SEARCH_PLACEHOLDER = 'Search ID, Reporter, Patients';
export type LOGFACE_SEARCH_PLACEHOLDER = typeof LOGFACE_SEARCH_PLACEHOLDER;
export const RISK_LEVEL = 'Risk Level';
export type RISK_LEVEL = typeof RISK_LEVEL;
export const SELECT_RISK = 'Select risk';
export type SELECT_RISK = typeof SELECT_RISK;
export const SELECT_LOCATION = 'Select Location';
export type SELECT_LOCATION = typeof SELECT_LOCATION;
export const SELECT_TYPE = 'Select Type';
export type SELECT_TYPE = typeof SELECT_TYPE;
export const ALL = 'all';
export type ALL = typeof ALL;
export const TYPE = 'Type';
export type TYPE = typeof TYPE;
export const UP = 'up';
export type UP = typeof UP;
export const BACK = 'Back';
export type BACK = typeof BACK;
export const BACK_TO_PREGNANCY_COMPARTMENTS = 'Back to Pregnancy Compartments';
export type BACK_TO_PREGNANCY_COMPARTMENTS = typeof BACK_TO_PREGNANCY_COMPARTMENTS;
export const HIGH_RISK = 'High Risk';
export type HIGH_RISK = typeof HIGH_RISK;
export const LOW_RISK = 'Low Risk';
export type LOW_RISK = typeof LOW_RISK;
export const NO_RISK_LOWERCASE = 'no risk';
export type NO_RISK_LOWERCASE = typeof NO_RISK_LOWERCASE;
export const NO_RISK = 'No Risk';
export type NO_RISK = typeof NO_RISK;
export const RED_ALERT = 'Red Alert';
export type RED_ALERT = typeof RED_ALERT;
export const NOT_SET = 'Not Set';
export type NOT_SET = typeof NOT_SET;
export const TOTAL = 'Total';
export type TOTAL = typeof TOTAL;
export const DISTRICT = 'District';
export type DISTRICT = typeof DISTRICT;
export const PROVINCE = 'Province';
export type PROVINCE = typeof PROVINCE;
export const COMMUNE = 'Commune';
export type COMMUNE = typeof COMMUNE;
export const VILLAGE = 'Village';
export type VILLAGE = typeof VILLAGE;
export const PATIENT_DETAILS = 'Patient Details';
export type PATIENT_DETAILS = typeof PATIENT_DETAILS;
export const BASIC_INFORMATION = 'Basic Information';
export type BASIC_INFORMATION = typeof BASIC_INFORMATION;
export const ID = 'ID';
export type ID = typeof ID;
export const CURRENT_GRAVIDITY = 'Current Gravidity';
export type CURRENT_GRAVIDITY = typeof CURRENT_GRAVIDITY;
export const GRAVIDITY = 'Gravidity';
export type GRAVIDITY = typeof GRAVIDITY;
export const PATIENT_ID = 'Patient ID';
export type PATIENT_ID = typeof PATIENT_ID;
export const CURRENT_PARITY = 'Current Parity';
export type CURRENT_PARITY = typeof CURRENT_PARITY;
export const PARITY = 'Parity';
export type PARITY = typeof PARITY;
export const LOCATION = 'Location';
export type LOCATION = typeof LOCATION;
export const PREVIOUS_PREGNANCY_RISK = 'Previous Pregnancy Risk';
export type PREVIOUS_PREGNANCY_RISK = typeof PREVIOUS_PREGNANCY_RISK;
export const CURRENT_EDD = 'Current EDD';
export type CURRENT_EDD = typeof CURRENT_EDD;
export const EDD = 'EDD';
export type EDD = typeof EDD;
export const RISK_CATEGORY = 'Risk category';
export type RISK_CATEGORY = typeof RISK_CATEGORY;
export const MIECD_VIETNAM = 'MIECD VIETNAM';
export type MIECD_VIETNAM = typeof MIECD_VIETNAM;
export const NO_PROVIDERS = 'No providers';
export type NO_PROVIDERS = typeof NO_PROVIDERS;
export const MOTHER_WEIGHT_TRACKING = "Mother's Weight Tracking";
export type MOTHER_WEIGHT_TRACKING = typeof MOTHER_WEIGHT_TRACKING;
export const PREGNANCY_DESCRIPTION = `This dashboard displays information collected from MIECD Viet Nam Pregnancy Module for
patients in your geographical location. The Module covers the whole pregnancy period
from conception to delivery and includes Pregnancy Registration, ANC visits, Birth
reports/Death reports, Risk Reports, Risk alerts and ResponseReports.`;
export type PREGNANCY_DESCRIPTION = typeof PREGNANCY_DESCRIPTION;
export const NEWBORN_REPORT = 'Newborn Report';
export type NEWBORN_REPORT = typeof NEWBORN_REPORT;
export const PREGNANCY_DASHBOARD_WELCOME = 'Welcome to the pregnancy dashboard';
export type PREGNANCY_DASHBOARD_WELCOME = typeof PREGNANCY_DASHBOARD_WELCOME;
export const NBC_AND_PNC_DASHBOARD_WELCOME = 'Welcome to Newborn and Postnatal Care';
export type NBC_AND_PNC_COMPARTMENTS_WELCOME = typeof NBC_AND_PNC_DASHBOARD_WELCOME;
export const NUTRITION_DASHBOARD_WELCOME = 'Welcome to Nutrition Care';
export type NUTRITION_DASHBOARD_WELCOME = typeof NUTRITION_DASHBOARD_WELCOME;
export const EC_WOMAN = 'ec_woman';
export type EC_WOMAN = typeof EC_WOMAN;
export const EC_CHILD = 'ec_child';
export type EC_CHILD = typeof EC_CHILD;
export const PREGNANCY_ANALYSIS = 'Pregnancy - Analysis';
export type PREGNANCY_ANALYSIS = typeof PREGNANCY_ANALYSIS;
export const NUTRITION_ANALYSIS = 'Nutrition - Analysis';
export type NUTRITION_ANALYSIS = typeof NUTRITION_ANALYSIS;
export const COULD_NOT_FIND_ANY_LOCATION = 'could not find any location';
export type COULD_NOT_FIND_ANY_LOCATION = typeof COULD_NOT_FIND_ANY_LOCATION;
export const CM = 'cm';
export type CM = typeof CM;
export const KG = 'kg';
export type KG = typeof KG;
export const CHILD_HEIGHT_VS_MONTHS = 'Child height vs month';
export type CHILD_HEIGHT_VS_MONTHS = typeof CHILD_HEIGHT_VS_MONTHS;
export const CHILD_WEIGHT_VS_MONTHS = 'Child weight vs month';
export type CHILD_WEIGHT_VS_MONTHS = typeof CHILD_WEIGHT_VS_MONTHS;

// typings
export type SMS_FILTER_FUNCTION = (smsData: SmsData) => boolean;

// sms events fields
export const AGE = 'age';
export type AGE = typeof AGE;
export const EVENT_DATE = 'EventDate';
export type EVENT_DATE = typeof EVENT_DATE;
export const EVENT_ID = 'event_id';
export type EVENT_ID = typeof EVENT_ID;
export const HEALTH_WORKER_LOCATION_NAME = 'health_worker_location_name';
export type HEALTH_WORKER_LOCATION_NAME = typeof HEALTH_WORKER_LOCATION_NAME;
export const MESSAGE = 'message';
export type MESSAGE = typeof MESSAGE;
export const ANC_ID = 'anc_id';
export type ANC_ID = typeof ANC_ID;
export const LOGFACE_RISK = 'logface_risk: string';
export type LOGFACE_RISK = typeof LOGFACE_RISK;
export const HEALTH_WORKER_NAME = 'health_worker_name: string';
export type HEALTH_WORKER_NAME = typeof HEALTH_WORKER_NAME;
export const SMS_TYPE = 'sms_type';
export type SMS_TYPE = typeof SMS_TYPE;
export const HEIGHT = 'height';
export type HEIGHT = typeof HEIGHT;
export const WEIGHT = 'weight';
export type WEIGHT = typeof WEIGHT;
export const RISK = 'risks';
export type RISK = typeof RISK;
export const LMP_EDD = 'lmp_edd';
export type LMP_EDD = typeof LMP_EDD;
export const PARITY_LOWERCASE = 'parity';
export type PARITY_LOWERCASE = typeof PARITY_LOWERCASE;
export const GRAVIDITY_LOWER = 'gravidity';
export type GRAVIDITY_LOWER = typeof GRAVIDITY_LOWER;
export const LOCATION_ID = 'location_id';
export type LOCATION_ID = typeof LOCATION_ID;
export const CLIENT_TYPE = 'client_type';
export type CLIENT_TYPE = typeof CLIENT_TYPE;
export const PREGNANCY_REGISTRATION = 'Pregnancy Registration';
export type PREGNANCY_REGISTRATION = typeof PREGNANCY_REGISTRATION;
export const RESPONSE_REPORT = 'Response Report';
export type RESPONSE_REPORT = typeof RESPONSE_REPORT;
export const RED_ALERT_REPORT = 'Red Alert Report';
export type RED_ALERT_REPORT = typeof RED_ALERT_REPORT;
export const SOCIAL_DETERMINANTS = 'Social Determinants';
export type SOCIAL_DETERMINANTS = typeof SOCIAL_DETERMINANTS;
export const ANC_VISIT = 'ANC Visit';
export type ANC_VISIT = typeof ANC_VISIT;
export const DELIVERY_PLANNING = 'Delivery Planning';
export type DELIVERY_PLANNING = typeof DELIVERY_PLANNING;
export const PREGNANCY_DETECTION = 'Pregnancy Detection';
export type PREGNANCY_DETECTION = typeof PREGNANCY_DETECTION;
export const PREGNANCY_IDENTIFICATION = 'Pregnancy Identification';
export type PREGNANCY_IDENTIFICATION = typeof PREGNANCY_IDENTIFICATION;
export const ANC_REPORT = 'ANC Report';
export type ANC_REPORT = typeof ANC_REPORT;
export const HOME_VISIT_REPORT = 'Home Visit Report';
export type HOME_VISIT_REPORT = typeof HOME_VISIT_REPORT;
export const BIRTH_REPORT = 'Birth Report';
export type BIRTH_REPORT = typeof BIRTH_REPORT;
export const DEATH_REPORT = 'Death Report';
export type DEATH_REPORT = typeof DEATH_REPORT;
export const POSTNATAL_AND_NEWBORN_CARE = 'Postnatal and Newborn Care';
export type POSTNATAL_AND_NEWBORN_CARE = typeof POSTNATAL_AND_NEWBORN_CARE;
export const NUTRITION_REGISTRATION = 'Nutrition Registration';
export type NUTRITION_REGISTRATION = typeof NUTRITION_REGISTRATION;
export const NUTRITION_REPORT = 'Nutrition Report';
export type NUTRITION_REPORT = typeof NUTRITION_REPORT;
export const MONTHLY_NUTRITION_REPORT = 'Monthly Nutrition Report';
export type MONTHLY_NUTRITION_REPORT = typeof MONTHLY_NUTRITION_REPORT;
export const DEPARTURE_CODE = 'Departure Code';
export type DEPARTURE_CODE = typeof DEPARTURE_CODE;
export const REFUSAL_CODE = 'Refusal Code';
export type REFUSAL_CODE = typeof REFUSAL_CODE;
export const ACCOUNT_CHECK = 'Account Check';
export type ACCOUNT_CHECK = typeof ACCOUNT_CHECK;
export const PREGNANCY_LOGFACE_SMS_TYPES = [
  PREGNANCY_IDENTIFICATION,
  PREGNANCY_REGISTRATION,
  SOCIAL_DETERMINANTS,
  ANC_REPORT,
  HOME_VISIT_REPORT,
  RED_ALERT,
  RED_ALERT_REPORT,
  RESPONSE_REPORT,
  DEPARTURE_CODE,
  REFUSAL_CODE,
  ACCOUNT_CHECK,
  DELIVERY_PLANNING,
  BIRTH_REPORT,
];
export const NBC_AND_PNC_LOGFACE_SMS_TYPES = [
  HOME_VISIT_REPORT,
  DELIVERY_PLANNING,
  BIRTH_REPORT,
  POSTNATAL_AND_NEWBORN_CARE,
  DEATH_REPORT,
  RED_ALERT,
  RED_ALERT_REPORT,
  RESPONSE_REPORT,
  DEPARTURE_CODE,
  REFUSAL_CODE,
  ACCOUNT_CHECK,
];

export const NUTRITION_LOGFACE_SMS_TYPES = [
  NUTRITION_REGISTRATION,
  NUTRITION_REPORT,
  MONTHLY_NUTRITION_REPORT,
  RED_ALERT,
  RED_ALERT_REPORT,
  RESPONSE_REPORT,
  RESPONSE_REPORT,
  DEPARTURE_CODE,
  REFUSAL_CODE,
  ACCOUNT_CHECK,
];

export const DEFAULT_NUMBER_OF_LOGFACE_ROWS = 3;
export type DEFAULT_NUMBER_OF_LOGFACE_ROWS = typeof DEFAULT_NUMBER_OF_LOGFACE_ROWS;

// TIME constants
export const MICROSECONDS_IN_A_WEEK = 604800000;
export type MICROSECONDS_IN_A_WEEK = typeof MICROSECONDS_IN_A_WEEK;
export const GESTATION_PERIOD = 24192000000;
export type GESTATION_PERIOD = typeof GESTATION_PERIOD;

// Back arrow constant
export const BACKPAGE_ICON: IconProp = ['fas', 'arrow-left'];

// Risk cartegories in the logface component
export const RISK_LEVELS = ['red', 'high', 'low', 'no risk', 'all'];
export type RISK_LEVELS = typeof RISK_LEVELS;

// monthnames
export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
