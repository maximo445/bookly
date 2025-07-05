import { useEffect, useState } from "react";
import "./Library.css";
import noImage from "../assets/Image-not-found.png";

function Library() {
  const [books, setBooks] = useState([]);

  console.log(books);

  let avgRating;

  let totalPages;

  if (books) {
    avgRating =
      books.length > 0
        ? (
            books.reduce((acc, curr) => acc + curr.rating, 0) / books.length
          ).toFixed(2)
        : 0;
  } else {
    avgRating = 0;
  }

  if (books) {
    totalPages = books.reduce((acc, curr) => acc + curr.numPages, 0);
  }

  console.log(books);

  function removeBook(id) {
    const newBooks = books.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(newBooks));
    setBooks(newBooks);
  }

  useEffect(() => {
    const library = JSON.parse(localStorage.getItem("books"));
    setBooks(library);
  }, []);

  return (
    <div className="library">
      <header className="library-header">
        <h3 className="stats-title">Books You Have Read</h3>
        <div className="info">
          <span className="count">{`#️⃣ ${
            books?.length ? books.length : 0
          } books`}</span>
          <span className="avg-rating">{`⭐${avgRating}`}</span>
          <span className="num-pages">{`📖${totalPages} pages`}</span>
        </div>
      </header>
      <ul className="books-list">
        {books.map((book) => (
          <li className="book">
            <img src={book?.img ? book.img : noImage} alt="" />
            <span>
              <span className="title-del">
                <h1>{book?.title.slice(0, 15)}</h1>
                <button onClick={() => removeBook(book?.id)}>❌</button>
              </span>
              <div className="details">
                <p>{`⭐ ${book?.rating} rating`}</p>
                <p>{`📖 ${book?.numPages} pages`}</p>
              </div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Library;
