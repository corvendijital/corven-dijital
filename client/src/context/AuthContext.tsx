'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Demo kullanıcı - backend olmadan tasarımı görüntülemek için
const DEMO_USER: User = {
  id: 'demo-1',
  username: 'demo',
  name: 'Demo Kullanıcı',
  role: 'admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Demo modu kontrolü - URL'de ?demo=true varsa veya Vercel'de ise
    const urlParams = new URLSearchParams(window.location.search);
    const demoMode = urlParams.get('demo') === 'true';
    const isVercel = window.location.hostname.includes('vercel.app');

    if (demoMode || isVercel) {
      // Demo modunda fake kullanıcı ile giriş yap
      setUser(DEMO_USER);
      setToken('demo-token');
      setIsDemo(true);
      setIsLoading(false);
      return;
    }

    // Check for stored token
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token is invalid
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    // Demo modunda direkt giriş yap
    if (username === 'demo' && password === 'demo') {
      setUser(DEMO_USER);
      setToken('demo-token');
      setIsDemo(true);
      router.push('/admin/dashboard');
      return;
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Giriş başarısız');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    router.push('/admin/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsDemo(false);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, isDemo }}>
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
