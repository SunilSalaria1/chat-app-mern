import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h1: { fontWeight: "700" },
    h2: { fontWeight: "600" },
    h3: { fontWeight: "600" },
    h4: { fontWeight: "600" },
    h5: { fontWeight: "600" },
    h6: { fontWeight: "600" },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "unset",
        },
      },
    },
  },
});

export default theme;
