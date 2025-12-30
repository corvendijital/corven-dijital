'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FileText, FolderKanban, BookOpen, Eye, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  proposals: {
    total: number;
    new: number;
    reviewing: number;
    approved: number;
  };
  projects: {
    total: number;
    published: number;
    draft: number;
  };
  blogs: {
    total: number;
    published: number;
    draft: number;
    totalViews: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Hoş geldiniz, {user?.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Proposals */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600" size={24} />
            </div>
            {stats?.proposals.new && stats.proposals.new > 0 && (
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                {stats.proposals.new} Yeni
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.proposals.total || 0}</h3>
          <p className="text-gray-600">Toplam Teklif</p>
          <Link href="/admin/teklifler" className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block">
            Görüntüle →
          </Link>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FolderKanban className="text-green-600" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.projects.total || 0}</h3>
          <p className="text-gray-600">Toplam Proje</p>
          <p className="text-sm text-gray-500 mt-1">
            {stats?.projects.published || 0} yayında, {stats?.projects.draft || 0} taslak
          </p>
        </div>

        {/* Blogs */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-purple-600" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.blogs.total || 0}</h3>
          <p className="text-gray-600">Blog Yazısı</p>
          <p className="text-sm text-gray-500 mt-1">
            {stats?.blogs.published || 0} yayında, {stats?.blogs.draft || 0} taslak
          </p>
        </div>

        {/* Views */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="text-orange-600" size={24} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats?.blogs.totalViews || 0}</h3>
          <p className="text-gray-600">Blog Görüntüleme</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Proposal Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Teklif Durumları</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="text-yellow-500 mr-2" size={18} />
                <span className="text-gray-600">Yeni</span>
              </div>
              <span className="font-semibold text-gray-900">{stats?.proposals.new || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="text-blue-500 mr-2" size={18} />
                <span className="text-gray-600">İnceleniyor</span>
              </div>
              <span className="font-semibold text-gray-900">{stats?.proposals.reviewing || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span className="text-gray-600">Onaylandı</span>
              </div>
              <span className="font-semibold text-gray-900">{stats?.proposals.approved || 0}</span>
            </div>
          </div>
          <Link
            href="/admin/teklifler"
            className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg text-center block hover:bg-primary-700 transition-colors"
          >
            Teklifleri Yönet
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="space-y-3">
            <Link
              href="/admin/projeler?action=new"
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FolderKanban className="text-primary-600 mr-3" size={20} />
              <span className="text-gray-700">Yeni Proje Ekle</span>
            </Link>
            <Link
              href="/admin/blog?action=new"
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <BookOpen className="text-primary-600 mr-3" size={20} />
              <span className="text-gray-700">Yeni Blog Yazısı</span>
            </Link>
            <a
              href="/"
              target="_blank"
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Eye className="text-primary-600 mr-3" size={20} />
              <span className="text-gray-700">Siteyi Görüntüle</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
