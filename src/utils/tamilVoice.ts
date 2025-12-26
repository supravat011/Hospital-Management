// Tamil Text-to-Speech utility using Web Speech API

export const speakTamil = (text: string): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-Speech is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ta-IN'; // Tamil language code
  utterance.rate = 0.8; // Slower rate for elderly users
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to find a Tamil voice
  const voices = window.speechSynthesis.getVoices();
  const tamilVoice = voices.find(
    (voice) => voice.lang === 'ta-IN' || voice.lang.startsWith('ta')
  );
  
  if (tamilVoice) {
    utterance.voice = tamilVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const isSpeaking = (): boolean => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
};

// Preload voices (call this on app init)
export const preloadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};
