import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogDetailClient from './BlogDetailClient';

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
  {
    id: '4',
    title: 'Mobil E-Ticaret: Neden Önemli ve Nasıl Optimize Edilir?',
    slug: 'mobil-eticaret-optimizasyonu',
    excerpt: 'Mobil cihazlardan yapılan alışverişler artıyor. E-ticaret sitenizi mobil için optimize etmenin yollarını öğrenin.',
    content: `Mobil cihazlardan yapılan alışverişler her geçen gün artıyor. E-ticaret sitenizi mobil için optimize etmek artık bir zorunluluk.

## 1. Mobil Öncelikli Tasarım

Tasarımınızı mobil cihazlar için optimize edin. Küçük ekranlarda da mükemmel çalışan bir deneyim sunun.

### Dikkat Edilmesi Gerekenler:

- Touch-friendly butonlar
- Kolay okunabilir yazı tipi boyutları
- Hızlı yüklenme süreleri
- Basit navigasyon

## 2. Performans Optimizasyonu

Mobil kullanıcılar hız konusunda daha sabırsız. Sayfa yüklenme sürelerini minimize edin.

## 3. Ödeme Süreçleri

Mobilde checkout sürecini sadeleştirin:
- Tek sayfa checkout
- Dijital cüzdan entegrasyonları
- Kayıtlı kart bilgileri
- Biyometrik doğrulama

## Sonuç

Mobil optimizasyon, e-ticaret başarınız için kritik öneme sahip. Bu adımları uygulayarak mobil dönüşümlerinizi artırabilirsiniz.`,
    category: 'E-Ticaret',
    tags: ['Mobil', 'E-Ticaret', 'Optimizasyon'],
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
    content: `İKAS platformunda özel tema geliştirmek, markanızı rakiplerinden farklılaştırmanın en etkili yollarından biri.

## 1. Liquid Şablon Dili

İKAS, Liquid şablon dilini kullanıyor. Bu dili öğrenmek tema geliştirmenin ilk adımı.

### Temel Liquid Özellikleri:

- Değişkenler ve filtreler
- Koşullar ve döngüler
- Şablon kalıtımı
- Özel etiketler

## 2. Tema Yapısı

İKAS temalarının standart bir dosya yapısı vardır:
- Templates klasörü
- Sections klasörü
- Assets klasörü
- Config dosyaları

## 3. En İyi Pratikler

Tema geliştirirken dikkat edilmesi gerekenler:
- SEO uyumlu markup
- Performans odaklı kod
- Responsive tasarım
- Erişilebilirlik standartları

## Sonuç

İKAS tema geliştirme, güçlü ve esnek bir süreç. Doğru bilgi ve deneyimle muhteşem temalar oluşturabilirsiniz.`,
    category: 'Tema Geliştirme',
    tags: ['İKAS', 'Tema', 'Liquid', 'Geliştirme'],
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
    content: `Müşteri deneyimi, e-ticaret başarısının anahtarı. Müşterilerinize unutulmaz bir deneyim sunarak sadık müşteriler kazanın.

## 1. Kişiselleştirme

Her müşteriye özel deneyim sunun:
- Kişiselleştirilmiş ürün önerileri
- Özel kampanyalar
- İsme göre karşılama
- Satın alma geçmişine dayalı öneriler

## 2. Hızlı Destek

Müşteri sorularına hızlı yanıt verin:
- Canlı sohbet desteği
- Chatbot entegrasyonu
- Detaylı SSS bölümü
- Kolay iletişim kanalları

## 3. Kolay İade Süreci

İade sürecini basitleştirin:
- Ücretsiz iade kargo
- Kolay iade formu
- Hızlı para iadesi
- Şeffaf politikalar

## Sonuç

Müşteri deneyimine yatırım yapmak, uzun vadede işinizi büyütmenin en etkili yoludur.`,
    category: 'E-Ticaret',
    tags: ['Müşteri Deneyimi', 'E-Ticaret', 'CX'],
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    author: 'Corven Dijital',
    date: '1 Mayıs 2024',
    readTime: '5 dk',
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

  // İlgili yazıları bul (aynı kategoriden veya benzer etiketlerden)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
