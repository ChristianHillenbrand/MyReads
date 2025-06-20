import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const pullBooks = async () => {
      setBooks(await BooksAPI.getAll());
    }

    pullBooks();
  }, []);

  const onShelfChanged = (bookToChange, shelf) => {
    const update = async (bookToChange, shelf) => {
      const res = await BooksAPI.update(bookToChange, shelf);
      const order = [...res.currentlyReading, ...res.wantToRead, ...res.read];

      const updatedBooks = books.map(book => 
        (book.id === bookToChange.id) ? {...book, shelf: shelf} : book 
      ).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

      setBooks(updatedBooks); 
    }

    update(bookToChange, shelf);
  }

  return (
    <Routes>
      <Route exact path="/" element={
        <ListBooks books={books} onShelfChanged={onShelfChanged} />
      } />
      <Route path="/search" element={
        <SearchBooks books={books} onShelfChanged={onShelfChanged} />
      } />
    </Routes>
  );
}

export default App;
