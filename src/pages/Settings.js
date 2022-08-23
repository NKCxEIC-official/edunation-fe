import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/system';

import { addUserAnonymousAction } from '../store/actions/AuthActions';
import { FormProvider, RHFTextField } from '../components/hook-form';
import { SettingSchema, SettingSchemaDefaultValues } from '../formSchemas/SettingSchema';

function Settings() {
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(SettingSchema),
    SettingSchemaDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (payload) => {
    dispatch(addUserAnonymousAction({ ...payload, role: 1, isTeacher: true, isVerified: false }));
  };
  return (
    <Container maxWidth="md">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <RHFTextField id="outlined-disabled" name="firstName" label="First Name" fullWidth />
            <RHFTextField id="outlined-disabled" name="lastName" label="Last Name" fullWidth />
          </Stack>
          <RHFTextField id="outlined-disabled" name="email" label="Email ID" fullWidth />
          <RHFTextField id="outlined-disabled" name="password" label="Password" fullWidth />
          <RHFTextField id="outlined-disabled" name="phone" label="Phone" fullWidth />
          <RHFTextField id="outlined-disabled" name="address" label="Address" fullWidth />
          <Stack direction="row" spacing={2}>
            <RHFTextField id="outlined-disabled" name="city" label="City" fullWidth />
            <RHFTextField id="outlined-disabled" name="state" label="State" fullWidth />
          </Stack>
          <RHFTextField id="outlined-disabled" name="school" label="University/School" fullWidth />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
            Update Profile
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default Settings;
