import * as Yup from 'yup';

export const SettingSchema = Yup.object().shape({
  firstName: Yup.string().trim('').required('First Name is required'),
  lastName: Yup.string().trim('').required('Last Name is required'),
  email: Yup.string().email('Please enter an email address').required('Email is required'),
  password: Yup.string().trim('').required('Password is required'),
  phone: Yup.string().trim('').required('Phone Number is required'),
  address: Yup.string().trim('').required('Address is required'),
  city: Yup.string().trim('').required('City is required'),
  state: Yup.string().trim('').required('State is required'),
  occupation: Yup.string().trim('').required('Occupation is required'),
  school: Yup.string().trim('').required('School is required'),
});

export const SettingSchemaDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  occupation: '',
  school: '',
};
