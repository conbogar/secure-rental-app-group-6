import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-indigo-100 px-4">
      
      {/* Pure White Card with heavy shadow */}
      <div className="bg-white p-10 md:p-14 rounded-3xl shadow-2xl border border-white/50 flex flex-col items-center max-w-lg w-full">
        
        {/* Icon */}
        <div className="mb-6 p-4 bg-indigo-50 rounded-2xl text-indigo-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-logo text-indigo-800 mb-2 text-center tracking-wide">
          Haven
        </h1>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl font-semibold text-indigo-800 mb-6 text-center">
          Your Search. Your Space. Your Haven.
        </p>
        
        {/* Description */}
        <p className="text-base text-slate-600 mb-8 text-center leading-relaxed">
          Track your applications, viewings, and deadlines in one private, secure workspace.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            to="/register"
            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-xl hover:shadow-xl text-center w-full"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3.5 bg-white border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-semibold rounded-xl transition-all shadow-xl hover:shadow-xl text-center w-full"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}