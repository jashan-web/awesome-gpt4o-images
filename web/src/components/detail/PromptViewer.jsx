import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/constants';
import { showcaseAPI } from '../../services/api';

export default function PromptViewer({ showcase }) {
  const { language } = useLanguage();
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const prompt = language === 'zh' ? showcase.prompt : showcase.prompt_en;
  const promptNote = language === 'zh' ? showcase.prompt_note : showcase.prompt_note_en;
  const referenceNote = language === 'zh' ? showcase.reference_note : showcase.reference_note_en;

  const handleCopyPrompt = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{t.prompt}</h2>
          {prompt && (
            <button
              onClick={handleCopyPrompt}
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{copied ? t.promptCopied : t.copyPrompt}</span>
            </button>
          )}
        </div>
        {prompt ? (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">{prompt}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">No prompt available</p>
        )}
      </div>

      {promptNote && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            {t.promptNote}
          </h3>
          <p className="text-sm text-gray-600">{promptNote}</p>
        </div>
      )}

      {referenceNote && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            {t.referenceNote}
          </h3>
          <p className="text-sm text-gray-600">{referenceNote}</p>
        </div>
      )}

      {showcase.source_links && showcase.source_links.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            {t.sourceLink}
          </h3>
          <div className="space-y-1">
            {showcase.source_links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-primary-600 hover:text-primary-700 truncate"
              >
                {link.url}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

