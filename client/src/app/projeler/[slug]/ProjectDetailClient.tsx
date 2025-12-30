'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Building2, Layers, CheckCircle, ArrowRight, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  technologies: string[];
  image: string;
  gallery: string[];
  client: string;
  year: string;
  duration: string;
  services: string[];
  results: { label: string; value: string }[];
}

interface Props {
  project: Project;
}

export default function ProjectDetailClient({ project }: Props) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-8 pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/projeler"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors group mb-8"
            >
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Tüm Projeler
            </Link>
          </motion.div>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Category Badge - Now properly positioned under the title area */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="inline-flex items-center bg-primary-600/20 text-primary-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-primary-500/30"
              >
                <Layers size={14} className="mr-2" />
                {project.category}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 text-sm">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center text-gray-400"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                    <Building2 size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">Müşteri</span>
                    <span className="text-white font-medium">{project.client}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center text-gray-400"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                    <Calendar size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">Yıl</span>
                    <span className="text-white font-medium">{project.year}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center text-gray-400"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
                    <Clock size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">Süre</span>
                    <span className="text-white font-medium">{project.duration}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-600/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary-600/10 rounded-xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Stats - Floating Cards */}
      <section className="relative z-20 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="text-primary-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-900">Proje Sonuçları</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.results.map((result, index) => (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform">
                    {result.value}
                  </div>
                  <div className="text-gray-600">{result.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
                  {project.fullDescription.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <motion.h2
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="text-2xl font-bold mt-8 mb-4 text-gray-900"
                        >
                          {paragraph.replace('## ', '')}
                        </motion.h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <motion.h3
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="text-xl font-semibold mt-6 mb-3 text-gray-800"
                        >
                          {paragraph.replace('### ', '')}
                        </motion.h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                      return (
                        <motion.ul
                          key={index}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          className="my-4 space-y-2"
                        >
                          {items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle size={18} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                              <span>{item.replace('- ', '')}</span>
                            </li>
                          ))}
                        </motion.ul>
                      );
                    }
                    return (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-600 leading-relaxed"
                      >
                        {paragraph}
                      </motion.p>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              {/* Services */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Layers size={20} className="text-primary-600 mr-2" />
                  Verilen Hizmetler
                </h3>
                <div className="space-y-3">
                  {project.services.map((service, index) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-gray-700"
                    >
                      <CheckCircle size={16} className="text-primary-600 mr-3" />
                      {service}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Kullanılan Teknolojiler</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Benzer bir proje mi planlıyorsunuz?</h3>
                <p className="text-primary-100 mb-4 text-sm">
                  Size özel çözümler için hemen iletişime geçin.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/teklif"
                    className="inline-flex items-center bg-white text-primary-600 px-5 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors w-full justify-center"
                  >
                    Teklif Al
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 1 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Proje Görselleri</h2>
              <p className="text-gray-600">Projeden detaylı ekran görüntüleri</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative h-64 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                >
                  <Image
                    src={img}
                    alt={`${project.title} - Görsel ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ExternalLink
                      size={32}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ x: -5 }}>
              <Link
                href="/projeler"
                className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors font-medium"
              >
                <ArrowLeft size={20} className="mr-2" />
                Tüm Projelere Dön
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/iletisim"
                className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                İletişime Geç
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
