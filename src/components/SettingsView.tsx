import React, { useState } from "react";
import { BusinessProfile, Language } from "../types";
import { Globe, Bell, Shield, Smartphone, Save, CheckCircle2 } from "lucide-react";

interface SettingsViewProps {
  businessProfile: BusinessProfile;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSaveProfile: (profile: BusinessProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  businessProfile,
  language,
  onLanguageChange,
  onSaveProfile,
}) => {
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifySchemes, setNotifySchemes] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const isHi = language === "hi";

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-150">
      {savedToast && (
        <div className="p-3 bg-[#2E8B57]/10 text-[#2E8B57] border border-[#2E8B57]/20 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{isHi ? "प्राथमिकताएं सफलतापूर्वक अपडेट की गईं!" : "Preferences updated successfully!"}</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-[#172B35]">
          {isHi ? "एप्लिकेशन सेटिंग्स" : "Application Settings"}
        </h1>
        <p className="text-xs sm:text-sm text-[#60727A]">
          {isHi ? "अपनी सलाह प्राथमिकताओं, अधिसूचनाओं और भाषा सेटिंग्स को प्रबंधित करें।" : "Manage your advisory preferences, notifications, and language settings."}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 shadow-xs space-y-6">
        {/* Language Selection */}
        <div className="space-y-3 pb-5 border-b border-[#E6DED7]">
          <div className="flex items-center gap-2 text-sm font-bold text-[#172B35]">
            <Globe className="w-4 h-4 text-[#014D4E]" />
            <span>{isHi ? "सलाहकार भाषा" : "Advisory Language"}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { code: "en" as const, label: "English" },
              { code: "hi" as const, label: "हिन्दी (Hindi)" },
              { code: "ta" as const, label: "தமிழ் (Tamil)" },
              { code: "te" as const, label: "తెలుగు (Telugu)" },
              { code: "mr" as const, label: "मराठी (Marathi)" },
              { code: "bn" as const, label: "বাংলা (Bengali)" },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => onLanguageChange(l.code)}
                className={`p-2.5 rounded-lg text-xs font-medium border text-left transition-colors cursor-pointer ${
                  language === l.code
                    ? "bg-[#014D4E]/10 border-[#014D4E] text-[#014D4E] font-bold"
                    : "bg-[#F8F3EE] border-[#E6DED7] text-[#172B35]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3 pb-5 border-b border-[#E6DED7]">
          <div className="flex items-center gap-2 text-sm font-bold text-[#172B35]">
            <Bell className="w-4 h-4 text-[#014D4E]" />
            <span>{isHi ? "अलर्ट और अधिसूचनाएं" : "Alerts & Notifications"}</span>
          </div>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F3EE] cursor-pointer">
            <div>
              <div className="text-xs font-semibold text-[#172B35]">
                {isHi ? "व्हाट्सएप दैनिक कार्य अलर्ट" : "WhatsApp Daily Action Alerts"}
              </div>
              <div className="text-[11px] text-[#60727A]">
                {isHi ? "सुबह 8:00 बजे व्हाट्सएप पर अपना 15 मिनट का दैनिक कार्य प्राप्त करें" : "Get your 15-minute daily task on WhatsApp at 8:00 AM"}
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyWhatsApp}
              onChange={(e) => setNotifyWhatsApp(e.target.checked)}
              className="w-4 h-4 text-[#014D4E] rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F3EE] cursor-pointer">
            <div>
              <div className="text-xs font-semibold text-[#172B35]">
                {isHi ? "सरकारी सब्सिडी और योजना अलर्ट" : "Government Subsidy & Scheme Alerts"}
              </div>
              <div className="text-[11px] text-[#60727A]">
                {isHi ? "नए जिला स्तरीय एमएसएमई अनुदान खुलने पर सूचित करें" : "Notify when new district-level MSME grants open"}
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifySchemes}
              onChange={(e) => setNotifySchemes(e.target.checked)}
              className="w-4 h-4 text-[#014D4E] rounded"
            />
          </label>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#014D4E] hover:bg-[#013738] text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#F4C430]" />
            <span>{isHi ? "प्राथमिकताएं सहेजें" : "Save Preferences"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
