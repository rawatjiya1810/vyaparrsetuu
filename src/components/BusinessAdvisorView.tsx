import React, { useState, useRef, useEffect } from "react";
import { BusinessProfile, GrowthScore, MarketGap, Language } from "../types";
import { mockActionPlan, mockNearbyBusinesses, mockOpportunityZones } from "../data/mockData";
import {
  Sparkles,
  Send,
  Mic,
  Bot,
  User,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import { dataService, sanitizeAdvisorText } from "../services/dataService";
import { VoiceInputModal } from "./VoiceInputModal";

interface BusinessAdvisorViewProps {
  businessProfile: BusinessProfile;
  growthScore: GrowthScore;
  marketGaps: MarketGap[];
  language: Language;
  onNavigateToPlan?: () => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  time: string;
  isError?: boolean;
  retryQuery?: string;
}

export const BusinessAdvisorView: React.FC<BusinessAdvisorViewProps> = ({
  businessProfile,
  growthScore,
  marketGaps,
  language,
}) => {
  const isHi = language === "hi";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-1",
          sender: "advisor",
          text: isHi
            ? `नमस्ते ${businessProfile.contactPerson || "रमेश जी"}! मैं आपका व्यापारसेतु AI सलाहकार हूँ। आपकी ${businessProfile.businessName} की स्थिति और रामपुर बाज़ार के डेटा के आधार पर, आज आप मुझसे क्या पूछना चाहते हैं?`
            : `Namaste ${businessProfile.contactPerson || "Ramesh ji"}! I am your VyaparSetu AI Advisor. Based on your business profile for ${businessProfile.businessName} and current रामपुर market data, how can I help you grow today?`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [businessProfile, isHi, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const quickPrompts = isHi
    ? [
        "मेरी बिक्री बढ़ाने के 3 आसान तरीके?",
        "क्या मैं PM SVANidhi लोन ले सकता हूँ?",
        "कम लागत में सप्लायर मार्जिन कैसे सुधारें?",
        "आज का मेरा मुख्य कार्य क्या है?",
      ]
    : [
        "3 easy ways to increase daily sales?",
        "Am I eligible for PM SVANidhi loan?",
        "How to improve supplier margin at low cost?",
        "What is my main focus task for today?",
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
          actionPlan: mockActionPlan,
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
      console.error("Advisor chat error:", err);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return (
      <div className="space-y-1 font-sans">
        {lines.map((line, lIdx) => {
          if (!line.trim()) {
            return <div key={lIdx} className="h-1.5" />;
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
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="pb-4 border-b border-[#E6DED7]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#014D4E]/10 text-[#014D4E] font-sans text-xs font-bold mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#014D4E]" />
          <span>{isHi ? "व्यापारसेतु सलाहकार" : "VyaparSetu Advisor"}</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#172B35] tracking-tight">
          {isHi ? "व्यापारसेतु सलाहकार" : "VyaparSetu Advisor"}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#526671] mt-1 font-medium">
          {isHi
            ? "अपने व्यापार, बाज़ार, ग्राहक, वित्त या सरकारी योजनाओं के बारे में कुछ भी पूछें।"
            : "Ask anything about your business, market, customers, finances or government schemes."}
        </p>
      </div>

      {/* CONVERSATIONAL ADVISOR INTERFACE */}
      <div className="bg-white rounded-2xl border border-[#E6DED7] shadow-sm overflow-hidden flex flex-col min-h-[560px]">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-[#F8F3EE] border-b border-[#E6DED7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#014D4E] to-[#013738] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5.5 h-5.5 text-[#F4C430]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-base font-extrabold text-[#172B35]">
                  {isHi ? "व्यापारसेतु AI सलाहकार" : "VyaparSetu AI Advisor"}
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B57] animate-pulse" />
                  {isHi ? "ऑनलाइन" : "Active"}
                </span>
              </div>
              <p className="font-sans text-xs text-[#526671] font-medium mt-0.5">
                {isHi
                  ? `${businessProfile.businessName} के मार्केट डेटा एवं बिज़नेस प्रोफाइल के आधार पर उत्तर`
                  : `Tailored for ${businessProfile.businessName} using your Business DNA & market data`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVoiceModalOpen(true)}
            className="px-3.5 py-2 bg-white border border-[#E6DED7] hover:border-[#014D4E] text-[#014D4E] font-sans text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Mic className="w-4 h-4 text-[#014D4E]" />
            <span className="hidden sm:inline">{isHi ? "बोलकर पूछें" : "Speak Query"}</span>
          </button>
        </div>

        {/* Popular Question Chips */}
        <div className="p-3 bg-[#FFFDFC] border-b border-[#E6DED7] flex items-center gap-2 overflow-x-auto">
          <span className="font-sans text-xs font-bold text-[#526671] shrink-0 flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 text-[#014D4E]" />
            {isHi ? "लोकप्रिय प्रश्न:" : "Popular Questions:"}
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="font-sans text-xs font-semibold px-3 py-1.5 bg-[#F8F3EE] hover:bg-[#014D4E]/10 hover:text-[#014D4E] text-[#172B35] rounded-full border border-[#E6DED7] whitespace-nowrap transition-all cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Message History */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 max-h-[460px] overflow-y-auto bg-[#FFFDFC]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "advisor" && (
                <div className="w-8 h-8 rounded-full bg-[#014D4E] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4.5 h-4.5 text-[#F4C430]" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-xl p-4 rounded-2xl font-sans text-xs sm:text-sm leading-relaxed shadow-xs ${
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
                    className="mt-2 text-xs font-bold text-[#014D4E] hover:underline flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#E6DED7] cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#014D4E]" />
                    <span>{isHi ? "पुनः प्रयास करें" : "Retry"}</span>
                  </button>
                )}
                <div
                  className={`text-[9px] mt-1.5 text-right font-medium ${
                    msg.sender === "user" ? "text-teal-100/90" : "text-[#526671]"
                  }`}
                >
                  {msg.time}
                </div>
              </div>

              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#F4C430] text-[#013738] flex items-center justify-center shrink-0 mt-1 font-bold shadow-xs">
                  <User className="w-4.5 h-4.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-[#014D4E] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4.5 h-4.5 text-[#F4C430]" />
              </div>
              <div className="p-3 bg-[#F8F3EE] border border-[#E6DED7] rounded-2xl rounded-tl-none font-sans text-xs text-[#526671] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#014D4E] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#014D4E] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#014D4E] animate-bounce [animation-delay:0.4s]"></div>
                <span className="font-semibold text-[#172B35]">
                  {isHi ? "व्यापारसेतु सलाहकार विचार कर रहा है..." : "VyaparSetu Advisor is thinking..."}
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#F8F3EE] border-t border-[#E6DED7] flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVoiceModalOpen(true)}
            className="p-3 bg-white hover:bg-[#E6DED7] text-[#014D4E] rounded-xl border border-[#E6DED7] transition-colors cursor-pointer shrink-0 shadow-xs"
            title="Speak Question"
          >
            <Mic className="w-4 h-4 text-[#014D4E]" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isHi
                ? "यहाँ सवाल लिखें (उदा. 'मंडी की लागत कैसे कम करें?')"
                : "Type your business question (e.g. 'How to reduce procurement costs?')..."
            }
            className="flex-1 px-4 py-3 font-sans text-xs sm:text-sm bg-white border border-[#E6DED7] rounded-xl focus:outline-none focus:border-[#014D4E] focus:ring-1 focus:ring-[#014D4E] shadow-xs"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="px-5 py-3 bg-[#014D4E] hover:bg-[#013738] disabled:opacity-50 text-white font-sans text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4 text-[#F4C430]" />
            <span className="hidden sm:inline">{isHi ? "पूछें" : "Ask"}</span>
          </button>
        </div>
      </div>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        language={language}
        onApplyTranscript={(text) => handleSendMessage(text)}
        title={isHi ? "सलाहकार से बोलकर सवाल पूछें" : "Speak to VyaparSetu Advisor"}
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
