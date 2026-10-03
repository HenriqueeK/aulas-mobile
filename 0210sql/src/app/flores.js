import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("bordeis.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS flores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      cor VARCHAR(255) NOT NULL,
      nomeCientifico VARCHAR(255) NOT NULL
    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM flores ORDER BY id DESC");
}

function salvar(nome, cor, nomeCientifico) {
  db.runSync("INSERT INTO flores (nome, cor, nomeCientifico) VALUES (?, ?, ?)", [nome, cor, nomeCientifico]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM flores WHERE id = ?", [codigo]);
}

function edita(nome, cor, nomeCientifico, id) {
  db.runSync("UPDATE flores SET nome = ?, cor = ?, nomeCientifico= ? WHERE id = ?", [
    nome,
    cor,
    nomeCientifico,
    id,
  ]);
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("");
  const [nomeCientifico, setNomeCientifico] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(nome, cor, nomeCientifico);
    } else {
      edita(nome, cor, nomeCientifico, idEditando);
    }
    setNome("");
    setCor("");
    setNomeCientifico("");
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(flor) {
    setIdEditando(flor.id);
    setNome(flor.nome);
    setCor(flor.cor);
    setNomeCientifico(flor.nomeCientifico);

  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Tipos de Flores" }} />
      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome da flor"
      />
      <TextInput
        style={styles.campo}
        value={cor}
        onChangeText={setCor}
        placeholder="Cor predominante da flor"
      />
      <TextInput
        style={styles.campo}
        value={nomeCientifico}
        onChangeText={setNomeCientifico}
        placeholder="Nome cientifico da flor"
      />
      <Button title="Salvar" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View style={styles.botaoLateral}>
            <Text style={styles.item}>
              {item.id} - {item.nome} - {item.cor} - {item.nomeCientifico}
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