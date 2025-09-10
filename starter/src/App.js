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
      await BooksAPI.update(bookToChange, shelf);
    }

    const newBook = {...bookToChange, shelf: shelf};
    if (bookToChange.shelf === "none") {
      // add the book to the list
      setBooks([...books, newBook]);
    } else if (shelf === "none") {
      // remove the book from the list
      setBooks(books.filter(book => book.id !== bookToChange.id));
    } else {
      // change the shelf of a book already in the list
      setBooks([...books.filter(book => book.id !== bookToChange.id), newBook]);
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
