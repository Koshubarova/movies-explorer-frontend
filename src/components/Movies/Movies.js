import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useCallback, useState } from "react";
import moviesApi from '../../utils/MoviesApi';
import { useEffect } from "react";

export default function Movies({ addMovie, savedMovies, setIsError }) {
  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([]) 
  const [searchRequest, setSearchRequest] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState(false)

  const filter = useCallback((search, isChecked, movies) => {
    setSearchRequest(search)
    localStorage.setItem('movie', JSON.stringify(search))
    localStorage.setItem('shorts', JSON.stringify(isChecked))
    localStorage.setItem('allmovies', JSON.stringify(movies))
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isChecked ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    if (allMovies.length === 0) {
      setIsLoading(true)
      moviesApi.getMovies()
        .then((res) => {
          setAllMovies(res)
          setIsChecked(false)
          setServerError(false)
          filter(search, isChecked, res)
        })
        .catch(err => {
          setServerError(true)
          console.error(`Ошибка при поиске фильмов ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      filter(search, isChecked, allMovies)
    }
  }

  useEffect(() => {
    if (localStorage.allmovies && localStorage.shorts && localStorage.movie) {
      const movies = JSON.parse(localStorage.allmovies)
      const search = JSON.parse(localStorage.movie)
      const isChecked = JSON.parse(localStorage.shorts)
      setServerError(false)
      setSearchRequest(search)
      setIsChecked(isChecked)
      setAllMovies(movies)
      filter(search, isChecked, movies)
    }
  }, [filter])

  function toggleShort() {
    if (isChecked) {
      setIsChecked(false)
      filter(searchRequest, false, allMovies)
      localStorage.setItem('shorts', JSON.stringify(false))
    } else {
      setIsChecked(true)
      filter(searchRequest, true, allMovies)
      localStorage.setItem('shorts', JSON.stringify(true))
    }
  }

  return (
    <>
      <SearchForm
        isChecked={isChecked}
        searchMovies={searchMovies}
        searchRequest={searchRequest}
        toggleShort={toggleShort}
        setIsError={setIsError}
      />
      <MoviesCardList
        movies={filteredMovies}
        addMovie={addMovie}
        savedMovies={savedMovies}
        isLoading={isLoading}
        serverError={serverError}
      />
    </>
  )
}