import * as React from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DialogModal } from '@/components/dialog-modal';
import { useDeleteDepartmentMutation } from '../../api';

type DeleteDepartmentProps = {
  closeModal: () => void;
  departmentId: number;
};
export const DeleteDepartment: React.FC<DeleteDepartmentProps> = ({ departmentId, closeModal }) => {
  const [deleteDepartment, { isLoading: isDeletingDepartment }] = useDeleteDepartmentMutation();

  const onSave = async () => {
    try {
      const result = await deleteDepartment(departmentId).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isDeletingDepartment}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      closeModal={closeModal}
      handleSave={onSave}
      titleText='Delete Department'
    >
      <Typography variant='body1'>Are you sure you want to delete this department?</Typography>
    </DialogModal>
  );
};
