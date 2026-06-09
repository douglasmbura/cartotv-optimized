import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

type Props = {
  params: { lang: Locale }
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Browse Countries | CartoTV`,
    description: 'Select a country to watch live TV channels',
  }
}

export default function WatchPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Browse Countries</h1>
      <p className="text-slate-300">Language: {params.lang}</p>
      <p className="mt-4 text-slate-400">Country list will be dynamically loaded here</p>
    </div>
  )
}
