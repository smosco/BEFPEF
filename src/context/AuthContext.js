import { createContext, useState, useEffect, useContext } from "react";
import { onUserStateChange, login, logout } from "../api/firebase";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  });

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
