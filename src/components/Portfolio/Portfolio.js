import { Link } from 'react-router-dom'
import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__nav">
        <ul className="portfolio__lists">
          <li className="portfolio__list">
            <Link
              to={"https://github.com/Koshubarova/how-to-learn"}
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__subtitle">Статичный сайт</p>
              <button type="button" className="portfolio__button"></button>
            </Link>
          </li>
          <li className="portfolio__list">
            <Link
              to={"https://koshubarova.github.io/russian-travel"}
              target="_blank"
              className="portfolio__link"
            >
              <p className="portfolio__subtitle">Адаптивный сайт</p>
              <button type="button" className="portfolio__button"></button>
            </Link>
          </li>
          <li className="portfolio__list">
            <Link
              to={"https://github.com/Koshubarova/react-mesto-api-full-gha"}
              target="_blank"
              className="portfolio__link portfolio__link_type_last"
            >
              <p className="portfolio__subtitle">Одностраничное приложение</p>
              <button type="button" className="portfolio__button"></button>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}