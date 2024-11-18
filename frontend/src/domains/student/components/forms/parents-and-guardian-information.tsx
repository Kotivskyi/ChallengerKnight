import { Call, ContactPhone } from '@mui/icons-material';
import { Box, Grid2, InputAdornment, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { NameIdType } from '@/utils/type/misc';
import { ParentsAndGuardianInfo, StudentProps } from '../../types';

const fields: NameIdType<keyof ParentsAndGuardianInfo>[] = [
  { name: 'Father Name', id: 'fatherName' },
  { name: 'Father Phone', id: 'fatherPhone' },
  { name: 'Mother Name', id: 'motherName' },
  { name: 'Mother Phone', id: 'motherPhone' },
  { name: 'Guardian Name', id: 'guardianName' },
  { name: 'Guardian Phone', id: 'guardianPhone' },
  { name: 'Relation of Guardian', id: 'relationOfGuardian' }
];

export const ParentsAndGuardianInformation = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<StudentProps>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <ContactPhone sx={{ mr: 1 }} />
        <Typography variant='body1'>Parents & Guardian Information</Typography>
      </Box>
      <Grid2 container spacing={2} sx={{ mt: 1 }}>
        {fields.map((field) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={field.id}>
            <TextField
              {...register(`${field.id}`)}
              error={Boolean(errors?.[field.id])}
              helperText={errors?.[field.id]?.message}
              fullWidth
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
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
