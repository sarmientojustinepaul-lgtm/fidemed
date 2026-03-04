export default function ChatScreen() {
  return (
    // @ts-ignore
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
      {/* @ts-ignore */}
      <div style={{ padding: '20px', paddingTop: '30px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
        {/* @ts-ignore */}
        <div id="back-btn" style={{ color: '#007AFF', fontSize: '16px', cursor: 'pointer' }}>Back</div>
        <h3 id="chat-title" style={{ fontSize: '17px', fontWeight: 'bold', margin: 0 }}>Chat</h3>
        {/* @ts-ignore */}
        <div style={{ width: '40px' }}></div>
      </div>
      {/* @ts-ignore */}
      <div id="messages-container" style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
        <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>Loading...</p>
      </div>
      {/* @ts-ignore */}
      <div style={{ display: 'flex', padding: '15px', backgroundColor: '#fff', alignItems: 'center', borderTop: '1px solid #eee' }}>
        {/* @ts-ignore */}
        <input id="msg-input" type="text" placeholder="Type a message..." style={{ flex: 1, backgroundColor: '#f0f0f0', borderRadius: '20px', padding: '10px 15px', border: 'none', fontSize: '15px', outline: 'none' }} />
        {/* @ts-ignore */}
        <div id="send-btn" style={{ marginLeft: '10px', backgroundColor: '#1a73e8', color: '#fff', padding: '10px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Send</div>
      </div>
    {/* @ts-ignore */}
    </div>
  );
}