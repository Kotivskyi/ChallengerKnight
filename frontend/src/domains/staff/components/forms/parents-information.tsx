import { useFormContext } from 'react-hook-form';
import { Call, ContactPhone } from '@mui/icons-material';
import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { NameIdType } from '@/utils/type/misc';
import { ParentsInfo, StaffFormProps } from '../../types';

const fields: NameIdType<keyof ParentsInfo>[] = [
  { name: 'Father Name', id: 'fatherName' },
  { name: 'Mother Name', id: 'motherName' },
  { name: 'Emergency Phone', id: 'emergencyPhone' }
];

export const ParentsInformation = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<StaffFormProps>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <ContactPhone sx={{ mr: 1 }} />
        <Typography variant='body1'>Parents & Emergency Information</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        {fields.map((field) => (
          <Box key={field.id}>
            <TextField
              {...register(`${field.id}`)}
              error={Boolean(errors?.[field.id])}
              helperText={errors?.[field.id]?.message}
              label={field.name}
              size='small'
              slotProps={{ inputLabel: { shrink: true } }}
              {...(field.id.includes('Phone')
                ? {
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Call fontSize='small' />
                        </InputAdornment>
                      )
                    }
                  }
                : {})}
            />
          </Box>
        ))}
      </Stack>
    </>
  );
};
