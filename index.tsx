import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = () => {
    if (username && password) {
      router.push('/home');
    } else {
      alert('ユーザー名とパスワードを入力してください');
    }
  };
  return (
    <ImageBackground source={require('./hukupic.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.tagline}>天気で迷わない、服選びが変わる</Text>
        <Text style={styles.appName}>WeaX (Weather&Closet&DX)</Text>
        <TextInput
          style={styles.input}
          placeholder="google@gmail.com"
          placeholderTextColor="#fff"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="PassWord"
          placeholderTextColor="#fff"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ログイン</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  appName: {
    fontSize: 42,
    fontFamily: 'serif',
    color: 'white',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FF69B4',
    color: 'white',
    width: '100%',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});