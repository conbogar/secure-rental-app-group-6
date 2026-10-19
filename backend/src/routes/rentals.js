const express = require('express');
const router = express.Router();

let rentals = [];
let nextId = 1;

// Get all rentals
router.get('/', (req, res) => {
    res.json(rentals);
});

// Add a rental
router.post('/', (req, res) => {
    const {
        propertyName,
        address,
        city,
        monthlyRent,
    } = req.body;

    if  (
        !propertyName ||
        !address ||
        !city ||
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
        propertyName,
        address,
        city,
        monthlyRent: rent,
        status: 'Interested',
        createdAt: new Date().toISOString(),
    };

    rentals.push(rental);
    res.status(201).json(rental);
});

module.exports = router;