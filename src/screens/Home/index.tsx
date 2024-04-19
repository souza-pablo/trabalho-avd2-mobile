import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Select from "../../components/Select";
import { User, Users } from "../../components/Users";
import { isValidCPF, isValidEmail } from "../../utils/validator";
import { styles } from "./styles";

export const Home = () => {
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("VR");
  const [users, setUsers] = useState<User[]>([]);

  const handleAddNewUser = () => {
    if (name.trim() === "") {
      return Alert.alert("Usuário", "Favor preencha o campo nome");
    }
    if (!checkCPFValid(cpf)) return;
    if (!checkEmailValid(email)) return;
    if (checkRepeatedEmail(email)) return;

    const data = {
      id: String(new Date().getTime()),
      name,
      cpf,
      email,
      city,
    };

    console.log(data);
    setUsers([...users, data]);
    setName("");
    setCPF("");
    setEmail("");
  };

  const checkCPFValid = (cpf: string): boolean => {
    if (isValidCPF(cpf)) {
      return true;
    }

    Alert.alert("CPF inválido");
    return false;
  };

  const checkEmailValid = (email: string): boolean => {
    if (isValidEmail(email)) {
      return true;
    }

    Alert.alert("Email inválido");
    return false;
  };

  const checkRepeatedEmail = (email: string): boolean => {
    const hasRepeatedEmail = users.map((user) => user.email).includes(email);

    if (hasRepeatedEmail) {
      Alert.alert(
        "Não foi possível registrar email, há um usuário que já o possui"
      );
      return true;
    }

    return false;
  };

  const handleRemoveUser = (id: string) => {
    Alert.alert("Remover", "Remover o usuário", [
      {
        text: "Sim",
        onPress: () =>
          setUsers((users) => users.filter((user) => user.id !== id)),
      },
      {
        text: "Nao",
        style: "cancel",
      },
    ]);
  };

  const handleCityFromSelect = (city: string) => {
    setCity(city);
  };

  const handleTotal = () => {
    const totalUsuarios = users.length;
    const totalVR = users.filter((user) => user.city === "VR").length;
    const totalBMOuPH = users.filter(
      (user) => user.city === "BM" || user.city === "PH"
    ).length;
    const totalNaoBP = users.filter((user) => user.city !== "BP").length;

    Alert.alert(
      "Quantidade de usuários",
      `Total: ${totalUsuarios}\nTotal VR: ${totalVR}\nTotal BM e PH: ${totalBMOuPH}\nTotal Não BP: ${totalNaoBP}`,
      [
        {
          text: "OK",
          style: "default",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Cadastro de Usuários</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do usuário"
          placeholderTextColor="#6B6B6B"
          autoCapitalize="words"
          value={name}
          onChangeText={(value) => setName(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#6B6B6B"
          value={cpf}
          onChangeText={(value) => setCPF(value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email do usuário"
          placeholderTextColor="#6B6B6B"
          autoCapitalize="none"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <Select onSelectCity={handleCityFromSelect} />

        <TouchableOpacity style={styles.button} onPress={handleAddNewUser}>
          <Text style={styles.buttonText}>Incluir</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Users data={item} onRemove={() => handleRemoveUser(item.id)} />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleTotal}>
        <Text style={styles.buttonText}>Total</Text>
      </TouchableOpacity>
    </View>
  );
};
