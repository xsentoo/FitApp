import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Levels() {
  const [levels, setLevels] = useState([]); // Pour stocker les niveaux récupérés
  const [loading, setLoading] = useState(true); // Pour afficher le loader pendant le chargement
  const [selectedLevel, setSelectedLevel] = useState(null); // Pour stocker le niveau sélectionné
  const navigation = useNavigation();

  useEffect(() => {
    // Fonction pour récupérer les niveaux depuis l'API
    const fetchLevels = async () => {
      try {
        const response = await fetch('http://192.168.56.1:4000/api/levels');
        const data = await response.json();
        setLevels(data); // Mettre à jour les niveaux
      } catch (error) {
        console.error('Erreur lors de la récupération des niveaux:', error);
      } finally {
        setLoading(false); // Arrêter le loader une fois les données récupérées
      }
    };

    fetchLevels();
  }, []);

  const handleSelectLevel = (levelId) => {
    setSelectedLevel(levelId === selectedLevel ? null : levelId); // Permet de désélectionner un niveau
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#A020F0" />
        <Text style={styles.title}>Chargement des niveaux...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Sélectionne un Niveau</Text>
      <FlatList
        data={levels}
        keyExtractor={(item) => item.Level_Id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.levelItem, item.Level_Id === selectedLevel && styles.selectedLevel]}
            onPress={() => handleSelectLevel(item.Level_Id)}
          >
            <Text style={styles.levelTitle}>{item.Level_Name}</Text>
            <Text style={styles.levelDescription}>{item.Level_Description}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedLevel && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Pages/Programmes', { levelId: selectedLevel })}
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
  levelItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedLevel: {
    borderColor: '#7CFC00', // Vert pour le niveau sélectionné
    borderWidth: 3,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  levelDescription: {
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
