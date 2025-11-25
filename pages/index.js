import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  // Pobierz najnowszy post jako featured
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4); // 3 najnowsze po featured
  const olderPosts = posts.slice(4); // Reszta

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      
      <main className="w-full">
        {/* HERO SECTION */}
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold lg:text-6xl">
            {globalData.blogTitle}
          </h1>
          <p className="text-xl opacity-70 max-w-2xl mx-auto">
            {globalData.footerText}
          </p>
        </section>

        {/* FEATURED POST */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Featured</h2>
            <Link
              as={`/posts/${featuredPost.filePath.replace(/\.mdx?$/, '')}`}
              href={`/posts/[slug]`}
              className="block overflow-hidden transition border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10"
            >
              <div className="p-8 lg:p-12">
                {featuredPost.data.date && (
                  <p className="mb-3 text-sm font-bold uppercase opacity-60">
                    {featuredPost.data.date}
                  </p>
                )}
                <h3 className="mb-4 text-3xl font-bold lg:text-4xl">
                  {featuredPost.data.title}
                </h3>
                {featuredPost.data.description && (
                  <p className="text-lg opacity-80">
                    {featuredPost.data.description}
                  </p>
                )}
                <div className="flex items-center mt-6 text-primary">
                  <span className="mr-2">Read more</span>
                  <ArrowIcon />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* RECENT POSTS - GRID */}
        {recentPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold">Recent Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.filePath}
                  as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                  href={`/posts/[slug]`}
                  className="block transition border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10"
                >
                  <div className="p-6">
                    {post.data.date && (
                      <p className="mb-2 text-sm font-bold uppercase opacity-60">
                        {post.data.date}
                      </p>
                    )}
                    <h3 className="mb-3 text-xl font-bold">
                      {post.data.title}
                    </h3>
                    {post.data.description && (
                      <p className="mb-4 text-sm opacity-70 line-clamp-3">
                        {post.data.description}
                      </p>
                    )}
                    <ArrowIcon className="mt-auto" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ALL POSTS - LIST */}
        {olderPosts.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold">All Posts</h2>
            <ul className="space-y-4">
              {olderPosts.map((post) => (
                <li
                  key={post.filePath}
                  className="transition border rounded-lg bg-white/10 border-gray-800/10 backdrop-blur-lg dark:bg-black/30 hover:bg-white/20 dark:hover:bg-black/50 dark:border-white/10"
                >
                  <Link
                    as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                    href={`/posts/[slug]`}
                    className="block px-6 py-6 lg:px-8"
                  >
                    <div className="flex flex-col justify-between md:flex-row md:items-center">
                      <div className="flex-1">
                        {post.data.date && (
                          <p className="mb-2 text-sm font-bold uppercase opacity-60">
                            {post.data.date}
                          </p>
                        )}
                        <h3 className="mb-2 text-xl font-bold">
                          {post.data.title}
                        </h3>
                        {post.data.description && (
                          <p className="opacity-70">
                            {post.data.description}
                          </p>
                        )}
                      </div>
                      <ArrowIcon className="mt-4 md:mt-0 md:ml-4" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
