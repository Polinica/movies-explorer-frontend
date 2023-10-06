import React from "react";

const CurrentUserContext = React.createContext();

// данные
const currentUser = {
  name: "Имя пользователя",
  about: "О пользователе",
};

export default CurrentUserContext;
