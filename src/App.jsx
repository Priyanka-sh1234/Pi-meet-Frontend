import { Routes, Route } from 'react-router-dom';
import First from "./pages/First";
import AdminLogin from './pages/Login';
import ProtectedRoute from './components/protectRoutes/Protected';
import AdminLayout from './pages/adminLayout';

import Dashboard from './components/Dashboard';
import AllClasses from './components/AllClasses';
import AddTrainer from './components/AddTrainer';
import UpdateTrainer from './components/UpdateTrainer';
import AddGuest from './components/AddGuest';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<First />} />
      <Route path="/login" element={<AdminLogin />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="AdminDashboard" element={<Dashboard />} />
        <Route path="all-classes" element={<AllClasses />} />
        <Route path="add-trainer" element={<AddTrainer />} />
        <Route path="update-trainer" element={<UpdateTrainer />} />
        <Route path="add-guest" element={<AddGuest />} />
      </Route>
    </Routes>
  );
}
