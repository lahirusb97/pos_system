import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import axiosClient from "../axiosClient";

type LoginResponse = {
  user: string;
  username: string;
  email: boolean;
  role: string;
};

interface AuthContextType {
  user: LoginResponse | null;
  setAuth: (userData: LoginResponse | null) => void;
  clearUser: () => void;
}

type AuthContextProps = {
  children: ReactNode;
};

const StateContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<LoginResponse | null>(() => {
    try {
      const storedUser = localStorage.getItem("mypos_auth");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing mypos_auth from localStorage:", error);
      return null;
    }
  });

  // Store user data in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("mypos_auth", JSON.stringify(user));
    } else {
      localStorage.removeItem("mypos_auth");
    }
  }, [user]);

  const setAuth = (userData: LoginResponse | null) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  // useMemo to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, setAuth, clearUser }), [user]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
