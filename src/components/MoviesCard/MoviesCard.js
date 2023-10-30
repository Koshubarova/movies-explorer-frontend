import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MoviesCard.css';

export default function MoviesCard({ name, src, trailerLink }) {
  const { pathname } = useLocation()
  const [click, setClick] = useState(false)

  function onClick() {
    if (click) {
      setClick(false)
    } else {
      setClick(true)
    }
  }
  return (
    <li className='movies-card'>
      <article>
        <Link to={trailerLink} target='_blank'>
          <img src={src} alt="Изображение фильма" className='movies-card__image' />
        </Link>
        <div className='movies-card__card-group'>
          <div className='movies-card__text-group'>
            <p className='movies-card__subtitle'>{name}</p>
            <span className='movies-card__duration'>1ч 42м</span>
          </div>
          {pathname === '/movies' ?
            <button type='button' className={`movies-card__save ${click ? 'movies-card__save_active' : ''}`} onClick={onClick}></button>
            :
            <button type='button' className={`movies-card__save movies-card__save_type_delete`} onClick={onClick}></button>
          }
        </div>
      </article>
    </li>
  )
}