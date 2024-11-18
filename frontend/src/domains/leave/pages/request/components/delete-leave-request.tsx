import * as React from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { useDeleteLeaveRequestMutation } from '@/domains/leave/api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type DeleteLeaveRequestProps = {
  id: number;
  closeModal: () => void;
};
export const DeleteLeaveRequest: React.FC<DeleteLeaveRequestProps> = ({ id, closeModal }) => {
  const [deleteLeaveRequest, { isLoading: isDeleting }] = useDeleteLeaveRequestMutation();

  const onSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const result = await deleteLeaveRequest(id).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isDeleting}
      isOpen={true}
      titleText='Delete Leave Request'
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      handleSave={onSave}
      closeModal={closeModal}
    >
      <Typography variant='body1'>Are you sure you want to delete this leave request?</Typography>
    </DialogModal>
  );
};
