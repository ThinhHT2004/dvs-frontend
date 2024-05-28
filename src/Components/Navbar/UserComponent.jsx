import React from 'react'
import { Button, Link , Avatar} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/user_icon.jpg';

const UserComponent = () => {
    const username = sessionStorage.getItem('username');
    const navigator = useNavigate();
    
    function signIn(){
        navigator('/accounts/signin')
      }
    

    if (username === null){
        return (
            <div>
                <Button 
                variant="contained" 
                onClick={() => signIn()}
                sx={{
                    backgroundColor: '#69CEE2',
                    borderRadius: '8px',
                    textTransform: 'none',
                    marginRight: '30px'
                }}>
                Sign In
                </Button>
            </div>
        )
    }else{
        return(
            <div>
                <Button>
                    <Avatar src={icon} sx={{width: 35, height: 35}}/>
                </Button>
            </div>
        )
    }

}

export default UserComponent