import * as React from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';

import { TabPanel } from '@/components/tab-panel';
import { PageContentHeader } from '@/components/page-content-header';
import { StudentProfile } from '@/components/user-account-profile';

const tabs = ['Profile'];
export const ViewStudent = () => {
  const { id } = useParams();
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    setTab(0);
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, index: number) => {
    setTab(index);
  };

  return (
    <>
      <PageContentHeader heading='Account Details' />
      <Box component={Paper} sx={{ p: 1 }}>
        <Tabs
          variant='scrollable'
          value={tab}
          onChange={handleTabChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {tabs.map((tab) => (
            <Tab key={tab} label={tab} />
          ))}
        </Tabs>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <TabPanel value={tab} index={0}>
            <StudentProfile id={id} />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};
