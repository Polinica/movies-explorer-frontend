import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Navigation from "../../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import More from "../More/More";
import "./Movies.css";

function Movies() {
  function handleSearchSubmit({ searchText, areShortiesSeleted }) {
    console.log(searchText);
    console.log(areShortiesSeleted);
  }
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <SearchForm onSubmit={handleSearchSubmit} />
        <MoviesCardList type="all" />
        <More />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
