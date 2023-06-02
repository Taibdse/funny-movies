"use client"
import { useEffect, useState } from "react";
import MovieComponent from "./components/Movie";
import { ApiService } from "@/services/api";
import { AxiosResponse } from 'axios';
import { Movie } from "@/types/app";
import { useApp } from "./providers/app.provider";

export default function HomePage() {
  const { movies, getMovies } = useApp();

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="mt-4">
      {movies.map((movie: Movie) => <MovieComponent key={movie.id} movie={movie} />)}
    </div>
  )
}
