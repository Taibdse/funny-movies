"use client";
import axiosClient, { setAuthRequestHeader, setUnauthorizedResponseIntercepter } from "@/config/httpClient";
import { ApiService } from "@/services/api";
import { LoginOrRegisterForm, LoginOrRegisterResponseBody, User } from "@/types/app";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export type IAuthContext = {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
  setAuth: (isAuth: boolean) => void,
  logout: () => void,
  login: (values: LoginOrRegisterForm) => Promise<LoginOrRegisterResponseBody | null>
};

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  user: null,
  loading: true,
  setAuth: (isAuth: boolean) => { },
  logout: () => { },
  login: (values: LoginOrRegisterForm) => Promise.resolve(null)
});

const useAuth = () => useContext(AuthContext);

const jwtTokenKey = 'jwtToken';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const saveJwtToken = (token: string) => {
    localStorage.setItem(jwtTokenKey, token)
  }

  const removeJwtToken = () => {
    localStorage.removeItem(jwtTokenKey)
  }

  const getJwtToken = () => {
    return localStorage.getItem(jwtTokenKey)
  }

  const login = async (values: LoginOrRegisterForm): Promise<LoginOrRegisterResponseBody | null> => {
    try {
      const response: AxiosResponse<LoginOrRegisterResponseBody> = await ApiService.loginOrRegister(values);
      const { isAuth, message, data, jwtToken } = response.data;
      if (isAuth) {
        saveJwtToken(jwtToken || "")
        setAuth(true);
        setAuthRequestHeader(jwtToken);
        setUser(decodeJwt(jwtToken))
      }
      console.log({ response });
      return response.data;
    } catch (error: AxiosError | any) {
      if (axios.isAxiosError(error)) {
        console.log({ error })
        return error.response?.data
      }
    }
    return null;
  }

  const logout = () => {
    removeJwtToken();
    setAuth(false);
    setUser(null);
    setAuthRequestHeader(null);
    router.push('/');
  }

  const decodeJwt = (token: string | null): User | null => {
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const initAuth = () => {
    const jwtToken = getJwtToken();
    const user: User | null = decodeJwt(jwtToken);
    setUnauthorizedResponseIntercepter(() => {
      logout();
    })

    if (!user) {
      setAuth(false);
      setUser(null)
    } else {
      setAuth(true);
      setUser(user);
      setAuthRequestHeader(jwtToken);
    }
    setLoading(false);
  }

  useEffect(() => {
    initAuth();
  }, [])

  const value: IAuthContext = { isAuth, user, loading, setAuth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
