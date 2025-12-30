'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart, Search, Palette, Code, CheckCircle, Users, Award, Zap, Star, TrendingUp, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  { value: 150, suffix: '+', label: 'Tamamlanan Proje' },
  { value: 50, suffix: '+', label: 'Mutlu Müşteri' },
  { value: 5, suffix: '+', label: 'Yıllık Deneyim' },
  { value: 95, suffix: '%', label: 'Müşteri Memnuniyeti' },
];

const features = [
  'İKAS sertifikalı uzman ekip',
  'Hızlı teslimat süreleri',
  'Sürekli destek ve bakım',
  'Sonuç odaklı çalışma',
  'Şeffaf iletişim',
  'Rekabetçi fiyatlandırma',
];

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    company: 'ModaStyle',
    text: 'Corven Dijital ile çalışmak işimizi tamamen değiştirdi. Online satışlarımız %200 arttı.',
    rating: 5,
  },
  {
    name: 'Elif Kaya',
    company: 'Organik Bahçe',
    text: 'Profesyonel yaklaşımları ve hızlı çözümleri ile mükemmel bir deneyim yaşadık.',
    rating: 5,
  },
  {
    name: 'Mehmet Demir',
    company: 'TechGear',
    text: 'SEO çalışması sonrası organik trafiğimiz 3 katına çıktı. Kesinlikle tavsiye ediyorum.',
    rating: 5,
  },
];

const partners = ['İKAS', 'Google Partner', 'Meta Business', 'Shopify'];

// Sayaç animasyonu için hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, hasStarted]);

  return { count, setHasStarted };
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, setHasStarted } = useCounter(value);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setHasStarted(true)}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-400">{label}</div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.08),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse" />
                <span className="text-primary-300 text-sm font-medium">İKAS Resmi İş Ortağı</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                E-Ticarette{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                  Başarının
                </span>{' '}
                Anahtarı
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                İKAS e-ticaret çözümleri, SEO optimizasyonu ve özel yazılım geliştirme ile
                işletmenizi dijital dünyada bir adım öne taşıyoruz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/teklif"
                    className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25"
                  >
                    Ücretsiz Teklif Alın
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/projeler"
                    className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
                  >
                    Projelerimizi İnceleyin
                  </Link>
                </motion.div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-gray-700">
                <div className="flex items-center">
                  <Shield className="text-green-500 mr-2" size={20} />
                  <span className="text-gray-400 text-sm">Güvenli Altyapı</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="text-primary-500 mr-2" size={20} />
                  <span className="text-gray-400 text-sm">%100 Başarı Oranı</span>
                </div>
              </div>
            </motion.div>

            {/* Right side - floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative h-[500px]">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 right-0 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="text-green-500" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Satış Artışı</div>
                      <div className="text-green-400 text-sm">+245% bu ay</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute top-1/3 left-0 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <Star className="text-primary-500" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Müşteri Puanı</div>
                      <div className="text-yellow-400 text-sm flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                        <span className="ml-1 text-gray-300">4.9/5</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="text-blue-500" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Aktif Projeler</div>
                      <div className="text-blue-400 text-sm">12 devam eden</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners/Trust Section */}
      <section className="py-8 bg-gray-100 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <span className="text-gray-500 text-sm font-medium">İş Ortaklarımız:</span>
            {partners.map((partner, i) => (
              <motion.span
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-gray-400 font-semibold text-lg"
              >
                {partner}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Hizmetlerimiz</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Dijital Başarınız İçin Kapsamlı Çözümler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              E-ticaret ihtiyaçlarınız için uçtan uca profesyonel hizmetler sunuyoruz
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="group block bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 h-full"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="text-primary-600 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <span className="inline-flex items-center text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Detaylı bilgi <ArrowRight size={16} className="ml-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Neden Biz?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Corven Dijital Farkı
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Yılların deneyimi ve uzman kadromuzla e-ticaret projelerinizi başarıya taşıyoruz.
                İKAS platformunda özelleştirilmiş çözümler ve sürekli destek ile yanınızdayız.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                  >
                    <CheckCircle className="text-primary-600 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.02 }} className="mt-8">
                <Link
                  href="/hakkimizda"
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  Daha fazla bilgi
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Users, title: 'Uzman Ekip', desc: 'İKAS sertifikalı deneyimli geliştiriciler', delay: 0 },
                { icon: Award, title: 'Kalite Garantisi', desc: 'Test edilmiş, performanslı çözümler', delay: 0.1 },
                { icon: Zap, title: 'Hızlı Teslimat', desc: 'Zamanında teslim, hızlı sonuçlar', delay: 0.2 },
                { icon: CheckCircle, title: 'Sürekli Destek', desc: '7/24 teknik destek hizmeti', delay: 0.3 },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay }}
                  whileHover={{ y: -5 }}
                  className={`bg-white p-6 rounded-2xl shadow-lg ${index % 2 === 1 ? 'mt-8' : ''}`}
                >
                  <item.icon className="text-primary-600 mb-4" size={32} />
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Müşteri Yorumları</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Müşterilerimiz Ne Diyor?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 relative"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Projenizi Hayata Geçirmeye Hazır mısınız?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Ücretsiz danışmanlık için hemen iletişime geçin. E-ticaret yolculuğunuzda yanınızda olalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/teklif"
                className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg"
              >
                Teklif Alın
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                İletişime Geçin
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
