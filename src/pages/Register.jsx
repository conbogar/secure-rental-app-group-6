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
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1 text-slate-900">Create Account</h1>
        <p className="text-slate-800 mb-8 text-base">Start tracking your rental applications</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
            <span className="text-base uppercase tracking-wide font-semibold text-slate-800">Name</span>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-400 rounded-xl text-base text-slate-900 bg-slate-200focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </label>

        <label className="flex flex-col gap-1.5">
            <span className="text-base uppercase tracking-wide font-semibold text-slate-800">Email</span>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-400 rounded-xl text-base text-slate-900 bg-slate-200focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </label>

        <label className="flex flex-col gap-1.5">
            <span className="text-base uppercase tracking-wide font-semibold text-slate-800">Password</span>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-400 rounded-xl text-base text-slate-900 bg-slate-200focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </label>

        <label className="flex flex-col gap-1.5">
            <span className="text-base uppercase tracking-wide font-semibold text-slate-800">Confirm Password</span>
            <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="px-3 py-2.5 border border-slate-400 rounded-xl text-base text-slate-900 bg-slate-200focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </label>

        {error && <p className="text-red-600 text-base">{error}</p>}

        <button
            type="submit"
            className="mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
        >
            Create Account
        </button>
        </form>
        <p className="mt-6 text-center text-base text-slate-800">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-800 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}