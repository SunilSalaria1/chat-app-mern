import { ThemeProvider } from "@emotion/react";
import React, { useState } from "react";
import { io } from "socket.io-client";
import { RouterProvider } from "react-router-dom";
import router from "./shared/router/router";
import { createTheme } from "@mui/material";
import { ThemeModeContext } from "./shared/context/context";
import "./index.css";
import theme from "./theme";
export const socket = io("http://localhost:3100");

export function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={muiTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
