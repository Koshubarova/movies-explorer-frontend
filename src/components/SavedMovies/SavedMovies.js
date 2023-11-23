import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { filterMovies, getFilterMovieDuration } from "../../utils/utils";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SavedMovies = ({ loggedIn, onDeleteCard, savedMovies }) => {
  const [isFilteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortMovies, setShortFilm] = useState(false);
  const [isSearchRequest, setSearchRequest] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (isFilteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [isFilteredMovies]);

  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, isSearchRequest);
    setFilteredMovies(
      isShortMovies ? getFilterMovieDuration(moviesCardList) : moviesCardList
    );
  }, [savedMovies, isShortMovies, isSearchRequest]);

  function getShortMovieFiltered() {
    setShortFilm(!isShortMovies);
  }

  function getSearchFilterMovie(request) {
    setSearchRequest(request);
  }

  return (
    <>
      <section className="saved-movies">
        <Header loggedIn={loggedIn} />
        <SearchForm
          isShortMovies={isShortMovies}
          onFilterMovies={getShortMovieFiltered}
          getSearchFilterMovie={getSearchFilterMovie}
        />
        <MoviesCardList
          cards={isFilteredMovies}
          onDeleteCard={onDeleteCard}
          savedMovies={savedMovies}
          isSavedFilms={true}
          isNotFound={isNotFound}
        />
        <Footer />
      </section>
    </>
  );
};

export default SavedMovies;
