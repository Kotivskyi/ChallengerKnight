import * as React from 'react';
import { TrendingDown, TrendingUp } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';

type GridCardType = {
  heading: string;
  totalNumberCurrentYear: number;
  totalNumberPercInComparisonFromPrevYear: number;
  totalNumberValueInComparisonFromPrevYear: number;
};

export const GridCard: React.FC<GridCardType> = (props) => {
  const { heading, totalNumberCurrentYear, totalNumberPercInComparisonFromPrevYear } = props;
  const isNegative = totalNumberPercInComparisonFromPrevYear < 0 ? true : false;

  return (
    <Card>
      <CardContent>
        <Typography component='div' color='text.secondary' gutterBottom>
          {heading}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='h6' gutterBottom sx={{ pr: 2 }}>
            {totalNumberCurrentYear}
          </Typography>
          <Chip
            icon={isNegative ? <TrendingDown /> : <TrendingUp />}
            label={`${totalNumberPercInComparisonFromPrevYear}%`}
            color={isNegative ? 'error' : 'success'}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
