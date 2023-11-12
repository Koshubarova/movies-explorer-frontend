import './SearchForm.css'
import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import useFormValidation from '../../hooks/useFormValidation'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm({ isCheck, changeShort, searchedMovie, searchMovies, savedMovie }) {
  const { pathname } = useLocation()
  const [isError,setIsError] = useState(false)
  const {values, handleChange, reset} = useFormValidation()

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovie.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchedMovie })
    }
    setIsError(false)
  }, [searchedMovie, reset, setIsError, pathname, savedMovie])

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value)
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  return (
    <section className="search">
      <div className="search__container">
        <form
          noValidate
          className="search__form"
          name={"SearchForm"}
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name='search'
            placeholder="Фильм"
            className="search__input"
            value={values.search || ''}
            required
            onChange={(evt) => {
              handleChange(evt)
              setIsError(false)
            }}
            disabled={savedMovie ? (savedMovie.length === 0 && true) : false}
          />
          <button type='submit' className="search__submit"></button>
        </form>
        <span className={`search__error ${isError && "search__error_active"}`}>
          {isError ? "Введите ключевое слово" : ""}
        </span>
        <FilterCheckbox isCheck={isCheck} changeShort={changeShort} />
      </div>
    </section>
  );
}