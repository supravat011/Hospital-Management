export const speakTamil = (text: string) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ta-IN';
    utterance.rate = 0.7; // Slower for elderly users
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
    speechSynthesis.cancel();
};

export const pauseSpeaking = () => {
    speechSynthesis.pause();
};

export const resumeSpeaking = () => {
    speechSynthesis.resume();
};
