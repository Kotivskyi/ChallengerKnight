import * as React from 'react';
import { Box, Button } from '@mui/material';
import { Add, InfoOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { StudentFilter, StudentFilterSchema } from '../types';
import { FilterStudent } from '../components/forms';
import { UserAccountBasic } from '@/components/user-account-basic';
import { useGetStudentsQuery } from '../api/student-api';

const initialState = {
  class: '',
  section: '',
  name: '',
  roll: ''
};

export const ListStudents: React.FC = () => {
  const methods = useForm<StudentFilter>({
    defaultValues: initialState,
    resolver: zodResolver(StudentFilterSchema)
  });

  const [filter, setFilter] = React.useState<StudentFilter>({});
  const { data, isLoading, isError, error } = useGetStudentsQuery(filter);

  const searchStudent = (payload: StudentFilter) => {
    setFilter(payload);
  };

  return (
    <>
      <Box sx={{ display: 'flex', mb: 1 }}>
        <Box sx={{ ml: 'auto' }}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            startIcon={<Add />}
            component={Link}
            to='/app/students/add'
          >
            Add New Student
          </Button>
        </Box>
      </Box>
      <FilterStudent methods={methods} searchStudent={methods.handleSubmit(searchStudent)} />
      <Box sx={{ my: 10 }} />
      <PageContentHeader icon={<InfoOutlined sx={{ mr: 1 }} />} heading='Student Information' />
      <UserAccountBasic
        data={{
          userType: 'student',
          isLoading,
          isError,
          error: getErrorMsg(error as FetchBaseQueryError | SerializedError).message,
          users: data?.students || []
        }}
      />
    </>
  );
};
