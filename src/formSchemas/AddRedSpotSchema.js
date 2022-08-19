import * as Yup from 'yup';

export const AddRedSpotSchema = Yup.object().shape({
  address: Yup.string().trim('').required('Address is required'),
  POCName: Yup.string().trim('').required('POC Name is required'),
  POCEmail: Yup.string().email('Please enter an email address').required('POC Email is required'),
  POCPhone: Yup.string().trim('').required('POC Phone is required'),
  redSPotName: Yup.string().trim('').required('Red spot name is required'),
});

export const AddRedSpotSchemaDefaultValues = {
  address: '',
  POCName: '',
  POCEmail: '',
  POCPhone: '',
  redSPotName: '',
};
