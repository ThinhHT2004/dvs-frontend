import React from 'react'
import StaffDrawer from '../StaffDrawer'


const ConsultingStaff_Home = () => {
  return (
    <div>
        <StaffDrawer mylist={['Home', 'Incomming Request', 'Manage Request', 'Report', 'Form', 'Sign Out']} state='Home'></StaffDrawer>
    </div>
  )
}

export default ConsultingStaff_Home