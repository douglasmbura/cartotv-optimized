import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

type Props = {
  params: { lang: Locale; country: string; channel: string }
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Watch ${params.channel} | CartoTV`,
    description: `Stream ${params.channel} live from ${params.country.replace(/-/g, ' ')}`,
  }
}

export default function ChannelPlayerPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Now Playing: {params.channel.replace(/-/g, ' ')}</h1>
      <p className="text-slate-300">Country: {params.country.replace(/-/g, ' ')}</p>
      <p className="text-slate-300">Language: {params.lang}</p>
      <div className="mt-8 bg-slate-800 aspect-video rounded-lg flex items-center justify-center">
        <p className="text-slate-400">Video player will be rendered here</p>
      </div>
    </div>
  )
}
