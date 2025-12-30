import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

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

const categories = ['Tümü', 'E-Ticaret', 'SEO', 'Tema Geliştirme'];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-primary-100">
              E-ticaret, SEO ve dijital pazarlama hakkında güncel içerikler, ipuçları ve stratejiler.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <div className="mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`} className="group">
              <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-primary-600 font-medium mb-2">{blogPosts[0].category}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2" />
                    <span>{blogPosts[0].date}</span>
                    <span className="mx-3">•</span>
                    <Clock size={16} className="mr-2" />
                    <span>{blogPosts[0].readTime} okuma</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white text-sm px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock size={14} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              E-Bültenimize Abone Olun
            </h2>
            <p className="text-gray-600 mb-8">
              E-ticaret ve dijital pazarlama hakkında en güncel içerikleri e-posta adresinize gönderelim.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
