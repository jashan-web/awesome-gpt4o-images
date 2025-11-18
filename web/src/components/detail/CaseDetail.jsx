import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShowcase } from '../../hooks/useShowcases';
import { useLanguage } from '../../hooks/useLanguage';
import { showcaseAPI } from '../../services/api';
import { translations } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import PromptViewer from './PromptViewer';
import AttributionInfo from './AttributionInfo';
import ImageModal from './ImageModal';

export default function CaseDetail({ id }) {
  const { showcase, loading, error } = useShowcase(id);
  const { language } = useLanguage();
  const t = translations[language];
  const [imageModalOpen, setImageModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !showcase) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={t.error} />
      </div>
    );
  }

  const title = language === 'zh' ? showcase.title : showcase.title_en;
  const altText = language === 'zh' ? showcase.alt_text : showcase.alt_text_en;
  const author = showcase.author || showcase.attribution?.prompt_author || 'Unknown';
  const authorLink = showcase.author_link || showcase.attribution?.prompt_author_link;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg
          className="h-5 w-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t.backToGallery}
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
                 onClick={() => setImageModalOpen(true)}>
              {showcase.imageUrl ? (
                <img
                  src={showcaseAPI.getImageUrl(showcase.id)}
                  alt={altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {t.caseNumber} #{showcase.caseNumber}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>{t.by}</span>
                {authorLink ? (
                  <a
                    href={authorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {author}
                  </a>
                ) : (
                  <span className="font-medium">{author}</span>
                )}
              </div>
            </div>

            <PromptViewer showcase={showcase} />

            <AttributionInfo showcase={showcase} />
          </div>
        </div>
      </div>

      {imageModalOpen && (
        <ImageModal
          imageUrl={showcaseAPI.getImageUrl(showcase.id)}
          alt={altText}
          onClose={() => setImageModalOpen(false)}
        />
      )}
    </div>
  );
}

