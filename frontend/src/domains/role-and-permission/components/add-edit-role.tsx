import * as React from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { AddEditRoleProps, AddEditRoleSchema } from '../types';
import { useAddNewRoleMutation, useUpdateRoleMutation } from '../api';

type ModalProps = {
  roleId?: number;
  roleName: string;
  titleText: string;
  closeAddEditRoleModalOpen: () => void;
};

const initValues = {
  id: 0,
  name: ''
};

export const AddEditRole: React.FC<ModalProps> = ({
  roleId,
  roleName,
  titleText,
  closeAddEditRoleModalOpen
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<AddEditRoleProps>({
    resolver: zodResolver(AddEditRoleSchema),
    defaultValues: initValues
  });

  const [addNewRole, { isLoading: isAddingRole }] = useAddNewRoleMutation();
  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateRoleMutation();

  React.useEffect(() => {
    if (roleId) {
      setValue('name', roleName);
    } else {
      setValue('name', '');
    }
  }, [roleName, roleId, setValue]);

  const handleSave = async (data: AddEditRoleProps) => {
    try {
      const result = roleId
        ? await updateRole({ ...data, id: roleId }).unwrap()
        : await addNewRole({ name: data.name }).unwrap();

      toast.info(result.message);
      closeAddEditRoleModalOpen();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isAddingRole || isUpdatingRole}
      isOpen={true}
      titleText={titleText}
      closeModal={closeAddEditRoleModalOpen}
      handleSave={handleSubmit(handleSave)}
    >
      <TextField
        {...register('name')}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        label='Role Name'
        variant='standard'
        size='small'
        fullWidth
      />
    </DialogModal>
  );
};
