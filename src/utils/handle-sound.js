import { Audio } from 'expo-av';
export async function onHandleSound () {
  const { sound } = await Audio.Sound.createAsync(
    require('../../assets/click.mp3')
  );
  await sound.playAsync();
}

export async function alarmSound () {
  const { sound } = await Audio.Sound.createAsync(
    require('../../assets/temporizador.mp3')
  );
  await sound.playAsync();
}