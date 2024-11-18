import { Box } from '@mui/material';

const DEFAULT_ERR = 'Error loading the page';
export const ErrorPage = ({ message }: { message?: string }) => {
  return (
    <Box sx={{ textAlign: 'center', color: 'red' }}>
      <h4>{message ?? DEFAULT_ERR}</h4>
    </Box>
  );
};
