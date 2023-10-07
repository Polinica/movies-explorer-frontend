import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Landing from "../Landing/Landing";
import Movies from "../movies/Movies/Movies";
import ProfilePage from "../ProfilePage/ProfilePage";
import SavedMovies from "../movies/SavedMovies/SavedMovies";
import Auth from "../Auth/Auth";
import Page404 from "../Page404/Page404";
import "./App.css";
import Register from "../user/Register/Register";
import Login from "../user/Login/Login";
import CurrentUserContext from "../../context/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../user/ProtectedRoute/ProtectedRoute";

function App() {
  // Установка начальных значений для текущего пользователя и состояния входа
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const navigate = useNavigate();

  // Авторизация при открытии страницы
  React.useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await mainApi.checkToken(token);
        mainApi.setToken(token);
        setCurrentUser(res);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("searchText");
        localStorage.removeItem("areMoviesSelected");
        localStorage.removeItem("foundMovies");
        setCurrentUser(null);
        console.error(err);
      }
    }
    setIsLoading(false);
  }
  // React.useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     mainApi
  //       .checkToken(token)
  //       .then((res) => {
  //         mainApi.setToken(token);
  //         setCurrentUser(res);
  //       })
  //       .catch((err) => {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("searchText");
  //         localStorage.removeItem("areMoviesSelected");
  //         localStorage.removeItem("foundMovies");
  //         setCurrentUser(null);
  //         console.error(err);
  //       });
  //   }
  // }, []);
  function handleLogin({ token }) {
    localStorage.setItem("token", token);
    mainApi.setToken(token);
    // const user = await mainApi.getUserInfo();
    checkToken(token);
    navigate("/movies");
  }
  // async function handleLogin({ token }) {
  //   localStorage.setItem("token", token);
  //   mainApi.setToken(token);
  //   // const user = await mainApi.getUserInfo();
  //   setCurrentUser({});
  //   navigate("/movies");
  // }

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("searchText");
    localStorage.removeItem("areMoviesSelected");
    localStorage.removeItem("foundMovies");
    setCurrentUser(null);
    navigate("/");
  }

  function handleUpdateUserInfo(res) {
    setCurrentUser(res);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoading={isLoading} redirectPath="/">
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoading={isLoading} redirectPath="/">
                <SavedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoading={isLoading} redirectPath="/">
                <Profile
                  onLogout={handleLogOut}
                  onUpdate={handleUpdateUserInfo}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Register onLogin={handleLogin} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
