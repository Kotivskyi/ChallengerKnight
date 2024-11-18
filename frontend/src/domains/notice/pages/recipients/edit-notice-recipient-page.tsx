import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetNoticeRecipientQuery } from '../../api';
import { NoticeRecipient, NoticeRecipientSchema } from '../../types';
import { ManageNoticeRecipients } from '../../components';

const initialState = {
  roleId: 0,
  primaryDependentName: '',
  primaryDependentSelect: ''
};

export const EditNoticeRecipientPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetNoticeRecipientQuery(Number(id));

  const methods = useForm<NoticeRecipient>({
    defaultValues: initialState,
    resolver: zodResolver(NoticeRecipientSchema)
  });

  React.useEffect(() => {
    if (data) {
      const { roleId, primaryDependentName, primaryDependentSelect } = data;
      methods.setValue('roleId', roleId);
      methods.setValue('primaryDependentName', primaryDependentName);
      methods.setValue('primaryDependentSelect', primaryDependentSelect);
    }
  }, [data, methods]);

  let content: React.ReactNode | null = null;
  if (isLoading) {
    content = <>loading...</>;
  } else if (isError) {
    content = <>{getErrorMsg(error)}</>;
  } else if (!data) {
    content = <>Record not found</>;
  } else {
    content = <ManageNoticeRecipients operation='Edit' id={Number(id)} methods={methods} />;
  }

  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, md: 4 }}>{content}</Grid2>
    </Grid2>
  );
};
