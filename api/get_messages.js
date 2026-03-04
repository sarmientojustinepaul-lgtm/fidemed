const pool = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const alertId = req.query.alertId;
  if (!alertId) {
    return res.json({ success: false, error: 'Missing alertId' });
  }

  try {
    const result = await pool.query('SELECT * FROM messages WHERE alert_id=$1 ORDER BY sent_at ASC', [alertId]);
    res.json({ success: true, messages: result.rows });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};