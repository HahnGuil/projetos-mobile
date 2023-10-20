import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function CadastroScreen({navigation, route}) {
  const isEdicao = route.params && route.params.pessoa;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');

  useEffect(() => {
    if(isEdicao){
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

    try{
      // Recuperar as pesssoas cadastradas anteriores
      const pessoasAnteriores = await AsyncStorage.getItem('pessoas');
      const pessoas = pessoasAnteriores ? JSON.parse(pessoasAnteriores) : [];

      // Adicionar a nova pessoa a lista
      if(isEdicao){
        const {nome: oldName} = route.params.pessoas;
        pessoas = pessoas.map((p) => (p.nome === oldName ? pessoa : p));
      }else{
        pessoas.push(pessoa);
      }
      
      await AsyncStorage.setItem('pessoas', JSON.stringify(pessoas));

      navigation.navigate('Listagem' , { pessoa } );
    }catch(error){
      console.log('Erro ao salvar pessoa', error);
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tela de Cadastro</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={text => setNome(text)}
        style={{ borderWidth: 1, width: 200, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={{ borderWidth: 1, width: 200, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Celular"
        value={celular}
        onChangeText={text => setCelular(text)}
        style={{ borderWidth: 1, width: 200, marginBottom: 10, padding: 5 }}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}