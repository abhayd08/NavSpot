import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import "./Header.css";

export default ({ component }) => {
  const navigate = useNavigate();

  return (
    <>
      <div id="header" className="pt-7 pb-3" direction="row">
        <a href="/">
          <div className="text-3xl" id="header-brand">
            TripAdvise
          </div>
        </a>
        <div className="nav-menu space-x-8">
          <div
            className="nav-item text-sm"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>
          <div
            className="nav-item text-sm"
            onClick={() => {
              navigate("/explore");
            }}
          >
            Explore
          </div>
        </div>
        <div className="nav-menu space-x-2 md:space-x-5">
          {!localStorage.getItem("isLoggedIn") ? (
            <>
              <div
                className={`nav-item login text-xs sm:text-sm mr-0.5 ${
                  component === "Login" ? "d-none" : ""
                }`}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </div>
              <Button
                variant="contained"
                size="small"
                id="register"
                className={`${component === "Register" ? "d-none" : ""}`}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              variant="text"
              size="small"
              id="logout"
              className="mr-1 logout"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("searchDestinations");
                localStorage.removeItem("location");
                localStorage.removeItem("category");
                enqueueSnackbar("Logged out succesfully.", {
                  variant: "warning",
                });
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      <div id="header-banner" className="p-0.5 sm:p-1">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-3 text-center banner-txt">
          It's a Big World Out <br />
          There, Go Explore.
        </h1>
        <p className="text-center text-sm md:text-base opacity-50 mb-10 pr-1 pl-1 secondary-banner-txt">
          We always make our customers happy by providing many choices.
        </p>
        <div className="nav-btn-container">
          {component === "Intro" && !localStorage.getItem("isLoggedIn") ? (
            <>
              <Button
                variant="contained"
                className="nav-btn"
                onClick={() => {
                  localStorage.getItem("isLoggedIn") === true ||
                  localStorage.getItem("isLoggedIn") === "true"
                    ? navigate("/dashboard")
                    : navigate("/register");
                }}
              >
                Get Started
              </Button>
            </>
          ) : (
            ""
          )}
          {component !== "Explore" ? (
            <Button
              variant="contained"
              className="nav-btn"
              onClick={() => {
                localStorage.getItem("isLoggedIn") === true ||
                localStorage.getItem("isLoggedIn") === "true"
                  ? navigate("/explore")
                  : navigate("/register");
              }}
            >
              Explore
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
