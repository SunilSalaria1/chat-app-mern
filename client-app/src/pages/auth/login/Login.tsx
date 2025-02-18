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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const authService = new AuthService();

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must contain 8 characters")
    .max(32, "Password length should be less than 32 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    shouldFocusError: true,
  });

  const onSubmit = async (form: LoginSchema) => {
    try {
      let login = await authService.login(form);
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
          minHeight: "calc(100vh - 45px)",
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
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                {...register("email")}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                margin="normal"
                {...register("password")}
                type={passwordVisible ? "text" : "password"}
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setPasswordVisible(
                             passwordVisible
                              ? false
                              : true,
                          )
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {passwordVisible ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                sx={{ mt: 2, mb: 2 }}
              >
                Login
              </Button>
              <Box textAlign={"center"} fontFamily="default" fontSize="small">
                {"Don't have an account?"}{" "}
                <Link component={RLink} to="/sign-up" variant="body2">
                  Sign up
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
