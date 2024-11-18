import * as React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { useGetRoles } from '../../hooks/use-get-roles';
import { StaffFilter } from '../../types';

type FilterStaffProps = {
  methods: UseFormReturn<StaffFilter>;
  searchStaff: () => void;
  isLoading: boolean;
};

export const FilterStaff: React.FC<FilterStaffProps> = ({ searchStaff, methods, isLoading }) => {
  const roles = useGetRoles();
  const {
    formState: { errors },
    control,
    register
  } = methods;

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Filter Criteria
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 8, md: 4 }}>
          <FormControl fullWidth size='small' error={Boolean(errors.roleId)}>
            <InputLabel id='staff-role' shrink>
              Staff Role
            </InputLabel>
            <Controller
              name='roleId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    labelId='staff-role'
                    label='Staff Role'
                    value={value}
                    onChange={(e) => onChange(String(e.target.value))}
                    notched
                  >
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 8, md: 4 }}>
          <TextField
            {...register('staffId')}
            error={Boolean(errors.staffId)}
            helperText={errors.staffId?.message}
            label='Staff ID'
            fullWidth
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 size={{ xs: 8, md: 4 }}>
          <TextField
            {...register('staffName')}
            error={Boolean(errors.staffName)}
            helperText={errors.staffName?.message}
            label='Staff Name'
            fullWidth
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ marginLeft: 'auto', mt: 2 }}>
          <LoadingButton
            loading={isLoading}
            color='primary'
            size='small'
            onClick={searchStaff}
            variant='contained'
          >
            Search
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};
