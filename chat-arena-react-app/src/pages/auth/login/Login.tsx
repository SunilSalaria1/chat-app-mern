import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RLink } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthService from "../../../shared/services/auth.service";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const authService = new AuthService();

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let form = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    try {
      let login = await authService.login(
        form as { email: string; password: string }
      );
      console.log(login);
      if (login.token) {
        localStorage.setItem("token", login.token);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card>
          <CardContent sx={{ px: 4, pb: 5 }}>
            <Box textAlign={"center"}>
              <Avatar sx={{ m: 1, mx: "auto", bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
               Welcome back
              </Typography>
              <Typography paragraph>Please enter your details</Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, mb: 2}}
              >
                Login
              </Button>
              <Box textAlign={"center"}>
             {"Don't have an account?"} <Link component={RLink} to="/sign-up" variant="body2">Sign up</Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
