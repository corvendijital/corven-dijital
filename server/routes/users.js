import express from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth.js';

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

// ADMIN: Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
    }

    const users = await getUsers();
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Create new user
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
    }

    const { username, password, name, role } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({ error: 'Kullanıcı adı, şifre ve isim gerekli.' });
    }

    const users = await getUsers();

    // Check if username exists
    if (users.some((u) => u.username === username)) {
      return res.status(400).json({ error: 'Bu kullanıcı adı zaten kullanılıyor.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      name,
      role: role || 'editor',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers(users);

    const { password: _, ...safeUser } = newUser;
    res.status(201).json(safeUser);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Update user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
    }

    const { name, role, password } = req.body;
    const users = await getUsers();
    const userIndex = users.findIndex((u) => u.id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    if (name) {
      users[userIndex].name = name;
    }
    if (role) {
      users[userIndex].role = role;
    }
    if (password) {
      users[userIndex].password = await bcrypt.hash(password, 10);
    }

    await saveUsers(users);

    const { password: _, ...safeUser } = users[userIndex];
    res.json(safeUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Delete user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok.' });
    }

    // Prevent deleting self
    if (req.params.id === req.user.id) {
      return res.status(400).json({ error: 'Kendinizi silemezsiniz.' });
    }

    const users = await getUsers();
    const userIndex = users.findIndex((u) => u.id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    users.splice(userIndex, 1);
    await saveUsers(users);

    res.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

export default router;
