import { ERROR_MSGS } from "../../../utils/config";
import Message from "../Message/Message";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";

function SearchResults({
  isErrorOnLoading,
  isLoading,
  movies,
  savedMovies,
  onCardClick,
  isSavedMoviesSearchResult = false,
}) {
  return isErrorOnLoading ? (
    <Message text={ERROR_MSGS.CANT_GET_MOVIES} isError />
  ) : isLoading ? (
    <Preloader />
  ) : movies.length === 0 ? (
    <Message text={ERROR_MSGS.NOT_FOUND} />
  ) : (
    <MoviesCardList
      savedMovies={savedMovies}
      onCardClick={onCardClick}
      movies={movies}
      isSavedMoviesCardList={isSavedMoviesSearchResult}
    />
  );
}

export default SearchResults;