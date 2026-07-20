import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/blog';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'Alastor Curns — Blog',
    description: 'Writing on software, the web, and building things.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
