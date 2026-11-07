import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {StyleSheet,Text, View, Button, FlatList, TextInput, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

const API_URL = "https://6a289af14e1e783349a5b48f.mockapi.io/api/livro/aviso";

export default function Livro() {
  const [livros, setLivros] = useState([]);
  const [livro, setLivro] = useState("");
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  async function buscarLivro() {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();
    setLivros(dados);
  }

  async function salvarLivro() {
    if (idEditando === 0) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        livro: livro,
        comentario: comentario,
        nota: nota,
        nomeUsuario: nomeUsuario,
      }),
    });
  }else{
    await fetch(`${API_URL}/${idEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        livro: livro,
        comentario: comentario,
        nota: nota,
        nomeUsuario: nomeUsuario,
  }),
});


    setIdEditando(0);
}

    setLivro("");
    setComentario("");
    setNota("");
    setNomeUsuario("");

    buscarLivro();
  }

    async function excluir(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    buscarLivro();
  }

    async function editar(item) {
    setIdEditando(item.id);
    setLivro(item.livro);
    setComentario(item.comentario);
    setNota(item.nota);
    setNomeUsuario(item.nomeUsuario);
  }

  function confirmarExclusao(item){
    Alert.alert(
      "Excluir livro",
      `Deseja realmente excluir?`,
      [
        { text: "Cancelar" },
        { text: "Excluir", onPress: () => excluir(item.id) },
      ]
    );
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

      <Button title="Salvar livro" color="green" onPress={salvarLivro} />

      <FlatList
        style={styles.lista}
        data={livros}
        renderItem={({ item }) => (

          <View style={styles.botaoLateral}>
            <Text style={styles.item}>
                {item.id} - {item.livro} -   {item.nota} - {item.comentario} - {item.nomeUsuario}
            </Text>
           <View style={styles.botao}>
              <Button
                title="🖌️"
                onPress={() => {
                editar(item);
                }}/>
              <Button
                title="🗑️"
                color="red"
                onPress={() => {
                confirmarExclusao(item);
                }}/>
              </View>
          </View>
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

  botaoLateral: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  botao: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10
  }
});
