import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRentals } from '../data/useRentals';

export default function RentalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRental, deleteRental } = useRentals();
  const rental = getRental(id);

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete "${rental.property}"? This cannot be undone.`);
    if (confirmed) {
      deleteRental(rental.id);
      navigate('/rentals');
    }
  };

  if (!rental) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Rental not found</h1>
        <Link to="/rentals" className="text-indigo-800 font-semibold hover:underline">
          ← Back to Rentals
        </Link>
      </div>
    );
  }

  const amenities = [
    { label: '🐾 Pets allowed', value: rental.petsAllowed },
    { label: '♿ Accessible', value: rental.accessible },
    { label: '🛋 Furnished', value: rental.furnished },
    { label: '🚗 Parking', value: rental.parking },
  ].filter((a) => a.value);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/rentals')}
        className="text-indigo-800 font-semibold text-base hover:underline"
      >
        ← Back to Rentals
      </button>

      <div className="flex justify-between items-start mt-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{rental.property}</h1>
          <p className="text-slate-800 mt-1">{rental.address}, {rental.city}</p>
        </div>
        <StatusBadge status={rental.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-xl">
        <Field label="Monthly Rent" value={`$${rental.rent.toLocaleString()}`} />
        <Field label="Bedrooms" value={rental.bedrooms === 0 ? 'Studio' : rental.bedrooms} />
        <Field label="Viewing" value={rental.viewingDate ? new Date(rental.viewingDate).toLocaleString() : '—'}/>
        <Field label="Application Deadline" value={rental.deadline ? new Date(rental.deadline).toLocaleDateString() : '—'} />
        <Field label="Next Action" value={rental.nextAction} />
      </div>

      <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Contact</h2>
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <Field label="Landlord / Agent" value={rental.landlordName} />
        <Field label="Email" value={rental.landlordEmail} />
        <Field label="Phone" value={rental.landlordPhone} />
        <Field
          label="Listing"
          value={
            rental.listingUrl ? (
              <a href={rental.listingUrl} target="_blank" rel="noreferrer" className="text-indigo-800 hover:underline break-all">
                {rental.listingUrl}
              </a>
            ) : (
              '—'
            )
          }
        />
      </div>

      <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Application</h2>
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <Field label="Required Documents" value={rental.requiredDocuments || '—'} />
      </div>

      {amenities.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Amenities</h2>
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-wrap gap-3">
            {amenities.map((a) => (
              <span key={a.label} className="bg-slate-200text-slate-800 px-3 py-1.5 rounded-full text-base">
                {a.label}
              </span>
            ))}
          </div>
        </>
      )}

      <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Notes</h2>
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{rental.notes || '—'}</p>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(`/rentals/${rental.id}/edit`)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="mb-4">
      <div className="text-base uppercase tracking-wide font-semibold text-slate-800 mb-1">{label}</div>
      <div className="text-base text-slate-900">{value}</div>
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
    <span className={`px-3 py-1 rounded-full text-base font-semibold whitespace-nowrap ${classes}`}>
      {status}
    </span>
  );
}