class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);}

  // _request(url, options) {
  //   return fetch(`${this._url}${url}`, options)
  //     .then(this._checkResponse)
  // }

  register(username, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password
      })
    })
    .then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(this._checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      });
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
    .then(this._checkResponse);
  }

  getMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  setUserInfo(username, email, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        email: email,
      })
    })
    .then(this._checkResponse);
  }

  addMovie(data, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
    .then(this._checkResponse);
  }

  deleteMovie(cardId, token) {
    return fetch(`${this._url}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }
}

// const mainApi = new MainApi({
//   baseUrl: 'https://api.koshubarova.movies.nomoredomainsrocks.ru',
// });

const mainApi = new MainApi({
  baseUrl: 'http://127.0.0.1:3000',
});

export default mainApi