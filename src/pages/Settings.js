import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
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

  const user = useSelector((state) => state.auth.user);
  const { firstName, lastName, email, phone, address, city, state, university } = user;

  return (
    <Container maxWidth="md">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <RHFTextField
              id="outlined-disabled"
              name="firstName"
              label="First Name"
              defaultValue={firstName}
              fullWidth
            />
            <RHFTextField id="outlined-disabled" name="lastName" label="Last Name" defaultValue={lastName} fullWidth />
          </Stack>
          <RHFTextField id="outlined-disabled" name="email" label="Email" defaultValue={email} fullWidth />
          {/* <RHFTextField id="outlined-disabled" name="password" label="Password" fullWidth /> */}
          <RHFTextField id="outlined-disabled" name="phone" label="Phone" defaultValue={phone} fullWidth />
          <RHFTextField id="outlined-disabled" name="address" label="Address" defaultValue={address} fullWidth />
          <Stack direction="row" spacing={2}>
            <RHFTextField id="outlined-disabled" name="city" label="City" defaultValue={city} fullWidth />
            <RHFTextField id="outlined-disabled" name="state" label="City" defaultValue={state} fullWidth />
          </Stack>
          <RHFTextField id="outlined-disabled" name="school" label="University" defaultValue={university} fullWidth />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
            Update Profile
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default Settings;
