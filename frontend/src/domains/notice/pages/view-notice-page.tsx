import * as React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Box, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetNoticeDetailQuery, useHandleNoticeStatusMutation } from '../api/notice-api';
import { ViewNoticeSkeleton } from '../components';

export const ViewNotice = () => {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = React.useState(false);

  const navigate = useNavigate();
  const [deleteNotice, { isLoading: isDeletingNotice }] = useHandleNoticeStatusMutation();
  const { data: noticeDetail, isLoading, isError, error } = useGetNoticeDetailQuery(id);

  const toggleDeleteConfirmationModal = () => {
    setModalOpen(!modalOpen);
  };
  const onSave = async () => {
    try {
      const result = await deleteNotice({ id: Number(id), status: 3 }).unwrap();
      toast.info(result.message);
      toggleDeleteConfirmationModal();
      navigate('/app/notices');
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  let content: null | React.ReactElement = null;
  if (isLoading) {
    content = <ViewNoticeSkeleton />;
  } else if (isError) {
    content = <>{getErrorMsg(error).message}</>;
  } else if (!noticeDetail) {
    content = <>Record not found</>;
  } else {
    const { id, title, description, author, createdDate } = noticeDetail;

    content = (
      <>
        <Box component='div' display='flex' justifyContent='space-between' alignItems='center'>
          <Box component='div' sx={{ mb: 2 }}>
            <Typography component='div' variant='h5'>
              {title}
            </Typography>
            <Typography component='div' variant='subtitle2' display='inline' color='text.primary'>
              {author}
            </Typography>
            <Typography component='div' variant='subtitle2' display='inline' color='text.secondary'>
              {` - ${getFormattedDate(createdDate, DATE_FORMAT)}`}
            </Typography>
          </Box>
          <Box component='div'>
            <Stack direction='row' spacing={1}>
              <IconButton color='primary' component={Link} to={`/app/notices/edit/${id}`}>
                <Edit />
              </IconButton>
              <IconButton color='primary' onClick={toggleDeleteConfirmationModal}>
                <Delete />
              </IconButton>
            </Stack>
          </Box>
        </Box>
        <Divider />
        <Typography component='p' sx={{ py: 3 }}>
          {description}
        </Typography>
      </>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      {content}
      <DialogModal
        isSaving={isDeletingNotice}
        actionFooterCancelText='No'
        actionFooterSaveText='Yes'
        isOpen={modalOpen}
        titleText='Delete Notice'
        handleSave={onSave}
        closeModal={closeModal}
      >
        <Typography variant='body1'>Are you sure you want to delete this notice?</Typography>
      </DialogModal>
    </Paper>
  );
};
