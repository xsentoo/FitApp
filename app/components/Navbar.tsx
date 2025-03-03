import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Navbar() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.navItem}>🏠 Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Pages/Goals')}>
        <Text style={styles.navItem}>🎯 Goals</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#4caf50',
  },
  navItem: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
