import { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "./src/components/header";
import { Timer } from "./src/components/timer";
import { colors } from "./src/utils/colors";
import { alarmSound, onHandleSound } from "./src/utils/handle-sound";

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "BREAK" | "SHORT");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      alarmSound();
      setIsActive(false);
      setIsWorking(prev => !prev);
      if (currentTime === 1) {
        setTime(5 * 60);
      } else if (currentTime === 2) {
        setTime(15 * 60);
      } else {
        setTime(25 * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function onHandleStartAndStop() {
    onHandleSound();
    setIsActive(!isActive);
    setIsWorking(!isWorking);
  }

  function onHandleReset() {
    onHandleSound();
    setIsActive(false);
    setIsWorking(false);
    if (currentTime === 1) {
      setTime(5 * 60);
    } else if (currentTime === 2) {
      setTime(15 * 60);
    } else {
      setTime(25 * 60);
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime].bg }]}
    >
      <View style={{ display: "flex", alignItems: "center" ,flex: 1, position: "relative" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Pomodoro</Text>
          <Header
            updateTime={setTime}
            currentTime={currentTime}
            updateCurrentTime={setCurrentTime}
          />
          <Timer time={time} />
          <TouchableOpacity style={styles.button} onPress={onHandleStartAndStop}>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                letterSpacing: 2,
                fontSize: 16,
              }}
            >
              {isActive ? "PAUSE" : "START"}
            </Text>
          </TouchableOpacity>
        </View>

        {isWorking && (
          <TouchableOpacity
            style={{ position: "absolute", bottom: 40}}
            onPress={() => {
              onHandleReset();
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                letterSpacing: 2,
                fontSize: 16,
              }}
            >
              RESTART
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  }
});
