import * as React from 'react';
import { Box, Drawer, Toolbar } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { AppBarLayout } from './app-bar-layout';
import { DrawerContent } from './drawer-content';

const drawerWidth = 280;

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openNavMenu, setOpenNavMenu] = React.useState<null | string>(null);
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [isClosing, setIsClosing] = React.useState<boolean>(false);

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleNavigationClick = (name: string) => {
    setOpenNavMenu(name === openNavMenu ? null : name);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarLayout
        handleDrawerToggle={handleDrawerToggle}
        handleMenu={handleMenu}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        drawerWidth={drawerWidth}
      />
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          <DrawerContent handleNavigationClick={handleNavigationClick} openNavMenu={openNavMenu} />
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          <DrawerContent handleNavigationClick={handleNavigationClick} openNavMenu={openNavMenu} />
        </Drawer>
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
      </Box>
    </Box>
  );
};
