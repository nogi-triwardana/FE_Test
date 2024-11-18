import { AppBar, AppBarProps, Avatar, Box, MenuItem, Typography } from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import _ from 'lodash';

// imports custom component
import { Dropdown } from '@/components/atoms';
import { signOut } from 'next-auth/react';

type refType = {
  // add anything atribute with ref related
} | any;

const Header = forwardRef<refType, AppBarProps>(({
}, ref) => {

  const handleLogout = () => {
    signOut();
  }

  useImperativeHandle(ref, () => ({

  }));

  return (
    <Box 
      sx={{ 
        height: '120px',
        width: '100%',
        position: 'relative' 
      }}
    >
      <AppBar 
        position="absolute"
        sx={{ 
          display: 'flex', 
          flexGrow: 1,
          flexDirection: 'row', 
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '16px',
          transition: "width 4s linear",
          height: '100%',
        }}
      >
        <Box 
          component="div"
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: "48px",
              height: "48px",
            }}
          />
          <Dropdown
            trigger={<MoreVertOutlinedIcon sx={{ cursor: "pointer" }} />}
            menu={
              <MenuItem>
                <Typography onClick={handleLogout}>Logout</Typography>
              </MenuItem>
            }
          />
        </Box>
      </AppBar>
    </Box>
  );
});

export default Header;