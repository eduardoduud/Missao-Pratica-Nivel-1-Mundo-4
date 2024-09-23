import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SupplierFormProps {}

const SupplierForm: React.FC<SupplierFormProps> = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissão necessária",
        "Você precisa permitir o acesso à galeria."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (name && address && contact && category && imageUri) {
      const supplierData = {
        name,
        address,
        contact,
        category,
        imageUri,
      };

      try {
        const suppliers = JSON.parse(
          (await AsyncStorage.getItem("suppliers")) || "[]"
        );
        suppliers.push(supplierData);
        await AsyncStorage.setItem("suppliers", JSON.stringify(suppliers));

        Alert.alert("Fornecedor Cadastrado", `Nome: ${name}`);
        setName("");
        setAddress("");
        setContact("");
        setCategory("");
        setImageUri(null);
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao salvar o fornecedor.");
      }
    } else {
      Alert.alert("Erro", "Preencha todos os campos e selecione uma imagem.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Fornecedor</Text>

      <TouchableOpacity
        onPress={handleImagePicker}
        style={styles.profileImageContainer}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderProfileImage}>
            <Text style={styles.placeholderText}>Adicionar Imagem</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nome"
        style={styles.input}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Endereço"
      />

      <Text style={styles.label}>Contato</Text>
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        placeholder="Contato"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Categoria"
      />

      <Button title="Cadastrar Fornecedor" onPress={handleSubmit} />
    </View>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  profileImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholderProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#fff",
    textAlign: "center",
  },
};

export default SupplierForm;
