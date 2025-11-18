import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShowcases } from '../../hooks/useShowcases';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/constants';
import ArtworkCard from './ArtworkCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function GalleryView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const t = translations[language];

  const search = searchParams.get('search') || '';
  const author = searchParams.get('author') || '';
  const tool = searchParams.get('tool') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const filters = { search, author, tool, page };
  const { showcases, loading, error, pagination } = useShowcases(filters);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.author) params.set('author', newFilters.author);
    if (newFilters.tool) params.set('tool', newFilters.tool);
    if (newFilters.page && newFilters.page > 1) params.set('page', newFilters.page);
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={t.error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="mb-6 space-y-4">
        <SearchBar
          value={search}
          onChange={(value) => handleFilterChange({ ...filters, search: value, page: 1 })}
        />
        <FilterPanel
          author={author}
          tool={tool}
          onChange={(newFilters) => handleFilterChange({ ...filters, ...newFilters, page: 1 })}
        />
      </div>

      {showcases.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t.noResults}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {showcases.map((showcase) => (
              <ArtworkCard key={showcase.id} showcase={showcase} />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handleFilterChange({ ...filters, page: page - 1 })}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handleFilterChange({ ...filters, page: page + 1 })}
                disabled={page >= pagination.totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

