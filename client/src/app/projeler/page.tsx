'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

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
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Projelerimiz</h1>
            <p className="text-xl text-primary-100">
              Başarıyla tamamladığımız projelerimizi inceleyin. Her projede müşteri memnuniyetini ön planda tutuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white text-sm px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm text-gray-500">{project.client} • {project.year}</span>
                    <Link
                      href={`/projeler/${project.slug}`}
                      className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                    >
                      İncele
                      <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sizin Projeniz Bir Sonraki Olabilir
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            E-ticaret hedeflerinizi gerçekleştirmek için bizimle iletişime geçin.
          </p>
          <Link
            href="/teklif"
            className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Projenizi Başlatın
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
