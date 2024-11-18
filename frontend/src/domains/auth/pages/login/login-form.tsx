import * as React from 'react';
import { Stack, TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { LoginRequest } from '../../types';

type LoginFormProps = {
  onSubmit: () => void;
  methods: UseFormReturn<LoginRequest>;
  isFetching: boolean;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, methods, isFetching }) => {
  const {
    register,
    formState: { errors }
  } = methods;

  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField
          size='small'
          type='text'
          label='Username'
          sx={{ margin: '30px 0' }}
          fullWidth
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </div>
      <div>
        <TextField
          size='small'
          type='password'
          label='Password'
          sx={{ marginBottom: '30px' }}
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </div>
      <Stack>
        <LoadingButton loading={isFetching} type='submit' size='small' variant='contained'>
          <span>Sign In</span>
        </LoadingButton>
      </Stack>
    </form>
  );
};
