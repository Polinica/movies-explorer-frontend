export const MOVIE_API = {
  BASE_URL: "https://api.nomoreparties.co",
  MEDIA_BASE_URL: "https://api.nomoreparties.co/",
};

export const MAIN_API = {
  BASE_URL: "https://api.pika.nomoredomainsicu.ru",
  AUTH_HEADERS: {
    "Content-Type": "application/json",
    Authorization: "jwt token here",
  },
};

export const SEARCH_PARAMS = {
  SHORTIES_MAX_DURATION: 40,
};

export const REQUEST_ERRORS = {
  SIGNUP_409: "Пользователь с&nbsp;таким email уже существует.",
  SIGNUP_DEFAULT: "При регистрации пользователя произошла ошибка.",
  SIGNIN_401: "Вы&nbsp;ввели неправильный логин или пароль.",
  SIGNIN_NO_TOKEN:
    "При авторизации произошла ошибка. Токен не&nbsp;передан или передан не&nbsp;в&nbsp;том формате.",
  SIGNIN_INVALID_TOKEN:
    "При авторизации произошла ошибка. Переданный токен некорректен.",
  SIGNIN_DEFAULT: "При входе произошла ошибка.",
  UPDATE_409: "Пользователь с&nbsp;таким email уже существует.",
  UPDATE_DEFAULT: "При обновлении профиля произошла ошибка.",
};

export function formatMovies(movie) {
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: MOVIE_API.MEDIA_BASE_URL + movie.image.url,
    trailerLink: movie.trailerLink,
    thumbnail: MOVIE_API.MEDIA_BASE_URL + movie.image.formats.thumbnail.url,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  };
}
