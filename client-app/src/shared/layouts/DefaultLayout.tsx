import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <>
      <Box className="auth-bg" minHeight="100vh" bgcolor={"grey.100"} sx={{ backgroundSize: "900px", backgroundPosition:"bottom right", backgroundRepeat:"no-repeat" , '@media (max-width:600px)': {backgroundImage: "none"}}}>
        <Box component="main" height="100%" paddingTop="10px" paddingBottom="60px">
          <Outlet />  
        </Box>
        <Box component="footer" padding="12px" position="fixed" bottom="0" width="100%" bgcolor="white" zIndex="1">
          <Copyright />
        </Box>
      </Box>
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {"Copyright © "}
      Chat Mania {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default DefaultLayout;
