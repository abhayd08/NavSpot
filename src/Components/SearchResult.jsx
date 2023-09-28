import React from "react";
import Header from "./Header";
import ResultCard from "./ResultCard";
import Footer from "./Footer";

const SearchResult = () => {
  return (
    <>
      <div style={{ minHeight: "80vh" }}>
        <Header />
        <ResultCard />
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
