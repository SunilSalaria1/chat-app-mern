import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IUser } from "../../models";
import {
  CurrentUserContext,
  IReducer,
  ReducerContext,
} from "../../context/context";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import AuthService from "../../services/auth.service";

const authService = new AuthService();

function Header(props: {
  handleDrawerToggle: () => void;
  drawerWidth: number;
  isOpen: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const reducerContext = useContext(ReducerContext) as IReducer;
  const { state, dispatch } = reducerContext;
  const currentUser = useContext(CurrentUserContext) as IUser;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (isLogin: boolean = false) => {
    if (isLogin) {
      try{
      const result = await authService.logout();
      console.log(result,'errr')
        // if (data) navigate("/sign-in");
      }catch(e){
        console.log(e,'errror')
      }
      
    } else {
      setAnchorEl(null);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          sm: !props.isOpen ? `calc(100% - 164px)` : "calc(100% - 430px)",
        },
        ml: { sm: !props.isOpen ? "164px" : "430px" },
        backdropFilter: "blur(7px)",
        backgroundColor:
          theme.palette.mode === "light" ? "#ffffff0d" : "#3e3d3d6e",
        color:
          theme.palette.mode === "light"
            ? theme.palette.common.black
            : theme.palette.common.white,
      }}
    >
      <Toolbar sx={{ justifyContent: { lg: "space-between" } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <Typography display={"flex"} variant="h6" noWrap component="div">
            Chat Mania
          </Typography>
          <Typography variant="h6" noWrap component="div">
            {state ? state?.firstName + " " + state?.lastName : ""}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {currentUser?.firstName?.at(0) ?? ""}
          </Avatar>
        </IconButton>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => handleClose(false)}
        onClick={() => handleClose(false)}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleClose(false)}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={() => handleClose(false)}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClose(false)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleClose(true)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Header;
