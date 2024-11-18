import * as React from 'react';
import { Edit } from '@mui/icons-material';
import { Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetStaffDetail } from '../../hooks';
import { StaffFormProps, StaffFormSchema } from '../../types';
import {
  Address,
  BasicInformation,
  OtherInformation,
  ParentsInformation,
  staffInitialState
} from '../forms';
import { useUpdateStaffMutation } from '../../api/staff-api';

type StaffAccountEditProps = {
  id?: string;
  redirectPath: string;
  heading: string;
};
type StaffDetailValue<T> = T extends { [key: string]: infer U } ? U : never;

export const StaffAccountEdit: React.FC<StaffAccountEditProps> = ({
  id,
  redirectPath,
  heading
}) => {
  const staffDetail = useGetStaffDetail(id);
  const [updateStaff, { isLoading: isUpdatingStaff }] = useUpdateStaffMutation();
  const navigate = useNavigate();

  const methods = useForm<StaffFormProps>({
    defaultValues: staffInitialState,
    resolver: zodResolver(StaffFormSchema)
  });

  React.useEffect(() => {
    if (staffDetail) {
      const { setValue } = methods;
      for (const [key, value] of Object.entries(staffDetail) as [
        keyof StaffFormProps,
        StaffDetailValue<StaffFormProps>
      ][]) {
        if (['dob', 'joinDate'].includes(key)) {
          setValue(key, typeof value === 'string' ? parseISO(value) : value);
        } else {
          setValue(key, value);
        }
      }
    }
  }, [staffDetail, methods]);

  const onUpdateStaff = async (data: StaffFormProps) => {
    try {
      const result = await updateStaff({ id: Number(id)!, ...data }).unwrap();
      toast.info(result.message);
      navigate(redirectPath);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <PageContentHeader icon={<Edit sx={{ mr: 1 }} />} heading={heading} />
      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <BasicInformation />

          <hr />
          <Address />

          <hr />
          <ParentsInformation />

          <hr />
          <OtherInformation />
        </FormProvider>
        <hr />
        <Stack alignItems='center' justifyContent='center'>
          <LoadingButton
            loading={isUpdatingStaff}
            size='small'
            variant='contained'
            color='primary'
            onClick={methods.handleSubmit(onUpdateStaff)}
          >
            Save
          </LoadingButton>
        </Stack>
      </Paper>
    </>
  );
};
