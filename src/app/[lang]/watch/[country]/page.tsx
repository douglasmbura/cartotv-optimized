import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { countries } from '@/data/countries'
import { getCountryBySlug, getAllCountrySlugs } from '@/utils/countrySlug'
import { getCountrySEO } from '@/data/seo'
import { WatchCountryClient } from './WatchCountryClient'

interface Props {
  params: { lang: string; country: string }
}

export async function generateStaticParams() {
  return getAllCountrySlugs().map(slug => ({ country: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const countryData = getCountryBySlug(params.country)
  if (!countryData) return {}

  const title = `Watch ${countryData.name} TV Channels Free Online | CartoTV`
  const description = `Stream live TV channels from ${countryData.name} for free on CartoTV. Watch news, sports, entertainment and more from ${countryData.name}. No signup required.`

  const altLangs: Record<string, string> = {}
  for (const l of ['en','es','fr','pt','ar','de','hi','zh','sw','id','ru']) {
    altLangs[l] = `https://cartotv.com/${l}/watch/${params.country}`
  }

  return {
    title,
    description,
    alternates: { canonical: `https://cartotv.com/en/watch/${params.country}`, languages: altLangs },
    openGraph: {
      title,
      description,
      url: `https://cartotv.com/${params.lang}/watch/${params.country}`,
      images: [{ url: countryData.flag, alt: `${countryData.name} flag` }],
    },
    twitter: { title, description },
  }
}

export default function WatchCountryPage({ params }: Props) {
  const countryData = getCountryBySlug(params.country)
  if (!countryData) notFound()

  const seoContent = getCountrySEO(countryData.name)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Watch Free Live TV from ${countryData.name}`,
    description: `Stream free live TV channels from ${countryData.name} on CartoTV`,
    url: `https://cartotv.com/en/watch/${params.country}`,
    image: countryData.flag,
    provider: { '@type': 'Organization', name: 'CartoTV', url: 'https://cartotv.com' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cartotv.com/en' },
        { '@type': 'ListItem', position: 2, name: 'Watch', item: 'https://cartotv.com/en/watch' },
        { '@type': 'ListItem', position: 3, name: countryData.name, item: `https://cartotv.com/en/watch/${params.country}` },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Crawler-visible rich text content */}
      <noscript>
        <article style={{ maxWidth: 960, margin: '0 auto', padding: '2rem', color: '#e0e0e0', background: '#0a0a1a' }}>
          <h1>Watch {countryData.name} TV Channels – Free Live Stream</h1>
          <p>Stream free live TV channels from {countryData.name} on CartoTV. No registration required.</p>
          {seoContent && <div dangerouslySetInnerHTML={{ __html: seoContent }} />}
        </article>
      </noscript>

      <WatchCountryClient lang={params.lang} countrySlug={params.country} seoContent={seoContent} />
    </>
  )
}
