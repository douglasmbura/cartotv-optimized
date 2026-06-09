import { Metadata } from 'next'
import type { Locale } from '@/types/i18n'

type Props = {
  params: { lang: Locale }
}

export function generateMetadata({ params }: Props): Metadata {
  const titles: Record<Locale, string> = {
    en: 'Contact Us | CartoTV - Get in Touch',
    es: 'Contáctenos | CartoTV - Ponte en Contacto',
    fr: 'Nous Contacter | CartoTV - Nous Joindre',
    de: 'Kontaktieren Sie Uns | CartoTV - Nehmen Sie Kontakt Auf',
    pt: 'Fale Conosco | CartoTV - Entre em Contato',
    ar: 'اتصل بنا | CartoTV - تواصل معنا',
    zh: '联系我们 | CartoTV - 取得联系',
    hi: 'हमसे संपर्क करें | CartoTV - संपर्क में रहें',
    sw: 'Wasiliana Nasi | CartoTV - Kuwasiliana',
    id: 'Hubungi Kami | CartoTV - Hubungi Kami',
    ru: 'Свяжитесь с Нами | CartoTV - Контакты',
  }

  const descriptions: Record<Locale, string> = {
    en: 'Have questions or feedback? Get in touch with the CartoTV team. We\'d love to hear from you!',
    es: '¿Tienes preguntas o comentarios? Ponte en contacto con el equipo de CartoTV. ¡Nos encantaría saber de ti!',
    fr: 'Avez-vous des questions ou des commentaires? Contactez l\'équipe CartoTV. Nous aimerions vous entendre!',
    de: 'Haben Sie Fragen oder Feedback? Kontaktieren Sie das CartoTV-Team. Wir würden gerne von Ihnen hören!',
    pt: 'Tem perguntas ou comentários? Entre em contato com a equipe CartoTV. Gostaríamos de ouvir você!',
    ar: 'هل لديك أسئلة أو ملاحظات؟ تواصل مع فريق CartoTV. نود أن نسمع منك!',
    zh: '有问题或反馈？与 CartoTV 团队联系。我们很乐意听到您的消息！',
    hi: 'क्या आपके पास कोई प्रश्न या प्रतिक्रिया है? CartoTV टीम से संपर्क करें। हम आपसे सुनना पसंद करेंगे!',
    sw: 'Je una maswali au maoni? Wasiliana na timu ya CartoTV. Tungependa kusikia kutoka kwako!',
    id: 'Punya pertanyaan atau umpan balik? Hubungi tim CartoTV. Kami ingin mendengar dari Anda!',
    ru: 'Есть вопросы или отзывы? Свяжитесь с командой CartoTV. Мы будем рады услышать от вас!',
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

export default function ContactPage({ params }: Props) {
  const content: Record<Locale, { 
    heading: string
    subtitle: string
    email_label: string
    phone_label: string
    address_label: string
    form_name: string
    form_email: string
    form_message: string
    form_submit: string
    hours_label: string
  }> = {
    en: {
      heading: 'Contact Us',
      subtitle: 'We\'d love to hear from you. Send us a message and we\'ll get back to you as soon as possible.',
      email_label: 'Email',
      phone_label: 'Phone',
      address_label: 'Address',
      form_name: 'Your Name',
      form_email: 'Your Email',
      form_message: 'Your Message',
      form_submit: 'Send Message',
      hours_label: 'Business Hours',
    },
    es: {
      heading: 'Contáctenos',
      subtitle: 'Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.',
      email_label: 'Correo Electrónico',
      phone_label: 'Teléfono',
      address_label: 'Dirección',
      form_name: 'Tu Nombre',
      form_email: 'Tu Correo Electrónico',
      form_message: 'Tu Mensaje',
      form_submit: 'Enviar Mensaje',
      hours_label: 'Horario de Atención',
    },
    fr: {
      heading: 'Nous Contacter',
      subtitle: 'Nous aimerions vous entendre. Envoyez-nous un message et nous vous répondrons dès que possible.',
      email_label: 'E-mail',
      phone_label: 'Téléphone',
      address_label: 'Adresse',
      form_name: 'Votre Nom',
      form_email: 'Votre E-mail',
      form_message: 'Votre Message',
      form_submit: 'Envoyer le Message',
      hours_label: 'Heures de Bureau',
    },
    de: {
      heading: 'Kontaktieren Sie Uns',
      subtitle: 'Wir würden gerne von Ihnen hören. Senden Sie uns eine Nachricht und wir antworten Ihnen so bald wie möglich.',
      email_label: 'E-Mail',
      phone_label: 'Telefon',
      address_label: 'Adresse',
      form_name: 'Ihr Name',
      form_email: 'Ihre E-Mail',
      form_message: 'Ihre Nachricht',
      form_submit: 'Nachricht Senden',
      hours_label: 'Geschäftszeiten',
    },
    pt: {
      heading: 'Fale Conosco',
      subtitle: 'Gostaríamos de ouvir você. Envie-nos uma mensagem e entraremos em contato assim que possível.',
      email_label: 'Email',
      phone_label: 'Telefone',
      address_label: 'Endereço',
      form_name: 'Seu Nome',
      form_email: 'Seu Email',
      form_message: 'Sua Mensagem',
      form_submit: 'Enviar Mensagem',
      hours_label: 'Horário de Funcionamento',
    },
    ar: {
      heading: 'اتصل بنا',
      subtitle: 'نود أن نسمع منك. أرسل لنا رسالة وسنرد عليك في أسرع وقت ممكن.',
      email_label: 'البريد الإلكتروني',
      phone_label: 'الهاتف',
      address_label: 'العنوان',
      form_name: 'اسمك',
      form_email: 'بريدك الإلكتروني',
      form_message: 'رسالتك',
      form_submit: 'إرسال الرسالة',
      hours_label: 'ساعات العمل',
    },
    zh: {
      heading: '联系我们',
      subtitle: '我们很乐意听到您的意见。发送消息给我们，我们将尽快回复您。',
      email_label: '电子邮件',
      phone_label: '电话',
      address_label: '地址',
      form_name: '您的名字',
      form_email: '您的电子邮件',
      form_message: '您的消息',
      form_submit: '发送消息',
      hours_label: '营业时间',
    },
    hi: {
      heading: 'हमसे संपर्क करें',
      subtitle: 'हम आपसे सुनना पसंद करेंगे। हमें एक संदेश भेजें और हम जल्द से जल्द आपको जवाब देंगे।',
      email_label: 'ईमेल',
      phone_label: 'फोन',
      address_label: 'पता',
      form_name: 'आपका नाम',
      form_email: 'आपकी ईमेल',
      form_message: 'आपका संदेश',
      form_submit: 'संदेश भेजें',
      hours_label: 'व्यावसायिक घंटे',
    },
    sw: {
      heading: 'Wasiliana Nasi',
      subtitle: 'Tungependa kusikia kutoka kwako. Tuma ujumbe kwetu na tutakujibu haraka iwezekanavyo.',
      email_label: 'Barua Pepe',
      phone_label: 'Simu',
      address_label: 'Anwani',
      form_name: 'Jina Lako',
      form_email: 'Barua Pepe Yako',
      form_message: 'Ujumbe Wako',
      form_submit: 'Tuma Ujumbe',
      hours_label: 'Saa za Kazi',
    },
    id: {
      heading: 'Hubungi Kami',
      subtitle: 'Kami ingin mendengar dari Anda. Kirim pesan kepada kami dan kami akan membalas sesegera mungkin.',
      email_label: 'Email',
      phone_label: 'Telepon',
      address_label: 'Alamat',
      form_name: 'Nama Anda',
      form_email: 'Email Anda',
      form_message: 'Pesan Anda',
      form_submit: 'Kirim Pesan',
      hours_label: 'Jam Kerja',
    },
    ru: {
      heading: 'Свяжитесь с Нами',
      subtitle: 'Мы будем рады услышать от вас. Отправьте нам сообщение, и мы ответим вам как можно скорее.',
      email_label: 'Email',
      phone_label: 'Телефон',
      address_label: 'Адрес',
      form_name: 'Ваше Имя',
      form_email: 'Ваш Email',
      form_message: 'Ваше Сообщение',
      form_submit: 'Отправить Сообщение',
      hours_label: 'Часы Работы',
    },
  }

  const page = content[params.lang] || content.en

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{page.heading}</h1>
        <p className="text-slate-300 mb-12">{page.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">{page.email_label}</h3>
              <p className="text-slate-400">support@cartotv.com</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{page.phone_label}</h3>
              <p className="text-slate-400">+1 (555) 123-4567</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{page.address_label}</h3>
              <p className="text-slate-400">
                123 Media Street<br />
                Los Angeles, CA 90001<br />
                United States
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">{page.hours_label}</h3>
              <p className="text-slate-400">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday - Sunday: 10:00 AM - 4:00 PM<br />
                All times in PST
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800 p-8 rounded-lg">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{page.form_name}</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder={page.form_name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{page.form_email}</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder={page.form_email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{page.form_message}</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder={page.form_message}
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                {page.form_submit}
              </button>
            </form>
          </div>
        </div>

        <section>
          <p className="text-slate-400">Language: {params.lang}</p>
        </section>
      </div>
    </div>
  )
}
