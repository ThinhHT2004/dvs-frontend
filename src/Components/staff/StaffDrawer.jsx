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
const StaffDrawer = ({ mylist, state }) => {
  const drawerWidth = 240;

  function handleState(text) {
    if (state === text) {
      return (
        <ListItemButton sx={{backgroundColor: 'red'}}>
          <ListItemText primary={text}></ListItemText>
        </ListItemButton>
      );
    }else{
      console.log(state)
      return (
        <ListItemButton>
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
