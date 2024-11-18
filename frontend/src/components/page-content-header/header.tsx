import * as React from 'react';
import { Box, Typography } from '@mui/material';

export const PageContentHeader = ({
  heading,
  icon
}: {
  heading: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Box display='flex' flexGrow={1}>
      <Typography
        component='div'
        variant='h6'
        sx={{
          color: 'text.secondary',
          mb: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {icon}
        {heading}
      </Typography>
    </Box>
  );
};
