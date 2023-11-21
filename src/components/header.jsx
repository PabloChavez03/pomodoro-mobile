import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/*
  Como tarea podria agregar logica que cuando el time llega a 0, dependiendo en la instancia en la que este lo mande a pomodoro o a otro break
*/

const options = ["Pomodoro", "Short Break", "Long Break"];
export function Header ({ time, currentTime, updateCurrentTime, updateTime }) {

  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    updateCurrentTime(index)
    updateTime(newTime * 60)

  }

  return (
    <View style={styles.container}>
      {options?.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.items,
            currentTime !== index && { borderColor: 'transparent' }]}
          onPress={() => handlePress(index)}>
          <Text style={{ fontWeight: currentTime === index ? 'bold' : 'normal' }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  items: {
    borderWidth: 3,
    padding: 5,
    width: "33%",
    borderColor: '#fff',
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center'
  }
})