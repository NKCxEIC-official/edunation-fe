import * as Yup from 'yup';

export const AddTeacherSchema = Yup.object().shape({
  firstName: Yup.string().trim('').required('First Name is required'),
  lastName: Yup.string().trim('').required('Last Name is required'),
  age: Yup.string().trim('').required('Age is required'),
  email: Yup.string().email('Please enter an email address').required('Email is required'),
  phone: Yup.string().trim('').required('Phone Number is required'),
  address: Yup.string().trim('').required('Address is required'),
  city: Yup.string().trim('').required('City is required'),
  state: Yup.string().trim('').required('State is required'),
  occupation: Yup.string().trim('').required('Occupation is required'),
  school: Yup.string().trim('').required('School is required'),
});

export const AddTeacherSchemaDefaultValues = {
  firstName: '',
  lastName: '',
  age: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  occupation: '',
  school: '',
};
