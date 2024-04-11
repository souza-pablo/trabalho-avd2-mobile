import { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";

import { styles } from './styles';
import { Users } from "../../components/Users";

type Props = {
  id: string,
  name: string,
  email: string,
  city: string
}

export function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [users, setUsers] = useState<Props[]>([])

  function handleAddNewUser() {
    if (name.trim() === '' && email.trim() === '' &&
      city.trim() === '') {
      return Alert.alert('Usuário', 'Favor preencha os campos')
    }

    const data = {
      id: String(new Date().getTime()),
      name,
      email,
      city
    }

    console.log(data)
    setUsers([...users, data])
    setName('')
    setEmail('')
    setCity('')

    // Criar uma validação com o email
    // Nào pode cadastrar o mesmo email para usuários diferentes
    // O cpf teve ter 11 caracteres

  }

  function handleRemoveUser(id: string) {
    Alert.alert('Remover', 'Remover o usuário', [
      {
        text: 'Sim',
        onPress: () => setUsers(users =>
          users.filter(user => user.id !== id))
      },
      {
        text: 'Nao',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Cadastro de Usuários
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do usuário"
          placeholderTextColor='#6B6B6B'
          autoCapitalize="words"
          value={name}
          onChangeText={value => setName(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email do usuário"
          placeholderTextColor='#6B6B6B'
          autoCapitalize="none"
          value={email}
          onChangeText={value => setEmail(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade do usuário"
          placeholderTextColor='#6B6B6B'
          // keyboardType="numeric"
          value={city}
          onChangeText={value => setCity(value)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddNewUser}>
          <Text style={styles.buttonText}>
            Incluir
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Users
            data={item}
            onRemove={() => handleRemoveUser(item.id)}
          />
        )}

      />


      <TouchableOpacity
        style={styles.button}>
        <Text style={styles.buttonText}>
          Total
        </Text>
      </TouchableOpacity>

    </View>
  )
}


