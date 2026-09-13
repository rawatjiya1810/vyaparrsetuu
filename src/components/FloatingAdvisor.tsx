import React, { useState, useRef, useEffect } from "react";
import { BusinessProfile, GrowthScore, MarketGap, ActionPlan, Language } from "../types";
import { mockActionPlan, mockNearbyBusinesses, mockOpportunityZones } from "../data/mockData";
import { dataService, sanitizeAdvisorText } from "../services/dataService";
import { VoiceInputModal } from "./VoiceInputModal";
import logoImg from "../assets/logo.jpg";
import {
  Bot,
  X,
  Send,
  Mic,
  Sparkles,
  ChevronUp,
  RotateCcw,
} from "lucide-react";

interface FloatingAdvisorProps {
  businessProfile: BusinessProfile;
  growthScore: GrowthScore;
  marketGaps: MarketGap[];
  actionPlan: ActionPlan;
  userName: string;
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  time: string;
  isError?: boolean;
  retryQuery?: string;
}

export const FloatingAdvisor: React.FC<FloatingAdvisorProps> = ({
  businessProfile,
  growthScore,
  marketGaps,
  actionPlan,
  userName,
  language,
}) => {
  const isHi = language === "hi";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "init-1",
          sender: "advisor",
          text: isHi
            ? `नमस्ते ${userName.split(" ")[0]} जी! मैं आपका व्यापारसेतु AI सलाहकार हूँ। आज मैं आपकी दुकान के लिए क्या मदद कर सकता हूँ?`
            : `Namaste ${userName.split(" ")[0]}! I'm your VyaparSetu Advisor. How can I help grow your business today?`,
          time: "Just now",
        },
      ]);
    }
  }, [userName, isHi, messages.length]);

  // Handle click outside & Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const quickPrompts = isHi
    ? [
        "आज मुझे किस काम पर ध्यान देना चाहिए?",
        "कम लागत में होम डिलीवरी कैसे शुरू करें?",
        "क्या मैं PM SVANidhi लोन के लिए पात्र हूँ?",
      ]
    : [
        "What should I focus on today?",
        "How to start low-cost home delivery?",
        "Am I eligible for PM Mudra loan?",
      ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const botMsgId = (Date.now() + 1).toString();
    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setInputText("");
    setIsTyping(true);

    try {
      let isFirstChunk = true;

      const response = await dataService.askAdvisorStream(
        {
          question: query,
          businessProfile,
          growthScore,
          marketGaps,
          actionPlan: actionPlan || mockActionPlan,
          localBusinesses: mockNearbyBusinesses,
          opportunityZones: mockOpportunityZones,
          history: currentHistory.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
          language,
        },
        (chunkText) => {
          const cleanChunk = sanitizeAdvisorText(chunkText);
          if (!cleanChunk) return;

          if (isFirstChunk) {
            setIsTyping(false);
            isFirstChunk = false;
            setMessages((prev) => [
              ...prev,
              {
                id: botMsgId,
                sender: "advisor",
                text: cleanChunk,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ]);
          } else {
            setMessages((prev) =>
              prev.map((m) => (m.id === botMsgId ? { ...m, text: cleanChunk } : m))
            );
          }
        }
      );

      const cleanAnswer = sanitizeAdvisorText(response.answer);
      if (cleanAnswer) {
        setIsTyping(false);
        setMessages((prev) => {
          const exists = prev.some((m) => m.id === botMsgId);
          if (exists) {
            return prev.map((m) => (m.id === botMsgId ? { ...m, text: cleanAnswer } : m));
          } else {
            return [
              ...prev,
              {
                id: botMsgId,
                sender: "advisor",
                text: cleanAnswer,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ];
          }
        });
      }
    } catch (err) {
      console.error("Advisor floating chat error:", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: "advisor",
          text: isHi
            ? "क्षमा करें, मैं अभी उत्तर देने में सक्षम नहीं हूँ। कृपया पुनः प्रयास करें।"
            : "Sorry, I couldn't reach the advisor right now. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
          retryQuery: query,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return (
      <div className="space-y-1 font-sans">
        {lines.map((line, lIdx) => {
          if (!line.trim()) {
            return <div key={lIdx} className="h-1" />;
          }

          const parts = line.split(/(\*\*.*?\*\*)/g);
          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
              return (
                <strong key={pIdx} className="font-extrabold text-[#172B35]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          return (
            <div key={lIdx} className="leading-relaxed">
              {formattedLine}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative z-50" ref={panelRef}>
      {/* FLOATING ADVISOR PANEL MODAL */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[380px] bg-white rounded-2xl border border-[#E6DED7] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#013738] to-[#014D4E] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={logoImg}
                alt="VyaparSetu Advisor"
                className="w-8 h-8 rounded-lg object-contain border border-[#F4C430]/60 shrink-0 bg-white/10"
              />
              <div>
                <div className="font-heading text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
                  <span>VyaparSetu Advisor</span>
                  <span className="w-2 h-2 rounded-full bg-[#2E8B57] inline-block" />
                </div>
                <div className="font-sans text-[11px] text-teal-100/90 leading-tight">
                  {isHi ? "मैं आपकी क्या मदद कर सकता हूँ?" : "How can I help with your business?"}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-teal-200 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Close Advisor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-[#F8F3EE] border-b border-[#E6DED7] space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#60727A]">
              {isHi ? "सुझाए गए प्रश्न" : "Suggested Questions"}
            </div>
            <div className="flex flex-col gap-1">
              {quickPrompts.slice(0, 2).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left font-sans text-xs px-2.5 py-1.5 bg-white hover:bg-[#014D4E]/5 text-[#172B35] rounded-lg border border-[#E6DED7] truncate transition-colors cursor-pointer"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-3 space-y-3 max-h-72 overflow-y-auto bg-[#FFFDFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "advisor" && (
                  <img
                    src={logoImg}
                    alt="VyaparSetu"
                    className="w-6 h-6 rounded-lg object-contain border border-[#014D4E]/20 shrink-0 mt-0.5"
                  />
                )}

                <div
                  className={`max-w-[85%] p-3 rounded-2xl font-sans text-xs leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-[#014D4E] text-white rounded-tr-none"
                      : msg.isError
                      ? "bg-red-50 text-red-900 border border-red-200 rounded-tl-none"
                      : "bg-[#F8F3EE] text-[#172B35] border border-[#E6DED7] rounded-tl-none"
                  }`}
                >
                  {msg.sender === "user" ? msg.text : renderFormattedText(msg.text)}
                  {msg.isError && msg.retryQuery && (
                    <button
                      type="button"
                      onClick={() => handleSendMessage(msg.retryQuery)}
                      className="mt-1.5 text-[11px] font-bold text-[#014D4E] hover:underline flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-[#E6DED7] cursor-pointer shadow-xs"
                    >
                      <RotateCcw className="w-3 h-3 text-[#014D4E]" />
                      <span>{isHi ? "पुनः प्रयास करें" : "Retry"}</span>
                    </button>
                  )}
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === "user" ? "text-teal-100" : "text-[#60727A]"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center font-sans text-xs text-[#60727A] p-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#014D4E] animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#014D4E] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#014D4E] animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[11px]">{isHi ? "व्यापारसेतु सलाहकार विचार कर रहा है..." : "VyaparSetu Advisor is thinking..."}</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-2.5 bg-[#F8F3EE] border-t border-[#E6DED7] flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setVoiceModalOpen(true)}
              className="p-2 bg-white hover:bg-[#E6DED7] text-[#014D4E] rounded-xl border border-[#E6DED7] transition-colors cursor-pointer shrink-0"
              title="Speak Question"
            >
              <Mic className="w-4 h-4 text-[#014D4E]" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={isHi ? "यहाँ सवाल लिखें..." : "Type your question..."}
              className="flex-1 px-3 py-2 font-sans text-xs bg-white border border-[#E6DED7] rounded-xl focus:outline-none focus:border-[#014D4E]"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="p-2 bg-[#014D4E] hover:bg-[#013738] disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer shrink-0"
              title="Send Question"
            >
              <Send className="w-3.5 h-3.5 text-[#F4C430]" />
            </button>
          </div>
        </div>
      )}

      {/* FLOATING ADVISOR LAUNCHER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Desktop Tooltip */}
        {!isOpen && (
          <div className="hidden sm:block absolute right-15 top-2.5 whitespace-nowrap bg-[#172B35] text-white font-sans text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 border border-white/10">
            {isHi ? "व्यापारसेतु सलाहकार से पूछें" : "Ask VyaparSetu Advisor"}
          </div>
        )}

        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#014D4E]/30 animate-ping pointer-events-none" />
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Talk to VyaparSetu Advisor"
          className="w-13 h-13 rounded-full bg-gradient-to-br from-[#014D4E] via-[#013738] to-[#012829] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer border-2 border-[#F4C430]/60 active:scale-95 relative z-10 overflow-hidden"
        >
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-[#F4C430]" />
          ) : (
            <img src={logoImg} alt="VyaparSetu Advisor" className="w-10 h-10 object-contain rounded-xl" />
          )}
        </button>
      </div>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        language={language}
        onApplyTranscript={(text) => handleSendMessage(text)}
        title={isHi ? "सलाहकार से बोलकर सवाल पूछें" : "Speak to AI Business Advisor"}
        contextHint={
          isHi
            ? "अपनी भाषा में बोलें। आप सबमिट करने से पहले टेक्स्ट को एडिट भी कर सकते हैं।"
            : "Speak clearly. You will be able to review and edit before sending."
        }
        samplePhrases={quickPrompts}
      />
    </div>
  );
};
