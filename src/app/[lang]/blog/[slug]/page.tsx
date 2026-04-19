import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/data/blog/posts'
import { BlogPostClient } from './BlogPostClient'

interface Props {
  params: { lang: string; slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const altLangs: Record<string, string> = {}
  for (const l of ['en','es','fr','pt','ar','de','hi','zh','sw','id','ru']) {
    altLangs[l] = `https://cartotv.com/${l}/blog/${params.slug}`
  }

  return {
    title: `${post.title} | CartoTV Blog`,
    description: post.description,
    alternates: {
      canonical: `https://cartotv.com/en/blog/${params.slug}`,
      languages: altLangs,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://cartotv.com/${params.lang}/blog/${params.slug}`,
    },
    twitter: { title: post.title, description: post.description },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'CartoTV', url: 'https://cartotv.com' },
    mainEntityOfPage: `https://cartotv.com/${params.lang}/blog/${post.slug}`,
    url: `https://cartotv.com/${params.lang}/blog/${post.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostClient lang={params.lang} post={post} />
    </>
  )
}
