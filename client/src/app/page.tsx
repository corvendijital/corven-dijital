import Link from 'next/link';
import { ArrowRight, ShoppingCart, Search, Palette, Code, CheckCircle, Users, Award, Zap } from 'lucide-react';

const services = [
  {
    icon: ShoppingCart,
    title: 'İKAS E-Ticaret',
    description: 'İKAS altyapısında profesyonel e-ticaret siteleri kuruyoruz. Satışlarınızı artıracak modern çözümler.',
    href: '/hizmetler#ikas',
  },
  {
    icon: Search,
    title: 'SEO Optimizasyonu',
    description: 'Arama motorlarında üst sıralara çıkın. Organik trafik ve görünürlüğünüzü artırın.',
    href: '/hizmetler#seo',
  },
  {
    icon: Palette,
    title: 'Tema Geliştirme',
    description: 'Markanıza özel, benzersiz tema tasarımları. Rakiplerinizden farklılaşın.',
    href: '/hizmetler#tema',
  },
  {
    icon: Code,
    title: 'Özel Yazılım',
    description: 'İhtiyaçlarınıza özel yazılım çözümleri. Entegrasyonlar ve otomasyon sistemleri.',
    href: '/hizmetler#yazilim',
  },
];

const stats = [
  { value: '150+', label: 'Tamamlanan Proje' },
  { value: '50+', label: 'Mutlu Müşteri' },
  { value: '5+', label: 'Yıllık Deneyim' },
  { value: '%95', label: 'Müşteri Memnuniyeti' },
];

const features = [
  'İKAS sertifikalı uzman ekip',
  'Hızlı teslimat süreleri',
  'Sürekli destek ve bakım',
  'Sonuç odaklı çalışma',
  'Şeffaf iletişim',
  'Rekabetçi fiyatlandırma',
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              E-Ticarette Başarının Anahtarı
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed">
              İKAS e-ticaret çözümleri, SEO optimizasyonu ve özel yazılım geliştirme ile
              işletmenizi dijital dünyada bir adım öne taşıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/teklif"
                className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl"
              >
                Ücretsiz Teklif Alın
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/projeler"
                className="inline-flex items-center justify-center bg-primary-500/30 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold hover:bg-primary-500/50 transition-all"
              >
                Projelerimizi İnceleyin
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              E-ticaret ihtiyaçlarınız için kapsamlı çözümler sunuyoruz
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-gray-50 rounded-xl p-6 hover:bg-primary-50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary-200 transition-colors">
                  <service.icon className="text-primary-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Neden Corven Dijital?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Yılların deneyimi ve uzman kadromuzla e-ticaret projelerinizi başarıya taşıyoruz.
                İKAS platformunda özelleştirilmiş çözümler ve sürekli destek ile yanınızdayız.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="text-primary-600 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/hakkimizda"
                className="inline-flex items-center mt-8 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Daha fazla bilgi
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <Users className="text-primary-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Uzman Ekip</h3>
                <p className="text-gray-600 text-sm">İKAS sertifikalı deneyimli geliştiriciler</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md mt-8">
                <Award className="text-primary-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Kalite Garantisi</h3>
                <p className="text-gray-600 text-sm">Test edilmiş, performanslı çözümler</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <Zap className="text-primary-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Hızlı Teslimat</h3>
                <p className="text-gray-600 text-sm">Zamanında teslim, hızlı sonuçlar</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md mt-8">
                <CheckCircle className="text-primary-600 mb-4" size={32} />
                <h3 className="font-semibold text-gray-900 mb-2">Sürekli Destek</h3>
                <p className="text-gray-600 text-sm">7/24 teknik destek hizmeti</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Projenizi Hayata Geçirmeye Hazır mısınız?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Ücretsiz danışmanlık için hemen iletişime geçin. E-ticaret yolculuğunuzda yanınızda olalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teklif"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg"
            >
              Teklif Alın
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
