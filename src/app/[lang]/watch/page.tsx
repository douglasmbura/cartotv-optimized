import type { Metadata } from 'next'
import { countries } from '@/data/countries'
import { WatchClient } from './WatchClient'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Watch Free Live TV Online – All Countries',
    description: `Browse ${countries.length} countries and watch free live TV channels online on CartoTV. Select a country to start streaming instantly. No signup required.`,
    alternates: { canonical: `https://cartotv.com/${params.lang}/watch` },
    openGraph: {
      title: 'Watch Free Live TV Online – All Countries | CartoTV',
      description: `Browse ${countries.length} countries and watch free live TV channels.`,
      url: `https://cartotv.com/${params.lang}/watch`,
    },
  }
}

export default function WatchPage({ params }: { params: { lang: string } }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Watch Free Live TV – All Countries',
    description: `Browse ${countries.length} countries and stream free live TV.`,
    url: `https://cartotv.com/${params.lang}/watch`,
    provider: { '@type': 'Organization', name: 'CartoTV', url: 'https://cartotv.com' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Crawler-visible country links — crawlers index these even without JS */}
      <noscript>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
          <h1>Watch Free Live TV – All Countries</h1>
          <ul>
            {countries.map(c => {
              const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return <li key={c.name}><a href={`/${params.lang}/watch/${slug}`}>Watch {c.name} TV Channels</a></li>
            })}
          </ul>
        </div>
      </noscript>
      <WatchClient lang={params.lang} />
    </>
  )
}
