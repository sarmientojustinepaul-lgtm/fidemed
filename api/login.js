const pool = require('./db');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, error: 'Missing fields' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = result.rows[0];
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.json({ success: false, error: 'Invalid credentials' });
    }
    res.json({ success: true, id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};