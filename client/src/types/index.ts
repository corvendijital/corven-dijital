export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  technologies: string[];
  image: string;
  gallery: string[];
  client: string;
  year: string;
  url: string;
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string;
}

export interface BlogPost {
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

export interface Proposal {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  platform: string;
  sector: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
  status: 'new' | 'reviewing' | 'approved' | 'rejected';
  createdAt: string;
  notes: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}
