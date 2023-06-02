"use client";
import { setAuthRequestHeader, setUnauthorizedResponseIntercepter } from "@/config/httpClient";
import { ApiService } from "@/services/api";
import { LoginOrRegisterForm, LoginOrRegisterResponseBody, Movie, User } from "@/types/app";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { io as socketIO } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type IAppContext = {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
  movies: Movie[];
  getMovies: () => void,
  setAuth: (isAuth: boolean) => void,
  logout: () => void,
  login: (values: LoginOrRegisterForm) => Promise<LoginOrRegisterResponseBody | null>
};

const AppContext = createContext<IAppContext>({
  isAuth: false,
  user: null,
  loading: true,
  movies: [],
  getMovies: () => { },
  setAuth: (isAuth: boolean) => { },
  logout: () => { },
  login: (values: LoginOrRegisterForm) => Promise.resolve(null)
});

const useApp = () => useContext(AppContext);

const jwtTokenKey = 'jwtToken';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<any>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();
  const pathName = usePathname();

  const saveJwtToken = (token: string) => {
    localStorage.setItem(jwtTokenKey, token)
  }

  const removeJwtToken = () => {
    localStorage.removeItem(jwtTokenKey)
  }

  const getJwtToken = () => {
    return localStorage.getItem(jwtTokenKey)
  }

  const setupSocketIo = () => {
    const socket = socketIO(process.env.NEXT_PUBLIC_SOCKET_IO_URL || "");
    setSocket(socket);
    socket.on("connect", () => {
      console.log(`${socket.id} connected`);
      socket.emit("send-jwt-token", `Bearer ${getJwtToken()}`);
    })
    socket.on("new-movie", (movie: Movie) => {
      toast.info(`${movie.sharer?.email} just shared the video ${movie.title}`);
      getMovies();
    })
    socket.on("disconnect", () => {
      setSocket(null);
    })

    return socket;
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

  const clearSocket = () => {
    socket?.disconnect();
    setSocket(null);
  }

  const getMovies = async () => {
    try {
      const response: AxiosResponse<Movie[]> = await ApiService.getMovies();
      setMovies(response.data);
    } catch (error) {
      setMovies([])
    }
  }

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (isAuth) {
      setupSocketIo();
    }
    () => {
      clearSocket();
    }
  }, [isAuth]);

  useEffect(() => {
    if (!isAuth && pathName.includes('/share')) {
      router.push('/')
    }
  }, [isAuth, pathName]);

  const value: IAppContext = { isAuth, user, loading, movies, setAuth, login, logout, getMovies };

  return (
    <AppContext.Provider value={value}>
      <ToastContainer />
      {!loading && children}
    </AppContext.Provider>
  );
};

export { useApp, AppProvider };
