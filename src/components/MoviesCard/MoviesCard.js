import './MoviesCard.css';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MoviesCard({ data, savedMovies, onDelete, addMovie}) {
  const { pathname } = useLocation()
  const [click, setClick] = useState(false)

  useEffect(() => {
    if (pathname === '/movies')
      setClick(savedMovies.some(element => data.id === element.movieId))
  }, [savedMovies, data.id, setClick, pathname])

  function onClick() {
    if (savedMovies.some(element => data.id === element.movieId)) {
      setClick(true)
      addMovie(data)
    } else {
      setClick(false)
      addMovie(data)
    }
  }

  function convertTime(duration) {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return `${hours}ч${minutes}м`
  }

  return (
    <li className='movies-card'>
      <article>
        <Link to={data.trailerLink} target='_blank'>
          <img src={pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} className='movies-card__image' />
        </Link>
        <div className='movies-card__card-group'>
          <div className='movies-card__text-group'>
            <p className='movies-card__subtitle'>{data.nameRU}</p>
            <span className='movies-card__duration'>{convertTime(data.duration)}</span>
          </div>
          {pathname === '/movies' ?
            <button type='button' className={`movies-card__save ${click ? 'movies-card__save_active' : ''}`} onClick={onClick}></button>
            :
            <button type='button' className={`movies-card__save movies-card__save_type_delete`} onClick={() => onDelete(data._id)}></button>
          }
        </div>
      </article>
    </li>
  )
}