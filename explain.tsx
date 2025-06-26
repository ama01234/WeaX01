import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function explain() {
  const router = useRouter();
  
  return (
  
     <View style={styles.container}>
       <Text style={styles.text}>説明情報を取得する</Text>
       <View style={{ marginTop: 20, width: '80%' }}>
         <Button title="ホームに戻る" onPress={() => router.push('/home')} />
       </View>
     </View>
   
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  text: { fontSize: 22 },
});

