const pool = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { alertId, senderRole, message } = req.body;
  if (!alertId || !senderRole || !message) {
    return res.json({ success: false, error: 'Missing fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (alert_id, sender_role, message) VALUES ($1, $2, $3) RETURNING id',
      [alertId, senderRole, message]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};