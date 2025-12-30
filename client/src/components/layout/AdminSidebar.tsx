'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  BookOpen,
  Users,
  LogOut,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

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
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-primary-400">Corven</span>
              <span className="text-2xl font-light text-gray-400">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center mb-4 px-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.role === 'admin' ? 'Admin' : 'Editör'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
