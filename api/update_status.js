const pool = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { id, status } = req.body;
  if (!id || !status) {
    return res.json({ success: false, error: 'Missing fields' });
  }

  try {
    await pool.query('UPDATE medical_alerts SET status=$1 WHERE id=$2', [status, id]);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
