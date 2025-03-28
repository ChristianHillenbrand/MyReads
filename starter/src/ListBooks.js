import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const ListBooks = ({ books, onShelfChanged }) => {
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
