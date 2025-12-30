'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  hizmetler: [
    { name: 'İKAS E-Ticaret', href: '/hizmetler#ikas' },
    { name: 'SEO Optimizasyonu', href: '/hizmetler#seo' },
    { name: 'Tema Geliştirme', href: '/hizmetler#tema' },
    { name: 'Özel Yazılım', href: '/hizmetler#yazilim' },
  ],
  sirket: [
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Projeler', href: '/projeler' },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-500' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
  { icon: Twitter, href: '#', label: 'X (Twitter)', color: 'hover:bg-gray-800' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.08),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <motion.div whileHover={{ rotate: 5 }}>
                <Image
                  src="/logo.png"
                  alt="Corven Dijital Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </motion.div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">Corven</span>
                <span className="text-2xl font-light text-primary-400">Dijital</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              İKAS e-ticaret çözümleri, SEO optimizasyonu ve özel yazılım geliştirme konusunda uzman dijital ajans.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Hizmetler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Hizmetler</h3>
            <ul className="space-y-4">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Şirket */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Şirket</h3>
            <ul className="space-y-4">
              {footerLinks.sirket.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* İletişim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">İletişim</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@corvendijital.com"
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-600/20 transition-colors">
                    <Mail size={18} className="text-primary-400" />
                  </div>
                  info@corvendijital.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+905551234567"
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-600/20 transition-colors">
                    <Phone size={18} className="text-primary-400" />
                  </div>
                  +90 555 123 45 67
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mr-3">
                  <MapPin size={18} className="text-primary-400" />
                </div>
                İstanbul, Türkiye
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm flex items-center">
              © {new Date().getFullYear()} Corven Dijital. Tüm hakları saklıdır.
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Heart size={14} className="text-primary-500 mr-1" fill="currentColor" /> ile yapıldı
              </span>
            </p>
            <div className="flex space-x-6">
              <Link href="/gizlilik" className="text-gray-500 hover:text-white text-sm transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kvkk" className="text-gray-500 hover:text-white text-sm transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
