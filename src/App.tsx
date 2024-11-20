import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Farms from './pages/Farms';
import FarmDetails from './pages/FarmDetails';
import Visits from './pages/Visits';
import Reports from './pages/Reports';
import { FarmProvider } from './context/FarmContext';

function App() {
  return (
    <Router>
      <FarmProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/farms/:id" element={<FarmDetails />} />
            <Route path="/visits" element={<Visits />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </FarmProvider>
    </Router>
  );
}

export default App;