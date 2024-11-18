import * as React from 'react';
import { ArrowDropDown, Logout, MenuBook, Person } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useLogoutMutation } from '@/domains/auth/api';
import { getUserEmail, getUserName, getUserRole, resetUser } from '@/domains/auth/slice';

type AppBarLayoutProps = {
  handleDrawerToggle: () => void;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
  drawerWidth: number;
};

export const AppBarLayout: React.FC<AppBarLayoutProps> = ({
  handleDrawerToggle,
  handleMenu,
  anchorEl,
  handleMenuClose,
  drawerWidth
}) => {
  const currentUserEmail = useSelector(getUserEmail);
  const currentUserName = useSelector(getUserName);
  const currentUserRole = useSelector(getUserRole);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    handleMenuClose();
    event.preventDefault();
    try {
      await logout().unwrap();
      dispatch(resetUser());
      navigate('/auth/login');
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuBook />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button
          sx={{ color: 'black' }}
          size='large'
          endIcon={<ArrowDropDown />}
          onClick={handleMenu}
          variant='text'
        >
          {currentUserName}
        </Button>
        <Menu
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          id='menu-appbar'
          anchorEl={anchorEl}
          keepMounted
        >
          <MenuItem>
            <div>
              <Typography variant='body1'>{currentUserEmail}</Typography>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                {currentUserRole}
              </Typography>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem component={Link} to='/app/account' onClick={handleMenuClose}>
            <ListItemIcon>
              <Person fontSize='small' />
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to='/#' onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
