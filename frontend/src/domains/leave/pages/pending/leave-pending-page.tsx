import { Box } from '@mui/material';
import { Pending } from '@mui/icons-material';
import { PageContentHeader } from '@/components/page-content-header';
import { PendingRequestData } from './components/pending-request';

export const PendingRequest = () => {
  return (
    <Box>
      <PageContentHeader icon={<Pending sx={{ mr: 1 }} />} heading='Pending Leave Requests' />
      <PendingRequestData />
    </Box>
  );
};
