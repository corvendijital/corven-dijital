import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Building2, Layers, CheckCircle, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProjectDetailClient from './ProjectDetailClient';

// Mock proje data (simüle)
const projects = [
  {
    id: '1',
    title: 'ModaStyle E-Ticaret',
    slug: 'modastyle-eticaret',
    description: 'ModaStyle için İKAS altyapısında modern ve kullanıcı dostu bir e-ticaret sitesi geliştirdik.',
    fullDescription: `ModaStyle, Türkiye'nin önde gelen moda markalarından biri olarak online satış kanalını güçlendirmek istiyordu. Corven Dijital olarak, İKAS altyapısında tamamen özelleştirilmiş bir e-ticaret deneyimi sunduk.

## Proje Hedefleri

- Modern ve mobil uyumlu tasarım
- Hızlı sayfa yüklenme süreleri
- Kullanıcı dostu navigasyon
- SEO optimizasyonu

## Çözümlerimiz

### Özel Tema Geliştirme
Markanın kimliğine uygun, minimalist ve şık bir tema tasarladık. Responsive tasarım ile tüm cihazlarda mükemmel görünüm sağladık.

### Performans Optimizasyonu
Görsel optimizasyonu, lazy loading ve kod minimizasyonu ile sayfa yüklenme sürelerini %60 oranında iyileştirdik.

### SEO Çalışması
Teknik SEO düzenlemeleri ve içerik optimizasyonu ile organik trafikte %150 artış sağladık.

## Sonuçlar

Proje lansmanından 3 ay sonra:
- Dönüşüm oranı %35 arttı
- Sepet terk oranı %25 azaldı
- Mobil satışlar %80 yükseldi`,
    category: 'E-Ticaret',
    technologies: ['İKAS', 'Liquid', 'JavaScript', 'CSS', 'SEO'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800',
    ],
    client: 'ModaStyle',
    year: '2024',
    duration: '8 Hafta',
    services: ['E-Ticaret Geliştirme', 'Tema Tasarımı', 'SEO Optimizasyonu', 'Performans İyileştirme'],
    results: [
      { label: 'Dönüşüm Artışı', value: '%35' },
      { label: 'Organik Trafik', value: '%150' },
      { label: 'Sayfa Hızı', value: '%60 ↑' },
    ],
  },
  {
    id: '2',
    title: 'TechGear Online Mağaza',
    slug: 'techgear-online-magaza',
    description: 'Teknoloji ürünleri satan TechGear için SEO odaklı e-ticaret çözümü.',
    fullDescription: `TechGear, teknoloji ve elektronik ürünleri satan yenilikçi bir e-ticaret markası. Online varlıklarını güçlendirmek ve arama motorlarında üst sıralara çıkmak için Corven Dijital ile çalıştılar.

## Proje Kapsamı

TechGear için gerçekleştirdiğimiz çalışmalar:

### Teknik SEO
- Site yapısı optimizasyonu
- Schema markup implementasyonu
- Core Web Vitals iyileştirmeleri
- XML sitemap ve robots.txt düzenlemeleri

### İçerik Stratejisi
- Ürün açıklamalarının SEO odaklı yeniden yazılması
- Blog içerik planlaması
- Kategori sayfaları optimizasyonu

### E-Ticaret Geliştirmeleri
- Gelişmiş filtreleme sistemi
- Ürün karşılaştırma özelliği
- Hızlı görünüm popup'ları

## Başarılar

6 aylık çalışma sonunda:
- Google'da ilk 3'e giren anahtar kelime sayısı 5 kat arttı
- Organik trafik %200 yükseldi
- Online satışlar %120 arttı`,
    category: 'E-Ticaret',
    technologies: ['İKAS', 'SEO', 'JavaScript', 'Google Analytics'],
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800',
    ],
    client: 'TechGear',
    year: '2024',
    duration: '12 Hafta',
    services: ['SEO Optimizasyonu', 'E-Ticaret Geliştirme', 'İçerik Stratejisi'],
    results: [
      { label: 'Organik Trafik', value: '%200' },
      { label: 'Online Satış', value: '%120' },
      { label: 'Anahtar Kelime', value: '5x' },
    ],
  },
  {
    id: '3',
    title: 'Organik Bahçe',
    slug: 'organik-bahce',
    description: 'Organik ürünler satan Organik Bahçe için özel tema geliştirme projesi.',
    fullDescription: `Organik Bahçe, doğal ve organik gıda ürünleri satan bir e-ticaret markası. Marka kimliklerini yansıtan, doğal ve sıcak bir tema tasarımı istediler.

## Tasarım Konsepti

Organik Bahçe için oluşturduğumuz tasarım:

### Renk Paleti
Doğayı ve organik konsepti yansıtan yeşil tonları, toprak renkleri ve krem renklerden oluşan bir palet kullandık.

### Tipografi
Okunabilirliği yüksek, modern ama sıcak hissiyat veren font kombinasyonları seçtik.

### Görsel Dil
Ürün fotoğraflarını ön plana çıkaran, temiz ve minimal bir düzen oluşturduk.

## Özel Özellikler

- Tarif önerileri bölümü
- Ürün menşei haritası
- Sezonluk ürün gösterimi
- Abonelik sistemi

## Sonuçlar

Yeni tema ile:
- Sitede geçirilen süre %45 arttı
- Mobil kullanıcı deneyimi puanı 95'e yükseldi
- Tekrar satın alma oranı %30 arttı`,
    category: 'Tema Geliştirme',
    technologies: ['İKAS', 'Liquid', 'CSS', 'JavaScript', 'Animasyonlar'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
      'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800',
    ],
    client: 'Organik Bahçe',
    year: '2023',
    duration: '6 Hafta',
    services: ['Tema Tasarımı', 'UI/UX Tasarım', 'Özel Geliştirme'],
    results: [
      { label: 'Sitede Kalma', value: '%45 ↑' },
      { label: 'Mobil Puan', value: '95/100' },
      { label: 'Tekrar Satış', value: '%30 ↑' },
    ],
  },
  {
    id: '4',
    title: 'Spor Deposu SEO Projesi',
    slug: 'spor-deposu-seo',
    description: 'Spor Deposu için kapsamlı SEO çalışması ve içerik stratejisi.',
    fullDescription: `Spor Deposu, spor ekipmanları ve giyim ürünleri satan köklü bir e-ticaret sitesi. Yoğun rekabet ortamında organik görünürlüklerini artırmak için kapsamlı bir SEO projesi başlattık.

## SEO Stratejisi

### Anahtar Kelime Araştırması
500+ anahtar kelime analiz ettik ve yüksek potansiyelli hedef kelimeleri belirledik.

### Teknik SEO
- Site mimarisi yeniden yapılandırması
- Sayfa hızı optimizasyonu
- Mobile-first indexing uyumu
- Crawl budget optimizasyonu

### On-Page SEO
- Meta tag optimizasyonu
- Başlık hiyerarşisi düzenlemesi
- Internal linking stratejisi
- Görsel SEO çalışmaları

### Off-Page SEO
- Link building kampanyası
- Dijital PR çalışmaları
- Sosyal medya SEO entegrasyonu

## Aylık Raporlama

Her ay detaylı performans raporları sunduk:
- Sıralama değişimleri
- Trafik analizi
- Dönüşüm takibi
- Rakip analizi

## Başarılar

12 aylık çalışma sonunda:
- Organik trafik %300 arttı
- İlk sayfa sıralamaları 3 kat arttı
- Marka aramaları %180 yükseldi`,
    category: 'SEO',
    technologies: ['SEO', 'Google Analytics', 'Search Console', 'Ahrefs', 'Screaming Frog'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    ],
    client: 'Spor Deposu',
    year: '2024',
    duration: '12 Ay',
    services: ['SEO Optimizasyonu', 'İçerik Stratejisi', 'Teknik SEO', 'Link Building'],
    results: [
      { label: 'Organik Trafik', value: '%300' },
      { label: 'İlk Sayfa', value: '3x' },
      { label: 'Marka Arama', value: '%180' },
    ],
  },
  {
    id: '5',
    title: 'Mobilya Dünyası',
    slug: 'mobilya-dunyasi',
    description: 'Mobilya sektörü için kapsamlı e-ticaret çözümü ve özel filtreleme sistemi.',
    fullDescription: `Mobilya Dünyası, geniş ürün yelpazesi ile Türkiye'nin önde gelen mobilya markalarından. Online satış kanallarını modernize etmek ve kullanıcı deneyimini iyileştirmek için bizimle çalıştılar.

## Proje Zorlukları

Mobilya sektörü, e-ticaret için özel zorluklar barındırıyor:
- Büyük boyutlu görsel dosyaları
- Karmaşık ürün varyasyonları
- Detaylı filtreleme gereksinimleri
- Oda planlama ihtiyacı

## Çözümlerimiz

### Gelişmiş Filtreleme
- Çoklu filtre kombinasyonları
- Boyut, renk, malzeme, stil filtreleri
- Fiyat aralığı slider'ı
- Anlık sonuç güncelleme

### Görsel Optimizasyon
- Progressive image loading
- WebP format desteği
- 360° ürün görüntüleme
- Zoom ve gallery özellikleri

### Kullanıcı Deneyimi
- Wishlist özelliği
- Oda bazlı alışveriş
- Benzer ürün önerileri
- Kolay karşılaştırma

## Sonuçlar

Yeni site ile:
- Sayfa yüklenme süresi %70 azaldı
- Kullanıcı memnuniyeti %40 arttı
- Online satışlar %90 yükseldi`,
    category: 'E-Ticaret',
    technologies: ['İKAS', 'JavaScript', 'CSS', 'React Components'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    ],
    client: 'Mobilya Dünyası',
    year: '2024',
    duration: '10 Hafta',
    services: ['E-Ticaret Geliştirme', 'Özel Filtreleme', 'Performans Optimizasyonu'],
    results: [
      { label: 'Sayfa Hızı', value: '%70 ↑' },
      { label: 'Memnuniyet', value: '%40 ↑' },
      { label: 'Online Satış', value: '%90 ↑' },
    ],
  },
  {
    id: '6',
    title: 'Kozmetik Store Tema',
    slug: 'kozmetik-store-tema',
    description: 'Kozmetik markası için lüks ve şık özel tema tasarımı.',
    fullDescription: `Kozmetik Store, premium kozmetik ürünleri sunan lüks bir marka. Online mağazalarının marka değerini yansıtması için özel bir tema geliştirdik.

## Tasarım Felsefesi

Lüks kozmetik markası için tasarım:

### Estetik Yaklaşım
- Minimalist ve zarif tasarım
- Altın ve pembe aksanlar
- Bol beyaz alan kullanımı
- Profesyonel ürün sunumu

### Kullanıcı Deneyimi
- Sorunsuz navigasyon
- Hızlı ürün keşfi
- İlham verici içerik alanları
- Kolay checkout akışı

## Özel Özellikler

### Cilt Analizi
- İnteraktif cilt tipi testi
- Kişiselleştirilmiş ürün önerileri
- Skincare rutini oluşturucu

### Görsel Zenginlik
- Before/After görselleri
- Video entegrasyonları
- Influencer içerik bölümü
- Instagram feed entegrasyonu

### Animasyonlar
- Soft hover efektleri
- Smooth scroll animasyonları
- Ürün kartı animasyonları
- Page transitions

## Sonuçlar

Yeni tema ile:
- Marka algısı güçlendi
- Ortalama sepet değeri %55 arttı
- Premium ürün satışları 2 kat arttı`,
    category: 'Tema Geliştirme',
    technologies: ['İKAS', 'Liquid', 'CSS', 'JavaScript', 'GSAP Animasyonlar'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800',
    ],
    client: 'Kozmetik Store',
    year: '2024',
    duration: '8 Hafta',
    services: ['Tema Tasarımı', 'UI/UX Tasarım', 'Animasyon Geliştirme', 'Özel Özellikler'],
    results: [
      { label: 'Sepet Değeri', value: '%55 ↑' },
      { label: 'Premium Satış', value: '2x' },
      { label: 'Kullanıcı Puanı', value: '4.9/5' },
    ],
  },
];

// Dinamik metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Proje Bulunamadı',
    };
  }

  return {
    title: `${project.title} - ${project.category} Projesi`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Corven Dijital`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
