import React, { useState } from "react";
import { BusinessProfile, Language } from "../types";
import {
  Store,
  MapPin,
  Users,
  AlertCircle,
  Mic,
  CheckCircle2,
  UploadCloud,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Edit2,
  FileCheck,
} from "lucide-react";
import { VoiceInputModal } from "./VoiceInputModal";

interface BusinessDNAProps {
  initialProfile: BusinessProfile;
  onSaveProfile: (profile: BusinessProfile) => void;
  onContinueToMarketScan: () => void;
  language?: Language;
}

export const BusinessDNA: React.FC<BusinessDNAProps> = ({
  initialProfile,
  onSaveProfile,
  onContinueToMarketScan,
  language = "en",
}) => {
  const isHi = language === "hi";
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    const p = { ...initialProfile };
    if (!p.productsServices) {
      p.productsServices = (p as any).productsOrServices || [
        "Fresh Grains & Pulses",
        "Cooking Oils & Spices",
        "Packaged Snacks & Dairy",
      ];
    }
    if (!p.challenges) p.challenges = [];
    if (!p.targetCustomers) p.targetCustomers = ["Local Village Families"];
    if (!p.discoveryChannels) p.discoveryChannels = ["Walk-in"];
    return p;
  });

  const [customTag, setCustomTag] = useState("");
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [voiceTranscriptTarget, setVoiceTranscriptTarget] = useState<"challenge" | "basics">("challenge");
  const [isSaved, setIsSaved] = useState(false);

  const categories = [
    "Grocery & Daily Needs",
    "Agriculture & Farm Produce",
    "Handicrafts & Handlooms",
    "Food & Sweet Stall",
    "Apparel & Tailoring",
    "Dairy & Poultry",
    "Hardware & Electrical",
    "Automotive Repair",
    "General Trading & Services",
  ];

  const businessSizes: {
    value: "Micro (1-2 people)" | "Small (3-5 people)" | "Medium (6+ people)";
    label: string;
    desc: string;
  }[] = [
    {
      value: "Micro (1-2 people)",
      label: "Micro (1-2 persons)",
      desc: "Daily revenue under ₹5,000",
    },
    {
      value: "Small (3-5 people)",
      label: "Small (3-5 staff)",
      desc: "Daily revenue ₹5,000 – ₹25,000",
    },
    {
      value: "Medium (6+ people)",
      label: "Growing (6+ staff)",
      desc: "Daily revenue ₹25,000+",
    },
  ];

  const commonChallenges = [
    "Need more daily walk-in customers",
    "High raw material procurement cost",
    "Lack of working capital / credit",
    "Difficult to collect payment on credit (Khata)",
    "Competition from wholesale markets",
    "No delivery boy or delivery vehicle",
    "Customers asking for online payment & WhatsApp orders",
  ];

  const currentProducts = profile.productsServices || [];
  const currentChallenges = profile.challenges || [];

  const handleAddProductTag = () => {
    if (customTag.trim() && !currentProducts.includes(customTag.trim())) {
      setProfile({
        ...profile,
        productsServices: [...currentProducts, customTag.trim()],
      });
      setCustomTag("");
    }
  };

  const handleRemoveProductTag = (tag: string) => {
    setProfile({
      ...profile,
      productsServices: currentProducts.filter((t) => t !== tag),
    });
  };

  const handleToggleChallenge = (challenge: string) => {
    if (currentChallenges.includes(challenge)) {
      setProfile({
        ...profile,
        challenges: currentChallenges.filter((c) => c !== challenge),
      });
    } else {
      setProfile({
        ...profile,
        challenges: [...currentChallenges, challenge],
      });
    }
  };

  const handleApplyVoiceTranscript = (text: string) => {
    if (voiceTranscriptTarget === "challenge") {
      setProfile((prev) => ({
        ...prev,
        challenges: [
          ...(prev.challenges || []),
          text,
        ],
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        businessName: text,
      }));
    }
  };

  const handleSaveAndComplete = () => {
    onSaveProfile(profile);
    setIsSaved(true);
  };

  const targetCustDisplay = Array.isArray(profile.targetCustomers)
    ? profile.targetCustomers.join(", ")
    : (profile.targetCustomers as any) || "";

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E6DED7]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#014D4E]/10 text-[#014D4E] text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C430]" />
            <span>{isHi ? "बिज़नेस डीएनए प्रोफ़ाइल" : "Business DNA Profile"}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            {isSaved
              ? isHi ? "आपकी सत्यापित बिज़नेस डीएनए प्रोफ़ाइल" : "Your Verified Business DNA"
              : isHi ? "सरल 4-चरणीय बिज़नेस सेटअप" : "Step-by-Step Business Setup"}
          </h1>
          <p className="text-xs sm:text-sm text-[#60727A]">
            {isHi
              ? "अपने व्यवसाय के बारे में बताएं ताकि हमारा सलाहकार इंजन आपके सटीक इलाके का विश्लेषण कर सके।"
              : "Tell us about your business so our advisory engine can scan your exact locality."}
          </p>
        </div>

        {isSaved && (
          <button
            onClick={() => setIsSaved(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F3EE] hover:bg-[#E6DED7] text-xs font-semibold text-[#014D4E] rounded-lg transition-colors self-start cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" /> {isHi ? "विवरण बदलें" : "Edit Information"}
          </button>
        )}
      </div>

      {!isSaved ? (
        <div className="bg-white rounded-2xl border border-[#E6DED7] shadow-xs overflow-hidden">
          {/* Step Stepper Header */}
          <div className="grid grid-cols-4 border-b border-[#E6DED7] bg-[#F8F3EE]">
            {[
              { num: 1, title: isHi ? "बुनियादी" : "Basics", icon: Store },
              { num: 2, title: isHi ? "स्थान" : "Location", icon: MapPin },
              { num: 3, title: isHi ? "ग्राहक" : "Customers", icon: Users },
              { num: 4, title: isHi ? "चुनौतियां" : "Challenges", icon: AlertCircle },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`py-3 px-2 text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  step === s.num
                    ? "bg-white text-[#014D4E] font-bold border-b-2 border-[#014D4E]"
                    : "text-[#60727A] hover:text-[#172B35]"
                }`}
              >
                <s.icon className="w-4 h-4" />
                <span className="text-xs">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {/* STEP 1: BASICS */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#172B35]">
                    {isHi ? "1. बुनियादी व्यावसायिक विवरण" : "1. Basic Business Details"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setVoiceTranscriptTarget("basics");
                      setVoiceModalOpen(true);
                    }}
                    className="px-2.5 py-1 text-xs font-semibold text-[#014D4E] bg-[#014D4E]/10 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5 text-[#014D4E]" />
                    <span>{isHi ? "बोलकर भरें" : "Speak Name"}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                    {isHi ? "दुकान / व्यवसाय का नाम" : "Business / Shop Name"}
                  </label>
                  <input
                    type="text"
                    value={profile.businessName || ""}
                    onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                    placeholder="e.g. Ramesh Kirana & General Store"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                      {isHi ? "व्यवसाय श्रेणी" : "Business Category"}
                    </label>
                    <select
                      value={profile.category || categories[0]}
                      onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E]"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                      {isHi ? "पिनकोड" : "Pincode"}
                    </label>
                    <input
                      type="text"
                      value={profile.pincode || ""}
                      onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                      placeholder="e.g. 244901"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                    {isHi ? "व्यापार का पैमाना / कर्मचारी" : "Business Scale / Employees"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {businessSizes.map((sz) => (
                      <button
                        key={sz.value}
                        type="button"
                        onClick={() => setProfile({ ...profile, businessSize: sz.value })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          profile.businessSize === sz.value
                            ? "border-[#014D4E] bg-[#014D4E]/5 ring-1 ring-[#014D4E]"
                            : "border-[#E6DED7] bg-white hover:bg-[#F8F3EE]"
                        }`}
                      >
                        <div className="text-xs font-bold text-[#172B35]">{sz.label}</div>
                        <div className="text-[11px] text-[#60727A] mt-1">{sz.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products Tags */}
                <div>
                  <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                    {isHi ? "मुख्य उत्पाद या सेवाएं" : "Main Products or Services Sold"}
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), handleAddProductTag())
                      }
                      placeholder={isHi ? "उत्पाद लिखें और जोड़ें (उदा. सरसों का तेल, दाल, चावल)" : "Type product name and press Add (e.g. Mustard Oil, Tea, Rice)"}
                      className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E]"
                    />
                    <button
                      type="button"
                      onClick={handleAddProductTag}
                      className="px-4 py-2 bg-[#014D4E] hover:bg-[#013738] text-white text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      {isHi ? "जोड़ें" : "Add Tag"}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {currentProducts.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F3EE] border border-[#E6DED7] text-xs text-[#172B35]"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveProductTag(tag)}
                          className="text-[#60727A] hover:text-[#C94A45] font-bold cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-base font-bold text-[#172B35]">
                  {isHi ? "2. व्यावसायिक स्थान और परिचालन क्षेत्र" : "2. Business Location & Operational Area"}
                </h3>

                <div className="p-3.5 bg-[#014D4E]/5 border border-[#014D4E]/20 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-[#014D4E]" />
                    <div>
                      <div className="text-xs font-bold text-[#014D4E]">
                        {isHi ? "सटीक जीपीएस स्थान" : "Auto-Detect GPS Location"}
                      </div>
                      <div className="text-[11px] text-[#60727A]">
                        {profile.coordinates?.lat || 28.8154},{" "}
                        {profile.coordinates?.lng || 79.0257} (Rampur Market)
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      alert("GPS calibrated to Rampur Central Market (±5m precision).")
                    }
                    className="px-3 py-1.5 bg-[#014D4E] text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    {isHi ? "जीपीएस रीफ्रेश करें" : "Refresh GPS"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                      {isHi ? "गाँव / कस्बा / इलाका" : "Village / Town / Locality"}
                    </label>
                    <input
                      type="text"
                      value={profile.location || ""}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="e.g. Main Bazar, Rampur, Uttar Pradesh"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                      {isHi ? "पिनकोड" : "Pincode"}
                    </label>
                    <input
                      type="text"
                      value={profile.pincode || ""}
                      onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                      placeholder="e.g. 244901"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CUSTOMERS */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in">
                <h3 className="text-base font-bold text-[#172B35]">
                  {isHi ? "3. लक्षित ग्राहक एवं खोज चैनल" : "3. Target Customers & Discovery Channels"}
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                    {isHi ? "लक्षित ग्राहक समूह" : "Target Customers"}
                  </label>
                  <input
                    type="text"
                    value={targetCustDisplay}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        targetCustomers: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    placeholder="e.g. Local village households, farmers, daily wage workers"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                    {isHi ? "ग्राहक वर्तमान में आपको कैसे ढूंढते हैं?" : "How do customers currently find you?"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Walk-in footfall",
                      "Word of mouth",
                      "WhatsApp messages",
                      "Phone calls",
                      "Local market day (Haat)",
                    ].map((ch) => {
                      const channels = profile.discoveryChannels || [];
                      const isSel = channels.includes(ch);
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => {
                            setProfile({
                              ...profile,
                              discoveryChannels: isSel
                                ? channels.filter((c) => c !== ch)
                                : [...channels, ch],
                            });
                          }}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                            isSel
                              ? "bg-[#014D4E]/10 border-[#014D4E] text-[#014D4E] font-semibold"
                              : "bg-white border-[#E6DED7] text-[#172B35] hover:bg-[#F8F3EE]"
                          }`}
                        >
                          {ch}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CHALLENGES & VOICE INPUT */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#172B35]">
                    {isHi ? "4. प्रमुख चुनौतियाँ एवं विकास लक्ष्य" : "4. Current Challenges & Growth Goals"}
                  </h3>
                  <span className="text-xs text-[#60727A]">
                    {isHi ? "सभी लागू विकल्प चुनें" : "Select all that apply"}
                  </span>
                </div>

                {/* Voice Input Banner */}
                <div className="p-4 bg-[#F8F3EE] rounded-xl border border-[#E6DED7] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-[#172B35] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F4C430]" />
                      <span>{isHi ? "बोलकर चुनौती दर्ज करें" : "Prefer to Speak Your Business Challenge?"}</span>
                    </div>
                    <p className="text-[11px] text-[#60727A]">
                      {isHi
                        ? "हिन्दी या अंग्रेजी में बोलें, सबमिट करने से पहले टेक्स्ट को एडिट कर सकते हैं।"
                        : "Speak naturally. Review & edit transcription before submitting."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setVoiceTranscriptTarget("challenge");
                      setVoiceModalOpen(true);
                    }}
                    className="px-3.5 py-2 bg-[#014D4E] hover:bg-[#013738] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    <Mic className="w-3.5 h-3.5 text-[#F4C430]" />
                    <span>{isHi ? "माइक दबाएं" : "Speak Now"}</span>
                  </button>
                </div>

                {/* Common Challenge Chips */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#172B35]">
                    {isHi ? "दुकान की मुख्य रुकावटें चुनें:" : "Select Common Bottlenecks:"}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {commonChallenges.map((c) => {
                      const isSelected = currentChallenges.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => handleToggleChallenge(c)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-start gap-2 cursor-pointer ${
                            isSelected
                              ? "bg-[#014D4E]/10 border-[#014D4E] text-[#014D4E] font-semibold"
                              : "bg-white border-[#E6DED7] text-[#172B35] hover:bg-[#F8F3EE]"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isSelected ? "text-[#014D4E]" : "text-[#E6DED7]"
                            }`}
                          />
                          <span>{c}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Document Upload */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#172B35] mb-1.5">
                    {isHi
                      ? "वैकल्पिक: व्यवसाय दस्तावेज़ सत्यापन (उद्यम / ट्रेड लाइसेंस)"
                      : "Optional: Upload Business Document (Udyam / Trade License / Invoice)"}
                  </label>
                  <div
                    onClick={() =>
                      alert("Mock document attached: Udyam-Registration-Verified.pdf")
                    }
                    className="p-4 border-2 border-dashed border-[#E6DED7] hover:border-[#014D4E] rounded-xl bg-[#F8F3EE] text-center cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-6 h-6 text-[#014D4E] mx-auto mb-1" />
                    <div className="text-xs font-semibold text-[#172B35]">
                      {isHi ? "अपलोड करने के लिए क्लिक करें (PDF, JPG)" : "Click to upload or drag & drop (PDF, JPG, PNG)"}
                    </div>
                    <div className="text-[11px] text-[#60727A]">
                      {isHi ? "सरकारी सब्सिडी पात्रता स्वतः भर जाती है" : "Helps auto-fill government subsidy eligibility"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-5 border-t border-[#E6DED7] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold text-[#172B35] bg-[#F8F3EE] hover:bg-[#E6DED7] rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> {isHi ? "पीछे" : "Back"}
                </button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#014D4E] hover:bg-[#013738] rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {isHi ? "अगला चरण" : "Next Step"} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveAndComplete}
                  className="px-6 py-2.5 text-xs font-bold text-[#013738] bg-[#F4C430] hover:bg-[#E0AF1F] rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  {isHi ? "डीएनए सहेजें और आगे बढ़ें" : "Save Business DNA & Proceed"}{" "}
                  <ArrowRight className="w-3.5 h-3.5 text-[#013738]" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SAVED PROFILE SUMMARY VIEW */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6DED7]">
              <div>
                <span className="text-xs font-semibold text-[#014D4E] bg-[#014D4E]/10 px-2.5 py-0.5 rounded-full">
                  {isHi ? "सत्यापित प्रोफाइल" : "Verified Profile"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#172B35] mt-1">
                  {profile.businessName}
                </h2>
                <div className="text-xs text-[#60727A] mt-0.5 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#014D4E]" />
                  <span>
                    {profile.location} (Pincode: {profile.pincode})
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-[#60727A]">{isHi ? "परिचालन पैमाना" : "Operating Scale"}</div>
                <div className="text-sm font-bold text-[#014D4E]">
                  {profile.businessSize || "Micro (1-2 people)"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#60727A]">
                  {isHi ? "श्रेणी एवं उत्पाद" : "Category & Products"}
                </div>
                <div className="text-sm font-semibold text-[#172B35]">{profile.category}</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentProducts.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 bg-[#F8F3EE] rounded-md text-xs text-[#172B35] border border-[#E6DED7]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#60727A]">
                  {isHi ? "सक्रिय दर्ज चुनौतियाँ" : "Active Identified Challenges"} ({currentChallenges.length})
                </div>
                <div className="space-y-1.5">
                  {currentChallenges.map((ch, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#172B35]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4C430]"></span>
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Badges */}
            <div className="pt-4 border-t border-[#E6DED7] flex items-center justify-between text-xs text-[#60727A]">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#2E8B57]" />
                <span>Udyam Verification status: Verified MSME</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onContinueToMarketScan}
              className="px-7 py-3 bg-[#014D4E] hover:bg-[#013738] text-white text-sm font-bold rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>{isHi ? "मार्केट स्कैन देखें" : `Explore Market Scan for ${profile.businessName}`}</span>
              <ArrowRight className="w-4 h-4 text-[#F4C430]" />
            </button>
          </div>
        </div>
      )}

      {/* Voice Input Modal for editable transcription */}
      <VoiceInputModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        language={language}
        onApplyTranscript={handleApplyVoiceTranscript}
        title={
          voiceTranscriptTarget === "challenge"
            ? isHi ? "व्यावसायिक चुनौती बोलकर बताएं" : "Speak Your Business Challenge"
            : isHi ? "दुकान का नाम बोलें" : "Speak Shop / Business Name"
        }
        contextHint={
          isHi
            ? "बोलने के बाद आप टेक्स्ट को एडिट भी कर सकते हैं।"
            : "Review and edit the transcription before saving to your profile."
        }
        samplePhrases={[
          "Pass ki railway colony se delivery order kaise layein?",
          "Need more daily walk-in customers and cheaper pulses from local mill",
          "Customers asking for WhatsApp price list and home delivery",
        ]}
      />
    </div>
  );
};
