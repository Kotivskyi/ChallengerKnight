import { CalendarMonth } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { getFormattedLeaveDate } from '../util';
import { WhoIsOutProps } from '../types';

export const WhoIsOut = ({ whoIsOut }: { whoIsOut: WhoIsOutProps[] }) => {
  return (
    <>
      <Stack direction='row' spacing={1} marginBottom={1}>
        <CalendarMonth className='section-title' sx={{ paddingTop: '2px' }} />
        <Typography variant='h6' className='section-title'>
          One Month Leave Overview
        </Typography>
      </Stack>
      <Card>
        <CardContent>
          <List>
            {whoIsOut.length <= 0 ? (
              <Typography variant='body1' color='text.secondary'>
                No record found.
              </Typography>
            ) : (
              whoIsOut.map(({ user, userId, fromDate, toDate, leaveType }) => (
                <div key={`${userId}${fromDate}`}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt='User image' />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component='span'
                            variant='body1'
                            color='text.primary'
                          >
                            {getFormattedLeaveDate(fromDate, toDate)}
                          </Typography>
                          {` — ${leaveType}`}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant='inset' component='li' />
                </div>
              ))
            )}
          </List>
        </CardContent>
      </Card>
    </>
  );
};
