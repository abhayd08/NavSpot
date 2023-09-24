import { Button, Stack, TextField, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Footer from "./Footer";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [buttonContent, setButtonContent] = useState("Register Now");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateFormDataState = (property, value) => {
    setFormData({ ...formData, [property]: value });
  };

  const register = async (formData) => {
    setButtonContent(<CircularProgress sx={{ color: "white" }} />);
    if (formData.username.length > 1 && formData.password.length > 5) {
      setTimeout(() => {
        localStorage.setItem("username", formData.username);
        localStorage.setItem("password", formData.password);
        navigate("/login");
        setButtonContent("Register Now");
        enqueueSnackbar("Registered successfully. Login now!", {
          variant: "success",
        });
      }, 500);
    } else {
      enqueueSnackbar("Enter the correct username or password.", {
        variant: "warning",
      });
      setButtonContent("Register Now");
    }
  };

  return (
    <>
      <Header component="Register" />
      {localStorage.getItem("isLoggedIn") ? (
        (() => {
          navigate("/");
          enqueueSnackbar("You are already logged in.", { variant: "warning" });
        })()
      ) : (
        <>
          <Stack spacing={2} className="form p-6 md:p-8">
            <h2 className="register-title">Register</h2>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              title="Username"
              name="username"
              placeholder="Enter Username"
              fullWidth
              value={formData.username}
              onChange={(event) => {
                updateFormDataState("username", event.target.value);
              }}
            />
            <TextField
              id="password"
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              fullWidth
              placeholder="Enter a password with minimum 6 characters"
              helperText="Password must be atleast 6 characters long"
              value={formData.password}
              onChange={(event) => {
                updateFormDataState("password", event.target.value);
              }}
            />
            <Button
              className="button"
              variant="contained"
              onClick={() => {
                register(formData);
              }}
            >
              {buttonContent}
            </Button>
            <p className="secondary-action">
              Already have an account?{" "}
              <Link className="link" to="/login">
                Login here
              </Link>
            </p>
          </Stack>
        </>
      )}
      <Reviews />
      <Footer />
    </>
  );
};

export default Register;
