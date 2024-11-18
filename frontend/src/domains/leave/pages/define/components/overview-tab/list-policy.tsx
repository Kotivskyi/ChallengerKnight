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

import { useLeaveDefine } from '../../context/leave-define-provider';
import { AddEditPolicy } from '../add-edit-policy';
import { PolicyStatus } from '../policy-status';
import { AddPeopleToPolicy } from '../add-people-to-policy';

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
  action: string;
  modalTitleText: string;
};
export const ListPolicy = () => {
  const [state, setState] = React.useState<InitialStateProps>(initialState);
  const {
    state: { policies }
  } = useLeaveDefine();

  const menuItems = [
    { action: 'editPolicy', name: 'Edit Policy', status: false },
    { action: 'enable', name: 'Enable Policy', status: true },
    { action: 'disable', name: 'Disable Policy', status: false },
    { action: 'addPeopleToPolicy', name: 'Add People to Policy', status: false }
  ];
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
        {policies &&
          policies.length > 0 &&
          policies.map(({ id, name, totalUsersAssociated, isActive }) => (
            <Grid2 size={{ xs: 12, md: 4 }} key={id}>
              <Card variant='outlined'>
                <CardContent sx={{ backgroundColor: '#f3f6f999' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Circle sx={{ fontSize: '12px' }} color={isActive ? 'success' : 'error'} />
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
                        onClick={(event) => handleMenuClick(event, id, name, isActive)}
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
                    {totalUsersAssociated} people
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
      </Grid2>

      {action === 'editPolicy' && (
        <AddEditPolicy
          policyId={id}
          policyName={name}
          title={modalTitleText}
          closeModal={closeModal}
        />
      )}
      {['enable', 'disable'].includes(action) && (
        <PolicyStatus
          title={modalTitleText}
          bodyText={`Are you sure you want to ${action} this policy?`}
          policyId={id}
          policyStatus={action === 'disable' ? false : true}
          closeModal={closeModal}
        />
      )}
      {action === 'addPeopleToPolicy' && (
        <AddPeopleToPolicy policyId={id} closeModal={closeModal} />
      )}
    </>
  );
};
