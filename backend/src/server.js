const authRouter = require('./routes/auth');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

//Import the rentals router
const rentalsRouter = require('./routes/rentals');

app.use(express.json());

// Connect the rentals API
app.use('/api/rentals', rentalsRouter);
app.use('/api/auth', authRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});