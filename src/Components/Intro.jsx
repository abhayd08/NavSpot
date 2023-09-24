import { useState, useEffect } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

function Intro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") || false);
  });
  return (
    <>
      <Header component="Intro" />
      {isLoggedIn ? <Dashboard /> : ""}
      <Reviews />
      <Footer />
    </>
  );
}

export default Intro;
