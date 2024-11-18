import { Grid2 } from '@mui/material';
import { Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PageContentHeader } from '@/components/page-content-header';
import { ClassProps, ClassSchema } from '../../types';
import { ManageClass } from '../../components';
import { ClassData } from './class-data';

const initialState = {
  class: '',
  sections: []
};

export const ListClasses = () => {
  const methods = useForm<ClassProps>({
    defaultValues: initialState,
    resolver: zodResolver(ClassSchema)
  });

  return (
    <>
      <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading='Class Information' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <ManageClass operation='Add' methods={methods} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <ClassData />
        </Grid2>
      </Grid2>
    </>
  );
};
