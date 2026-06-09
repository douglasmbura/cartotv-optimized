import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

type Props = {
  params: { lang: Locale }
}

export function generateMetadata({ params }: Props): Metadata {
  const titles: Record<Locale, string> = {
    en: 'Blog | CartoTV - Latest News & Updates',
    es: 'Blog | CartoTV - Últimas Noticias y Actualizaciones',
    fr: 'Blog | CartoTV - Dernières Actualités et Mises à Jour',
    de: 'Blog | CartoTV - Neueste Nachrichten und Updates',
    pt: 'Blog | CartoTV - Últimas Notícias e Atualizações',
    ar: 'المدونة | CartoTV - أحدث الأخبار والتحديثات',
    zh: '博客 | CartoTV - 最新新闻和更新',
    hi: 'ब्लॉग | CartoTV - नवीनतम समाचार और अपडेट',
    sw: 'Blogi | CartoTV - Habari na Sasisho za Hivi Karibuni',
    id: 'Blog | CartoTV - Berita dan Pembaruan Terbaru',
    ru: 'Блог | CartoTV - Последние Новости и Обновления',
  }

  const descriptions: Record<Locale, string> = {
    en: 'Stay updated with the latest news, tutorials, and insights about streaming TV worldwide',
    es: 'Mantente actualizado con las últimas noticias, tutoriales e información sobre transmisión de TV en todo el mundo',
    fr: 'Restez à jour avec les dernières actualités, tutoriels et informations sur la diffusion de TV dans le monde',
    de: 'Bleiben Sie mit den neuesten Nachrichten, Tutorials und Informationen zum Streamen von TV weltweit auf dem Laufenden',
    pt: 'Mantenha-se atualizado com as últimas notícias, tutoriais e informações sobre streaming de TV em todo o mundo',
    ar: 'ابق مطلعًا على أحدث الأخبار والدروس والمعلومات حول بث التلفزيون في جميع أنحاء العالم',
    zh: '了解有关全球电视流媒体的最新新闻、教程和见解',
    hi: 'दुनिया भर में टीवी स्ट्रीमिंग के बारे में नवीनतम समाचार, ट्यूटोरियल और अंतर्दृष्टि से अपडेट रहें',
    sw: 'Endelea na habari za hivi karibuni, mafunzo na maarifa kuhusu uenezi wa TV kote ulimwenguni',
    id: 'Tetap update dengan berita terbaru, tutorial, dan wawasan tentang streaming TV di seluruh dunia',
    ru: 'Оставайтесь в курсе последних новостей, учебных материалов и информации о потоковом телевидении по всему миру',
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

export default function BlogPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">CartoTV Blog</h1>
        <p className="text-slate-300 mb-8">Latest news, tutorials, and insights about streaming TV worldwide</p>
        <p className="text-slate-400">Language: {params.lang}</p>
        <div className="mt-12 space-y-8">
          <p className="text-slate-400">Blog posts will be dynamically loaded here</p>
        </div>
      </div>
    </div>
  )
}
