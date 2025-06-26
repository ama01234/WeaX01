import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactNode, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 画面遷移用の型（必要に応じてルート定義を変更）
type RootStackParamList = {
  rode: { selectedScene: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'rode'>;



export default function Coordinate() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedScene, setSelectedScene] = useState<string | null>(null);

  const handleSelect = (scene: string) => setSelectedScene(scene);
  const handleConfirm = () => {
    if (selectedScene) navigation.navigate('rode', { selectedScene });
  };

  const buttons = [
    { icon: <FontAwesome5 name="user-tie" size={30} color="white" />, label: 'フォーマル' },
    { icon: <Ionicons name="shirt-outline" size={30} color="white" />, label: 'カジュアル' },
    { icon: <MaterialCommunityIcons name="run" size={30} color="white" />, label: 'アクティブ' },
    { icon: <Ionicons name="balloon" size={30} color="white" />, label: 'イベント' },
    { icon: <Ionicons name="people-circle" size={30} color="white" />, label: '友達と遊びに行く' },
  ];

  return (
    <View style={styles.container}>
      {/* 戻るボタン・タイトルはそのまま */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>＜ホームに戻る</Text>
      </TouchableOpacity>

      <Text style={styles.title}>シーンを選んでください</Text>

      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        <View style={styles.buttonsGrid}>
          {buttons.map(({ icon, label }) => (
            <SceneButton
              key={label}
              icon={icon}
              label={label}
              onPress={() => handleSelect(label)}
              selected={selectedScene === label}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.selectionContainer}>
        <Text style={styles.selectionText}>
          {selectedScene ? `選択中: ${selectedScene}` : 'シーンを選んでください'}
        </Text>

        <TouchableOpacity
          style={[styles.confirmButton, !selectedScene && styles.confirmButtonDisabled]}
          disabled={!selectedScene}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>生成する！</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// SceneButton コンポーネント（selected 状態反映）
type SceneButtonProps = {
  icon: ReactNode;
  label: string;
  onPress: () => void;
  selected?: boolean;
};

const SceneButton: React.FC<SceneButtonProps> = ({ icon, label, onPress, selected }) => (
  <TouchableOpacity
    style={[styles.button, selected && styles.buttonSelected]}
    onPress={onPress}
  >
    {icon}
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: { marginBottom: 10 },
  backText: { color: '#223A5E', fontSize: 16 },
  title: {
    fontSize: 24,
    color: '#E75480',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  buttonsContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // gapはAndroidで使えないのでマージンで調整
  },

  button: {
    backgroundColor: '#223A5E',
    width: '48%', // 2列にぴったり収まるサイズ
    aspectRatio: 1, // 正方形にする
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonSelected: {
    backgroundColor: '#E75480',
  },

  buttonText: {
    color: 'white',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },

  selectionContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  selectionText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#223A5E',
  },

  confirmButton: {
    backgroundColor: '#223A5E',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
  },

  confirmButtonDisabled: {
    backgroundColor: '#888',
  },

  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
