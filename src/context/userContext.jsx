import { createContext, useState } from "react";

export const userContext = createContext();

const UserContextProvider = function ({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  console.log(accessToken, user);

  const value = {
    accessToken,
    setAccessToken,
    user,
    setUser,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserContextProvider;
