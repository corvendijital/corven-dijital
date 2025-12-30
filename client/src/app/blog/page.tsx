import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog - E-Ticaret ve Dijital Pazarlama İpuçları',
  description: 'E-ticaret, SEO, İKAS ve dijital pazarlama hakkında güncel blog yazıları. Uzman içerikler ve stratejiler.',
  openGraph: {
    title: 'Blog | Corven Dijital',
    description: 'E-ticaret, SEO ve dijital pazarlama hakkında güncel blog yazıları.',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
