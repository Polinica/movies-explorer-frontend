class MainApi {
  constructor({ baseUrl, authHeaders }) {
    this._baseUrl = baseUrl;
    this._authHeaders = authHeaders;
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

    const data = await res.json();
    if (!res.ok) throw new Error(res.status);
    return data;
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

    const data = await res.json();
    if (!res.ok) throw new Error(res.status);
    return data;
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

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  }

  async getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    const res = await fetch(url, {
      headers: this._authHeaders,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(res.status);
    return data;
  }

  async updateUserInfo({ name, email }) {
    const url = `${this._baseUrl}/users/me`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: this._authHeaders,
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(res.status);
    return data;
  }

  async getSavedMovies() {
    const url = `${this._baseUrl}/movies`;

    const res = await fetch(url, {
      headers: this._authHeaders,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(res.status);
    return data;
  }

  async saveMovie(movieData) {
    const url = `${this._baseUrl}/movies`;

    const res = await fetch(url, {
      method: "POST",
      headers: this._authHeaders,
      body: JSON.stringify(movieData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(res.status);
    return data;
  }

  async deleteMovie(_id) {
    const url = `${this._baseUrl}/movies/${_id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: this._authHeaders,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(res.status);
    return data;
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.pika.nomoredomainsicu.ru",
  authHeaders: {
    "Content-Type": "application/json",
    Authorization: "jwt token here",
  },
});

export default mainApi;
