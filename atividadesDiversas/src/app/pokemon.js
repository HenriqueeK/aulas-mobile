import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState("");
  const [name, setName] = useState({});
  const [height, setHeight] = useState({});
  const [weight, setWeight] = useState({});
  const [foto, setFoto] = useState({});

  async function buscar() {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    const dados = await resposta.json();

    setName(dados);
    setHeight(dados);
    setWeight(dados);
    setFoto(dados);
  }

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Buscar Pokémon" }} />

      <TextInput
        style={styles.campo}
        value={pokemon}
        onChangeText={setPokemon}
        placeholder="Digite o nome do Pokémon"
      />
      <Button title="Buscar" onPress={buscar} />

      {foto.sprites && (
        <Image source={{ uri: foto.sprites.front_default }} style={{ width: "100%", height: 320 }} />
      )}

      <Text style={styles.titulo}>{name.name}</Text>
      <Text style={styles.titulo}>{height.height}</Text>
      <Text style={styles.titulo}>{weight.weight}</Text>
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

  titulo: {
    fontSize: 16,
    fontWeight: "600",
  },
});