const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

// Projects
export const getProjects = () => fetchAPI<Project[]>('/projects');
export const getProject = (slug: string) => fetchAPI<Project>(`/projects/${slug}`);
export const getFeaturedProjects = () => fetchAPI<Project[]>('/projects/featured');

// Blog
export const getBlogPosts = () => fetchAPI<BlogPost[]>('/blogs');
export const getBlogPost = (slug: string) => fetchAPI<BlogPost>(`/blogs/${slug}`);

// Proposals
export const submitProposal = (data: ProposalInput) =>
  fetchAPI<{ success: boolean; id: string }>('/proposals', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// Contact
export const submitContact = (data: ContactInput) =>
  fetchAPI<{ success: boolean }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// Types
import type { Project, BlogPost } from '@/types';

export interface ProposalInput {
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
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
