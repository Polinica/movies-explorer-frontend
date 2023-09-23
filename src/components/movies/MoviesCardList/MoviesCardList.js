import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ type, movies }) {
  return (
    <ul className="movie-card-list section" aria-label="Список фильмов">
      {movies.map((movie) => {
        return (
          <MoviesCard
            // type={type}
            key={movie._id}
            name={movie.nameRU}
            duration={movie.duration}
            // link={movie.link}
            link={"https://api.nomoreparties.co/" + movie.image.url}
          />
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
