import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

import { signupAction } from '../../../store/actions/AuthActions';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (payload) => {
    dispatch(signupAction(payload));
  };

  useEffect(() => {
    if ('role' in user) {
      if (user.role === 1) {
        if (user.isTeacher) navigate('/dashboard/teacher/app', { replace: true });
        else navigate('/dashboard/student/app', { replace: true });
      } else if (user.role === 0) navigate('/dashboard/ngo/app', { replace: true });
    }
  }, [user]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {auth && auth.errorMessage && (
          <Box sx={{ p: 2, backgroundColor: 'danger.light', mb: 2 }}>{auth.errorMessage}</Box>
        )}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={auth.showLoading}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
