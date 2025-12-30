import { Metadata } from 'next';
import HakkimizdaPageClient from './HakkimizdaPageClient';

export const metadata: Metadata = {
  title: 'Hakkımızda - Corven Dijital Ekibi',
  description: 'Corven Dijital olarak İKAS e-ticaret çözümleri, SEO ve dijital pazarlama alanında uzman ekibimizle tanışın.',
  openGraph: {
    title: 'Hakkımızda | Corven Dijital',
    description: 'İKAS e-ticaret çözümleri ve dijital pazarlama alanında uzman ekibimiz.',
  },
};

export default function HakkimizdaPage() {
  return <HakkimizdaPageClient />;
}
