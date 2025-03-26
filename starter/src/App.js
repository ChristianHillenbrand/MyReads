import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      setBooks(await BooksAPI.getAll());
    }

    getBooks();
  }, []);

  const updateShelf = (book, shelf) => {
    const update = async () => {
      const res = await BooksAPI.update(book, shelf);
      const updatedBooks = books.map((book) => {
        let shelf = "none";

        if (res.currentlyReading.includes(book.id)) {
          shelf = "currentlyReading";
        } else if (res.wantToRead.includes(book.id)) {
          shelf = "wantToRead";
        } else if (res.read.includes(book.id)) {
          shelf = "read";
        }

        return { ...book, shelf: shelf };
      });
      setBooks(updatedBooks);
    }

    update();
  }

  return (
    <Routes>
      <Route exact path="/" element={
        <ListBooks books={books} onShelfChanged={updateShelf} />
      } />
      <Route path="/search" element={
        <SearchBooks books={books} onShelfChanged={updateShelf} />
      } />
    </Routes>
  );
}

export default App;
