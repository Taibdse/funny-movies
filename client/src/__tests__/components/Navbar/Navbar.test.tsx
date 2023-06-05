import AppNavbar from '@/app/components/Navbar';
import { useApp, IAppContext } from '@/app/providers/app.provider';
import { User } from '@/types/app';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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
  loading: true,
  setAuth: jest.fn(),
  movies: []
}

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      back: () => { },
      forward: () => { },
      prefetch: () => { },
      push: () => { },
      refresh: () => { },
      replace: () => { },
    };
  },
  usePathname() {
    return ""
  },

}));

describe('Navbar component', () => {
  it('should render navbar correctly when user do not login', () => {
    mockUseApp.mockImplementation(() => ({
      ...defaultUseAppReturnedValues,
    }))
    render(
      <AppNavbar />
    );

    const navbar = screen.queryByTestId('app-navbar');
    const loginRegisterForm = screen.queryByTestId('login-register-form');
    const submitButton = screen.queryByTestId('submit-button');
    const emailControl = screen.queryByTestId('control_email');
    const passwordControl = screen.queryByTestId('control_password');
    const emailError = screen.queryByTestId('error_email');
    const passwordError = screen.queryByTestId('error_password');
    expect(navbar).toBeInTheDocument();
    expect(loginRegisterForm).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(emailControl).toBeInTheDocument();
    expect(passwordControl).toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();

  });

  it('should validate error when the login form fields are invalid', async () => {
    const mockLogin = jest.fn();
    const user = userEvent.setup();
    mockUseApp.mockImplementation(() => ({
      ...defaultUseAppReturnedValues,
      login: mockLogin
    }));

    render(
      <AppNavbar />
    );

    const emailControl = screen.getByTestId('control_email');
    const passwordControl = screen.getByTestId('control_password');
    const submitButton = screen.getByTestId('submit-button');

    // set invalid value for both email and password
    await user.type(emailControl, "123")
    await user.type(passwordControl, "123")

    // show error when fields are invalid
    const emailError = screen.queryByTestId('error_email');
    const passwordError = screen.queryByTestId('error_password');
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();

    // cannot call login when fields are invalid
    await user.click(submitButton);
    expect(mockLogin).toBeCalledTimes(0);
  });

  it('should call login function when the login form fields are valid', async () => {
    const mockLogin = jest.fn();
    const user = userEvent.setup();

    mockUseApp.mockImplementation(() => ({
      ...defaultUseAppReturnedValues,
      login: mockLogin
    }));

    render(
      <AppNavbar />
    );

    const emailControl = screen.getByTestId('control_email');
    const passwordControl = screen.getByTestId('control_password');
    // const loginRegisterForm = screen.getByTestId('login-register-form');
    const submitButton = screen.getByTestId('submit-button');

    // set valid value for both email and password
    await user.type(emailControl, authUser.email)
    await user.type(passwordControl, "123456")

    // dont show error when fields are valid
    const emailError = screen.queryByTestId('error_email');
    const passwordError = screen.queryByTestId('error_password');
    expect(emailError).not.toBeInTheDocument();
    expect(passwordError).not.toBeInTheDocument();

    // can call login when fields are invalid
    await user.click(submitButton);
    expect(mockLogin).toBeCalledTimes(1);

    expect(mockLogin).toHaveBeenCalledWith({
      email: authUser.email,
      password: "123456"
    });
  });

  it('should render navbar correctly when user loged in', async () => {
    const logoutFn = jest.fn();

    mockUseApp.mockImplementation(() => ({
      ...defaultUseAppReturnedValues,
      isAuth: true,
      user: authUser,
      loading: false,
      logout: logoutFn,
    }))
    render(
      <AppNavbar />
    );
    const navbar = screen.getByTestId('app-navbar');
    const welcomeUser = screen.getByTestId('welcome-user');
    const logoutButton = screen.getByTestId('logout-button');
    const shareMovieButton = screen.getByTestId('share-movie-button');
    expect(navbar).toBeInTheDocument();
    expect(welcomeUser).toBeInTheDocument();
    expect(welcomeUser).toHaveTextContent(`Welcome ${authUser.email}`);
    expect(logoutButton).toBeInTheDocument();
    expect(shareMovieButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(logoutFn).toHaveBeenCalledTimes(1);
  });
});
