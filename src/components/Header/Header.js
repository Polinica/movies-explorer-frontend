import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";
import AuthLinks from "../AuthLinks/AuthLinks";
import Navigation from "../Navigation/Navigation";

function Header({ isThemed = false }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    // <header className={`header section${isThemed ? " header_themed" : ""}`}>
    <header className={`header section${isThemed ? " header_themed" : ""}`}>
      <NavLink
        className="header__main-link"
        to="/"
        style={({ isActive }) => {
          return isActive ? { pointerEvents: "none" } : {};
        }}
      >
        <img
          className="header__logo"
          alt="Логотип приложения: круг"
          src={logo}
        />
      </NavLink>
      {currentUser ? <Navigation isThemed={isThemed} /> : <AuthLinks />}
    </header>
  );
}

export default Header;
