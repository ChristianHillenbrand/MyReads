import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

const ListBooks = () => {
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
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          title="Currently Reading"
          books={books.filter((book) => book.shelf === "currentlyReading")}
          onShelfChanged={onShelfChanged}
        />

        <BookShelf
          title="Want To Read"
          books={books.filter((book) => book.shelf === "wantToRead")}
          onShelfChanged={onShelfChanged}
        />

        <BookShelf
          title="Read"
          books={books.filter((book) => book.shelf === "read")}
          onShelfChanged={onShelfChanged}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks;
