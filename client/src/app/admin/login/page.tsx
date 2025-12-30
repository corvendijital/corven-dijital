'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Eye, EyeOff, Lock, User, ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message || 'Giriş başarısız');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      {/* Back to website link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6"
      >
        <Link
          href="/"
          className="flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Ana Siteye Dön
        </Link>
      </motion.div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30"
            >
              <Image
                src="/logo.png"
                alt="Corven Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </motion.div>
            <h1 className="text-3xl font-bold">
              <span className="text-primary-600">Corven</span>
              <span className="text-gray-700">Admin</span>
            </h1>
            <p className="text-gray-500 mt-2 flex items-center justify-center gap-2">
              <Shield size={16} className="text-primary-500" />
              Yönetim Paneli
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100 flex items-center"
              >
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <Lock size={16} />
                </div>
                {error}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                  placeholder="Kullanıcı adınız"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-primary-600/30"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <LogIn className="mr-2" size={20} />
                    Giriş Yap
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Demo credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
          >
            <p className="text-sm text-gray-600 font-medium mb-2 flex items-center">
              <span className="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
                <User size={14} className="text-primary-600" />
              </span>
              Demo Giriş Bilgileri
            </p>
            <div className="space-y-1 ml-8">
              <p className="text-sm text-gray-500">
                Kullanıcı: <code className="bg-white px-2 py-0.5 rounded-md border border-gray-200 text-primary-600 font-mono">admin</code>
              </p>
              <p className="text-sm text-gray-500">
                Şifre: <code className="bg-white px-2 py-0.5 rounded-md border border-gray-200 text-primary-600 font-mono">admin123</code>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 text-gray-500 text-sm"
        >
          © {new Date().getFullYear()} Corven Dijital
        </motion.p>
      </div>
    </div>
  );
}
