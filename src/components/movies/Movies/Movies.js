import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import moviesApi from "../../../utils/MoviesApi";
import mainApi from "../../../utils/MainApi";
// import searchMovies from "../../../utils/searchMovies";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../../Preloader/Preloader";
import {
  MOVIE_API,
  formatMovies,
  SEARCH_PARAMS,
} from "../../../utils/apiConfig";

// Функция для фильтрации фильмов
function searchMovies(movies, searchText, areMoviesSelected) {
  if (!movies.length) return movies;

  let foundMovies = movies;

  if (!areMoviesSelected) {
    foundMovies = foundMovies.filter(
      (movie) => movie.duration > SEARCH_PARAMS.SHORTIES_MAX_DURATION
    );
  }

  foundMovies = foundMovies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
  );

  return foundMovies;
}

function Message({ text, isError = false }) {
  return (
    <div className="message section">
      <p
        className={`message__text ${isError ? "message__text_type_error" : ""}`}
      >
        {text}
      </p>
    </div>
  );
}

function Movies() {
  const [allMovies, setAllMovies] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const defaultSearchText = localStorage.getItem("searchText") || "";
  const defaultAreMoviesSelected =
    JSON.parse(localStorage.getItem("areMoviesSelected")) || true;
  const defaultFoundMovies =
    JSON.parse(localStorage.getItem("foundMovies")) || [];

  const [searchText, setSearchText] = useState(defaultSearchText);
  const [areMoviesSelected, setAreMoviesSelected] = useState(
    defaultAreMoviesSelected
  );
  const [foundMovies, setFoundMovies] = useState(defaultFoundMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorOnLoading, setIsErrorOnLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("areMoviesSelected", areMoviesSelected);
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
  }, [searchText, areMoviesSelected, foundMovies]);

  useEffect(() => {
    if (allMovies) {
      const foundMovies = searchMovies(
        allMovies,
        searchText,
        areMoviesSelected
      );
      setFoundMovies(foundMovies);
    }
  }, [searchText, areMoviesSelected, allMovies]);

  async function getMovies() {
    setIsErrorOnLoading(false);
    setIsLoading(true);
    try {
      let movies = await moviesApi.getMovies();
      movies = movies.map(formatMovies);
      setAllMovies(movies);
    } catch {
      setIsErrorOnLoading(true);
    }
    setIsLoading(false);
  }

  function handleSearchFormSubmit({ searchText, areMoviesSelected }) {
    setAreMoviesSelected(areMoviesSelected);
    setSearchText(searchText);
    if (!allMovies) getMovies();
  }

  function handleCheckboxChange(value) {
    setAreMoviesSelected(value);
    if (!allMovies) getMovies();
  }

  function handleCardClick(movie) {
    const isSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
    if (isSaved) {
      const savedMovie = savedMovies.find(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      deleteSavedMovie(savedMovie);
    } else {
      addSavedMovie(movie);
    }
  }

  async function deleteSavedMovie(movie) {
    try {
      await mainApi.deleteMovie(movie._id);
      setSavedMovies((movies) =>
        movies.filter((savedMovie) => savedMovie._id !== movie._id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function addSavedMovie(movie) {
    try {
      const savedMovie = await mainApi.saveMovie(movie);
      if (savedMovie) {
        setSavedMovies((movies) => [...movies, savedMovie]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSavedMovies();
  }, []);

  async function getSavedMovies() {
    try {
      const movies = await mainApi.getSavedMovies();
      setSavedMovies(movies);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header />
      <main aria-label="Поиск фильмов">
        <SearchForm
          onSubmit={handleSearchFormSubmit}
          onCheckboxChange={handleCheckboxChange}
          isBlocked={isLoading}
          defaultSearchText={searchText}
          defaultAreMoviesSelected={areMoviesSelected}
        />
        {searchText && (
          <MoviesCardList
            isErrorOnLoading={isErrorOnLoading}
            isLoading={isLoading}
            movies={foundMovies}
            savedMovies={savedMovies}
            onCardClick={handleCardClick}
          />
        )}
        {/* {isErrorOnLoading && (
          <Message text="Ошибка при загрузке фильмов" isError />
        )}
        {isLoading && <Preloader />} */}
      </main>
      <Footer />
    </>
  );
}

export default Movies;

// import { useState, useEffect } from "react";
// import { SEARCH_PARAMS } from "../../../utils/apiConfig";
// import Footer from "../../Footer/Footer";
// import Header from "../../Header/Header";
// import Navigation from "../../Navigation/Navigation";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Preloader from "../../Preloader/Preloader";
// import SearchForm from "../SearchForm/SearchForm";
// import More from "../More/More";
// import "./Movies.css";
// import moviesApi from "../../../utils/MoviesApi";
// import { MOVIE_API, formatMovies } from "../../../utils/apiConfig";
// import mainApi from "../../../utils/MainApi";

// // Функция для фильтрации фильмов
// function searchMovies(movies, searchText, areMoviesSelected) {
//   if (!movies.length) return movies;

//   let foundMovies = movies;

//   if (!areMoviesSelected) {
//     foundMovies = foundMovies.filter(
//       (movie) => movie.duration > SEARCH_PARAMS.SHORTIES_MAX_DURATION
//     );
//   }

//   foundMovies = foundMovies.filter((movie) =>
//     movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return foundMovies;
// }

// function Movies() {
//   // Состояния компонента
//   const [allMovies, setAllMovies] = useState(null);
//   // Значения параметров поиска при загрузке
//   const defaultSearchText = localStorage.getItem("searchText") ?? "";

//   const defaultFoundMovies =
//     JSON.parse(localStorage.getItem("foundMovies")) ?? [];

//   // Начальное значение для areMoviesSelected
//   const defaultAreMoviesSelected = true;

//   const [searchText, setSearchText] = useState(defaultSearchText);
//   const [areMoviesSelected, setAreMoviesSelected] = useState(
//     defaultAreMoviesSelected
//   );
//   const [foundMovies, setFoundMovies] = useState(defaultFoundMovies);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isErrorOnLoading, setIsErrorOnLoading] = useState(false);

//   // const defaultAreMoviesSelected =
//   //   JSON.parse(localStorage.getItem("areMoviesSelected")) ?? true;

//   // Проверяем, есть ли значение "areMoviesSelected" в localStorage
//   const areMoviesSelectedFromLocalStorage =
//     localStorage.getItem("areMoviesSelected");

//   // Если в localStorage уже есть значение для "areMoviesSelected", используем его
//   if (areMoviesSelectedFromLocalStorage !== null) {
//     // Распарсим значение из строки JSON в булево
//     const areMoviesSelected = JSON.parse(areMoviesSelectedFromLocalStorage);

//     // Используем значение из localStorage
//     setAreMoviesSelected(areMoviesSelected);
//   } else {
//     // Если в localStorage нет значения, используем значение по умолчанию
//     setAreMoviesSelected(defaultAreMoviesSelected);
//   }

//     // Сохранение параметров поиска в localStorage
//     useEffect(() => {
//       localStorage.setItem("searchText", searchText);
//       localStorage.setItem("areMoviesSelected", areMoviesSelected);
//       localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
//     }, [searchText, areMoviesSelected, foundMovies]);

//   // обрабатывает отправку формы поиска и вызывает функцию
//   // const handleSearchFormSubmit = async ({ searchText, areMoviesSelected }) => {
//   //   // if (!allMovies) {
//   //   setIsLoading(true);
//   //   await getMovies();
//   //   setIsLoading(false);
//   //   //}
//   //   setAreMoviesSelected(areMoviesSelected);
//   //   setSearchText(searchText);
//   //   if (!allMovies) getMovies();

//   //   // Сохраните параметры в localStorage
//   //   saveToLocalStorage();
//   // };

//   // Действия формы
//   function handleSearchFormSubmit({ searchText, areMoviesSelected }) {
//     // if (!allMovies) {
//     //   setIsLoading(true);
//     //   await getMovies();
//     //   setIsLoading(false);
//     // }
//     setAreMoviesSelected(areMoviesSelected);
//     setSearchText(searchText);
//     if (!allMovies) getMovies();
//   }

//   function handleCheckboxChange(value) {
//     setAreMoviesSelected(value);
//     if (!allMovies) getMovies();
//   }

//   // function formatMovies(movie) {
//   //   return {
//   //     country: movie.country,
//   //     director: movie.director,
//   //     duration: movie.duration,
//   //     year: movie.year,
//   //     image: MOVIE_API.MEDIA_BASE_URL + movie.image.url,
//   //     trailerLink: movie.trailerLink,
//   //     thumbnail: MOVIE_API.MEDIA_BASE_URL + movie.image.formats.thumbnail.url,
//   //     movieId: movie.id,
//   //     nameRU: movie.nameRU,
//   //     nameEN: movie.nameEN,
//   //   };
//   // }

//   // Получение фильмов
//   async function getMovies() {
//     setIsErrorOnLoading(false);
//     setIsLoading(true);
//     try {
//       let movies = await moviesApi.getMovies();
//       movies = movies.map(formatMovies);
//       setAllMovies(movies);
//     } catch {
//       setIsErrorOnLoading(true);
//     }
//     setIsLoading(false);
//   }

//   //В функции getMovies(), после получения фильмов с
//   //помощью moviesApi.getMovies(), вы можете устанавливать
//   //фильмы в зависимости от текущих настроек (флажка "areMoviesSelected"):

//   // async function getMovies() {
//   //   setIsErrorOnLoading(false);
//   //   setIsLoading(true);
//   //   try {
//   //     let movies;
//   //     if (areMoviesSelected) {
//   //       // Здесь делайте запрос для короткометражных фильмов
//   //       movies = await moviesApi.getShortMovies();
//   //     } else {
//   //       // Здесь делайте запрос для всех фильмов
//   //       movies = await moviesApi.getMovies();
//   //     }
//   //     setAllMovies(movies);
//   //   } catch (error) {
//   //     console.error("Ошибка при загрузке фильмов:", error);
//   //     setIsErrorOnLoading(true);
//   //   }
//   //   setIsLoading(false);
//   // }

//   // Эффект для поиска фильмов при изменении состояния
//   useEffect(() => {
//     if (allMovies) {
//       const foundMovies = searchMovies(
//         allMovies,
//         searchText,
//         areMoviesSelected
//       );
//       setFoundMovies(foundMovies);
//     }
//   }, [searchText, areMoviesSelected, allMovies]);

//   function Message({ text, isError = false }) {
//     return (
//       <div className="message section">
//         <p
//           className={`message__text ${
//             isError ? "message__text_type_error" : ""
//           }`}
//         >
//           {text}
//         </p>
//       </div>
//     );
//   }

//   // // Функция для сохранения параметров в localStorage
//   // function saveToLocalStorage() {
//   //   localStorage.setItem("searchText", searchText);
//   //   localStorage.setItem("areMoviesSelected", areMoviesSelected);
//   // }

//   // // Функция для загрузки параметров из localStorage
//   // function loadFromLocalStorage() {
//   //   const savedSearchText = localStorage.getItem("searchText");
//   //   const savedAreMoviesSelected = localStorage.getItem("areMoviesSelected");

//   //   if (savedSearchText) {
//   //     setSearchText(savedSearchText);
//   //   }

//   //   if (savedAreMoviesSelected) {
//   //     setAreMoviesSelected(savedAreMoviesSelected === "true");
//   //   }
//   // }

//   // // Вызывайте функцию loadFromLocalStorage при монтировании компонента
//   // useEffect(() => {
//   //   loadFromLocalStorage();
//   // }, []);

//   const ERROR_MSGS = {
//     NOT_FOUND: "Ничего не найдено",
//     CANT_GET_MOVIES:
//       "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
//   };

//   function SearchResults({
//     isErrorOnLoading,
//     isLoading,
//     movies,
//     savedMovies,
//     onCardClick,
//     isSavedMoviesSearchResult = false,
//   }) {
//     return isErrorOnLoading ? (
//       <Message text={ERROR_MSGS.CANT_GET_MOVIES} isError />
//     ) : isLoading ? (
//       <Preloader />
//     ) : movies.length === 0 ? (
//       <Message text={ERROR_MSGS.NOT_FOUND} />
//     ) : (
//       <MoviesCardList
//         movies={movies}
//         savedMovies={savedMovies}
//         onCardClick={onCardClick}
//         isSavedMoviesCardList={isSavedMoviesSearchResult}
//       />
//     );
//   }

//   // Сохраненные фильмы
//   const [savedMovies, setSavedMovies] = useState([]);

//   // Сохранение фильмов
//   function handleCardClick(movie) {
//     console.log(savedMovies);
//     const isSaved = savedMovies.some(
//       (savedMovie) => savedMovie.movieId === movie.movieId
//     );
//     if (isSaved) {
//       const savedMovie = savedMovies.find(
//         (savedMovie) => savedMovie.movieId === movie.movieId
//       );
//       deleteSavedMovie(savedMovie);
//     } else {
//       addSavedMovie(movie);
//     }
//   }

//   async function deleteSavedMovie(movie) {
//     try {
//       await mainApi.deleteMovie(movie._id);

//       setSavedMovies((movies) =>
//         movies.filter((savedMovie) => savedMovie._id !== movie._id)
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function addSavedMovie(movie) {
//     try {
//       const savedMovie = await mainApi.saveMovie(movie);
//       if (savedMovie) {
//         setSavedMovies((movies) => [...movies, savedMovie]);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   useEffect(() => {
//     getSavedMovies();
//   }, []);

//   async function getSavedMovies() {
//     try {
//       const movies = await mainApi.getSavedMovies();
//       setSavedMovies(movies);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   // function formatMovieData(movie) {
//   //   return {
//   //     country: movie.country,
//   //     director: movie.director,
//   //     duration: movie.duration,
//   //     year: movie.year,
//   //     description: movie.description,
//   //     image: MOVIE_API.MEDIA_BASE_URL + movie.image.url,
//   //     trailerLink: movie.trailerLink,
//   //     thumbnail: MOVIE_API.MEDIA_BASE_URL + movie.image.formats.thumbnail.url,
//   //     movieId: movie.id,
//   //     nameRU: movie.nameRU,
//   //     nameEN: movie.nameEN,
//   //   };
//   // }

//   return (
//     <>
//       <Header />
//       <main aria-label="Поиск фильмов">
//         <SearchForm
//           onSubmit={handleSearchFormSubmit}
//           onCheckboxChange={handleCheckboxChange}
//           isBlocked={isLoading}
//           defaultSearchText={searchText}
//           defaultAreMoviesSelected={areMoviesSelected}
//         />
//         {/* <MoviesCardList type="all" movies={foundMovies} /> */}
//         {/* <More /> */}
//         {searchText && (
//           <SearchResults
//             isErrorOnLoading={isErrorOnLoading}
//             isLoading={isLoading}
//             movies={foundMovies}
//             savedMovies={savedMovies}
//             onCardClick={handleCardClick}
//           />
//         )}
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default Movies;
