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

export default function Main({ 
  name, 
  onRegister, 
  onLogin, 
  logOut,
  editUserData,
  setIsError,
  savedMovies,
  onDelete,
  addMovie,
  setIsEdit,
  isEdit
}) {

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
        signin: <Login name={name} onLogin={onLogin} />,
        signup: <Register name={name} onRegister={onRegister} />,
        error: <Error />,
        profile: <Profile 
          name={name}
          logOut={logOut}
          editUserData={editUserData}
          setIsError={setIsError}
          setIsEdit={setIsEdit}
          isEdit={isEdit} 
          />,
        movies:
        <>
        <Movies savedMovies={savedMovies} addMovie={addMovie} />
      </>,
        savedmovies:
        <>
        <SavedMovies savedMovie={savedMovies} onDelete={onDelete} />
      </>
      }[name]}
    </main>
  )
}