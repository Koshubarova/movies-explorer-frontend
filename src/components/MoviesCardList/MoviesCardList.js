import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({ movies, onDelete, addMovie, savedMovies, isLoading, serverError, firstEntrance }) {
  const { pathname } = useLocation()
  const [count, setCount] = useState(printCards().init)
  const fact = movies.slice(0, count)

  // const BigScreen = 1280
  // const MediumScreen = 1024
  // const SmallScreen = 650
  // const BigScreenInitMore = 16
  // const BigScreenInitLess = 12
  // const MediumScreenInit = 8
  // const SmallScreenInit = 5
  // const BigScreenStep = 4
  // const MediumScreenStep = 3
  // const SmallScreenStep = 2

  function printCards() {
    const counter = { init: 16, step: 4 }
    if (window.innerWidth < 1280) {
      counter.init = 12
      counter.step = 3
    }
    if (window.innerWidth < 1024) {
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
      setCount(printCards().init)
      function printCardsForResize() {
        if (window.innerWidth >= 1280) {
          setCount(printCards().init)
        }
        if (window.innerWidth < 1280) {
          setCount(printCards().init)
        }
        if (window.innerWidth < 1024) {
          setCount(printCards().init)
        }
        if (window.innerWidth < 650) {
          setCount(printCards().init)
        }
      }
      window.addEventListener('resize', printCardsForResize)
      return () => window.removeEventListener('resize', printCardsForResize)
    }
  }, [pathname, movies])

  function clickMore() {
    setCount(count + printCards().step)
  }

  return (
    <section className='movies-cardlist'>
      <ul className='movies-cardlist__lists'>
      {isLoading ? <Preloader /> :
          (pathname === '/movies' && fact.length !== 0) ?
            fact.map(data => {
              return (
                <MoviesCard key={data.id} savedMovies={savedMovies} addMovie={addMovie} data={data}
                />
              )
            }) : movies.length !== 0 ?
              movies.map(data => {
                return (
                  <MoviesCard key={data._id} onDelete={onDelete} data={data}
                  />
                )
              }) : serverError ?
                <span className='movies-cardlist__serch-error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
                :
                <span className='movies-cardlist__serch-error'>Ничего не найдено</span>
      }
      </ul>
      <button type='button' className={`movies-cardlist__more ${count >= movies.length && 'movies-cardlist__more_hidden'}`} onClick={clickMore}>Ёще</button>
    </section>
  )
}