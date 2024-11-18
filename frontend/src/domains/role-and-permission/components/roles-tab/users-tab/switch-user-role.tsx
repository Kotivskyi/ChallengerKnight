import * as React from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetRolesQuery, useSwitchUserRoleMutation } from '@/domains/role-and-permission/api';

type SwitchUserRoleProps = {
  userId: number;
  handleRoleSwitch: (id: number) => void;
};
const Schema = z.object({
  roleId: z.number().min(1, 'You must select one role')
});
type SchemaType = z.infer<typeof Schema>;

export const SwitchUserRole: React.FC<SwitchUserRoleProps> = ({ userId, handleRoleSwitch }) => {
  const { data } = useGetRolesQuery();
  const roles = data?.roles ?? [];
  const [switchUserRole, { isLoading: isSwitchingRole }] = useSwitchUserRoleMutation();
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<SchemaType>({
    defaultValues: { roleId: 0 },
    resolver: zodResolver(Schema)
  });
  const closeModal = () => {
    handleRoleSwitch(0);
  };
  const handleSave = async (data: SchemaType) => {
    try {
      const result = await switchUserRole({ id: userId, ...data }).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isSwitchingRole}
      isOpen={true}
      titleText='Switch Role'
      closeModal={closeModal}
      handleSave={handleSubmit(handleSave)}
    >
      <p>Switching role will remove access permissions from current role.</p>
      <FormControl sx={{ width: '100%', my: 2 }} size='small' error={Boolean(errors.roleId)}>
        <InputLabel id='choose-new-role'>New Role</InputLabel>
        <Controller
          name='roleId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                labelId='choose-new-role'
                label='Select New Role'
                value={value}
                onChange={(e) => onChange(e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem value={role.id} key={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
    </DialogModal>
  );
};
