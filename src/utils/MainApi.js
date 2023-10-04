import { MAIN_API } from "./apiConfig";

class MainApi {
  /**
   * Отвечает за осуществление и обработку сетевых запросов к серверу
   * @constructor
   * - _baseUrl - Базовая часть url-адреса сервера
   * - _authHeaders - Заголовки запроса, будут передаваться при каждом обращении
   */
  constructor({ baseUrl, authHeaders }) {
    this._baseUrl = baseUrl;
    this._authHeaders = authHeaders;
  }
  //`request(url, options)`: Метод выполняет HTTP-запрос на указанный URL с указанными опциями.
  //Он использует нативный метод `fetch` для выполнения запроса.
  //В опциях определены метод запроса (`method`), заголовки (`headers`) и тело запроса (`body`).
  // Если ответ сервера не успешный (код не в диапазоне 200-299), вызывается исключение с сообщением об ошибке.
  //Иначе, данные ответа преобразуются в JSON и возвращаются.

  async request(url, options) {
    const requestInit = {
      method: options.method,
      headers: {
        ...options.headers,
        ...this._authHeaders,
      },
    };

    if (options.body) {
      requestInit.body = JSON.stringify(options.body);
    }

    const response = await fetch(this._baseUrl + url, requestInit);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }

  //`register({ email, password, name })`: Метод вызывает `request` для выполнения POST-запроса на URL '/signup'
  // с указанными параметрами (email, password, name) в теле запроса в виде JSON-объекта.
  // Возвращает результат `request`.
  async register({ email, password, name }) {
    const url = "/signup";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { email, password, name },
    };

    return this.request(url, options);
  }

  async login({ email, password }) {
    const url = "/signin";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { email, password },
    };

    return this.request(url, options);
  }

  setToken(token) {
    this._authHeaders.Authorization = token;
  }

  async checkToken(token) {
    const url = "/users/me";
    const headers = { ...this._authHeaders, Authorization: token };

    const options = {
      method: "GET",
      headers,
    };

    return this.request(url, options);
  }

  async getUserInfo() {
    const url = "/users/me";

    const options = {
      method: "GET",
      headers: this._authHeaders,
    };

    return this.request(url, options);
  }

  async updateUserInfo({ name, email }) {
    const url = "/users/me";

    const options = {
      method: "PATCH",
      headers: this._authHeaders,
      body: { name, email },
    };

    return this.request(url, options);
  }

  async getSavedMovies() {
    const url = "/movies";

    const options = {
      method: "GET",
      headers: this._authHeaders,
    };

    return this.request(url, options);
  }

  async saveMovie(movieData) {
    const url = "/movies";

    const options = {
      method: "POST",
      headers: this._authHeaders,
      body: movieData,
    };

    return this.request(url, options);
  }

  async deleteMovie(_id) {
    const url = `/movies/${_id}`;

    const options = {
      method: "DELETE",
      headers: this._authHeaders,
    };

    return this.request(url, options);
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API.BASE_URL,
  authHeaders: MAIN_API.AUTH_HEADERS,
});

export default mainApi;
