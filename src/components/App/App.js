import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { useState, useEffect, useCallback } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ErrorContext from '../../contexts/ErrorContext';
import SendContext from '../../contexts/SendContext';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedPage from '../ProtectedPage/ProtectedPage';

function App() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [isError, setIsError] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [popup, setPopup] = useState(false)// попробовать сделать попап-уведомление

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([mainApi.getUserInfo(localStorage.jwt), mainApi.getMovies(localStorage.jwt)])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse())
          setCurrentUser(userData)
          setIsLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`)
          setIsCheckToken(false)
          localStorage.clear()
        })
    } else {
      setIsLoggedIn(false)
      setIsCheckToken(false)
      localStorage.clear()
    }
  }, [isLoggedIn])

  const setSuccess = useCallback(() => {
    setIsSuccess(false)
  }, [])

  function handleLogin(email, password) {
    setIsSend(true)
    mainApi.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        navigate('/movies')
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при авторизации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleRegister(username, email, password) {
    setIsSend(true)
    mainApi.register(username, email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(false)
          handleLogin(email, password)
        }
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function logOut() {
    localStorage.clear()
    setIsLoggedIn(false)
    navigate('/')
  }

  function editUserInfo(username, email) {
    setIsSend(true)
    mainApi.setUserInfo(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setIsSuccess(true)
        setIsEdit(false)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибка при редактировании данных пользователя ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleDeleteMovie(deletemovieId) {
    mainApi.deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function handleSaveMovie(data) {
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
        .catch((err) => console.error(`Ошибка при сохранении фильма ${err}`))
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SendContext.Provider value={isSend}>
        <ErrorContext.Provider value={isError}>
          <div className="page">
          {isCheckToken ? <Preloader /> :

            <Routes>
              <Route 
                path='/signin' 
                element={isLoggedIn ? <Navigate to='/movies' replace /> :
                  <Main name='signin' onLogin={handleLogin} setIsError={setIsError} />}
              />

              <Route 
                path='/signup' 
                element={isLoggedIn ? <Navigate to='/movies' replace /> :
                  <Main name='signup' onRegister={handleRegister} setIsError={setIsError} />} 
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
                  element={ProtectedPage}
                  savedMovies={savedMovies}
                  addMovie={handleSaveMovie}
                  name='movies'
                  isLoggedIn={isLoggedIn}
                  setIsError={setIsError}
                />}
              />

              <Route 
                path='/saved-movies' 
                element={<ProtectedRoute
                  element={ProtectedPage}
                  savedMovies={savedMovies}
                  onDelete={handleDeleteMovie}
                  name='savedmovies'
                  isLoggedIn={isLoggedIn}
                  setIsError={setIsError}
                />}
              />

              <Route 
                path='/profile' 
                element={<ProtectedRoute
                  element={ProtectedPage}
                  logOut={logOut}
                  name='profile'
                  isLoggedIn={isLoggedIn}
                  editUserInfo={editUserInfo}
                  setIsError={setIsError}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
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
          }
          </div>
        </ErrorContext.Provider>
      </SendContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;