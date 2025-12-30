'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simülasyon kullanıcı - her zaman giriş yapılmış gibi davran
const DEMO_USER: User = {
  id: '1',
  username: 'admin',
  name: 'Admin Kullanıcı',
  role: 'admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Her zaman giriş yapılmış durumda başla
  const [user] = useState<User | null>(DEMO_USER);
  const [token] = useState<string | null>('demo-token');
  const [isLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    // Simülasyon - direkt dashboard'a yönlendir
    router.push('/admin/dashboard');
  };

  const logout = () => {
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
