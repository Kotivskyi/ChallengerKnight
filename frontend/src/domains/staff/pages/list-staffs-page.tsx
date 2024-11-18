import * as React from 'react';
import { Add, InfoOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UserAccountBasic } from '@/components/user-account-basic';
import { StaffFilter, StaffFilterSchema } from '../types';
import { useGetStaffsQuery } from '../api/staff-api';
import { FilterStaff } from '../components/forms';

const initialState = {
  roleId: '',
  staffId: '',
  staffName: ''
};

export const ListStaffs = () => {
  const [filter, setFilter] = React.useState<StaffFilter>({});
  const { data, isLoading, isError, error } = useGetStaffsQuery(filter);

  const methods = useForm<StaffFilter>({
    defaultValues: initialState,
    resolver: zodResolver(StaffFilterSchema)
  });

  const searchStaff = (payload: StaffFilter) => {
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
            to='/app/staffs/add'
          >
            Add New Staff
          </Button>
        </Box>
      </Box>
      <FilterStaff
        searchStaff={methods.handleSubmit(searchStaff)}
        methods={methods}
        isLoading={isLoading}
      />
      <Box sx={{ my: 10 }} />
      <PageContentHeader icon={<InfoOutlined sx={{ mr: 1 }} />} heading='Staff Information' />
      <UserAccountBasic
        data={{
          userType: 'staff',
          isLoading,
          isError,
          error: getErrorMsg(error as FetchBaseQueryError | SerializedError).message,
          users: data?.staffs ?? []
        }}
      />
    </>
  );
};
