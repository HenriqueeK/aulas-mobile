import { useEffect, useState } from "react";
import {StyleSheet, Text, View, Button, FlatList, TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("biblioteca.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS biblioteca (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo VARCHAR(255) NOT NULL,
      autor VARCHAR(255) NOT NULL,
      paginas INTEGER
    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM biblioteca ORDER BY id DESC");
}

function salvar(titulo, autor, paginas) {
  db.runSync("INSERT INTO biblioteca (titulo, autor, paginas) VALUES (?, ?, ?)", [titulo, autor, paginas]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM biblioteca WHERE id = ?", [codigo]);
}

function edita(titulo, autor, paginas, id) {
  db.runSync("UPDATE biblioteca SET titulo = ?,  autor= ?, paginas = ? WHERE id = ?", [
    titulo,
    autor,
    paginas,
    id,
  ]);
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [paginas, setPaginas] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(titulo, autor, paginas);
    } else {
      edita(titulo, autor, paginas, idEditando);
    }
    setTitulo("");
    setAutor("");
    setPaginas("");
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(biblioteca) {
    setIdEditando(biblioteca.id);
    setTitulo(biblioteca.titulo);
    setAutor(biblioteca.autor);
    setPaginas("" + biblioteca.paginas);


  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Minha Biblioteca" }} />
      <TextInput
        style={styles.campo}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="titulo"
      />
      <TextInput
        style={styles.campo}
        value={autor}
        onChangeText={setAutor}
        placeholder="Autor"
      />

        <TextInput
        style={styles.campo}
        value={paginas}
        onChangeText={setPaginas}
        placeholder="paginas"
      />
      <Button title="Salvar livro" onPress={guardarOuEditar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View style={styles.botaoLateral}>
            <Text style={styles.item}>
              {item.id} - {item.titulo} - {item.autor} - {item.paginas}
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