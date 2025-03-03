import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Accueil', headerShown: false }} 
      />
      <Stack.Screen 
        name="Pages/Goals" 
        options={{ title: 'Objectifs Fitness' }} 
      />
    </Stack>
  );
}
