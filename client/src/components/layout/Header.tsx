'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '/hizmetler' },
  { name: 'Projeler', href: '/projeler' },
  { name: 'Blog', href: '/blog' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'İletişim', href: '/iletisim' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Corven</span>
            <span className="text-2xl font-light text-gray-700">Dijital</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/teklif"
              className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Teklif Al
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600 hover:text-primary-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/teklif"
                className="bg-primary-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Teklif Al
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
