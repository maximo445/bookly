import "./Books.css";

function Books({ books, onHandleSetID }) {
  if (!books) return <ul className="books"></ul>;
  return (
    <ul className="books">
      {books.map((book) => (
        <li
          className="book"
          key={book.id}
          onClick={() =>
            // console.log(book.volumeInfo?.industryIdentifiers[0]?.identifier)
            onHandleSetID(book.id)
          }
        >
          <img
            className="image"
            src={book.volumeInfo.imageLinks?.smallThumbnail}
            alt=""
          />
          <span className="info">
            <h2 className="book-title">{book.volumeInfo.title.slice(0, 25)}</h2>
            <p className="author">
              {book?.volumeInfo?.authors
                ? book.volumeInfo.authors[0].slice(0, 20)
                : "unknown author"}
            </p>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Books;
