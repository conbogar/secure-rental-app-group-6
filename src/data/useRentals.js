import { useContext } from 'react';
import { RentalsContext } from './RentalsContext';

export function useRentals() {
  const ctx = useContext(RentalsContext);
  if (!ctx) throw new Error('useRentals must be used inside RentalsProvider');
  return ctx;
}