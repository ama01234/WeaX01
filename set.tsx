import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();

  const handleTerms = () => {
    Alert.alert('利用規約', 'このアプリの利用には、常識と優しさが必要です。');
  };

  const handleVersion = () => {
    Alert.alert('バージョン情報', 'Version 1.0.0\n最終更新：2025年6月');
  };

  const handleLogout = () => {
    Alert.alert('ログアウト', 'ログアウトしました（実際の処理は未実装）');
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

      <Text style={styles.title}>設定</Text>

      <TouchableOpacity style={styles.settingItem} onPress={handleTerms}>
        <Text style={styles.settingText}> 利用規約</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleVersion}>
        <Text style={styles.settingText}>バージョン情報</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.settingItem, styles.logoutItem]} onPress={handleLogout}>
        <Text style={styles.logoutText}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#223A5E',
    marginBottom: 40,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  logoutItem: {
    backgroundColor: '#E75480',
  },
  logoutText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
