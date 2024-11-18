import * as React from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { useDeletePermissionMutation } from '@/domains/role-and-permission/api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type DeletePermissionProps = {
  permissionId: number;
  closeModal: () => void;
};

export const DeletePermission: React.FC<DeletePermissionProps> = ({ permissionId, closeModal }) => {
  const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();
  const onDelete = async () => {
    try {
      const result = await deletePermission(permissionId).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isOpen={true}
      isSaving={isDeleting}
      handleSave={onDelete}
      closeModal={closeModal}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      titleText='Delete Permission'
    >
      Are you sure you want to delete this permission ?
    </DialogModal>
  );
};
