import Book from "./Book";

const BooksGrid = ({ books, onShelfChanged }) => {
  return (
    <ol className="books-grid">
      {
        books.map(book => (
          <li key={book.id}>
            <Book book={book} onShelfChanged={onShelfChanged} />
          </li>
        ))
      }
    </ol>
  );
}

export default BooksGrid;
