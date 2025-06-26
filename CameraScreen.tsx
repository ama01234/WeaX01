import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const camerabackImage = require('./cameraback03.png'); // ローカル画像

export default function CameraScreen() {
  const router = useRouter();

  const handleTakePhoto = () => {
    console.log("撮影する");
  };

  return (
    <View style={styles.container}>
      {/* 📸 ヘッダー画像 */}
      <Image
        source={camerabackImage}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <Text style={styles.text}>追加方法を選択してください</Text>

      <View style={styles.iconRow}>
        {/* 画像アップロードボタン（機能なし） */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            router.push('/choose');
          }}
        >
          <MaterialIcons name="add-photo-alternate" size={80} color="#E75480" />
          <Text style={styles.iconText}>     画像を{"\n"}アップロード</Text>
        </TouchableOpacity>

        {/* 撮影ボタン */}
        <TouchableOpacity style={styles.iconButton} onPress={handleTakePhoto}>
          <MaterialIcons name="add-a-photo" size={80} color="#E75480" />
          <Text style={styles.iconText}>撮影する</Text>
        </TouchableOpacity>
      </View>

      {/* ホームに戻るボタン */}
      <View style={styles.buttonContainer}>
        <Button
          title="<ホームに戻る"
          onPress={() => router.push('/home')}
          color="#223A5E"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: screenHeight * 0.25,
  },
  text: {
    marginTop: 100,
    fontSize: 22,
    color: 'black',
    marginVertical: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 50,       // 上からの距離少なめ（中央寄せ）
    marginBottom: 40,
    alignItems: 'center',
  },
  
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,   // 上下の余白を多くして「大きめ」に
    paddingHorizontal: 30, // 横の余白も広め
    elevation: 5,
    width: 170,            // ボタンの幅を指定して調整
    height: 160,           // 高さも指定して丸みを強調してもOK
  },
  
  iconText: {
    marginTop: 12,
    color: '#7D7D7D',
    fontWeight: 'bold',
    fontSize: 16,           // 文字も少し大きく
  },
  buttonContainer: {
    position: 'absolute',
    top: 190,
    left: 20,
    zIndex: 10,
  },
});
