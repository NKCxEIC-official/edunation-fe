import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { EMAIL_VERIFY_SCHEMA, EMAIL_VERIFY_SCHEMA_INITIAL } from '../../Form/Schema';

function VerifyEmail({ title }) {
  const formik = useFormik({
    initialValues: EMAIL_VERIFY_SCHEMA_INITIAL,
    validationSchema: EMAIL_VERIFY_SCHEMA,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Typography variant="h4">{title}</Typography>

      <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email Address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            id="outlined-basic"
            variant="standard"
            required
          />
          <FormGroup>
            <InputLabel sx={{ mb: 2 }} required>
              Declaration
            </InputLabel>

            <FormControlLabel
              control={<Checkbox required {...getFieldProps('agreed')} />}
              label="I will not consult/copy code from any source including a website, book, or friend/colleague to complete these tests, though may reference language documentation or use an IDE that has code completion features."
            />

            <FormHelperText error={Boolean(touched.agreed && errors.agreed)}>
              {touched.agreed && errors.agreed}
            </FormHelperText>
          </FormGroup>
          <LoadingButton
            sx={{
              width: 'fit-content',
            }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Agree & Start
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default VerifyEmail;
