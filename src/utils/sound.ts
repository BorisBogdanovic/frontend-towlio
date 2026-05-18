let audioContext: AudioContext | null = null;

let sendBuffer: AudioBuffer | null = null;
let notificationBuffer: AudioBuffer | null = null;
let receiveBuffer: AudioBuffer | null = null;

const SEND_VOLUME = 0.1;
const NOTIFICATION_VOLUME = 0.25;
const RECEIVE_VOLUME = 0.12;

export const initSounds = async () => {
  if (audioContext) return;

  try {
    audioContext = new AudioContext();

    const sendRes = await fetch("/sound/send.mp3");
    sendBuffer = await audioContext.decodeAudioData(
      await sendRes.arrayBuffer(),
    );

    const notifRes = await fetch("/sound/notification.mp3");
    notificationBuffer = await audioContext.decodeAudioData(
      await notifRes.arrayBuffer(),
    );

    const receiveRes = await fetch("/sound/receive.mp3");
    receiveBuffer = await audioContext.decodeAudioData(
      await receiveRes.arrayBuffer(),
    );
  } catch {
    audioContext = null;
    sendBuffer = null;
    notificationBuffer = null;
    receiveBuffer = null;
  }
};

const play = (buffer: AudioBuffer | null, volume: number) => {
  if (!audioContext || !buffer) return;

  try {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();

    gainNode.gain.value = volume;
    source.buffer = buffer;

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start(0);
  } catch (err) {
    console.error("Sound playback failed:", err);
  }
};

export const playSendSound = () => {
  play(sendBuffer, SEND_VOLUME);
};

export const playNotificationSound = () => {
  play(notificationBuffer, NOTIFICATION_VOLUME);
};

export const playReceiveSound = () => {
  play(receiveBuffer, RECEIVE_VOLUME);
};
