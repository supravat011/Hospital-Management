// Tamil Text-to-Speech utility using Web Speech API

export const speakTamil = (text: string): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-Speech is not supported in this browser.');
    alert('Text-to-Speech is not supported in your browser. Please use Chrome, Edge, or Safari.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Wait a bit for cancel to complete
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN'; // Tamil language code
    utterance.rate = 0.8; // Slower rate for elderly users
    utterance.pitch = 1;
    utterance.volume = 1;

    // Get available voices
    let voices = window.speechSynthesis.getVoices();

    // If voices aren't loaded yet, wait for them
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        setVoiceAndSpeak(utterance, voices, text);
      };
    } else {
      setVoiceAndSpeak(utterance, voices, text);
    }
  }, 100);
};

const setVoiceAndSpeak = (utterance: SpeechSynthesisUtterance, voices: SpeechSynthesisVoice[], text: string) => {
  // Try to find a Tamil voice (ta-IN or ta)
  let tamilVoice = voices.find(voice => voice.lang === 'ta-IN');

  if (!tamilVoice) {
    tamilVoice = voices.find(voice => voice.lang.startsWith('ta'));
  }

  // If no Tamil voice, try Hindi as fallback (closer to Tamil than English)
  if (!tamilVoice) {
    tamilVoice = voices.find(voice => voice.lang === 'hi-IN' || voice.lang.startsWith('hi'));
  }

  // Last resort: use any available voice
  if (!tamilVoice && voices.length > 0) {
    tamilVoice = voices[0];
    console.warn('Tamil voice not found. Using default voice:', tamilVoice.name);
  }

  if (tamilVoice) {
    utterance.voice = tamilVoice;
    console.log('Using voice:', tamilVoice.name, 'Language:', tamilVoice.lang);
  }

  // Add event listeners for debugging
  utterance.onstart = () => {
    console.log('Speech started');
  };

  utterance.onend = () => {
    console.log('Speech ended');
  };

  utterance.onerror = (event) => {
    console.error('Speech error:', event.error);
    if (event.error === 'not-allowed') {
      alert('Please allow audio playback in your browser settings.');
    }
  };

  // Speak the text
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
      console.log('Voices loaded:', voices.length);
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const loadedVoices = window.speechSynthesis.getVoices();
        console.log('Voices loaded:', loadedVoices.length);
        resolve(loadedVoices);
      };
    }
  });
};
