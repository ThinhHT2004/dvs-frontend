import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import logoWeb from "../../assets/logo_v4.png";
import { useNavigate } from "react-router-dom";

const StaffDrawer = ({ mylist, state , handleClick}) => {
  const drawerWidth = 240;
  const navigate = useNavigate();

  function handleState(text) {
    if (state === text) {
      return (
        <ListItemButton sx={{backgroundColor: 'lightgrey'}} onClick={() => handleClick(text, navigate)}>
          <ListItemText primary={text}></ListItemText>
        </ListItemButton>
      );
    }else{
      return (
        <ListItemButton onClick={() => handleClick(text, navigate)}>
          <ListItemText primary={text}></ListItemText>
        </ListItemButton>
      );
    }
  }
  return (
    
    <div>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Button>
          <img
            src={logoWeb}
            alt=""
            style={{
              width: "130px",
              marginTop: "-20px",
              marginBottom: "-20px",
              marginRight: "-2.9px",
              cursor: "pointer",
            }}
          />
        </Button>
        <List>
          {mylist.map((text) => (
            <ListItem key={text}>
              {handleState(text)}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default StaffDrawer;