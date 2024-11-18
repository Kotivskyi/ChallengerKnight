import * as React from 'react';
import { Box, Paper, SelectChangeEvent } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';
import { Edit } from '@mui/icons-material';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { NoticeFormProps, NoticeFormSchema } from '../types';
import { useGetNoticeDetailQuery, useUpdateNoticeMutation } from '../api/notice-api';
import { NoticeForm } from '../components';

const initialState: NoticeFormProps = {
  title: '',
  description: '',
  status: 0,
  recipientType: 'EV',
  recipientRole: 0,
  firstField: ''
};

export const EditNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetNoticeDetailQuery(id);
  const [selectedRoleId, setSelectedRoleId] = React.useState<number>(0);
  const [updateNotice, { isLoading: updatingNotice }] = useUpdateNoticeMutation();

  const methods = useForm<NoticeFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(NoticeFormSchema)
  });

  React.useEffect(() => {
    if (data) {
      const { title, description, status, recipientType, recipientRole, firstField } = data;
      methods.setValue('title', title);
      methods.setValue('description', description);
      methods.setValue('status', status);
      methods.setValue('recipientType', recipientType);
      methods.setValue('recipientRole', recipientRole);
      methods.setValue('firstField', firstField);
      if (recipientType === 'SP') {
        setSelectedRoleId(Number(recipientRole));
      }
    }
  }, [data, methods]);

  const onSaveNotice = async (data: NoticeFormProps) => {
    try {
      const result = await updateNotice({ id: id!, ...data }).unwrap();
      toast.info(result.message);
      navigate(`/app/notices/${id}`);
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

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>{getErrorMsg(error)?.message}</div>;
  }

  return (
    <>
      <PageContentHeader icon={<Edit sx={{ mr: 1 }} />} heading='Edit Notice' />
      <Box component={Paper} sx={{ padding: '20px' }}>
        <Box sx={{ width: '100%' }}>
          <NoticeForm
            methods={methods}
            isSaving={updatingNotice}
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

export default EditNotice;
