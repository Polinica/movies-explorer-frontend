import { useState, useRef, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import More from "../More/More";

const CARDS_RENDER_COUNT = {
  1: {
    initial: 5,
    add: 2,
  },
  2: {
    initial: 8,
    add: 2,
  },
  3: {
    initial: 12,
    add: 3,
  },
  default: {
    initial: 8,
    add: 4,
  },
};

function MoviesCardList({
  movies,
  savedMovies,
  onCardClick,
  isSavedMoviesCardList = false,
}) {
  const [renderedMovies, setRenderedMovies] = useState([]);
  const grid = useRef();

  function countGridColumns(gridElement) {
    const gridComputedStyle = window.getComputedStyle(gridElement);
    return gridComputedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
  }

  useEffect(() => {
    if (movies.length) {
      const columnsCount = countGridColumns(grid.current);
      const initialCardsCount =
        CARDS_RENDER_COUNT[columnsCount]?.initial ??
        CARDS_RENDER_COUNT["default"].initial;
      const array = movies.slice(0, initialCardsCount);
      setRenderedMovies(array);
    }
  }, [movies]);

  function handleMoreClick() {
    const columnsCount = countGridColumns(grid.current);
    const renderedCountFixed =
      Math.ceil(renderedMovies.length / columnsCount) * columnsCount;
    const moreCardsCount =
      CARDS_RENDER_COUNT[columnsCount]?.add ??
      CARDS_RENDER_COUNT["default"].add;
    const array = movies.slice(0, renderedCountFixed + moreCardsCount);
    setRenderedMovies(array);
  }

  function Message({ text, isError = false }) {
    const messageClasses = `message__text ${
      isError ? "message__text_type_error" : ""
    }`;

    return (
      <div className="message section">
        <p className={messageClasses}>{text}</p>
      </div>
    );
  }

  function checkIsMovieSaved(movie) {
    if (Array.isArray(savedMovies)) {
      return savedMovies.some(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
    }
    return false; // По умолчанию считаем, что фильм не сохранен
  }

  return (
    <>
      {movies.length === 0 ? (
        <Message text="Ничего не найдено" />
      ) : (
        <ul
          className="movie-card-list section"
          aria-label="Список фильмов"
          ref={grid}
        >
          {renderedMovies.map((movie) => {
            return (
              <MoviesCard
                movie={movie}
                isSaved={checkIsMovieSaved(movie)}
                onClick={onCardClick}
                key={movie.movieId}
                isSavedMovieCard={isSavedMoviesCardList}
              />
            );
          })}
        </ul>
      )}
      {/* Уберите проверку на renderedMovies.length */}
      {/* Это отключит кнопку "More" */}
      {/* {renderedMovies.length < movies.length && (
        <More onClick={handleMoreClick} />
      )} */}
      {renderedMovies.length < movies.length && (
        <More onClick={handleMoreClick} />
      )}
    </>
  );
}

export default MoviesCardList;
