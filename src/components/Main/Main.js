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
// import { movies, savedMovies } from '../../utils/constants'
// import { useEffect, useState } from 'react';

export default function Main({ 
  name, 
  onRegister, 
  onLogin, 
  logOut,
  editUserData,
  // setIsError,
  savedMovies,
  onDelete,
  addMovie,
  // isSuccess,
  // setSuccess,
  setIsEdit,
  isEdit
}) {
  // const [moviesAll, setMoviesAll] = useState([])
  // const [saveMovie, setSaveMovie] = useState([])
  // const [isCheckMoviesAll, setIsCheckMoviesAll] = useState(true)
  // const [isCheckMoviesSave, setIsCheckMoviesSave] = useState(true)

  // useEffect(() => {
  //   setMoviesAll(movies)
  //   setSaveMovie(savedMovies)
  // }, [])

  // function onCheckMoviesAll() {
  //   if (isCheckMoviesAll) {
  //     setIsCheckMoviesAll(false)

  //     setMoviesAll(moviesAll.filter((element) => element.duration <= 40))
  //   } else {
  //     setIsCheckMoviesAll(true)
  //     setMoviesAll(movies)
  //   }
  // }

  // function onCheckMoviesSave() {
  //   if (isCheckMoviesSave) {
  //     setIsCheckMoviesSave(false)
  //     setSaveMovie(saveMovie.filter((element) => element.duration <= 40))
  //   } else {
  //     setIsCheckMoviesSave(true)
  //     setSaveMovie(savedMovies)
  //   }
  // }

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
          // setIsError={setIsError}
          // isSuccess={isSuccess}
          // setSuccess={setSuccess}
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