'use client';

import { ShoppingCart, Search, Palette, Code, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary-400 font-semibold text-sm uppercase tracking-wider"
            >
              Profesyonel Çözümler
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">Hizmetlerimiz</h1>
            <p className="text-xl text-gray-300">
              E-ticaret ihtiyaçlarınız için kapsamlı dijital çözümler sunuyoruz.
              İKAS platformunda uzmanlaşmış ekibimizle işinizi büyütün.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center mb-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-primary-500/25"
                    >
                      <service.icon className="text-white" size={32} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  </motion.div>
                  <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Neler Sunuyoruz?</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start"
                        >
                          <CheckCircle className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-gray-600">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/teklif"
                      className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
                    >
                      Teklif Alın
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Avantajlar</h3>
                  <div className="space-y-4">
                    {service.benefits.map((benefit, i) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                      >
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                          <CheckCircle className="text-primary-600" size={20} />
                        </div>
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.15),transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Süreç</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Nasıl Çalışıyoruz?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Projelerinizi başarıyla tamamlamak için izlediğimiz adımlar
            </p>
          </motion.div>

          <div className="relative">
            {/* Bağlantı çizgisi */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-600/20 via-primary-500/40 to-primary-600/20 transform -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-4 gap-6 relative z-10">
              {[
                { step: '01', title: 'Analiz', desc: 'İhtiyaçlarınızı belirliyoruz', icon: '🎯' },
                { step: '02', title: 'Planlama', desc: 'Yol haritası çiziyoruz', icon: '📋' },
                { step: '03', title: 'Geliştirme', desc: 'Hayata geçiriyoruz', icon: '⚡' },
                { step: '04', title: 'Destek', desc: 'Yanınızda oluyoruz', icon: '🚀' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: i * 0.1
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:border-primary-500/50 transition-all duration-300">
                    {/* Numara badge */}
                    <motion.div
                      initial={{ rotate: -10 }}
                      whileHover={{ rotate: 0, scale: 1.1 }}
                      className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/25 text-2xl"
                    >
                      {item.icon}
                    </motion.div>
                    <div className="text-primary-400 font-bold text-sm mb-2">ADIM {item.step}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>

                  {/* Bağlantı noktası */}
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 transform -translate-y-1/2 z-20">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-full h-full bg-primary-500 rounded-full shadow-lg shadow-primary-500/50"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Projenizi Birlikte Planlayalım
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            İhtiyaçlarınıza en uygun çözümü bulmak için ücretsiz danışmanlık hizmeti sunuyoruz.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              href="/teklif"
              className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
            >
              Ücretsiz Teklif Alın
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
