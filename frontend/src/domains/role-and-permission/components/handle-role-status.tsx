import * as React from 'react';
import { Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useHandleRoleStatusMutation } from '../api';

type RoleStatusProps = {
  roleStatus: boolean;
  roleId: number;
  closeModals: () => void;
  title: string;
  bodyText: string;
};

export const HandleRoleStatus: React.FC<RoleStatusProps> = ({
  roleId,
  closeModals,
  roleStatus,
  title,
  bodyText
}) => {
  const [handleRoleStatus, { isLoading: isDisablingRole }] = useHandleRoleStatusMutation();

  const onSave = async () => {
    try {
      const result = await handleRoleStatus({ id: roleId, status: roleStatus }).unwrap();
      toast.info(result.message);
      closeModals();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isDisablingRole}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      titleText={title}
      closeModal={closeModals}
      handleSave={onSave}
    >
      <Typography variant='body1'>{bodyText}</Typography>
    </DialogModal>
  );
};
