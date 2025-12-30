'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Star, Save, X, FolderKanban, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  technologies: string[];
  image: string;
  client: string;
  year: string;
  url: string;
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const categories = ['E-Ticaret', 'Tema Geliştirme', 'SEO', 'Özel Yazılım'];

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

export default function AdminProjelerPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    category: '',
    technologies: '',
    image: '',
    client: '',
    year: new Date().getFullYear().toString(),
    url: '',
    featured: false,
    status: 'draft' as 'draft' | 'published',
  });

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        fullDescription: project.fullDescription,
        category: project.category,
        technologies: project.technologies.join(', '),
        image: project.image,
        client: project.client,
        year: project.year,
        url: project.url,
        featured: project.featured,
        status: project.status,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        fullDescription: '',
        category: '',
        technologies: '',
        image: '',
        client: '',
        year: new Date().getFullYear().toString(),
        url: '',
        featured: false,
        status: 'draft',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        await fetch(`${API_URL}/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        });
      } else {
        await fetch(`${API_URL}/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        });
      }
      fetchProjects();
      closeModal();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;

    try {
      await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const toggleStatus = async (project: Project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      await fetch(`${API_URL}/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchProjects();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      await fetch(`${API_URL}/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ featured: !project.featured }),
      });
      fetchProjects();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase())
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
            <FolderKanban className="text-primary-500" size={28} />
            Projeler
          </h1>
          <p className="text-gray-500 mt-1">{projects.length} proje</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-3 rounded-xl font-medium hover:from-primary-700 hover:to-primary-800 transition-all inline-flex items-center shadow-lg shadow-primary-600/20"
        >
          <Plus size={20} className="mr-2" />
          Yeni Proje
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Proje veya müşteri ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-gray-50 hover:bg-white transition-colors"
          />
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="relative h-48">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <FolderKanban size={40} className="text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFeatured(project);
                    }}
                    className={`p-2 rounded-xl transition-all shadow-lg ${
                      project.featured
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white/90 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600'
                    }`}
                    title={project.featured ? 'Öne çıkarmayı kaldır' : 'Öne çıkar'}
                  >
                    <Star size={16} fill={project.featured ? 'currentColor' : 'none'} />
                  </motion.button>
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg ${
                    project.status === 'published'
                      ? 'bg-green-500 text-white'
                      : 'bg-white/90 text-gray-600'
                  }`}>
                    {project.status === 'published' ? 'Yayında' : 'Taslak'}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-bold text-white text-lg drop-shadow-lg">{project.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-3">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {project.year}
                  </span>
                  <span>•</span>
                  <span>{project.client}</span>
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{project.description}</p>

                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-400 px-1">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleStatus(project)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                      project.status === 'published'
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {project.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                    {project.status === 'published' ? 'Gizle' : 'Yayınla'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openModal(project)}
                    className="p-2.5 bg-primary-100 text-primary-600 rounded-xl hover:bg-primary-200 transition-colors"
                  >
                    <Edit size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteProject(project.id)}
                    className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderKanban className="text-gray-400" size={32} />
          </div>
          <p className="text-gray-500">Henüz proje yok.</p>
        </motion.div>
      )}

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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FolderKanban className="text-primary-600" size={22} />
                  {editingProject ? 'Projeyi Düzenle' : 'Yeni Proje'}
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Proje Adı *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kısa Açıklama *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detaylı Açıklama</label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Müşteri</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Yıl</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teknolojiler (virgülle ayırın)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="İKAS, JavaScript, CSS"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Görsel URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Proje URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium flex items-center gap-1.5">
                      <Star size={16} className="text-yellow-500" />
                      Öne Çıkan
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.status === 'published'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium flex items-center gap-1.5">
                      <Eye size={16} className="text-green-500" />
                      Hemen Yayınla
                    </span>
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
