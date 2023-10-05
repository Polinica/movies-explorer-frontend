import { useState, useRef, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import More from "../More/More";

function MoviesCardList({ type, movies }) {
  const [renderedMovies, setRenderedMovies] = useState([]);
  const grid = useRef();

  function countGridColumns(gridElement) {
    const gridComputedStyle = window.getComputedStyle(gridElement);
    return gridComputedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
  }

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

  useEffect(() => {
    const columnsCount = countGridColumns(grid.current);
    const initialCardsCount =
      CARDS_RENDER_COUNT[columnsCount]?.initial ??
      CARDS_RENDER_COUNT["default"].initial;
    const array = movies.slice(0, initialCardsCount);
    setRenderedMovies(array);
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
