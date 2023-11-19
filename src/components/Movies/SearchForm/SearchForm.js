import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

const SearchForm = ({
  isShortMovies,
  getSearchFilterMovie,
  onFilterMovies,
}) => {
  const [request, setRequest] = useState("");
  const [isQueryError, setisQueryError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localRequest = localStorage.getItem("movieSearch");
      setRequest(localRequest);
    }
  }, [location]);

  function getFormSubmit(e) {
    e.preventDefault();
    if (request.trim().length === 0) {
      setisQueryError(true);
    } else {
      setisQueryError(false);
      getSearchFilterMovie(request);
    }
  }

  function handleChangeInputDate(e) {
    setRequest(e.target.value);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" id="form" onSubmit={getFormSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          onChange={handleChangeInputDate}
          value={request || ""}
          
        />
        <button
          type="submit"
          className="search-form__button"
          aria-label="Поиск Фильма"
        />
      </form>
      <FilterCheckbox
        isShortMovies={isShortMovies}
        onFilterMovies={onFilterMovies}
      />
      {isQueryError && (
        <span className="search__form-error">Введите ключевое слово</span>
      )}
    </section>
  );
};

export default SearchForm;
