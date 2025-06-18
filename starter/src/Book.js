import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book, onShelfChanged }) => {
  const imageUrl = book.imageLinks ? `url(${book.imageLinks.thumbnail})` : "";

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            ...(imageUrl && {backgroundImage: imageUrl}),
          }}
        ></div>
        <BookShelfChanger
          shelf={book.shelf}
          onShelfChanged={(shelf) => onShelfChanged(book, shelf)}
        />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
}

export default Book;
