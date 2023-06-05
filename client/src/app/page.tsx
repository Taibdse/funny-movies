"use client"
import { useEffect, useState } from "react";
import MovieComponent from "./components/Movie";
import { Movie } from "@/types/app";
import { useApp } from "./providers/app.provider";
import Loading from "./components/Loading";

export default function HomePage() {
  const { movies, getMovies } = useApp();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [])

  const fetchMovies = async () => {
    setLoading(true);
    await getMovies();
    setLoading(false)
  }

  return (
    <div data-testid="home-page-container" className="mt-4">
      <Loading visible={isLoading} />
      {(!isLoading && movies.length > 0) && movies.map((movie: Movie) => <MovieComponent key={movie.id} movie={movie} />)}
      {(!isLoading && movies.length === 0) && <h2 data-testid="movie-not-found" className="text-center">No movie found!</h2>}
    </div>
  )
}
