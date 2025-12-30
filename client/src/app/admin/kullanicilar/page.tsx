'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Plus, Edit, Trash2, Save, X, Shield, User, Users, Lock, Calendar, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserType {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

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

export default function AdminKullanicilarPage() {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'editor' as 'admin' | 'editor',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (user?: UserType) => {
    setError('');
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        password: '',
        name: user.name,
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        password: '',
        name: '',
        role: 'editor',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingUser) {
        // Update user
        const updateData: any = {
          name: formData.name,
          role: formData.role,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }

        const response = await fetch(`${API_URL}/users/${editingUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }
      } else {
        // Create user
        if (!formData.password) {
          setError('Yeni kullanıcı için şifre gerekli.');
          return;
        }

        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }
      }

      fetchUsers();
      closeModal();
    } catch (error: any) {
      setError(error.message || 'Bir hata oluştu.');
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error);
        return;
      }

      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (currentUser?.role !== 'admin') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center h-64"
      >
        <div className="text-center bg-white rounded-2xl shadow-sm p-12 border border-gray-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Erişim Engellendi</h3>
          <p className="text-gray-500">Bu sayfaya erişim yetkiniz yok.</p>
        </div>
      </motion.div>
    );
  }

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
            <Users className="text-primary-500" size={28} />
            Kullanıcılar
          </h1>
          <p className="text-gray-500 mt-1">{users.length} kullanıcı</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-3 rounded-xl font-medium hover:from-primary-700 hover:to-primary-800 transition-all inline-flex items-center shadow-lg shadow-primary-600/20"
        >
          <Plus size={20} className="mr-2" />
          Yeni Kullanıcı
        </motion.button>
      </motion.div>

      {/* Users List */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Kullanıcı</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Kullanıcı Adı</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Rol</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden md:table-cell">Oluşturulma</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-lg ${
                            user.role === 'admin'
                              ? 'bg-gradient-to-br from-purple-500 to-purple-700 shadow-purple-500/30'
                              : 'bg-gradient-to-br from-primary-500 to-primary-700 shadow-primary-500/30'
                          }`}
                        >
                          <span className="text-white font-bold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </motion.div>
                        <div>
                          <span className="font-semibold text-gray-900 block">{user.name}</span>
                          {user.id === currentUser?.id && (
                            <span className="text-xs text-primary-600 font-medium flex items-center mt-0.5">
                              <UserCheck size={12} className="mr-1" />
                              Bu sizsiniz
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 flex items-center">
                        <User size={14} className="mr-2 text-gray-400" />
                        {user.username}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-semibold inline-flex items-center gap-1.5 ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                        {user.role === 'admin' ? 'Admin' : 'Editör'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                      <span className="flex items-center text-sm">
                        <Calendar size={14} className="mr-2 text-gray-400" />
                        {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModal(user)}
                          className="p-2.5 bg-primary-100 text-primary-600 rounded-xl hover:bg-primary-200 transition-colors"
                        >
                          <Edit size={16} />
                        </motion.button>
                        {user.id !== currentUser?.id && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteUser(user.id)}
                            className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-500">Henüz kullanıcı yok.</p>
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
              className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="text-primary-600" size={22} />
                  {editingUser ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı'}
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
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100 flex items-center gap-2"
                    >
                      <Shield size={16} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İsim *</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      placeholder="Ad Soyad"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı *</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                      disabled={!!editingUser}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:text-gray-500 transition-all"
                      placeholder="kullanici_adi"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şifre {editingUser && <span className="text-gray-400 font-normal">(boş bırakırsanız değişmez)</span>}
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required={!editingUser}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, role: 'editor' })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.role === 'editor'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <User size={24} />
                      <span className="font-medium">Editör</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, role: 'admin' })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.role === 'admin'
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <Shield size={24} />
                      <span className="font-medium">Admin</span>
                    </motion.button>
                  </div>
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
