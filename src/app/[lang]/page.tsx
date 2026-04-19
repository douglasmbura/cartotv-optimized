import type { Metadata } from 'next'
import { countries } from '@/data/countries'
import { HomeClient } from './HomeClient'

const LANGS = ['en','es','fr','pt','ar','de','hi','zh','sw','id','ru'] as const
type Lang = typeof LANGS[number]

const TITLES: Record<Lang, string> = {
  en: 'CartoTV – Free Online Live TV Channels from Around the World',
  es: 'CartoTV – Canales de TV en Vivo Gratis de Todo el Mundo',
  fr: 'CartoTV – Chaînes TV en Direct Gratuites du Monde Entier',
  de: 'CartoTV – Kostenlose Live-TV-Kanäle aus aller Welt',
  pt: 'CartoTV – Canais de TV ao Vivo Gratuitos do Mundo Todo',
  ar: 'CartoTV – قنوات تلفزيون مباشر مجانية من حول العالم',
  zh: 'CartoTV – 全球免费直播电视频道',
  hi: 'CartoTV – दुनिया भर से मुफ्त लाइव टीवी चैनल',
  sw: 'CartoTV – Njia za Televisheni za Bure Kutoka Duniani Kote',
  id: 'CartoTV – Saluran TV Langsung Gratis dari Seluruh Dunia',
  ru: 'CartoTV – Бесплатные прямые телеканалы со всего мира',
}

const DESCS: Record<Lang, string> = {
  en: 'Watch live TV channels from around the world with CartoTV. Stream news, sports, movies, kids and entertainment channels online by country — No sign-up required.',
  es: 'Mira canales de TV en vivo de todo el mundo con CartoTV. Transmite noticias, deportes, películas y entretenimiento por país. Sin registro.',
  fr: 'Regardez des chaînes TV en direct du monde entier avec CartoTV. Actualités, sport, films, divertissement par pays — Sans inscription.',
  de: 'Schauen Sie Live-TV-Kanäle aus aller Welt mit CartoTV. Nachrichten, Sport, Filme, Unterhaltung nach Land — Keine Registrierung.',
  pt: 'Assista canais de TV ao vivo de todo o mundo com CartoTV. Notícias, esportes, filmes, entretenimento por país — Sem cadastro.',
  ar: 'شاهد القنوات التلفزيونية المباشرة من حول العالم مع CartoTV. أخبار ورياضة وأفلام وترفيه حسب البلد — بدون تسجيل.',
  zh: '使用CartoTV观看来自世界各地的直播电视频道。按国家/地区在线直播新闻、体育、电影、娱乐节目 — 无需注册。',
  hi: 'CartoTV के साथ दुनिया भर से लाइव टीवी चैनल देखें। देश के अनुसार समाचार, खेल, फिल्में, मनोरंजन — साइन-अप की आवश्यकता नहीं।',
  sw: 'Tazama vituo vya TV moja kwa moja kutoka duniani kote na CartoTV. Habari, michezo, filamu, burudani kwa nchi — Bila usajili.',
  id: 'Tonton saluran TV langsung dari seluruh dunia dengan CartoTV. Berita, olahraga, film, hiburan per negara — Tanpa pendaftaran.',
  ru: 'Смотрите прямые телеканалы со всего мира на CartoTV. Новости, спорт, кино, развлечения по странам — Без регистрации.',
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = (LANGS.includes(params.lang as Lang) ? params.lang : 'en') as Lang
  const altLangs: Record<string, string> = {}
  for (const l of LANGS) altLangs[l] = `https://cartotv.com/${l}`

  return {
    title: TITLES[lang],
    description: DESCS[lang],
    alternates: { canonical: `https://cartotv.com/${lang}`, languages: altLangs },
    openGraph: {
      title: TITLES[lang],
      description: DESCS[lang],
      url: `https://cartotv.com/${lang}`,
      images: [{ url: 'https://cartotv.com/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { title: TITLES[lang], description: DESCS[lang] },
  }
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang

  // JSON-LD structured data — rendered server-side for SEO
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'CartoTV',
      url: 'https://cartotv.com',
      description: 'Watch free live world TV from anywhere. No account, no signup. 10,000+ channels from 179 countries.',
      applicationCategory: 'Entertainment',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      inLanguage: LANGS,
      sameAs: ['https://x.com/CartoTv1', 'https://www.facebook.com/cartotv1'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CartoTV',
      url: 'https://cartotv.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://cartotv.com/en/watch?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is CartoTV free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no registration required.' } },
        { '@type': 'Question', name: 'How many channels are available?', acceptedAnswer: { '@type': 'Answer', text: 'Over 10,000 live TV channels from 179 countries.' } },
        { '@type': 'Question', name: 'Do I need an account?', acceptedAnswer: { '@type': 'Answer', text: 'No account or registration is needed. Just visit and watch instantly.' } },
        { '@type': 'Question', name: 'What types of channels are available?', acceptedAnswer: { '@type': 'Answer', text: 'News, Sports, Entertainment, Movies, Kids, Music, Documentary and more from every continent.' } },
      ],
    },
  ]

  return (
    <>
      {/* Server-rendered JSON-LD for Google */}
      {jsonLd.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}

      {/* Server-rendered semantic content for crawlers that don't run JS */}
      <noscript>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem', fontFamily: 'system-ui', color: '#e0e0e0', background: '#0a0a1a' }}>
          <h1>CartoTV – Watch Free Live TV Channels Worldwide</h1>
          <p>Stream 10,000+ live TV channels from 179 countries. No registration required.</p>
          <h2>Browse by Country</h2>
          <ul>
            {countries.slice(0, 30).map(c => (
              <li key={c.name}><a href={`/${lang}/watch/${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{c.name} TV channels</a></li>
            ))}
          </ul>
          <h2>Categories</h2>
          <ul>
            {['News','Sports','Entertainment','Kids','Music','Documentary'].map(cat => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </div>
      </noscript>

      {/* Client-side interactive globe */}
      <HomeClient lang={lang} />
    </>
  )
}
