import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchError from "../../SearchError/SearchError";
import Preloader from "../../Preloader/Preloader";
import {
  DESKTOP_DISPLAY,
  TABLET_DISPLAY,
  MOVIE_COUNTER_FOUR,
  MOVIE_COUNTER_TWO,
  MOVIE_COUNTER_WIDTH_DISPLAY_XXL,
  MOVIE_COUNTER_WIDTH_DISPLAY_XL,
  MOVIE_COUNTER_WIDTH_DISPLAY_M,
} from "../../../utils/constants";

function MoviesCardList({
  cards,
  isLoading,
  isNotFound,
  isSavedFilms,
  savedMovies,
  isReqError,
  handleLikeFilm,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0);

  function getShowCounterMovie() {
    const display = window.innerWidth;
    if (display > DESKTOP_DISPLAY) {
      setShownMovies(MOVIE_COUNTER_WIDTH_DISPLAY_XXL);
    } else if (display > TABLET_DISPLAY) {
      setShownMovies(MOVIE_COUNTER_WIDTH_DISPLAY_XL);
    } else {
      setShownMovies(MOVIE_COUNTER_WIDTH_DISPLAY_M);
    }
  }

  function getWidthMovieCounterDisplay() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(shownMovies + MOVIE_COUNTER_FOUR);
    } else if (display > TABLET_DISPLAY) {
      setShownMovies(shownMovies + MOVIE_COUNTER_TWO);
    } else {
      setShownMovies(shownMovies + MOVIE_COUNTER_TWO);
    }
  }

  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", getShowCounterMovie);
    }, 500);
    return () => {
      window.removeEventListener("resize", getShowCounterMovie);
    };
  });

  useEffect(() => {
    getShowCounterMovie();
  }, [cards]);

  function getMovieSaveCard(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Извини! Во время запроса произошла ошибка. Возможно, возникла проблема с подключением или сервер недоступен. Подождите немного и попробуйте еще раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getMovieSaveCard(savedMovies, card)}
                    cards={cards}
                    card={card}
                    handleLikeFilm={handleLikeFilm}
                    isSavedFilms={isSavedFilms}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-wrapper"></div>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getMovieSaveCard(savedMovies, card)}
                    cards={cards}
                    card={card}
                    handleLikeFilm={handleLikeFilm}
                    isSavedFilms={isSavedFilms}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-wrapper">
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button-wrapper cards__button"
                    onClick={getWidthMovieCounterDisplay}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
