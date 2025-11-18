import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { showcaseAPI } from '../../services/api';
import { translations } from '../../utils/constants';

export default function ArtworkCard({ showcase }) {
  const { language } = useLanguage();
  const t = translations[language];

  const title = language === 'zh' ? showcase.title : showcase.title_en;
  const author = showcase.author || showcase.attribution?.prompt_author || 'Unknown';

  return (
    <Link to={`/showcase/${showcase.id}`} className="card group">
      <div className="aspect-square overflow-hidden bg-gray-100">
        {showcase.imageUrl ? (
          <img
            src={showcaseAPI.getImageUrl(showcase.id)}
            alt={language === 'zh' ? showcase.alt_text : showcase.alt_text_en}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
            #{showcase.caseNumber}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {t.by} {author}
        </p>
      </div>
    </Link>
  );
}

