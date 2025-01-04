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
import {useNavigate } from "react-router-dom";
import {
  UserContext,IUserContext
} from "../../context/context";

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
        backdropFilter: "blur(7px)",
        backgroundColor:
          theme.palette.mode === "light" ? "#b5adad0d" : "#3e3d3d6e",
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
          <Typography variant="h6" noWrap component="div">
            {state ? state.name ?? (state?.firstName + " " + state?.lastName) : ""}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
