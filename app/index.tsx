import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/home.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🏋️‍♂️ Bienvenue sur FitnessAnime</Text>
        <Text style={styles.subtitle}>
          Atteins tes objectifs fitness avec nous !
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/Pages/Goals')}>
          <Text style={styles.buttonText}>Commencer l'aventure</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
    alignItems: 'center',
    maxWidth: '90%',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: '600',
  },
});
