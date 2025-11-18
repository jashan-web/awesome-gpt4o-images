import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../utils/constants';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm">
            {t.subtitle}
          </p>
          <p className="text-xs mt-2 text-gray-500">
            © 2025 GPT-4o Images Gallery. Licensed under CC BY 4.0
          </p>
        </div>
      </div>
    </footer>
  );
}

