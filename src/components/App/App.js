import { Navigate, useNavigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { useState, useEffect, useCallback } from 'react';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';



function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // const [isSend, setIsSend] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  // const [isError, setIsError] = useState(false)
  // const [isCheckToken, setIsCheckToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  function handleRegister(username, email, password) {
    // setIsSend(true)
    mainApi.register(username, email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(false)
          mainApi.authorize(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setIsLoggedIn(true)
              navigate('/movies')
              // window.scrollTo(0, 0)
            })
            .catch((err) => {
              // setIsError(true)
              console.error(`Ошибка при авторизации ${err}`)
            })
            // .finally(() => setIsSend(false))
        }
      })
      .catch((err) => {
        // setIsError(true)
        console.error(`Ошибка при регистрации ${err}`)
      })
      // .finally(() => setIsSend(false))
  }

  function handleLogin(email, password) {
    // setIsSend(true)
    mainApi.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        navigate('/movies')
        // window.scrollTo(0, 0)
      })
      .catch((err) => {
        // setIsError(true)
        console.error(`Ошибка при авторизации ${err}`)
      })
      // .finally(() => setIsSend(false))
  }

  function logOut() {
    localStorage.clear()
    setIsLoggedIn(false)
    navigate('/')
  }

  function editUserData(username, email) {
    // setIsSend(true)
    mainApi.setUserInfo(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setIsSuccess(true)
        setIsEdit(false)
      })
      .catch((err) => {
        // setIsError(true)
        console.error(`Ошибка при редактировании данных пользователя ${err}`)
      })
      // .finally(() => setIsSend(false))
  }

  function handleDeleteMovie(deletemovieId) {
    mainApi.deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function handleToggelMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId)
    const seachClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      handleDeleteMovie(seachClickMovie[0]._id)
    } else {
      mainApi.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt);
      mainApi.getUserInfo()
        .then(({name, email}) => {
          setCurrentUser((prev) => ({...prev, name: name, email: email, isLoggedIn: true}))
        })
        .catch((e) => console.log(e))
    }
  }, [])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route 
            path='/signin' 
            element={
              isLoggedIn ? <Navigate to='/movies' replace /> :
              <Main name='signin' onLogin={handleLogin}/>} 
          />

          <Route 
            path='/signup' 
            element={isLoggedIn ? <Navigate to='/movies' replace /> :
            <Main name='signup' onRegister={handleRegister} />} 
          />

          <Route 
            path='/' 
            element={
              <>
                <Header name='home' isLoggedIn={isLoggedIn}/>
                <Main name='home' />
                <Footer />
              </>
            } 
          />

          <Route 
            path='/movies' 
            element={<ProtectedRoute
              element={
                <>
                  <Header />
                  <Main name='movies' />
                  <Footer />
                </>
              } 
              name='movies'
              savedMovies={savedMovies}
              addMovie={handleToggelMovie}
              isLoggedIn={isLoggedIn}
            />}
          />

          <Route 
            path='/saved-movies' 
            element={<ProtectedRoute
              element={
                <>
                  <Header />
                  <Main name='savedmovies' />
                  <Footer />
                </>
              } 
              name='savedmovies'
              onDelete={handleDeleteMovie}
              savedMovies={savedMovies}
              isLoggedIn={isLoggedIn}
            />}
          />

          <Route 
            path='/profile' 
            element={<ProtectedRoute
              element={
              <>
                <Header />
                <Main name='profile' setIsLoggedIn={setIsLoggedIn}/>
              </>
              } 
              name='profile'
              isLoggedIn={isLoggedIn}
              logOut={logOut}
              editUserData={editUserData}
              // isSuccess={isSuccess}
              // setSuccess={setSuccess}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />}
          />

          <Route 
            path='*' 
            element={
              <>
                <Main name='error' />
              </>
            } 
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;