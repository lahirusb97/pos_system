import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router";

type LoginResponse = {
  user: string;
  token: string;
  username: string;
  email: boolean;
  role: string;
};

interface AuthContextType {
  user: LoginResponse | null;
  setAuth: Dispatch<SetStateAction<LoginResponse | null>>;
  clearUser: () => void;
}

type AuthContextProps = {
  children: ReactNode;
};

const StateContext = createContext<AuthContextType>({
  user: null,
  setAuth: () => {},
  clearUser: () => {},
});

export const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [loopfix, setLoopfix] = useState<LoginResponse | null>(false);

  const setAuth = (userData: LoginResponse | null) => {
    setUser(userData);
  };

  const handleAuth = async () => {
    if (!user) {
      try {
        const response = await axiosClient.post("user/");
        setUser(response.data);
      } catch (error) {}
    }
  };
  const clearUser = () => {
    setUser(null);
  };

  return (
    <StateContext.Provider value={{ user, setAuth, clearUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAuthContext = () => useContext(StateContext);
