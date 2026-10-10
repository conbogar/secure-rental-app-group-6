import { createContext, useState, useEffect } from 'react';
import { mockRentals } from './mockData';

export const RentalsContext = createContext(null);

const STORAGE_KEY = 'rentals';

function loadRentals() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return mockRentals;
}

export function RentalsProvider({ children }) {
  const [rentals, setRentals] = useState(loadRentals);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rentals));
  }, [rentals]);

  const addRental = (rental) => {
    const id = rentals.length ? Math.max(...rentals.map((r) => r.id)) + 1 : 1;
    setRentals([...rentals, { ...rental, id: Number(id), rent: Number(rental.rent) }]);
  };

  const updateRental = (id, updates) => {
    setRentals(
      rentals.map((r) =>
        r.id === Number(id) ? { ...r, ...updates, rent: Number(updates.rent ?? r.rent) } : r
      )
    );
  };

  const deleteRental = (id) => {
    setRentals(rentals.filter((r) => r.id !== Number(id)));
  };

  const getRental = (id) => rentals.find((r) => r.id === Number(id));

  return (
    <RentalsContext.Provider value={{ rentals, addRental, updateRental, deleteRental, getRental }}>
      {children}
    </RentalsContext.Provider>
  );
}