import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importation de useRoute
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Ajuste le chemin si nécessaire

type ProgrammesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Programmes'>;

export default function Programmes() {
  const [programmes, setProgrammes] = useState([]); // Pour stocker les programmes récupérés
  const [loading, setLoading] = useState(true); // Pour afficher le loader pendant le chargement
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null); // Pour stocker le programme sélectionné

  const navigation = useNavigation<ProgrammesScreenNavigationProp>();
  const route = useRoute(); // Utilisation de useRoute pour obtenir les paramètres

  // Récupérer le levelId et goalId depuis les paramètres
  const { levelId, goalId } = route.params || {}; // Assure-toi que levelId et goalId sont passés

  // Liste des noms des niveaux et des buts (à ajuster selon ta logique)
  const levels = [
    { id: 1, name: "Débutant" },
    { id: 2, name: "Intermédiaire" },
    { id: 3, name: "Avancé" },
  ];

  const goals = [
    { id: 1, name: "Perte de poids" },
    { id: 2, name: "Prise de muscle" },
    { id: 3, name: "Maintien de la forme" },
  ];

  // Fonction pour obtenir le nom d'un niveau par ID
  const getLevelName = (levelId: number) => {
    const level = levels.find(level => level.id === levelId);
    return level ? level.name : 'Niveau inconnu';
  };

  // Fonction pour obtenir le nom d'un but par ID
  const getGoalName = (goalId: number) => {
    const goal = goals.find(goal => goal.id === goalId);
    return goal ? goal.name : 'But inconnu';
  };

  // Effectuer la récupération des programmes
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://192.168.56.1:4000/api/programs'); // Change l'URL si nécessaire
        const data = await response.json();
        setProgrammes(data); // Mettre à jour les programmes
      } catch (error) {
        console.error('Erreur lors de la récupération des programmes:', error);
      } finally {
        setLoading(false); // Arrêter le loader une fois les données récupérées
      }
    };

    fetchPrograms();
  }, []);

  const handleSelectProgram = (programId: number) => {
    setSelectedProgram(programId === selectedProgram ? null : programId); // Permet de désélectionner un programme
  };

  // Rechercher les noms des niveaux et des buts
  const levelName = levelId ? getLevelName(levelId) : ''; // Utilisation de la fonction getLevelName
  const goalName = goalId ? getGoalName(goalId) : ''; // Utilisation de la fonction getGoalName

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#A020F0" />
        <Text style={styles.title}>Chargement des programmes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💪 Choisis un Programme</Text>

      {/* Affichage du niveau et du but sélectionnés */}
      {(levelName || goalName) && (
        <View style={styles.selectedInfoContainer}>
          {levelName && (
            <Text style={styles.selectedInfo}>
              Niveau Sélectionné: {levelName}
            </Text>
          )}
          {goalName && (
            <Text style={styles.selectedInfo}>
              But Associé: {goalName}
            </Text>
          )}
        </View>
      )}

      <FlatList
        data={programmes}
        keyExtractor={(item) => item.Program_Id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.programItem, item.Program_Id === selectedProgram && styles.selectedProgram]}
            onPress={() => handleSelectProgram(item.Program_Id)}
          >
            <Text style={styles.programTitle}>{item.Program_Name}</Text>
            <Text style={styles.programDescription}>Goal ID: {item.Goal_Id}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedProgram && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('SomeOtherPage', { programId: selectedProgram })}
        >
          <Text style={styles.nextButtonText}>Suivant</Text>
        </TouchableOpacity>
      )}
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
    color: '#fff', // Blanc pour le titre 
    marginBottom: 20, 
    textAlign: 'center',
  },
  programItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedProgram: {
    borderColor: '#7CFC00', // Vert pour le programme sélectionné
    borderWidth: 3,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  programDescription: {
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
  selectedInfoContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  selectedInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
