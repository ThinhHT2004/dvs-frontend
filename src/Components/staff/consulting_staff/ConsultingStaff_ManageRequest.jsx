import { Box } from '@mui/material'
import React from 'react'
import StaffDrawer from '../StaffDrawer'
import { consulting__staff_navigator } from '../Naviate'

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
          handleClick={consulting__staff_navigator}
          ></StaffDrawer>
            </Box>
        </Box>
    </div>
  )
}

export default ConsultingStaff_ManageRequest