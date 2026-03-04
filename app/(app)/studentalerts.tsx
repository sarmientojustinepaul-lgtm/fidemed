export default function StudentAlerts() {
  return (
    // @ts-ignore
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* @ts-ignore */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        {/* @ts-ignore */}
        <div id="back-btn" style={{ color: '#007AFF', fontSize: '16px', cursor: 'pointer' }}>← Back</div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>My Alerts</h2>
        {/* @ts-ignore */}
        <div style={{ width: '60px' }}></div>
      </div>
      <div id="student-alerts-container">
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: '18px', padding: '40px' }}>Loading...</p>
      </div>
    {/* @ts-ignore */}
    </div>
  );
}