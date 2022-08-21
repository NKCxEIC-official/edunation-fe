import { DateTimePicker, LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { ADD_EXAM_SETTINGS_SCHEMA, ADD_EXAM_SETTINGS_SCHEMA_INITIAL } from '../../Form/Schema';

function AddExamSettingsForm() {
  const formik = useFormik({
    initialValues: ADD_EXAM_SETTINGS_SCHEMA_INITIAL,
    validationSchema: ADD_EXAM_SETTINGS_SCHEMA,
    onSubmit: () => {},
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const { errors, touched, values, setFieldValue, isSubmitting, handleSubmit, getFieldProps } = formik;

  const questionCategory = ['Aptitude', 'Coding'];

  return (
    <FormikProvider value={formik}>
      <Typography variant="h4">Add New Exam</Typography>

      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="examTitle"
              type="text"
              label="Exam Title"
              {...getFieldProps('examTitle')}
              error={Boolean(touched.examTitle && errors.examTitle)}
              helperText={touched.examTitle && errors.examTitle}
              id="outlined-basic"
              variant="standard"
              required
            />
            <TextField
              fullWidth
              autoComplete="exam description"
              type="text"
              label="Exam Description"
              {...getFieldProps('examDesc')}
              error={Boolean(touched.examDesc && errors.examDesc)}
              helperText={touched.examDesc && errors.examDesc}
              id="outlined-basic"
              variant="standard"
              required
              multiline
              rows={4}
            />
            <Stack direction="row" spacing={3}>
              <DateTimePicker
                label="Exam starts from"
                disablePast
                hideTabs
                {...getFieldProps('startsFrom')}
                renderInput={(params) => (
                  <TextField
                    disabled
                    {...params}
                    fullWidth
                    variant="standard"
                    {...getFieldProps('startsFrom')}
                    error={Boolean(touched.startsFrom && errors.startsFrom)}
                    helperText={touched.startsFrom && errors.startsFrom}
                  />
                )}
                onChange={(newValue) => {
                  setFieldValue('startsFrom', newValue);
                }}
                error={Boolean(touched.startsFrom && errors.startsFrom)}
              />

              <DateTimePicker
                label="Exam ends on"
                renderInput={(params) => (
                  <TextField
                    disabled
                    {...params}
                    fullWidth
                    variant="standard"
                    {...getFieldProps('endsOn')}
                    error={Boolean(touched.endsOn && errors.endsOn)}
                    helperText={touched.endsOn && errors.endsOn}
                  />
                )}
                {...getFieldProps('endsOn')}
                onChange={(newValue) => {
                  setFieldValue('endsOn', newValue);
                }}
                minDateTime={values.startsFrom}
                minTime={values.startsFrom}
                disablePast
                hideTabs
                error={Boolean(touched.endsOn && errors.endsOn)}
              />
            </Stack>

            <Divider>Exam Settings</Divider>

            <FieldArray {...getFieldProps(`examSettings`)}>
              {({ push, remove }) =>
                values.examSettings.map((_, index) => (
                  <Stack direction="row" spacing={2} key={index}>
                    <Stack style={{ minWidth: '200px' }}>
                      <FormControl>
                        <InputLabel id="select-category">Select Category</InputLabel>
                        <Select
                          labelId="select-category"
                          id="select-category"
                          multiple={false}
                          {...getFieldProps(`examSettings[${index}].category`)}
                          onChange={(e) => setFieldValue(`examSettings[${index}].category`, e.target.value)}
                          input={
                            <Input
                              id="select-multiple-chip"
                              label="Select Category"
                              variant="standard"
                              error={Boolean(
                                Array.isArray(errors.examSettings)
                                  ? touched.examSettings &&
                                      Array.isArray(touched.examSettings) &&
                                      touched.examSettings.length > 0 &&
                                      touched.examSettings[index]?.category &&
                                      Array.isArray(errors.examSettings) &&
                                      errors.examSettings.length > 0 &&
                                      errors.examSettings[index]?.category
                                  : errors.examSettings
                              )}
                            />
                          }
                          MenuProps={MenuProps}
                        >
                          {questionCategory.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                              {cat}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormHelperText
                        error={Boolean(
                          Array.isArray(errors.examSettings)
                            ? touched.examSettings &&
                                Array.isArray(touched.examSettings) &&
                                touched.examSettings.length > 0 &&
                                touched.examSettings[index]?.category &&
                                Array.isArray(errors.examSettings) &&
                                errors.examSettings.length > 0 &&
                                errors.examSettings[index]?.category
                            : errors.examSettings
                        )}
                      >
                        {Array.isArray(errors.examSettings)
                          ? touched.examSettings &&
                            Array.isArray(touched.examSettings) &&
                            touched.examSettings.length > 0 &&
                            touched.examSettings[index]?.category &&
                            Array.isArray(errors.examSettings) &&
                            errors.examSettings.length > 0 &&
                            errors.examSettings[index]?.category
                          : errors.examSettings}
                      </FormHelperText>
                    </Stack>
                    <TextField
                      fullWidth
                      autoComplete="no of question"
                      type="number"
                      label="No. Of Questions"
                      {...getFieldProps(`examSettings[${index}].noOfQuestions`)}
                      error={Boolean(
                        Array.isArray(errors.examSettings)
                          ? touched.examSettings &&
                              Array.isArray(touched.examSettings) &&
                              touched.examSettings.length > 0 &&
                              touched.examSettings[index]?.noOfQuestions &&
                              Array.isArray(errors.examSettings) &&
                              errors.examSettings.length > 0 &&
                              errors.examSettings[index]?.noOfQuestions
                          : errors.examSettings
                      )}
                      helperText={
                        Array.isArray(errors.examSettings)
                          ? touched.examSettings &&
                            Array.isArray(touched.examSettings) &&
                            touched.examSettings.length > 0 &&
                            touched.examSettings[index]?.noOfQuestions &&
                            Array.isArray(errors.examSettings) &&
                            errors.examSettings.length > 0 &&
                            errors.examSettings[index]?.noOfQuestions
                          : errors.examSettings
                      }
                      id="outlined-basic"
                      variant="standard"
                      required
                    />

                    <TextField
                      fullWidth
                      autoComplete="marks"
                      type="number"
                      label="Marks (per question)"
                      {...getFieldProps(`examSettings[${index}].marksPerQuestion`)}
                      error={Boolean(
                        Array.isArray(errors.examSettings)
                          ? touched.examSettings &&
                              Array.isArray(touched.examSettings) &&
                              touched.examSettings.length > 0 &&
                              touched.examSettings[index]?.marksPerQuestion &&
                              Array.isArray(errors.examSettings) &&
                              errors.examSettings.length > 0 &&
                              errors.examSettings[index]?.marksPerQuestion
                          : errors.examSettings
                      )}
                      helperText={
                        Array.isArray(errors.examSettings)
                          ? touched.examSettings &&
                            Array.isArray(touched.examSettings) &&
                            touched.examSettings.length > 0 &&
                            touched.examSettings[index]?.marksPerQuestion &&
                            Array.isArray(errors.examSettings) &&
                            errors.examSettings.length > 0 &&
                            errors.examSettings[index]?.marksPerQuestion
                          : errors.examSettings
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
                      onClick={() =>
                        push({
                          category: '',
                          noOfQuestions: '',
                          marksPerQuestion: '',
                        })
                      }
                    >
                      +
                    </IconButton>
                  </Stack>
                ))
              }
            </FieldArray>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Add Question
            </LoadingButton>
          </Stack>
        </LocalizationProvider>
      </Form>
    </FormikProvider>
  );
}

export default AddExamSettingsForm;
