import * as React from 'react';
import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, UseFormReturn } from 'react-hook-form';
import { parseISO } from 'date-fns';

import { DATE_FORMAT } from '@/utils/helpers/date';
import { LeavePolicy, LeaveRequestForm, MyLeavePolicy } from '../types';

type LeaveFormProps = {
  methods: UseFormReturn<LeaveRequestForm>;
  leavePolicies: MyLeavePolicy[] | LeavePolicy[];
};

export const LeaveForm: React.FC<LeaveFormProps> = ({ methods, leavePolicies }) => {
  const {
    register,
    formState: { errors },
    control
  } = methods;

  return (
    <>
      <FormControl fullWidth size='small' sx={{ mt: 1 }} error={!!errors.policy}>
        <InputLabel id='policy'>Leave Policy</InputLabel>
        <Controller
          name='policy'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select label='Leave Policy' labelId='policy' value={value} onChange={onChange}>
              {leavePolicies.map((leave) => (
                <MenuItem key={leave.id} value={leave.id}>
                  {leave.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.policy?.message}</FormHelperText>
      </FormControl>
      <Grid2 container spacing={4} sx={{ mt: 1 }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name='from'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='From'
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small'
                  }
                }}
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Controller
            name='to'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='To'
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small'
                  }
                }}
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </Grid2>
      </Grid2>
      <TextField
        {...register('note')}
        sx={{ mt: 3 }}
        size='small'
        label='Note'
        variant='outlined'
        fullWidth
        error={!!errors.note}
        helperText={errors.note?.message}
      ></TextField>
    </>
  );
};
