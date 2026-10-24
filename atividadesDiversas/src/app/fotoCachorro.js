import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Cep() {
  const [cacohorro, setCachorro] = useState("");

  // async: esta função vai esperar a internet (await).
  async function buscar() {
    const resposta = await fetch(`https://dog.ceo/api/breeds/image/random`);
    // 2. Transforma o texto da resposta em objeto.
    const dados = await resposta.json();

    setCachorro(dados);
  }
    useEffect(() => {
    buscar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Cachorro Aleatório" }} />

      <Image source={{ uri: cacohorro.message }} style={{ width: "100%", height: 320 }} />

      <Button title="Outro Cachorro" onPress={buscar} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    gap: 6,
  },

  campo: {
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 6,
  },

  erro: {
    marginTop: 16,
    color: "#B91C1C",
  },

  titulo: {
    fontSize: 16,
    fontWeight: "600",
  },
});