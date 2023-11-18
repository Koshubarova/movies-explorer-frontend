import { useNavigate } from 'react-router-dom'
import './ErrorPage.css'

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <section className='error-page'>
      <div className='error-page__container'>
        <h2 className='error-page__title'>404</h2>
        <p className='error-page__subtitle'>Страница не найдена</p>
        <button className='error-page__button' type='button' onClick={() => navigate(-1)}>Назад</button>
      </div>
    </section>
  )
}
