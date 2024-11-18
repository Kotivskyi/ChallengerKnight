import * as React from 'react';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux';

import { PageContentHeader } from '@/components/page-content-header';
import { TabPanel } from '@/components/tab-panel';
import { getUserRole } from '@/domains/auth/slice';
import { ChangePassword } from '../components';
import { StaffProfile, StudentProfile } from '@/components/user-account-profile';

const tabs = ['Profile', 'Change Password'];
export const AccountPage = () => {
  const role = useSelector(getUserRole);
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
            {role === 'student' ? <StudentProfile /> : <StaffProfile />}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <ChangePassword />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};
