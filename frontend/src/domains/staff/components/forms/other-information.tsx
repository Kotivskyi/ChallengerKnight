import { More } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetStaffs } from '../../hooks/use-get-staffs';
import { StaffFormProps } from '../../types';

export const OtherInformation = () => {
  const staffs = useGetStaffs();

  const {
    control,
    formState: { errors }
  } = useFormContext<StaffFormProps>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <More sx={{ mr: 1 }} />
        <Typography variant='body1'>Others</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        <Box>
          <FormControl size='small' sx={{ width: '250px' }} error={Boolean(errors?.reporterId)}>
            <InputLabel id='role' shrink>
              Reports To
            </InputLabel>
            <Controller
              name='reporterId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    name='reporterId'
                    label='Reports To'
                    labelId='reporterId'
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    notched
                  >
                    {staffs.map((staff) => (
                      <MenuItem value={staff.id} key={staff.id}>
                        {staff.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Box>

        <Box>
          <Controller
            name='systemAccess'
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                name='systemAccess'
                label='Allow Access to System'
                control={<Radio checked={value} onChange={() => onChange(true)} />}
              />
            )}
          />
          <Controller
            name='systemAccess'
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                name='systemAccess'
                label='No Access'
                control={<Radio checked={!value} onChange={() => onChange(false)} />}
              />
            )}
          />
        </Box>
      </Stack>
    </>
  );
};
