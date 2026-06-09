import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

type Props = {
  params: { lang: Locale }
}

export function generateMetadata({ params }: Props): Metadata {
  const titles: Record<Locale, string> = {
    en: 'About Us | CartoTV - Watch Global Television',
    es: 'Acerca de Nosotros | CartoTV - Ver Televisión Global',
    fr: 'À Propos de Nous | CartoTV - Regarder la Télévision Mondiale',
    de: 'Über Uns | CartoTV - Globales Fernsehen Schauen',
    pt: 'Sobre Nós | CartoTV - Assistir Televisão Global',
    ar: 'من نحن | CartoTV - مشاهدة التلفزيون العالمي',
    zh: '关于我们 | CartoTV - 观看全球电视',
    hi: 'हमारे बारे में | CartoTV - वैश्विक टेलीविजन देखें',
    sw: 'Kuhusu Sisi | CartoTV - Tazama Televisheni ya Ulimwengu',
    id: 'Tentang Kami | CartoTV - Tonton Televisi Global',
    ru: 'О Нас | CartoTV - Смотрите Глобальное Телевидение',
  }

  const descriptions: Record<Locale, string> = {
    en: 'Learn about CartoTV mission to bring global television to everyone. Discover our story, values, and commitment to streaming excellence.',
    es: 'Conozca la misión de CartoTV de llevar la televisión global a todos. Descubre nuestra historia, valores y compromiso con la excelencia en streaming.',
    fr: 'En savoir plus sur la mission de CartoTV d\'apporter la télévision mondiale à tous. Découvrez notre histoire, nos valeurs et notre engagement envers l\'excellence du streaming.',
    de: 'Erfahren Sie mehr über CaroTVs Mission, globales Fernsehen für alle bereitzustellen. Entdecken Sie unsere Geschichte, Werte und unser Engagement für Streaming-Exzellenz.',
    pt: 'Saiba mais sobre a missão da CartoTV de levar televisão global para todos. Descubra nossa história, valores e compromisso com a excelência em streaming.',
    ar: 'تعرف على مهمة CartoTV لنقل التلفزيون العالمي للجميع. اكتشف قصتنا وقيمنا والتزامنا بتميز البث المباشر.',
    zh: '了解 CartoTV 为每个人提供全球电视的使命。发现我们的故事、价值观和对流媒体卓越的承诺。',
    hi: 'CartoTV के वैश्विक टेलीविजन को सभी के लिए लाने के मिशन के बारे में जानें। हमारी कहानी, मूल्यों और स्ट्रीमिंग उत्कृष्टता के प्रति हमारी प्रतिबद्धता खोजें।',
    sw: 'Jifunze kuhusu dhamira ya CartoTV ya kuleta televisheni ya ulimwengu kwa kila mtu. Gundua hadithi yetu, maadili na mahitaji yetu ya kufanya kazi ya utukufu wa kupiga kelele.',
    id: 'Pelajari tentang misi CartoTV untuk membawa televisi global kepada semua orang. Temukan cerita kami, nilai-nilai, dan komitmen kami terhadap keunggulan streaming.',
    ru: 'Узнайте о миссии CartoTV по предоставлению глобального телевидения всем. Откройте для себя нашу историю, ценности и обязательство перед совершенством потокового вещания.',
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

export default function AboutPage({ params }: Props) {
  const content: Record<Locale, { heading: string; mission: string; vision: string; values: string[] }> = {
    en: {
      heading: 'About CartoTV',
      mission: 'Our mission is to democratize access to global television content and make quality entertainment available to everyone, everywhere.',
      vision: 'We envision a world where geographical boundaries do not limit access to world-class television programming.',
      values: ['Accessibility', 'Quality', 'Innovation', 'Inclusivity', 'Excellence'],
    },
    es: {
      heading: 'Acerca de CartoTV',
      mission: 'Nuestra misión es democratizar el acceso al contenido de televisión global y hacer que el entretenimiento de calidad esté disponible para todos, en todas partes.',
      vision: 'Imaginamos un mundo donde los límites geográficos no limiten el acceso a la programación televisiva de clase mundial.',
      values: ['Accesibilidad', 'Calidad', 'Innovación', 'Inclusividad', 'Excelencia'],
    },
    fr: {
      heading: 'À Propos de CartoTV',
      mission: 'Notre mission est de démocratiser l\'accès au contenu télévisé mondial et de rendre les divertissements de qualité accessibles à tous, partout.',
      vision: 'Nous envisageons un monde où les frontières géographiques ne limitent pas l\'accès à la programmation télévisée de classe mondiale.',
      values: ['Accessibilité', 'Qualité', 'Innovation', 'Inclusivité', 'Excellence'],
    },
    de: {
      heading: 'Über CartoTV',
      mission: 'Unsere Mission ist es, den Zugang zu globalen Fernsehlinhalten zu demokratisieren und hochwertige Unterhaltung für jeden überall verfügbar zu machen.',
      vision: 'Wir stellen uns eine Welt vor, in der geografische Grenzen den Zugang zu erstklassigen Fernsehprogrammen nicht einschränken.',
      values: ['Barrierefreiheit', 'Qualität', 'Innovation', 'Inklusivität', 'Exzellenz'],
    },
    pt: {
      heading: 'Sobre CartoTV',
      mission: 'Nossa missão é democratizar o acesso ao conteúdo de televisão global e tornar o entretenimento de qualidade disponível para todos, em todos os lugares.',
      vision: 'Imaginamos um mundo onde os limites geográficos não limitam o acesso à programação televisiva de classe mundial.',
      values: ['Acessibilidade', 'Qualidade', 'Inovação', 'Inclusividade', 'Excelência'],
    },
    ar: {
      heading: 'حول CartoTV',
      mission: 'مهمتنا هي ديمقراطية الوصول إلى محتوى التلفزيون العالمي وجعل الترفيه عالي الجودة متاحًا للجميع في كل مكان.',
      vision: 'نتخيل عالماً لا تقيد فيه الحدود الجغرافية الوصول إلى برامج تلفزيونية عالمية الجودة.',
      values: ['إمكانية الوصول', 'الجودة', 'الابتكار', 'الشمول', 'التميز'],
    },
    zh: {
      heading: '关于 CartoTV',
      mission: '我们的使命是民主化全球电视内容的获取，使优质娱乐内容对所有人随处可得。',
      vision: '我们设想一个地理边界不限制获取世界一流电视节目的世界。',
      values: ['可访问性', '质量', '创新', '包容性', '卓越'],
    },
    hi: {
      heading: 'CartoTV के बारे में',
      mission: 'हमारा मिशन वैश्विक टेलीविजन सामग्री तक पहुंच को लोकतांत्रित करना और गुणवत्ता वाले मनोरंजन को सभी के लिए हर जगह उपलब्ध करना है।',
      vision: 'हम एक ऐसी दुनिया की कल्पना करते हैं जहां भौगोलिक सीमाएं विश्व स्तरीय टेलीविजन प्रोग्रामिंग तक पहुंच को सीमित न करें।',
      values: ['पहुंच', 'गुणवत्ता', 'नवाचार', 'समावेशिता', 'उत्कृष्टता'],
    },
    sw: {
      heading: 'Kuhusu CartoTV',
      mission: 'Dhamira yetu ni kuongeza haki za kufikia maudhui ya televisheni ya dunia na kufanya kazi ya kupiga kelele ya juu ifikiwe kwa kila mtu, popote.',
      vision: 'Tunafikiri ulimwengu ambapo mipaka ya kijiografia hailimiti kufikia programu za televisheni ya kidunia.',
      values: ['Upatikanaji', 'Ubora', 'Uvumbuzi', 'Ujumla', 'Tahira'],
    },
    id: {
      heading: 'Tentang CartoTV',
      mission: 'Misi kami adalah mendemokratisasi akses ke konten televisi global dan membuat hiburan berkualitas tersedia untuk semua orang, di mana saja.',
      vision: 'Kami membayangkan dunia di mana batas-batas geografis tidak membatasi akses ke pemrograman televisi kelas dunia.',
      values: ['Aksesibilitas', 'Kualitas', 'Inovasi', 'Inklusivitas', 'Keunggulan'],
    },
    ru: {
      heading: 'О CartoTV',
      mission: 'Наша миссия - демократизировать доступ к глобальному телевизионному контенту и сделать качественные развлечения доступными для всех, везде.',
      vision: 'Мы представляем мир, в котором географические границы не ограничивают доступ к телевизионным программам мирового класса.',
      values: ['Доступность', 'Качество', 'Инновация', 'Инклюзивность', 'Совершенство'],
    },
  }

  const page = content[params.lang] || content.en

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{page.heading}</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed">{page.mission}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-slate-300 leading-relaxed">{page.vision}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {page.values.map((value) => (
              <div key={value} className="bg-slate-800 p-4 rounded-lg text-center">
                <p className="text-slate-200">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-slate-400">Language: {params.lang}</p>
        </section>
      </div>
    </div>
  )
}
