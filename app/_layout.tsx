import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useColorScheme as useAppColorScheme } from '../hooks/use-color-scheme.web';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useAppColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {Platform.OS === 'web' && (
        // @ts-ignore
        <style>{`
          * { touch-action: auto !important; }
          div { pointer-events: auto !important; }
        `}</style>
      )}
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}