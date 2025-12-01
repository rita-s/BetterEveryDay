import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

const CATEGORIES = [
    { id: 'mind', name: 'Mind', emoji: '🧠' },
    { id: 'body', name: 'Body', emoji: '🧘‍♀️' },
    { id: 'self', name: 'Self', emoji: '🌱' },
    { id: 'productivity', name: 'Productivity', emoji: '⚡' },
    { id: 'systems', name: 'Systems', emoji: '⚙️' },
    { id: 'strategy', name: 'Strategy', emoji: '🎯' },
    { id: 'people', name: 'People', emoji: '💬' },
    { id: 'wealth', name: 'Wealth', emoji: '💰' },
];

// helper: bezpieczne porównanie kategorii (string / array / cokolwiek)
function matchesCategory(categoryField, catId) {
    if (!categoryField) return false;

    // jeśli to tablica np. ["mind", "strategy"]
    if (Array.isArray(categoryField)) {
        return categoryField.some((c) =>
            String(c).toLowerCase() === catId
        );
    }

    // w każdym innym wypadku traktujemy jak string
    return String(categoryField).toLowerCase() === catId;
}

export default function Archive({ posts, globalData }) {
    // Group by category
    const postsByCategory = CATEGORIES
        .map((cat) => ({
            ...cat,
            posts: posts.filter((post) =>
                matchesCategory(post?.data?.category, cat.id)
            ),
        }))
        .filter((cat) => cat.posts.length > 0);

    return (
        <Layout>
            <SEO
                title={`Articles - ${globalData.name}`}
                description="Browse all articles by category"
            />
            <Header name={globalData.name} />

            <main className="w-full px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="mb-16 pt-16 md:pt-24 text-center">
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                        style={{
                            fontFamily:
                                'europa, Helvetica Neue, Helvetica, sans-serif',
                            fontWeight: 700,
                            color: '#000',
                        }}
                    >
                        All Articles
                    </h1>
                    <p
                        className="text-lg md:text-xl max-w-2xl mx-auto"
                        style={{
                            fontFamily:
                                'minion-pro, Minion Pro, Georgia, Times, serif',
                            color: '#555',
                            lineHeight: 1.7,
                        }}
                    >
                        Browse articles by topic. The central question that drives
                        my work is, &quot;How can we live better?&quot; To answer
                        that question, I like to write about science-based ways to
                        solve practical problems.
                    </p>
                </div>

                {/* CATEGORIES GROUPED */}
                <div className="space-y-20 mb-24">
                    {postsByCategory.map((category) => (
                        <section
                            key={category.id}
                            className="border-t border-gray-200 pt-12"
                        >
                            {/* Category Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl">
                                        {category.emoji}
                                    </span>
                                    <h2
                                        className="text-3xl md:text-4xl font-bold"
                                        style={{
                                            fontFamily:
                                                'europa, Helvetica Neue, Helvetica, sans-serif',
                                            color: '#000',
                                        }}
                                    >
                                        {category.name}
                                    </h2>
                                </div>
                                <Link
                                    href={`/category/${category.id}`}
                                    className="text-sm font-semibold hover:underline hidden md:block"
                                    style={{
                                        fontFamily:
                                            'europa, Helvetica Neue, Helvetica, sans-serif',
                                        color: '#318BEC',
                                    }}
                                >
                                    View All ({category.posts.length}) →
                                </Link>
                            </div>

                            {/* Articles Grid - show first 3 */}
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {category.posts
                                    .slice(0, 3)
                                    .map((post) => (
                                        <ArticleCard
                                            key={post.filePath}
                                            post={post}
                                        />
                                    ))}
                            </div>

                            {/* Mobile: View All Link */}
                            <div className="mt-6 text-center md:hidden">
                                <Link
                                    href={`/category/${category.id}`}
                                    className="inline-block text-sm font-semibold hover:underline"
                                    style={{
                                        fontFamily:
                                            'europa, Helvetica Neue, Helvetica, sans-serif',
                                        color: '#318BEC',
                                    }}
                                >
                                    View All {category.name} Articles (
                                    {category.posts.length}) →
                                </Link>
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mb-24 p-8 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3
                            className="text-2xl md:text-3xl font-bold mb-4"
                            style={{
                                fontFamily:
                                    'europa, Helvetica Neue, Helvetica, sans-serif',
                            }}
                        >
                            Get Weekly Insights
                        </h3>
                        <p
                            className="mb-6"
                            style={{
                                fontFamily:
                                    'minion-pro, Minion Pro, Georgia, Times, serif',
                                color: '#555',
                                fontSize: '1.1rem',
                            }}
                        >
                            Join my newsletter for clarity, tools, and
                            science-based ways to live better.
                        </p>
                        <button
                            className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                            style={{
                                fontFamily:
                                    'europa, Helvetica Neue, Helvetica, sans-serif',
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </main>

            <Footer copyrightText={globalData.footerText} />
            <GradientBackground
                variant="large"
                className="fixed top-20 opacity-40"
            />
        </Layout>
    );
}

// Article Card Component
function ArticleCard({ post }) {
    const slug = post.filePath.replace(/\.mdx?$/, '');

    return (
        <Link
            as={`/posts/${slug}`}
            href={`/posts/[slug]`}
            className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all bg-white"
        >
            {/* Icon Area */}
            <div
                className="h-48 flex items-center justify-center"
                style={{
                    background:
                        'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                }}
            >
                <span className="text-7xl opacity-80">
                    {post.data.emoji || '📝'}
                </span>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3
                    className="text-xl font-bold mb-3 group-hover:text-[#318BEC] transition-colors"
                    style={{
                        fontFamily:
                            'europa, Helvetica Neue, Helvetica, sans-serif',
                        color: '#000',
                        lineHeight: 1.3,
                    }}
                >
                    {post.data.title}
                </h3>

                {post.data.description && (
                    <p
                        className="text-sm line-clamp-3 mb-4"
                        style={{
                            fontFamily:
                                'minion-pro, Minion Pro, Georgia, Times, serif',
                            color: '#555',
                            lineHeight: 1.6,
                        }}
                    >
                        {post.data.description}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <span
                        className="text-xs uppercase tracking-wider"
                        style={{
                            fontFamily:
                                'europa, Helvetica Neue, Helvetica, sans-serif',
                            color: '#999',
                        }}
                    >
                        Read Article →
                    </span>
                    {post.data.date && (
                        <span
                            className="text-xs"
                            style={{ color: '#999' }}
                        >
                            {post.data.date}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export function getStaticProps() {
    const posts = getPosts();
    const globalData = getGlobalData();

    return { props: { posts, globalData } };
}
