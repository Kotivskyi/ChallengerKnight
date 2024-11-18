import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid2, Paper, TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useChangePwdMutation } from '@/domains/auth/api';
import { PasswordProps, PasswordSchema } from '@/domains/auth/types';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

export const ChangePassword = () => {
  const [changePassword, { isLoading: isChangingPassword }] = useChangePwdMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<PasswordProps>({
    defaultValues: initialState,
    resolver: zodResolver(PasswordSchema)
  });
  const clearForm = () => {
    reset(initialState);
  };
  const onSave = async (data: PasswordProps) => {
    try {
      const result = await changePassword(data).unwrap();
      toast.info(result.message);
      reset(initialState);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Paper sx={{ p: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              size='small'
              type='password'
              label='Old Password'
              fullWidth
              {...register('oldPassword')}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }} />

          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextField
              size='small'
              type='password'
              label='New Password'
              fullWidth
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
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
          <LoadingButton
            loading={isChangingPassword}
            type='submit'
            size='small'
            variant='contained'
          >
            Change Password
          </LoadingButton>
        </Box>
      </Paper>
    </form>
  );
};
