import * as React from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Grid2, Typography } from '@mui/material';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';

type PersonalDetailProps = {
  id?: string;
  gender: string;
  dob: string | Date;
  joinDate: string | Date;
  maritalStatus: string;
  qualification?: string;
  experience?: string;
  currentAddress: string;
  permanentAddress: string;
};

export const PersonalDetail: React.FC<PersonalDetailProps> = ({
  gender,
  dob,
  joinDate,
  maritalStatus,
  qualification,
  experience,
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
            <Typography variant='body1'>
              {dob ? getFormattedDate(dob.toString(), DATE_FORMAT) : ''}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Join Date</Typography>
            <Typography variant='body1'>
              {joinDate ? getFormattedDate(joinDate.toString(), DATE_FORMAT) : ''}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Marital Status</Typography>
            <Typography variant='body1'>{maritalStatus}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Qualification</Typography>
            <Typography variant='body1'>{qualification}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Experience</Typography>
            <Typography variant='body1'>{experience}</Typography>
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
