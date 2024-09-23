import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SupplierForm from "../components/supplierForm";
import SupplierList from "../components/supplierList";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

type IoniconsName = keyof typeof Ionicons.glyphMap;

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IoniconsName = "ellipse";

          if (route.name === "Cadastrar Fornecedor") {
            iconName = "add-circle-outline";
          } else if (route.name === "Lista de Fornecedores") {
            iconName = "list-outline";
          } else if (route.name === "Upload de Imagem") {
            iconName = "image-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Lista de Fornecedores"
        component={SupplierList}
        options={{ headerTitle: "Lista de Fornecedores" }}
      />
      <Tab.Screen
        name="Cadastrar Fornecedor"
        component={SupplierForm}
        options={{ headerTitle: "Cadastro de Fornecedores" }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
