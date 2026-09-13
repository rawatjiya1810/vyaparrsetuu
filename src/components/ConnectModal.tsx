import React, { useState, useEffect } from "react";
import { LocalBusiness, BusinessProfile } from "../types";
import { dataService } from "../services/dataService";
import {
  X,
  MessageSquare,
  Send,
  CheckCircle2,
  Copy,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface ConnectModalProps {
  business: LocalBusiness | null;
  businessProfile: BusinessProfile;
  isOpen: boolean;
  language?: string;
  onClose: () => void;
  onProposalSent?: (businessId: string) => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  business,
  businessProfile,
  isOpen,
  language = "en",
  onClose,
  onProposalSent,
}) => {
  const [proposalTitle, setProposalTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isHi = language === "hi";

  useEffect(() => {
    if (business) {
      const loc = businessProfile.location ? businessProfile.location.split(",")[0] : "our area";
      const isSupplier = business.type === "supplier";
      const isComplementary = business.type === "complementary";
      const isCustomer = business.type === "customer";

      const defaultTitle = isHi
        ? (isSupplier
            ? "स्थानीय आपूर्ति साझेदारी"
            : isComplementary
            ? "क्रॉस-प्रमोशन साझेदारी"
            : isCustomer
            ? "थोक आपूर्ति समझौता"
            : "स्थानीय व्यापारी सहयोग")
        : (isSupplier
            ? "Local Supply Partnership"
            : isComplementary
            ? "Cross-Promotion Partnership"
            : isCustomer
            ? "Bulk Supply Agreement"
            : "Local Merchant Collaboration");

      const defaultMsg = isHi
        ? (isSupplier
            ? `नमस्ते ${business.contactPerson || business.name}! मैं ${loc} से ${businessProfile.businessName} हूँ। हम थोक इन्वेंट्री खरीदने के लिए ${business.name} के साथ सीधे आपूर्ति साझेदारी की संभावना तलाशना चाहते हैं।`
            : isComplementary
            ? `नमस्ते ${business.contactPerson || business.name}! मैं ${loc} से ${businessProfile.businessName} हूँ। हम अपनी दुकानों के बीच संयुक्त क्रॉस-प्रमोशन और ग्राहक रेफरल तलाशना चाहते हैं।`
            : isCustomer
            ? `नमस्ते ${business.contactPerson || business.name}! मैं ${loc} से ${businessProfile.businessName} हूँ। हम आपके प्रतिष्ठान के लिए विशेष कीमतों के साथ नियमित थोक आपूर्ति डिलीवरी की पेशकश करना चाहते हैं।`
            : `नमस्ते ${business.contactPerson || business.name}! मैं ${loc} से ${businessProfile.businessName} हूँ। हम अपने व्यवसायों के बीच स्थानीय सहयोग की संभावना तलाशना चाहते हैं।`)
        : (isSupplier
            ? `Namaste ${business.contactPerson || business.name}! This is ${businessProfile.businessName} from ${loc}. We'd like to explore a direct supply partnership with ${business.name} to procure bulk inventory.`
            : isComplementary
            ? `Namaste ${business.contactPerson || business.name}! This is ${businessProfile.businessName} from ${loc}. We'd like to explore joint cross-promotions and customer referrals between our stores.`
            : isCustomer
            ? `Namaste ${business.contactPerson || business.name}! This is ${businessProfile.businessName} from ${loc}. We'd like to offer regular bulk supply delivery with special pricing for your establishment.`
            : `Namaste ${business.contactPerson || business.name}! This is ${businessProfile.businessName} from ${loc}. We'd like to explore a local collaboration between our businesses.`);

      setProposalTitle(defaultTitle);
      setMessage(defaultMsg);
      setSentSuccess(false);
      setErrorMessage(null);
    }
  }, [business, businessProfile, language, isHi]);

  if (!isOpen || !business) return null;

  const handleCopy = () => {
    const textToCopy = `[${proposalTitle}]\n${message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalTitle.trim() || !message.trim() || isSubmitting || sentSuccess) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await dataService.sendProposal({
        businessId: business.id,
        businessName: business.name,
        title: proposalTitle.trim(),
        message: message.trim(),
      });

      setSentSuccess(true);
      if (onProposalSent) {
        onProposalSent(business.id);
      }

      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      console.error("Proposal submission error:", err);
      setErrorMessage(isHi ? "प्रस्ताव नहीं भेजा जा सका। कृपया पुनः प्रयास करें।" : "Couldn't send the proposal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172B35]/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E6DED7] shadow-xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#F8F3EE] p-5 border-b border-[#E6DED7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#014D4E] text-[#F4C430] flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#172B35]">
                {isHi ? `${business.name} को प्रस्ताव भेजें` : `Send Proposal to ${business.name}`}
              </h3>
              <p className="text-[11px] text-[#526671] font-medium">
                {business.potentialConnection || business.category} • {business.distanceKm} km {isHi ? "दूर" : "away"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 text-[#526671] hover:text-[#172B35] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSendProposal} className="p-6 space-y-4">
          {/* Success Banner */}
          {sentSuccess && (
            <div className="p-3.5 bg-[#2E8B57]/10 border border-[#2E8B57]/30 rounded-xl flex items-center gap-3 text-xs text-[#2E8B57] font-bold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <div>✓ {isHi ? "प्रस्ताव सफलतापूर्वक भेजा गया" : "Proposal sent successfully"}</div>
                <div className="text-[11px] font-medium text-[#172B35] mt-0.5">
                  {isHi ? `आपका प्रस्ताव सहेज लिया गया है और ${business.name} को भेज दिया गया है।` : `Your proposal has been saved and sent to ${business.name}.`}
                </div>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Synergy Context */}
          <div className="p-3 bg-[#014D4E]/5 rounded-xl border border-[#014D4E]/20 text-xs">
            <span className="font-bold text-[#014D4E]">{isHi ? "क्यों जुड़ें: " : "Why Connect: "}</span>
            <span className="text-[#172B35] font-medium">{business.whyUseful}</span>
          </div>

          {/* Proposal Title Input */}
          <div>
            <label className="block text-xs font-bold text-[#172B35] mb-1">
              {isHi ? "प्रस्ताव शीर्षक" : "Proposal Title"}
            </label>
            <input
              type="text"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              disabled={isSubmitting || sentSuccess}
              placeholder={isHi ? "जैसे: स्थानीय आपूर्ति साझेदारी" : "e.g. Local Supply Partnership"}
              className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E] font-medium"
              required
            />
          </div>

          {/* Message Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#172B35]">
                {isHi ? "प्रस्ताव संदेश" : "Proposal Message"}
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-semibold text-[#014D4E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? (isHi ? "कॉपी हो गया!" : "Copied!") : (isHi ? "संदेश कॉपी करें" : "Copy Message")}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting || sentSuccess}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#E6DED7] bg-white focus:outline-none focus:border-[#014D4E] font-sans leading-relaxed"
              required
            />
          </div>

          {/* Business Info Footer */}
          <div className="flex items-center justify-between text-[11px] text-[#526671] pt-1">
            <span>{isHi ? "संपर्क: " : "Contact: "}{business.contactPerson || (isHi ? "व्यापारी" : "Merchant")}</span>
            <span className="font-semibold text-[#014D4E]">{isHi ? "रेटिंग: " : "Rating: "}⭐ {business.rating}</span>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#E6DED7] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-xs font-bold text-[#172B35] hover:bg-[#E6DED7] rounded-xl transition-colors cursor-pointer"
            >
              {isHi ? "रद्द करें" : "Cancel"}
            </button>

            <button
              type="submit"
              disabled={isSubmitting || sentSuccess || !proposalTitle.trim() || !message.trim()}
              className="px-5 py-2.5 bg-[#014D4E] hover:bg-[#013738] disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#F4C430]" />
                  <span>{isHi ? "प्रस्ताव भेजा जा रहा है..." : "Sending Proposal..."}</span>
                </>
              ) : sentSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#F4C430]" />
                  <span>{isHi ? "प्रस्ताव भेजा गया ✓" : "Proposal Sent ✓"}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#F4C430]" />
                  <span>{isHi ? "प्रस्ताव भेजें" : "Send Proposal"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
