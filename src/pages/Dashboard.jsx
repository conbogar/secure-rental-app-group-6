import { useNavigate } from 'react-router-dom';
import { useRentals } from '../data/useRentals';

export default function Dashboard() {
  const navigate = useNavigate();
  const now = new Date();
  const { rentals } = useRentals();
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  const upcomingViewings = rentals
    .filter((r) => new Date(r.viewingDate) > now)
    .sort((a, b) => new Date(a.viewingDate) - new Date(b.viewingDate));

  const upcomingDeadlines = rentals
    .filter((r) => new Date(r.deadline) > now)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const recentActivity = [...rentals].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
            Welcome{name ? `, ${name}` : email ? `, ${email.split('@')[0]}` : ''}
        </h1>
        <p className="text-gray-500 mt-1">Your rental search at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section
          title="Upcoming Viewings"
          items={upcomingViewings}
          dateField="viewingDate"
          label="Viewing"
          onItemClick={(id) => navigate(`/rentals/${id}`)}
        />
        <Section
          title="Upcoming Deadlines"
          items={upcomingDeadlines}
          dateField="deadline"
          label="Deadline"
          onItemClick={(id) => navigate(`/rentals/${id}`)}
        />
      </div>

      <h2 className="mt-10 mb-4 text-xl font-semibold text-gray-900">Recent Activity</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        {recentActivity.map((r) => (
          <div
            key={r.id}
            onClick={() => navigate(`/rentals/${r.id}`)}
            className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors -mx-2 px-2 rounded"
          >
            <div>
              <p className="font-semibold text-gray-900">{r.property}</p>
              <p className="text-sm text-gray-500">{r.address}, {r.city}</p>
            </div>
            <StatusBadge status={r.status} />
          </div>
        ))}
        {recentActivity.length === 0 && (
          <p className="text-gray-400 text-sm py-4">No activity yet.</p>
        )}
      </div>
    </div>
  );
}

function Section({ title, items, dateField, label, onItemClick }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm">Nothing upcoming.</p>
      ) : (
        items.map((r) => (
          <div
            key={r.id}
            onClick={() => onItemClick(r.id)}
            className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors -mx-2 px-2 rounded"
          >
            <div>
              <p className="font-semibold text-gray-900">{r.property}</p>
              <p className="text-sm text-gray-500">{r.nextAction}</p>
            </div>
            <div className="text-sm text-blue-600 font-semibold whitespace-nowrap ml-4">
              {label}: {new Date(r[dateField]).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Interested: 'bg-blue-100 text-blue-800',
    Applied: 'bg-amber-100 text-amber-800',
    Waiting: 'bg-indigo-100 text-indigo-800',
    Rejected: 'bg-red-100 text-red-800',
    Accepted: 'bg-green-100 text-green-800',
  };
  const classes = colors[status] || colors.Interested;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
      {status}
    </span>
  );
}