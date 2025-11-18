import express from 'express';
import { getStats } from '../services/caseLoader.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;

