import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../config/firebase';
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      Alert.alert("Auth Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggle}>{isLogin ? "Need an account? Register" : "Have an account? Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { width: '100%', padding: 20 },
  input: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  toggle: { marginTop: 15, textAlign: 'center', color: '#007AFF' }
});