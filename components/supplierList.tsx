import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Supplier {
  name: string;
  address: string;
  contact: string;
  category: string;
  imageUri: string;
}

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const loadSuppliers = async () => {
    try {
      const suppliersData = await AsyncStorage.getItem("suppliers");
      if (suppliersData) {
        setSuppliers(JSON.parse(suppliersData));
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os fornecedores.");
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const renderSupplierItem = ({ item }: { item: Supplier }) => (
    <View style={styles.supplierCard}>
      <Image source={{ uri: item.imageUri }} style={styles.supplierImage} />
      <View style={styles.supplierInfo}>
        <Text style={styles.supplierName}>{item.name}</Text>
        <Text style={styles.supplierDetail}>Endereço: {item.address}</Text>
        <Text style={styles.supplierDetail}>Contato: {item.contact}</Text>
        <Text style={styles.supplierDetail}>Categoria: {item.category}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Fornecedores</Text>
      {suppliers.length > 0 ? (
        <FlatList
          data={suppliers}
          renderItem={renderSupplierItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noSuppliersText}>
          Nenhum fornecedor cadastrado.
        </Text>
      )}
      <Button title="Atualizar" onPress={loadSuppliers} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  supplierCard: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  supplierImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  supplierInfo: {
    flex: 1,
    justifyContent: "center",
  },
  supplierName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  supplierDetail: {
    fontSize: 14,
    color: "#666",
  },
  noSuppliersText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
};

export default SupplierList;
