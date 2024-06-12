"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { userService } from "@/services";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const initializeAuthState = () => {
      const accessToken = Cookies.get("accessToken");
      const userDetails = Cookies.get("userDetails");

      if (accessToken && userDetails) {
        setToken(accessToken);
        // setUser(JSON.parse(userDetails));
      } else {
        setToken(null);
        setUser(null);
      }
    };

    initializeAuthState();

    const interval = setInterval(() => {
      refreshToken();
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, []);

  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await fetchWrapper.post("http://localhost:8000/token", {
        token: refreshToken,
      });

      if (response.code === 200) {
        Cookies.set("accessToken", response.accessToken);
        setToken(response.accessToken);
        setUser(response.result);
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  const login = async (username: string, password: any) => {
    const res = await userService.login(username, password);

    if (res.code == 200) {
      setToken(res.accessToken);
      Cookies.set("accessToken", res.accessToken);
      Cookies.set("userDetails", res.result);
      Cookies.set("refreshToken", res.refreshToken);
      console.log(token);
      router.push("/home");
    }
    // }
    // Cookies.set("accessToken", token);
    // router.push("/home");
    // }
    // Cookies.set("accessToken", token);
    // Cookies.set("userDetails", JSON.stringify(user));
    // setToken(token);
    // setUser(user);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userDetails");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
