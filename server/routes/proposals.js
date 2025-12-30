import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const proposalsPath = path.join(__dirname, '../data/proposals.json');

// Read proposals from JSON file
const getProposals = async () => {
  const data = await fs.readFile(proposalsPath, 'utf-8');
  return JSON.parse(data);
};

// Save proposals to JSON file
const saveProposals = async (proposals) => {
  await fs.writeFile(proposalsPath, JSON.stringify(proposals, null, 2));
};

// PUBLIC: Create new proposal (from website form)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      website,
      platform,
      sector,
      services,
      description,
      budget,
      timeline,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Ad, e-posta ve telefon gerekli.' });
    }

    const proposals = await getProposals();

    const newProposal = {
      id: uuidv4(),
      name,
      email,
      phone,
      company: company || '',
      website: website || '',
      platform: platform || '',
      sector: sector || '',
      services: services || [],
      description: description || '',
      budget: budget || '',
      timeline: timeline || '',
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
    };

    proposals.unshift(newProposal);
    await saveProposals(proposals);

    res.status(201).json({ success: true, id: newProposal.id });
  } catch (error) {
    console.error('Create proposal error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Get all proposals
router.get('/', authenticateToken, async (req, res) => {
  try {
    const proposals = await getProposals();
    res.json(proposals);
  } catch (error) {
    console.error('Get proposals error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Get single proposal
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const proposals = await getProposals();
    const proposal = proposals.find((p) => p.id === req.params.id);

    if (!proposal) {
      return res.status(404).json({ error: 'Teklif bulunamadı.' });
    }

    res.json(proposal);
  } catch (error) {
    console.error('Get proposal error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Update proposal status/notes
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const proposals = await getProposals();
    const proposalIndex = proposals.findIndex((p) => p.id === req.params.id);

    if (proposalIndex === -1) {
      return res.status(404).json({ error: 'Teklif bulunamadı.' });
    }

    if (status) {
      proposals[proposalIndex].status = status;
    }
    if (notes !== undefined) {
      proposals[proposalIndex].notes = notes;
    }

    await saveProposals(proposals);

    res.json(proposals[proposalIndex]);
  } catch (error) {
    console.error('Update proposal error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// ADMIN: Delete proposal
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const proposals = await getProposals();
    const proposalIndex = proposals.findIndex((p) => p.id === req.params.id);

    if (proposalIndex === -1) {
      return res.status(404).json({ error: 'Teklif bulunamadı.' });
    }

    proposals.splice(proposalIndex, 1);
    await saveProposals(proposals);

    res.json({ success: true });
  } catch (error) {
    console.error('Delete proposal error:', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

export default router;
