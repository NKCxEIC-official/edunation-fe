import { LoadingButton } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { addUserAnonymousAction, HideModalAction } from '../../../store/actions/AuthActions';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { AddTeacherSchemaDefaultValues, AddTeacherSchema } from '../../../formSchemas/AddTeacher';

function AddStudent({ handleClose }) {
  console.log(handleClose);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const methods = useForm({
    resolver: yupResolver(AddTeacherSchema),
    AddTeacherSchemaDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (payload) => {
    dispatch(addUserAnonymousAction({ ...payload, role: 1, isTeacher: false, isVerified: false }, user));
    dispatch(HideModalAction(true));
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    changeLanguage("bn")
  }, [])


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <RHFTextField id="outlined-disabled" name="firstName" label={<Trans i18nKey="NgoTeachersList.NgoFirstName">
            First Name
          </Trans>} fullWidth />
          <RHFTextField id="outlined-disabled" name="lastName" label={<Trans i18nKey="NgoTeachersList.NgoLastName">
            Last Name
          </Trans>} fullWidth />
        </Stack>
        <RHFTextField id="outlined-disabled" name="age" label={<Trans i18nKey="NgoTeachersList.NgoAge">
          Age
        </Trans>} fullWidth />
        <RHFTextField id="outlined-disabled" name="email" label={<Trans i18nKey="NgoTeachersList.NgoEmailId">
          Email
        </Trans>} fullWidth />
        <RHFTextField id="outlined-disabled" name="phone" label={<Trans i18nKey="NgoTeachersList.NgoPhone">
          Phone
        </Trans>} fullWidth />
        <RHFTextField id="outlined-disabled" name="address" label={<Trans i18nKey="NgoTeachersList.NgoAddress">
          Address
        </Trans>} fullWidth />
        <Stack direction="row" spacing={2}>
          <RHFTextField id="outlined-disabled" name="city" label={<Trans i18nKey="NgoTeachersList.NgoCity">
            City
          </Trans>} fullWidth />
          <RHFTextField id="outlined-disabled" name="state" label={<Trans i18nKey="NgoTeachersList.NgoState">
            State
          </Trans>} fullWidth />
        </Stack>
        <RHFTextField id="outlined-disabled" name="occupation" label={<Trans i18nKey="NgoTeachersList.NgoOccupation">
          Occupation
        </Trans>} fullWidth />
        <RHFTextField id="outlined-disabled" name="school" label={<Trans i18nKey="NgoTeachersList.NgoUniversity">
          University/School
        </Trans>} fullWidth />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
          <Trans i18nKey="NgoStudentsList.NgoAddStudent">
            Add Teacher
          </Trans>
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default AddStudent;
