'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: '1',
    title: 'İKAS ile E-Ticaret Sitenizi Nasıl Büyütürsünüz?',
    slug: 'ikas-ile-eticaret-sitenizi-nasil-buyutursunuz',
    excerpt: 'İKAS altyapısının sunduğu avantajları ve e-ticaret sitenizi büyütmek için kullanabileceğiniz stratejileri keşfedin.',
    category: 'E-Ticaret',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    author: 'Corven Dijital',
    date: '20 Ocak 2024',
    readTime: '5 dk',
  },
  {
    id: '2',
    title: '2024\'te SEO Trendleri: Bilmeniz Gerekenler',
    slug: '2024te-seo-trendleri',
    excerpt: '2024 yılında SEO dünyasında neler değişiyor? Yapay zeka, kullanıcı deneyimi ve içerik stratejileri hakkında bilmeniz gerekenler.',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
    author: 'Corven Dijital',
    date: '15 Şubat 2024',
    readTime: '7 dk',
  },
  {
    id: '3',
    title: 'E-Ticaret Sitelerinde Dönüşüm Oranını Artırmanın 5 Yolu',
    slug: 'eticaret-donusum-orani-artirma',
    excerpt: 'E-ticaret sitenizin dönüşüm oranını artırmak için uygulayabileceğiniz pratik stratejiler.',
    category: 'E-Ticaret',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    author: 'Corven Dijital',
    date: '10 Mart 2024',
    readTime: '6 dk',
  },
  {
    id: '4',
    title: 'Mobil E-Ticaret: Neden Önemli ve Nasıl Optimize Edilir?',
    slug: 'mobil-eticaret-optimizasyonu',
    excerpt: 'Mobil cihazlardan yapılan alışverişler artıyor. E-ticaret sitenizi mobil için optimize etmenin yollarını öğrenin.',
    category: 'E-Ticaret',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    author: 'Corven Dijital',
    date: '5 Nisan 2024',
    readTime: '4 dk',
  },
  {
    id: '5',
    title: 'İKAS Tema Geliştirme: Başlangıç Rehberi',
    slug: 'ikas-tema-gelistirme-rehberi',
    excerpt: 'İKAS platformunda özel tema geliştirmeye başlamak için bilmeniz gereken temel bilgiler ve ipuçları.',
    category: 'Tema Geliştirme',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    author: 'Corven Dijital',
    date: '20 Nisan 2024',
    readTime: '8 dk',
  },
  {
    id: '6',
    title: 'E-Ticarette Müşteri Deneyimini İyileştirmenin Yolları',
    slug: 'eticarette-musteri-deneyimi',
    excerpt: 'Online mağazanızda müşteri deneyimini nasıl iyileştirebileceğinizi ve sadık müşteriler kazanabileceğinizi öğrenin.',
    category: 'E-Ticaret',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    author: 'Corven Dijital',
    date: '1 Mayıs 2024',
    readTime: '5 dk',
  },
];

export default function BlogPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
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
              <BookOpen size={18} className="mr-2" />
              İçerikler & Makaleler
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">Blog</h1>
            <p className="text-xl text-gray-300">
              E-ticaret, SEO ve dijital pazarlama hakkında güncel içerikler, ipuçları ve stratejiler.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 lg:h-[400px] overflow-hidden">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white text-sm px-4 py-1.5 rounded-full font-medium">
                      Öne Çıkan
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center text-primary-600 font-medium mb-4 text-sm">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span>{blogPosts[0].date}</span>
                      <span className="mx-3">•</span>
                      <Clock size={16} className="mr-2" />
                      <span>{blogPosts[0].readTime} okuma</span>
                    </div>
                    <span className="text-primary-600 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                      Devamını Oku <ArrowRight size={18} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              E-Bültenimize Abone Olun
            </h2>
            <p className="text-gray-400 mb-8">
              E-ticaret ve dijital pazarlama hakkında en güncel içerikleri e-posta adresinize gönderelim.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
              >
                Abone Ol
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
}
