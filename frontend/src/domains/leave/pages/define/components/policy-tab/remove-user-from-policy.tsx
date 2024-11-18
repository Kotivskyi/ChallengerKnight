import * as React from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useRemoveUserFromPolicyMutation } from '@/domains/leave/api';
import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type RemoveUserFromPolicyProps = {
  policyId: number;
  userId: number;
  closeModal: () => void;
};
export const RemoveUserFromPolicy: React.FC<RemoveUserFromPolicyProps> = ({
  policyId,
  userId,
  closeModal
}) => {
  const [removeUser, { isLoading: isRemovingUser }] = useRemoveUserFromPolicyMutation();

  const onSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const result = await removeUser({ policyId, userId }).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isRemovingUser}
      titleText='Remove User'
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      closeModal={closeModal}
      handleSave={onSave}
    >
      <Typography variant='body1'>
        Are you sure you want to remove user from this policy?
      </Typography>
    </DialogModal>
  );
};
