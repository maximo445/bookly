import { useEffect, useState } from "react";
import Rating from "./Rating";
import "./BookDetail.css";

const API_KEY = "AIzaSyBf-UHu8ZHl_vNFnujzPBYnR9GoC73vKhw";

function BookDetail({ id, setId }) {
  const [bookDetails, setBookDetails] = useState(null);
  const [booksOnList, setBooksOnList] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  function addToLibrary() {
    const books = JSON.parse(localStorage.getItem("books"));
    console.log({ locale: books });
    const currentBook = {
      id,
      title: bookDetails.title,
      rating,
      numPages: bookDetails.printedPageCount,
      img: bookDetails?.imageLinks?.smallThumbnail,
    };
    if (books != null) {
      console.log("added to existing library");
      const newBooks = [...books, currentBook];
      localStorage.setItem("books", JSON.stringify(newBooks));
    } else {
      console.log("created a new library");
      localStorage.setItem("books", JSON.stringify([currentBook]));
    }
    setId(null);
  }

  useEffect(() => {
    const tempBooks = JSON.parse(localStorage.getItem("books"));
    setBooksOnList(tempBooks);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    async function getBookDetails() {
      // set a loading state - true
      setRating(0);
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`,
          { signal }
        );

        const data = await res.json();
        console.log({ data: data?.volumeInfo });
        setBookDetails(data?.volumeInfo);
      } catch (err) {
        if (err.name !== "AbortError" && !signal.aborted) {
          // set an error message
          // set is loading - false
        }
      }
    }

    getBookDetails();

    return () => {
      abortController.abort();
    };
  }, [id]);

  function dateFormater(dateStr) {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const isOnList =
    booksOnList?.length >= 1
      ? booksOnList.filter((book) => book.id === id)
      : false;

  console.log({ isOnList });

  return (
    <>
      {bookDetails ? (
        <div className="bookDetail" key={id}>
          <header className="detail-header">
            <img
              className="header-image"
              src={
                bookDetails?.imageLinks?.thumbnail
                  ? bookDetails.imageLinks.thumbnail
                  : null
              }
              alt=""
            />
            <span className="header-description">
              <span className="title-container">
                <h1 className="detail-title">
                  {bookDetails.title.slice(0, 16)}
                </h1>
                <button onClick={() => setId(null)}>❌</button>
              </span>
              <p className="book-info">{`${dateFormater(
                bookDetails.publishedDate
              )}  ||  ${bookDetails.printedPageCount} pages`}</p>
              <p className="genres">
                {bookDetails?.categories
                  ? bookDetails.categories[0]
                  : "No available category"}
              </p>
            </span>
          </header>
          <div className="rating-container">
            {isOnList?.length >= 1 ? (
              <Rating rating={isOnList[0].rating} added={true} />
            ) : (
              <Rating
                rating={rating}
                setRating={setRating}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
                onAddToLibrary={addToLibrary}
              />
            )}
          </div>
          <div className="description">
            <p>
              {bookDetails?.description
                ? `${bookDetails.description.slice(0, 300)}...`
                : "No description available"}
            </p>
          </div>
        </div>
      ) : (
        <div className="bookDetail">
          <p>No data yet</p>
        </div>
      )}
    </>
  );
}

export default BookDetail;
