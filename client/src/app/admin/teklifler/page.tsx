'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Eye, Trash2, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Mail, Phone, Building2 } from 'lucide-react';

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

const statusLabels: Record<string, { label: string; color: string; icon: any }> = {
  new: { label: 'Yeni', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  reviewing: { label: 'İnceleniyor', color: 'bg-blue-100 text-blue-700', icon: Clock },
  approved: { label: 'Onaylandı', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Reddedildi', color: 'bg-red-100 text-red-700', icon: XCircle },
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teklifler</h1>
          <p className="text-gray-600">{proposals.length} teklif</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="İsim, e-posta veya şirket ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'reviewing', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'Tümü' : statusLabels[status].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredProposals.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-gray-500">Teklif bulunamadı.</p>
            </div>
          ) : (
            filteredProposals.map((proposal) => {
              const StatusIcon = statusLabels[proposal.status].icon;
              return (
                <div
                  key={proposal.id}
                  onClick={() => setSelectedProposal(proposal)}
                  className={`bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedProposal?.id === proposal.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{proposal.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusLabels[proposal.status].color}`}>
                          {statusLabels[proposal.status].label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Mail size={14} className="mr-1" />
                          {proposal.email}
                        </span>
                        {proposal.company && (
                          <span className="flex items-center">
                            <Building2 size={14} className="mr-1" />
                            {proposal.company}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {proposal.services?.slice(0, 2).map((service) => (
                          <span key={service} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {serviceLabels[service] || service}
                          </span>
                        ))}
                        {proposal.services?.length > 2 && (
                          <span className="text-xs text-gray-500">+{proposal.services.length - 2}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {new Date(proposal.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedProposal ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Teklif Detayı</h2>
                <button
                  onClick={() => deleteProposal(selectedProposal.id)}
                  className="text-red-500 hover:text-red-600 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                <div className="flex flex-wrap gap-2">
                  {['new', 'reviewing', 'approved', 'rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateProposalStatus(selectedProposal.id, status)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedProposal.status === status
                          ? statusLabels[status].color
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {statusLabels[status].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">İletişim Bilgileri</h3>
                <div className="text-sm space-y-2">
                  <p><strong>İsim:</strong> {selectedProposal.name}</p>
                  <p><strong>E-posta:</strong> <a href={`mailto:${selectedProposal.email}`} className="text-primary-600">{selectedProposal.email}</a></p>
                  <p><strong>Telefon:</strong> <a href={`tel:${selectedProposal.phone}`} className="text-primary-600">{selectedProposal.phone}</a></p>
                  {selectedProposal.company && <p><strong>Şirket:</strong> {selectedProposal.company}</p>}
                  {selectedProposal.website && <p><strong>Website:</strong> <a href={selectedProposal.website} target="_blank" className="text-primary-600">{selectedProposal.website}</a></p>}
                </div>
              </div>

              {/* Business Info */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">İş Bilgileri</h3>
                <div className="text-sm space-y-2">
                  <p><strong>Platform:</strong> {selectedProposal.platform || '-'}</p>
                  <p><strong>Sektör:</strong> {selectedProposal.sector || '-'}</p>
                  <p><strong>Bütçe:</strong> {budgetLabels[selectedProposal.budget] || selectedProposal.budget || '-'}</p>
                  <p><strong>Zaman:</strong> {selectedProposal.timeline || '-'}</p>
                </div>
              </div>

              {/* Services */}
              {selectedProposal.services?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">İstenen Hizmetler</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProposal.services.map((service) => (
                      <span key={service} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                        {serviceLabels[service] || service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedProposal.description && (
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Proje Açıklaması</h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedProposal.description}</p>
                </div>
              )}

              {/* Date */}
              <div className="pt-4 border-t text-sm text-gray-500">
                Gönderim: {new Date(selectedProposal.createdAt).toLocaleString('tr-TR')}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
              Detaylarını görmek için bir teklif seçin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
