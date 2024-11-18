import * as React from 'react';
import { AddCircle } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { AddEditRole } from '../add-edit-role';

export const AddRole = () => {
  const [action, setAction] = React.useState<string>('');

  const onClick = () => {
    setAction('add');
  };
  const closeModal = () => {
    setAction('');
  };

  return (
    <>
      <Stack spacing={1} direction='row' sx={{ display: 'flex', mt: 2 }}>
        <Button size='small' variant='outlined' startIcon={<AddCircle />} onClick={onClick}>
          Add New Role
        </Button>
      </Stack>

      {action === 'add' && (
        <AddEditRole
          roleId={0}
          roleName={''}
          titleText={'Add Role'}
          closeAddEditRoleModalOpen={closeModal}
        />
      )}
    </>
  );
};
