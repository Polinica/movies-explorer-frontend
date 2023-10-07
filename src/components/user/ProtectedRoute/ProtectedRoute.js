import React from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../../context/CurrentUserContext";

function ProtectedRoute({ children, redirectPath = "/" }) {
  const currentUser = React.useContext(CurrentUserContext);

  if (!currentUser) {
    return <Navigate to={redirectPath} />;
  }

  return children;
}

export default ProtectedRoute;
