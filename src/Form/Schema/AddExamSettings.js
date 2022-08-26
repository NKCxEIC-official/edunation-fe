import * as Yup from 'yup';

export const ADD_EXAM_SETTINGS_SCHEMA = Yup.object().shape({
  examTitle: Yup.string().trim().required('Please enter a exam title'),
  examDesc: Yup.string().trim().required('Please enter exam description'),
  examSettings: Yup.array(
    Yup.object({
      category: Yup.string().trim().required('category is required'),
      noOfQuestions: Yup.string().trim().required('No. Of questions is required'),
      marksPerQuestion: Yup.string().trim().required('Marks per question is required'),
    })
  ).min(1, 'Minimum one section is required'),
  startsFrom: Yup.date()
    .typeError('Please enter date in proper format - mm/dd/yyyy hh:mm (am/pm)')
    .required('Exam starts from is required'),
  endsOn: Yup.date()
    .typeError('Please enter date in proper format - mm/dd/yyyy hh:mm (am/pm)')
    .required('Exam ends on is required'),
});

export const ADD_EXAM_SETTINGS_SCHEMA_INITIAL = {
  examTitle: '',
  examDesc: '',
  startsFrom: new Date(),
  endsOn: new Date(),
  examSettings: [
    {
      category: '',
      noOfQuestions: '',
      marksPerQuestion: '',
    },
  ],
};
