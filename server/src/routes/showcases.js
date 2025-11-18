import express from 'express';
import { getAllCases, getCaseById, getStats } from '../services/caseLoader.js';
import { getImagePath } from '../utils/yamlParser.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CASES_DIR = path.join(__dirname, '../../../cases');

const router = express.Router();

// Get all showcases with optional filtering and pagination
router.get('/', (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      author, 
      tool, 
      search,
      sort = 'desc' 
    } = req.query;
    
    const filters = { author, tool, search };
    let cases = getAllCases(filters);
    
    // Sort
    if (sort === 'asc') {
      cases = cases.sort((a, b) => a.caseNumber - b.caseNumber);
    } else {
      cases = cases.sort((a, b) => b.caseNumber - a.caseNumber);
    }
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedCases = cases.slice(startIndex, endIndex);
    
    res.json({
      cases: paginatedCases,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: cases.length,
        totalPages: Math.ceil(cases.length / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching showcases:', error);
    res.status(500).json({ error: 'Failed to fetch showcases' });
  }
});

// Get single showcase by ID
router.get('/:id', (req, res) => {
  try {
    const caseData = getCaseById(req.params.id);
    
    if (!caseData) {
      return res.status(404).json({ error: 'Showcase not found' });
    }
    
    res.json(caseData);
  } catch (error) {
    console.error('Error fetching showcase:', error);
    res.status(500).json({ error: 'Failed to fetch showcase' });
  }
});

// Serve showcase image
router.get('/:id/artwork', (req, res) => {
  try {
    const imagePath = getImagePath(req.params.id);
    
    if (!imagePath || !fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    res.sendFile(path.resolve(imagePath));
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({ error: 'Failed to serve image' });
  }
});

export default router;

