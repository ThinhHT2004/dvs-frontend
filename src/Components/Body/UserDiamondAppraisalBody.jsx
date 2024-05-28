import React from 'react'

const UserDiamondAppraisalBody = () => {
  const username = sessionStorage.getItem("username");
  const navigator = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
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
  }
  return (
    <div className='body'>

    </div>
  )
}

export default UserDiamondAppraisalBody