import { Button, Paper, Stack } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { useAddStudentMutation } from '../api/student-api';
import { StudentProps, StudentSchema } from '../types';
import { studentFormInitialState } from '../reducer';
import {
  AcademicInformation,
  AddressInformation,
  BasicInformation,
  ParentsAndGuardianInformation
} from '../components/forms';

export const AddStudent = () => {
  const [addStudent, { isLoading }] = useAddStudentMutation();

  const navigate = useNavigate();

  const methods = useForm<StudentProps>({
    defaultValues: studentFormInitialState,
    resolver: zodResolver(StudentSchema)
  });

  const onReset = () => {
    methods.reset();
  };

  const onSave = async (data: StudentProps) => {
    try {
      const { dob, admissionDate, ...rest } = data;

      const payload = {
        ...rest,
        dob: getFormattedDate(dob, API_DATE_FORMAT),
        admissionDate: getFormattedDate(admissionDate, API_DATE_FORMAT)
      };

      const result = await addStudent(payload).unwrap();
      toast.info(result.message);
      navigate(`/app/students`);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <PageContentHeader icon={<AddCircleOutline sx={{ mr: 1 }} />} heading='Add Student' />
      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <BasicInformation />

          <hr />
          <AcademicInformation />

          <hr />
          <ParentsAndGuardianInformation />

          <hr />
          <AddressInformation />

          <hr />
          <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
            <Button
              size='small'
              variant='contained'
              color='error'
              onClick={methods.handleSubmit(onReset)}
            >
              Reset
            </Button>
            <LoadingButton
              loading={isLoading}
              size='small'
              variant='contained'
              color='primary'
              onClick={methods.handleSubmit(onSave)}
            >
              Save
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Paper>
    </>
  );
};
