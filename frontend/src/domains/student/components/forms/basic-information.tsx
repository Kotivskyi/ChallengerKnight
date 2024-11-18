import { AccountCircle, Call, Email } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';

import { DATE_FORMAT } from '@/utils/helpers/date';
import { StudentProps } from '../../types';
import { genders } from '@/constants';

export const BasicInformation = () => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<StudentProps>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AccountCircle sx={{ mr: 1 }} />
        <Typography variant='body1'>Basic Information</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        <Box>
          <TextField
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            label='Full Name'
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
        <Box>
          <TextField
            {...register('phone')}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
            label='Phone Number'
            size='small'
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Call fontSize='small' />
                  </InputAdornment>
                )
              }
            }}
          />
        </Box>
        <Box>
          <TextField
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            label='Email'
            size='small'
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Email fontSize='small' />
                  </InputAdornment>
                )
              }
            }}
          />
        </Box>
        <Box>
          <Controller
            name='dob'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='Birth Date'
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small',
                    InputLabelProps: { shrink: true }
                  }
                }}
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(newDt) => onChange(newDt)}
              />
            )}
          />
        </Box>
        <FormControl size='small' sx={{ width: '150px' }} error={Boolean(errors.gender)}>
          <InputLabel id='gender' shrink>
            Gender
          </InputLabel>
          <Controller
            name='gender'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Gender'
                  labelId='gender'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  notched
                >
                  {genders.map((gender) => (
                    <MenuItem value={gender.id} key={gender.id}>
                      {gender.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Stack>
    </>
  );
};
