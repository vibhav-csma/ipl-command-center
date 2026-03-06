import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BrandProvider } from './context/BrandContext';
import { Layout } from './components/layout/Layout';
import { IPLOverview } from './pages/IPLOverview';
import { BrandStreamData } from './pages/BrandStreamData';
import { BrandSocialData } from './pages/BrandSocialData';

function App() {
  return (
    <BrowserRouter>
      <BrandProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IPLOverview />} />
            <Route path="brand/stream" element={<BrandStreamData />} />
            <Route path="brand/social" element={<BrandSocialData />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrandProvider>
    </BrowserRouter>
  );
}

export default App;
