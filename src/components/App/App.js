import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import Login from "../Login/Login";
import * as api from "../../utils/MainApi";
import CurrentUserContext from "../CurrentUserContext/CurrentUserContext";
import "./App.css";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import InfoToolTipEdit from "../InfoToolTipEdit/InfoToolTipEdit";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getEditProfileInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getMovies()
        .then((cardsData) => {
          setSavedMovies(cardsData.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getUserContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies");
            setIsLoggedIn(true);
          }
          navigate(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function closeAllPopups() {
    setInfoToolTipPopupOpen(false);
    setInfoToolTipUpdatePopupOpen(false);
  }

  function closeByOverlPopups(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  function getRegistratrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        getLoginUser({ email, password });
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
        console.log(err);
      });
  }

  function getLoginUser({ email, password }) {
    setIsLoading(true);
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true);
          setIsSuccess(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .modifyUserInfo(newUserInfo)
      .then((data) => {
        setInfoToolTipUpdatePopupOpen(true);
        setisEdit(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true);
        setisEdit(false);
        console.log(err);
        getAuthorizationError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getLikeMovie(card) {
    api
      .getLike(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        getAuthorizationError(err);
      });
  }

  function getDislikeMovie(card) {
    api
      .getDislike(card._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        getAuthorizationError(err);
      });
  }

  function getAuthorizationError(err) {
    if (err === "Error: 401") {
      handleWebsiteExit();
    }
  }

  const handleWebsiteExit = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("movies");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("jwt");
    localStorage.removeItem("shortMovies");
    localStorage.removeItem("allMovies");
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login isLoading={isLoading} onAuthorization={getLoginUser} />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    isLoading={isLoading}
                    onRegister={getRegistratrationUser}
                  />
                )
              }
            />
            <Route path={"*"} element={<PageNotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  savedMovies={savedMovies}
                  handleLikeFilm={getLikeMovie}
                  loggedIn={isLoggedIn}
                  onDeleteCard={getDislikeMovie}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                  onDeleteCard={getDislikeMovie}
                  savedMovies={savedMovies}
                  loggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  signOut={handleWebsiteExit}
                  onUpdateUser={getUpdateUser}
                  loggedIn={isLoggedIn}
                  isLoading={isLoading}
                />
              }
            />
          </Routes>
          <InfoToolTip
            isOpen={isInfoToolTipPopupOpen}
            onCloseOverlay={closeByOverlPopups}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
          />
          <InfoToolTipEdit
            isOpen={isInfoToolTipUpdatePopupOpen}
            onCloseOverlay={closeByOverlPopups}
            isEdit={isEdit}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
