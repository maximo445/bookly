import "./ResultCount.css";

function ResultCount({ count }) {
  return (
    <h3 className="resultCount">
      found <strong>{count}</strong> results
    </h3>
  );
}

export default ResultCount;
