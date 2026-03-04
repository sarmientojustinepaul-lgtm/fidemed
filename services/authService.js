import { auth, db } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function registerUser(email, password, name, role) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
    role,
    createdAt: new Date().toISOString(),
  });

  return { uid: user.uid, role };
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) throw new Error('User record not found.');

  const { role, name } = userDoc.data();
  return { uid: user.uid, role, name };
}

export async function getCurrentUserRole() {
  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) return null;

  return userDoc.data().role;
}

export async function logoutUser() {
  await signOut(auth);
}