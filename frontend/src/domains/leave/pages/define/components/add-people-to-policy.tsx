import * as React from 'react';
import {
  Alert,
  Checkbox,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { PolicyUsers, PolicyUsersSchema } from '../../../types';
import {
  useAddUserToPolicyMutation,
  useGetEligibleLeavePolicyUsersQuery
} from '../../../api/leave-api';

type AddPeopleToPolicyProps = {
  policyId: number;
  closeModal: () => void;
};

export const AddPeopleToPolicy: React.FC<AddPeopleToPolicyProps> = ({ policyId, closeModal }) => {
  const { data } = useGetEligibleLeavePolicyUsersQuery();
  const [addUsersToPolicy, { isLoading: isAddingUsersToPolicy }] = useAddUserToPolicyMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm<PolicyUsers>({
    defaultValues: { users: [] },
    resolver: zodResolver(PolicyUsersSchema)
  });
  const [searchText, setSearchText] = React.useState('');

  const filteredUsers = React.useMemo(() => {
    const searchTextLow = searchText.toLowerCase();
    return data?.users.filter(({ name }) => name.toLowerCase().includes(searchTextLow));
  }, [searchText, data?.users]);

  React.useEffect(() => {
    setValue('users', []);
  }, [setValue]);

  const handleAddPeopleSubmit = async (data: PolicyUsers) => {
    try {
      const { users } = data;
      const userList = users.length > 0 ? users.join(',') : '';
      const result = await addUsersToPolicy({ userList, id: policyId }).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isAddingUsersToPolicy}
      isModalClosedOnOutClick={false}
      isOpen={true}
      titleText='Add People'
      closeModal={closeModal}
      handleSave={handleSubmit(handleAddPeopleSubmit)}
    >
      <Alert severity='info'>
        One Person can be added to only one policy. If a person is already part of another policy
        and is being assigned to new one, then the person will only be part of the policy being
        assigned to.
      </Alert>
      <FormControl fullWidth size='small' sx={{ my: 3 }} error={!!errors.users}>
        <InputLabel id='add-people-to-policy'>Users</InputLabel>
        <Controller
          name='users'
          control={control}
          render={({ field: { onChange, value: users } }) => (
            <Select
              MenuProps={{ autoFocus: false }}
              label='Users'
              labelId='add-people-to-policy'
              multiple
              value={users}
              onChange={(event) => {
                const {
                  target: { value }
                } = event;
                onChange(typeof value === 'string' ? value.split(',').map(Number) : value);
              }}
              renderValue={(selected) =>
                selected
                  .map((id) => {
                    const user = data?.users.find((u) => u.id === Number(id));
                    return user ? user.name : '';
                  })
                  .join(',')
              }
              onClose={() => setSearchText('')}
            >
              <ListSubheader>
                <TextField
                  size='small'
                  autoFocus
                  placeholder='Type to search...'
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Search />
                        </InputAdornment>
                      )
                    }
                  }}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== 'Escape') {
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
              {filteredUsers &&
                filteredUsers.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    <Checkbox checked={users.includes(id)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.users?.message}</FormHelperText>
      </FormControl>
    </DialogModal>
  );
};
