import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-sm font-medium transition-colors ${
      isActive(path) ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="text-base font-bold text-gray-900">Secure Rental Tracker</div>
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className={linkClass('/dashboard')}>
          Dashboard
        </Link>
        <Link to="/rentals" className={linkClass('/rentals')}>
          Rentals
        </Link>
        {(name || email) && (
          <span className="text-sm text-gray-500">
            Welcome, <strong className="text-gray-700">{name || email.split('@')[0]}</strong>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-md transition-colors"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}