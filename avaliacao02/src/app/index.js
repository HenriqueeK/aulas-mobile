import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inicio() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Avaliação 02" }} />

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Meus Jogos</Text>
        <Link href="/jogos" style={styles.link}>
          Ver meus jogos →
        </Link>
      </View>

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  cartao: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 6,
  },

  cartaoTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2354D6",
    marginTop: 4,
  },
});