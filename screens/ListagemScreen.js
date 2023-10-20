import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ListagemScreen = ({ route, navigation }) => {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Tela anterior foi focada');
      fetchPessoas();
    });

    const fetchPessoas = async () => {
      try {
        const pessoasAnteriores = await AsyncStorage.getItem('pessoas');
        const pessoas = pessoasAnteriores ? JSON.parse(pessoasAnteriores) : [];
  
        setPessoas(pessoas);
      } catch (error) {
        console.log('Erro ao recuperar as pessoas:', error);
      }
    };
    fetchPessoas();
  }, []);

  

  const handleEditarPessoa = (item) => {
    navigation.navigate('Cadastro', { pessoa: item });
  };

  const handleExcluirPessoa = async (item) => {
    try {
      // Recuperar as pessoas cadastradas do AsyncStorage
      const pessoasAnteriores = await AsyncStorage.getItem('pessoas');
      let pessoas = pessoasAnteriores ? JSON.parse(pessoasAnteriores) : [];

      // Remover a pessoa da lista
      pessoas = pessoas.filter((p) => p.nome !== item.nome);

      // Atualizar as pessoas no AsyncStorage
      await AsyncStorage.setItem('pessoas', JSON.stringify(pessoas));

      setPessoas(pessoas);
    } catch (error) {
      console.log('Erro ao excluir a pessoa:', error);
    }
  };

  const renderPessoaItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.text}>{item.nome}</Text>
      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.text}>{item.telefone}</Text>
      <Text style={styles.label}>Endereço:</Text>
      <Text style={styles.text}>{item.endereco}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEditarPessoa(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleExcluirPessoa(item)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pessoas Cadastradas:</Text>
      <FlatList
        data={pessoas}
        renderItem={renderPessoaItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardList: {
    width: '100%',
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
    marginBottom: 10,
    width: width - 32,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListagemScreen;