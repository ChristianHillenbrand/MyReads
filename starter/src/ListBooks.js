import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

const ListBooks = () => {
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
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          title="Currently Reading"
          books={books.filter((book) => book.shelf === "currentlyReading")}
          onShelfChanged={updateShelf}
        />

        <BookShelf
          title="Want To Read"
          books={books.filter((book) => book.shelf === "wantToRead")}
          onShelfChanged={updateShelf}
        />

        <BookShelf
          title="Read"
          books={books.filter((book) => book.shelf === "read")}
          onShelfChanged={updateShelf}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ListBooks;
