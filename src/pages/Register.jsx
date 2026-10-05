import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    localStorage.setItem('token', 'mock-token-123');
    localStorage.setItem('email', email);
    localStorage.setItem('name', name);
    localStorage.setItem(`user_${email}`, JSON.stringify({ name, email }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1 text-gray-900">Create Account</h1>
        <p className="text-gray-500 mb-8 text-sm">Start tracking your rental applications</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wide font-semibold text-gray-600">Name</span>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </label>

        <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wide font-semibold text-gray-600">Email</span>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </label>

        <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wide font-semibold text-gray-600">Password</span>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </label>

        <label className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-wide font-semibold text-gray-600">Confirm Password</span>
            <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </label>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
            type="submit"
            className="mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
            Create Account
        </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}