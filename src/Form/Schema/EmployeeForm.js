import * as Yup from 'yup';
import moment from 'moment';

export const ADD_EMPLOYEE_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Employee email is required'),
  firstName: Yup.string().required('Employee first name is required'),
  lastName: Yup.string().required('Employee last name is required'),
  contactNumber: Yup.string().required('Employee phone number is required'),
  employeeCode: Yup.string().required('Employee Code is required'),
});

export const ADD_EMPLOYEE_SCHEMA_INITIAL = {
  email: '',
  firstName: '',
  lastName: '',
  contactNumber: '',
  employeeCode: '',
};

export const ADD_EMPLOYEE_DETAILS_SCHEMA = Yup.object().shape({
  jobTitle: Yup.string().required('Employee job title is required'),
  startDate: Yup.string().required('Please enter a start date'),
  primaryManager: Yup.object()
    .shape({ label: Yup.string(), empId: Yup.string() })
    .typeError('Please select a primary manager')
    .required('Please select a primary manager'),
  secondaryManager: Yup.object()
    .shape({ label: Yup.string(), empId: Yup.string() })
    .typeError('Please select a primary manager'),
  probationPeriod: Yup.number()
    .positive()
    .min(0)
    .typeError('Probation period must be a number')
    .required('Please enter a probation period in month'),
  allowedLeaves: Yup.number()
    .positive()
    .min(0)
    .typeError('Allowed leaves must be in number')
    .required('Please enter total number of allowed leaves'),

  workHours: Yup.number()
    .positive()
    .typeError('Work hours must be in number')
    .required('Please enter total number of work hours per day'),
  salary: Yup.number().positive().typeError('Salary must be in number').required('Please enter total salary per annum'),

  paySchedule: Yup.object()
    .shape({ label: Yup.string() })
    .typeError('Please select payment schedule')
    .required('Please select payment schedule'),
});
export const ADD_EMPLOYEE_DETAILS_SCHEMA_INITIAL = {
  jobTitle: '',
  startDate: new Date(),
  probationPeriod: '',
  primaryManager: {},
  secondaryManager: {},
  allowedLeaves: '',
  workHours: '',
  salary: '',
  paySchedule: {},
};

export const EMPLOYEE_PERSONAL_DETAILS_SCHEMA = Yup.object().shape({
  contactNumber: Yup.string()
    .required('Contact number is required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid'
    ),
  dob: Yup.string().trim().required('Date of Birth is required'),
  sex: Yup.string().trim().required('Gender is required'),
  country: Yup.string().trim().required('Country is required'),
  address: Yup.string()
    .trim()
    .min(5)
    .typeError('Address must be at least 5 characters')
    .required('Address is required'),
  state: Yup.string().trim().min(3).typeError('Address must be at least 3 characters').required('Address is required'),
  pincode: Yup.string()
    .trim()
    .min(3)
    .typeError('Pincode must be at least 3 characters')
    .required('Pincode is required'),
});

export const EMPLOYEE_PERSONAL_DETAILS_SCHEMA_INITIAL = {
  contactNumber: '',
  dob: moment(new Date()).subtract('years', 20),
  sex: 'male',
  address: '',
  country: 'India',
  state: '',
  pincode: '',
};

export const EMPLOYEE_EMERGENCY_CONTACT_SCHEMA = Yup.object().shape({
  emergencyContactNumber: Yup.string()
    .required('Emergency contact number is required')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid'
    ),
  emergencyContactName: Yup.string().trim().required('Emergency contact name is required'),
  emergencyContactaddress: Yup.string().trim().required('Emergency contact address is required'),
});

export const EMPLOYEE_EMERGENCY_CONTACT_SCHEMA_INITIAL = {
  emergencyContactNumber: '',
  emergencyContactName: '',
  emergencyContactaddress: '',
};

export const EMPLOYEE_BANK_DETAILS_SCHEMA = Yup.object().shape({
  bank_account_no: Yup.number().positive().required('Bank Account Number is required'),
  bank_ifsc_code: Yup.string().required('Bank IFSC code is required'),
  bank_account_name: Yup.string().required('Bank account name is required'),
});

export const EMPLOYEE_BANK_DETAILS_SCHEMA_INITIAL = {
  bank_account_no: '',
  bank_ifsc_code: '',
  bank_account_name: '',
};

export const EMPLOYEE_WORK_ELIGIBILITY_SCHEMA = Yup.object().shape({});

export const EMPLOYEE_WORK_ELIGIBILITY_SCHEMA_INITIAL = {};

export const EMPLOYEE_MEDICAL_DETAILS_SCHEMA = Yup.object().shape({
  medicalDisability: Yup.string().required('Employee disability details is required'),
});

export const EMPLOYEE_MEDICAL_DETAILS_SCHEMA_INITIAL = {
  medicalDisability: 'false',
  comment_medicalDisability: '',
};
