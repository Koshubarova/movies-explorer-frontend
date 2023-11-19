import "./AboutMe.css";
import photo from "../../../images/profile-photo.png";

const AboutMe = () => {
  return (
    <section className="about-me" id="about">
      <div className="about-me__content">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__info">
            <h3 className="about-me__name">Дарья</h3>
            <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">
              Я родилась и живу в Саратове, закончила факультет экономики СГУ. У
              меня есть муж и&nbsp;дочь. Я люблю слушать музыку, а ещё
              увлекаюсь бегом. Недавно начала кодить. С 2015 года работала в
              компании «СКБ Контур». После того, как прошла курс по
              веб-разработке, начал заниматься фриланс-заказами и ушла с
              постоянной работы.
            </p>
            <a
              href="https://github.com/Koshubarova"
              className="about-me__link"
            >
              GitHub
            </a>
          </div>
          <img src={photo} className="about-me__photo" alt="Фото Студента" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
