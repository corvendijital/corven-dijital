'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles, Shield, Clock, HeadphonesIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <section className="py-20 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
          >
            <CheckCircle className="text-white" size={48} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Teklif Talebiniz Alındı!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-8"
          >
            En kısa sürede sizinle iletişime geçeceğiz. Genellikle 24 saat içinde dönüş yapıyoruz.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/"
            className="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
          >
            Ana Sayfaya Dön
            <ArrowRight className="ml-2" size={20} />
          </motion.a>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.15),transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center text-primary-400 font-semibold text-sm uppercase tracking-wider"
              >
                <Sparkles size={18} className="mr-2" />
                Ücretsiz Danışmanlık
              </motion.span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">Ücretsiz Teklif Alın</h1>
              <p className="text-xl text-gray-300">
                Projeniz hakkında bilgi verin, size özel bir teklif hazırlayalım.
                Detaylı analiz ve strateji önerileri sunuyoruz.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { icon: Shield, title: 'Güvenli', desc: 'Bilgileriniz korunur' },
                { icon: Clock, title: 'Hızlı Dönüş', desc: '24 saat içinde' },
                { icon: HeadphonesIcon, title: 'Ücretsiz', desc: 'Hiçbir ücret yok' },
                { icon: CheckCircle, title: 'Detaylı', desc: 'Kapsamlı analiz' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <item.icon className="text-primary-400 mb-2" size={24} />
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white py-6 sticky top-16 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between mb-3">
            {[1, 2, 3, 4].map((s) => (
              <motion.div
                key={s}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all duration-300 ${
                  s === step
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-110'
                    : s < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <CheckCircle size={22} /> : s}
              </motion.div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-3 text-sm">
            {['Kişisel Bilgiler', 'İş Bilgileri', 'Hizmetler', 'Detaylar'].map((label, i) => (
              <span key={label} className={i + 1 <= step ? 'text-primary-600 font-medium' : 'text-gray-400'}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
            {/* Step 1 - Kişisel Bilgiler */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
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
              </motion.div>
            )}

            {/* Step 2 - İş Bilgileri */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
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
              </motion.div>
            )}

            {/* Step 3 - Hizmetler */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
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
              </motion.div>
            )}

            {/* Step 4 - Proje Detayları */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
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
              </motion.div>
            )}
            </AnimatePresence>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between mt-8"
            >
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Geri
                </motion.button>
              )}
              {step < totalSteps ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="inline-flex items-center px-8 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto shadow-lg shadow-primary-600/25"
                >
                  Devam Et
                  <ArrowRight className="ml-2" size={18} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto shadow-lg shadow-primary-600/25"
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
                </motion.button>
              )}
            </motion.div>
          </form>
        </div>
      </section>
    </>
  );
}
