import { Link } from "react-router-dom";
import { useState } from "react";
import BooksGrid from "./BooksGrid";

const SearchBooks = ({ books, onShelfChanged }) => {
  const [input, setInput] = useState("");

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
