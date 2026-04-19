'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react'
import { SideMenu } from '@/components/UI/SideMenu'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  author: string
  readingTime: number
  content: string
  tags: string[]
}

interface Props {
  lang: string
  post: Post
}

export function BlogPostClient({ lang, post }: Props) {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SideMenu />
      <article className="max-w-3xl mx-auto px-4 py-20">
        <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />Back to Blog
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readingTime} min read</span>
          </div>
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-foreground prose-headings:font-semibold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-ul:my-4 prose-ol:my-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground">
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-border">
          <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />Back to Blog
          </Link>
        </div>
      </article>
    </div>
  )
}
