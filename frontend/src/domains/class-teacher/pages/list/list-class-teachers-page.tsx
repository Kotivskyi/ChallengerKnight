import { Grid2 } from '@mui/material';
import { Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PageContentHeader } from '@/components/page-content-header';
import { ClassTeacherProps, ClassTeacherSchema } from '@/domains/class/types';
import { ManageClassTeacher } from '../../components';
import { ClassTeacherData } from './class-teacher-data';

const initialState = {
  class: '',
  section: '',
  teacher: 0
};

export const ListClassTeachers = () => {
  const methods = useForm<ClassTeacherProps>({
    defaultValues: initialState,
    resolver: zodResolver(ClassTeacherSchema)
  });

  return (
    <>
      <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading='Class Teacher Information' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <ManageClassTeacher operation='Add' methods={methods} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <ClassTeacherData />
        </Grid2>
      </Grid2>
    </>
  );
};
