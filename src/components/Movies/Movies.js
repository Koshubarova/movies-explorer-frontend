import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as movies from "../../utils/MoviesApi";
import { filterMovies, getFilterMovieDuration } from "../../utils/utils";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({ loggedIn, handleLikeFilm, savedMovies, onDeleteCard }) {
  const [initialCardsMovies, setInitialCardsMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isQueryError, setisQueryError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShortMovies, setisShortMovies] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      setIsNotFound(filteredMovies.length === 0);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  function getShortMovieFiltered() {
    setisShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (getFilterMovieDuration(initialCardsMovies).length === 0) {
        setFilteredMovies(getFilterMovieDuration(initialCardsMovies));
      } else {
        setFilteredMovies(getFilterMovieDuration(initialCardsMovies));
      }
    } else {
      setFilteredMovies(initialCardsMovies);
    }
    localStorage.setItem("shortMovies", !isShortMovies);
  }

  function getEditFilteredMovie(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short);
    setInitialCardsMovies(moviesCardList);
    setFilteredMovies(short ? getFilterMovieDuration(moviesCardList) : moviesCardList);
    localStorage.setItem("movies", JSON.stringify(moviesCardList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setisShortMovies(true);
    } else {
      setisShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialCardsMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(getFilterMovieDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  function getSearchFilterMovie(query) {
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("shortMovies", isShortMovies);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      getEditFilteredMovie(movies, query, isShortMovies);
    } else {
      setIsLoading(true);
      movies
        .getMovies()
        .then((cardsData) => {
          getEditFilteredMovie(cardsData, query, isShortMovies);
          setisQueryError(false);
        })
        .catch((err) => {
          setisQueryError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        isShortMovies={isShortMovies}
        onFilterMovies={getShortMovieFiltered}
        getSearchFilterMovie={getSearchFilterMovie}
      />
      <MoviesCardList
        cards={filteredMovies}
        isQueryError={isQueryError}
        savedMovies={savedMovies}
        handleLikeFilm={handleLikeFilm}
        onDeleteCard={onDeleteCard}
        isLoading={isLoading}
        isSavedFilms={false}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  );
}

export default Movies;
