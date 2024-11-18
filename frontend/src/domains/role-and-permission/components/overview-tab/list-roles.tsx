import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { Circle, MoreVert } from '@mui/icons-material';

import { useRolePermission } from '../../context/role-permission-provider';
import { AddEditRole } from '../add-edit-role';
import { HandleRoleStatus } from '../handle-role-status';

const initialState = {
  anchorElement: null,
  id: 0,
  name: '',
  status: false,
  action: '',
  modalTitleText: ''
};
type InitialStateProps = {
  anchorElement: HTMLElement | null;
  id: number;
  name: string;
  status: boolean;
  action?: string;
  modalTitleText: string;
};

export const ListRoles = () => {
  const {
    state: { roles }
  } = useRolePermission();
  const [state, setState] = React.useState<InitialStateProps>(initialState);

  const menuItems: Array<{ action: string; name: string; status: boolean }> = React.useMemo(
    () => [
      { action: 'edit', name: 'Edit Role', status: false },
      { action: 'disable', name: 'Disable Role', status: false },
      { action: 'enable', name: 'Enable Role', status: true }
    ],
    []
  );

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: number,
    name: string,
    status: boolean
  ) => {
    setState((prevState) => ({
      ...prevState,
      anchorElement: event.currentTarget,
      id,
      name,
      status,
      modalTitleText: ''
    }));
  };
  const handleAnchorElementClose = () => {
    setState((prevState) => ({ ...prevState, anchorElement: null }));
  };
  const handleMenuItemClick = (action: string, modalTitleText: string) => {
    setState((prevState) => ({ ...prevState, action, modalTitleText, anchorElement: null }));
  };
  const closeModal = () => {
    setState((prevState) => ({ ...prevState, action: '' }));
  };

  const { anchorElement, status: currentRoleStatus, action, modalTitleText, name, id } = state;
  return (
    <>
      <Grid2 container spacing={3}>
        {roles.map(({ id, name, status, usersAssociated }) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={id}>
            <Card variant='outlined'>
              <CardContent sx={{ backgroundColor: '#f3f6f999' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {status ? (
                    <Circle sx={{ fontSize: '12px' }} color='success' />
                  ) : (
                    <Circle sx={{ fontSize: '12px' }} color='error' />
                  )}
                  <Typography
                    sx={{ fontSize: '18px', fontWeight: 500, margin: '5px' }}
                    gutterBottom
                  >
                    {name}
                  </Typography>
                  <div style={{ marginLeft: 'auto' }}>
                    <IconButton
                      aria-label='more'
                      id='long-button'
                      aria-haspopup='true'
                      onClick={(event) => handleMenuClick(event, id, name, status)}
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      open={Boolean(anchorElement)}
                      anchorEl={anchorElement}
                      onClose={handleAnchorElementClose}
                      keepMounted
                    >
                      {menuItems.map((menu) => (
                        <MenuItem
                          key={menu.action}
                          disabled={currentRoleStatus === menu.status}
                          onClick={() => handleMenuItemClick(menu.action, menu.name)}
                        >
                          {menu.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </Box>
                <Typography sx={{ fontSize: '16px', color: 'text.secondary', mb: '20px' }}>
                  {usersAssociated} people
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {action === 'edit' && (
        <AddEditRole
          roleName={name}
          roleId={id}
          titleText={modalTitleText}
          closeAddEditRoleModalOpen={closeModal}
        />
      )}

      {(action === 'enable' || action === 'disable') && (
        <HandleRoleStatus
          title={modalTitleText}
          bodyText={`Are you sure you want to ${action} this role?`}
          roleId={id}
          roleStatus={action === 'disable' ? false : true}
          closeModals={closeModal}
        />
      )}
    </>
  );
};
