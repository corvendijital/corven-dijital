'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FileText, FolderKanban, BookOpen, Eye, TrendingUp, Clock, CheckCircle, AlertCircle, ArrowRight, Plus, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Dashboard
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="text-primary-500" size={24} />
            </motion.span>
          </h1>
          <p className="text-gray-500 mt-1">Hoş geldiniz, <span className="text-primary-600 font-medium">{user?.name}</span>!</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <ExternalLink size={18} />
            Siteyi Görüntüle
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Proposals */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <FileText className="text-white" size={24} />
            </motion.div>
            {stats?.proposals.new && stats.proposals.new > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full"
              >
                {stats.proposals.new} Yeni
              </motion.span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats?.proposals.total || 0}</h3>
          <p className="text-gray-500 mt-1">Toplam Teklif</p>
          <Link href="/admin/teklifler" className="text-sm text-primary-600 hover:text-primary-700 mt-3 inline-flex items-center font-medium group">
            Görüntüle
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Projects */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30"
            >
              <FolderKanban className="text-white" size={24} />
            </motion.div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats?.projects.total || 0}</h3>
          <p className="text-gray-500 mt-1">Toplam Proje</p>
          <p className="text-sm text-gray-400 mt-3">
            <span className="text-green-500 font-medium">{stats?.projects.published || 0}</span> yayında,{' '}
            <span className="text-orange-500 font-medium">{stats?.projects.draft || 0}</span> taslak
          </p>
        </motion.div>

        {/* Blogs */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <BookOpen className="text-white" size={24} />
            </motion.div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats?.blogs.total || 0}</h3>
          <p className="text-gray-500 mt-1">Blog Yazısı</p>
          <p className="text-sm text-gray-400 mt-3">
            <span className="text-green-500 font-medium">{stats?.blogs.published || 0}</span> yayında,{' '}
            <span className="text-orange-500 font-medium">{stats?.blogs.draft || 0}</span> taslak
          </p>
        </motion.div>

        {/* Views */}
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30"
            >
              <Eye className="text-white" size={24} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center text-green-500 text-sm font-medium"
            >
              <TrendingUp size={16} className="mr-1" />
              +12%
            </motion.div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{stats?.blogs.totalViews || 0}</h3>
          <p className="text-gray-500 mt-1">Blog Görüntüleme</p>
        </motion.div>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Proposal Status */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Teklif Durumları</h2>
            <Link href="/admin/teklifler" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Tümünü Gör
            </Link>
          </div>
          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <AlertCircle className="text-yellow-600" size={18} />
                </div>
                <span className="text-gray-700 font-medium">Yeni Teklifler</span>
              </div>
              <span className="font-bold text-yellow-600 text-lg">{stats?.proposals.new || 0}</span>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-3 bg-blue-50 rounded-xl"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="text-blue-600" size={18} />
                </div>
                <span className="text-gray-700 font-medium">İnceleniyor</span>
              </div>
              <span className="font-bold text-blue-600 text-lg">{stats?.proposals.reviewing || 0}</span>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-3 bg-green-50 rounded-xl"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle className="text-green-600" size={18} />
                </div>
                <span className="text-gray-700 font-medium">Onaylandı</span>
              </div>
              <span className="font-bold text-green-600 text-lg">{stats?.proposals.approved || 0}</span>
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mt-6">
            <Link
              href="/admin/teklifler"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-xl text-center block hover:from-primary-700 hover:to-primary-800 transition-all font-medium shadow-lg shadow-primary-600/20"
            >
              Teklifleri Yönet
            </Link>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
          <div className="space-y-3">
            <motion.div whileHover={{ x: 5, scale: 1.01 }}>
              <Link
                href="/admin/projeler?action=new"
                className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <Plus className="text-primary-600" size={22} />
                </div>
                <div>
                  <span className="text-gray-900 font-medium block">Yeni Proje Ekle</span>
                  <span className="text-gray-500 text-sm">Portföyünüze yeni proje ekleyin</span>
                </div>
                <ArrowRight size={18} className="ml-auto text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 5, scale: 1.01 }}>
              <Link
                href="/admin/blog?action=new"
                className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <BookOpen className="text-primary-600" size={22} />
                </div>
                <div>
                  <span className="text-gray-900 font-medium block">Yeni Blog Yazısı</span>
                  <span className="text-gray-500 text-sm">Blog içeriği oluşturun</span>
                </div>
                <ArrowRight size={18} className="ml-auto text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 5, scale: 1.01 }}>
              <a
                href="/"
                target="_blank"
                className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <ExternalLink className="text-primary-600" size={22} />
                </div>
                <div>
                  <span className="text-gray-900 font-medium block">Siteyi Görüntüle</span>
                  <span className="text-gray-500 text-sm">Canlı siteyi yeni sekmede açın</span>
                </div>
                <ArrowRight size={18} className="ml-auto text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
