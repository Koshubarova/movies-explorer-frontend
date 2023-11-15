import './SearchForm.css'
import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useFormValidation from '../../hooks/useFormValidation'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import ErrorContext from '../../contexts/ErrorContext'

export default function SearchForm({ isChecked, toggleShort, searchRequest, searchMovies, setIsError, savedMovies }) {
  const { pathname } = useLocation();
  const isError = useContext(ErrorContext);
  const {values, handleChange, reset} = useFormValidation()

  useEffect(() => {
    if ((pathname === '/saved-movies' && savedMovies.length === 0)) {
      reset({ search: '' })
    } else {
      reset({ search: searchRequest })
    }
    setIsError(false)
  }, [searchRequest, reset, setIsError, pathname, savedMovies])

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
            required
            onChange={(evt) => {
              handleChange(evt)
              setIsError(false)}}
            value={values.search || ''}
            disabled={savedMovies ? (savedMovies.length === 0 && true) : false}
          />
          <button type='submit' className="search__submit"></button> 
        </form>
        <span className={`search__error ${isError && "search__error_active"}`}>
          {isError ? "Нужно ввести ключевое слово" : ""}
        </span>
        <FilterCheckbox isChecked={isChecked} toggleShort={toggleShort} />
      </div>
    </section>
  );
}