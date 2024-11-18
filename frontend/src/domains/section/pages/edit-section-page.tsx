import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetSectionQuery } from '../api';
import { SectionForm, SectionFormSchema } from '../types';
import { ManageSection } from '../components';

export const EditSectionPage = () => {
  const { id } = useParams();
  const { data: sectionDetail, isLoading, isError, error } = useGetSectionQuery(Number(id));

  const methods = useForm<SectionForm>({
    defaultValues: { name: '' },
    resolver: zodResolver(SectionFormSchema)
  });

  React.useEffect(() => {
    if (sectionDetail) {
      const { name } = sectionDetail;
      methods.setValue('name', name);
    }
  }, [sectionDetail, methods]);

  let content: React.ReactNode | null = null;
  if (isLoading) {
    content = <>loading...</>;
  } else if (isError) {
    content = <>{getErrorMsg(error)}</>;
  } else if (!sectionDetail) {
    content = <>Record not found</>;
  } else {
    content = <ManageSection operation='Edit' id={Number(id)} methods={methods} />;
  }

  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, md: 4 }}>{content}</Grid2>
    </Grid2>
  );
};
