import "./AboutMe.css";
import photo from "../../images/profile-photo.png";
import Wrapper from "../Wrapper/Wrapper";
import { Link } from "react-router-dom";

export default function AboutMe() {
  return (
    <section className="about-me">
      <Wrapper>
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__text-container">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
              С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link
              to={"https://github.com/Koshubarova"}
              className="about-me__link"
              target="_blank"
            >
              Github
            </Link>
          </div>
          <img src={photo} alt="Фото студента" className="about-me__photo" />
        </div>
      </Wrapper>
    </section>
  );
}