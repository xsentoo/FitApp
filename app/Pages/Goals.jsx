// Importation des hooks et composants nécessaires
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';

export default function Goals() {
  // États pour stocker les objectifs, gérer le chargement et l'objectif sélectionné
  const [goals, setGoals] = useState([]); // Liste des objectifs
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [selectedGoal, setSelectedGoal] = useState(null); // Objectif actuellement sélectionné

  // useEffect pour récupérer les objectifs depuis l'API lorsque le composant est monté
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/goals'); // Appel API pour récupérer les goals
        const data = await response.json(); // Conversion de la réponse en JSON
        setGoals(data); // Mise à jour de l'état goals avec les données reçues
      } catch (error) {
        console.error('Erreur lors de la récupération des goals:', error); // Gestion des erreurs
      } finally {
        setLoading(false); // Désactiver le chargement une fois les données récupérées ou en cas d'erreur
      }
    };

    fetchGoals(); // Appel de la fonction fetchGoals
  }, []);

  // Fonction pour gérer la sélection/désélection d'un objectif
  const handleSelectGoal = (goalId) => {
    // Si l'objectif est déjà sélectionné, on le désélectionne, sinon on le sélectionne
    setSelectedGoal(goalId === selectedGoal ? null : goalId);
  };

  // Affichage d'un spinner si les données sont encore en train de charger
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" /> {/* Spinner de chargement */}
        <Navbar /> {/* Affiche la barre de navigation */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Sélectionne ton objectif</Text>
      
      {/* Liste des objectifs */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.Goal_Id.toString()} // Conversion de l'ID en string pour éviter les erreurs
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.goalItem,
              item.Goal_Id === selectedGoal && styles.selectedGoal, // Change le style si sélectionné
            ]}
            onPress={() => handleSelectGoal(item.Goal_Id)} // Appel de la fonction pour gérer la sélection
          >
            <Text style={styles.goalTitle}>{item.Goal_Name}</Text>
            <Text style={styles.goalDescription}>{item.Goal_Description}</Text>
          </TouchableOpacity>
        )}
      />
      
      <Navbar /> {/* Affiche la barre de navigation */}

      {/* Bouton "Suivant" qui s'affiche seulement si un objectif est sélectionné */}
      {selectedGoal && (
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Styles pour chaque élément de l'interface
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Couleur de fond gris clair
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goalItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent', // Bordure invisible par défaut
  },
  selectedGoal: {
    borderColor: '#4caf50', // Bordure verte lorsqu'un objectif est sélectionné
    backgroundColor: '#e8f5e9',
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
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
