import * as React from 'react';
import { Box, Typography } from '@mui/material';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index } = props;

  return (
    <>
      {value === index && (
        <Box sx={{ p: 3, width: '100%' }}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </>
  );
};
