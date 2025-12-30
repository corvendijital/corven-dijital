import { ShoppingCart, Search, Palette, Code, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz - İKAS E-Ticaret, SEO, Tema Geliştirme',
  description: 'İKAS e-ticaret çözümleri, SEO optimizasyonu, özel tema geliştirme ve yazılım hizmetleri. Profesyonel dijital ajans hizmetleri.',
  openGraph: {
    title: 'Hizmetlerimiz | Corven Dijital',
    description: 'İKAS e-ticaret çözümleri, SEO optimizasyonu, özel tema geliştirme ve yazılım hizmetleri.',
  },
};

const services = [
  {
    id: 'ikas',
    icon: ShoppingCart,
    title: 'İKAS E-Ticaret Çözümleri',
    description: 'İKAS altyapısında profesyonel e-ticaret siteleri kuruyoruz. Türkiye\'nin en güçlü e-ticaret platformunda satışlarınızı artıracak çözümler sunuyoruz.',
    features: [
      'Profesyonel e-ticaret sitesi kurulumu',
      'Ürün ve kategori yönetimi',
      'Ödeme sistemleri entegrasyonu',
      'Kargo entegrasyonları',
      'Stok yönetimi',
      'Sipariş takip sistemi',
      'Müşteri yönetimi',
      'Raporlama ve analitik',
    ],
    benefits: [
      'Hızlı kurulum ve yayına alma',
      'Mobil uyumlu tasarım',
      'Güvenli alışveriş deneyimi',
      '7/24 teknik destek',
    ],
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO Optimizasyonu',
    description: 'Arama motorlarında üst sıralara çıkın. Organik trafik ve görünürlüğünüzü artırarak daha fazla potansiyel müşteriye ulaşın.',
    features: [
      'Teknik SEO analizi ve düzenleme',
      'Anahtar kelime araştırması',
      'İçerik optimizasyonu',
      'Site hızı optimizasyonu',
      'Mobil uyumluluk',
      'Backlink stratejisi',
      'Yerel SEO çalışmaları',
      'Aylık raporlama',
    ],
    benefits: [
      'Organik trafik artışı',
      'Marka bilinirliği',
      'Uzun vadeli sonuçlar',
      'Rekabet avantajı',
    ],
  },
  {
    id: 'tema',
    icon: Palette,
    title: 'Tema Geliştirme',
    description: 'Markanıza özel, benzersiz tema tasarımları ile rakiplerinizden farklılaşın. İKAS platformu için özelleştirilmiş temalar geliştiriyoruz.',
    features: [
      'Özel tema tasarımı',
      'Responsive tasarım',
      'Marka kimliğine uygun renkler',
      'Kullanıcı deneyimi odaklı tasarım',
      'Hızlı sayfa yüklenme',
      'SEO dostu yapı',
      'Kolay yönetilebilir panel',
      'Sürekli güncelleme desteği',
    ],
    benefits: [
      'Benzersiz görünüm',
      'Marka değeri artışı',
      'Daha iyi kullanıcı deneyimi',
      'Yüksek dönüşüm oranları',
    ],
  },
  {
    id: 'yazilim',
    icon: Code,
    title: 'Özel Yazılım Geliştirme',
    description: 'İhtiyaçlarınıza özel yazılım çözümleri geliştiriyoruz. Entegrasyonlar, otomasyon sistemleri ve özel uygulamalar ile işinizi büyütün.',
    features: [
      'Özel entegrasyon geliştirme',
      'API entegrasyonları',
      'Otomasyon sistemleri',
      'ERP entegrasyonları',
      'Özel modül geliştirme',
      'Veri migration',
      'Performans optimizasyonu',
      'Teknik danışmanlık',
    ],
    benefits: [
      'İş süreçlerinde verimlilik',
      'Zaman tasarrufu',
      'Hata oranında azalma',
      'Ölçeklenebilir çözümler',
    ],
  },
];

export default function HizmetlerPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hizmetlerimiz</h1>
            <p className="text-xl text-primary-100">
              E-ticaret ihtiyaçlarınız için kapsamlı dijital çözümler sunuyoruz.
              İKAS platformunda uzmanlaşmış ekibimizle işinizi büyütün.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                      <service.icon className="text-primary-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Neler Sunuyoruz?</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <CheckCircle className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/teklif"
                    className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Teklif Alın
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </div>

                <div className={`bg-gray-50 rounded-2xl p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Avantajlar</h3>
                  <div className="space-y-4">
                    {service.benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                          <CheckCircle className="text-primary-600" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Projenizi Birlikte Planlayalım
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            İhtiyaçlarınıza en uygun çözümü bulmak için ücretsiz danışmanlık hizmeti sunuyoruz.
          </p>
          <Link
            href="/teklif"
            className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Ücretsiz Teklif Alın
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
