import React from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../../context/CurrentUserContext";
import Preloader from "../../Preloader/Preloader";

function ProtectedRoute({ children, isLoading, redirectPath = "/" }) {
  const currentUser = React.useContext(CurrentUserContext);

  if (isLoading) return <Preloader />;
  if (!currentUser) return <Navigate to={redirectPath} />;

  return children;
}

export default ProtectedRoute;
