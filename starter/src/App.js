import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={
        <ListBooks  />
      } />
      <Route path="/search" element={
        <SearchBooks  />
      } />
    </Routes>
  );
}

export default App;
