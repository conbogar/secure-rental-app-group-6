import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userRaw = localStorage.getItem(`user_${email}`);
    if (userRaw) {
      const { name } = JSON.parse(userRaw);
      localStorage.setItem('name', name);
    }
    localStorage.setItem('token', 'mock-token-123');
    localStorage.setItem('email', email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1 text-slate-900">Haven</h1>
        <p className="text-slate-800 mb-8 text-base">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-base uppercase tracking-wide font-semibold text-gray-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2.5 border border-slate-400 rounded-xl text-base text-slate-900 bg-slate-200focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-base uppercase tracking-wide font-semibold text-gray-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2.5 border border-slate-400 rounded-xl text-base text-slate-900 bg-slate-200focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <button
            type="submit"
            className="mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-800 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
