import React from "react";
import Header from "./Header";
import ResultCard from "./ResultCard";
import Footer from "./Footer";

const SearchResult = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <ResultCard />
      <Footer />
    </div>
  );
};

export default SearchResult;
