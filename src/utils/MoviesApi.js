import { MOVIE_API } from "./apiConfig";

class MoviesApi {
  //В конструкторе класса мы передаем объект с параметром `baseUrl`,
  //который указывает на базовый URL для API.
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async getMovies() {
    //В методе `getMovies` мы формируем URL для получения информации о фильмах,
    //добавляя к базовому URL путь `/beatfilm-movies`.
    // Затем мы отправляем GET-запрос на этот URL и получаем ответ в формате JSON.
    const url = `${this._baseUrl}/beatfilm-movies`;
    const res = await fetch(url);
    const data = await res.json();
    //Если ответ от сервера не успешный (код ответа не 200), мы возвращаем объект `Error`
    // с сообщением об ошибке, полученным от сервера.
    if (!res.ok) {
      return new Error(data.message);
    }
    //возвращаем полученные данные о фильмах.
    return data;
  }
}

const moviesApi = new MoviesApi({ baseUrl: MOVIE_API.BASE_URL });
// экспортируем экземпляр класса `moviesApi`, который мы можем использовать для получения списка фильмов из внешнего кода.
export default moviesApi;
