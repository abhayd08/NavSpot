import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={2}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        style={{
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        }}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
