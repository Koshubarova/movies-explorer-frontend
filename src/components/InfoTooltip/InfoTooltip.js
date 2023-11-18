import "./InfoTooltip.css"; 
import React from "react"; 
import successImage from '../../images/success.svg'; 
import errorImage from '../../images/error.svg'; 

export default function InfoTooltip({isOpen, onClose, isErrorUser }) { 
  return ( 
    <div className={`info-tooltip ${isOpen ? 'info-tooltip_opened' : ''}`}> 
      <div className="info-tooltip__container"> 
        <img src={isErrorUser ? errorImage : successImage} className="info-tooltip__img" alt="Инфопопап"/> 
        <p className="info-tooltip__text">{isErrorUser ? "Что-то пошло не так! Попробуйте ещё раз." : "Все получилось!"}</p> 
        <button type="button" className="info-tooltip__close" onClick={onClose}></button> 
      </div> 
    </div> 
  ) 
} 