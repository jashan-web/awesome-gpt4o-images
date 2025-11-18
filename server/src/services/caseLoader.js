import { loadAllCases, loadCaseById } from '../utils/yamlParser.js';

let casesCache = null;
let cacheTimestamp = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedCases() {
  const now = Date.now();
  
  if (casesCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_TTL) {
    return casesCache;
  }
  
  casesCache = loadAllCases();
  cacheTimestamp = now;
  return casesCache;
}

export function getAllCases(filters = {}) {
  let cases = getCachedCases();
  
  // Apply filters
  if (filters.author) {
    cases = cases.filter(c => 
      c.author?.toLowerCase().includes(filters.author.toLowerCase()) ||
      c.attribution?.prompt_author?.toLowerCase().includes(filters.author.toLowerCase())
    );
  }
  
  if (filters.tool) {
    cases = cases.filter(c => 
      c.attribution?.creation_tool?.toLowerCase() === filters.tool.toLowerCase()
    );
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    cases = cases.filter(c =>
      c.title?.toLowerCase().includes(searchLower) ||
      c.title_en?.toLowerCase().includes(searchLower) ||
      c.prompt?.toLowerCase().includes(searchLower) ||
      c.prompt_en?.toLowerCase().includes(searchLower)
    );
  }
  
  return cases;
}

export function getCaseById(id) {
  return loadCaseById(id);
}

export function getStats() {
  const cases = getCachedCases();
  const tools = {};
  const authors = {};
  
  cases.forEach(c => {
    const tool = c.attribution?.creation_tool || 'Unknown';
    tools[tool] = (tools[tool] || 0) + 1;
    
    const author = c.author || c.attribution?.prompt_author || 'Unknown';
    authors[author] = (authors[author] || 0) + 1;
  });
  
  return {
    totalCases: cases.length,
    tools: Object.keys(tools).map(tool => ({
      name: tool,
      count: tools[tool]
    })),
    topAuthors: Object.entries(authors)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  };
}

export function clearCache() {
  casesCache = null;
  cacheTimestamp = null;
}

