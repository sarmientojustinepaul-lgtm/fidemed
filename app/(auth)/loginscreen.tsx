import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { api } from '../../services/api';
import { saveUser } from '../../services/authStorage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    try {
      const result = await api.login(email, password);
      if (!result?.success) { setError(result?.error ?? 'Invalid credentials'); return; }
      await saveUser(result);
      if (result.role === 'student') router.replace('/(app)/Student');
      else if (result.role === 'staff') router.replace('/(app)/Staff');
      else if (result.role === 'nurse') router.replace('/(app)/dashboardscreen');
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
      <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '40px' }}>Medical Alert System</p>

      {/* @ts-ignore */}
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1E293B' }}>Welcome Back</h2>

        {/* @ts-ignore */}
        <input id="login-email" type="email" placeholder="Email" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px', marginBottom: '15px', boxSizing: 'border-box', backgroundColor: '#fafafa', display: 'block' }} />

        {/* @ts-ignore */}
        <input id="login-password" type="password" placeholder="Password" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px', marginBottom: '15px', boxSizing: 'border-box', backgroundColor: '#fafafa', display: 'block' }} />

        {/* @ts-ignore */}
        <div id="login-btn" onclick="handleLogin()" style={{ width: '100%', padding: '15px', backgroundColor: '#1a73e8', color: '#fff', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px', textAlign: 'center' }}>
          Login
        </div>

        {/* @ts-ignore */}
        <a href="/(auth)/registerscreen" style={{ display: 'block', textAlign: 'center', color: '#1a73e8', fontSize: '14px', textDecoration: 'none', marginTop: '10px' }}>
          Don't have an account? Register
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
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#1E293B', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, fontSize: 15, marginBottom: 15, backgroundColor: '#fafafa' },
  loginBtn: { backgroundColor: '#1a73e8', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  registerLink: { textAlign: 'center', color: '#1a73e8', fontSize: 14 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  footer: { marginTop: 40, color: '#CBD5E1', fontSize: 12 },
});