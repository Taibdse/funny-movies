import AppNavbar from '@/app/components/Navbar';
import HomePage from '@/app/page';
import { useApp, IAppContext } from '@/app/providers/app.provider';
import { Movie, User } from '@/types/app';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
jest.mock('../../../app/providers/app.provider');

const authUser: User = { id: 1, email: 'test@gmail.com' };

const mockUseApp = useApp as jest.Mock<IAppContext>;
const defaultUseAppReturnedValues: IAppContext = {
  isAuth: false,
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
  getMovies: jest.fn(),
  loading: false,
  setAuth: jest.fn(),
  movies: []
}

describe('Home page', () => {
  it('should render home page correctly', async () => {
    const mockGetMovies = jest.fn();
    mockUseApp.mockImplementation(() => ({
      ...defaultUseAppReturnedValues,
      getMovies: mockGetMovies
    }))
    render(
      <HomePage />
    );

    const homePageContainer = screen.queryByTestId('home-page-container');
    const loading = screen.queryByTestId('spinner-loading');
    expect(homePageContainer).toBeInTheDocument();
    expect(loading).toBeInTheDocument();
    expect(mockGetMovies).toBeCalledTimes(1);
    await waitFor(() => {
      const movieNotfound = screen.queryByTestId('movie-not-found');
      const spinnerLoading = screen.queryByTestId('spinner-loading');
      expect(movieNotfound).toBeInTheDocument();
      expect(spinnerLoading).not.toBeInTheDocument();
    })
  });

  it('should render home page correctly with the movie list', async () => {
    const mockGetMovies: Movie[] = [
      { id: 1, title: 'test 1', description: 'desc 1', videoLink: '', youtubeLink: '' },
      { id: 2, title: 'test 2', description: 'desc 2', videoLink: '', youtubeLink: '' },
    ];
    mockUseApp.mockImplementation(() => ({
      ...defaultUseAppReturnedValues,
      movies: mockGetMovies
    }))
    render(
      <HomePage />
    );

    await waitFor(() => {
      const movieNotfound = screen.queryByTestId('movie-not-found');
      expect(movieNotfound).not.toBeInTheDocument();
      const spinnerLoading = screen.queryByTestId('spinner-loading');
      expect(spinnerLoading).not.toBeInTheDocument();
      const movies = screen.queryAllByTestId(/movie-[1,2]/);
      expect(movies).toHaveLength(2);
    })
  });

});
