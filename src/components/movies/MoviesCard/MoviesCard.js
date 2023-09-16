import "./MoviesCard.css";

import photo from "../../../images/IMG007.jpg";
import CardButton from "../CardButton/CardButton";
import React from "react";

function MoviesCard() {
  // TESTING BUTTON CLICK
  const [isSaved, setIsSaved] = React.useState(false);

  function handleClick() {
    setIsSaved((state) => !state);
  }
  return (
    <li className="movie-card">
      <img src={photo} alt="" className="movie-card__thumbnail" />
      <h3 className="movie-card__name">33 слова о дизайне</h3>
      <p className="movie-card__duration">1 час 42 минуты</p>
      {isSaved ? (
        <CardButton
          className="movie-card__button"
          type="done"
          onClick={handleClick}
        />
      ) : (
        <CardButton
          className="movie-card__button"
          type="save"
          onClick={handleClick}
        />
      )}
    </li>
  );
}

export default MoviesCard;
