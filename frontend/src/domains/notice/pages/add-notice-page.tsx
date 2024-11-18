import * as React from 'react';
import { Box, Paper, SelectChangeEvent } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { NoticeFormProps, NoticeFormSchema } from '../types';
import { useAddNoticeMutation } from '../api/notice-api';
import { NoticeForm } from '../components';

const initialState: NoticeFormProps = {
  title: '',
  description: '',
  status: 0,
  recipientType: 'EV',
  recipientRole: 0,
  firstField: ''
};

export const AddNotice = () => {
  const navigate = useNavigate();
  const [addNotice, { isLoading: addingNotice }] = useAddNoticeMutation();
  const [selectedRoleId, setSelectedRoleId] = React.useState<number>(0);

  const methods = useForm<NoticeFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(NoticeFormSchema)
  });

  const onSaveNotice = async (data: NoticeFormProps) => {
    try {
      const result = await addNotice(data).unwrap();
      toast.info(result.message);
      navigate('/app/notices');
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  const handleRoleChange = (event: SelectChangeEvent<string | number>) => {
    const { value } = event.target;
    setSelectedRoleId(Number(value));
    methods.reset({ ...methods.getValues(), firstField: '' });
  };
  const handleRecipientChange = (event: SelectChangeEvent<string | number>) => {
    const { value } = event.target;
    const shouldResetFields = value === 'EV';
    setSelectedRoleId(0);
    if (shouldResetFields) {
      methods.reset({ ...methods.getValues(), recipientRole: 0, firstField: '' });
    }
  };

  return (
    <>
      <PageContentHeader icon={<AddCircleOutline sx={{ mr: 1 }} />} heading='Add New Notice' />
      <Box component={Paper} sx={{ padding: '20px' }}>
        <Box sx={{ width: '100%' }}>
          <NoticeForm
            methods={methods}
            isSaving={addingNotice}
            onSubmit={methods.handleSubmit(onSaveNotice)}
            handleRoleChange={handleRoleChange}
            handleRecipientChange={handleRecipientChange}
            selectedRoleId={selectedRoleId}
          />
        </Box>
      </Box>
    </>
  );
};
