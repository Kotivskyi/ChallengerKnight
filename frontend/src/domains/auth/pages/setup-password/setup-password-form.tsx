import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid2, TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { SetupPasswordProps } from '../../types';

type SetupPasswordFormProps = {
  methods: UseFormReturn<SetupPasswordProps>;
  isLoading: boolean;
  clearForm: () => void;
  onSubmit: () => void;
};

export const SetupPasswordForm: React.FC<SetupPasswordFormProps> = ({
  methods,
  isLoading,
  clearForm,
  onSubmit
}) => {
  const {
    register,
    formState: { errors }
  } = methods;

  return (
    <form onSubmit={onSubmit}>
      <Grid2 container spacing={2} sx={{ mt: 3 }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <TextField
            size='small'
            label='Username'
            fullWidth
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }} />

        <Grid2 size={{ xs: 12, md: 6 }}>
          <TextField
            size='small'
            type='password'
            label='Password'
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <TextField
            size='small'
            type='password'
            label='Confirm Password'
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </Grid2>
      </Grid2>
      <Box sx={{ mt: 4 }}>
        <Button
          type='button'
          size='small'
          variant='text'
          onClick={clearForm}
          color='error'
          sx={{ mr: 1 }}
        >
          Clear
        </Button>
        <LoadingButton loading={isLoading} type='submit' size='small' variant='contained'>
          Setup Password
        </LoadingButton>
      </Box>
    </form>
  );
};
