import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListagemScreen = ({ route }) => {
  const { pessoa } = route.params;

console.log(pessoa)

  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.text}>{pessoa.nome}</Text>
      <Text style={styles.label}>Celular:</Text>
      <Text style={styles.text}>{pessoa.celular}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{pessoa.email}</Text>
    </View>
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '90%', // Definindo a largura como 100% do contêiner
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ListagemScreen;