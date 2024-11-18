import * as React from 'react';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Typography } from '@mui/material';
import { DialogModal } from '@/components/dialog-modal';
import { useDeleteClassMutation } from '../../api';

type DeleteClassProps = {
  classId: number;
  closeModal: () => void;
};
export const DeleteClass: React.FC<DeleteClassProps> = ({ classId, closeModal }) => {
  const [deleteClass, { isLoading: isDeletingClass }] = useDeleteClassMutation();

  const onSave = async () => {
    try {
      const result = await deleteClass(classId).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isDeletingClass}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      closeModal={closeModal}
      handleSave={onSave}
      titleText='Delete Class'
    >
      <Typography variant='body1'>Are you sure you want to delete this class?</Typography>
    </DialogModal>
  );
};
