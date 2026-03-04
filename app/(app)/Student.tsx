export default function Student() {
  return (
    // @ts-ignore
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px', display: 'flex', justifyContent: 'center' }}>
      {/* @ts-ignore */}
      <div style={{ width: '100%', maxWidth: '600px' }}>

        {/* Top buttons */}
        {/* @ts-ignore */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          {/* @ts-ignore */}
          <div id="view-chats-btn" style={{ backgroundColor: '#10B981', color: '#fff', padding: '10px 16px', borderRadius: '8px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            💬 My Alerts & Chat
          </div>
          {/* @ts-ignore */}
          <div id="logout-btn" style={{ border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Sign Out</div>
        </div>

        {/* Main card */}
        {/* @ts-ignore */}
        <div style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a73e8', textAlign: 'center', marginBottom: '20px' }}>Medical Alert System</h2>

          {/* @ts-ignore */}
          <hr style={{ marginBottom: '20px' }} />

          {/* @ts-ignore */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            {/* @ts-ignore */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>Patient Name</p>
              {/* @ts-ignore */}
              <input id="st-name" type="text" placeholder="Full Name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', backgroundColor: '#fafafa', boxSizing: 'border-box' }} />
            </div>
            {/* @ts-ignore */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>Age (15-20 only)</p>
              {/* @ts-ignore */}
              <input id="st-age" type="number" placeholder="15-20" min="15" max="20" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', backgroundColor: '#fafafa', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* @ts-ignore */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            {/* @ts-ignore */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>Grade Level</p>
              {/* @ts-ignore */}
              <select id="st-grade" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', backgroundColor: '#fafafa', boxSizing: 'border-box' }}>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            {/* @ts-ignore */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>Room / Location</p>
              {/* @ts-ignore */}
              <input id="st-room" type="text" placeholder="Room No." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', backgroundColor: '#fafafa', boxSizing: 'border-box' }} />
            </div>
          </div>

          <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>Medical Attention Needed</p>
          {/* @ts-ignore */}
          <textarea id="st-symptoms" placeholder="Briefly describe the emergency or symptoms..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', backgroundColor: '#fafafa', boxSizing: 'border-box', height: '100px', marginBottom: '15px', resize: 'vertical' }}></textarea>

          <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>Urgency Level</p>
          {/* @ts-ignore */}
          <select id="st-urgency" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', backgroundColor: '#fafafa', boxSizing: 'border-box', marginBottom: '20px' }}>
            <option value="Level 1">Level 1 (Routine / Non-Urgent)</option>
            <option value="Level 2">Level 2 (Urgent)</option>
            <option value="Level 3">Level 3 (Emergency)</option>
          </select>

          {/* @ts-ignore */}
          <div id="send-alert-btn" style={{ backgroundColor: '#1a73e8', color: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '10px' }}>
            Send Medical Alert
          </div>

          <p style={{ textAlign: 'center', color: '#999', fontSize: '12px' }}>FidMed Medical Support v2.0</p>
        </div>
      {/* @ts-ignore */}
      </div>
    {/* @ts-ignore */}
    </div>
  );
}