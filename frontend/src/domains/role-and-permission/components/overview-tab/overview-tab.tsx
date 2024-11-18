import { Divider, Stack, Typography } from '@mui/material';
import { AddRole } from './add-role';
import { ListRoles } from './list-roles';

export const OverviewTab = () => {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <Typography component='div' sx={{ fontSize: '18px' }}>
          Overview
        </Typography>
        <AddRole />
      </Stack>
      <Divider sx={{ my: '10px' }} />
      <ListRoles />
    </>
  );
};
