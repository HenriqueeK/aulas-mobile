import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

export default function Inicio() {
  return (
    <SafeAreaView style={styles.tela}>

      <View style={styles.cartao}>
        <Link style={styles.titulo} href="/3107" >
          31/07 AULA 1 →
        </Link>
      </View>
      
      <View style={styles.cartao}>
        <Link style={styles.titulo} href="/0708" >
          07/08 AULA 2 →
        </Link>
      </View>

      <View style={styles.cartao}>
        <Link style={styles.titulo} href="/1407" >
          14/07 AULA 3 →
        </Link>
      </View>

      <View style={styles.cartao}>
        <Link style={styles.titulo} href="/2108" >
          21/08 AULA 4 →
        </Link>
      </View>

      <View style={styles.cartao}>
        <Link style={styles.titulo} href="/2808" >
          28/08 AULA 5 →
        </Link>
      </View>

      <View style={styles.cartao}>
        <Link style={styles.titulo} href="/2104" >
          ATIVIDADE EM CASA
        </Link>
      </View>

      <View style={styles.cartao}>
        <Link style={styles.titulo} href="/avaliacao1" >
          Avaliação 1 →
        </Link>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: "#0066ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 6,
    alignItems: "center",
  },

  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
