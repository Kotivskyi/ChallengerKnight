import * as React from 'react';
import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';

import { PageContentHeader } from '@/components/page-content-header';
import { TabPanel } from '@/components/tab-panel';
import { useGetPermissionsQuery, useGetRolesQuery } from '../api/role-and-permission-api';
import { RoleTabs } from '../components/roles-tab/roles-tab';
import { Permission } from '@/utils/type/misc';
import { ExtendedPermission } from '../types';
import { RolePermissionProvider, useRolePermission } from '../context/role-permission-provider';
import { OverviewTab } from '../components/overview-tab/overview-tab';

const RoleAndPermissionPage = () => {
  const { data: rolesData } = useGetRolesQuery();
  const { data: permissionsData } = useGetPermissionsQuery();
  const { state, dispatch } = useRolePermission();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const initializePermissions = React.useCallback((menus: Permission[]): ExtendedPermission[] => {
    return menus.map((menu) => ({
      ...menu,
      isPermissionAvailable: false,
      subMenus: menu?.subMenus ? initializePermissions(menu.subMenus) : []
    }));
  }, []);

  React.useEffect(() => {
    if (permissionsData?.permissions) {
      dispatch({
        type: 'SET_PERMISSIONS',
        payload: initializePermissions(permissionsData.permissions)
      });
    }
  }, [permissionsData?.permissions, dispatch, initializePermissions]);
  React.useEffect(() => {
    if (rolesData) {
      dispatch({ type: 'SET_ROLES', payload: rolesData.roles ?? [] });
      dispatch({ type: 'SET_ROLE_TAB', payload: 0 });
    }
  }, [rolesData, dispatch]);

  const handleRoleTabChange = (_event: React.SyntheticEvent, index: number) => {
    dispatch({ type: 'SET_ROLE_TAB', payload: index });
  };

  const { roleTab, roles } = state;
  return (
    <>
      <PageContentHeader
        icon={<AdminPanelSettings sx={{ mr: 1 }} />}
        heading='Roles & Permissions Setting'
      />
      <Box
        flexDirection={isSmallScreen ? 'column' : 'row'}
        sx={{ display: 'flex', bgcolor: 'background.paper', flexGrow: 1 }}
      >
        <Tabs
          orientation={isSmallScreen ? 'horizontal' : 'vertical'}
          variant='scrollable'
          value={roleTab}
          onChange={handleRoleTabChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label='Overview' sx={{ borderBottom: 1, borderColor: 'divider' }} />
          {roles &&
            roles.map(({ id, name, usersAssociated }) => (
              <Tab key={id} label={`${name} (${usersAssociated})`} />
            ))}
        </Tabs>

        <TabPanel value={roleTab} index={0}>
          <OverviewTab />
        </TabPanel>
        <RoleTabs />
      </Box>
    </>
  );
};

export const RoleAndPermission = () => {
  return (
    <RolePermissionProvider>
      <RoleAndPermissionPage />
    </RolePermissionProvider>
  );
};
