import React from "react";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
} from "@mui/material";
import { consulting_staff_navigator } from "../Naviate";

const ConsultingStaff_Home = () => {


  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <StaffDrawer
          mylist={[
            "Home",
            "Incomming Request",
            "Request",
            "Report",
            "Form",
            "Sign Out",
          ]}
          state="Home" handleClick={consulting_staff_navigator}
        ></StaffDrawer>
        
      </Box>
    </div>
  );
};

export default ConsultingStaff_Home;
