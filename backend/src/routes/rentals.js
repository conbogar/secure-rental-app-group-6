const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/rentals
// Return all rental records stored in PostgreSQL.
router.get('/', async (req, res) => {
  try {
    const rentals = await prisma.rental.findMany({
      orderBy: { id: 'asc' },
    });

    res.json(rentals);
  } catch (error) {
    console.error('Error fetching rentals:', error);
    res.status(500).json({ error: 'Failed to fetch rentals.' });
  }
});

// GET /api/rentals/:id
// Return one rental record by its ID.
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid rental ID.' });
  }

  try {
    const rental = await prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      return res.status(404).json({ error: 'Rental not found.' });
    }

    res.json(rental);
  } catch (error) {
    console.error('Error fetching rental:', error);
    res.status(500).json({ error: 'Failed to fetch rental.' });
  }
});

// POST /api/rentals
// Validate and save a new rental record.
router.post('/', async (req, res) => {
  const { propertyName, address, city, monthlyRent } = req.body;

  if (
    typeof propertyName !== 'string' || !propertyName.trim() ||
    typeof address !== 'string' || !address.trim() ||
    typeof city !== 'string' || !city.trim() ||
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

  try {
    const rental = await prisma.rental.create({
      data: {
        propertyName: propertyName.trim(),
        address: address.trim(),
        city: city.trim(),
        monthlyRent: rent,
        status: 'Interested',
      },
    });

    res.status(201).json(rental);
  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).json({ error: 'Failed to create rental.' });
  }
});

// PUT /api/rentals/:id
// Validate and update an existing rental record.
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid rental ID.' });
  }

  const { propertyName, address, city, monthlyRent, status } = req.body;
  const data = {};

  if (propertyName !== undefined) {
    if (typeof propertyName !== 'string' || !propertyName.trim()) {
      return res.status(400).json({
        error: 'Property name cannot be empty.',
      });
    }
    data.propertyName = propertyName.trim();
  }

  if (address !== undefined) {
    if (typeof address !== 'string' || !address.trim()) {
      return res.status(400).json({
        error: 'Address cannot be empty.',
      });
    }
    data.address = address.trim();
  }

  if (city !== undefined) {
    if (typeof city !== 'string' || !city.trim()) {
      return res.status(400).json({
        error: 'City cannot be empty.',
      });
    }
    data.city = city.trim();
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
    data.monthlyRent = Number(monthlyRent);
  }

  if (status !== undefined) {
    if (typeof status !== 'string' || !status.trim()) {
      return res.status(400).json({
        error: 'Status cannot be empty.',
      });
    }
    data.status = status.trim();
  }

  try {
    const existingRental = await prisma.rental.findUnique({
      where: { id },
    });

    if (!existingRental) {
      return res.status(404).json({ error: 'Rental not found.' });
    }

    const updatedRental = await prisma.rental.update({
      where: { id },
      data,
    });

    res.json(updatedRental);
  } catch (error) {
    console.error('Error updating rental:', error);
    res.status(500).json({ error: 'Failed to update rental.' });
  }
});

// DELETE /api/rentals/:id
// Delete an existing rental record.
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid rental ID.' });
  }

  try {
    const existingRental = await prisma.rental.findUnique({
      where: { id },
    });

    if (!existingRental) {
      return res.status(404).json({ error: 'Rental not found.' });
    }

    const deletedRental = await prisma.rental.delete({
      where: { id },
    });

    res.json({
      message: 'Rental deleted successfully.',
      rental: deletedRental,
    });
  } catch (error) {
    console.error('Error deleting rental:', error);
    res.status(500).json({ error: 'Failed to delete rental.' });
  }
});

module.exports = router;
