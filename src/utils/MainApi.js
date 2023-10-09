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

  async _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      const errorData = await res.json();
      return Promise.reject(errorData);
    }
  }

  async register({ email, password, name }) {
    const url = `${this._baseUrl}/signup`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });
    if (res.ok) {
      return this._handleResponse(res); // Возвращаем данные при успешной авторизации
    } else {
      const errorData = await res.json(); // Получение данных об ошибке
      return Promise.reject(errorData); // Возвращаем данные об ошибке
    }
  }

  async login({ email, password }) {
    const url = `${this._baseUrl}/signin`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      return this._handleResponse(res); // Возвращаем данные при успешной авторизации
    } else {
      const errorData = await res.json(); // Получение данных об ошибке
      return Promise.reject(errorData); // Возвращаем данные об ошибке
    }
  }

  setToken(token) {
    this._authHeaders.Authorization = `Bearer ${token}`;
  }

  async checkToken(token) {
    const url = `${this._baseUrl}/users/me`;
    const headers = { ...this._authHeaders, Authorization: `Bearer ${token}` };

    const res = await fetch(url, {
      headers,
    });
    if (res.ok) {
      return this._handleResponse(res); // Возвращаем данные при успешной авторизации
    } else {
      const errorData = await res.json(); // Получение данных об ошибке
      return Promise.reject(errorData); // Возвращаем данные об ошибке
    }
  }

  async getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    const res = await fetch(url, {
      headers: this._authHeaders,
    });
    if (res.ok) {
      return this._handleResponse(res); // Возвращаем данные при успешной авторизации
    } else {
      const errorData = await res.json(); // Получение данных об ошибке
      return Promise.reject(errorData); // Возвращаем данные об ошибке
    }
  }

  async updateUserInfo({ name, email }) {
    const url = `${this._baseUrl}/users/me`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: this._authHeaders,
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      return this._handleResponse(res); // Возвращаем данные при успешной авторизации
    } else {
      const errorData = await res.json(); // Получение данных об ошибке
      return Promise.reject(errorData); // Возвращаем данные об ошибке
    }
  }

  async getSavedMovies() {
    const url = `${this._baseUrl}/movies`;

    const res = await fetch(url, {
      headers: this._authHeaders,
    });
    if (res.ok) {
      return this._handleResponse(res); // Возвращаем данные при успешной авторизации
    } else {
      const errorData = await res.json(); // Получение данных об ошибке
      return Promise.reject(errorData); // Возвращаем данные об ошибке
    }
  }

  async saveMovie(movieData) {
    console.log(" !!! saveMovie: fetch( ", `${this._baseUrl}/movies`);
    const url = `${this._baseUrl}/movies`;

    const res = await fetch(url, {
      method: "POST",
      headers: this._authHeaders,
      body: JSON.stringify(movieData),
    });
    if (res.ok) {
      return this._handleResponse(res); // Возвращаем данные при успешной авторизации
    } else {
      const errorData = await res.json(); // Получение данных об ошибке
      return Promise.reject(errorData); // Возвращаем данные об ошибке
    }
  }

  async deleteMovie(id) {
    const url = `${this._baseUrl}/movies/${id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: this._authHeaders,
    });
    if (res.ok) {
      return this._handleResponse(res); // Возвращаем данные при успешной авторизации
    } else {
      const errorData = await res.json(); // Получение данных об ошибке
      return Promise.reject(errorData); // Возвращаем данные об ошибке
    }
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API.BASE_URL,
  authHeaders: MAIN_API.AUTH_HEADERS,
});

export default mainApi;
