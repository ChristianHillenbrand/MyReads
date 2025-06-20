import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BooksGrid from "./BooksGrid";

const SearchBooks = ({ books, onShelfChanged }) => {
  const [input, setInput] = useState("");
  const [foundBooks, setFoundBooks] = useState([]);
  const queryIdRef = useRef(0);

  useEffect(() => {
    const searchBooks = async () => {
      const queryId = ++queryIdRef.current;

      if (input.length === 0) {
        setFoundBooks([]);
      } else {
        const foundBooks = await BooksAPI.search(input);
        if (queryId === queryIdRef.current) {
          setFoundBooks(foundBooks);
        }
      }
    }

    const timeout = setTimeout(() => {
      searchBooks();
    }, 200);
    return () => clearTimeout(timeout);
  }, [input]);

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
          books={
            foundBooks.map(r => {
              const book = books.find(book => book.id === r.id);
              return {...r, shelf: book ? book.shelf : "none"};
            })
          }
          onShelfChanged={onShelfChanged}
        />
      </div>
    </div>
  );
}

export default SearchBooks;
