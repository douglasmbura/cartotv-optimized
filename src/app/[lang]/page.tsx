import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

type Props = {
  params: { lang: Locale }
}

export function generateMetadata({ params }: Props): Metadata {
  const titles: Record<Locale, string> = {
    en: 'Watch Live TV from Around the World | CartoTV',
    es: 'Ver TV en Vivo de Todo el Mundo | CartoTV',
    fr: 'Regarder la TV en Direct du Monde Entier | CartoTV',
    de: 'Schaue Live-Fernsehen aus der ganzen Welt | CartoTV',
    pt: 'Assista TV ao Vivo de todo o Mundo | CartoTV',
    ar: 'شاهد التلفزيون المباشر من جميع أنحاء العالم | CartoTV',
    zh: '观看来自世界各地的实时电视 | CartoTV',
    hi: 'दुनिया भर से लाइव टीवी देखें | CartoTV',
    sw: 'Tazama TV Moja kwa Moja kutoka Kila Mahali Ulimwenguni | CartoTV',
    id: 'Tonton TV Langsung dari Seluruh Dunia | CartoTV',
    ru: 'Смотрите прямое телевидение со всего мира | CartoTV',
  }

  const descriptions: Record<Locale, string> = {
    en: 'Stream 8,000+ live TV channels from 180+ countries in 11 languages. Free, unlimited, crystal-clear HD quality.',
    es: 'Transmite más de 8,000 canales de TV en vivo de 180+ países. Gratis, ilimitado, calidad HD cristalina.',
    fr: 'Diffusez plus de 8 000 chaînes de télévision en direct de 180+ pays. Gratuit, illimité, qualité HD cristalline.',
    de: 'Streamen Sie über 8.000 Live-TV-Kanäle aus 180+ Ländern. Kostenlos, unbegrenzt, kristallklare HD-Qualität.',
    pt: 'Transmita mais de 8.000 canais de TV ao vivo de 180+ países. Grátis, ilimitado, qualidade HD cristalina.',
    ar: 'بث أكثر من 8000 قناة تلفزيون مباشرة من 180+ دول. مجاني وغير محدود وجودة HD بلورية.',
    zh: '从180多个国家播放8000多个直播电视频道。免费、无限制、水晶般清晰的高清质量。',
    hi: '180+ देशों से 8000+ लाइव टीवी चैनल स्ट्रीम करें। मुफ्त, असीमित, क्रिस्टल-क्लियर एचडी गुणवत्ता।',
    sw: 'Weza zaidi ya 8,000 chaneli za TV moja kwa moja kutoka 180+ nchi. Bila malipo, kwa kiasi kikubwa, ubora wa HD safi safi.',
    id: 'Stream 8000+ saluran TV langsung dari 180+ negara. Gratis, tidak terbatas, kualitas HD jernih.',
    ru: 'Потоковое вещание более 8000 каналов прямого телевидения из 180+ стран. Бесплатно, без ограничений, хрустально чистое качество HD.',
  }

  return {
    title: titles[params.lang],
    description: descriptions[params.lang],
    openGraph: {
      title: titles[params.lang],
      description: descriptions[params.lang],
      type: 'website',
      locale: params.lang === 'ar' ? 'ar_SA' : `${params.lang}_${params.lang.toUpperCase()}`,
    },
  }
}

export default function HomePage({ params }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">CartoTV</h1>
        <p className="text-xl text-slate-300">Watch Live TV from Around the World</p>
        <p className="text-slate-400">Language: {params.lang}</p>
        <div className="mt-8 space-x-4">
          <a
            href={`/${params.lang}/watch`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse Channels
          </a>
          <a
            href={`/${params.lang}/who-we-are`}
            className="inline-block px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
          >
            About Us
          </a>
        </div>
      </div>
    </div>
  )
}
