import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import Reviews from "./Reviews";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [buttonContent, setButtonContent] = useState("Login to TripAdvise");
  const navigate = useNavigate();

  const login = async (formData) => {
    setButtonContent(<CircularProgress sx={{ color: "white" }} />);
    setTimeout(() => {
      if (
        localStorage.getItem("username") === formData.username &&
        localStorage.getItem("password") === formData.password
      ) {
        enqueueSnackbar("Logged in successfully !", { variant: "success" });
        localStorage.setItem("isLoggedIn", true);
        setButtonContent("Login to TripAdvise");
        navigate("/");
      } else {
        enqueueSnackbar("Enter the correct username or password.", {
          variant: "warning",
        });
        setButtonContent("Login to TripAdvise");
      }
    }, 800);
  };

  return (
    <>
      <Header component="Login" />
      {localStorage.getItem("isLoggedIn") ? (
        (() => {
          enqueueSnackbar("You are already logged in.", { variant: "warning" });
          navigate("/");
        })()
      ) : (
        <Stack spacing={2} className="form p-6 md:p-8">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            value={formData.username}
            onChange={(event) => {
              setFormData({ ...formData, username: event.target.value });
            }}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
            fullWidth
          />
          <Button
            className="button"
            variant="contained"
            onClick={() => {
              login(formData);
            }}
          >
            {buttonContent}
          </Button>
          <p className="secondary-action">
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register Now
            </Link>
          </p>
        </Stack>
      )}
      <Reviews />
      <Footer />
    </>
  );
};

export default Login;
