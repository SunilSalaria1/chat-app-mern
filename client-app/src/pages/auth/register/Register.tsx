import {
  Container,
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RLink, useNavigate } from "react-router-dom";
import { Verified } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "../../../shared/services/auth.service";

export const registerSchema = z
  .object({
    firstName: z.string().min(3, "Min characters must be 3").max(100),
    lastName: z.string().min(3, "Min characters must be 3").max(100),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
    gender: z.enum(["male", "female", "other"], {
      message: "Please select a gender",
    }),
    dateOfBirth: z
      .string({ message: "Date of birth is required" })
      .transform((e) => new Date(e)),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"], // this field will receive the error message
    }
  );

export type RegisterSchema = z.infer<typeof registerSchema>;

const authService = new AuthService();

function Register() {
  const [passwordVisible, setPasswordVisible] = useState({
    showConfirmPassword: false,
    showPassword: false,
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // Validate on each change
    shouldFocusError: true, // Optionally focus the first error
    defaultValues: {
      gender: "male",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await authService.register(data);
      if (!response?.error) navigate("/sign-in");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 68px)",
        }}
      >
        <Card>
          <CardContent sx={{ px: 4, pb: 5 }}>
            <Box textAlign={"center"}>
              <Avatar sx={{ m: 1, mx: "auto", bgcolor: "primary.main" }}>
                <Verified />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create your account
              </Typography>
              <Typography paragraph>
                Let's create your profile in 2 minutes.
              </Typography>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                {...register("firstName")}
                required
                fullWidth
                id="firstName"
                label="First name"
                name="firstName"
                autoComplete="firstName"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                autoFocus
              />
              <TextField
                margin="normal"
                {...register("lastName")}
                required
                fullWidth
                id="lastName"
                label="Last name"
                name="lastName"
                autoComplete="lastName"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                autoFocus
              />
              <TextField
                {...register("dateOfBirth")}
                margin="normal"
                required
                fullWidth
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                id="dateOfBirth"
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                {...register("email")}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
                autoFocus
              />
              <FormControl margin="normal">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      row
                      aria-labelledby="Gender"
                      value={value}
                      onChange={onChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  )}
                ></Controller>
              </FormControl>
              <TextField
                margin="normal"
                {...register("password")}
                required
                fullWidth
                name="password"
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
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
                {...register("confirmPassword")}
                required
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
                            showConfirmPassword:
                              passwordVisible.showConfirmPassword
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
