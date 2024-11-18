import * as React from 'react';
import { LockPerson } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

type OthersProps = {
  reporterName: string;
  systemAccess: boolean;
};

export const Others: React.FC<OthersProps> = ({ systemAccess, reporterName }) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LockPerson sx={{ mr: 1 }} />
          <Typography variant='h6'>Others</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant='subtitle2'>Has System Access : &nbsp;</Typography>
          <Typography variant='body1'>{systemAccess?.toString()}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant='subtitle2'>Reports To : &nbsp;</Typography>
          <Typography variant='body1'>{reporterName}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
