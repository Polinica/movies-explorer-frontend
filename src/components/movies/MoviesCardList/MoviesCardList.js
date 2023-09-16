import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ type }) {
  return (
    <section className="movie-card-list section">
      <MoviesCard type={type} />
    </section>
  );
}

export default MoviesCardList;
