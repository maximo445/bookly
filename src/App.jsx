import "./App.css";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Searcher from "./components/Searcher";
import ResultCount from "./components/ResultCount";
import MainContainer from "./components/MainContainer";
import Books from "./components/Books";
import DetailContainer from "./components/DetailContainer";
import BookDetail from "./components/BookDetail";
import Rating from "./components/Rating";
import Library from "./components/Library";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [id, setId] = useState(null);
  const [results, setResults] = useState(() => []);

  function handleSetID(id) {
    setId(id);
  }

  function handleSetQuery(value) {
    setQuery(value);
  }

  function handleSetResults(value) {
    setResults(value);
  }

  return (
    <div className="app">
      <Header>
        <Logo />
        <Searcher
          query={query}
          onHandleQuery={handleSetQuery}
          onHandleResults={handleSetResults}
        />
        <ResultCount count={results?.length ? results.length : 0} />
      </Header>
      <MainContainer>
        <Books books={results} onHandleSetID={handleSetID} />
        <DetailContainer>
          {id ? <BookDetail id={id} setId={setId} /> : <Library />}
        </DetailContainer>
      </MainContainer>
    </div>
  );
}

export default App;
