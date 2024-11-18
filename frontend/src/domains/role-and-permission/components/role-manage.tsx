import * as React from 'react';
import { Block, Edit } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { HandleRoleStatus } from './handle-role-status';
import { AddEditRole } from './add-edit-role';

export const RoleManage = ({ id, name }: { id: number; name: string }) => {
  const [action, setAction] = React.useState<string>('');

  const handleAction = (action: string) => {
    setAction(action);
  };
  const closeModal = () => {
    setAction('');
  };

  return (
    <>
      <Stack direction='row' sx={{ display: 'flex', paddingBottom: 1, alignItems: 'center' }}>
        <Typography variant='body1' sx={{ fontSize: '18px', fontWeight: 500 }}>
          {name}
        </Typography>
        <Box sx={{ marginLeft: 'auto' }}>
          <Stack spacing={1} direction='row'>
            <IconButton aria-label='Edit policy' onClick={() => handleAction('edit')} color='info'>
              <Edit />
            </IconButton>
            <IconButton
              aria-label='Block policy'
              onClick={() => handleAction('block')}
              color='error'
            >
              <Block />
            </IconButton>
          </Stack>
        </Box>
      </Stack>

      {action === 'edit' && (
        <AddEditRole
          roleId={id}
          roleName={name}
          titleText={'Edit Role'}
          closeAddEditRoleModalOpen={closeModal}
        />
      )}
      {action === 'block' && (
        <HandleRoleStatus
          title='Disable Role'
          bodyText='Are you sure you want to disable this role?'
          roleStatus={false}
          roleId={id}
          closeModals={closeModal}
        />
      )}
    </>
  );
};
