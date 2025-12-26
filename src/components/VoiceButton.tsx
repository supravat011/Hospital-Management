import React from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { speakTamil, stopSpeaking } from '@/utils/tamilVoice';

interface VoiceButtonProps {
  text: string;
  label?: string;
  size?: 'default' | 'lg';
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ text, label, size = 'default' }) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speakTamil(text);
      setIsSpeaking(true);
      // Reset state when speech ends
      setTimeout(() => setIsSpeaking(false), text.length * 100);
    }
  };

  return (
    <Button
      variant={isSpeaking ? 'accent' : 'outline'}
      size={size === 'lg' ? 'icon-lg' : 'icon'}
      onClick={handleClick}
      title={label || 'Listen in Tamil'}
      className={`${size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'} rounded-full`}
    >
      <Volume2 className={size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'} />
    </Button>
  );
};

export default VoiceButton;
