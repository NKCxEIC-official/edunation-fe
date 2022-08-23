import * as Yup from 'yup';

export const EMAIL_VERIFY_SCHEMA = Yup.object().shape({
  email: Yup.string().trim().email('Please enter a valid email address.').required('Email is required'),
  agreed: Yup.boolean().isTrue('Please check the box above'),
});

export const EMAIL_VERIFY_SCHEMA_INITIAL = {
  email: '',
  agreed: false,
};
