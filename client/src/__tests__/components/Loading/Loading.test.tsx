import Loading from '@/app/components/Loading';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Loading component', () => {
  it('should render loading when visible: true', () => {
    render(
      <Loading visible />
    );
    const loading = screen.queryByTestId('spinner-loading');
    expect(loading).toBeInTheDocument();
  });

  it('should not render loading when visible: false', () => {
    render(
      <Loading visible={false} />
    );
    const loading = screen.queryByTestId('spinner-loading');
    expect(loading).not.toBeInTheDocument();
  });
});
