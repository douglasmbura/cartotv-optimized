import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

type Props = {
  params: { lang: Locale; country: string }
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `${params.country.replace(/-/g, ' ')} Channels | CartoTV`,
    description: `Watch live TV channels from ${params.country.replace(/-/g, ' ')}`,
  }
}

export default function CountryPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Channels from {params.country.replace(/-/g, ' ')}</h1>
      <p className="text-slate-300">Language: {params.lang}</p>
      <p className="mt-4 text-slate-400">Channels will be dynamically loaded here</p>
    </div>
  )
}
