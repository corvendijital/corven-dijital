import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Corven Dijital Logo"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">Corven</span>
                <span className="text-2xl font-light text-primary-400">Dijital</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              İKAS e-ticaret çözümleri, SEO optimizasyonu ve özel yazılım geliştirme konusunda uzman dijital ajans.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Şirket</h3>
            <ul className="space-y-3">
              {footerLinks.sirket.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail size={18} className="mr-3 text-primary-400" />
                <a href="mailto:info@corvendijital.com" className="hover:text-white transition-colors">
                  info@corvendijital.com
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={18} className="mr-3 text-primary-400" />
                <a href="tel:+905551234567" className="hover:text-white transition-colors">
                  +90 555 123 45 67
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin size={18} className="mr-3 mt-1 text-primary-400 flex-shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Corven Dijital. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/gizlilik" className="text-gray-400 hover:text-white text-sm transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kvkk" className="text-gray-400 hover:text-white text-sm transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
