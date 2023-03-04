import React from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Header =() => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SportsEsportsIcon fontSize='large'/>
          <Typography variant="h6" color="#fff" component="div" sx={{marginLeft: 1}}>
             Games
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header
