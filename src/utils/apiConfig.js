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

const DEVICE_WIDTH = {
  desktop: { width: 1280, cards: { total: 12, extra: 4 } },
  tablet: { width: 768, cards: { total: 9, extra: 3 } },
  mobile: { width: 480, cards: { total: 4, extra: 2 } },
};
