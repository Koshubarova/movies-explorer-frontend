import './Main.css'
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error'
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

export default function Main({ name, onRegister, onLogin, setIsError, logOut, editUserInfo, addMovie, onDelete, savedMovies, isSuccess, setSuccess, isEdit, setIsEdit }) {

  return (
    <main className="main">
      {{
        home:
          <>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </>,
        signin: <Login name={name} onLogin={onLogin} setIsError={setIsError} />,
        signup: <Register name={name} onRegister={onRegister} setIsError={setIsError} />,
        error: <Error />,
        profile: <Profile 
          name={name} 
          logOut={logOut}
          editUserInfo={editUserInfo}
          setIsError={setIsError}
          isSuccess={isSuccess}
          setSuccess={setSuccess}
          setIsEdit={setIsEdit}
          isEdit={isEdit} />,
        movies:
          <>
            <Movies savedMovies={savedMovies} addMovie={addMovie} setIsError={setIsError} />
          </>,
        savedmovies:
          <>
            <SavedMovies savedMovies={savedMovies} onDelete={onDelete} setIsError={setIsError} />
          </>
      }[name]}
    </main>
  )
}