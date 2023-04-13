import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";

import * as EmailValidator from "email-validator";
import { AuthService } from "../services/authService";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import {
  setSubStationCache,
  setTokenCache,
  setUserCache,
} from "@/store/auth-store";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Fuel Management System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Login() {
  const router = useRouter();
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    AuthService.login({
      email: data.get("email"),
      password: data.get("password"),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUserCache(res.data.user);
          setTokenCache(res.data.data.token.replace(/['"]+/g, ""));
          localStorage.setItem(
            "token",
            JSON.stringify(res.data.data.token.replace(/['"]+/g, ""))
          );

          if (res.data.user.userType === "Super_Admin") {
            router.push("/dashboard");
          } else if (res.data.user.userType === "Admin") {
            localStorage.setItem(
              "substation",
              JSON.stringify(res.data.substation)
            );
            setSubStationCache(res.data.substation);
            router.push("/substation-dashboard");
          } else if (res.data.user.userType === "Customer") {
            Swal.fire({
              title: "Error!",
              text: "Access Denied",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        } else {
          setLoginSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url("../pictures/fuelStation.jpeg")`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
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
                onChange={(e) => {
                  setEmailIsValid(EmailValidator.validate(e.target.value));
                }}
              />
              {!emailIsValid && (
                <InputLabel
                  style={{
                    fontSize: "10px",
                    color: "red",
                    marginBottom: "10px",
                  }}
                  align="left"
                >
                  Please enter a valid email!
                </InputLabel>
              )}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {!loginSuccess && (
                <InputLabel
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginBottom: "10px",
                  }}
                >
                  Invalid credentials!
                </InputLabel>
              )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
