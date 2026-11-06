import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {StyleSheet,Text, View, Button, FlatList, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function Livro() {
  const [livros, setLivros] = useState([]);
  const [livro, setLivro] = useState("");
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState("");

  async function buscarLivro() {
    const resposta = await fetch(
      "https://6a289af14e1e783349a5b48f.mockapi.io/api/livro/aviso",
    );
    const dados = await resposta.json();
    setLivros(dados);
  }

  async function salvarLivro() {
    await fetch("https://6a289af14e1e783349a5b48f.mockapi.io/api/livro/aviso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        livro: livro,
        comentario: comentario,
        nota: nota,
        nomeUsuario: nomeUsuario,
      }),
    });
    setLivro("");
    setComentario("");
    setNota("");
    setNomeUsuario("");

    buscarLivro();
  }

  useEffect(() => {
    buscarLivro();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Meus livros" }} />

      <TextInput
        style={styles.campo}
        value={livro}
        onChangeText={setLivro}
        placeholder="Nome do Livro"
      />
      <TextInput
        style={styles.campo}
        value={nota}
        onChangeText={setNota}
        keyboardType="numeric"
        placeholder="Nota do Livro"
      />
      <TextInput
        style={styles.campo}
        value={comentario}
        onChangeText={setComentario}
        placeholder="Comentario"
      />
      <TextInput
        style={styles.campo}
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
        placeholder="Nome de autor"
      />

      <Button title="Salvar livro" onPress={salvarLivro} />

      <FlatList
        style={styles.lista}
        data={livros}
        renderItem={({ item }) => (
          <Text style={styles.item}>
              {item.id} - {item.livro} -   {item.nota} - {item.comentario} - {item.nomeUsuario}
          </Text>
        )}
      />
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

  campo: {
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },

  lista: {
    flex: 1,
    marginTop: 16,
  },

  item: {
    backgroundColor: "#F1F3F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    fontSize: 15,
    color: "#111827",
  },
});