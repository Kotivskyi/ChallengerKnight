import * as React from 'react';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { NewLeavePolicySchema, PolicyDetail } from '../../../types';
import { useAddLeavePolicyMutation, useUpdateLeavePolicyMutation } from '../../../api/leave-api';

type AddEditPolicyProps = {
  policyId: number;
  policyName: string;
  title: string;
  closeModal: () => void;
};

export const AddEditPolicy: React.FC<AddEditPolicyProps> = ({
  policyId,
  policyName,
  title,
  closeModal
}) => {
  const [addNewPolicy, { isLoading: isAddingPolicy }] = useAddLeavePolicyMutation();
  const [updatePolicy, { isLoading: isUpdatingPolicy }] = useUpdateLeavePolicyMutation();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm<Pick<PolicyDetail, 'name'>>({ resolver: zodResolver(NewLeavePolicySchema) });

  React.useEffect(() => {
    if (policyId) {
      setValue('name', policyName);
    } else {
      setValue('name', '');
    }
  }, [policyName, policyId, setValue]);

  const handleAddEditPolicySubmit = async (data: Pick<PolicyDetail, 'name'>) => {
    try {
      const result = policyId
        ? await updatePolicy({ ...data, id: policyId }).unwrap()
        : await addNewPolicy(data).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isAddingPolicy || isUpdatingPolicy}
      isOpen={true}
      titleText={title}
      closeModal={closeModal}
      handleSave={handleSubmit(handleAddEditPolicySubmit)}
    >
      <TextField
        {...register('name')}
        label='Policy Name'
        variant='standard'
        size='small'
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </DialogModal>
  );
};
