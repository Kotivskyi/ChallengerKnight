import { Box } from '@mui/material';

export const PermissionErrorLayout = ({ error }: { error: string }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <h3>{error}</h3>
    </Box>
  );
};
