import './MoviesCardList.css'
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import { useState, useEffect } from 'react'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({ movies, onDelete, addMovie, savedMovies, isLoading, serverError }) {
  const { pathname } = useLocation()
  const [count, setCount] = useState('')
  const movieCards = movies.slice(0, count)

  function postMovieCards() {
    const counter = { init: 16, step: 4}
    if (window.innerWidth < 1280) {
      counter.init = 12
      counter.step = 3
    }if (window.innerWidth < 1024) {
      counter.init = 8
      counter.step = 2
    }
    if (window.innerWidth < 650) {
      counter.init = 5
      counter.step = 2
    }
    return counter
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setCount(postMovieCards().init)
      function postMovieCardsForResize() {
        if (window.innerWidth >= 1280) {
          setCount(postMovieCards().init)
        }
        if (window.innerWidth < 1280) {
          setCount(postMovieCards().init)
        }
        if (window.innerWidth < 1024) {
          setCount(postMovieCards().init)
        }
        if (window.innerWidth < 650) {
          setCount(postMovieCards().init)
        }
      }
      window.addEventListener('resize', postMovieCardsForResize)
      return () => window.removeEventListener('resize', postMovieCardsForResize)
    }
  }, [pathname, movies])

  function clickMore() {
    setCount(count + postMovieCards().step)
  }

  return (
    <section className='movies-cardlist'>
      <ul className='movies-cardlist__lists'>
        {isLoading ? <Preloader /> :
          (pathname === '/movies' && movieCards.length !== 0) ?
          movieCards.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  savedMovies={savedMovies}
                  addMovie={addMovie}
                  data={data}
                />
              )
            }) : movies.length !== 0 ?
              movies.map(data => {
                return (
                  <MoviesCard
                    key={data._id}
                    onDelete={onDelete}
                    data={data}
                  />
                )
              }) : serverError ?
                <span className='movies-cardlist__search-error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
                </span>
                : 
                <span className='movies-cardlist__search-error'>«Ничего не найдено»</span>
        }
      </ul>
      {pathname === '/movies' && <button type='button' className={`movies-cardlist__more ${count >= movies.length && 'movies-cardlist__more_hidden'}`} onClick={clickMore}>Еще</button>}
    </section>
  )
}