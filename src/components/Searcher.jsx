import { useEffect, useRef } from "react";
import "./Searcher.css";

const API_KEY = "AIzaSyBf-UHu8ZHl_vNFnujzPBYnR9GoC73vKhw";

function Searcher({ query, onHandleQuery, onHandleResults }) {
  const searchBar = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === searchBar) return;

      if (e.code === "Enter") {
        searchBar.current.focus();
        onHandleQuery("");
      }
    }

    document.addEventListener("Keydown", callback);

    return document.addEventListener("keydown", callback);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    async function getBooks() {
      // set a loading state - true
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`,
          { signal }
        );

        const data = await res.json();
        onHandleResults(data.items);
      } catch (err) {
        if (err.name !== "AbortError" && !signal.aborted) {
          // set an error message
          // set is loading - false
        }
      }
    }

    getBooks();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return (
    <div className="searcher">
      <input
        className="query"
        type="text"
        placeholder="Start your search..."
        value={query}
        onChange={(e) => onHandleQuery(e.target.value)}
        ref={searchBar}
      />
    </div>
  );
}

export default Searcher;
