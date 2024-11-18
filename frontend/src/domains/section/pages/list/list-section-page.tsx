import { Grid2 } from '@mui/material';
import { Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PageContentHeader } from '@/components/page-content-header';
import { ManageSection } from '../../components';
import { SectionForm, SectionFormSchema } from '../../types';
import { SectionData } from './section-data';

export const ListSectionPage = () => {
  const methods = useForm<SectionForm>({
    defaultValues: { name: '' },
    resolver: zodResolver(SectionFormSchema)
  });

  return (
    <>
      <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading='Section Information' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <ManageSection operation='Add' methods={methods} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <SectionData />
        </Grid2>
      </Grid2>
    </>
  );
};
