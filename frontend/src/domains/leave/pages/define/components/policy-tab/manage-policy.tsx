import * as React from 'react';
import { Block, Edit, PersonAddAlt } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

import { AddEditPolicy } from '../add-edit-policy';
import { AddPeopleToPolicy } from '../add-people-to-policy';
import { PolicyStatus } from '../policy-status';

export const ManagePolicy = ({ id, name }: { id: number; name: string }) => {
  const [action, setAction] = React.useState<string>('');

  const onBtnClick = (action: string) => {
    setAction(action);
  };
  const closeModal = () => {
    setAction('');
  };

  return (
    <>
      <Stack spacing={1} direction='row' sx={{ display: 'flex', my: 3 }}>
        <Typography variant='body1' sx={{ fontSize: '18px', fontWeight: 500 }}>
          {name}
        </Typography>
        <div style={{ marginLeft: 'auto' }}>
          <Stack spacing={1} direction='row'>
            <IconButton
              aria-label='Add people'
              onClick={() => onBtnClick('addPeopleToPolicy')}
              color='info'
            >
              <PersonAddAlt />
            </IconButton>
            <IconButton
              aria-label='Edit policy'
              onClick={() => onBtnClick('editPolicy')}
              color='info'
            >
              <Edit />
            </IconButton>
            <IconButton
              aria-label='Block policy'
              onClick={() => onBtnClick('disablePolicy')}
              color='error'
            >
              <Block />
            </IconButton>
          </Stack>
        </div>
      </Stack>

      {action === 'editPolicy' && (
        <AddEditPolicy
          policyId={id}
          policyName={name}
          title={'Edit Policy'}
          closeModal={closeModal}
        />
      )}

      {action === 'disablePolicy' && (
        <PolicyStatus
          title='Disable Policy'
          bodyText='Are you sure you want to disable this policy?'
          policyStatus={false}
          policyId={id}
          closeModal={closeModal}
        />
      )}

      {action === 'addPeopleToPolicy' && (
        <AddPeopleToPolicy policyId={id} closeModal={closeModal} />
      )}
    </>
  );
};
