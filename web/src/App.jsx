import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import CaseDetailPage from './pages/CaseDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="showcase/:id" element={<CaseDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

