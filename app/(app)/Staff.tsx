export default function Staff() {
  return (
    // @ts-ignore
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* @ts-ignore */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        {/* @ts-ignore */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#000', margin: 0 }}>Staff Dashboard</h2>
          <span id="new-badge" style={{ color: '#D32F2F', fontWeight: '600', fontSize: '13px' }}></span>
        </div>
        {/* @ts-ignore */}
        <div id="logout-btn" style={{ backgroundColor: '#d93025', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Logout</div>
      </div>
      {/* @ts-ignore */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', backgroundColor: '#fcfcfc' }}>
        <span style={{ color: '#888', fontSize: '14px' }}>Patient Alert Inbox</span>
        <span style={{ color: '#888', fontSize: '14px' }}>Auto-refreshing...</span>
      </div>
      <div id="alerts-container">
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: '18px', padding: '40px' }}>Loading...</p>
      </div>
    {/* @ts-ignore */}
    </div>
  );
}