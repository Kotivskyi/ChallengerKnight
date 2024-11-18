import { Box, Button } from '@mui/material';
import { Add, Campaign } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { PageContentHeader } from '@/components/page-content-header';
import { useGetNoticesQuery } from '../api/notice-api';
import { NoticeData } from '../components';

export const ListNotices = () => {
  const { data, isLoading, isError, error } = useGetNoticesQuery();

  return (
    <>
      <PageContentHeader icon={<Campaign sx={{ mr: 1 }} />} heading='Notices' />
      <Button
        variant='contained'
        startIcon={<Add />}
        size='small'
        sx={{ mb: 2, margin: 'auto' }}
        component={Link}
        to={`/app/notices/add`}
      >
        Add Notice
      </Button>
      <Box sx={{ mb: 2 }} />
      <NoticeData
        notices={isError ? [] : data?.notices || []}
        isLoading={isLoading}
        isError={isError}
        error={error}
        actionCellType='user'
      />
    </>
  );
};
