import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import PerformanceDatabase from './pages/PerformanceDatabase';
import ExamSimulation from './pages/ExamSimulation';
import DecaCoachAi from './pages/DecaCoachAi';
import CareerClusters from './pages/CareerClusters';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Onboarding from './pages/Onboarding';
import RoleplayBank from './pages/RoleplayBank';
import RoleplaySession from './pages/RoleplaySession';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="database" element={<PerformanceDatabase />} />
          <Route path="simulation" element={<ExamSimulation />} />
          <Route path="coach" element={<DecaCoachAi />} />
          <Route path="clusters" element={<CareerClusters />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="roleplays" element={<RoleplayBank />} />
          <Route path="roleplay/:id" element={<RoleplaySession />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
