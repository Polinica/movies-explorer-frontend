import "./MoviesCard.css";
import CardButton from "../CardButton/CardButton";
import React from "react";
import getNumDeclination from "../../../utils/getNumDeclination";
import { MOVIE_API } from "../../../utils/config";

function MoviesCard({ movieData, children }) {
  // TESTING BUTTON CLICK
  const [isSaved, setIsSaved] = React.useState(false);

  const type = "all";

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
        src={MOVIE_API.MEDIA_BASE_URL + movieData.image.url}
        alt={`Кадр из фильма ${movieData.name}`}
        className="movie-card__thumbnail"
      />
      <div className="cards__text">
        <div className="cards__tex-row">
          <h3 className="movie-card__name">{movieData.name}</h3>

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
          <p className="movie-card__duration">{`${
            movieData.duration
          } ${getNumDeclination(movieData.duration, [
            "минута",
            "минуты",
            "минут",
          ])}`}</p>
        </div>
      </div>
    </li>
  );
}
export default MoviesCard;
