import { render, screen } from '@testing-library/react';
import PostsPage, { getStaticProps } from '../../pages/posts';
import { mocked } from 'ts-jest/utils';
import getPrismicClient from '../../services/prismic';

const posts = [
  {
    slug: 'slug',
    title: 'title',
    excerpt: 'excerpt',
    updatedAt: 'updatedAt',
  },
];

jest.mock('../../services/prismic.ts');

describe('PostsPage', () => {
  test('renders correctly', () => {
    render(<PostsPage posts={posts} />);

    expect(screen.getByText('title')).toBeInTheDocument();
  });

  test('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'slug',
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
                  text: 'excerpt',
                },
              ],
            },
            last_publication_date: '10-22-2021',
          },
        ],
      }),
    } as any);

    const res = await getStaticProps({});

    expect(res).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'slug',
              title: 'title',
              excerpt: 'excerpt',
              updatedAt: '22 de outubro de 2021',
            },
          ],
        },
      })
    );
  });
});
