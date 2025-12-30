import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Mock blog data (simüle)
const blogPosts = [
  {
    id: '1',
    title: 'İKAS ile E-Ticaret Sitenizi Nasıl Büyütürsünüz?',
    slug: 'ikas-ile-eticaret-sitenizi-nasil-buyutursunuz',
    excerpt: 'İKAS altyapısının sunduğu avantajları ve e-ticaret sitenizi büyütmek için kullanabileceğiniz stratejileri keşfedin.',
    content: `İKAS, Türkiye'nin en popüler e-ticaret altyapılarından biri olarak öne çıkıyor. Peki İKAS'ı kullanarak e-ticaret sitenizi nasıl büyütebilirsiniz?

## 1. Doğru Tema Seçimi

İKAS'ın sunduğu tema seçenekleri arasından markanıza en uygun olanı seçmek önemli. Ancak özel tema geliştirme ile rakiplerinizden farklılaşabilirsiniz.

Tema seçerken dikkat edilmesi gerekenler:
- Mobil uyumluluk
- Sayfa yüklenme hızı
- SEO dostu yapı
- Kolay navigasyon

## 2. SEO Optimizasyonu

İKAS'ın SEO dostu yapısını kullanarak arama motorlarında üst sıralara çıkabilirsiniz. Meta açıklamaları, URL yapıları ve site hızı optimizasyonu kritik faktörler.

### Temel SEO Adımları:
1. Anahtar kelime araştırması yapın
2. Ürün açıklamalarını optimize edin
3. Görsel alt metinlerini doldurun
4. Site haritası oluşturun

## 3. Mobil Uyumluluk

Tüketicilerin %70'inden fazlası mobil cihazlardan alışveriş yapıyor. Mobil uyumlu bir site artık lüks değil, zorunluluk.

## 4. Müşteri Deneyimi

Kullanıcı deneyimini iyileştirmek için:
- Hızlı checkout süreci
- Çoklu ödeme seçenekleri
- Canlı destek entegrasyonu
- Kolay iade politikası

## Sonuç

Doğru strateji ve profesyonel destek ile İKAS'ta başarılı bir e-ticaret sitesi kurabilirsiniz. Corven Dijital olarak İKAS projelerinizde yanınızdayız.`,
    category: 'E-Ticaret',
    tags: ['İKAS', 'E-Ticaret', 'Online Satış'],
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
    content: `SEO dünyası sürekli evrim geçiriyor. 2024'te başarılı olmak için bu trendleri takip etmelisiniz.

## 1. Yapay Zeka ve SEO

Google'ın yapay zeka algoritmaları giderek daha sofistike hale geliyor. İçeriklerinizin gerçek değer sunması her zamankinden daha önemli.

AI araçlarını SEO'da nasıl kullanabilirsiniz:
- İçerik fikirleri oluşturma
- Anahtar kelime araştırması
- Rakip analizi
- Performans tahminleri

## 2. Core Web Vitals

Sayfa deneyimi metrikleri sıralama faktörü olmaya devam ediyor. LCP, FID ve CLS değerlerinizi optimize edin.

### Hedef Değerler:
- LCP: 2.5 saniyenin altında
- FID: 100ms'nin altında
- CLS: 0.1'in altında

## 3. E-E-A-T Önemi

Experience (Deneyim), Expertise (Uzmanlık), Authoritativeness (Otorite) ve Trustworthiness (Güvenilirlik) kriterleri daha da önem kazandı.

## 4. Video SEO

Video içerikler arama sonuçlarında daha fazla yer alıyor. YouTube ve site içi video optimizasyonuna yatırım yapın.

## 5. Sesli Arama Optimizasyonu

Sesli aramaların artmasıyla birlikte, doğal dil kullanımı ve soru-cevap formatındaki içerikler önem kazanıyor.

## Sonuç

SEO'da başarılı olmak için sürekli öğrenmek ve adapte olmak gerekiyor. 2024'te bu trendleri takip ederek rakiplerinizin önüne geçebilirsiniz.`,
    category: 'SEO',
    tags: ['SEO', 'Dijital Pazarlama', 'Google'],
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
    content: `Trafiğiniz yüksek ama satışlar beklediğiniz gibi değil mi? İşte dönüşüm oranınızı artıracak 5 strateji.

## 1. Basit Checkout Süreci

Karmaşık ödeme süreçleri sepet terk oranını artırır. Checkout adımlarını minimumda tutun.

### İpuçları:
- Misafir checkout seçeneği sunun
- Form alanlarını minimize edin
- İlerleme göstergesi kullanın
- Otomatik adres tamamlama ekleyin

## 2. Güven Sinyalleri

SSL sertifikası, müşteri yorumları ve güvenlik rozetleri kullanıcı güvenini artırır.

Eklemeniz gerekenler:
- SSL sertifikası (HTTPS)
- Ödeme güvenliği logoları
- Müşteri yorumları ve puanları
- İade garantisi bildirimi

## 3. Hızlı Site Performansı

Her 1 saniyelik gecikme, dönüşüm oranını %7 düşürebilir. Site hızını optimize edin.

## 4. Kaliteli Ürün Görselleri

Profesyonel ürün fotoğrafları ve farklı açılardan görüntüler satışları artırır.

### Görsel İpuçları:
- Yüksek çözünürlüklü fotoğraflar
- 360 derece görünüm
- Zoom özelliği
- Lifestyle görselleri

## 5. Aciliyet Yaratın

Stok sayacı, kampanya süreleri gibi elementlerle aciliyet duygusu oluşturun.

## Sonuç

Bu stratejileri uygulayarak dönüşüm oranınızı önemli ölçüde artırabilirsiniz. Her değişikliği A/B test ile ölçmeyi unutmayın.`,
    category: 'E-Ticaret',
    tags: ['Dönüşüm', 'E-Ticaret', 'UX'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    author: 'Corven Dijital',
    date: '10 Mart 2024',
    readTime: '6 dk',
  },
];

// Dinamik metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Markdown'ı basit HTML'e çevir
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${line.replace('## ', '')}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">${line.replace('### ', '')}</h3>`;
        }
        if (line.startsWith('- ')) {
          return `<li class="text-gray-600 ml-4">${line.replace('- ', '')}</li>`;
        }
        if (line.match(/^\d+\. /)) {
          return `<li class="text-gray-600 ml-4">${line.replace(/^\d+\. /, '')}</li>`;
        }
        if (line.trim() === '') {
          return '<br />';
        }
        return `<p class="text-gray-600 mb-4">${line}</p>`;
      })
      .join('');
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Tüm Yazılar
          </Link>
          <span className="inline-block bg-primary-600 text-white text-sm px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <span className="flex items-center">
              <User size={16} className="mr-2" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock size={16} className="mr-2" />
              {post.readTime} okuma
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center flex-wrap gap-2">
            <Tag size={18} className="text-gray-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Projeniz İçin Destek mi Arıyorsunuz?
          </h2>
          <p className="text-gray-600 mb-6">
            E-ticaret ve dijital pazarlama konusunda uzman ekibimizle tanışın.
          </p>
          <Link
            href="/teklif"
            className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Ücretsiz Teklif Alın
          </Link>
        </div>
      </section>
    </>
  );
}
