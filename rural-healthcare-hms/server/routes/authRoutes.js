const express = require('express');
const router = express.Router();

// Doctor Login Endpoint (Direct Fast Authentication without MongoDB Buffer Timeout)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Valid Credentials Check
    if (email === 'amitkushwaha0804@gmail.com' && password === '@Amit7800') {
      return res.json({
        message: 'Login Successful',
        token: 'demo-doctor-jwt-token-7800',
        user: { email: 'doctor@phc.gov.in', name: 'Dr. Amit Kushwaha' }
      });
    }

    return res.status(400).json({ message: 'Invalid Credentials! Use doctor@phc.gov.in & password123' });
  } catch (err) {
    return res.status(500).json({ message: 'Server authentication error' });
  }
});

module.exports = router;