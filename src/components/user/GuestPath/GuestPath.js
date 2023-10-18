import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../../context/CurrentUserContext";
import Preloader from "../../Preloader/Preloader";

function GuestPath({ children, pending }) {
  const navigate = useNavigate();
  const user = useContext(CurrentUserContext);

  React.useEffect(() => {
    if (!pending && user) navigate("/movies");
  }, [pending, user, navigate]);

  if (pending) return <Preloader />;

  return children;
}

export default GuestPath;
