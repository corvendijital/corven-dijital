'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const platforms = [
  { id: 'ikas', name: 'İKAS' },
  { id: 'shopify', name: 'Shopify' },
  { id: 'woocommerce', name: 'WooCommerce' },
  { id: 'ticimax', name: 'Ticimax' },
  { id: 'ideasoft', name: 'IdeaSoft' },
  { id: 'other', name: 'Diğer' },
  { id: 'none', name: 'Henüz yok' },
];

const services = [
  { id: 'ecommerce', name: 'E-Ticaret Site Kurulumu' },
  { id: 'theme', name: 'Tema Geliştirme' },
  { id: 'seo', name: 'SEO Optimizasyonu' },
  { id: 'custom', name: 'Özel Yazılım Geliştirme' },
  { id: 'migration', name: 'Platform Göçü' },
  { id: 'maintenance', name: 'Bakım & Destek' },
  { id: 'consulting', name: 'Danışmanlık' },
];

const budgets = [
  { id: 'under10k', name: '10.000 TL altı' },
  { id: '10k-25k', name: '10.000 - 25.000 TL' },
  { id: '25k-50k', name: '25.000 - 50.000 TL' },
  { id: '50k-100k', name: '50.000 - 100.000 TL' },
  { id: 'over100k', name: '100.000 TL üzeri' },
  { id: 'undecided', name: 'Henüz belirlenmedi' },
];

const timelines = [
  { id: 'urgent', name: 'Acil (1-2 hafta)' },
  { id: 'short', name: 'Kısa vadeli (1 ay)' },
  { id: 'medium', name: 'Orta vadeli (1-3 ay)' },
  { id: 'long', name: 'Uzun vadeli (3+ ay)' },
  { id: 'flexible', name: 'Esnek' },
];

const sectors = [
  'Moda & Giyim',
  'Elektronik',
  'Kozmetik & Güzellik',
  'Gıda & İçecek',
  'Mobilya & Dekorasyon',
  'Spor & Outdoor',
  'Sağlık & Medikal',
  'Oyuncak & Bebek',
  'Kitap & Kırtasiye',
  'Otomotiv',
  'Diğer',
];

export default function TeklifPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Kişisel Bilgiler
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    // Step 2 - İş Bilgileri
    platform: '',
    sector: '',
    // Step 3 - Hizmetler
    selectedServices: [] as string[],
    // Step 4 - Proje Detayları
    description: '',
    budget: '',
    timeline: '',
  });

  const totalSteps = 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:4000/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services: formData.selectedServices,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      // Still show success for demo purposes
      setIsSubmitted(true);
    }

    setIsSubmitting(false);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.platform && formData.sector;
      case 3:
        return formData.selectedServices.length > 0;
      case 4:
        return formData.description && formData.budget && formData.timeline;
      default:
        return true;
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Teklif Talebiniz Alındı!</h1>
          <p className="text-lg text-gray-600 mb-8">
            En kısa sürede sizinle iletişime geçeceğiz. Genellikle 24 saat içinde dönüş yapıyoruz.
          </p>
          <a
            href="/"
            className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ücretsiz Teklif Alın</h1>
            <p className="text-xl text-primary-100">
              Projeniz hakkında bilgi verin, size özel bir teklif hazırlayalım.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-gray-100 py-4 sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  s === step
                    ? 'bg-primary-600 text-white'
                    : s < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s < step ? <CheckCircle size={20} /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Kişisel Bilgiler</span>
            <span>İş Bilgileri</span>
            <span>Hizmetler</span>
            <span>Detaylar</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <form onSubmit={handleSubmit}>
            {/* Step 1 - Kişisel Bilgiler */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kişisel Bilgiler</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="ornek@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon Numaranız *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="0555 123 45 67"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Şirket / Marka Adı
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="Şirket Adı"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                        Mevcut Web Siteniz
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - İş Bilgileri */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">İş Bilgileri</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Hangi e-ticaret altyapısını kullanıyorsunuz? *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, platform: platform.id }))}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            formData.platform === platform.id
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {platform.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                      Sektörünüz *
                    </label>
                    <select
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="">Sektör Seçin</option>
                      {sectors.map((sector) => (
                        <option key={sector} value={sector}>
                          {sector}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 - Hizmetler */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hangi Hizmetlere İhtiyacınız Var?</h2>
                <p className="text-gray-600 mb-6">Birden fazla seçebilirsiniz.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all flex items-center ${
                        formData.selectedServices.includes(service.id)
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-md border-2 mr-3 flex items-center justify-center ${
                          formData.selectedServices.includes(service.id)
                            ? 'border-primary-600 bg-primary-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {formData.selectedServices.includes(service.id) && (
                          <CheckCircle className="text-white" size={16} />
                        )}
                      </div>
                      <span
                        className={
                          formData.selectedServices.includes(service.id)
                            ? 'text-primary-700 font-medium'
                            : 'text-gray-700'
                        }
                      >
                        {service.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 - Proje Detayları */}
            {step === 4 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Proje Detayları</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Projenizi Anlatın *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                      placeholder="Projeniz hakkında detaylı bilgi verin. Ne yapmak istiyorsunuz? Özel gereksinimleriniz var mı?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Bütçe Aralığınız *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {budgets.map((budget) => (
                        <button
                          key={budget.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, budget: budget.id }))}
                          className={`p-3 rounded-lg border-2 text-center text-sm transition-all ${
                            formData.budget === budget.id
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {budget.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Zaman Çizelgesi *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timelines.map((timeline) => (
                        <button
                          key={timeline.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, timeline: timeline.id }))}
                          className={`p-3 rounded-lg border-2 text-center text-sm transition-all ${
                            formData.timeline === timeline.id
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {timeline.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Geri
                </button>
              )}
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                >
                  Devam Et
                  <ArrowRight className="ml-2" size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Teklif Talebi Gönder
                      <CheckCircle className="ml-2" size={18} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
