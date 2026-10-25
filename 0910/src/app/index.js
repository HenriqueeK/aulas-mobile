import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inicio() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Atividades" }} />

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Agenda</Text>
        <Link href="/agenda" style={styles.link}>
          Ver Agenda →
        </Link>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Biblioteca pessoal</Text>
        <Link href="/biblioteca" style={styles.link}>
          Ver Biblioteca pessoal →
        </Link>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Lista de compra</Text>
        <Link href="/compra" style={styles.link}>
          Ver Lista de Compras →
        </Link>
      </View>

            <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Avaliação de Filmes</Text>
        <Link href="/filme" style={styles.link}>
          Ver Filmes →
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

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D9DDE3",
  },

  saudacao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitulo: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
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

  detalhe: {
    fontSize: 14,
    color: "#374151",
  },

  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2354D6",
    marginTop: 4,
  },
});