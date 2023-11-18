import './SearchForm.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm({ 
  isChecked, 
  toggleShort, 
  searchMovies, 
  setIsError 
}) {
  const { pathname } = useLocation();
  const [request, setRequest] = useState('');
  const [emptyRequest, setEmptyRequest] = useState(false);

  function handleCheck(e) {
    setRequest(e.target.value);
  }

  useEffect(() => {
    if (pathname === '/movies' && localStorage.getItem('moviesSearch')) {
      const localQuery = localStorage.getItem('moviesSearch');
      setRequest(localQuery);
    }
  }, [pathname]);

  function onSubmit(e) {
    e.preventDefault()
    if (request.trim().length !== 0) {
      searchMovies(request);
      setIsError(false);
      setEmptyRequest(false);
    } else {
      setIsError(true);
      setEmptyRequest(true);
    }
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form
          noValidate
          className="search-form__form"
          name={"SearchForm"}
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name='search'
            placeholder="Фильм"
            className="search-form__input"
            required
            onChange={handleCheck}
            value={request}
          />
          <button type='submit' className="search-form__submit"></button> 
        </form>
        {emptyRequest && 
        <span className={'search-form__error search-form__error_active'}>
          Нужно ввести ключевое слово
        </span>}
        <FilterCheckbox isChecked={isChecked} toggleShort={toggleShort} />
      </div>
    </section>
  );
}