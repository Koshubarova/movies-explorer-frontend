import React from "react";
import "./Promo.css";
import NavTab from "../NavTab/NavTab";
import imgGlobe from "../../../images/text__COLOR_landing-logo.svg";

const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__container-intro">
          <article className="promo__info">
            <h1 className="promo__title">
              Учебный проект студента факультета
              <span className="promo__title-span"> Веб-разработки.</span>
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
          </article>
          <img
            src={imgGlobe}
            className="promo__image"
            alt="Изображение глобуса"
          />
        </div>
        <NavTab />
      </div>
    </section>
  );
};

export default Promo;
