import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useLoaderData } from 'react-router-dom';
import { IUser } from '../../models';
import { IReducer, ReducerContext } from '../../context/context';

function Header(props:{handleDrawerToggle:() => void,drawerWidth:number,isOpen:boolean}) {
  const theme = useTheme();
  const reducerContext = useContext(ReducerContext) as IReducer;
  const {state,dispatch} = reducerContext;
  return (
    <AppBar
    position="fixed"
    elevation={0}
    sx={{
      width: { sm: !props.isOpen ? `calc(100% - 164px)` : 'calc(100% - 430px)' },
      ml: { sm: !props.isOpen ? '164px' : '430px' },
      backdropFilter: 'blur(7px)',
      backgroundColor: theme.palette.mode === 'light' ? '#ffffff0d' : '#3e3d3d6e',
      color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
    }}
  >
    <Toolbar sx={{justifyContent:{lg:'flex-end'}}}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={props.handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography display={'flex'} sx={{justifyContent:'flex-end'}} variant="h6" noWrap component="div">
        {state ? state?.firstName + " " + state?.lastName : 'Channel'}
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default Header