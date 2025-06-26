import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={require('./summer.jpg')} style={styles.background}>
      <View style={styles.overlay}>

        <Image
          source={require('./weather.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.text}>ようこそWeaXへ！</Text>

        <View style={styles.mainButtonArea}>
          {/* 🔸中央：コーディネート生成ボタン */}
          <TouchableOpacity 
            style={styles.coordinateButton} 
            onPress={() => router.push('/coordinate')}
          >
            <FontAwesome6 name="shirt" size={100} color="white" />
            <Text style={styles.buttonLabel}>コーディネートを生成</Text>
          </TouchableOpacity>

          {/* 🔹左右：ユーザー情報ボタン（左）・撮影ボタン（右） */}
          <View style={styles.sideButtonsRow}>
            {/* ユーザー情報ボタン */}
            <TouchableOpacity 
              style={styles.sideButton} 
              onPress={() => router.push('/user')}
            >
              <FontAwesome name="user-circle-o" size={80} color="white" />
              <Text style={styles.buttonLabel}>ユーザー情報</Text>
            </TouchableOpacity>

            {/* 撮影ボタン */}
            <TouchableOpacity 
              style={styles.sideButton} 
              onPress={() => router.push('/CameraScreen')}
            >
              <FontAwesome name="camera" size={70} color="white" />
              <Text style={styles.buttonLabel}>写真を追加</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settingsButton}>
          <Button title="設定" onPress={() => router.push('/set')} 
            color="#223A5E"/>
        </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:50,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  logo: {
    width: '70%', 
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
   
 mainButtonArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  //並び方：左右のボタン
  sideButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
    gap: 60,
  },
  
  sideButton: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  coordinateButton: {
    marginVertical: 40,
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  coordinateImage: {
    width: 150,
    height: 150,
  },
  
  userImage: {
    width: 100,
    height: 100,
  },
  
  cameraImage: {
    width: 90,
    height: 90,
  },
  
  //設定ボタン
settingsButton: {
  position: 'absolute',  // 画面上の固定位置指定
  bottom: 30,            // 下から30px
  right: 20,             // 右から20px
  width: 120,            // ボタンの幅（必要に応じて調整）
},

buttonLabel: {
  color: 'white',
  fontSize: 16,
  marginTop: 5,
  textAlign: 'center',
},


});
