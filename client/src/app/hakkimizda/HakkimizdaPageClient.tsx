'use client';

import { Users, Target, Award, Heart, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const values = [
  {
    icon: Target,
    title: 'Sonuç Odaklılık',
    description: 'Her projede ölçülebilir sonuçlar hedefliyor, müşterilerimizin başarısını kendi başarımız olarak görüyoruz.',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Award,
    title: 'Kalite',
    description: 'En yüksek standartlarda iş çıkarmak için sürekli kendimizi geliştiriyor, en iyi teknolojileri kullanıyoruz.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Users,
    title: 'İşbirliği',
    description: 'Müşterilerimizle yakın çalışarak, onların vizyonunu anlamak ve hayata geçirmek için birlikte hareket ediyoruz.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'Tutku',
    description: 'İşimizi seviyoruz. Her projede aynı heyecan ve özveriyle çalışıyor, fark yaratan işler ortaya koyuyoruz.',
    color: 'from-pink-500 to-pink-600',
  },
];

const team = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Kurucu & CEO',
    description: '10+ yıl e-ticaret deneyimi ile sektörün önde gelen isimlerinden.',
  },
  {
    name: 'Mehmet Kaya',
    role: 'Teknik Direktör',
    description: 'İKAS platformunda uzmanlaşmış, full-stack geliştirici.',
  },
];

const stats = [
  { value: 150, suffix: '+', label: 'Tamamlanan Proje' },
  { value: 50, suffix: '+', label: 'Mutlu Müşteri' },
  { value: 5, suffix: '+', label: 'Yıl Deneyim' },
  { value: 95, suffix: '%', label: 'Memnuniyet' },
];

const whyUsItems = [
  'İKAS platformunda sertifikalı uzman ekip',
  'Sonuç odaklı, ölçülebilir başarılar',
  'Şeffaf iletişim ve düzenli raporlama',
  '7/24 teknik destek hizmeti',
  'Rekabetçi fiyatlandırma',
  'Proje sonrası sürekli destek',
];

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return { count, setHasStarted };
}

import { useState, useEffect } from 'react';

function AnimatedStat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const { count, setHasStarted } = useCounter(value, 2000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onViewportEnter={() => setHasStarted(true)}
      className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <motion.div
        className="text-3xl md:text-4xl font-bold text-primary-600 mb-2"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}

export default function HakkimizdaPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(220,38,38,0.1),transparent_50%)]" />
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
              className="inline-flex items-center text-primary-400 font-semibold text-sm uppercase tracking-wider"
            >
              <Sparkles size={18} className="mr-2" />
              Bizi Tanıyın
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">Hakkımızda</h1>
            <p className="text-xl text-gray-300">
              Corven Dijital olarak, e-ticaret dünyasında işletmelerin dijital dönüşümüne liderlik ediyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary-600 font-semibold text-sm uppercase tracking-wider"
              >
                Hikayemiz
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                E-Ticaret Tutkusuyla Başladık
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Corven Dijital, e-ticaret sektöründeki yılların deneyimi ve dijital pazarlama tutkusuyla
                  kurulmuş bir dijital ajans. İKAS platformunda uzmanlaşmış ekibimizle, işletmelerin
                  online satış hedeflerine ulaşmasına yardımcı oluyoruz.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Müşterilerimizin başarısını kendi başarımız olarak görüyor, her projede aynı özveri
                  ve profesyonellikle çalışıyoruz. Amacımız sadece bir web sitesi kurmak değil,
                  sürdürülebilir büyüme sağlayan dijital çözümler sunmak.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Bugün, 50'den fazla mutlu müşteri ve 150'den fazla başarılı proje ile
                  Türkiye'nin önde gelen İKAS ajanslarından biri olmanın gururunu yaşıyoruz.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <AnimatedStat key={stat.label} {...stat} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Temel İlkelerimiz</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Değerlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              İş yapış şeklimizi şekillendiren temel ilkeler
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-5 shadow-lg`}
                >
                  <value.icon className="text-white" size={28} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Profesyonel Kadro</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Ekibimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deneyimli ve tutkulu profesyonellerden oluşan ekibimiz
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-primary-500/25"
                >
                  <Users className="text-white" size={40} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary-400 font-semibold text-sm uppercase tracking-wider"
              >
                Farkımız
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">
                Neden Bizi Tercih Etmelisiniz?
              </h2>
              <div className="space-y-4">
                {whyUsItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="text-white" size={18} />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-4">Birlikte Başaralım</h3>
                <p className="text-lg text-gray-400 mb-8">
                  E-ticaret yolculuğunuzda yanınızda olmak için sabırsızlanıyoruz.
                  Ücretsiz danışmanlık hizmetimizden faydalanın.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/teklif"
                    className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
                  >
                    Hemen Başlayalım
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
