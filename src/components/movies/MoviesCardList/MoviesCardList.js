import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import moviesApi from "../../../utils/MoviesApi";

function MoviesCardList({ type }) {
  const [movies, setMovies] = React.useState([]);

  //используем функцию `getMovies` для получения списка фильмов с помощью метода `getMovies` объекта `moviesApi`
  async function getMovies() {
    const movies = await moviesApi.getMovies();
    //полученный список фильмов используем для установки состояния компонента с помощью функции `setMovies`.
    setMovies(movies);
  }
  // хук `React.useEffect` для выполнения запроса по получению списка фильмов при монтировании компонента.
  //Пустой зависимости вторым аргументом `React.useEffect` означает, что этот эффект будет выполнен
  //только один раз при монтировании компонента.
  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <ul className="movie-card-list section" aria-label="Список фильмов">
      {movies.map((movie) => {
        return (
          <MoviesCard
            type={type}
            key={movie._id}
            name={movie.name}
            duration={movie.duration}
            link={movie.link}
            thumbnail={"https://api.nomoreparties.co/" + movie.image.url}
          />
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
