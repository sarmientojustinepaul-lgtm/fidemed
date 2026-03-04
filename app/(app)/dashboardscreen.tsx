export default function DashboardScreen() {
  return (
    // @ts-ignore
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* @ts-ignore */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        {/* @ts-ignore */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Medical Alert Feed</h2>
          <span id="new-badge" style={{ color: '#D32F2F', fontWeight: '600', fontSize: '13px' }}></span>
        </div>
        {/* @ts-ignore */}
        <div id="logout-btn" style={{ color: '#FF3B30', fontWeight: 'bold', cursor: 'pointer', padding: '5px' }}>Logout</div>
      </div>
      <div id="alerts-container">
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: '18px', padding: '40px' }}>Loading...</p>
      </div>
    {/* @ts-ignore */}
    </div>
  );
}