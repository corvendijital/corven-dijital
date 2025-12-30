import express from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const usersPath = path.join(__dirname, '../data/users.json');

// Read users from JSON file
const getUsers = async () => {
  const data = await fs.readFile(usersPath, 'utf-8');
  return JSON.parse(data);
};

// Save users to JSON file
const saveUsers = async (users) => {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
};

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli.' });
    }

    const users = await getUsers();
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre.' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const users = await getUsers();
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Change password
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Mevcut şifre ve yeni şifre gerekli.' });
    }

    const users = await getUsers();
    const userIndex = users.findIndex((u) => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, users[userIndex].password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Mevcut şifre hatalı.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    users[userIndex].password = hashedPassword;

    await saveUsers(users);

    res.json({ message: 'Şifre başarıyla değiştirildi.' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

export default router;
