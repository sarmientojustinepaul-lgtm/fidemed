const pool = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const userId = req.query.userId ? parseInt(req.query.userId) : 0;

  try {
    let rows;
    if (userId) {
      [rows] = await pool.query('SELECT * FROM medical_alerts WHERE user_id=? ORDER BY sent_at DESC', [userId]);
    } else {
      [rows] = await pool.query('SELECT * FROM medical_alerts WHERE hidden_staff=0 ORDER BY sent_at DESC');
    }
    res.json({ success: true, alerts: rows });
  } catch (err) {
    console.log('DB ERROR:', err);
    res.json({ success: false, error: err.message, code: err.code, stack: err.stack });
  }
};