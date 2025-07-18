import { Routes, Route } from 'react-router-dom';

import AdminLogin from './pages/Login';
import ProtectedRoute from './components/protectRoutes/Protected';
import AdminLayout from './pages/AdminLayout';

import Dashboard from './pages/Dashboard';
import AllClasses from './components/Admin/AllClasses';
import AddTrainer from './components/Admin/AddTrainer';
import TrainerDashboard from './components/Trainer/TrainerDashboard';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/Admin/AdminDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['Admin', 'Trainer']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="all-classes" element={<AllClasses />} />
        <Route path="add-trainer" element={<AddTrainer />} />
        <Route path="Admin-dashboard" element={<AdminDashboard />} />
        <Route path="Trainer-dashboard" element={<TrainerDashboard />} />
      </Route>
      <Route path="Trainer/reset" element={<ResetPassword />} />
    </Routes>
  );
}
