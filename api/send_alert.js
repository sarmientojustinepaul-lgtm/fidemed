const pool = require('./db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { patientName, age, gradeLevel, roomLocation, symptomDescription, urgencyLevel, userId } = req.body;
  if (!patientName || !symptomDescription) {
    return res.json({ success: false, error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO medical_alerts (patient_name, age, grade_level, room_location, symptom_description, urgency_level, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [patientName, age, gradeLevel, roomLocation, symptomDescription, urgencyLevel || 'Level 1', userId || 0]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};