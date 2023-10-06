import "./MoviesCard.css";
import photo from "../../../images/IMG007.jpg";
import { WorkCardButton } from "../CardButton/CardButton";
import React from "react";
import { MOVIE_API } from "../../../utils/apiConfig";
import { SavedCardButton } from "../CardButton/CardButton";

function MoviesCard({ movieData, isSaved, onClick, isSavedMovieCard = false }) {
  function handleClick() {
    onClick(movieData.id);
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
            <WorkCardButton isSaved={isSaved} onClick={handleClick} />
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
