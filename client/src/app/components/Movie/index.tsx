"use client"
import styles from './styles.module.css';
import { Movie } from '@/types/app';

type MovieProps = {
  movie: Movie
}

export default function Movie(props: MovieProps) {
  const { movie } = props;

  return (
    <div className="row movie mb-3" data-testid={`movie-${movie.id}`}>
      <div className="col-sm-5 pr-sm-2">
        <iframe
          className={styles['movie__youtube-video']}
          src={movie.videoLink}
          title="I Waited 15 Years For These New Array Methods"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          data-testid={`iframe-${movie.id}`}
        ></iframe>
      </div>
      <div className="col-sm-7 pl-sm-2">
        <div data-testid={`title-${movie.id}`} className={styles['movie__title']}>{movie.title}</div>
        <div data-testid={`share-by-${movie.id}`} className="movie__share-desc">Shared by {movie.sharer?.email}</div>
        <div data-testid={`desc-${movie.id}`} className={styles['movie__desc']}>{movie.description}</div>
      </div>
    </div>
  )
}
