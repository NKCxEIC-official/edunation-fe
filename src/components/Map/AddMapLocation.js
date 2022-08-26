import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { addRedSpotAction, addUserAnonymousAction } from '../../store/actions/AuthActions';
import { AddRedSpotSchema, AddRedSpotSchemaDefaultValues } from '../../formSchemas/AddRedSpotSchema';
import { FormProvider, RHFTextField } from '../hook-form';

function AddMapLocation({ selectedLocation, coords }) {
  const user = useSelector((state) => state.auth.user);
  const showLoading = useSelector((state) => state.auth.showLoading);

  const methods = useForm({
    resolver: yupResolver(AddRedSpotSchema),
    AddRedSpotSchemaDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  useEffect(() => {
    setValue('address', selectedLocation);
  }, []);

  const dispatch = useDispatch();

  const onSubmit = async (payload) => {
    const newPayload = {
      ...payload,
      coords,
      redSPotId: payload.redSPotName.replace(/ +/g, '-').toLowerCase(),
      addedBy: user.uid,
    };
    console.log("🚀 ~ file: AddMapLocation.js ~ line 34 ~ onSubmit ~ newPayload", newPayload)
    dispatch(addUserAnonymousAction({ 
      // ...payload, role: 1, isTeacher: false, isVerified: false 

      address : payload.address,
      email: payload.POCEmail,
      firstName: payload.POCName,
      isPoc: true,
      lastName: payload.POCName,
      phone: payload.POCPhone,
      role: 3,
      isVerified: false,
      // city:
      // state: payload?.name?.split(" ")[1],
      // "WEST BENGAL"

    }, user));
    dispatch(addRedSpotAction(newPayload));
    
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField fullWidth name="address" label="selected Address" />
        <RHFTextField fullWidth name="redSPotName" label="Red Spot Name" />
        <RHFTextField fullWidth name="POCName" label="POC Name" />
        <RHFTextField fullWidth name="POCPhone" label="POC Phone" />
        <RHFTextField fullWidth name="POCEmail" label="POC EMail" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={showLoading}>
          Add Red Spot
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default AddMapLocation;
