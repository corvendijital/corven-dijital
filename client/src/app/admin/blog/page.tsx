'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Save, X } from 'lucide-react';
import Image from 'next/image';

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Yazıları</h1>
          <p className="text-gray-600">{blogs.length} yazı</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors inline-flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Yeni Yazı
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Yazı veya kategori ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Yazı</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Kategori</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500 hidden lg:table-cell">Görüntüleme</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Durum</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {blog.image && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                        <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900 line-clamp-1">{blog.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-gray-600">{blog.category || '-'}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm text-gray-600">{blog.views || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    blog.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {blog.status === 'published' ? 'Yayında' : 'Taslak'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleStatus(blog)}
                      className={`p-2 rounded-lg transition-colors ${
                        blog.status === 'published'
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                      title={blog.status === 'published' ? 'Gizle' : 'Yayınla'}
                    >
                      {blog.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => openModal(blog)}
                      className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Henüz blog yazısı yok.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingBlog ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Özet</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kapak Görseli URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.status === 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yayınla</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
                >
                  <Save size={18} className="mr-2" />
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
