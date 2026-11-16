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
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-base font-medium transition-colors ${
      isActive(path) ? 'text-indigo-800' : 'text-slate-800 hover:text-slate-900'
    }`;

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-400 sticky top-0 z-10">
      <Link to="/" className="flex items-center gap-2">
        <div className="p-1.5 bg-indigo-600 rounded-xl text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <span className="text-2xl font-logo text-indigo-800 tracking-wide">Haven</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className={linkClass('/dashboard')}>
          Dashboard
        </Link>
        <Link to="/rentals" className={linkClass('/rentals')}>
          Rentals
        </Link>
        {(name || email) && (
          <span className="text-base text-slate-800">
            Welcome, <strong className="text-slate-800">{name || email.split('@')[0]}</strong>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-slate-200hover:bg-gray-200 text-slate-800 text-base font-semibold rounded-md transition-colors"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}