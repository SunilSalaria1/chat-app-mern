import {
  Container,
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RLink } from "react-router-dom";
import { Verified } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState({
    showConfirmPassword: false,
    showPassword: false,
  });

  return (
    <Container maxWidth="sm">
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
                <Verified />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create you account
              </Typography>
              <Typography paragraph>
                Let's create your profile in 2 minutes.
              </Typography>
            </Box>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                id="dateOfBirth"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
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
                type={passwordVisible.showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setPasswordVisible({
                            ...passwordVisible,
                            showPassword: passwordVisible.showPassword
                              ? false
                              : true,
                          })
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {passwordVisible.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setPasswordVisible({
                            ...passwordVisible,
                            showConfirmPassword: passwordVisible.showConfirmPassword
                              ? false
                              : true,
                          })
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {passwordVisible.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, mb: 2 }}
              >
                Register
              </Button>
              <Box textAlign={"center"}>
                Already have an account?{" "}
                <Link component={RLink} to="/sign-in" variant="body2">
                  Sign in
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Register;
