import "./MoviesCard.css";

import photo from "../../../images/IMG007.jpg";
import CardButton from "../CardButton/CardButton";
import React from "react";

function MoviesCard({ type }) {
  // TESTING BUTTON CLICK
  const [isSaved, setIsSaved] = React.useState(false);

  function handleClickSave() {
    setIsSaved((state) => !state);
  }

  const ref = React.useRef();

  function handleClickDelete() {
    setIsSaved(false);
    ref.current.remove();
  }

  return (
    <li className="movie-card" ref={ref}>
      <img src={photo} alt="" className="movie-card__thumbnail" />
      <h3 className="movie-card__name">33 слова о дизайне</h3>
      <p className="movie-card__duration">1 час 42 минуты</p>
      {type === "all" ? (
        isSaved ? (
          <CardButton
            className="movie-card__button"
            type="done"
            onClick={handleClickSave}
          />
        ) : (
          <CardButton
            className="movie-card__button"
            type="save"
            onClick={handleClickSave}
          />
        )
      ) : (
        <CardButton
          className="movie-card__button"
          type="delete"
          onClick={handleClickDelete}
        />
      )}
    </li>
  );
}

export default MoviesCard;
