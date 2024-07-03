import {
  Button,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
  Box,
  CssBaseline,
} from '@mui/material';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DiamondIcon from '@mui/icons-material/Diamond';
import RequestIcon from '@mui/icons-material/Assignment';
import ManageIcon from '@mui/icons-material/ManageAccounts';
import ReportIcon from '@mui/icons-material/Assessment';
import FormIcon from '@mui/icons-material/Description';
import SignOutIcon from '@mui/icons-material/ExitToApp';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import logoWeb from '../../assets/logo_v4.png';
import smallLogo from '../../assets/SmallLogo.png';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalculateIcon from '@mui/icons-material/Calculate';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const iconMapping = {
  "Home": <HomeIcon />,
  "Incomming Request": <RequestIcon />,
  "Diamonds Appraisal": <DiamondIcon />,
  "Pending Request": <PendingActionsIcon />,
  "Request": <ManageIcon />,
  "Requests": <ManageIcon />,
  "Receipt": <ReceiptLongIcon />,
  "Report": <ReportIcon />,
  "Form": <FormIcon />,
  "Appointments": <NotificationsNoneOutlinedIcon />,
  "Price Alert": <WarningAmberIcon />,
  "Sign Out": <SignOutIcon />,
  "Services": <LocalOfferIcon />,
  "Calculate": <CalculateIcon />,
  "Check Diamonds": <LibraryAddCheckIcon />,
  "Settings": <ManageAccountsIcon />,
  "Accounts": <ManageAccountsIcon />,
};

const StaffDrawer = ({ mylist, state, handleClick, badgeCount }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  function handleState(text) {
    return (
      <ListItemButton
        sx={{
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          backgroundColor: state === text ? 'lightgrey' : 'inherit',
        }}
        onClick={() => handleClick(text, navigate)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
         
        
            {iconMapping[text]}
          
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />

      </ListItemButton>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DrawerHeader>
          {open ? (
            <Button onClick={() => navigate('/')}>
              <img
                src={logoWeb}
                alt=""
                style={{
                  width: '130px',
                  cursor: 'pointer',
                  marginBottom: '-20px',
                  marginTop: '-20px',
                }}
              />
            </Button>
          ) : (
            <Button onClick={() => navigate('/')}>
              <img
                src={smallLogo}
                alt=""
                style={{
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                }}
              />
            </Button>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {mylist.map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              {handleState(text)}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};

export default StaffDrawer;
