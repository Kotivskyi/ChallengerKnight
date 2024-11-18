import * as React from 'react';
import { AddCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { AddEditPolicy } from '../add-edit-policy';

export const AddPolicy = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const togglePolicy = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <Button size='small' variant='outlined' startIcon={<AddCircle />} onClick={togglePolicy}>
        Add New Policy
      </Button>
      {isOpen && (
        <AddEditPolicy
          policyId={0}
          policyName=''
          closeModal={togglePolicy}
          title='Add New Policy'
        />
      )}
    </>
  );
};
