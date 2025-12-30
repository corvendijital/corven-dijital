'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  BookOpen,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Teklifler', href: '/admin/teklifler', icon: FileText },
  { name: 'Projeler', href: '/admin/projeler', icon: FolderKanban },
  { name: 'Blog', href: '/admin/blog', icon: BookOpen },
  { name: 'Kullanıcılar', href: '/admin/kullanicilar', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      >
        {isMobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isMobileMenuOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : -280) }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 border-b border-white/10"
          >
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30"
              >
                <Image
                  src="/logo.png"
                  alt="Corven Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </motion.div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">Corven</span>
                <span className="text-2xl font-light text-gray-500">Admin</span>
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/30'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-400'}`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 border-t border-white/10"
          >
            <div className="flex items-center mb-4 p-3 bg-white/5 rounded-xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-primary-500/30"
              >
                <span className="text-white font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Administrator' : 'Editör'}</p>
              </div>
            </div>
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center w-full px-4 py-3 text-gray-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
            >
              <LogOut size={20} className="mr-3 group-hover:text-red-400" />
              <span className="font-medium">Çıkış Yap</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
