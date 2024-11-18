import * as React from 'react';
import { ContactPhone } from '@mui/icons-material';
import { Box, Grid2, Typography, Card, CardContent, Divider } from '@mui/material';

type ParentsAndGuardianInformationProps = {
  fatherName: string;
  fatherPhone?: string;
  motherName?: string;
  motherPhone?: string;
  guardianName: string;
  guardianPhone: string;
  relationOfGuardian: string;
};

export const ParentsAndGuardianInformation: React.FC<ParentsAndGuardianInformationProps> = ({
  fatherName,
  fatherPhone,
  motherName,
  motherPhone,
  guardianName,
  guardianPhone,
  relationOfGuardian
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ContactPhone sx={{ mr: 1 }} />
          <Typography variant='h6'>Parents & Guardian Information</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Father Name</Typography>
            <Typography variant='body1'>{fatherName}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Father Phone</Typography>
            <Typography variant='body1'>{fatherPhone}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Mother Name</Typography>
            <Typography variant='body1'>{motherName}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Mother Phone</Typography>
            <Typography variant='body1'>{motherPhone}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Guardian Name</Typography>
            <Typography variant='body1'>{guardianName}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant='subtitle2'>Guardian Phone</Typography>
            <Typography variant='body1'>{guardianPhone}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography variant='subtitle2'>Relation of Guardian</Typography>
            <Typography variant='body1'>{relationOfGuardian}</Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
