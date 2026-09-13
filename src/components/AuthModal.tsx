import React, { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { Language, BusinessProfile } from "../types";
import { translations } from "../data/translations";
import { X, Phone, Lock, User, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  initialMode: "login" | "register";
  language: Language;
  onClose: () => void;
  onSuccess: (user: { name: string; mobile: string; isNewUser: boolean }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  language,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [mobileOrEmail, setMobileOrEmail] = useState("9876543210");
  const [ownerName, setOwnerName] = useState("Ramesh Kumar");
  const [password, setPassword] = useState("••••••••");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  const t = translations[language] || translations.en;
  const isHi = language === "hi";

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: mode === "register" ? ownerName || "Business Owner" : "Ramesh Kumar",
      mobile: mobileOrEmail,
      isNewUser: mode === "register",
    });
  };

  const handleDemoLogin = () => {
    onSuccess({
      name: "Ramesh Kumar",
      mobile: "9876543210",
      isNewUser: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172B35]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#E6DED7] shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#F8F3EE] p-5 border-b border-[#E6DED7] flex items-center justify-between">
          <BrandLogo variant="dark" size="sm" />
          <button
            onClick={onClose}
            className="p-1 text-[#60727A] hover:text-[#172B35] rounded-lg hover:bg-[#E6DED7]/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#E6DED7] bg-[#FFFDFC]">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${
              mode === "login"
                ? "text-[#014D4E] border-b-2 border-[#014D4E] bg-white"
                : "text-[#60727A] hover:text-[#172B35]"
            }`}
          >
            {t.navLogin}
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${
              mode === "register"
                ? "text-[#014D4E] border-b-2 border-[#014D4E] bg-white"
                : "text-[#60727A] hover:text-[#172B35]"
            }`}
          >
            {t.navGetStarted}
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Quick Demo Button */}
          <div className="p-3.5 rounded-xl bg-[#014D4E]/5 border border-[#014D4E]/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#014D4E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F4C430]" /> {isHi ? "त्वरित डेमो मोड" : "Instant Demo Mode"}
              </div>
              <div className="text-[11px] text-[#60727A]">
                {isHi ? "रमेश कुमार के रूप में पूर्वावलोकन (किराना दुकान, रामपुर)" : "Preview as Ramesh Kumar (Grocery Store, Rampur)"}
              </div>
            </div>
            <button
              onClick={handleDemoLogin}
              className="px-3 py-1.5 bg-[#014D4E] hover:bg-[#013738] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {isHi ? "1-क्लिक डेमो" : "1-Click Demo"}
            </button>
          </div>

          {resetNotice && (
            <div className="p-3 rounded-xl bg-[#2E8B57]/10 border border-[#2E8B57]/30 text-xs font-semibold text-[#2E8B57] flex items-center justify-between">
              <span>{resetNotice}</span>
              <button
                onClick={() => setResetNotice(null)}
                className="text-[#2E8B57] hover:text-[#172B35] font-bold"
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                  {isHi ? "व्यवसाय स्वामी का नाम" : "Business Owner's Name"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#60727A] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder={isHi ? "जैसे: रमेश कुमार" : "e.g. Ramesh Kumar"}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E] focus:ring-1 focus:ring-[#014D4E]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                {isHi ? "मोबाइल नंबर या ईमेल" : "Mobile Number or Email"}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#60727A] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={mobileOrEmail}
                  onChange={(e) => setMobileOrEmail(e.target.value)}
                  placeholder={isHi ? "जैसे: 9876543210" : "e.g. 9876543210"}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E] focus:ring-1 focus:ring-[#014D4E]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#172B35]">
                  {isHi ? "पासवर्ड / पिन" : "Password / PIN"}
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => setResetNotice(isHi ? "पंजीकृत मोबाइल पर रीसेट ओटीपी भेजा गया: 9876543210" : "Reset OTP sent to registered mobile: 9876543210")}
                    className="text-[11px] text-[#014D4E] hover:underline cursor-pointer"
                  >
                    {isHi ? "पासवर्ड भूल गए?" : "Forgot password?"}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#60727A] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E] focus:ring-1 focus:ring-[#014D4E]"
                />
              </div>
            </div>

            {mode === "register" && (
              <label className="flex items-center gap-2 text-xs text-[#60727A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-[#014D4E] focus:ring-[#014D4E]"
                />
                <span>{isHi ? "मैं स्थानीय बाजार सलाह और योजना अधिसूचनाएं प्राप्त करने के लिए सहमत हूं" : "I agree to receive local market advice & scheme notifications"}</span>
              </label>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#014D4E] hover:bg-[#013738] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{mode === "login" ? t.navLogin : t.navGetStarted}</span>
              <ArrowRight className="w-4 h-4 text-[#F4C430]" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#60727A]">
            {mode === "login" ? (
              <span>
                {isHi ? "क्या आपका खाता अभी तक नहीं है? " : "Don't have an account yet? "}
                <button
                  onClick={() => setMode("register")}
                  className="text-[#014D4E] font-semibold hover:underline cursor-pointer"
                >
                  {t.navGetStarted}
                </button>
              </span>
            ) : (
              <span>
                {isHi ? "पहले से पंजीकृत हैं? " : "Already registered? "}
                <button
                  onClick={() => setMode("login")}
                  className="text-[#014D4E] font-semibold hover:underline cursor-pointer"
                >
                  {t.navLogin}
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
