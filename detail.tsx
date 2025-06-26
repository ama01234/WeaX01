import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';

export default function DetailScreen() {
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

      {/* 一つ戻る */}
      <View style={styles.backButton}>
        <Button
          title="一つ戻る >"
          onPress={() => router.back()}
          color="#223A5E"
        />
      </View>

      {/* 日付と天気 */}
      <Text style={styles.headerText}>→ 2025年7月7日　33℃　晴れ ☀️</Text>

      {/* 吹き出し（中央1/3） */}
      <View style={styles.bubbleWrapper}>
        <View style={styles.speechBubble}>
          <Text style={styles.bubbleContent}>
            <Text style={styles.sectionTitle}>トップス{"\n"}</Text>
            暑い気温に合わせて、通気性の良いTシャツをチョイス。{"\n"}
            爽やかな青色が視覚的にも涼しさを演出し、夏らしい印象に。{"\n\n"}

            <Text style={styles.sectionTitle}>ボトムス{"\n"}</Text>
            風通しの良さを重視した軽やかなボトムスをセレクト。{"\n"}
            トップスとの色のバランスを考え、ベージュカラーでナチュラルなコントラストを実現。{"\n"}
            全体的に柔らかく落ち着いた雰囲気に仕上がっています。
          </Text>
        </View>
      </View>

      {/* 時刻 */}
      <Text style={styles.timeText}>14時53分</Text>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    paddingTop: 80,
    alignItems: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  headerText: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 12,
  },
  bubbleWrapper: {
    width: screenWidth * 0.6, // 画面の約1/3～2/3に調整
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  bubbleContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#223A5E',
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: '#7D7D7D',
    marginTop: 12,
    alignSelf: 'flex-end',
    marginRight: 30,
  },
});
