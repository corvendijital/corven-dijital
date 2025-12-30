import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import proposalsRoutes from './routes/proposals.js';
import projectsRoutes from './routes/projects.js';
import blogsRoutes from './routes/blogs.js';
import usersRoutes from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/proposals', proposalsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Corven Dijital API is running' });
});

// Dashboard stats
app.get('/api/stats', async (req, res) => {
  try {
    const fs = await import('fs/promises');

    const proposalsData = await fs.readFile(path.join(__dirname, 'data/proposals.json'), 'utf-8');
    const projectsData = await fs.readFile(path.join(__dirname, 'data/projects.json'), 'utf-8');
    const blogsData = await fs.readFile(path.join(__dirname, 'data/blogs.json'), 'utf-8');

    const proposals = JSON.parse(proposalsData);
    const projects = JSON.parse(projectsData);
    const blogs = JSON.parse(blogsData);

    res.json({
      proposals: {
        total: proposals.length,
        new: proposals.filter(p => p.status === 'new').length,
        reviewing: proposals.filter(p => p.status === 'reviewing').length,
        approved: proposals.filter(p => p.status === 'approved').length,
      },
      projects: {
        total: projects.length,
        published: projects.filter(p => p.status === 'published').length,
        draft: projects.filter(p => p.status === 'draft').length,
      },
      blogs: {
        total: blogs.length,
        published: blogs.filter(b => b.status === 'published').length,
        draft: blogs.filter(b => b.status === 'draft').length,
        totalViews: blogs.reduce((sum, b) => sum + (b.views || 0), 0),
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Bir hata oluştu.' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Sayfa bulunamadı.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Corven Dijital API server running on http://localhost:${PORT}`);
});
