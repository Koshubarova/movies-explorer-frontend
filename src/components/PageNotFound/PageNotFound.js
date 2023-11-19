import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  function goNavigateWebsite() {
    navigate(-3);
  }

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <button onClick={goNavigateWebsite} className="not-found__link">
        Назад
      </button>
    </div>
  );
};

export default PageNotFound;
