import * as Yup from 'yup';

export const ADD_QUESTION_SCHEMA = Yup.object().shape({
    name: Yup.string().required('Question Set Title is required'),
    description: Yup.string(),
    color: Yup.string(),
    duration: Yup.string().required('Question Set Duration is required'),
    questions: Yup.array(
      Yup.object({
        question: Yup.string().required('Question Title is required'),
        options: Yup.array(
          Yup.object({
            option: Yup.string().required('Option is required'),
            isCorrect: Yup.boolean().required('Correct answer is required'),
          })
        )
        .min(2)
        .max(4, 'Maximum no. of options allowed is 4'),
      })
    )
})
  // Yup.object().shape([
  //   {
  //     questionTitle: Yup.string().required('Question Title is required'),
  //     options: Yup.array(
  //       Yup.object({
  //         label: Yup.string().required('Option is required'),
  //         correctAnswer: Yup.boolean().required('Correct answer is required'),
  //       })
  //     )
  //       .min(2)
  //       .max(4, 'Maximum no. of options allowed is 4'),
  //   },
  // ])

// Yup.object().shape({
//   questionTitle: Yup.string().required('Question Title is required'),
//   options: Yup.array(
//     Yup.object({
//       label: Yup.string().required('Option is required'),
//       correctAnswer: Yup.boolean().required('Correct answer is required'),
//     })
//   )
//     .min(2)
//     .max(4, 'Maximum no. of options allowed is 4'),
// });

// 
// "values": {
//   "fullName": "",
//   "donationsAmount": 0,
//   "termsAndConditions": false,
//   "donations": [
//       {
//           "institution": "",
//           "percentage": 0
//       },
//       {
//           "institution": "",
//           "percentage": 0
//       },
//       {
//           "institution": "",
//           "percentage": 0
//       },
//       {
//           "institution": "",
//           "percentage": 0
//       },
//       {
//           "institution": "",
//           "percentage": 0
//       },
//       {
//           "institution": "",
//           "percentage": 0
//       }
//   ]
// },

export const ADD_QUESTION_SCHEMA_INITIAL = [
  {
    name: '',
    description: '',
    color: '',
    duration: '',
    questions: [
      {
        question: '',
        options: [
          {
            option: '',
            isCorrect: false,
          }
        ]
      }
    ]
  },
];

export const ADD_CATEGORY_SCHEMA = Yup.object().shape({
  categoryName: Yup.string().trim().required('Category name is required'),
});

export const ADD_CATEGORY_SCHEMA_INITIAL = {
  categoryName: '',
};
