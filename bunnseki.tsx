import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const imageMap = {
  'pants01.png': require('./assets/pants01.png'),
  'pants03.png': require('./assets/pants03.png'),
  'shirt01.png': require('./assets/shirt01.png'),
  'shirt02.png': require('./assets/shirt02.png'),
  'shirt03.png': require('./assets/shirt03.png'),
};

export default function BunnsekiScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const selected = params.selected as keyof typeof imageMap | undefined;

  const [showMessage, setShowMessage] = useState(false);

  const handleRegister = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1500);
  };

  if (!selected || !imageMap[selected]) {
    return (
      <View style={styles.container}>
        <Text>画像が選択されていません</Text>
        <Button title="<ホームに戻る" onPress={() => router.push('/home')} color="#223A5E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="<ホームに戻る" onPress={() => router.push('/home')} color="#223A5E" />
      </View>

      <Image source={imageMap[selected]} style={styles.image} />
      <Text style={styles.text}>
        カテゴリ：パンツ 👖{'\n'}
        色：ベージュ 🟤{'\n'}
        気温：22℃〜 🌡️{'\n'}
        天気：曇り 🌤️・晴れ ☀️
      </Text>

      {/* 登録メッセージ */}
      {showMessage && (
        <View style={styles.messageOverlay}>
          <Text style={styles.messageText}>登録しました</Text>
        </View>
      )}

      {/* 登録ボタン */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>登録する</Text>
      </TouchableOpacity>

      {/* もう一度分析ボタン */}
      <View style={styles.retryContainer}>
        <Button title="もう一度分析する" onPress={() => router.push('/choose')} color="#555" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  registerButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#E75480',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 50,
    elevation: 3,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  messageOverlay: {
    position: 'absolute',
    top: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 18,
    color: '#333',
  },
  retryContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
