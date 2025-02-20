import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { UserContext, IUserContext } from "../../context/context";

function Header(props: {
  handleDrawerToggle: () => void;
  drawerWidth: number;
  isOpen: boolean;
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const reducerContext = useContext(UserContext) as any;
  const { state, dispatch } = reducerContext;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: {
          sm: !props.isOpen ? `calc(100% - 164px)` : "calc(100% - 430px)",
        },
        ml: { sm: !props.isOpen ? "164px" : "430px" },
        backgroundColor: theme.palette.mode === "light" ? "white" : "black",
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
        <Typography
          variant="h6"
          noWrap
          component="div"
          textTransform="capitalize"
        >
          {state ? state.name ?? state?.fullName : ""}
        </Typography>
        <Box>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <NotificationImportantIcon />
          </IconButton>
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
