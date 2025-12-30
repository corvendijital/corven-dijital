import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const blogsPath = path.join(__dirname, '../data/blogs.json');

// Read blogs from JSON file
const getBlogs = async () => {
  const data = await fs.readFile(blogsPath, 'utf-8');
  return JSON.parse(data);
};

// Save blogs to JSON file
const saveBlogs = async (blogs) => {
  await fs.writeFile(blogsPath, JSON.stringify(blogs, null, 2));
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

// PUBLIC: Get all published blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await getBlogs();
    const publishedBlogs = blogs.filter((b) => b.status === 'published');
    res.json(publishedBlogs);
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// PUBLIC: Get single blog by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const blogs = await getBlogs();
    const blog = blogs.find((b) => b.slug === req.params.slug && b.status === 'published');

    if (!blog) {
      return res.status(404).json({ error: 'Blog yazısı bulunamadı.' });
    }

    // Increment views
    const blogIndex = blogs.findIndex((b) => b.id === blog.id);
    blogs[blogIndex].views = (blogs[blogIndex].views || 0) + 1;
    await saveBlogs(blogs);

    res.json(blogs[blogIndex]);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Get all blogs (including drafts)
router.get('/admin/all', authenticateToken, async (req, res) => {
  try {
    const blogs = await getBlogs();
    res.json(blogs);
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Get single blog by ID
router.get('/admin/:id', authenticateToken, async (req, res) => {
  try {
    const blogs = await getBlogs();
    const blog = blogs.find((b) => b.id === req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog yazısı bulunamadı.' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Create new blog
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      image,
      author,
      status,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Başlık ve içerik gerekli.' });
    }

    const blogs = await getBlogs();

    const newBlog = {
      id: uuidv4(),
      title,
      slug: generateSlug(title),
      excerpt: excerpt || '',
      content,
      category: category || '',
      tags: tags || [],
      image: image || '',
      author: author || 'Corven Dijital',
      status: status || 'draft',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    blogs.unshift(newBlog);
    await saveBlogs(blogs);

    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Update blog
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const blogs = await getBlogs();
    const blogIndex = blogs.findIndex((b) => b.id === req.params.id);

    if (blogIndex === -1) {
      return res.status(404).json({ error: 'Blog yazısı bulunamadı.' });
    }

    const updatedBlog = {
      ...blogs[blogIndex],
      ...req.body,
      slug: req.body.title ? generateSlug(req.body.title) : blogs[blogIndex].slug,
      updatedAt: new Date().toISOString(),
    };

    blogs[blogIndex] = updatedBlog;
    await saveBlogs(blogs);

    res.json(updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Delete blog
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const blogs = await getBlogs();
    const blogIndex = blogs.findIndex((b) => b.id === req.params.id);

    if (blogIndex === -1) {
      return res.status(404).json({ error: 'Blog yazısı bulunamadı.' });
    }

    blogs.splice(blogIndex, 1);
    await saveBlogs(blogs);

    res.json({ success: true });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

export default router;
