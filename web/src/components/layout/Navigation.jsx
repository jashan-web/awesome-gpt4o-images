import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/constants';

export default function Navigation() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              {t.title}
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t.backToGallery}
            </Link>
            
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {language === 'en' ? '中文' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

