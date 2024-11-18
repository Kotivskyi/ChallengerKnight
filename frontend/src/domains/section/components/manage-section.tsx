import * as React from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useAddNewSectionMutation, useUpdateSectionMutation } from '../api';
import { SectionForm } from '../types';

type ManageSectionProps = {
  id?: number;
  operation: 'Add' | 'Edit';
  methods: UseFormReturn<SectionForm>;
};

export const ManageSection: React.FC<ManageSectionProps> = ({ id, operation, methods }) => {
  const [addNewSection, { isLoading: isAddingSection }] = useAddNewSectionMutation();
  const [updateSection, { isLoading: isUpdatingSection }] = useUpdateSectionMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const handleSave = async (data: SectionForm) => {
    try {
      const { name } = data;
      const result =
        operation === 'Add'
          ? await addNewSection({ name }).unwrap()
          : await updateSection({ id: id!, name }).unwrap();

      reset();
      toast.info(result?.message);
      navigate('/app/sections');
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='subtitle1' sx={{ mb: 3 }}>
        {' '}
        {operation} Section{' '}
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <TextField
          {...register('name')}
          label='Section Name'
          fullWidth
          focused
          size='small'
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <Box textAlign='center'>
          <LoadingButton
            type='submit'
            size='small'
            variant='contained'
            sx={{ mt: 4 }}
            loading={isAddingSection || isUpdatingSection}
          >
            Save
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};
