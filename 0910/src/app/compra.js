import { useEffect, useState } from "react";
import {StyleSheet, Text, View, Button, FlatList, TextInput, Switch, TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("compra.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS compra (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item VARCHAR(255) NOT NULL,
      quantidade INTEGER,
      comprado BOOLEAN NOT NULL
    )
  `);

function listar() {
  return db.getAllSync("SELECT * FROM compra ORDER BY id DESC");
}

function salvar(item, quantidade, comprado) {
  db.runSync("INSERT INTO compra (item, quantidade, comprado) VALUES (?, ?, ?)", [item, quantidade, comprado ? 1 : 0]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM compra WHERE id = ?", [codigo]);
}

function edita(item, quantidade, comprado, id) {
  db.runSync("UPDATE compra SET item = ?,  quantidade= ?, comprado = ? WHERE id = ?", [
    item,
    quantidade,
    comprado ? 1 : 0,
    id,
  ]);
}

function alternar(id, comprado) {
  db.runSync("UPDATE compra SET comprado = ? WHERE id = ?", [comprado ? 0 : 1, id]);
}

function limparComprados() {
  db.runSync("DELETE FROM compra WHERE comprado = 1");
}

export default function Lista() {
  const [lista, setLista] = useState([]);
  const [item, setItem] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [comprado, setComprado] = useState(false);
  const [idEditando, setIdEditando] = useState(0);

  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(item, quantidade, comprado);
    } else {
      edita(item, quantidade, comprado, idEditando);
    }
    setItem("");
    setQuantidade("");
    setComprado(false);
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function marcar(compra) {
    alternar(compra.id, compra.comprado);
    carregar();
  }

  function limpar() {
    limparComprados();
    carregar();
  }

  function editar(compra) {
    setIdEditando(compra.id);
    setItem(compra.item);
    setQuantidade("" + compra.quantidade);
    setComprado(compra.comprado === 1);


  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Minhas Compras" }} />
      <TextInput
        style={styles.campo}
        value={item}
        onChangeText={setItem}
        placeholder="item"
      />
      <TextInput
        style={styles.campo}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="quantidade"
      />

      <View style={styles.linhaSwitch}>
        <Text style={styles.rotulo}>Comprado</Text>
        <Switch value={comprado} onValueChange={setComprado} />
      </View>
      <Button title="Salvar" onPress={guardarOuEditar} />
      <Button title="Limpar comprados" onPress={limpar} />

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View style={styles.botaoLateral}>
            <TouchableOpacity onPress={() => marcar(item)}>
              <Text style={[styles.item, item.comprado === 1 && styles.riscado]}>
                {item.id} - {item.item} - {item.quantidade} - {item.comprado ? "Sim" : "Não"}
              </Text>
            </TouchableOpacity>

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

  linhaSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  rotulo: {
    fontSize: 16,
    color: "#111827",
  },

  riscado: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
});