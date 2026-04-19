import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCountryBySlug } from '@/utils/countrySlug'
import {
  getAllChannelParams,
  getChannelFromManifest,
  getCountryChannelsFromManifest,
  toChannelSlugManifest,
} from '@/lib/channelManifest'
import { getCountrySEO } from '@/data/seo'
import { WatchChannelClient } from './WatchChannelClient'

const LANGS = ['en','es','fr','pt','ar','de','hi','zh','sw','id','ru'] as const

interface Props {
  params: { lang: string; country: string; channel: string }
}

// ─── Static generation: all channels × all languages ────────────────────────
export async function generateStaticParams() {
  const channelParams = getAllChannelParams()
  const result: { lang: string; country: string; channel: string }[] = []
  for (const { country, channel } of channelParams) {
    for (const lang of LANGS) {
      result.push({ lang, country, channel })
    }
  }
  return result
}

// ─── SSR Metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const countryData = getCountryBySlug(params.country)
  const channelInfo = getChannelFromManifest(params.country, params.channel)

  const channelName = channelInfo?.name
    ?? params.channel.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const countryName = countryData?.name
    ?? channelInfo?.countryName
    ?? params.country.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const title = `Watch ${channelName} Live Stream Free | CartoTV`
  const description = `Stream ${channelName} from ${countryName} live and free on CartoTV. Watch ${channelName} online — no registration, no subscription, works on any device.`

  const altLangs: Record<string, string> = {}
  for (const l of LANGS) {
    altLangs[l] = `https://cartotv.com/${l}/watch/${params.country}/${params.channel}`
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://cartotv.com/en/watch/${params.country}/${params.channel}`,
      languages: altLangs,
    },
    openGraph: {
      title,
      description,
      url: `https://cartotv.com/${params.lang}/watch/${params.country}/${params.channel}`,
      images: countryData?.flag ? [{ url: countryData.flag, alt: `${countryName} flag` }] : [],
    },
    twitter: { title, description },
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function WatchChannelPage({ params }: Props) {
  const countryData = getCountryBySlug(params.country)
  const channelInfo = getChannelFromManifest(params.country, params.channel)

  // Resolve display names — fall back to deslugified param if manifest missing
  const channelName = channelInfo?.name
    ?? params.channel.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const countryName = countryData?.name ?? channelInfo?.countryName
    ?? params.country.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  if (!countryData && !channelInfo) notFound()

  // Related channels from manifest (same country, first 12)
  const manifestChannels = getCountryChannelsFromManifest(params.country)
  const relatedFromManifest = manifestChannels
    .filter(ch => ch.slug !== params.channel)
    .slice(0, 12)

  // Country SEO blurb
  const countrySEO = countryData ? getCountrySEO(countryName) : undefined

  // JSON-LD — BroadcastService + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BroadcastService',
    name: channelName,
    description: `Watch ${channelName} live for free from ${countryName} on CartoTV`,
    url: `https://cartotv.com/en/watch/${params.country}/${params.channel}`,
    broadcastDisplayName: channelName,
    provider: { '@type': 'Organization', name: 'CartoTV', url: 'https://cartotv.com' },
    areaServed: { '@type': 'Country', name: countryName },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',      item: `https://cartotv.com/${params.lang}` },
      { '@type': 'ListItem', position: 2, name: 'Watch',     item: `https://cartotv.com/${params.lang}/watch` },
      { '@type': 'ListItem', position: 3, name: countryName, item: `https://cartotv.com/${params.lang}/watch/${params.country}` },
      { '@type': 'ListItem', position: 4, name: channelName, item: `https://cartotv.com/${params.lang}/watch/${params.country}/${params.channel}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Fully crawler-visible semantic HTML — no JS needed to read this */}
      <noscript>
        <article style={{ maxWidth: 960, margin: '0 auto', padding: '2rem', color: '#e0e0e0', background: '#0a0a1a' }}>
          <nav>
            <a href={`/${params.lang}`}>Home</a> {'>'}{' '}
            <a href={`/${params.lang}/watch`}>Watch</a> {'>'}{' '}
            <a href={`/${params.lang}/watch/${params.country}`}>{countryName}</a> {'>'}{' '}
            {channelName}
          </nav>
          <h1>Watch {channelName} Live — Free Stream from {countryName}</h1>
          <p>
            {channelName} is a live TV channel from {countryName}. Stream {channelName} online for free
            on CartoTV — no registration, no subscription, no downloads required.
          </p>
          <h2>About {channelName}</h2>
          <p>
            Watch {channelName} from {countryName} live on any device. CartoTV provides free access
            to thousands of channels from {countryName} and 178 other countries worldwide.
          </p>
          <h2>How to Watch {channelName} Free</h2>
          <ol>
            <li>Enable JavaScript to start streaming instantly</li>
            <li>No account or registration required</li>
            <li>Works on desktop, tablet, and mobile</li>
          </ol>
          {relatedFromManifest.length > 0 && (
            <>
              <h2>More channels from {countryName}</h2>
              <ul>
                {relatedFromManifest.map(ch => (
                  <li key={ch.slug}>
                    <a href={`/${params.lang}/watch/${params.country}/${ch.slug}`}>{ch.name}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {countrySEO && <div dangerouslySetInnerHTML={{ __html: countrySEO }} />}
        </article>
      </noscript>

      <WatchChannelClient
        lang={params.lang}
        countrySlug={params.country}
        channelSlug={params.channel}
        resolvedChannelName={channelName}
        resolvedCountryName={countryName}
        relatedFromManifest={relatedFromManifest}
      />
    </>
  )
}
