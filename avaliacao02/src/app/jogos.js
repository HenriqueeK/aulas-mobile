import { useEffect, useState } from "react";
import {StyleSheet, Text, View, Button, FlatList, TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("jogos.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS jogos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      plataforma VARCHAR(255),
      horas INTEGER
    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM jogos ORDER BY id DESC");
}

function salvar(nome, plataforma, horas) {
  db.runSync("INSERT INTO jogos (nome, plataforma, horas) VALUES (?, ?, ?)", [nome, plataforma, horas]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM jogos WHERE id = ?", [codigo]);
}

function edita(nome, plataforma, horas, id) {
  db.runSync("UPDATE jogos SET nome = ?, plataforma = ?, horas= ? WHERE id = ?", [
    nome,
    plataforma,
    horas,
    id,
  ]);
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [horas, setHoras] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(nome, plataforma, horas);
    } else {
      edita(nome, plataforma, horas, idEditando);
    }
    setNome("");
    setPlataforma("");
    setHoras("");
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(jogo) {
    setIdEditando(jogo.id);
    setNome(jogo.nome);
    setPlataforma(jogo.plataforma);
    setHoras("" + jogo.horas);

  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Meus Jogos" }} />
      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do Jogo"
      />
      <TextInput
        style={styles.campo}
        value={plataforma}
        onChangeText={setPlataforma}
        placeholder="Plataforma"
      />
      <TextInput
        style={styles.campo}
        value={horas}
        onChangeText={setHoras}
        placeholder="Quantas horas o jogo possui"
      />
      <Button title="Salvar Jogo" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View style={styles.botaoLateral}>
            <Text style={styles.item}>
              {item.id} - {item.nome} - {item.plataforma} - {item.horas}
            </Text>

            <View style={styles.botao}>
                <Button
                title="Editar"
                onPress={() => {
                    editar(item);
                }}
                />
                <Button
                title="Excluir"
                onPress={() => {
                    remover(item.id);
                }}
                />
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