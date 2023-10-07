import "./MoviesCard.css";
import { useState } from "react";
import { WorkCardButton } from "../CardButton/CardButton";
import { MOVIE_API } from "../../../utils/apiConfig";
import { SavedCardButton } from "../CardButton/CardButton";

function MoviesCard({ movie, isSaved, onClick, isSavedMovieCard = false }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    await onClick(movie);
    setIsLoading(false);
  }

  // function MoviesCard({ movieData, isSaved, onClick }) {
  //   // TESTING BUTTON CLICK
  //   const [isSaved, setIsSaved] = React.useState(false);

  //   const type = "all";

  //   function handleClickSave() {
  //     setIsSaved((state) => !state);
  //   }
  //   const ref = React.useRef();
  //   function handleClickDelete() {
  //     setIsSaved(false);
  //     ref.current.remove();
  //   }

  //   function handleClick() {
  //     onClick(movieData.id);
  //   }

  return (
    <li className="movie-card">
      <img
        src={movie.image}
        alt={`Кадр из фильма ${movie.name}`}
        className="movie-card__thumbnail"
      />
      <div className="cards__text">
        <div className="cards__tex-row">
          <h3 className="movie-card__name">{movie.nameRU}</h3>
          {isSavedMovieCard ? (
            <SavedCardButton onClick={handleClick} disabled={isLoading} />
          ) : (
            <WorkCardButton
              isSaved={isSaved}
              onClick={handleClick}
              disabled={isLoading}
            />
          )}
          {/* <WorkCardButton isSaved={isSaved} onClick={handleClick} /> */}
        </div>
        <div className="cards__tex-row">
          <p className="movie-card__duration">1ч42м</p>
        </div>
      </div>
    </li>
  );
}
export default MoviesCard;
