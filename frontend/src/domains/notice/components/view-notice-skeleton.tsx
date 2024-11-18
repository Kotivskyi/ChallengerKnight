import { Skeleton, Stack } from '@mui/material';

export const ViewNoticeSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant='rectangular' animation='wave' width='60%' />
      <Skeleton variant='text' animation='wave' width='40%' />
      <Skeleton sx={{ height: '50vh' }} animation='wave' variant='rectangular' />
    </Stack>
  );
};
