import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Définition du type pour les paramètres de route
type RouteParams = {
  levelId?: number;
  goalId?: number;
};

// Définition correcte du type de navigation
type RootStackParamList = {
  Programmes: undefined;
  SomeOtherPage: { programId: number };
};

type ProgrammesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Programmes'>;

type Program = {
  Program_Id: number;
  Program_Name: string;
  Goal_Id: number;
};

export default function Programmes() {
  const [programmes, setProgrammes] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);

  const navigation = useNavigation<ProgrammesScreenNavigationProp>();
  const route = useRoute();
  const { levelId, goalId } = (route.params as RouteParams) || {}; // Vérification des paramètres

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/programs');
        const data = await response.json();
        setProgrammes(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des programmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleSelectProgram = (programId: number) => {
    setSelectedProgram(programId === selectedProgram ? null : programId);
  };

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
      <FlatList
        data={programmes}
        keyExtractor={(item) => item.Program_Id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.programItem, item.Program_Id === selectedProgram && styles.selectedProgram]}
            onPress={() => handleSelectProgram(item.Program_Id)}
          >
            <Text style={styles.programTitle}>{item.Program_Name}</Text>
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
    backgroundColor: '#A020F0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
    borderColor: '#7CFC00',
    borderWidth: 3,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: '600',
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