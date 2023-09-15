import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Navigation from "../../Navigation/Navigation";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies() {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
