import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BooksGrid from "./BooksGrid";

const SearchBooks = () => {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const queryIdRef = useRef(0);

  useEffect(() => {
    const searchBooks = async () => {
      const search = async () => {
        const res = await BooksAPI.search(input);

        if (res.error) {
          return [];
        }

        const books = await BooksAPI.getAll();
        return res.map(r => {
          const book = books.find(book => book.id === r.id);
          return {...r, shelf: book ? book.shelf : "none"};
        });
      }

      const queryId = ++queryIdRef.current;

      if (input.length === 0) {
        setBooks([]);
      } else {
        const books = await search();
        if (queryId === queryIdRef.current) {
          setBooks(books);
        }
      }
    }

    const timeout = setTimeout(() => {
      searchBooks();
    }, 200);
    return () => clearTimeout(timeout);
  }, [input]);

  const onShelfChanged = (bookToChange, shelf) => {
    const update = async (bookToChange, shelf) => {
      await BooksAPI.update(bookToChange, shelf);

      const updatedBooks = books.map(book => 
        (book.id === bookToChange.id) ? {...book, shelf: shelf} : book 
      )
      setBooks(updatedBooks);
    }

    update(bookToChange, shelf);
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BooksGrid
          books={books}
          onShelfChanged={onShelfChanged}
        />
      </div>
    </div>
  );
}

export default SearchBooks;
