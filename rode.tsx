import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const icons = ['☀️', '🌡️', '📈', '🎨'];
const ICON_SIZE = 40;

export default function LoadingScreen() {
  const router = useRouter();

  // 楕円の位置・サイズ (画面下中央)
  const PUDDING_WIDTH = 220;
  const PUDDING_HEIGHT = 100;
  const PUDDING_Y = SCREEN_HEIGHT - 120; // 画面下からの位置調整
  const PUDDING_X = SCREEN_WIDTH / 2 - PUDDING_WIDTH / 2;

  // 楕円の揺れアニメーション
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // アイコンの複数のアニメーション状態を管理
  // 各アイコンに対し、降下用のY, XのAnimated.Value と opacity を用意
  const [drops] = useState(
    icons.map(() => ({
      translateY: new Animated.Value(-ICON_SIZE - Math.random() * SCREEN_HEIGHT), // ランダム上からスタート
      translateX: new Animated.Value(Math.random() * (SCREEN_WIDTH - ICON_SIZE)),
      opacity: new Animated.Value(1),
      isAbsorbed: false,
    }))
  );

  useEffect(() => {
    // 初回落下を開始
    drops.forEach((drop) => {
      startDrop(drop);
    });
  
    // 吸収判定と処理
    drops.forEach((drop) => {
      const listenerId = drop.translateY.addListener(({ value }) => {
        if (!drop.isAbsorbed && value >= PUDDING_Y) {
          drop.isAbsorbed = true;
          drop.translateY.stopAnimation();
  
          Animated.parallel([
            Animated.timing(drop.opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(drop.translateY, {
              toValue: PUDDING_Y + PUDDING_HEIGHT,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            animatePudding();
            setTimeout(() => startDrop(drop), 1000);
          });
        }
      });
  
      (drop as any)._listenerId = listenerId;
    });
  
    // 👇 タイマー処理
    const timer = setTimeout(() => {
      router.push('/makecoordinate');
    }, 5000);
  
    // ✅ クリーンアップ（returnは1つだけ！）
    return () => {
      clearTimeout(timer);
      drops.forEach((drop) => {
        if ((drop as any)._listenerId) {
          drop.translateY.removeListener((drop as any)._listenerId);
        } else {
          drop.translateY.removeAllListeners();
        }
      });
    };
  }, []);
  
  

  const startDrop = (drop: {
    translateY: Animated.Value;
    translateX: Animated.Value;
    opacity: Animated.Value;
    isAbsorbed: boolean;
  }) => {
  
    Animated.timing(drop.translateY, {
      toValue: PUDDING_Y + PUDDING_HEIGHT,
      duration: 4000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };
  
  

  // 楕円を揺らすアニメーション
  const animatePudding = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.15, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* ホームに戻るボタン */}
      <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>{'<ホームに戻る'}</Text>
      </TouchableOpacity>

      {/* アイコン（雨のようにランダムXで落下） */}
      {drops.map((drop, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.icon,
            {
              opacity: drop.opacity,
              transform: [
                { translateY: drop.translateY },
                { translateX: drop.translateX },
              ],
              position: 'absolute',
            },
          ]}
        >
          {icons[i]}
        </Animated.Text>
      ))}

      {/* 画面下の楕円（プリン風） */}
      <Animated.View style={[styles.pudding, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.face}>
          <View style={styles.eye} />
          <View style={styles.eye} />
          <View style={styles.mouth} />
        </View>
        <Text style={styles.text}>考えています</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#223A5E',
    zIndex: 10,
  },
  buttonText: {
    color: '#223A5E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  icon: {
    fontSize: ICON_SIZE,
    color: '#E75480',
    textShadowColor: '#7D7D7D',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  pudding: {
    position: 'absolute',
    bottom: 40,
    left: SCREEN_WIDTH / 2 - 110,
    width: 220,
    height: 100,
    backgroundColor: '#7D7D7D',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  face: {
    position: 'absolute',
    top: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    paddingHorizontal: 20,
  },
  eye: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#223A5E',
  },
  mouth: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    marginLeft: -10,
    width: 20,
    height: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#223A5E',
    borderRadius: 4,
  },
  text: {
    marginTop: 60,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
