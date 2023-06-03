import AppNavbar from '@/app/components/Navbar';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

// import { createRouter } from 'next/router';
// import { RouterContext } from 'next-server/dist/lib/router-context';



// import * as nextRouter from 'next/router';

// nextRouter.useRouter = jest.fn();
// nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));



// import userEvent from '@testing-library/user-event';

// const router = createRouter('', { user: 'nikita' }, '', {
//   initialProps: {},
//   pageLoader: jest.fn(),
//   App: jest.fn(),
//   Component: jest.fn(),
// });

// const useRouter = jest.spyOn(require('next/navigation'), 'useRouter')

const authUser = { id: 1, email: 'test@gmail.com' };
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
  jest.mock('../../../app/providers/app.provider', () => ({
    useApp: () => ({
      isAuth: false,
      user: null,
      login: () => { },
      logout: () => { }
    })
  }))

  it('should render navbar correctly', () => {
    render(
      <AppNavbar />
    );

    const navbar = screen.getByTestId('app-navbar');
    const loginRegisterForm = screen.getByTestId('login-register-form');
    const submitButton = screen.getByTestId('submit-button');
    expect(navbar).toBeInTheDocument();
    expect(loginRegisterForm).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });



  // it('should render navbar correctly when user loged in', () => {
  //   jest.mock('../../../app/providers/app.provider', () => ({
  //     useApp: () => ({
  //       isAuth: true,
  //       user: authUser,
  //       login: () => { },
  //       logout: () => { }
  //     })
  //   }))

  //   render(
  //     <AppNavbar />
  //   );

  //   const navbar = screen.getByTestId('app-navbar');
  //   const welcomeUser = screen.getByTestId('welcome-user');
  //   const logoutButton = screen.getByTestId('logout-button');
  //   const shareMovieButton = screen.getByTestId('share-movie-button');
  //   expect(navbar).toBeInTheDocument();
  //   expect(welcomeUser).toBeInTheDocument();
  //   expect(welcomeUser).toHaveTextContent(`Welcome ${authUser.email}`);
  //   expect(logoutButton).toBeInTheDocument();
  //   expect(shareMovieButton).toBeInTheDocument();
  // });

  // it('should not show any error message when the login-form is loaded at the first time', () => {
  //   render(
  //     <AppProvider>
  //       <AppNavbar />
  //     </AppProvider>
  //   );



  //   const passwordErrorMessage = screen.queryByTestId('password-error');
  //   const usernameOrEmailErrorMessage = screen.queryByTestId(
  //     'username-or-password-error'
  //   );
  //   expect(usernameOrEmailErrorMessage).toBeNull();
  //   expect(passwordErrorMessage).toBeNull();
  // });

  // it('should show errors message when all the fields are not entered', async () => {
  //   render(<Login />);
  //   const buttonElement = screen.getByTestId('submit-btn');
  //   await act(() => userEvent.click(buttonElement));
  //   const usernameOrEmailErrorMessage = screen.queryByTestId(
  //     'username-or-password-error'
  //   );
  //   const passwordErrorMessage = screen.getByTestId('password-error');
  //   expect(usernameOrEmailErrorMessage).toBeInTheDocument();
  //   expect(passwordErrorMessage).toBeInTheDocument();
  // });
});
