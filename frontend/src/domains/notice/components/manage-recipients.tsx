import * as React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { NoticeRecipient } from '../types';
import { useAddNoticeRecipientMutation, useUpdateNoticeRecipientMutation } from '../api';
import { useGetRoles } from '@/domains/staff/hooks';

type ManageNoticeRecipientsProps = {
  id?: number;
  operation: 'Add' | 'Edit';
  methods: UseFormReturn<NoticeRecipient>;
};

export const ManageNoticeRecipients: React.FC<ManageNoticeRecipientsProps> = ({
  id,
  operation,
  methods
}) => {
  const roles = useGetRoles();
  const [addNewRecipient, { isLoading: isAddingNoticeRecipient }] = useAddNoticeRecipientMutation();
  const [updateRecipient, { isLoading: isUpdatingNoticeRecipient }] =
    useUpdateNoticeRecipientMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = methods;

  const handleSave = async (data: NoticeRecipient) => {
    try {
      const result =
        operation === 'Add'
          ? await addNewRecipient(data).unwrap()
          : await updateRecipient({ id: id!, ...data }).unwrap();

      reset();
      toast.info(result?.message);
      navigate('/app/notices/recipients');
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='subtitle1' sx={{ mb: 3 }}>
        {' '}
        {operation} Notice Recipient
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <FormControl fullWidth sx={{ mt: 2 }} size='small' error={Boolean(errors.roleId)}>
          <InputLabel id='role-for-dropdown' shrink>
            Roles
          </InputLabel>
          <Controller
            name='roleId'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  labelId='role-for-dropdown'
                  label='Teacher'
                  value={value}
                  onChange={onChange}
                  notched
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }} size='small'>
          <TextField
            {...register('primaryDependentName')}
            label='Primary Dependent Name'
            fullWidth
            size='small'
            error={!!errors.primaryDependentName}
            helperText={errors.primaryDependentName?.message}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }} size='small'>
          <TextField
            {...register('primaryDependentSelect')}
            label='Primary Dependent Select'
            fullWidth
            size='small'
            error={!!errors.primaryDependentSelect}
            helperText={errors.primaryDependentSelect?.message}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </FormControl>

        <Box textAlign='center'>
          <LoadingButton
            type='submit'
            size='small'
            variant='contained'
            sx={{ mt: 4 }}
            loading={isAddingNoticeRecipient || isUpdatingNoticeRecipient}
          >
            Save
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};
