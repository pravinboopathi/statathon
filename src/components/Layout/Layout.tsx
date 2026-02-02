import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Breadcrumbs,
  Link,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Dashboard,
  DataUsage,
  Api,
  Description,
  Help,
  Home,
  NavigateNext,
  QueryBuilder,
  Language,
  Logout,
  Settings,
} from '@mui/icons-material';
import { govColors } from '../../theme/governmentTheme';

interface LayoutProps {
  children: React.ReactNode;
  onNavigationChange?: (view: string) => void;
  currentView?: string;
}

const drawerWidth = 260;

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Statistics Dashboard',
    icon: <Dashboard />,
    description: 'Overview and key metrics',
  },
  {
    id: 'datasets',
    label: 'Survey Datasets',
    icon: <DataUsage />,
    description: 'Browse PLFS, HCES & other surveys',
  },
  {
    id: 'query-builder',
    label: 'Query Builder',
    icon: <QueryBuilder />,
    description: 'Build custom data queries',
  },
  {
    id: 'api-docs',
    label: 'API Documentation',
    icon: <Api />,
    description: 'RESTful API reference',
  },
];

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onNavigationChange,
  currentView = 'dashboard'
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (view: string) => {
    onNavigationChange?.(view);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const getCurrentPageInfo = () => {
    const current = navigationItems.find(item => item.id === currentView);
    return {
      title: current?.label || 'MoSPI Data Gateway',
      description: current?.description || 'Statistical Data Access Platform'
    };
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Government Header in Drawer */}
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${govColors.primary.main} 0%, ${govColors.primary.dark} 100%)`,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={1}>
          MoSPI
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Statistics Gateway
        </Typography>
        <Chip 
          label="BETA" 
          size="small" 
          sx={{ 
            mt: 1, 
            backgroundColor: govColors.secondary.main,
            color: 'white',
            fontSize: '0.7rem'
          }} 
        />
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ px: 1, py: 2 }}>
          {navigationItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={currentView === item.id}
                onClick={() => handleNavigation(item.id)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  '&.Mui-selected': {
                    backgroundColor: govColors.government.lightBlue,
                    borderLeft: `4px solid ${govColors.primary.main}`,
                    '&:hover': {
                      backgroundColor: govColors.government.lightBlue,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: currentView === item.id ? govColors.primary.main : 'inherit',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  primaryTypographyProps={{
                    fontWeight: currentView === item.id ? 600 : 400,
                    fontSize: '0.875rem',
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2 }} />

        {/* Quick Links */}
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} mb={1} display="block">
            QUICK LINKS
          </Typography>
          <List dense>
            <ListItemButton sx={{ borderRadius: 1, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Description fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="User Guide" 
                primaryTypographyProps={{ fontSize: '0.8rem' }}
              />
            </ListItemButton>
            <ListItemButton sx={{ borderRadius: 1, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Help fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Support" 
                primaryTypographyProps={{ fontSize: '0.8rem' }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          backgroundColor: govColors.background.grey,
        }}
      >
        <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
          Ministry of Statistics & Programme Implementation
        </Typography>
        <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
          Government of India
        </Typography>
      </Box>
    </Box>
  );

  const pageInfo = getCurrentPageInfo();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box>
              <Typography variant="h6" noWrap component="div" fontWeight={700}>
                {pageInfo.title}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {pageInfo.description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Language Toggle */}
            <Button
              color="inherit"
              startIcon={<Language />}
              size="small"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              EN
            </Button>

            {/* User Menu */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Help fontSize="small" />
                </ListItemIcon>
                Help
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation"
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: govColors.background.default,
        }}
      >
        <Toolbar /> {/* Spacer for fixed AppBar */}
        
        {/* Breadcrumbs */}
        <Box sx={{ px: 3, py: 2, backgroundColor: 'white', borderBottom: 1, borderColor: 'divider' }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">{pageInfo.title}</Typography>
          </Breadcrumbs>
        </Box>

        {/* Page Content */}
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
