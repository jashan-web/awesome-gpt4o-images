import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CASES_DIR = path.join(__dirname, '../../../cases');

export function loadAllCases() {
  const caseDirs = fs.readdirSync(CASES_DIR);
  const numericDirs = caseDirs.filter(dir => !isNaN(dir) && fs.statSync(path.join(CASES_DIR, dir)).isDirectory());
  
  const cases = numericDirs.map(dir => {
    try {
      const caseNumber = parseInt(dir);
      const casePath = path.join(CASES_DIR, dir, 'case.yml');
      const attributionPath = path.join(CASES_DIR, dir, 'ATTRIBUTION.yml');
      
      if (!fs.existsSync(casePath)) {
        return null;
      }
      
      const caseData = yaml.load(fs.readFileSync(casePath, 'utf8'));
      const attributionData = fs.existsSync(attributionPath) 
        ? yaml.load(fs.readFileSync(attributionPath, 'utf8'))
        : {};
      
      // Get image file
      const caseDir = path.join(CASES_DIR, dir);
      const files = fs.readdirSync(caseDir);
      const imageFile = files.find(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
      
      return {
        id: caseNumber,
        caseNumber,
        ...caseData,
        attribution: attributionData,
        imagePath: imageFile ? path.join(dir, imageFile) : null,
        imageUrl: imageFile ? `/api/showcases/${caseNumber}/artwork` : null
      };
    } catch (error) {
      console.error(`Error loading case ${dir}:`, error.message);
      return null;
    }
  }).filter(c => c !== null);
  
  // Sort by case number descending (newest first)
  cases.sort((a, b) => b.caseNumber - a.caseNumber);
  
  return cases;
}

export function loadCaseById(id) {
  const caseDir = path.join(CASES_DIR, String(id));
  
  if (!fs.existsSync(caseDir)) {
    return null;
  }
  
  try {
    const casePath = path.join(caseDir, 'case.yml');
    const attributionPath = path.join(caseDir, 'ATTRIBUTION.yml');
    
    if (!fs.existsSync(casePath)) {
      return null;
    }
    
    const caseData = yaml.load(fs.readFileSync(casePath, 'utf8'));
    const attributionData = fs.existsSync(attributionPath)
      ? yaml.load(fs.readFileSync(attributionPath, 'utf8'))
      : {};
    
    // Get image file
    const files = fs.readdirSync(caseDir);
    const imageFile = files.find(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
    
    return {
      id: parseInt(id),
      caseNumber: parseInt(id),
      ...caseData,
      attribution: attributionData,
      imagePath: imageFile ? path.join(String(id), imageFile) : null,
      imageUrl: imageFile ? `/api/showcases/${id}/artwork` : null
    };
  } catch (error) {
    console.error(`Error loading case ${id}:`, error.message);
    return null;
  }
}

export function getImagePath(id) {
  const caseDir = path.join(CASES_DIR, String(id));
  
  if (!fs.existsSync(caseDir)) {
    return null;
  }
  
  const files = fs.readdirSync(caseDir);
  const imageFile = files.find(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
  
  return imageFile ? path.join(caseDir, imageFile) : null;
}

