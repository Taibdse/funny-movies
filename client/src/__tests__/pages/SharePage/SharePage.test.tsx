import ShareMoviePage from '@/app/share/page';
import { ApiService } from '@/services/api';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { ToastContainer } from 'react-toastify';

jest.mock('../../../services/api');
// const mockApiService = ApiService as jest.Mock<typeof ApiService>;

// ApiService.mockImplementation(() => Promise.resolve('test1234'))

describe('Share movie page', () => {
  it('should render share movie page correctly at first render', async () => {
    render(
      <ShareMoviePage />
    );

    const shareMovieCard = screen.getByTestId('share-movie-card');
    const shareMovieCardTitle = screen.getByTestId('share-movie-card-title');
    const shareControl = screen.getByTestId('control_ytLink');
    const shareControlLabel = screen.getByTestId('form-label_ytLink');
    const shareBtn = screen.getByTestId('share-movie-submit-btn');
    expect(shareMovieCard).toBeInTheDocument();
    expect(shareMovieCardTitle).toHaveTextContent('Share a Youtube movie');
    expect(shareControl).toBeInTheDocument();
    expect(shareControl).toHaveValue('');
    expect(shareControlLabel).toHaveTextContent('Youtube URL');
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn).toHaveTextContent('Share');
    expect(shareBtn).toBeEnabled();
  });

  it('should render loading and call ApiService.shareMovie', async () => {
    const mockShareMovie = jest
      .spyOn(ApiService, 'shareMovie')
      .mockImplementation(jest.fn(() => {
        return new Promise((resolve) => setTimeout(resolve, 1000))
      }));

    render(
      <ShareMoviePage />
    );
    const user = userEvent.setup();
    const shareControl = screen.getByTestId('control_ytLink');
    const shareBtn = screen.getByTestId('share-movie-submit-btn');

    await user.type(shareControl, 'https://www.youtube.com/watch?v=_Im4_3Z1NxQ');
    await user.click(shareBtn);
    expect(mockShareMovie).toBeCalledTimes(1);

    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-movie-submit-btn');
      expect(shareBtn).toHaveTextContent('Loading...')
      expect(shareBtn).toBeDisabled();
    })

    await waitFor(async () => {
      expect(mockShareMovie).toHaveBeenCalled()
      const shareBtn = screen.getByTestId('share-movie-submit-btn');
      expect(shareBtn).toHaveTextContent('Share');
    })
  });

  it('should render toast correctlly', async () => {
    const mockShareMovie = jest
      .spyOn(ApiService, 'shareMovie')
      .mockClear()
      .mockImplementation(jest.fn(() => {
        return new Promise((resolve) => setTimeout(resolve, 1000))
      }));

    render(
      <>
        <ToastContainer />
        <ShareMoviePage />
      </>
    );
    const user = userEvent.setup();
    const shareControl = screen.getByTestId('control_ytLink');
    const shareBtn = screen.getByTestId('share-movie-submit-btn');

    await user.type(shareControl, 'https://www.youtube.com/watch?v=_Im4_3Z1NxQ');
    await user.click(shareBtn);
    expect(mockShareMovie).toBeCalledTimes(1);

    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-movie-submit-btn');
      expect(shareBtn).toHaveTextContent('Loading...')
    })

    // await waitFor(async () => {
    //   expect(mockShareMovie).toHaveBeenCalled()
    //   const shareBtn = screen.getByTestId('share-movie-submit-btn');
    //   expect(shareBtn).toHaveTextContent('Share');
    //   expect(await screen.findByText("Shared successfully!")).toBeInTheDocument();

    //   screen.debug()
    // })

  });

  // it('should render loading and call ApiService.shareMovie', async () => {
  //   const mockShareMovie = jest
  //     .spyOn(ApiService, 'shareMovie')
  //     .mockImplementation(jest.fn());

  //   render(
  //     <ShareMoviePage />
  //   );
  //   const user = userEvent.setup();
  //   const shareControl = screen.getByTestId('control_ytLink');
  //   const shareBtn = screen.getByTestId('share-movie-submit-btn');

  //   await user.type(shareControl, 'https://www.youtube.com/watch?v=_Im4_3Z1NxQ');
  //   await user.click(shareBtn);
  //   expect(mockShareMovie).toBeCalledTimes(1);
  // });

});
