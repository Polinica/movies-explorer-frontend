import { useState, useEffect, useRef } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import More from "../More/More";

let DEVICE_SETTINGS = {
  wide: { min: 1280, max: 2560, config: { show: 16, add: 4 } },
  medium: { min: 768, max: 1280, config: { show: 8, add: 2 } },
  narrow: { min: 320, max: 767, config: { show: 5, add: 2 } },
};

function MoviesCardList({
  movies,
  savedMovies,
  onCardClick,
  isSavedMoviesCardList = false,
}) {
  const [renderedMovies, setRenderedMovies] = useState([]);
  const grid = useRef();
  const [cardSettings, setCardSettings] = useState(
    DEVICE_SETTINGS.narrow.config // Измените на желаемое значение по умолчанию
  );
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const updateCardSettings = (width) => {
    if (
      width >= DEVICE_SETTINGS.wide.min &&
      width <= DEVICE_SETTINGS.wide.max
    ) {
      setCardSettings(DEVICE_SETTINGS.wide.config);
    } else if (
      width >= DEVICE_SETTINGS.medium.min &&
      width <= DEVICE_SETTINGS.medium.max
    ) {
      setCardSettings(DEVICE_SETTINGS.medium.config);
    } else if (
      width >= DEVICE_SETTINGS.narrow.min &&
      width <= DEVICE_SETTINGS.narrow.max
    ) {
      setCardSettings(DEVICE_SETTINGS.narrow.config);
    }
  };

  // Обновляем cardSettings при изменении размера окна
  useEffect(() => {
    updateCardSettings(viewportWidth);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportWidth]);

  useEffect(() => {
    if (isSavedMoviesCardList) {
      setRenderedMovies(movies);
    } else {
      if (movies.length) {
        const array = movies.slice(0, cardSettings.show);
        setRenderedMovies(array);
      }
    }
  }, [movies, cardSettings.show, isSavedMoviesCardList]);

  const handleMoreClick = () => {
    const newStartIndex = renderedMovies.length;
    const newEndIndex = newStartIndex + cardSettings.add;
    setRenderedMovies(movies.slice(0, newEndIndex));
  };

  const checkIsMovieSaved = (movie) => {
    if (Array.isArray(savedMovies)) {
      return savedMovies.some(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
    }
    return false; // По умолчанию считаем, что фильм не сохранен
  };

  return (
    <>
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
      {renderedMovies.length < movies.length && (
        <More onClick={handleMoreClick} />
      )}
    </>
  );
}

export default MoviesCardList;
