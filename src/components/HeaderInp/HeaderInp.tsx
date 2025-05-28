import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function HeaderInp() {
  return (
    <Paper
      component="form"
      sx={{bgcolor: "#333333"
, p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, ml: "20px" , color: "#fff" }}
    >
     
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#fff"  }}
        placeholder="Search for any training you want "
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon sx={{
            color: "#fff" 
        }} />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
    </Paper>
  );
}
