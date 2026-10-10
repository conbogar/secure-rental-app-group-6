import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RentalList from './pages/RentalList';
import RentalDetail from './pages/RentalDetail';
import Nav from './components/Nav';
import RentalForm from './pages/RentalForm';
import { RentalsProvider } from './data/RentalsContext';
import Register from './pages/Register';

function AppContent() {
  const location = useLocation();
  const showNav = !['/login', '/register'].includes(location.pathname)

  return (
    <>
      {showNav && <Nav />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rentals" element={<RentalList />} />
        <Route path="/rentals/new" element={<RentalForm />} />
        <Route path="/rentals/:id" element={<RentalDetail />} />
        <Route path="/rentals/:id/edit" element={<RentalForm />} />
        <Route path="/register" element={<Register />} />
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