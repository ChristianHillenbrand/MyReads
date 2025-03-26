import Book from "./Book";

const BookShelf = ({ title, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map(book => (
              <li>
                <Book
                  title={book.title}
                  authors={book.authors}
                  cover={book.cover}
                />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
