const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const DEFAULT_ACCOUNTS = [
  {
    name: 'Dr. PHC',
    email: 'doctor@phc.gov.in',
    password: 'password123',
    role: 'doctor',
    phone: '9000000001',
    language: 'en'
  },
  {
    name: 'Dr. Example',
    email: 'doctor@example.com',
    password: 'doctor123',
    role: 'doctor',
    phone: '9000000002',
    language: 'en'
  },
  {
    name: 'Pharmacy PHC',
    email: 'pharmacy@phc.gov.in',
    password: 'password123',
    role: 'pharmacy',
    phone: '9000000003',
    language: 'en'
  },
  {
    name: 'Pharmacy User',
    email: 'pharmacy@example.com',
    password: 'pharmacy123',
    role: 'pharmacy',
    phone: '9000000004',
    language: 'en'
  }
];

async function seedDefaultAccounts() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined. Please check server/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);

  try {
    const users = User.collection;

    for (const account of DEFAULT_ACCOUNTS) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(account.password, salt);
      const now = new Date();

      await users.updateOne(
        { email: account.email },
        {
          $set: {
            name: account.name,
            email: account.email,
            password: hashedPassword,
            role: account.role,
            phone: account.phone,
            language: account.language,
            updatedAt: now
          },
          $setOnInsert: {
            createdAt: now
          }
        },
        { upsert: true }
      );

      console.log(`Seeded ${account.role} account: ${account.email}`);
    }
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  seedDefaultAccounts()
    .then(() => {
      console.log('Default doctor and pharmacy accounts seeded successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error(`Seeding failed: ${err.message}`);
      process.exit(1);
    });
}

module.exports = seedDefaultAccounts;
