import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const projectsPath = path.join(__dirname, '../data/projects.json');

// Read projects from JSON file
const getProjects = async () => {
  const data = await fs.readFile(projectsPath, 'utf-8');
  return JSON.parse(data);
};

// Save projects to JSON file
const saveProjects = async (projects) => {
  await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2));
};

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// PUBLIC: Get all published projects
router.get('/', async (req, res) => {
  try {
    const projects = await getProjects();
    const publishedProjects = projects.filter((p) => p.status === 'published');
    res.json(publishedProjects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// PUBLIC: Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await getProjects();
    const featuredProjects = projects.filter((p) => p.status === 'published' && p.featured);
    res.json(featuredProjects);
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// PUBLIC: Get single project by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const projects = await getProjects();
    const project = projects.find((p) => p.slug === req.params.slug && p.status === 'published');

    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı.' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Get all projects (including drafts)
router.get('/admin/all', authenticateToken, async (req, res) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Get single project by ID
router.get('/admin/:id', authenticateToken, async (req, res) => {
  try {
    const projects = await getProjects();
    const project = projects.find((p) => p.id === req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı.' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Create new project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      fullDescription,
      category,
      technologies,
      image,
      gallery,
      client,
      year,
      url,
      featured,
      status,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Başlık ve açıklama gerekli.' });
    }

    const projects = await getProjects();

    const newProject = {
      id: uuidv4(),
      title,
      slug: generateSlug(title),
      description,
      fullDescription: fullDescription || '',
      category: category || '',
      technologies: technologies || [],
      image: image || '',
      gallery: gallery || [],
      client: client || '',
      year: year || new Date().getFullYear().toString(),
      url: url || '',
      featured: featured || false,
      status: status || 'draft',
      createdAt: new Date().toISOString(),
    };

    projects.unshift(newProject);
    await saveProjects(projects);

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const projects = await getProjects();
    const projectIndex = projects.findIndex((p) => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Proje bulunamadı.' });
    }

    const updatedProject = {
      ...projects[projectIndex],
      ...req.body,
      slug: req.body.title ? generateSlug(req.body.title) : projects[projectIndex].slug,
    };

    projects[projectIndex] = updatedProject;
    await saveProjects(projects);

    res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const projects = await getProjects();
    const projectIndex = projects.findIndex((p) => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Proje bulunamadı.' });
    }

    projects.splice(projectIndex, 1);
    await saveProjects(projects);

    res.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

export default router;
