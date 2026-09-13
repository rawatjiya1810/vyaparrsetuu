import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, X, Check, Edit3, Volume2 } from "lucide-react";
import { Language } from "../types";

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTranscript: (text: string) => void;
  language: Language;
  title?: string;
  contextHint?: string;
  samplePhrases?: string[];
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onApplyTranscript,
  language,
  title = "Speak to VyaparSetu",
  contextHint = "Speak naturally in Hindi or English.",
  samplePhrases = [
    "मेरी दुकान पर शाम को ग्राहक कम आते हैं, क्या करूं?",
    "How do I apply for PM SVANidhi loan?",
    "Pass ki railway colony me delivery kaise start karein?",
  ],
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === "hi" ? "hi-IN" : "en-IN";

      recognition.onresult = (event: any) => {
        let currentText = "";
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript + " ";
        }
        setTranscript(currentText.trim());
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setHasSpeechSupport(true);
    } else {
      setHasSpeechSupport(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    };
  }, [language]);

  if (!isOpen) return null;

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setTranscript("");
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start speech recognition", e);
        simulateSpeech();
      }
    } else {
      simulateSpeech();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
  };

  const simulateSpeech = () => {
    setIsListening(true);
    setTimeout(() => {
      const demo =
        language === "hi"
          ? "हमारी किराने की दुकान पर शाम के समय ग्राहकों की संख्या कैसे बढ़ाएं?"
          : "How can I increase customers for my grocery store from the nearby residential colony?";
      setTranscript(demo);
      setIsListening(false);
    }, 2000);
  };

  const handleConfirm = () => {
    if (transcript.trim()) {
      onApplyTranscript(transcript.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172B35]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E6DED7] shadow-xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#F8F3EE] p-5 border-b border-[#E6DED7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#014D4E]/10 flex items-center justify-center text-[#014D4E]">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172B35]">{title}</h3>
              <p className="text-[11px] text-[#60727A]">{contextHint}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#60727A] hover:text-[#172B35] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Big Mic Button & Animation */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative">
              {isListening && (
                <div className="absolute inset-0 rounded-full bg-[#014D4E]/30 animate-ping"></div>
              )}
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                  isListening
                    ? "bg-[#C94A45] text-white scale-105"
                    : "bg-[#014D4E] hover:bg-[#013738] text-white"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 animate-pulse text-[#F4C430]" />
                ) : (
                  <Mic className="w-8 h-8 text-[#F4C430]" />
                )}
              </button>
            </div>

            <p className="text-xs font-semibold text-[#172B35] mt-3">
              {isListening
                ? language === "hi"
                  ? "सुन रहे हैं... (रोकने के लिए दबाएं)"
                  : "Listening... (Tap to stop)"
                : language === "hi"
                ? "माइक दबाकर बोलना शुरू करें"
                : "Tap microphone to speak"}
            </p>
            <p className="text-[11px] text-[#60727A]">
              Language: {language === "hi" ? "हिन्दी (Hindi)" : "English (Indian)"}
            </p>
          </div>

          {/* Editable Transcription Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#172B35] flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-[#014D4E]" />
                <span>Review & Edit Transcription:</span>
              </span>
              {transcript && (
                <button
                  type="button"
                  onClick={() => setTranscript("")}
                  className="text-[11px] text-[#60727A] hover:text-[#C94A45] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <textarea
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder={
                isListening
                  ? "Transcription appearing in real-time..."
                  : "Spoken text will appear here. You can also edit or type directly."
              }
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#E6DED7] bg-[#FFFDFC] text-[#172B35] focus:outline-none focus:border-[#014D4E] leading-relaxed"
            />
          </div>

          {/* Sample Spoken Ideas */}
          {!transcript && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-[#60727A]">
                Or tap a sample question:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {samplePhrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTranscript(phrase)}
                    className="text-[11px] px-2.5 py-1 bg-[#F8F3EE] hover:bg-[#E6DED7] text-[#172B35] rounded-lg border border-[#E6DED7] text-left transition-colors cursor-pointer"
                  >
                    "{phrase}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F8F3EE] p-4 border-t border-[#E6DED7] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#60727A] hover:text-[#172B35] rounded-lg cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!transcript.trim()}
            onClick={handleConfirm}
            className={`px-5 py-2.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              transcript.trim()
                ? "bg-[#014D4E] hover:bg-[#013738] text-white shadow-xs cursor-pointer"
                : "bg-[#E6DED7] text-[#60727A] cursor-not-allowed"
            }`}
          >
            <Check className="w-4 h-4 text-[#F4C430]" />
            <span>Use Transcribed Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};
