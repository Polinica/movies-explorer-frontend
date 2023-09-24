import "./MoviesCard.css";
// import CardButton from "../CardButton/CardButton";
import React from "react";
import getNumDeclination from "../../../utils/getNumDeclination";
import { MOVIE_API } from "../../../utils/config";
import GeneralCardButton from "../GeneralCardButton/GeneralCardButton";
import SavedCardButton from "../SavedCardButton/SavedCardButton";

function MoviesCard({ movieData, isSaved, onClick, isSavedMovieCard = false }) {
  function handleClick() {
    onClick(movieData.id);
  }

  return (
    <li className="movie-card">
      <img
        src={MOVIE_API.MEDIA_BASE_URL + movieData.image.url}
        alt={`Кадр из фильма ${movieData.name}`}
        className="movie-card__thumbnail"
      />
      <div className="cards__text">
        <div className="cards__tex-row">
          <h3 className="movie-card__name">{movieData.nameRU}</h3>

          {isSavedMovieCard ? (
            <SavedCardButton onClick={handleClick} />
          ) : (
            <GeneralCardButton isSaved={isSaved} onClick={handleClick} />
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
