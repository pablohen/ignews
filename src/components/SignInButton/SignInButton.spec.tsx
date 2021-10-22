import { render, screen } from '@testing-library/react';
import SignInButton from './';
import { useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';

jest.mock('next-auth/client');

describe('SignInButton Component', () => {
  test('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
  });

  test('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      { user: { email: 'user@mail.com', image: '.png', name: 'Username' } },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText('Username')).toBeInTheDocument();
  });
});
