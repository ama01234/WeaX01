import { useRouter } from 'expo-router';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function user() {
  const router = useRouter();

  // サンプルユーザーデータ
  const userData = {
    name: '田中 太郎',
    gender: '男性',
    address: '東京都渋谷区渋谷1-1-1',
    generationCount: 42
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ユーザー情報</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>名前</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{userData.name}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>性別</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{userData.gender}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>住所</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{userData.address}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.label}>生成回数</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.countValue}>{userData.generationCount}回</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="<ホームに戻る" 
            onPress={() => router.push('/home')}
            color="#223A5E"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E75480',
    textAlign: 'center',
    marginBottom: 40,
  },
  infoContainer: {
    backgroundColor: '#d3d3d3',
    marginBottom: 40,
    width: '33%',
    alignSelf: 'center',
  },
  infoItem: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#7D7D7D',
    paddingBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7D7D7D',
    marginBottom: 8,
  },
  valueContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#7D7D7D',
  },
  value: {
    fontSize: 18,
    color: '#223A5E',
    fontWeight: '500',
  },
  countValue: {
    fontSize: 24,
    color: '#E75480',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute', // ← 画面上に固定配置
    top: 20,               // 上から20px
    left: 20,              // 左から20px
  },
});