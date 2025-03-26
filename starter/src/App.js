import "./App.css";
import { useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);
  const [showSearchPage, setShowSearchpage] = useState(false);

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
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
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
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
