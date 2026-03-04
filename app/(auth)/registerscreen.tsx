import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { api } from '../../services/api';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) { setError('Please fill in all fields'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    try {
      const result = await api.register(name, email, password, role);
      if (result.success) {
        setSuccess('Account created! Redirecting...');
        setTimeout(() => { router.replace('/(auth)/loginscreen'); }, 1500);
      } else {
        setError(result.error ?? 'Registration failed');
      }
    } catch (e) {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // @ts-ignore
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#1E293B', marginBottom: '8px' }}>FidMed</h1>
      <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '40px' }}>Create your account</p>

      {/* @ts-ignore */}
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>

        {/* @ts-ignore */}
        <input id="reg-name" type="text" placeholder="Full Name" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px', marginBottom: '15px', boxSizing: 'border-box', backgroundColor: '#fafafa', display: 'block' }} />
        {/* @ts-ignore */}
        <input id="reg-email" type="email" placeholder="Email" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px', marginBottom: '15px', boxSizing: 'border-box', backgroundColor: '#fafafa', display: 'block' }} />
        {/* @ts-ignore */}
        <input id="reg-password" type="password" placeholder="Password (min 6 characters)" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px', marginBottom: '15px', boxSizing: 'border-box', backgroundColor: '#fafafa', display: 'block' }} />
        {/* @ts-ignore */}
        <input id="reg-role" type="hidden" value="student" />

        <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Select your role:</p>

        {/* @ts-ignore */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {/* @ts-ignore */}
          <div id="role-student" onclick="selectRole('student')" style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #10B981', backgroundColor: '#10B981', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer', textAlign: 'center' }}>Student ✓</div>
          {/* @ts-ignore */}
          <div id="role-staff" onclick="selectRole('staff')" style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #ddd', backgroundColor: '#fff', color: '#64748B', fontWeight: '600', fontSize: '13px', cursor: 'pointer', textAlign: 'center' }}>Staff</div>
          {/* @ts-ignore */}
          <div id="role-nurse" onclick="selectRole('nurse')" style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #ddd', backgroundColor: '#fff', color: '#64748B', fontWeight: '600', fontSize: '13px', cursor: 'pointer', textAlign: 'center' }}>Nurse</div>
        </div>

        {/* @ts-ignore */}
        <div id="reg-btn" onclick="handleRegister()" style={{ width: '100%', padding: '15px', backgroundColor: '#1a73e8', color: '#fff', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px', textAlign: 'center' }}>
          Create Account
        </div>

        {/* @ts-ignore */}
        <a href="/(auth)/loginscreen" style={{ display: 'block', textAlign: 'center', color: '#1a73e8', fontSize: '14px', textDecoration: 'none', marginTop: '10px' }}>
          Already have an account? Login
        </a>
      </div>

      <p style={{ marginTop: '40px', color: '#CBD5E1', fontSize: '12px' }}>v2.0 - Secured by XAMPP</p>
    {/* @ts-ignore */}
    </div>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', padding: 20 },
  headerSection: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 40, fontWeight: '900', color: '#1E293B', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#64748B' },
  card: { width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 16, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, fontSize: 15, marginBottom: 15, backgroundColor: '#fafafa' },
  roleLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 10 },
  roleContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  roleBtn: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 2, borderColor: '#ddd', alignItems: 'center' },
  roleBtnText: { fontWeight: '600', color: '#64748B', fontSize: 13 },
  registerBtn: { backgroundColor: '#1a73e8', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  registerBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backLink: { textAlign: 'center', color: '#1a73e8', fontSize: 14 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  success: { color: 'green', marginBottom: 10, textAlign: 'center' },
  footer: { marginTop: 40, color: '#CBD5E1', fontSize: 12 },
});