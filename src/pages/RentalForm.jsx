import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRentals } from '../data/useRentals';

const STATUSES = ['Interested', 'Applied', 'Waiting', 'Rejected', 'Accepted'];

const emptyForm = {
  property: '',
  address: '',
  city: '',
  bedrooms: '',
  rent: '',
  landlordName: '',
  landlordEmail: '',
  landlordPhone: '',
  listingUrl: '',
  viewingDate: '',
  deadline: '',
  status: 'Interested',
  requiredDocuments: '',
  nextAction: '',
  notes: '',
  petsAllowed: false,
  accessible: false,
  furnished: false,
  parking: false,
};

export default function RentalForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addRental, getRental, updateRental } = useRentals();

  const isEdit = Boolean(id);
  const existing = isEdit ? getRental(id) : null;

  const [form, setForm] = useState(existing ? { ...emptyForm, ...existing } : emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (name, checked) => {
    setForm({ ...form, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateRental(id, form);
    } else {
      addRental(form);
    }
    navigate('/rentals');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/rentals')}
        className="text-blue-600 font-semibold text-sm hover:underline"
      >
        ← Back to Rentals
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">
        {isEdit ? 'Edit Rental' : 'Log a Rental'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
        <SectionTitle>Property</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Property Name" name="property" value={form.property} onChange={handleChange} required />
          <Field label="Address" name="address" value={form.address} onChange={handleChange} required />
          <Field label="City" name="city" value={form.city} onChange={handleChange} />
          <Field label="Bedrooms" name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} />
          <Field label="Monthly Rent ($)" name="rent" type="number" value={form.rent} onChange={handleChange} required />
          <Field label="Listing URL" name="listingUrl" value={form.listingUrl} onChange={handleChange} />
        </div>

        <SectionTitle>Contact</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Landlord / Agent Name" name="landlordName" value={form.landlordName} onChange={handleChange} />
          <Field label="Email" name="landlordEmail" type="email" value={form.landlordEmail} onChange={handleChange} />
          <Field label="Phone" name="landlordPhone" value={form.landlordPhone} onChange={handleChange} />
        </div>

        <SectionTitle>Application</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Viewing Date & Time" name="viewingDate" type="datetime-local" value={form.viewingDate} onChange={handleChange} />
          <Field label="Application Deadline" name="deadline" type="date" value={form.deadline} onChange={handleChange} />
          <Field label="Status" name="status" value={form.status} onChange={handleChange} options={STATUSES} />
          <Field label="Required Documents" name="requiredDocuments" value={form.requiredDocuments} onChange={handleChange} />
        </div>

        <SectionTitle>Amenities</SectionTitle>
        <div className="flex flex-wrap gap-6">
          <Checkbox label="Pets Allowed" name="petsAllowed" checked={form.petsAllowed} onChange={handleCheckbox} />
          <Checkbox label="Accessible" name="accessible" checked={form.accessible} onChange={handleCheckbox} />
          <Checkbox label="Furnished" name="furnished" checked={form.furnished} onChange={handleCheckbox} />
          <Checkbox label="Parking" name="parking" checked={form.parking} onChange={handleCheckbox} />
        </div>

        <SectionTitle>Follow-Up</SectionTitle>
        <Field label="Next Action" name="nextAction" value={form.nextAction} onChange={handleChange} />
        <Field label="Notes" name="notes" value={form.notes} onChange={handleChange} textarea />

        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            {isEdit ? 'Save Changes' : 'Save Rental'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/rentals')}
            className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-base font-semibold text-gray-900 mt-6 mb-3 first:mt-0">
      {children}
    </h2>
  );
}

function Field({ label, name, value, onChange, type = 'text', required = false, options, textarea = false }) {
  const inputClass =
    'px-3 py-2.5 border border-gray-300 rounded-lg text-base text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <label className="flex flex-col gap-1.5 mb-1">
      <span className="text-xs uppercase tracking-wide font-semibold text-gray-600">
        {label}
      </span>
      {options ? (
        <select name={name} value={value} onChange={onChange} className={inputClass}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : textarea ? (
        <textarea name={name} value={value} onChange={onChange} rows={3} className={inputClass} />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClass}
        />
      )}
    </label>
  );
}

function Checkbox({ label, name, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(name, e.target.checked)}
        className="accent-blue-600 w-4 h-4"
      />
      {label}
    </label>
  );
}