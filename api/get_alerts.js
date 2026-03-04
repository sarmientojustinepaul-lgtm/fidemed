const pool = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const userId = req.query.userId ? parseInt(req.query.userId) : 0;

  try {
    let result;
    if (userId) {
      result = await pool.query('SELECT * FROM medical_alerts WHERE user_id=$1 ORDER BY sent_at DESC', [userId]);
    } else {
      result = await pool.query('SELECT * FROM medical_alerts WHERE hidden_staff=0 ORDER BY sent_at DESC');
    }
    res.json({ success: true, alerts: result.rows });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
