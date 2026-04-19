'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { getAllPosts } from '@/data/blog/posts'
import { SideMenu } from '@/components/UI/SideMenu'

export function BlogClient({ lang }: { lang: string }) {
  const { t } = useTranslation()
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SideMenu />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t('common.backToGlobe')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">Guides, tips, and reviews to help you discover the best free TV channels worldwide.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map(post => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}
              className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingTime} min read
                </span>
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{post.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                    <Tag className="w-2.5 h-2.5" />{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
