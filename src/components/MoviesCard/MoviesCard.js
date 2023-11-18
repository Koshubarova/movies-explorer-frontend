import './MoviesCard.css';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';

export default function MoviesCard({ data, savedMovies, setSavedMovies }) {
  const { pathname } = useLocation()
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (pathname === '/movies')
      setIsSaved(savedMovies.some(element => data.id === element.movieId))
  }, [savedMovies, data.id, pathname])

  function handleDeleteMovie(movId) {
    mainApi.deleteMovie(movId, localStorage.jwt)
      .then(() => {
        setSavedMovies((state) => state.filter((movie) => movie._id !== movId));
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function handleSaveMovie(data) {
    mainApi.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при сохранении фильма ${err}`))
  }

  function handleSaveOrDeleteMovie(data) {
    const saved = savedMovies.some(element => data.id === element.movieId)
    const clickedMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (saved) {
      handleDeleteMovie(clickedMovie[0]._id)
    } else {
      handleSaveMovie(data)
    }
  }

  function handleLike() {
    if (savedMovies.some(element => data.id === element.movieId)) {
      setIsSaved(true)
      handleSaveOrDeleteMovie(data)
    } else {
      setIsSaved(false)
      handleSaveOrDeleteMovie(data)
    }
  }

  function convertTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`
  }

  return (
    <li className='movies-card'>
      <article>
        <Link to={data.trailerLink} target='_blank'>
          <img src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} className='movies-card__image' />
        </Link>
        <div className='movies-card__overview'>
          <div className='movies-card__info'>
            <p className='movies-card__subtitle'>{data.nameRU}</p>
            <span className='movies-card__duration'>{convertTime(data.duration)}</span>
          </div>
          {pathname === '/saved-movies' ?
            <button type='button' className='movies-card__delete' onClick={() => handleDeleteMovie(data._id)}></button>
            :
            <button type='button' className={`movies-card__save ${isSaved? 'movies-card__save_active' : ''}`} onClick={handleLike}></button>
          }
        </div>
      </article>
    </li>
  )
}