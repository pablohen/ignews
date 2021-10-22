import { render, screen } from '@testing-library/react';
import PostPage, { getServerSideProps } from '../../pages/posts/[slug]';
import { mocked } from 'ts-jest/utils';
import getPrismicClient from '../../services/prismic';
import { getSession } from 'next-auth/client';

const post = {
  slug: 'slug',
  title: 'title',
  content: '<p>content</p>',
  updatedAt: 'updatedAt',
};

jest.mock('../../services/prismic.ts');
jest.mock('next-auth/client');

describe('PostPage', () => {
  test('renders correctly', () => {
    render(<PostPage post={post} />);

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  test('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(null);

    const res = await getServerSideProps({
      params: {
        slug: 'slug',
      },
    } as any);

    expect(res).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/posts/preview/slug',
        }),
      })
    );
  });

  test('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    });
    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: 'heading',
              text: 'title',
            },
          ],
          content: [
            {
              type: 'paragraph',
              text: 'content',
            },
          ],
        },
        last_publication_date: '10-22-2021',
      }),
    } as any);

    const res = await getServerSideProps({
      params: {
        slug: 'slug',
      },
    } as any);

    expect(res).toEqual({
      props: {
        post: {
          slug: 'slug',
          title: 'title',
          content: '<p>content</p>',
          updatedAt: '22 de outubro de 2021',
        },
      },
    });
  });
});
