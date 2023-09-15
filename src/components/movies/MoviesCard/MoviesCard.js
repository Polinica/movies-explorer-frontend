import "./MoviesCard.css";

import photo from "../../../images/IMG007.jpg";
import CardButton from "../CardButton/CardButton";

function MoviesCard() {
  return (
    <li className="movie-card">
      <h3 className="movie-card__name">33 слова о дизайне</h3>
      <p className="movie-card__duration">1 час 42 минуты</p>
      <img src={photo} alt="" className="movie-card__thumbnail" />
      <CardButton className="movie-card__button" type="delete" />
    </li>
  );
}

export default MoviesCard;
