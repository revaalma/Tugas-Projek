import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = belum login

  const signIn = (username) => {
    // TODO: ganti dengan panggilan API/backend beneran
    setUser({ username });
  };

  const signUp = (username, email) => {
    // TODO: ganti dengan panggilan API/backend beneran
    setUser({ username, email });
  };

  const updateUser = (data) => {
  setUser((prev) => ({ ...prev, ...data }));
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, updateUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
