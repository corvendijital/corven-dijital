'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Tümü', 'E-Ticaret', 'Tema Geliştirme', 'SEO', 'Özel Yazılım'];

const projects = [
  {
    id: '1',
    title: 'ModaStyle E-Ticaret',
    slug: 'modastyle-eticaret',
    description: 'ModaStyle için İKAS altyapısında modern ve kullanıcı dostu bir e-ticaret sitesi geliştirdik.',
    category: 'E-Ticaret',
    technologies: ['İKAS', 'Liquid', 'JavaScript', 'CSS'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    client: 'ModaStyle',
    year: '2024',
    result: '+200% Satış',
  },
  {
    id: '2',
    title: 'TechGear Online Mağaza',
    slug: 'techgear-online-magaza',
    description: 'Teknoloji ürünleri satan TechGear için SEO odaklı e-ticaret çözümü.',
    category: 'E-Ticaret',
    technologies: ['İKAS', 'SEO', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800',
    client: 'TechGear',
    year: '2024',
    result: '+150% Trafik',
  },
  {
    id: '3',
    title: 'Organik Bahçe',
    slug: 'organik-bahce',
    description: 'Organik ürünler satan Organik Bahçe için özel tema geliştirme projesi.',
    category: 'Tema Geliştirme',
    technologies: ['İKAS', 'Liquid', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    client: 'Organik Bahçe',
    year: '2023',
    result: '+45% Dönüşüm',
  },
  {
    id: '4',
    title: 'Spor Deposu SEO Projesi',
    slug: 'spor-deposu-seo',
    description: 'Spor Deposu için kapsamlı SEO çalışması ve içerik stratejisi.',
    category: 'SEO',
    technologies: ['SEO', 'Google Analytics', 'Search Console'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    client: 'Spor Deposu',
    year: '2024',
    result: '+300% Organik',
  },
  {
    id: '5',
    title: 'Mobilya Dünyası',
    slug: 'mobilya-dunyasi',
    description: 'Mobilya sektörü için kapsamlı e-ticaret çözümü ve özel filtreleme sistemi.',
    category: 'E-Ticaret',
    technologies: ['İKAS', 'JavaScript', 'CSS'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    client: 'Mobilya Dünyası',
    year: '2024',
    result: '+90% Satış',
  },
  {
    id: '6',
    title: 'Kozmetik Store Tema',
    slug: 'kozmetik-store-tema',
    description: 'Kozmetik markası için lüks ve şık özel tema tasarımı.',
    category: 'Tema Geliştirme',
    technologies: ['İKAS', 'Liquid', 'CSS', 'Animasyonlar'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    client: 'Kozmetik Store',
    year: '2024',
    result: '+55% Sepet',
  },
];

export default function ProjelerPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filteredProjects = activeCategory === 'Tümü'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
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
              Portfolyo
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">Projelerimiz</h1>
            <p className="text-xl text-gray-300">
              Başarıyla tamamladığımız projelerimizi inceleyin. Her projede müşteri memnuniyetini ön planda tutuyoruz.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-12 max-w-xl"
          >
            {[
              { value: '150+', label: 'Proje' },
              { value: '%100', label: 'Başarı' },
              { value: '50+', label: 'Müşteri' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary-400">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-white sticky top-16 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Filter size={18} className="text-gray-400 mr-2" />
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/projeler/${project.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm px-3 py-1 rounded-full font-medium">
                            {project.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span className="inline-flex items-center text-white font-medium">
                            Projeyi İncele <ArrowRight size={16} className="ml-1" />
                          </span>
                        </div>
                        {/* Result Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {project.result}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">{project.client} • {project.year}</span>
                          <span className="text-primary-600 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                            İncele
                            <ArrowRight className="ml-1" size={16} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">Bu kategoride henüz proje bulunmuyor.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sizin Projeniz Bir Sonraki Olabilir
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            E-ticaret hedeflerinizi gerçekleştirmek için bizimle iletişime geçin.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              href="/teklif"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
            >
              Projenizi Başlatın
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
