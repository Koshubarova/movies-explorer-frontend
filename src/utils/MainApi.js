import { getSendingRequest } from "./utils";

export const BASE_URL = "https://api.koshubarova.movies.nomoredomainsrocks.ru";
// export const BASE_URL = "http://127.0.0.1:3001";

export const getUserContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => getSendingRequest(res));
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => getSendingRequest(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getSendingRequest(res));
};

export const getEditProfileInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => getSendingRequest(res));
};

export const modifyUserInfo = (data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => getSendingRequest(res));
};

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => getSendingRequest(res));
};

export const getLike = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: "https://api.nomoreparties.co" + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail:
        "https://api.nomoreparties.co" + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((res) => getSendingRequest(res));
};

export const getDislike = (cardId) => {
  return fetch(`${BASE_URL}/movies/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => getSendingRequest(res));
};
