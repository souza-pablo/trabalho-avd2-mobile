import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { styles } from "../../screens/Home/styles";

type City = {
  onSelectCity: (city: string) => void;
};

const Select = ({ onSelectCity }: City) => {
  const [selectedCity, setSelectedCity] = useState("VR");

  const sendCity = (city: string) => {
    setSelectedCity(city);
    onSelectCity(city);
  };

  return (
    <Picker
      selectedValue={selectedCity}
      style={styles.input}
      onValueChange={(cityValue) => sendCity(cityValue)}
    >
      <Picker.Item label="VR" value="VR" />
      <Picker.Item label="BM" value="BM" />
      <Picker.Item label="BP" value="BP" />
      <Picker.Item label="RJ" value="RJ" />
      <Picker.Item label="SP" value="SP" />
      <Picker.Item label="PH" value="PH" />
    </Picker>
  );
};

export default Select;
