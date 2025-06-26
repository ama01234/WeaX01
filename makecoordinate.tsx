import { useRouter } from 'expo-router';
import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MakeCoordinateScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ホームに戻る */}
      <View style={styles.homeButton}>
        <Button
          title="<ホームに戻る"
          onPress={() => router.push('/home')}
          color="#223A5E"
        />
      </View>

      {/* 詳細を見る */}
      <View style={styles.detailButton}>
        <Button
          title="詳細を見る >"
          onPress={() => router.push('/detail')}
          color="#E75480"
        />
      </View>

      {/* 日付とメッセージ */}
      <Text style={styles.date}>2025年7月7日　気温33℃　カジュアル</Text>
      <Text style={styles.message}>提案するコーディネートはこちら↓</Text>

      {/* 画像表示（上：シャツ、下：パンツ） */}
      <Image source={require('./assets/shirt01.png')} style={styles.image} />
      <Image source={require('./assets/pants01.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingTop: 100,
    alignItems: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  detailButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  date: {
    fontSize: 20,
    color: '#223A5E',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 24,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    marginVertical: 0, // 間をぴったりに
  },
});
