import * as React from 'react';
import { Class, Email, Grade, Person, Phone } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Grid2, Typography } from '@mui/material';

type MiniAvatarProps = {
  name: string;
  phone: string;
  email: string;
  selectedClass: string;
  section: string;
};

export const MiniAvatar: React.FC<MiniAvatarProps> = ({
  name,
  selectedClass,
  section,
  phone,
  email
}) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Person sx={{ mr: 1 }} />
          <Typography variant='h6'>{name}</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Class sx={{ mr: 1 }} />
              <Typography variant='subtitle2'>Class</Typography>
            </Box>
            <Typography variant='body1'>{selectedClass}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Grade sx={{ mr: 1 }} />
              <Typography variant='subtitle2'>Section</Typography>
            </Box>
            <Typography variant='body1'>{section}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant='subtitle2'>Email</Typography>
            </Box>
            <Typography variant='body1'>{email}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant='subtitle2'>Phone</Typography>
            </Box>
            <Typography variant='body1'>{phone}</Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
