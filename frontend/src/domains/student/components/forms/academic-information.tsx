import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import { School } from '@mui/icons-material';
import { parseISO } from 'date-fns';

import { DATE_FORMAT } from '@/utils/helpers/date';
import { StudentProps } from '../../types';
import { useClasses } from '../../hooks';
import { useGetSectionsQuery } from '@/domains/section/api';

export const AcademicInformation = () => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<StudentProps>();

  const classes = useClasses();
  const { data, isLoading } = useGetSectionsQuery();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <School sx={{ mr: 1 }} />
        <Typography variant='body1'>Academic Information</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        <FormControl size='small' sx={{ width: '150px' }} error={Boolean(errors.class)}>
          <InputLabel id='class' shrink>
            Class
          </InputLabel>
          <Controller
            name='class'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Class'
                  labelId='class'
                  notched
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                >
                  {classes.map(({ name }) => (
                    <MenuItem value={name} key={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
        <FormControl size='small' sx={{ width: '150px' }} error={Boolean(errors.section)}>
          <InputLabel id='class' shrink>
            Section
          </InputLabel>
          <Controller
            name='section'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Section'
                  labelId='section'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  notched
                >
                  {isLoading ? (
                    <>loading...</>
                  ) : (
                    data?.sections?.map(({ name }) => (
                      <MenuItem value={name} key={name}>
                        {name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
        <Box>
          <TextField
            {...register('roll')}
            error={Boolean(errors.roll)}
            helperText={errors.roll?.message}
            label='Roll'
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
        <Box>
          <Controller
            name='admissionDate'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='Admission Date'
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small',
                    InputLabelProps: { shrink: true }
                  }
                }}
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </Box>
      </Stack>
    </>
  );
};
