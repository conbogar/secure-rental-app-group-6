import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRentals } from '../data/useRentals';

export default function RentalList() {
  const navigate = useNavigate();
  const { rentals } = useRentals();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('Any');
  const [petsOnly, setPetsOnly] = useState(false);
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [furnishedOnly, setFurnishedOnly] = useState(false);
  const [parkingOnly, setParkingOnly] = useState(false);
  const [deadlineFrom, setDeadlineFrom] = useState('');
  const [deadlineTo, setDeadlineTo] = useState('');

  const filtered = rentals.filter((r) => {
    const matchesSearch =
      r.property.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesMinRent = !minRent || r.rent >= Number(minRent);
    const matchesMaxRent = !maxRent || r.rent <= Number(maxRent);
    const matchesBedrooms =
      bedroomsFilter === 'Any' ||
      (bedroomsFilter === '3+' ? r.bedrooms >= 3 : r.bedrooms === Number(bedroomsFilter));
    const matchesPets = !petsOnly || r.petsAllowed;
    const matchesAccessible = !accessibleOnly || r.accessible;
    const matchesFurnished = !furnishedOnly || r.furnished;
    const matchesParking = !parkingOnly || r.parking;
    const matchesDeadlineFrom = !deadlineFrom || new Date(r.deadline) >= new Date(deadlineFrom);
    const matchesDeadlineTo = !deadlineTo || new Date(r.deadline) <= new Date(deadlineTo);
    return (
      matchesSearch &&
      matchesStatus &&
      matchesMinRent &&
      matchesMaxRent &&
      matchesBedrooms &&
      matchesPets &&
      matchesAccessible &&
      matchesFurnished &&
      matchesParking &&
      matchesDeadlineFrom &&
      matchesDeadlineTo
    );
  });

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setMinRent('');
    setMaxRent('');
    setBedroomsFilter('Any');
    setPetsOnly(false);
    setAccessibleOnly(false);
    setFurnishedOnly(false);
    setParkingOnly(false);
    setDeadlineFrom('');
    setDeadlineTo('');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
          <p className="text-gray-600 mt-1">
            Tracking {filtered.length} of {rentals.length} rentals
          </p>
        </div>
        <Link
          to="/rentals/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          + Add Rental
        </Link>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {/* Row 1 — search + status */}
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by property, address, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]"
          >
            <option>All</option>
            <option>Interested</option>
            <option>Applied</option>
            <option>Waiting</option>
            <option>Rejected</option>
            <option>Accepted</option>
          </select>
        </div>

        {/* Row 2 — rent + bedrooms */}
        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-sm font-medium text-gray-700">Rent range:</span>
          <input
            type="number"
            placeholder="Min"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            className="w-28 px-3 py-2.5 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            className="w-28 px-3 py-2.5 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700 ml-2">Bedrooms:</span>
          <select
            value={bedroomsFilter}
            onChange={(e) => setBedroomsFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[110px]"
          >
            <option>Any</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </div>

        {/* Row 3 — amenities */}
        <div className="flex gap-5 flex-wrap items-center">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
            <input type="checkbox" checked={petsOnly} onChange={(e) => setPetsOnly(e.target.checked)} className="accent-blue-600" />
            Pets allowed
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
            <input type="checkbox" checked={accessibleOnly} onChange={(e) => setAccessibleOnly(e.target.checked)} className="accent-blue-600" />
            Accessible
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
            <input type="checkbox" checked={furnishedOnly} onChange={(e) => setFurnishedOnly(e.target.checked)} className="accent-blue-600" />
            Furnished
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
            <input type="checkbox" checked={parkingOnly} onChange={(e) => setParkingOnly(e.target.checked)} className="accent-blue-600" />
            Parking
          </label>
        </div>

        {/* Row 4 — deadline range */}
        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-sm font-medium text-gray-700">Deadline between:</span>
          <input
            type="date"
            value={deadlineFrom}
            onChange={(e) => setDeadlineFrom(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400">–</span>
          <input
            type="date"
            value={deadlineTo}
            onChange={(e) => setDeadlineTo(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={clearFilters}
            className="ml-auto text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Clear all filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b-2 border-gray-200">
              <th className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-gray-700">Property</th>
              <th className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-gray-700">City</th>
              <th className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-gray-700">Beds</th>
              <th className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-gray-700">Rent</th>
              <th className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-gray-700">Status</th>
              <th className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-gray-700">Next Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.id}
                onClick={() => navigate(`/rentals/${r.id}`)}
                className="border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-2 py-4 text-sm text-gray-900 font-semibold">{r.property}</td>
                <td className="px-2 py-4 text-sm text-gray-600">{r.city}</td>
                <td className="px-2 py-4 text-sm text-gray-600">{r.bedrooms === 0 ? 'Studio' : r.bedrooms}</td>
                <td className="px-2 py-4 text-sm text-gray-600">${r.rent.toLocaleString()}</td>
                <td className="px-2 py-4"><StatusBadge status={r.status} /></td>
                <td className="px-2 py-4 text-sm text-gray-600">{r.nextAction}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400 text-sm">
                  No rentals match your filters. Try clearing them.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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