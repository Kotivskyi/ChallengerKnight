import * as React from 'react';
import { Grid2 } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ClassTeacherProps, ClassTeacherSchema } from '@/domains/class/types';
import { ManageClassTeacher } from '../components';
import { useGetClassTeacherDetailQuery } from '../api/class-teacher-api';

const initialState = {
  class: '',
  section: '',
  teacher: 0
};

export const EditClassTeacher = () => {
  const { id } = useParams();
  const { data: classTeacherDetail, isLoading, isError, error } = useGetClassTeacherDetailQuery(id);

  const methods = useForm<ClassTeacherProps>({
    defaultValues: initialState,
    resolver: zodResolver(ClassTeacherSchema)
  });

  React.useEffect(() => {
    if (classTeacherDetail) {
      const { class: className, section, teacher } = classTeacherDetail;
      methods.reset({ class: className, section, teacher });
    }
  }, [classTeacherDetail, methods]);

  let content: React.ReactNode = null;
  if (isLoading) {
    content = <>loading...</>;
  } else if (isError) {
    content = <>{getErrorMsg(error).message}</>;
  } else if (!classTeacherDetail) {
    content = <>Record not found</>;
  } else {
    content = <ManageClassTeacher id={id} operation='Edit' methods={methods} />;
  }

  return (
    <Grid2 container columnSpacing={5} rowSpacing={2}>
      <Grid2 size={{ xs: 12, md: 4 }}>{content}</Grid2>
    </Grid2>
  );
};
