'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Eye, Trash2, Search, Clock, CheckCircle, XCircle, AlertCircle, Mail, Phone, Building2, FileText, Calendar, DollarSign, Briefcase, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Proposal {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  platform: string;
  sector: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
  status: 'new' | 'reviewing' | 'approved' | 'rejected';
  notes: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const statusLabels: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  new: { label: 'Yeni', color: 'text-yellow-700', bgColor: 'bg-yellow-100', icon: AlertCircle },
  reviewing: { label: 'İnceleniyor', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: Clock },
  approved: { label: 'Onaylandı', color: 'text-green-700', bgColor: 'bg-green-100', icon: CheckCircle },
  rejected: { label: 'Reddedildi', color: 'text-red-700', bgColor: 'bg-red-100', icon: XCircle },
};

const serviceLabels: Record<string, string> = {
  ecommerce: 'E-Ticaret Site Kurulumu',
  theme: 'Tema Geliştirme',
  seo: 'SEO Optimizasyonu',
  custom: 'Özel Yazılım Geliştirme',
  migration: 'Platform Göçü',
  maintenance: 'Bakım & Destek',
  consulting: 'Danışmanlık',
};

const budgetLabels: Record<string, string> = {
  'under10k': '10.000 TL altı',
  '10k-25k': '10.000 - 25.000 TL',
  '25k-50k': '25.000 - 50.000 TL',
  '50k-100k': '50.000 - 100.000 TL',
  'over100k': '100.000 TL üzeri',
  'undecided': 'Henüz belirlenmedi',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AdminTekliflerPage() {
  const { token } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProposals();
  }, [token]);

  const fetchProposals = async () => {
    try {
      const response = await fetch(`${API_URL}/proposals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProposalStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_URL}/proposals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchProposals();
      if (selectedProposal?.id === id) {
        setSelectedProposal({ ...selectedProposal, status: status as Proposal['status'] });
      }
    } catch (error) {
      console.error('Error updating proposal:', error);
    }
  };

  const deleteProposal = async (id: string) => {
    if (!confirm('Bu teklifi silmek istediğinizden emin misiniz?')) return;

    try {
      await fetch(`${API_URL}/proposals/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProposals();
      setSelectedProposal(null);
    } catch (error) {
      console.error('Error deleting proposal:', error);
    }
  };

  const filteredProposals = proposals.filter((p) => {
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-3 border-primary-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="text-primary-500" size={28} />
            Teklifler
          </h1>
          <p className="text-gray-500 mt-1">{proposals.length} teklif talebi</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="İsim, e-posta veya şirket ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'new', 'reviewing', 'approved', 'rejected'].map((status) => {
              const isActive = filterStatus === status;
              const StatusIcon = status !== 'all' ? statusLabels[status].icon : null;
              return (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {StatusIcon && <StatusIcon size={16} />}
                  {status === 'all' ? 'Tümü' : statusLabels[status].label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProposals.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-500">Teklif bulunamadı.</p>
              </motion.div>
            ) : (
              filteredProposals.map((proposal, index) => {
                const StatusIcon = statusLabels[proposal.status].icon;
                return (
                  <motion.div
                    key={proposal.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    onClick={() => setSelectedProposal(proposal)}
                    className={`bg-white rounded-2xl shadow-sm p-5 cursor-pointer transition-all border hover:shadow-lg ${
                      selectedProposal?.id === proposal.id ? 'ring-2 ring-primary-500 border-primary-200' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold">
                            {proposal.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{proposal.name}</h3>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 ${statusLabels[proposal.status].bgColor} ${statusLabels[proposal.status].color}`}>
                              <StatusIcon size={12} />
                              {statusLabels[proposal.status].label}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <span className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                            <Mail size={14} className="mr-1.5 text-gray-400" />
                            {proposal.email}
                          </span>
                          {proposal.company && (
                            <span className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                              <Building2 size={14} className="mr-1.5 text-gray-400" />
                              {proposal.company}
                            </span>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {proposal.services?.slice(0, 2).map((service) => (
                            <span key={service} className="text-xs bg-primary-50 text-primary-600 px-2.5 py-1 rounded-lg font-medium">
                              {serviceLabels[service] || service}
                            </span>
                          ))}
                          {proposal.services?.length > 2 && (
                            <span className="text-xs text-gray-400 px-2 py-1">+{proposal.services.length - 2}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(proposal.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                        <ChevronRight size={20} className="text-gray-300 mt-4 ml-auto" />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Detail Panel */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedProposal ? (
              <motion.div
                key={selectedProposal.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-sm p-6 sticky top-4 space-y-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Teklif Detayı</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteProposal(selectedProposal.id)}
                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Durum</label>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'reviewing', 'approved', 'rejected'].map((status) => {
                      const StatusIcon = statusLabels[status].icon;
                      return (
                        <motion.button
                          key={status}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateProposalStatus(selectedProposal.id, status)}
                          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                            selectedProposal.status === status
                              ? `${statusLabels[status].bgColor} ${statusLabels[status].color} ring-2 ring-offset-1 ring-${status === 'new' ? 'yellow' : status === 'reviewing' ? 'blue' : status === 'approved' ? 'green' : 'red'}-300`
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <StatusIcon size={14} />
                          {statusLabels[status].label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Mail size={16} className="text-primary-600" />
                    </div>
                    İletişim Bilgileri
                  </h3>
                  <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-xl">
                    <p><strong className="text-gray-500">İsim:</strong> <span className="text-gray-900">{selectedProposal.name}</span></p>
                    <p><strong className="text-gray-500">E-posta:</strong> <a href={`mailto:${selectedProposal.email}`} className="text-primary-600 hover:underline">{selectedProposal.email}</a></p>
                    <p><strong className="text-gray-500">Telefon:</strong> <a href={`tel:${selectedProposal.phone}`} className="text-primary-600 hover:underline">{selectedProposal.phone}</a></p>
                    {selectedProposal.company && <p><strong className="text-gray-500">Şirket:</strong> <span className="text-gray-900">{selectedProposal.company}</span></p>}
                    {selectedProposal.website && <p><strong className="text-gray-500">Website:</strong> <a href={selectedProposal.website} target="_blank" className="text-primary-600 hover:underline">{selectedProposal.website}</a></p>}
                  </div>
                </div>

                {/* Business Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Briefcase size={16} className="text-green-600" />
                    </div>
                    İş Bilgileri
                  </h3>
                  <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-xl">
                    <p className="flex items-center gap-2">
                      <Globe size={14} className="text-gray-400" />
                      <strong className="text-gray-500">Platform:</strong> <span className="text-gray-900">{selectedProposal.platform || '-'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Building2 size={14} className="text-gray-400" />
                      <strong className="text-gray-500">Sektör:</strong> <span className="text-gray-900">{selectedProposal.sector || '-'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <DollarSign size={14} className="text-gray-400" />
                      <strong className="text-gray-500">Bütçe:</strong> <span className="text-gray-900">{budgetLabels[selectedProposal.budget] || selectedProposal.budget || '-'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <strong className="text-gray-500">Zaman:</strong> <span className="text-gray-900">{selectedProposal.timeline || '-'}</span>
                    </p>
                  </div>
                </div>

                {/* Services */}
                {selectedProposal.services?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">İstenen Hizmetler</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProposal.services.map((service) => (
                        <span key={service} className="text-xs bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg font-medium">
                          {serviceLabels[service] || service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedProposal.description && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Proje Açıklaması</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl leading-relaxed">{selectedProposal.description}</p>
                  </div>
                )}

                {/* Date */}
                <div className="pt-4 border-t text-sm text-gray-400 flex items-center gap-2">
                  <Calendar size={14} />
                  Gönderim: {new Date(selectedProposal.createdAt).toLocaleString('tr-TR')}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-sm p-12 text-center text-gray-500 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="text-gray-400" size={24} />
                </div>
                <p>Detaylarını görmek için bir teklif seçin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
