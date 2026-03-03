import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Загружаем пользователя из localStorage при старте
  useEffect(() => {
    try {
      const stored = localStorage.getItem("hoopstore_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("hoopstore_users") || "[]");
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) return { ok: false, error: "Неверный email или пароль" };
      const userData = { email: found.email, name: found.name };
      localStorage.setItem("hoopstore_user", JSON.stringify(userData));
      setUser(userData);
      return { ok: true };
    } catch {
      return { ok: false, error: "Ошибка входа" };
    }
  };

  const register = (name, email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("hoopstore_users") || "[]");
      if (users.find(u => u.email === email)) {
        return { ok: false, error: "Этот email уже занят" };
      }
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("hoopstore_users", JSON.stringify(users));
      const userData = { email, name };
      localStorage.setItem("hoopstore_user", JSON.stringify(userData));
      setUser(userData);
      return { ok: true };
    } catch {
      return { ok: false, error: "Ошибка регистрации" };
    }
  };

  const logout = () => {
    localStorage.removeItem("hoopstore_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);