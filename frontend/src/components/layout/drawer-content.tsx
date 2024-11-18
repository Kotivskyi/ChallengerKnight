import * as React from 'react';
import { AcUnitOutlined, ArrowDropDown, ArrowRight } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserMenus } from '@/domains/auth/slice';

type DrawerContentProps = {
  handleNavigationClick: (name: string) => void;
  openNavMenu: string | null;
};

export const DrawerContent: React.FC<DrawerContentProps> = ({
  handleNavigationClick,
  openNavMenu
}) => {
  const menus = useSelector(getUserMenus);
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div>
      <Toolbar sx={{ textDecoration: 'none' }} component={Link} to='/app'>
        <AcUnitOutlined color='primary' fontSize='large' />
        <Typography variant='h6' sx={{ ml: 2, color: blue[800] }}>
          School Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List component='nav' sx={{ width: '100%' }}>
        {menus &&
          menus.map(({ name, path, subMenus, icon }) => {
            if (Array.isArray(subMenus) && subMenus.length > 0) {
              return (
                <Box key={name}>
                  <ListItemButton onClick={() => handleNavigationClick(name)}>
                    <ListItemIcon>
                      <img width='20px' height='20px' src={`${API_URL}/${icon}`} />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                    {openNavMenu === name ? <ArrowDropDown /> : <ArrowRight />}
                  </ListItemButton>
                  <Collapse in={openNavMenu === name} timeout='auto' unmountOnExit>
                    <List component='div'>
                      {subMenus.map(({ name, path }) => (
                        <ListItemButton
                          key={name}
                          component={Link}
                          to={`/app/${path}`}
                          sx={{ paddingLeft: '75px' }}
                        >
                          <ListItemText primary={name} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            } else {
              return (
                <ListItemButton key={name} component={Link} to={`/app/${path}`}>
                  <ListItemIcon>
                    <img width='20px' height='20px' src={`${API_URL}/${icon}`} />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              );
            }
          })}
      </List>
    </div>
  );
};
