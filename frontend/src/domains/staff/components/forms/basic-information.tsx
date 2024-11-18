import { AccountCircle, Call, Email } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid2,
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

import { useGetRoles } from '../../hooks/use-get-roles';
import { DATE_FORMAT } from '@/utils/helpers/date';
import { StaffFormProps } from '../../types';
import { genders, maritalStatusList } from '@/constants';

export const BasicInformation = () => {
  const roles = useGetRoles();
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<StaffFormProps>();

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
            error={Boolean(errors?.name)}
            helperText={errors?.name?.message}
            label='Full Name'
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
        <FormControl size='small' sx={{ width: '150px' }} error={Boolean(errors?.role)}>
          <InputLabel id='role' shrink>
            Role
          </InputLabel>
          <Controller
            name='role'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Role'
                  labelId='role'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  notched
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
        <FormControl size='small' sx={{ width: '150px' }}>
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
        <FormControl size='small' sx={{ width: '150px' }}>
          <InputLabel id='maritalStatus' shrink>
            Mairtal Status
          </InputLabel>
          <Controller
            name='maritalStatus'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='>Mairtal Status'
                  labelId='maritalStatus'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  notched
                >
                  {maritalStatusList.map((m) => (
                    <MenuItem value={m.id} key={m.id}>
                      {m.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
        <Box>
          <TextField
            {...register('phone')}
            error={Boolean(errors?.gender)}
            helperText={errors?.gender?.message}
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
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
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
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(dt) => onChange(dt)}
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small',
                    InputLabelProps: { shrink: true }
                  }
                }}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name='joinDate'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='Join Date'
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(dt) => onChange(dt)}
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small',
                    InputLabelProps: { shrink: true }
                  }
                }}
              />
            )}
          />
        </Box>
        <Grid2 container rowSpacing={2}>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <TextField
              {...register('qualification')}
              error={Boolean(errors?.qualification)}
              helperText={errors?.qualification?.message}
              multiline
              rows={3}
              fullWidth
              label='Qualification'
              size='small'
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <TextField
              {...register('experience')}
              error={Boolean(errors?.experience)}
              helperText={errors?.experience?.message}
              multiline
              rows={3}
              fullWidth
              label='Experience'
              size='small'
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
};
