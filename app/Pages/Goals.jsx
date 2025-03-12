import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/goals');
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des objectifs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleSelectGoal = (goalId) => {
    setSelectedGoal(goalId === selectedGoal ? null : goalId);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#A020F0" />
        <Navbar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Sélectionne ton objectif</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.Goal_Id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.goalItem, item.Goal_Id === selectedGoal && styles.selectedGoal]}
            onPress={() => handleSelectGoal(item.Goal_Id)}
          >
            <Text style={styles.goalTitle}>{item.Goal_Name}</Text>
            <Text style={styles.goalDescription}>{item.Goal_Description}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedGoal && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Pages/Levels', { goalId: selectedGoal })}
        >
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      )}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#A020F0', // Violet
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  goalItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedGoal: {
    borderColor: '#7CFC00', // Vert
    borderWidth: 2,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  goalDescription: {
    fontSize: 16,
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#7CFC00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
