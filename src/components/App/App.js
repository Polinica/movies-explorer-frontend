import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Landing from "../Landing/Landing";
import Movies from "../movies/Movies/Movies";
import SavedMovies from "../movies/SavedMovies/SavedMovies";
import Page404 from "../Page404/Page404";
import "./App.css";
import Register from "../user/Register/Register";
import Login from "../user/Login/Login";
import CurrentUserContext from "../../context/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../user/ProtectedRoute/ProtectedRoute";
import GuestPath from "../user/GuestPath/GuestPath";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Удалить все сохранённые элементы из localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("searchText");
    localStorage.removeItem("areMoviesSelected");
    localStorage.removeItem("foundMovies");
  };

  // Проверка токена асинхронно
  const checkToken = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await mainApi.checkToken(token);
        mainApi.setToken(token);
        setCurrentUser(res);
      } catch (err) {
        clearLocalStorage();
        setCurrentUser(null);
        navigate("/");
        console.error(err);
      }
    }
    setIsLoading(false);
  };

  // Инициализация проверки токена при монтировании компонента
  useEffect(() => {
    checkToken();
  }, []);

  const handleLogin = ({ token }) => {
    localStorage.setItem("token", token);
    mainApi.setToken(token);
    checkToken(token);
    navigate("/movies");
  };

  const handleUpdateUserInfo = (res) => {
    setCurrentUser(res);
  };

  const handleLogOut = () => {
    clearLocalStorage();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoading={isLoading}>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoading={isLoading}>
                <SavedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoading={isLoading}>
                <Profile
                  onLogout={handleLogOut}
                  onUpdate={handleUpdateUserInfo}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestPath isLoading={isLoading}>
                <Register onLogin={handleLogin} />
              </GuestPath>
            }
          />
          <Route
            path="/signin"
            element={
              <GuestPath isLoading={isLoading}>
                <Login onLogin={handleLogin} />
              </GuestPath>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
