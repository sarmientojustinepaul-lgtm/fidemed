import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

// FIXED: Changed from @/ to relative paths ../ to stop the Metro error
import React from 'react';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.alertTitle}>
        🚨 Emergency Protocol
      </ThemedText>
      
      <ThemedView style={styles.infoBox}>
        <ThemedText style={styles.infoText}>
          1. Stay with the student.{"\n"}
          2. Contact the front office immediately.{"\n"}
          3. Clear the hallway for medical responders.
        </ThemedText>
      </ThemedView>

      <Link href="/" style={styles.link}>
        <ThemedText type="link">Return to Dashboard</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  alertTitle: {
    color: '#E74C3C',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#FDEDEC',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  infoText: {
    lineHeight: 24,
    color: '#922B21',
  },
  link: {
    marginTop: 30,
    paddingVertical: 15,
  },
});