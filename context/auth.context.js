import { useContext, createContext, useState, useMemo } from "react";

const AuthContext = createContext(null);

export function GlobalState({ children }) {
  const [user, setUser] = useState({
    name: "Abdul Ahad",
    age: 21,
  });

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a GlobalState provider");
  }

  return context;
}
