const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongo');

// 1. Initialize Express App FIRST
const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Import Routes
const authRoutes = require('./routes/authRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const pharmacyRecordRoutes = require('./routes/pharmacyRecordRoutes');

// 4. Register API Routes (app.use Tabhi Kaam Karega Jab app Declare Ho Chuka Ho)
app.use('/api/auth', authRoutes);
app.use('/api/pharmacy', pharmacyRecordRoutes);
app.use('/api/pharmacy', pharmacyRoutes);

const PORT = process.env.PORT || 5000;

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});