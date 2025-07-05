import { useState } from "react";
import "./Rating.css";

function StarRating({
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  onAddToLibrary,
  added,
}) {
  function hoverIn(_) {
    setHoverRating(_ + 1);
  }

  function hoverOut() {
    setHoverRating(0);
  }

  function rate(_) {
    setRating(_);
  }

  return (
    <div className="rating">
      <span className="container">
        <div>
          {Array.from({ length: 10 }, (_, index) => {
            if (hoverRating ? index < hoverRating : index < rating) {
              // star
              return (
                <button
                  key={index}
                  onClick={() => rate(index + 1)}
                  onMouseEnter={() => hoverIn(index)}
                  onMouseLeave={() => hoverOut()}
                  // style={btnStyle}
                  className="btn"
                >
                  ⭐
                </button>
              );
            } else {
              // moon
              return (
                <button
                  key={index}
                  onClick={() => rate(index)}
                  onMouseEnter={() => hoverIn(index)}
                  onMouseLeave={() => hoverOut()}
                  // style={btnStyle}
                  className="btn"
                >
                  🌑
                </button>
              );
            }
          })}
        </div>
        <div>{hoverRating || rating || "  "}</div>
      </span>
      {rating != 0 && added && (
        <button className="add-btn">+ already in library</button>
      )}
      {rating != 0 && !added && (
        <button onClick={onAddToLibrary} className="add-btn">
          + add to library
        </button>
      )}
    </div>
  );
}

export default StarRating;
