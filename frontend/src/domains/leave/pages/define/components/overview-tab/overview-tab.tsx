import { Divider, Stack, Typography } from '@mui/material';
import { AddPolicy } from './add-policy';
import { ListPolicy } from './list-policy';

export const OverviewTab = () => {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <Typography component='div' sx={{ fontSize: '18px' }}>
          Overview
        </Typography>
        <AddPolicy />
      </Stack>
      <Divider sx={{ my: '10px' }} />
      <ListPolicy />
    </>
  );
};
