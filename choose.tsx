import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const images = [
  { name: 'pants01.png', type: 'pants', source: require('./assets/pants01.png') },
  { name: 'pants03.png', type: 'pants', source: require('./assets/pants03.png') },
  { name: 'shirt01.png', type: 'shirt', source: require('./assets/shirt01.png') },
  { name: 'shirt02.png', type: 'shirt', source: require('./assets/shirt02.png') },
  { name: 'shirt03.png', type: 'shirt', source: require('./assets/shirt03.png') },
];

export default function ChooseScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (name: string) => {
    setSelected(name === selected ? null : name);
  };

  const handleAnalyze = () => {
    const selectedItem = images.find(img => img.name === selected);
    if (!selectedItem) return;

    if (selectedItem.type !== 'pants') {
      Alert.alert('エラー', 'パンツ画像を選択してください。');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({ pathname: '/bunnseki', params: { selected: selectedItem.name } });
    }, 5000);
  };

  const renderItem = ({ item }: { item: typeof images[number] }) => {
    const isSelected = selected === item.name;
    return (
      <TouchableOpacity style={styles.imageWrapper} onPress={() => handleSelect(item.name)}>
        <Image source={item.source} style={styles.image} />
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkboxCircle, isSelected && styles.checkboxChecked]} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* ホームに戻る */}
      <View style={styles.buttonContainer}>
        <Button
          title="<ホームに戻る"
          onPress={() => router.push('/home')}
          color="#223A5E"
        />
      </View>

      {/* 画像一覧 */}
      <FlatList
        data={images}
        keyExtractor={item => item.name}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />

      {/* ローディング or 分析開始ボタン */}
      {selected && !loading && (
        <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
          <Text style={styles.analyzeButtonText}>分析開始</Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#E75480" />
          <Text style={styles.loadingText}>読み込み中…</Text>
        </View>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width / 2 - 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingTop: 60,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: 6,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 3,
  },
  checkboxCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#7D7D7D',
  },
  checkboxChecked: {
    backgroundColor: '#E75480',
    borderColor: '#E75480',
  },
  analyzeButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#E75480',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  loadingText: {
    color: '#223A5E',
    fontSize: 16,
  },
});
