import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { createAnonymousUser } from '../utils/supabase';

export default function RootLayout() {
  useEffect(() => {
    createAnonymousUser();
  }, []);

  return <Stack />;
}
