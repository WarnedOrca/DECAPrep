import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudentDashboard from './pages/StudentDashboard';
import PerformanceDatabase from './pages/PerformanceDatabase';
import ExamSimulation from './pages/ExamSimulation';
import DecaCoachAi from './pages/DecaCoachAi';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="database" element={<PerformanceDatabase />} />
          <Route path="simulation" element={<ExamSimulation />} />
          <Route path="coach" element={<DecaCoachAi />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
