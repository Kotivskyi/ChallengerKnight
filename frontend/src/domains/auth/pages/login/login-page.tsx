import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { LoginRequest, LoginSchema } from '../../types';
import { LoginForm } from './login-form';
import { useLoginMutation } from '../../api/auth-api';
import { setUser } from '../../slice/auth-slice';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { ApiError } from '@/components/errors';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm<LoginRequest>({ resolver: zodResolver(LoginSchema) });
  const [apiErrors, setApiErrors] = React.useState<string[]>([]);

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await login(data).unwrap();
      if (user) {
        dispatch(setUser({ user }));
        navigate('/app');
      }
    } catch (error) {
      const apiErrors = formatApiError(error as FetchBaseQueryError | SerializedError);
      setApiErrors(apiErrors);
    }
  };

  return (
    <Box
      component={Paper}
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 40px)'
      }}
    >
      <Box
        sx={{
          width: { xs: '300px', md: '400px' },
          border: '1px solid #f3f6f999',
          padding: '20px'
        }}
      >
        <Typography component='div' variant='h6'>
          Welcome to School Admin !
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          Sign in to continue.
        </Typography>
        <LoginForm
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
          isFetching={isLoading}
        />
        <ApiError messages={apiErrors} />
      </Box>
    </Box>
  );
};
