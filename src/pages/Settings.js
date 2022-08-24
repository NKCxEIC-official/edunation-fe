/* eslint-disable */
import { doc, updateDoc } from "firebase/firestore";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/system';

import { addUserAnonymousAction } from '../store/actions/AuthActions';
import { FormProvider, RHFTextField } from '../components/hook-form';
import { SettingSchema, SettingSchemaDefaultValues } from '../formSchemas/SettingSchema';
import { db } from "../utils/firebaseConfig";

function Settings() {
  const dispatch = useDispatch();
  const [formData, updateFormData] = useState({});

  const methods = useForm({
    resolver: yupResolver(SettingSchema),
    SettingSchemaDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleFieldValueChange = (key, e) => {
    updateFormData({ ...formData, [key]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const userDataRef = doc(db, 'users', user?.uid)
    userDataRef && updateDoc(userDataRef, formData).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err)
    })
  };

  const user = useSelector((state) => state.auth.user);
  const { firstName, lastName, email, phone, address, city, state, university } = user;

  return (
    <Container maxWidth="md">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <RHFTextField
              id="outlined-disabled"
              name="firstName"
              label="First Name"
              defaultValue={firstName}
              required
              fullWidth
              onChange={(e)=>handleFieldValueChange('firstName', e)}
            />
            <RHFTextField id="outlined-disabled" name="lastName" label="Last Name" defaultValue={lastName} required fullWidth onChange={(e)=>handleFieldValueChange('lastName', e)} />
          </Stack>
          <RHFTextField id="outlined-disabled" name="email" label="Email" defaultValue={email} required fullWidth onChange={(e)=>handleFieldValueChange('email', e)} disabled/>
          <RHFTextField id="outlined-disabled" name="phone" label="Phone" defaultValue={phone} required fullWidth onChange={(e)=>handleFieldValueChange('phone', e)}/>
          <RHFTextField id="outlined-disabled" name="address" label="Address" defaultValue={address} required fullWidth onChange={(e)=>handleFieldValueChange('address', e)}/>
          <Stack direction="row" spacing={2}>
            <RHFTextField id="outlined-disabled" name="city" label="City" defaultValue={city} required fullWidth onChange={(e)=>handleFieldValueChange('city', e)}/>
            <RHFTextField id="outlined-disabled" name="state" label="State" defaultValue={state} required fullWidth onChange={(e)=>handleFieldValueChange('state', e)}/>
          </Stack>
          <RHFTextField id="outlined-disabled" name="school" label="University" defaultValue={university} required fullWidth onChange={(e)=>handleFieldValueChange('university', e)}/>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false} >
            Update Profile
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default Settings;
