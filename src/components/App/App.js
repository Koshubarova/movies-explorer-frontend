import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { useState, useEffect, useCallback } from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [currentUser, setCurrentUser] = useState({})
  const [userInfo, setUserInfo] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false) //состояние авторизации
  const [isError, setIsError] = useState(false) //состояние ошибки
  // const [preloader, setPreloader] = useState(false) //прелоадер
  const [responseSuccess, setResponseSuccess] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false); //попап ошибки/успеха
  const [isErrorUser, setIsErrorUser] = useState(true)
  const [savedMovies, setSavedMovies] = useState([])
  // const [moviesList, setMoviesList] = useState([])


  const [isSend, setIsSend] = useState(false)
  // const [isCheckToken, setIsCheckToken] = useState(true)
  // const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false) //прелоадер

  //функция открытия попапа
  function openInfoTooltip() { 
    setIsInfoTooltipOpen(true); 
  } 

  //функция закрытия попапа
  function closeInfoTooltip() { 
    setIsInfoTooltipOpen(false) 
  }

  useEffect(() => {
		setIsError("");
	}, [pathname]);

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([mainApi.getUserInfo(localStorage.jwt), mainApi.getSavedMovies(localStorage.jwt)])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies)
          setCurrentUser(userData)
          setIsLoggedIn(true)
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`)
          localStorage.clear()
        })
    } else {
      setIsLoggedIn(false)
      localStorage.clear()
    }
  }, [isLoggedIn])

  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setUserInfo(res.name, res.email);
          navigate("/", {replace: true})
        })
        .catch((err) => {
          setIsLoggedIn(false);
          console.log(err);
        });
    };
  }

  function handleLogin(email, password) {
    mainApi.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        setUserInfo(res.name, res.email);
        navigate('/movies')
      })
      .catch((err) => {
        setIsError(true)
        setIsErrorUser(true)
        openInfoTooltip();
        console.error(`Ошибка при авторизации ${err}`)
      })
  }

  function handleRegister(username, email, password) {
    mainApi.register(username, email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(false)
          handleLogin(email, password)
        }
      })
      .catch((err) => {
        setIsError(true)
        setIsErrorUser(true)
        openInfoTooltip();
        console.error(`Ошибка при регистрации ${err}`)
      })
  }

  function signOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/')
  }

  function editUserInfo(name, email) {
    mainApi.setUserInfo(name, email, localStorage.jwt)
      .then(res => {
        console.log(res);
        setCurrentUser(res)
        setIsErrorUser(false)
        openInfoTooltip();
        setResponseSuccess('Данные успешно изменены')
        setIsEdit(false)
      })
      .catch((err) => {
        setIsError(true)
        setIsErrorUser(true)
        openInfoTooltip();
        setResponseError('При обновлении профиля произошла ошибка.');
        console.error(`Ошибка при редактировании данных пользователя ${err}`)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <>
          <Header isLoggedIn={isLoggedIn}/>
          <Routes>
            <Route 
              path='/signin' 
                element={isLoggedIn ? <Navigate to='/movies' replace /> :
                  <Login onLogin={handleLogin} setIsError={setIsError} isSend={isSend}/>
                }
            />

            <Route 
              path='/signup' 
              element={isLoggedIn ? <Navigate to='/movies' replace /> :
                <Register onRegister={handleRegister} setIsError={setIsError} isSend={isSend}/>
              } 
            />

            <Route 
              path='/' 
              element={
                <>
                  <Main name='home' />
                </>
              } 
            />

            <Route 
              path='/movies' 
              element={<ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                preloader={Preloader}
                isLoading={isLoading}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                name='movies'
                setIsError={setIsError}
              />}
            />

            <Route 
              path='/saved-movies' 
              element={<ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                name='savedmovies'
                setIsError={setIsError}
              />}
            />

            <Route 
              path='/profile' 
              element={<ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                signOut={signOut}
                name='profile'
                editUserInfo={editUserInfo}
                setIsError={setIsError}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                isError={isError}
                isLoading={isLoading}
              />}
            />

            <Route 
              path='*' 
              element={ErrorPage} 
            />
          </Routes>
          <Footer/>
          <InfoTooltip 
            isOpen={isInfoTooltipOpen} 
            onClose={closeInfoTooltip} 
            isErrorUser={isErrorUser}
          /> 
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;