import MovieComponent from '@/app/components/Movie';
import { Movie } from '@/types/app';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const movie: Movie = {
  id: 1,
  title: 'test title',
  description: 'test description',
  videoLink: 'https://www.youtube.com/embed/mJn0B7mXmDI?feature=oembed',
  youtubeLink: 'https://www.youtube.com/watch?v=mJn0B7mXmDI',
  sharer: { id: 1, email: 'test@gmail.com' }
}

describe('Movie component', () => {

  it('should render movie card correctly', () => {
    render(<MovieComponent movie={movie} />);
    const movieCard = screen.getByTestId(`movie-${movie.id}`);
    const movieIframe = screen.getByTestId(`iframe-${movie.id}`);
    const movieTitle = screen.getByTestId(`title-${movie.id}`);
    const movieShareBy = screen.getByTestId(`share-by-${movie.id}`);
    const movieDesc = screen.getByTestId(`desc-${movie.id}`);

    expect(movieCard).toBeInTheDocument();
    expect(movieIframe).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(movieShareBy).toBeInTheDocument();
    expect(movieDesc).toBeInTheDocument();
  });

  it('should render content correctly', () => {
    render(<MovieComponent movie={movie} />);
    const movieIframe = screen.getByTestId(`iframe-${movie.id}`);
    const movieTitle = screen.getByTestId(`title-${movie.id}`);
    const movieShareBy = screen.getByTestId(`share-by-${movie.id}`);
    const movieDesc = screen.getByTestId(`desc-${movie.id}`);

    expect(movieIframe).toHaveAttribute("src", movie.videoLink);
    expect(movieTitle).toHaveTextContent(movie.title);
    expect(movieShareBy).toHaveTextContent(`Shared by ${movie.sharer?.email}`);
    expect(movieDesc).toHaveTextContent(movie.description);
  });


});
