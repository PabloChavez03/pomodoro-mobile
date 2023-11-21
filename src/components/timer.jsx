import { StyleSheet, Text, View } from "react-native";
import { formatTime } from "../utils/formated-time";
export function Timer ({ time }) {

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 15,
    flex: 0.3,
    justifyContent: 'center'
  },
  time: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  }
})