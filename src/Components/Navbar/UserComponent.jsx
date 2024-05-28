import {useState} from "react";
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
  const username = sessionStorage.getItem("username");
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

  if (username === null) {
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
    return (
      <div>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
          {settings.map((setting) => (
            <MenuItem key={setting}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
          
        </Menu>
      </div>
    );
  }
};

export default UserComponent;
