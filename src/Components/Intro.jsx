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
      <div style={{ minHeight: "80vh" }}>
        <Header component="Intro" />
        {isLoggedIn ? <Dashboard /> : ""}
        <Reviews />
      </div>
      <Footer />
    </>
  );
}

export default Intro;
