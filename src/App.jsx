import { Routes, Route } from "react-router-dom";
import Intro from "./Components/Intro";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Explore from "./Components/Explore";
import SearchResult from "./Components/SearchResult";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Intro />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/explore" element={<Explore />}></Route>
      <Route path="/results" element={<SearchResult />}></Route>
    </Routes>
  );
}

export default App;
