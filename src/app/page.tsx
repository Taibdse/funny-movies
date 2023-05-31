"use client"
import Movie from "./components/Movie";

export default function HomePage() {

  return (
    <div>
      {[1, 2, 3, 4, 5].map(() => <Movie />)}
    </div>
  )
}
