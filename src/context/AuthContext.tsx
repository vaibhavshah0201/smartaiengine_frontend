"use client";

import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
interface AuthContextType {
  user: any;
  token: any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    console.log('2oth called in context');
    
    const accessToken: any = Cookies.get("accessToken");
    const userDetails: any = Cookies.get("userDetails");

    // let user = JSON.parse(userDetails);
    // let userDetailsString = Cookies.get("userDetails");

    // if (userDetailsString) {
    //   try {
    //     // Parse the JSON string back into an object
    //     let user = JSON.parse(userDetailsString);

    //     // Now user is an object
    //     console.log(user.id); // Outputs: 123
    //     console.log(user.username); // Outputs: johndoe
    //   } catch (e) {
    //     console.error("Error parsing JSON from cookie:", e);
    //   }
    // } else {
    //   console.log("User details not found in cookie");
    // }  
    console.log(accessToken, 'accessToken');
    
    if (accessToken) {
      setToken({ token: accessToken });
      setUser(userDetails);
    }
    const interval = setInterval(() => {
      refreshToken();
    }, 15 * 60 * 1000); // Refresh token every 15 minutes
    return () => clearInterval(interval);
  }, []);

  const refreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      const response = await fetchWrapper.post("http://localhost:8000/token", {
        token: refreshToken,
      });
      if (response.code === 200) {
        Cookies.set("accessToken", response.accessToken);
        setToken({ token: response.accessToken });
        setUser(response.result);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  const login = (token: any) => {
    console.log('clogoi called');
    
    setToken({ token });
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
