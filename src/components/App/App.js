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
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  const navigate = useNavigate();

  async function handleLogin({ token }) {
    if (token) {
      localStorage.setItem("token", token);
      mainApi.setToken(token);
    }
    navigate("/movies");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleLogin} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
