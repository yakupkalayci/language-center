export function speakText(text, lang = 'en-US', rate = 1, pitch = 1) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return reject(new Error('SpeechSynthesis not supported'));
    }

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(String(text));
    utter.lang = lang;
    utter.rate = rate;
    utter.pitch = pitch;

    const pickVoice = () => {
      const voices = synth.getVoices() || [];
      if (!voices.length) return null;
      const base = (lang || '').split('-')[0].toLowerCase();
      return voices.find(v => v.lang && v.lang.toLowerCase().startsWith(base)) || voices[0];
    };

    const speakNow = () => {
      const voice = pickVoice();
      if (voice) utter.voice = voice;
      utter.onend = () => resolve();
      utter.onerror = (e) => reject(e);
      try {
        // stop existing speech and speak new
        synth.cancel();
        synth.speak(utter);
      } catch (err) {
        reject(err);
      }
    };

    // If voices not loaded yet, wait for them
    if ((synth.getVoices() || []).length === 0) {
      const handler = () => {
        try {
          speakNow();
        } finally {
          synth.removeEventListener('voiceschanged', handler);
        }
      };
      synth.addEventListener('voiceschanged', handler);
      // also set a short timeout fallback
      setTimeout(() => {
        if (!utter.voice) speakNow();
      }, 500);
    } else {
      speakNow();
    }
  });
}
