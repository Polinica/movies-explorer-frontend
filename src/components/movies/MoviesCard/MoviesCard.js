import "./MoviesCard.css";
import photo from "../../../images/IMG007.jpg";
import CardButton from "../CardButton/CardButton";
import React from "react";
import getNumDeclination from "../../../utils/getNumDeclination";

function MoviesCard({ name, duration, thumbnail, type }) {
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
      <img
        src={thumbnail}
        alt={`Кадр из фильма ${name}`}
        className="movie-card__thumbnail"
      />
      <div className="cards__text">
        <div className="cards__tex-row">
          <h3 className="movie-card__name">{name}</h3>

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
        </div>
        <div className="cards__tex-row">
          <p className="movie-card__duration">{`${duration} ${getNumDeclination(
            duration,
            ["минута", "минуты", "минут"]
          )}`}</p>
        </div>
      </div>
    </li>
  );
}
export default MoviesCard;
