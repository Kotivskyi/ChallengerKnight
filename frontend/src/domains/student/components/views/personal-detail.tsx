import * as React from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Grid2, Typography } from '@mui/material';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';

type PersonalDetailProps = {
  dob: string | Date;
  gender: string;
  roll: string;
  admissionDate: string | Date;
  currentAddress: string;
  permanentAddress: string;
};

export const PersonalDetail: React.FC<PersonalDetailProps> = ({
  dob,
  gender,
  roll,
  admissionDate,
  currentAddress,
  permanentAddress
}) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoOutlined sx={{ mr: 1 }} />
          <Typography variant='h6'>Personal Details</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Gender</Typography>
            <Typography variant='body1'>{gender}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Date of Birth</Typography>
            <Typography variant='body1'>{getFormattedDate(dob, DATE_FORMAT)}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Roll</Typography>
            <Typography variant='body1'>{roll}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Admission Date</Typography>
            <Typography variant='body1'>{getFormattedDate(admissionDate, DATE_FORMAT)}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Current Address</Typography>
            <Typography variant='body1'>{currentAddress}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Permanent Address</Typography>
            <Typography variant='body1'>{permanentAddress}</Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
