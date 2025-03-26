import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Suspense, useEffect, useState } from 'react';
import "../global.css"
import { useColorScheme } from '@/hooks/useColorScheme';
import { ActivityIndicator, View } from 'react-native';
import {SQLiteProvider} from 'expo-sqlite';
import { initializeDatabase } from './database.util'; // updated import

export const DATABASE_NAME = 'workout';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    async function prepareApp() {
      try {
        await initializeDatabase();
        setDbReady(true);
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    }
    prepareApp();
  }, []);

  if (!loaded || !dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          options={{ enableChangeListener: true }}
          useSuspense={true}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="+not-found" />
            <StatusBar style="auto" />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </ThemeProvider>
  );
}