import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RentalList from './pages/RentalList';
import RentalDetail from './pages/RentalDetail';
import Nav from './components/Nav';
import RentalForm from './pages/RentalForm';
import { RentalsProvider } from './data/RentalsContext';
import Register from './pages/Register';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const location = useLocation();
  const showNav = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/rentals" element={<ProtectedRoute><RentalList /></ProtectedRoute>} />
        <Route path="/rentals/new" element={<ProtectedRoute><RentalForm /></ProtectedRoute>} />
        <Route path="/rentals/:id" element={<ProtectedRoute><RentalDetail /></ProtectedRoute>} />
        <Route path="/rentals/:id/edit" element={<ProtectedRoute><RentalForm /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RentalsProvider>
        <AppContent />
      </RentalsProvider>
    </BrowserRouter>
  );
}