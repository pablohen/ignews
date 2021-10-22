import { render, screen } from '@testing-library/react';
import stripe from '../../services/stripe';
import Home, { getStaticProps } from '../../pages';
import { mocked } from 'ts-jest/utils';

jest.mock('next/router');
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});
jest.mock('../../services/stripe');

describe('HomePage', () => {
  test('renders correctly', () => {
    render(
      <Home
        product={{
          priceId: 'fake-price-id',
          amount: 10,
        }}
      />
    );

    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });

  test('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const res = await getStaticProps({});

    expect(res).toEqual(
      expect.objectContaining({
        props: { product: { priceId: 'fake-price-id', amount: '$10.00' } },
        revalidate: 86400,
      })
    );
  });
});
