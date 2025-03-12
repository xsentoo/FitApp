import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Accueil', headerShown: false }}
      />
      <Stack.Screen
        name="Goals"
        options={{
          title: 'Objectifs Fitness',
          headerStyle: { backgroundColor: '#A020F0' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Levels"
        options={{
          title: 'Niveaux',
          headerStyle: { backgroundColor: '#8A2BE2' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
