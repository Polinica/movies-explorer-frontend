import "./MoviesCard.css";
import { useState } from "react";
import { WorkCardButton } from "../CardButton/CardButton";
import { getMovieDuration } from "../../../utils/apiConfig";
import { SavedCardButton } from "../CardButton/CardButton";

function MoviesCard({ movie, isSaved, onClick, isSavedMovieCard = false }) {
  function handleClick() {
    onClick(movie);
  }

  const movieDuration = getMovieDuration(movie.duration); // Форматирование длительности

  return (
    <li className="movie-card">
      <a
        href={movie.trailerLink}
        className="movie-card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={movie.image}
          alt={`Кадр из фильма ${movie.name}`}
          className="movie-card__thumbnail"
        />
      </a>
      <div className="cards__text">
        <div className="cards__tex-row">
          <h3 className="movie-card__name">{movie.nameRU}</h3>
          {isSavedMovieCard ? (
            <SavedCardButton onClick={handleClick} />
          ) : (
            <WorkCardButton isSaved={isSaved} onClick={handleClick} />
          )}
        </div>
        <div className="cards__tex-row">
          <p className="movie-card__duration">{movieDuration}</p>
        </div>
      </div>
    </li>
  );
}
export default MoviesCard;
