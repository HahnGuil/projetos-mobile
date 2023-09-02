import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');

  const handleCadastro = () => {
    // Aqui você pode adicionar a lógica para enviar os dados do cadastro para algum lugar, como um servidor
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Celular:', celular);
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