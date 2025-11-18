import { useState, useEffect } from 'react';
import { showcaseAPI } from '../../services/api';
import { translations } from '../../utils/constants';
import { useLanguage } from '../../hooks/useLanguage';

export default function FilterPanel({ author, tool, onChange }) {
  const { language } = useLanguage();
  const t = translations[language];
  const [stats, setStats] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    showcaseAPI.getStats().then((response) => {
      setStats(response.data);
    });
  }, []);

  const handleAuthorChange = (e) => {
    onChange({ author: e.target.value || '', tool });
  };

  const handleToolChange = (e) => {
    onChange({ author, tool: e.target.value || '' });
  };

  const clearFilters = () => {
    onChange({ author: '', tool: '' });
  };

  const hasFilters = author || tool;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
        >
          <span className="font-medium">{t.filter}</span>
          <svg
            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Clear Filters
          </button>
        )}
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.author}
            </label>
            <input
              type="text"
              value={author}
              onChange={handleAuthorChange}
              placeholder="Filter by author..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.tool}
            </label>
            <select
              value={tool}
              onChange={handleToolChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Tools</option>
              {stats?.tools.map((toolOption) => (
                <option key={toolOption.name} value={toolOption.name}>
                  {toolOption.name} ({toolOption.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

