import { useState } from "react";
import { Button, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Cep() {
  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState({});
  const [fantasia, setFantasia] = useState({});
    const [municipio, setMunicipio] = useState({});
    const [uf, setUf] = useState({});

  const [erro, setErro] = useState("");

  // async: esta função vai esperar a internet (await).
  async function buscar() {
    // 1. Pede para a API. Teste a mesma URL no navegador.
    const resposta = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
    // 2. Transforma o texto da resposta em objeto.
    const dados = await resposta.json();

    // 3. CEP que não existe: a ViaCEP devolve { erro: "true" }.
    if (dados.erro) {
      setErro("CNPJ não encontrado.");
      setNome({});
      setFantasia({});
      setMunicipio({});
      setUf({});
    } else {
      setErro("");
        setNome(dados);
      setFantasia(dados);
      setMunicipio(dados);
      setUf(dados);
    }
  }

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Buscar CNPJ" }} />

      <TextInput
        style={styles.campo}
        value={cnpj}
        onChangeText={setCnpj}
        placeholder="Digite o CEP, só números"
        keyboardType="numeric"
      />
      <Button title="Buscar" onPress={buscar} />

      <Text style={styles.erro}>{erro}</Text>
      <Text style={styles.titulo}>{nome.nome}</Text>
      <Text style={styles.titulo}>{fantasia.fantasia}</Text>
      <Text style={styles.titulo}>{municipio.municipio}</Text>
      <Text style={styles.titulo}>{uf.uf}</Text>

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