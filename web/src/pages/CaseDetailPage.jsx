import { useParams } from 'react-router-dom';
import CaseDetail from '../components/detail/CaseDetail';

export default function CaseDetailPage() {
  const { id } = useParams();
  return <CaseDetail id={id} />;
}

