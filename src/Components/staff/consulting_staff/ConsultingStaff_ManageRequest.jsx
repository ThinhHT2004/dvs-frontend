import { Box } from '@mui/material'
import React from 'react'
import StaffDrawer from '../StaffDrawer'
import { consulting_staff_navigator } from '../Naviate'

const ConsultingStaff_ManageRequest = () => {
  return (
    <div>
        <Box>
            <Box>
                <StaffDrawer mylist={[
            "Home",
            "Incomming Request",
            "Manage Request",
            "Report",
            "Form",
            "Sign Out",
          ]}
          state="Manage Request"
          handleClick={consulting_staff_navigator}
          ></StaffDrawer>
            </Box>
        </Box>
    </div>
  )
}

export default ConsultingStaff_ManageRequest