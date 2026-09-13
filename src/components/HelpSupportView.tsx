import React from "react";
import { Language } from "../types";
import { translations } from "../data/translations";
import { HelpCircle, Phone, MessageSquare, ShieldCheck, ExternalLink } from "lucide-react";

interface HelpSupportViewProps {
  language?: Language;
}

export const HelpSupportView: React.FC<HelpSupportViewProps> = ({ language = "en" }) => {
  const isHi = language === "hi";
  const faqs = isHi
    ? [
        {
          q: "क्या व्यापारसेतु स्थानीय दुकानदारों के लिए मुफ्त है?",
          a: "हाँ! भारत भर के सूक्ष्म उद्यमों और दुकानदारों के लिए मुख्य हाइपरलोकल बाजार स्कैन, ग्रोथ स्कोर, अवसर खोज और 30-दिन की कार्य योजना पूरी तरह से मुफ्त है।",
        },
        {
          q: "मेरी व्यावसायिक जानकारी का उपयोग कैसे किया जाता है?",
          a: "आपके डेटा का उपयोग केवल स्थानीय रूप से सरकारी योजनाओं, आपूर्तिकर्ता अवसरों और विकास स्कोर की गणना के लिए किया जाता है। इसे कभी भी तीसरे पक्ष के विज्ञापन कंपनियों के साथ साझा नहीं किया जाता है।",
        },
        {
          q: "क्या मैं ऐप का उपयोग हिंदी में या आवाज द्वारा कर सकता हूं?",
          a: "हाँ, आप किसी भी पृष्ठ या सलाहकार चैट पर माइक्रोफोन बटन दबाकर हिंदी, तमिल, तेलुगु, मराठी या बंगाली में अपना प्रश्न बोल सकते हैं।",
        },
      ]
    : [
        {
          q: "Is VyaparSetu free for local store owners?",
          a: "Yes! The core hyperlocal market scan, Business Growth Score, opportunity detection, and 30-day action plan are completely free for micro-enterprises and shopkeepers across India.",
        },
        {
          q: "How is my business information used?",
          a: "Your data is only used locally to calculate matching government schemes, supplier opportunities, and growth score. It is never sold or shared with third-party advertising companies.",
        },
        {
          q: "Can I use the app in Hindi or by voice?",
          a: "Yes, you can tap the microphone button on any page or advisory chat to speak your question in Hindi, Tamil, Telugu, Marathi, or Bengali.",
        },
      ];

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-bold text-[#172B35]">
          {isHi ? "सहायता और सहायता केंद्र" : "Help & Support Center"}
        </h1>
        <p className="text-xs sm:text-sm text-[#60727A]">
          {isHi ? "समर्पित स्थानीय व्यवसाय सलाहकारों से मार्गदर्शन प्राप्त करें या सामान्य उत्तर देखें।" : "Get guidance from dedicated local business advisors or browse common answers."}
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E6DED7] shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-[#2E8B57]/10 text-[#2E8B57] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#172B35]">
            {isHi ? "व्हाट्सएप सलाहकार डेस्क" : "WhatsApp Advisory Desk"}
          </h3>
          <p className="text-xs text-[#60727A]">
            {isHi ? "अपनी मातृभाषा में ग्रामीण उद्यम सलाहकार से चैट करें (सोम-शनि, सुबह 9 बजे - शाम 6 बजे)।" : "Chat with a rural enterprise advisor in your native language (Mon–Sat, 9AM–6PM)."}
          </p>
          <button
            onClick={() => alert(isHi ? "व्हाट्सएप हेल्पडेस्क से जुड़ रहे हैं (+91 1800-VYAPAR)..." : "Connecting to WhatsApp Helpdesk (+91 1800-VYAPAR)...")}
            className="text-xs font-bold text-[#2E8B57] hover:underline pt-1 block cursor-pointer"
          >
            {isHi ? "व्हाट्सएप चैट शुरू करें →" : "Start WhatsApp Chat →"}
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6DED7] shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-[#014D4E]/10 text-[#014D4E] flex items-center justify-center">
            <Phone className="w-5 h-5 text-[#014D4E]" />
          </div>
          <h3 className="text-sm font-bold text-[#172B35]">
            {isHi ? "टोल-फ्री हेल्पलाइन" : "Toll-Free Helpline"}
          </h3>
          <p className="text-xs text-[#60727A]">
            {isHi ? "सरकारी योजना कागजी कार्रवाई में मदद के लिए हमारी टोल-फ्री सहायता लाइन पर कॉल करें।" : "Call our toll-free support line for help with government scheme paperwork."}
          </p>
          <div className="text-xs font-bold text-[#014D4E] pt-1">
            1800-200-8899 ({isHi ? "टोल-फ्री" : "Toll Free"})
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#172B35]">
          {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
        </h3>

        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <div key={idx} className="p-4 bg-[#F8F3EE] rounded-xl border border-[#E6DED7] space-y-1.5">
              <h4 className="text-xs font-bold text-[#172B35]">{f.q}</h4>
              <p className="text-xs text-[#60727A] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
