import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useEffect, useState } from "react";

export default function SavedMovies({ savedMovies, onDelete, setIsError }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [searchRequest, setSearchRequest] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const filter = useCallback((search, isChecked, movies) => {
    setSearchRequest(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isChecked ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    filter(search, isChecked, savedMovies)
  }

  useEffect(() => {
    filter(searchRequest, isChecked, savedMovies)
  }, [filter, savedMovies, isChecked, searchRequest]) 

  function toggleShort() {
    if (isChecked) {
      setIsChecked(false)
      filter(searchRequest, false, savedMovies)
    } else {
      setIsChecked(true)
      filter(searchRequest, true, savedMovies)
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
        savedMovies={savedMovies}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
      />
    </>
  )
}