/* eslint-disable */
import { doc, updateDoc } from "firebase/firestore";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, FormControl, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';

import { addUserAnonymousAction } from '../store/actions/AuthActions';
import { FormProvider, RHFTextField } from '../components/hook-form';
import { SettingSchema, SettingSchemaDefaultValues } from '../formSchemas/SettingSchema';
import { db } from "../utils/firebaseConfig";

function Settings() {
  const dispatch = useDispatch();
  const [formData, updateFormData] = useState({
    name: '',
    classDescription: '',
    classFee: '',
    days: [],
    subject: '',
    bannerUrl: null
  });

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

  const handleFileUpload = (key, e) => {
    console.log(e);
    updateFormData({ ...formData, [key]: e.target.files[0]})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const userDataRef = doc(db, 'users', user?.uid)
    const getDpRef = ref(storage, `images/${formData.dp.name}`);
    uploadBytes(getDpRef, formData.dp).then((snapshot) => {
        getDownloadURL(getDpRef).then(url => {
            addDoc(userDataRef, {
                dp: url,
                creator: {
                },
            }).then((res) => {
                setLoading(false);
                if(res?.id) window.open(`/dashboard/teacher/classroom/${res.id}`);
            }).catch((err) => {
                setLoading(false);
            })
        }).catch((err) => {
            setLoading(false);
        })
    }).catch((err) => {
        setLoading(false);
    })
  }

  const user = useSelector((state) => state.auth.user);
  const { firstName, lastName, email, phone, address, city, state, university, about, dp } = user;
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage("hn")
  }, [])

  return (
    <Container maxWidth="md">
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <RHFTextField
              id="outlined-disabled"
              name="firstName"
              label={<Trans i18nKey="studentDashboard.studentFirstName">First Name</Trans>}
              defaultValue={firstName}
              required
              fullWidth
              onChange={(e)=>handleFieldValueChange('firstName', e)}
            />
            <RHFTextField id="outlined-disabled" name="lastName" label={<Trans i18nKey="studentDashboard.studentLastName">Last Name</Trans>} defaultValue={lastName} required fullWidth onChange={(e)=>handleFieldValueChange('lastName', e)} />
          </Stack>
          <RHFTextField id="outlined-disabled" name="email" label={<Trans i18nKey="studentDashboard.studentEmail">Email</Trans>} defaultValue={email} required fullWidth onChange={(e)=>handleFieldValueChange('email', e)} disabled/>
          <RHFTextField id="outlined-disabled" name="about" label={<Trans i18nKey="studentDashboard.studentProfileAbout">About</Trans>} defaultValue={about} required fullWidth onChange={(e)=>handleFieldValueChange('about', e)} />
          <RHFTextField id="outlined-disabled" name="phone" label={<Trans i18nKey="studentDashboard.studentPhone">Phone</Trans>} defaultValue={phone} required fullWidth onChange={(e)=>handleFieldValueChange('phone', e)}/>
          <RHFTextField id="outlined-disabled" name="address" label={<Trans i18nKey="studentDashboard.studentAddress">Address</Trans>} defaultValue={address} required fullWidth onChange={(e)=>handleFieldValueChange('address', e)}/>
          <Stack direction="row" spacing={2}>
            <RHFTextField id="outlined-disabled" name="city" label={<Trans i18nKey="studentDashboard.studentCity">City</Trans>}  defaultValue={city} required fullWidth onChange={(e)=>handleFieldValueChange('city', e)}/>
            <RHFTextField id="outlined-disabled" name="state" label={<Trans i18nKey="studentDashboard.studentState">State</Trans>} defaultValue={state} required fullWidth onChange={(e)=>handleFieldValueChange('state', e)}/>
          </Stack>
          <RHFTextField id="outlined-disabled" name="school" label={<Trans i18nKey="studentDashboard.studentUniversity">University</Trans>} defaultValue={university} required fullWidth onChange={(e)=>handleFieldValueChange('university', e)}/>
          <FormControl variant="outlined" required>
            <Button variant="contained" component="label" color="info">
                {formData.dp ? 'Profile Photo Uploaded' : 'Upload Profile Picture'}
                <input type="file" hidden accept="image/png, image/gif, image/jpeg" onChange={(e) => {handleFileUpload("dp", e)}}/>
            </Button>
          </FormControl>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false} >
          <Trans i18nKey="studentDashboard.studentUpdateProfileButton">Update Profile</Trans>
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default Settings;
