import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      {/* Icon */}
      <div className="mb-6 text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>

      {/* Title and Subtitle */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        Secure Rental Tracker
      </h1>
      <p className="text-lg text-gray-800 mb-8 text-center max-w-md">
        Your entire rental search, in one place. Track applications, viewings, deadlines, and contacts without the chaos.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/register"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm text-center"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-8 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors shadow-sm text-center"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}