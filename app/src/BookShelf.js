import BooksGrid from "./BooksGrid";

const BookShelf = ({ title, books, onShelfChanged }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={books} onShelfChanged={onShelfChanged} />
      </div>
    </div>
  );
}

export default BookShelf;
