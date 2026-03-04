import { Image } from 'expo-image';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

// Internal Imports - Matched exactly to your lowercase filenames
import ParallaxScrollView from '../../components/parallax-scroll-view';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Collapsible } from '../../components/ui/collapsible';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { db } from '../../config/firebase';
import { Fonts } from '../../constants/theme';

// Define what an Alert looks like to stop the red squiggles
interface MedicalAlert {
  id: string;
  message: string;
  type: 'emergency' | 'routine';
  createdAt: Timestamp;
}

export default function TabTwoScreen() {
  const [alerts, setAlerts] = useState<MedicalAlert[]>([]);

  useEffect(() => {
    try {
      const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const alertList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as MedicalAlert[];
        setAlerts(alertList);
      }, (error) => {
        console.error("Firebase Snapshot Error:", error);
      });

      return () => unsubscribe();
    } catch (err) {
      console.log("Firebase setup error.");
    }
  }, []);

  const handleEmergencyCall = () => {
    Alert.alert("Emergency", "Calling School Nurse...");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FDEDEC', dark: '#441919' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#E74C3C"
          name="exclamationmark.shield.fill"
          style={styles.headerImage}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Medical Center
        </ThemedText>
      </ThemedView>

      <Collapsible title="🚨 ACTIVE EMERGENCY ALERTS">
        {alerts.filter(a => a.type === 'emergency').length > 0 ? (
          alerts.filter(a => a.type === 'emergency').map(alert => (
            <ThemedView key={alert.id} style={styles.emergencyBox}>
              <ThemedText style={styles.emergencyText}>
                <ThemedText type="defaultSemiBold">
                  CRITICAL ({alert.createdAt?.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}):
                </ThemedText> {alert.message}
              </ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedText style={styles.noAlertText}>No active emergencies.</ThemedText>
        )}
        
        <TouchableOpacity style={styles.callButton} onPress={handleEmergencyCall}>
  <ThemedText style={styles.callButtonText}>📞 CONTACT NURSE</ThemedText>
</TouchableOpacity>
      </Collapsible>

      <Collapsible title="🩹 Simple Medical Attention">
        {alerts.filter(a => a.type === 'routine').map(alert => (
          <ThemedView key={alert.id} style={styles.routineBox}>
             <ThemedText>
              <ThemedText type="defaultSemiBold">Update:</ThemedText> {alert.message}
            </ThemedText>
          </ThemedView>
        ))}
      </Collapsible>

      <ThemedView style={styles.footerContainer}>
        <Image
  source={require('../../assets/images/icon.jpg')}
  style={styles.logo}
/>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: { color: '#E74C3C', bottom: -90, left: -35, position: 'absolute' },
  titleContainer: { flexDirection: 'row', gap: 8, marginTop: 10 },
  emergencyBox: { backgroundColor: '#FDEDEC', padding: 12, borderRadius: 8, borderLeftWidth: 5, borderLeftColor: '#E74C3C', marginVertical: 5 },
  emergencyText: { color: '#922B21' },
  routineBox: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  noAlertText: { fontStyle: 'italic', opacity: 0.5, marginVertical: 10 },
  callButton: { backgroundColor: '#E74C3C', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  callButtonText: { color: 'white', fontWeight: 'bold' },
  footerContainer: { marginTop: 30, alignItems: 'center', paddingBottom: 40 },
  logo: { width: 100, height: 100, borderRadius: 50 }
});