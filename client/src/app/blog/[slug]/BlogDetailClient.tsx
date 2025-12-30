'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag, User, Share2, BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  date: string;
  readTime: string;
}

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({ post, relatedPosts }: Props) {
  // İçeriği parse et ve render et
  const renderContent = (content: string) => {
    const sections = content.split('\n\n');

    return sections.map((section, index) => {
      // Başlıklar
      if (section.startsWith('## ')) {
        return (
          <motion.h2
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 flex items-center"
          >
            <span className="w-1 h-8 bg-primary-600 rounded-full mr-4" />
            {section.replace('## ', '')}
          </motion.h2>
        );
      }

      if (section.startsWith('### ')) {
        return (
          <motion.h3
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-semibold text-gray-800 mt-8 mb-4"
          >
            {section.replace('### ', '')}
          </motion.h3>
        );
      }

      // Liste öğeleri
      if (section.includes('\n- ') || section.startsWith('- ')) {
        const items = section.split('\n').filter(line => line.startsWith('- '));
        return (
          <motion.ul
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="my-6 space-y-3"
          >
            {items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start group"
              >
                <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-primary-600 transition-colors">
                  <CheckCircle size={14} className="text-primary-600 group-hover:text-white transition-colors" />
                </span>
                <span className="text-gray-600 leading-relaxed">{item.replace('- ', '')}</span>
              </motion.li>
            ))}
          </motion.ul>
        );
      }

      // Numaralı liste
      if (section.match(/^\d+\. /m)) {
        const items = section.split('\n').filter(line => line.match(/^\d+\. /));
        return (
          <motion.ol
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="my-6 space-y-3"
          >
            {items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start group"
              >
                <span className="w-7 h-7 bg-primary-600 text-white rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-600 leading-relaxed">{item.replace(/^\d+\. /, '')}</span>
              </motion.li>
            ))}
          </motion.ol>
        );
      }

      // Normal paragraf
      if (section.trim()) {
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed text-lg mb-6"
          >
            {section}
          </motion.p>
        );
      }

      return null;
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-8 pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors group mb-8"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Tüm Yazılar
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center bg-primary-600/20 text-primary-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-primary-500/30"
          >
            <BookOpen size={14} className="mr-2" />
            {post.category}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-gray-300"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                <User size={18} className="text-primary-400" />
              </div>
              <div>
                <span className="block text-gray-500 text-xs">Yazar</span>
                <span className="text-white font-medium">{post.author}</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                <Calendar size={18} className="text-primary-400" />
              </div>
              <div>
                <span className="block text-gray-500 text-xs">Tarih</span>
                <span className="text-white font-medium">{post.date}</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                <Clock size={18} className="text-primary-400" />
              </div>
              <div>
                <span className="block text-gray-500 text-xs">Okuma Süresi</span>
                <span className="text-white font-medium">{post.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image - Floating */}
      <div className="relative z-20 -mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-64 md:h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="prose prose-lg max-w-none"
              >
                {renderContent(post.content)}
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <div className="flex items-center flex-wrap gap-3">
                  <Tag size={20} className="text-gray-400" />
                  {post.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Share */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 p-6 bg-gray-50 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Share2 size={20} className="text-gray-500 mr-3" />
                    <span className="font-medium text-gray-700">Bu yazıyı paylaş</span>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      CD
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900">{post.author}</h4>
                      <p className="text-sm text-gray-500">E-Ticaret Uzmanı</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    İKAS ve e-ticaret çözümleri konusunda uzman dijital ajans.
                  </p>
                </motion.div>

                {/* Contact Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/iletisim"
                    className="w-full flex items-center justify-center bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:border-primary-600 hover:text-primary-600 transition-all"
                  >
                    <User size={18} className="mr-2" />
                    İletişime Geç
                  </Link>
                </motion.div>

                {/* CTA Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white"
                >
                  <h4 className="font-bold mb-2">Destek mi arıyorsunuz?</h4>
                  <p className="text-primary-100 text-sm mb-4">
                    E-ticaret projeniz için ücretsiz danışmanlık alın.
                  </p>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/teklif"
                      className="inline-flex items-center bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-50 transition-colors w-full justify-center"
                    >
                      Teklif Al
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">İlgili Yazılar</h2>
              <p className="text-gray-600">Bu konuyla ilgili diğer yazılarımıza göz atın</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm px-3 py-1 rounded-full font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>{relatedPost.date}</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-1" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
