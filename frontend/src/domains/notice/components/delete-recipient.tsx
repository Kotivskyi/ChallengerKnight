import * as React from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { useDeleteNoticeRecipientMutation } from '../api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type DeleteRecipientProps = {
  recipientId: number;
  closeModal: () => void;
};
export const DeleteRecipient: React.FC<DeleteRecipientProps> = ({ recipientId, closeModal }) => {
  const [deleteRecipient, { isLoading: isDeletingRecipient }] = useDeleteNoticeRecipientMutation();

  const onSave = async () => {
    try {
      const result = await deleteRecipient(recipientId!).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isDeletingRecipient}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      closeModal={closeModal}
      handleSave={onSave}
      titleText='Delete Recipient'
    >
      <Typography variant='body1'>Are you sure you want to delete this recipient?</Typography>
    </DialogModal>
  );
};
