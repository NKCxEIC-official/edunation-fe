import * as Yup from 'yup';

export const ADD_LEAVE_SCHEMA = Yup.object().shape({
  startDate: Yup.date().required('Please enter a Start Date'),
  endDate: Yup.date().required('Please enter a End Date'),
  reason: Yup.string().required('Please enter leave reason'),
  title: Yup.string().required('Please enter title for leave'),
  requestedTo: Yup.array().min(1, 'Please select the approval authorities for leave'),
});

export const ADD_LEAVE_SCHEMA_INITIAL = {
  endDate: new Date(),
  startDate: new Date(),
  reason: '',
  halfDay: false,
  title: '',
  applicantEmployeeCode: '',
  requestedTo: [],
  approvedBy: [],
};
