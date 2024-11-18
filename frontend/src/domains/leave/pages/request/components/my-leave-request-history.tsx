import { Box, Typography } from '@mui/material';
import { useGetMyLeaveHistoryQuery } from '@/domains/leave/api';
import { RequestHistoryTable } from '@/domains/leave/components';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

export const MyLeaveRequestHistory = () => {
  const { data, isLoading, isError, error } = useGetMyLeaveHistoryQuery();
  const requests = isError ? [] : data?.leaveHistory || [];

  return (
    <Box sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      <Typography component='div' variant='h6' color='text.secondary' sx={{ mb: 1 }}>
        Leave Request History
      </Typography>
      <RequestHistoryTable
        isLoading={isLoading}
        isError={isError}
        errorMessage={getErrorMsg(error).message}
        requests={requests}
      />
    </Box>
  );
};
