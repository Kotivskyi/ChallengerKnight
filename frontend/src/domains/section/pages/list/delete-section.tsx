import * as React from 'react';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { useDeleteSectionMutation } from '../../api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

type DeleteSectionProps = {
  closeModal: () => void;
  sectionId: number;
};
export const DeleteSection: React.FC<DeleteSectionProps> = ({ sectionId, closeModal }) => {
  const [deleteSection, { isLoading: isDeletingSection }] = useDeleteSectionMutation();

  const onSave = async () => {
    try {
      const result = await deleteSection(sectionId).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isDeletingSection}
      actionFooterCancelText='No'
      actionFooterSaveText='Yes'
      isOpen={true}
      closeModal={closeModal}
      handleSave={onSave}
      titleText='Delete Section'
    >
      <Typography variant='body1'>Are you sure you want to delete this section?</Typography>
    </DialogModal>
  );
};
