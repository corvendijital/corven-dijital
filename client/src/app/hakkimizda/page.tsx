import { Users, Target, Award, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Target,
    title: 'Sonuç Odaklılık',
    description: 'Her projede ölçülebilir sonuçlar hedefliyor, müşterilerimizin başarısını kendi başarımız olarak görüyoruz.',
  },
  {
    icon: Award,
    title: 'Kalite',
    description: 'En yüksek standartlarda iş çıkarmak için sürekli kendimizi geliştiriyor, en iyi teknolojileri kullanıyoruz.',
  },
  {
    icon: Users,
    title: 'İşbirliği',
    description: 'Müşterilerimizle yakın çalışarak, onların vizyonunu anlamak ve hayata geçirmek için birlikte hareket ediyoruz.',
  },
  {
    icon: Heart,
    title: 'Tutku',
    description: 'İşimizi seviyoruz. Her projede aynı heyecan ve özveriyle çalışıyor, fark yaratan işler ortaya koyuyoruz.',
  },
];

const team = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Kurucu & CEO',
    description: '10+ yıl e-ticaret deneyimi ile sektörün önde gelen isimlerinden.',
  },
  {
    name: 'Mehmet Kaya',
    role: 'Teknik Direktör',
    description: 'İKAS platformunda uzmanlaşmış, full-stack geliştirici.',
  },
];

const stats = [
  { value: '150+', label: 'Tamamlanan Proje' },
  { value: '50+', label: 'Mutlu Müşteri' },
  { value: '5+', label: 'Yıl Deneyim' },
  { value: '%95', label: 'Memnuniyet' },
];

export default function HakkimizdaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hakkımızda</h1>
            <p className="text-xl text-primary-100">
              Corven Dijital olarak, e-ticaret dünyasında işletmelerin dijital dönüşümüne liderlik ediyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Corven Dijital, e-ticaret sektöründeki yılların deneyimi ve dijital pazarlama tutkusuyla
                  kurulmuş bir dijital ajans. İKAS platformunda uzmanlaşmış ekibimizle, işletmelerin
                  online satış hedeflerine ulaşmasına yardımcı oluyoruz.
                </p>
                <p>
                  Müşterilerimizin başarısını kendi başarımız olarak görüyor, her projede aynı özveri
                  ve profesyonellikle çalışıyoruz. Amacımız sadece bir web sitesi kurmak değil,
                  sürdürülebilir büyüme sağlayan dijital çözümler sunmak.
                </p>
                <p>
                  Bugün, 50'den fazla mutlu müşteri ve 150'den fazla başarılı proje ile
                  Türkiye'nin önde gelen İKAS ajanslarından biri olmanın gururunu yaşıyoruz.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-6 bg-white rounded-xl shadow-sm">
                    <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              İş yapış şeklimizi şekillendiren temel ilkeler
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-md">
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-5">
                  <value.icon className="text-primary-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ekibimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deneyimli ve tutkulu profesyonellerden oluşan ekibimiz
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-8 shadow-md text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="text-primary-600" size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Neden Bizi Tercih Etmelisiniz?
              </h2>
              <div className="space-y-4">
                {[
                  'İKAS platformunda sertifikalı uzman ekip',
                  'Sonuç odaklı, ölçülebilir başarılar',
                  'Şeffaf iletişim ve düzenli raporlama',
                  '7/24 teknik destek hizmeti',
                  'Rekabetçi fiyatlandırma',
                  'Proje sonrası sürekli destek',
                ].map((item) => (
                  <div key={item} className="flex items-center">
                    <CheckCircle className="text-primary-400 mr-3 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-400 mb-8">
                E-ticaret yolculuğunuzda yanınızda olmak için sabırsızlanıyoruz.
              </p>
              <Link
                href="/teklif"
                className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Hemen Başlayalım
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
