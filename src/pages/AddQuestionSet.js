import { LoadingButton } from '@mui/lab';
import { Button, Checkbox, FormControlLabel, IconButton, Stack, Switch, TextField, Typography } from '@mui/material';
import { push } from 'firebase/database';
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { ADD_QUESTION_SCHEMA, ADD_QUESTION_SCHEMA_INITIAL } from '../Form/Schema';
import './style.css';

function AddQuestionSet({ title }) {
  const formik = useFormik({
    initialValues: ADD_QUESTION_SCHEMA_INITIAL,
    validationSchema: ADD_QUESTION_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const questionFileRef = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState();

  const handleQuestionFileChange = (e) => {
    if (e.target.files.length > 0) {
      console.log(URL.createObjectURL(e.target.files[0]));
      setSelectedFileName(e.target.files[0].name);
      setSelectedFile(e.target.files[0]);
    }
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Typography variant="h4">Add Question Set</Typography>

      <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="name"
            type="text"
            label="Question Set Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            id="outlined-basic"
            variant="standard"
            required
          />

          <TextField
            fullWidth
            autoComplete="description"
            type="text"
            label="Question Set Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
            id="outlined-basic"
            variant="standard"
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            autoComplete="color"
            type="text"
            label="Question Set Color"
            {...getFieldProps('color')}
            error={Boolean(touched.color && errors.color)}
            helperText={touched.color && errors.color}
            id="outlined-basic"
            variant="standard"
          />

          <TextField
            fullWidth
            autoComplete="duration"
            type="text"
            label="Question Set Duration"
            {...getFieldProps('duration')}
            error={Boolean(touched.duration && errors.duration)}
            helperText={touched.duration && errors.duration}
            id="outlined-basic"
            variant="standard"
          />

          {/* Add Question */}

          <FieldArray {...getFieldProps(`questions`)}>
            {({ push, remove }) => (
              <>
                <Stack>
                  {values?.questions.map((_, index) => (
                    <Stack direction="row" key={index} spacing={2}>
                      <TextField
                        fullWidth
                        autoComplete="question"
                        type="text"
                        label="Question Title"
                        {...getFieldProps('question')}
                        error={Boolean(touched.question && errors.question)}
                        helperText={touched.question && errors.question}
                        id="outlined-basic"
                        variant="standard"
                        required
                      />

                      <Stack direction="row" alignItems="center">
                        <span style={{ marginRight: '10px' }}>Descriptive</span>
                        <FormControlLabel control={<Switch {...getFieldProps('mcq')} />} label="MCQ" />
                      </Stack>
                      {values.mcq && (
                        <FieldArray {...getFieldProps(`options`)}>
                          {({ push, remove }) => (
                            <>
                              <Stack>
                                {values.options.map((_, index) => (
                                  <Stack direction="row" key={index} spacing={2}>
                                    <Stack>
                                      <Checkbox
                                        onChange={(e) =>
                                          setFieldValue(`options[${index}].correctAnswer`, e.target.checked)
                                        }
                                      />

                                      <small style={{ opacity: 0.5 }}>Answer</small>
                                    </Stack>

                                    <TextField
                                      fullWidth
                                      autoComplete={`option-${index}`}
                                      type="text"
                                      label={`option ${index + 1}`}
                                      {...getFieldProps(`options[${index}].label`)}
                                      error={Boolean(
                                        Array.isArray(errors.options)
                                          ? touched.options &&
                                              Array.isArray(touched.options) &&
                                              touched.options.length > 0 &&
                                              touched.options[index]?.label &&
                                              Array.isArray(errors.options) &&
                                              errors.options.length > 0 &&
                                              errors.options[index]?.label
                                          : errors.options
                                      )}
                                      helperText={
                                        Array.isArray(errors.options)
                                          ? touched.options &&
                                            Array.isArray(touched.options) &&
                                            touched.options.length > 0 &&
                                            touched.options[index]?.label &&
                                            Array.isArray(errors.options) &&
                                            errors.options.length > 0 &&
                                            errors.options[index]?.label
                                          : errors.options
                                      }
                                      id="outlined-basic"
                                      variant="standard"
                                      required
                                    />
                                    <IconButton aria-label="delete" size="small" onClick={() => remove(index)}>
                                      -
                                    </IconButton>
                                    <IconButton
                                      aria-label="delete"
                                      size="small"
                                      onClick={() => push({ label: '', correctAnswer: false })}
                                    >
                                      +
                                    </IconButton>
                                  </Stack>
                                ))}
                              </Stack>
                            </>
                          )}
                        </FieldArray>
                      )}
                      <div className="separator">OR</div>

                      <input
                        type="file"
                        id="upload"
                        label="Outlined"
                        variant="outlined"
                        onChange={handleQuestionFileChange}
                        style={{ display: 'none' }}
                        ref={questionFileRef}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      />
                      <IconButton aria-label="delete" size="small" onClick={() => remove(index)}>
                        -
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => push({ label: '', correctAnswer: false })}
                      >
                        +
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              </>
            )}
          </FieldArray>

          <Button variant="outlined" onClick={() => push(ADD_QUESTION_SCHEMA_INITIAL)}>
            Add Question
          </Button>
          {selectedFileName}

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            {selectedFile ? 'Upload Questions' : 'Submit Question Set'}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default AddQuestionSet;
