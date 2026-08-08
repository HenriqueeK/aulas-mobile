import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, TextInput, SafeAreaView} from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');
  return (
    <View style={styles.container}>
      <Text>Eai></Text>
      <SafeAreaProvider>
        <SafeAreaView>
          <TextInput
              style={styles.input}
              value={text}
              onChangeText={onChangeText}
          />

          <TextInput
              style={styles.input}
              value={number}
              onChangeText={onChangeNumber}
              placeholder="useless placeholder"
              keyboardType="numeric"
          />
        </SafeAreaView>
      </SafeAreaProvider>
      <Button
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
      />
      <Pressable>
        <Text>Olá!</Text>
      </Pressable>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003dff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
  },
});
