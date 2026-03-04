// services/authStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LoginResult } from './api';

const KEY = 'user';

export async function saveUser(user: LoginResult): Promise<void> {
  try {
    const json = JSON.stringify(user);
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      localStorage.setItem(KEY, json);
    } else {
      await AsyncStorage.setItem(KEY, json);
    }
  } catch (e) {
    console.error('saveUser error', e);
    throw e;
  }
}

export async function getUser(): Promise<LoginResult | null> {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      const s = localStorage.getItem(KEY);
      return s ? (JSON.parse(s) as LoginResult) : null;
    } else {
      const s = await AsyncStorage.getItem(KEY);
      return s ? (JSON.parse(s) as LoginResult) : null;
    }
  } catch (e) {
    console.error('getUser error', e);
    return null;
  }
}

export async function clearUser(): Promise<void> {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      localStorage.removeItem(KEY);
    } else {
      await AsyncStorage.removeItem(KEY);
    }
  } catch (e) {
    console.error('clearUser error', e);
  }
}
