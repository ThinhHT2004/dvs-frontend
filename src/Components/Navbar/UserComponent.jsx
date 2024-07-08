import React, {useState} from "react";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import user_icon from '../../assets/user_icon.jpg'

const UserComponent = () => {
  const role = sessionStorage.getItem("role");
  const navigator = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  function signIn() {
    navigator("/accounts/signin");
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogOut(){
    sessionStorage.clear();
    localStorage.clear();
    navigator('/');
  }

  function handleVault(){
    navigator('/vault');
  }
  function handleVault_Settings(){
    navigator('/settings');
  }

  function handleHome(){
    switch(role){
      case "CONSULTING_STAFF": navigator('/consulting-staff/home'); break;
      case "VALUATION_STAFF": navigator('/valuation-staff/diamonds-appraisal'); break;
      case "MANAGER": navigator('/manager/home'); break;
      case "ADMIN": navigator('/admin/home'); break;
    }
  }

  if (role === null) {
    return (
      <div>
        <Button
          variant="contained"
          onClick={() => signIn()}
          sx={{
            backgroundColor: "#69CEE2",
            borderRadius: "8px",
            textTransform: "none",
            marginRight: "30px",
          }}
        >
          Sign In
        </Button>
      </div>
    );
  } else {
    if(role === 'CUSTOMER'){
      return (
        <div>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,paddingLeft: '45px',paddingRight: '45px' }}>
              <Avatar alt="Remy Sharp" src={user_icon} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
          <MenuItem>
            <Typography textAlign="center" onClick={() => handleVault()}>Vault</Typography>
          </MenuItem>
          <MenuItem >
            <Typography textAlign="center" onClick={() => handleVault_Settings()}>Edit Profile</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center" onClick={() => handleLogOut()}>Log Out</Typography>
          </MenuItem>
          </Menu>
        </div>
      );
    }else{
      return (
        <div>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,paddingLeft: '45px',paddingRight: '45px' }}>
              <Avatar alt="Remy Sharp" src={user_icon} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
          <MenuItem>
            <Typography textAlign="center" onClick={() => handleHome()}>Home</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center" onClick={() => handleLogOut()}>Log Out</Typography>
          </MenuItem>
          </Menu>
        </div>
      );
    }
    
  }
};

export default UserComponent;
