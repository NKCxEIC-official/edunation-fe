import * as Yup from 'yup';

export const ADD_QUERY_SCHEMA = Yup.object().shape({
  queryTitle: Yup.string().trim().required('Please enter a query title'),
  message: Yup.string().trim().required('Please describe your query'),
});

export const ADD_QUERY_SCHEMA_INITIAL = {
  queryTitle: '',
  message: '',
};

export const ANSWER_QUERY_SCHEMA = Yup.object().shape({
  answer: Yup.string().required('Answer is required'),
});

export const ANSWER_QUERY_SCHEMA_INITIAL = {
  answer: '',
};
