import "./MoviesCard.css";
// import CardButton from "../CardButton/CardButton";
import React from "react";
import getNumDeclination from "../../../utils/getNumDeclination";
// import { MOVIE_API } from "../../../utils/config";
import GeneralCardButton from "../GeneralCardButton/GeneralCardButton";
import SavedCardButton from "../SavedCardButton/SavedCardButton";

function MoviesCard({ movie, isSaved, onClick, isSavedMovieCard = false }) {
  function handleClick() {
    onClick(movie);
  }

  return (
    <li className="movie-card">
      <img
        src={movie.image}
        alt={`Кадр из фильма ${movie.nameRU}`}
        className="movie-card__thumbnail"
      />
      <div className="cards__text">
        <div className="cards__tex-row">
          <h3 className="movie-card__name">{movie.nameRU}</h3>

          {isSavedMovieCard ? (
            <SavedCardButton onClick={handleClick} />
          ) : (
            <GeneralCardButton isSaved={isSaved} onClick={handleClick} />
          )}
        </div>
        <div className="cards__tex-row">
          <p className="movie-card__duration">{`${
            movie.duration
          } ${getNumDeclination(movie.duration, [
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
