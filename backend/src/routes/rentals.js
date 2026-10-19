
const express = require('express');
const router = express.Router();

// Temporary in-memory storage for rental records.
// This data will be lost when the server restarts.
let rentals = [];
let nextId = 1;

// GET /api/rentals
// Return all saved rentals.
router.get('/', (req, res) => {
  res.json(rentals);
});

// GET /api/rentals/:id
// Return one rental using its ID.
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const rental = rentals.find((item) => item.id === id);

  if (!rental) {
    return res.status(404).json({
      error: 'Rental not found.',
    });
  }

  res.json(rental);
});

// POST /api/rentals
// Create a new rental after validating required fields.
router.post('/', (req, res) => {
  const {
    propertyName,
    address,
    city,
    monthlyRent,
  } = req.body;

  if (
    typeof propertyName !== 'string' ||
    !propertyName.trim() ||
    typeof address !== 'string' ||
    !address.trim() ||
    typeof city !== 'string' ||
    !city.trim() ||
    monthlyRent === undefined ||
    monthlyRent === null ||
    monthlyRent === ''
  ) {
    return res.status(400).json({
      error: 'Property name, address, city, and monthly rent are required.',
    });
  }

  const rent = Number(monthlyRent);

  if (!Number.isFinite(rent) || rent < 0) {
    return res.status(400).json({
      error: 'Monthly rent must be a valid non-negative number.',
    });
  }

  const rental = {
    id: nextId++,
    propertyName: propertyName.trim(),
    address: address.trim(),
    city: city.trim(),
    monthlyRent: rent,
    status: 'Interested',
    createdAt: new Date().toISOString(),
  };

  rentals.push(rental);

  res.status(201).json(rental);
});

// PUT /api/rentals/:id
// Update an existing rental.
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = rentals.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: 'Rental not found.',
    });
  }

  const updated = { ...rentals[index] };
  const { propertyName, address, city, monthlyRent, status } = req.body;

  if (propertyName !== undefined) {
    if (typeof propertyName !== 'string' || !propertyName.trim()) {
      return res.status(400).json({
        error: 'Property name cannot be empty.',
      });
    }
    updated.propertyName = propertyName.trim();
  }

  if (address !== undefined) {
    if (typeof address !== 'string' || !address.trim()) {
      return res.status(400).json({
        error: 'Address cannot be empty.',
      });
    }
    updated.address = address.trim();
  }

  if (city !== undefined) {
    if (typeof city !== 'string' || !city.trim()) {
      return res.status(400).json({
        error: 'City cannot be empty.',
      });
    }
    updated.city = city.trim();
  }

  if (monthlyRent !== undefined) {
    if (
      monthlyRent === null ||
      monthlyRent === '' ||
      !Number.isFinite(Number(monthlyRent)) ||
      Number(monthlyRent) < 0
    ) {
      return res.status(400).json({
        error: 'Monthly rent must be a valid non-negative number.',
      });
    }
    updated.monthlyRent = Number(monthlyRent);
  }

  if (status !== undefined) {
    if (typeof status !== 'string' || !status.trim()) {
      return res.status(400).json({
        error: 'Status cannot be empty.',
      });
    }
    updated.status = status.trim();
  }

  rentals[index] = updated;

  res.json(updated);
});

// DELETE /api/rentals/:id
// Delete an existing rental.
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = rentals.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: 'Rental not found.',
    });
  }

  const deletedRental = rentals.splice(index, 1)[0];

  res.json({
    message: 'Rental deleted successfully.',
    rental: deletedRental,
  });
});

module.exports = router;
