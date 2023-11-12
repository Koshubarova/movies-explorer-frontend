class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);}

  // _request(url, options) {
  //   return fetch(`${this._url}${url}`, options)
  //     .then(this._checkResponse)
  // }

  // getMovies() {
  //   return this._request('/')
  // }

  getMovies() {
    return fetch(`${this._url}`, {
			method: "GET",
			headers: this._headers,
		})
      .then(this._checkResponse)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi