import { useEffect, useState } from "react";
import {StyleSheet, Text, View, Button, FlatList, TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("filme.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS filme (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo VARCHAR(255) NOT NULL,
      nota REAL NOT NULL
    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM filme ORDER BY id DESC");
}

function salvar(titulo, nota) {
  db.runSync("INSERT INTO filme (titulo, nota) VALUES (?, ?)", [titulo, nota]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM filme WHERE id = ?", [codigo]);
}

function edita(titulo, nota, id) {
  db.runSync("UPDATE filme SET titulo = ?, nota = ? WHERE id = ?", [
    titulo,
    nota,
    id,
  ]);
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [nota, setNota] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    const valor = Number(nota.replace(",", "."));
    if (isNaN(valor) || valor < 0 || valor > 10) {
      return;
    }
    if (idEditando === 0) {
      salvar(titulo, valor);
    } else {
      edita(titulo, valor, idEditando);
    }
    setTitulo("");
    setNota("");
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(filme) {
    setIdEditando(filme.id);
    setTitulo(filme.titulo);
    setNota("" + filme.nota);


  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Avaliação de Filmes" }} />
      <TextInput
        style={styles.campo}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="titulo"
      />
      <TextInput
        style={styles.campo}
        value={nota}
        onChangeText={setNota}
        placeholder="nota (0 a 10)"
        keyboardType="decimal-pad"
      />
      <Button title="Salvar filme" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View style={styles.botaoLateral}>
            <Text style={styles.item}>
              {item.id} - {item.titulo} -{" "}
              <Text style={item.nota >= 7 ? styles.verde : styles.vermelha}>
                {item.nota.toFixed(1)}
              </Text>
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
  },

  verde: {
    color: "#16A34A",
    fontWeight: "bold",
  },

  vermelha: {
    color: "#DC2626",
    fontWeight: "bold",
  }
});