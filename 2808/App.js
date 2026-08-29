import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (

    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{gap: 10, flexDirection: "row"}}>
          <View style={{backgroundColor: 'black', width: 65, height: 65, borderRadius: 50}}></View>
          <View style={{justifyContent: "center"}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Olá, Tudo bem?
            </Text>
            <Text>
              Sua trilha do dia
            </Text>
        </View>
        </View>
      </View>

      
      <Text style={{paddingHorizontal: 16, paddingTop: 20, fontWeight: 'bold'}}>
        Menu
      </Text>

      <View style={{flexDirection: "row", alingItems: "center", justifyContent:"space-around", paddingHorizontal: 10}}>
        <View style={[styles.caixa, {backgroundColor: 'green'}]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>PLAYLITS</Text>
        </View>
        <View style={[styles.caixa, {backgroundColor: 'blue'}]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>ARTISTAS</Text>
        </View>
        <View style={[styles.caixa, {backgroundColor: 'red'}]}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>RÁDIO</Text>
        </View>
      </View>

      <Text style={{paddingHorizontal: 16, paddingTop: 20, fontWeight: 'bold'}}>Tocadas recentemente</Text>

      <View style={{paddingHorizontal: 15, paddingTop: 10, justifyContent: "space-around", gap: 10}}>
        <View style={[styles.caixaMusica, {backgroundColor: "#c9e5af"}]}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC - tocando agora</Text>
          </View>
          <Text>4:52</Text>
        </View>
        <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Chop Suey</Text>
            <Text>System of a Down</Text>
          </View>
          <Text>3:30</Text>
        </View>
        <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Back in Back</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>4:15</Text>
        </View>
        <View style={styles.caixaMusica}>          
          <View>
            <Text style={styles.deixaBonito}>Toxicity</Text>
            <Text>System of a Down</Text>
          </View>
          <Text>3:39</Text>
        </View>
        <View style={styles.caixaMusica}>          
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:28</Text>
        </View>
        <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>
                <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>
                <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>
                <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>
                <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>
                <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>
                <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>
                <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>
        <View style={styles.caixaMusica}>
          <View>
            <Text style={styles.deixaBonito}>Thunderstruck</Text>
            <Text>AC/DC</Text>
          </View>
          <Text>3:55</Text>
        </View>

      </View>

      <View style={{alignItems:"center", padding: 30, gap: 15}}>

        <Text>Assine agora o Premium e ouça sem anúncios!</Text>

        <View style={{backgroundColor: "green", width: 150, height: 40, justifyContent: "center", alignItems: "center", borderRadius:5}}>
          <Text style={{color: "white"}}>ASSINAR AGORA</Text>
        </View>

      </View>

    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal:  16,
    flexDirection: "row",
  },

  caixa: {
    width: 110,
    height: 40,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  caixaMusica: {
    backgroundColor: "#fef9f6",
    width: 355,
    height: 75,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "20",
    borderRadius: 10,
  },

  deixaBonito: {
    fontSize: 17,
    fontWeight: 'bold'
  }
});
