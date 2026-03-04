export default function Index() {
  return (
    // @ts-ignore
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#1E293B', marginBottom: '8px' }}>FidMed</h1>
      <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '60px' }}>Medical Alert System</p>

      {/* @ts-ignore */}
      <div style={{ width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* @ts-ignore */}
        <a href="/(auth)/loginscreen" style={{ backgroundColor: '#1a73e8', color: '#fff', padding: '15px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
          Login
        </a>
        {/* @ts-ignore */}
        <a href="/(auth)/registerscreen" style={{ backgroundColor: '#fff', color: '#1a73e8', padding: '15px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none', display: 'block', border: '2px solid #1a73e8' }}>
          Sign Up
        </a>
      </div>

      <p style={{ marginTop: '60px', color: '#CBD5E1', fontSize: '12px' }}>v2.0 - Secured by XAMPP</p>
    {/* @ts-ignore */}
    </div>
  );
}