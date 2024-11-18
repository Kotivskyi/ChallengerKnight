import { More } from '@mui/icons-material';
import { Box, FormControlLabel, Radio, Stack, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { StudentProps } from '../../types';

export const OtherInformation = () => {
  const { control } = useFormContext<StudentProps>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <More sx={{ mr: 1 }} />
        <Typography variant='body1'>Access</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        <Box>
          <FormControlLabel
            name='systemAccess'
            label='Allow Access to System'
            control={
              <Controller
                name='systemAccess'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Radio checked={value} onChange={() => onChange(true)} />
                )}
              />
            }
          />
          <FormControlLabel
            name='systemAccess'
            label='No Access'
            control={
              <Controller
                name='systemAccess'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Radio checked={!value} onChange={() => onChange(false)} />
                )}
              />
            }
          />
        </Box>
      </Stack>
    </>
  );
};
