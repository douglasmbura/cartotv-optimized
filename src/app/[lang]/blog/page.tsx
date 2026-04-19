import type { Metadata } from 'next'
import { getAllPosts } from '@/data/blog/posts'
import { BlogClient } from './BlogClient'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Blog – Free Live TV Streaming Tips & Guides | CartoTV',
    description: 'Discover the best free TV channels from around the world. Tips, guides, and country-by-country reviews to help you find great free television online.',
    alternates: { canonical: `https://cartotv.com/${params.lang}/blog` },
    openGraph: {
      title: 'CartoTV Blog – Free Live TV Guides',
      description: 'Tips and guides for watching free live TV from every country.',
      url: `https://cartotv.com/${params.lang}/blog`,
    },
  }
}

export default function BlogPage({ params }: { params: { lang: string } }) {
  const posts = getAllPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CartoTV Blog',
    description: 'Free live TV guides and tips from CartoTV',
    url: `https://cartotv.com/${params.lang}/blog`,
    publisher: { '@type': 'Organization', name: 'CartoTV', url: 'https://cartotv.com' },
    blogPost: posts.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `https://cartotv.com/${params.lang}/blog/${p.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Crawler-visible links to all posts */}
      <noscript>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
          <h1>CartoTV Blog</h1>
          <ul>
            {posts.map(p => (
              <li key={p.slug}><a href={`/${params.lang}/blog/${p.slug}`}>{p.title}</a></li>
            ))}
          </ul>
        </div>
      </noscript>
      <BlogClient lang={params.lang} />
    </>
  )
}
