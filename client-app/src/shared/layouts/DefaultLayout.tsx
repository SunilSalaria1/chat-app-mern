import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <>
      <Box bgcolor={"grey.50"}>
        <Box component={"main"} height={"100%"}>
          <Outlet />
        </Box>
        <Box component={"footer"} sx={{ py: 3 }}>
          <Copyright />
        </Box>
      </Box>
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      Chat Mania {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default DefaultLayout;
