import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen({route, navigation}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');

  const isEdicao = route.params && route.params.pessoa;

  useEffect(() => {
    if (isEdicao) {
      // Preencher os campos com os dados da pessoa a ser editada
      const { nome, email, celular } = route.params.pessoa;
      setNome(nome);
      setEmail(email);
      setCelular(celular);
    }
  }, [isEdicao]);

  const handleCadastro = async () => {
    const pessoa = {
        nome,
        email,
        celular,
    };

    try {
      let pessoas = [];

      // Recuperar as pessoas cadastradas do AsyncStorage
      const pessoasAnteriores = await AsyncStorage.getItem('pessoas');
      if (pessoasAnteriores) {
        pessoas = JSON.parse(pessoasAnteriores);
      }

      if (isEdicao) {
        // Atualizar a pessoa existente
        const { nome: oldNome } = route.params.pessoa;
        pessoas = pessoas.map((p) => (p.nome === oldNome ? pessoa : p));
      } else {
        // Adicionar a nova pessoa à lista
        pessoas.push(pessoa);
      }

      // Salvar as pessoas no AsyncStorage
      await AsyncStorage.setItem('pessoas', JSON.stringify(pessoas)).then((result) => {
       // navigation.goBack();
        navigation.navigate('Listagem',{ pessoas: pessoas });
      });
    } catch (error) {
      console.log('Erro ao salvar a pessoa:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Cadastro</Text>
        <View style={styles.card}>
        <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={text => setNome(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
        />
        <TextInput
            placeholder="Celular"
            value={celular}
            onChangeText={text => setCelular(text)}
            style={styles.input}
        />
        <Button title="Cadastrar" onPress={handleCadastro} />
      </View>
    </View>
  );
}

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
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      width: '100%',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginBottom: 10,
      padding: 5,
    },
  });