import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

type Props = {
  params: { lang: Locale; slug: string }
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `${params.slug.replace(/-/g, ' ')} | CartoTV Blog`,
    description: `Read the latest article on CartoTV about ${params.slug.replace(/-/g, ' ')}`,
  }
}

export default function BlogPostPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{params.slug.replace(/-/g, ' ')}</h1>
        <p className="text-slate-400 mb-8">Language: {params.lang}</p>
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300">Blog post content will be rendered here</p>
        </div>
      </article>
    </div>
  )
}
