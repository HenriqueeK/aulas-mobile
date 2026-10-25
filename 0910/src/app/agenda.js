import { useEffect, useState } from "react";
import {StyleSheet, Text, View, Button, FlatList, TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("agenda.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS agenda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      numero INTEGER
    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM agenda ORDER BY id DESC");
}

function salvar(nome, numero) {
  db.runSync("INSERT INTO agenda (nome, numero) VALUES (?, ?)", [nome, numero]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM agenda WHERE id = ?", [codigo]);
}

function edita(nome, numero, id) {
  db.runSync("UPDATE agenda SET nome = ?,  numero= ? WHERE id = ?", [
    nome,
    numero,
    id,
  ]);
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(nome, numero);
    } else {
      edita(nome, numero, idEditando);
    }
    setNome("");
    setNumero("");
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(agenda) {
    setIdEditando(agenda.id);
    setNome(agenda.nome);
    setNumero("" + agenda.numero);

  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Minha agenda" }} />
      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />
      <TextInput
        style={styles.campo}
        value={numero}
        onChangeText={setNumero}
        placeholder="Numero"
      />
      <Button title="Salvar contato" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View style={styles.botaoLateral}>
            <Text style={styles.item}>
              {item.id} - {item.nome} - {item.numero}
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