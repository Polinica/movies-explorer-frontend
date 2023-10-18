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

  isLoading() {
    return this._loading;
  }

  async register({ email, password, name }) {
    this._loading = true;
    const url = `${this._baseUrl}/signup`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      return this._handleResponse(res);
    } finally {
      this._loading = false;
    }
  }

  async login({ email, password }) {
    this._loading = true;
    const url = `${this._baseUrl}/signin`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      return this._handleResponse(res);
    } finally {
      this._loading = false;
    }
  }

  setToken(token) {
    this._authHeaders.Authorization = `Bearer ${token}`;
  }

  async checkToken(token) {
    this._loading = true;
    const url = `${this._baseUrl}/users/me`;
    const headers = { ...this._authHeaders, Authorization: `Bearer ${token}` };

    try {
      const res = await fetch(url, {
        headers,
      });
      return this._handleResponse(res);
    } finally {
      this._loading = false;
    }
  }

  async getUserInfo() {
    this._loading = true;
    const url = `${this._baseUrl}/users/me`;

    try {
      const res = await fetch(url, {
        headers: this._authHeaders,
      });
      return this._handleResponse(res);
    } finally {
      this._loading = false;
    }
  }

  async updateUserInfo({ name, email }) {
    this._loading = true;
    const url = `${this._baseUrl}/users/me`;

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: this._authHeaders,
        body: JSON.stringify({ name, email }),
      });
      return this._handleResponse(res);
    } finally {
      this._loading = false;
    }
  }

  async getSavedMovies() {
    this._loading = true;
    const url = `${this._baseUrl}/movies`;

    try {
      const res = await fetch(url, {
        headers: this._authHeaders,
      });
      return this._handleResponse(res);
    } finally {
      this._loading = false;
    }
  }

  async saveMovie(movieData) {
    console.log(" !!! saveMovie: fetch( ", `${this._baseUrl}/movies`);
    const url = `${this._baseUrl}/movies`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: this._authHeaders,
        body: JSON.stringify(movieData),
      });
      if (res.ok) {
        return this._handleResponse(res);
      } else {
        throw new Error("Фильм с таким id уже существует");
      }
    } catch (error) {
      console.log(error.message);
      // Пропускаем ошибку и все равно сохраняем фильм на клиенте
      return movieData;
    }
  }

  async deleteMovie(id) {
    this._loading = true;
    const url = `${this._baseUrl}/movies/${id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: this._authHeaders,
      });
      return this._handleResponse(res);
    } finally {
      this._loading = false;
    }
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API.BASE_URL,
  authHeaders: MAIN_API.AUTH_HEADERS,
});

export default mainApi;
