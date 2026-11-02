const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const ACCOUNTS = [
  {
    name: 'Dr. PHC',
    email: 'doctor@phc.gov.in',
    password: 'password123',
    role: 'doctor',
    phone: '9000000001',
    language: 'en'
  },
  {
    name: 'Pharmacy PHC',
    email: 'pharmacy@phc.gov.in',
    password: 'password123',
    role: 'pharmacy',
    phone: '9000000002',
    language: 'en'
  },
  {
    name: 'Dr. Example',
    email: 'doctor@example.com',
    password: 'doctor123',
    role: 'doctor',
    phone: '9000000003',
    language: 'en'
  },
  {
    name: 'Pharmacy Example',
    email: 'pharmacy@example.com',
    password: 'pharmacy123',
    role: 'pharmacy',
    phone: '9000000004',
    language: 'en'
  }
];

async function resetAndSeedDB() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined. Please check server/.env');
  }

  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
  console.log('Connected to MongoDB Atlas.');

  try {
    const deleted = await User.deleteMany({});
    console.log(`Purged ${deleted.deletedCount} existing user(s).`);

    const users = [];

    for (const account of ACCOUNTS) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(account.password, salt);

      users.push({
        name: account.name,
        email: account.email,
        password: hashedPassword,
        role: account.role,
        phone: account.phone,
        language: account.language
      });
    }

    await User.create(users);

    console.log('Seeded fresh user accounts:');
    for (const account of ACCOUNTS) {
      console.log(`- ${account.email} | ${account.password} | role: ${account.role}`);
    }
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  resetAndSeedDB()
    .then(() => {
      console.log('Database reset and seeding completed successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error(`Reset and seed failed: ${err.message}`);
      process.exit(1);
    });
}

module.exports = resetAndSeedDB;
