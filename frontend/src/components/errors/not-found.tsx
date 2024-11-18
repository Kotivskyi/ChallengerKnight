import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ textAlign: 'center', margin: '20px 0' }}>
      <Typography color='red' gutterBottom>
        Page not found
      </Typography>
      <Typography gutterBottom>The page you are looking for does not exist.</Typography>
      <Button onClick={goBack} variant='contained'>
        Go Back
      </Button>
    </Box>
  );
};
