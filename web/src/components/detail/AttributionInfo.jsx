import { useLanguage } from '../../hooks/useLanguage';

export default function AttributionInfo({ showcase }) {
  const { language } = useLanguage();
  const attribution = showcase.attribution || {};

  if (!attribution.license && !attribution.creation_tool && !attribution.date) {
    return null;
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Attribution</h3>
      <div className="space-y-2 text-sm text-gray-600">
        {attribution.creation_tool && (
          <div>
            <span className="font-medium">Creation Tool:</span> {attribution.creation_tool}
          </div>
        )}
        {attribution.license && (
          <div>
            <span className="font-medium">License:</span> {attribution.license}
          </div>
        )}
        {attribution.date && (
          <div>
            <span className="font-medium">Date:</span> {attribution.date}
          </div>
        )}
        {attribution.notes && (
          <div>
            <span className="font-medium">Notes:</span> {attribution.notes}
          </div>
        )}
      </div>
    </div>
  );
}

