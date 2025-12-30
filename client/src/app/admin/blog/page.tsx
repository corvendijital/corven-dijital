'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Save, X, BookOpen, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  status: 'draft' | 'published';
  views: number;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const categories = ['E-Ticaret', 'SEO', 'Tema Geliştirme', 'Dijital Pazarlama', 'Teknoloji'];

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

export default function AdminBlogPage() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    image: '',
    author: 'Corven Dijital',
    status: 'draft' as 'draft' | 'published',
  });

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        tags: blog.tags.join(', '),
        image: blog.image,
        author: blog.author,
        status: blog.status,
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        image: '',
        author: 'Corven Dijital',
        status: 'draft',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingBlog) {
        await fetch(`${API_URL}/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blogData),
        });
      } else {
        await fetch(`${API_URL}/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blogData),
        });
      }
      fetchBlogs();
      closeModal();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) return;

    try {
      await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const toggleStatus = async (blog: BlogPost) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      await fetch(`${API_URL}/blogs/${blog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <BookOpen className="text-primary-500" size={28} />
            Blog Yazıları
          </h1>
          <p className="text-gray-500 mt-1">{blogs.length} yazı</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-3 rounded-xl font-medium hover:from-primary-700 hover:to-primary-800 transition-all inline-flex items-center shadow-lg shadow-primary-600/20"
        >
          <Plus size={20} className="mr-2" />
          Yeni Yazı
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Yazı veya kategori ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-colors"
          />
        </div>
      </motion.div>

      {/* Blog List */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Yazı</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Kategori</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">Görüntüleme</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Durum</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredBlogs.map((blog, index) => (
                  <motion.tr
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {blog.image ? (
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden mr-4 flex-shrink-0 shadow-sm">
                            <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gray-100 mr-4 flex items-center justify-center flex-shrink-0">
                            <BookOpen size={20} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-1">{blog.title}</h3>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Calendar size={12} className="mr-1" />
                            {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {blog.category ? (
                        <span className="text-sm bg-primary-50 text-primary-600 px-3 py-1 rounded-lg font-medium inline-flex items-center">
                          <Tag size={12} className="mr-1" />
                          {blog.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Eye size={14} className="mr-1.5 text-gray-400" />
                        {blog.views || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {blog.status === 'published' ? 'Yayında' : 'Taslak'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleStatus(blog)}
                          className={`p-2.5 rounded-xl transition-colors ${
                            blog.status === 'published'
                              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                          title={blog.status === 'published' ? 'Gizle' : 'Yayınla'}
                        >
                          {blog.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal(blog)}
                          className="p-2.5 bg-primary-100 text-primary-600 rounded-xl hover:bg-primary-200 transition-colors"
                        >
                          <Edit size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteBlog(blog.id)}
                          className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-500">Henüz blog yazısı yok.</p>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="text-primary-600" size={22} />
                  {editingBlog ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Seçin</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Yazar</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-all"
                    placeholder="Kısa açıklama..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İçerik *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-all font-mono text-sm"
                    placeholder="Markdown formatında yazabilirsiniz..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etiketler (virgülle ayırın)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="E-Ticaret, SEO, İKAS"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kapak Görseli URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="publishCheckbox"
                    checked={formData.status === 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="publishCheckbox" className="ml-3 text-sm text-gray-700 font-medium">
                    Hemen yayınla
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    İptal
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all inline-flex items-center justify-center font-medium shadow-lg shadow-primary-600/20"
                  >
                    <Save size={18} className="mr-2" />
                    Kaydet
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
