const express = require('express');
const cors = require('cors');

// 1. Initialize Express App FIRST
const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Import Routes
const authRoutes = require('./routes/authRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');

// 4. Register API Routes (app.use Tabhi Kaam Karega Jab app Declare Ho Chuka Ho)
app.use('/api/auth', authRoutes);
app.use('/api/pharmacy', pharmacyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});