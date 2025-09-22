const BookShelfChanger = ({ shelf, onShelfChanged }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onShelfChanged(e.target.value);
  }

  return (
    <div className="book-shelf-changer">
      <select value={shelf} onChange={handleChange}>
        <option value="" disabled>
          Move to...
        </option>
        <option value="currentlyReading">
          Currently Reading
        </option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

export default BookShelfChanger;
