import * as React from 'react';
import { Campaign, Person } from '@mui/icons-material';
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
import { Link } from 'react-router-dom';

import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { Notice } from '@/domains/notice/types';
const NO_RECORD = 'Record not found';

export const Notices = ({ notices }: { notices: Notice[] }) => {
  let content: React.ReactNode | null = null;
  if (!Array.isArray(notices) || notices.length <= 0) {
    content = <>{NO_RECORD}</>;
  } else {
    content = notices.map(({ id, title, author, createdDate }, index) => (
      <List key={id}>
        <ListItem secondaryAction={getFormattedDate(createdDate, DATE_FORMAT)}>
          <ListItemAvatar title={author}>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link to={`/app/notices/${id}`} className='notice-title'>
                {title}
              </Link>
            }
          />
        </ListItem>
        {index !== notices.length - 1 && <Divider variant='inset' component='li' />}
      </List>
    ));
  }

  return (
    <>
      <Stack direction='row' spacing={1} marginBottom={1}>
        <Campaign className='section-title' sx={{ paddingTop: '2px' }} />
        <Typography variant='h6' className='section-title'>
          Notices
        </Typography>
      </Stack>
      <Card>
        <CardContent>{content}</CardContent>
      </Card>
    </>
  );
};
