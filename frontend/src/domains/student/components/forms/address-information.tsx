import { Box, Grid2, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Home } from '@mui/icons-material';

import { NameIdType } from '@/utils/type/misc';
import { AddressInfo, StudentProps } from '../../types';

const fields: NameIdType<keyof AddressInfo>[] = [
  { name: 'Current Address', id: 'currentAddress' },
  { name: 'Permanent Address', id: 'permanentAddress' }
];

export const AddressInformation = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<StudentProps>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Home sx={{ mr: 1 }} />
        <Typography variant='body1'>Address</Typography>
      </Box>
      <Grid2 container spacing={2} sx={{ marginTop: '10px' }}>
        {fields.map((field) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={field.id}>
            <TextField
              {...register(`${field.id}`)}
              error={Boolean(errors?.[field.id])}
              helperText={errors?.[field.id]?.message}
              multiline
              rows={3}
              fullWidth
              label={field.name}
              size='small'
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
