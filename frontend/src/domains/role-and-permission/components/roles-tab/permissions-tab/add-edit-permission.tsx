import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { DialogModal } from '@/components/dialog-modal';
import {
  useAddPermissionMutation,
  useUpdatePermissionMutation
} from '@/domains/role-and-permission/api';
import {
  AddEditPermissionProps,
  AddEditPermissionSchema
} from '@/domains/role-and-permission/types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FormInitialState } from './permission-list';

type Props = {
  closeModal: () => void;
  formData: FormInitialState;
};
const initialState = {
  name: '',
  type: '',
  method: '',
  path: ''
};
const fields: Array<keyof AddEditPermissionProps> = ['name', 'type', 'path', 'method'];

export const AddEditPermission: React.FC<Props> = ({ formData, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddEditPermissionProps>({
    resolver: zodResolver(AddEditPermissionSchema),
    defaultValues: initialState
  });
  const [addPermission, { isLoading: isAdding }] = useAddPermissionMutation();
  const [updatePermission, { isLoading: isUpdating }] = useUpdatePermissionMutation();
  const { action, id, ...state } = formData;

  React.useEffect(() => {
    reset(state);
  }, [state, reset]);

  const onSave = async (data: AddEditPermissionProps) => {
    try {
      const payload = { ...data, id };
      const result =
        action === 'add'
          ? await addPermission(payload).unwrap()
          : await updatePermission(payload).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      titleText={action === 'add' ? `Add Permission` : `Update Permission`}
      isOpen={true}
      isSaving={isAdding || isUpdating}
      handleSave={handleSubmit(onSave)}
      closeModal={closeModal}
    >
      {fields.map((field) => (
        <div key={field}>
          <TextField
            size='small'
            type='text'
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            sx={{ margin: '10px 0' }}
            fullWidth
            {...register(field)}
            error={!!errors?.[field]}
            helperText={errors?.[field]?.message?.toString()}
            slotProps={{
              inputLabel: { shrink: true }
            }}
          />
        </div>
      ))}
    </DialogModal>
  );
};
