import React from "react";
import { BrandLogo } from "./BrandLogo";
import { Language } from "../types";
import { translations } from "../data/translations";
import {
  ShieldCheck,
  Heart,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  Headphones,
} from "lucide-react";

interface FooterProps {
  language: Language;
  onOpenAuth?: (mode: "login" | "register") => void;
  onNavigateSection?: (sectionId: string) => void;
  onNavigateTab?: (tab: string) => void;
  isAuthenticated?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenAuth,
  onNavigateSection,
  onNavigateTab,
  isAuthenticated = false,
}) => {
  const t = translations[language] || translations.en;

  const handleFeatureClick = (tabId: string, sectionId: string) => {
    if (onNavigateTab) {
      onNavigateTab(tabId);
    } else if (onNavigateSection) {
      onNavigateSection(sectionId);
    }
  };
  return (
    <footer className="bg-gradient-to-br from-[#013738] via-[#014D4E] to-[#012829] text-white pt-16 pb-16 sm:pb-20 border-t border-teal-800/40 shadow-2xl relative overflow-hidden">
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F4C430]/10 via-transparent to-black/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust & Helpline Banner */}
        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 mb-12 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-13 h-13 rounded-xl bg-[#F4C430]/20 flex items-center justify-center text-[#F4C430] shrink-0 shadow-inner">
              <Headphones className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-[#F4C430]">
                {t.footerHelplineLabel}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2 mt-0.5">
                <span>1800-208-7388</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F4C430] text-[#013738]">
                  {t.footerTollFree}
                </span>
              </div>
              <div className="text-xs text-teal-100/90 mt-0.5">
                {t.footerHelplineHours}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                if (isAuthenticated && onNavigateTab) {
                  onNavigateTab("advisor");
                } else if (onOpenAuth) {
                  onOpenAuth("register");
                }
              }}
              className="w-full md:w-auto px-6 py-3 bg-[#F4C430] hover:bg-[#E0AF1F] text-[#013738] font-extrabold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>{isAuthenticated ? t.footerCtaAdvisor : t.footerCtaAssessment}</span>
              <ArrowRight className="w-4 h-4 text-[#013738]" />
            </button>
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Col 1 & 2: Brand Info & About */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="white" size="lg" />
            <p className="text-sm text-teal-100/90 max-w-sm leading-relaxed">
              {t.footerBrandDesc}
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-teal-100 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#F4C430]" />
                <span>{t.footerTrust1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-teal-100 font-medium">
                <Award className="w-4 h-4 text-[#F4C430]" />
                <span>{t.footerTrust2}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/15 text-xs font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-[#F4C430] animate-ping"></span>
                <span>{t.footerTrust3}</span>
              </span>
            </div>
          </div>

          {/* Col 3: Core Platform Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C430]">
              {t.footerCapabilitiesHeader}
            </h4>
            <ul className="space-y-2.5 text-sm text-teal-100/90">
              <li>
                <button
                  onClick={() => handleFeatureClick("market-scan", "features")}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  {t.cap1Title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("growth-score", "features")}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  {t.cap2Title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("opportunities", "features")}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  {t.cap3Title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("advisor", "features")}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  {t.cap4Title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("action-plan", "features")}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  {t.cap5Title}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("community", "about")}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  {t.cap6Title}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Government Schemes & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C430]">
              {t.footerSchemesHeader}
            </h4>
            <ul className="space-y-2.5 text-sm text-teal-100/90">
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection && onNavigateSection("how-it-works");
                  }}
                  className="hover:text-white hover:underline transition-colors"
                >
                  {t.tickerHowItWorks}
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("opportunities", "features")}
                  className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span>{t.tickerSvanidhi}</span>
                  <ExternalLink className="w-3 h-3 text-[#F4C430]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("opportunities", "features")}
                  className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span>{t.tickerMudra}</span>
                  <ExternalLink className="w-3 h-3 text-[#F4C430]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("business-dna", "features")}
                  className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span>{t.tickerUdyam}</span>
                  <ExternalLink className="w-3 h-3 text-[#F4C430]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFeatureClick("opportunities", "features")}
                  className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span>{t.tickerOndc}</span>
                  <ExternalLink className="w-3 h-3 text-[#F4C430]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C430]">
              {t.footerContactHeader}
            </h4>
            <div className="space-y-3 text-xs text-teal-100/90">
              <div
                onClick={() => handleFeatureClick("help", "about")}
                className="flex items-start gap-2.5 cursor-pointer hover:text-white"
              >
                <Phone className="w-4 h-4 text-[#F4C430] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{t.footerHelplineLabel}</div>
                  <div>1800-208-7388</div>
                </div>
              </div>

              <div
                onClick={() => handleFeatureClick("advisor", "features")}
                className="flex items-start gap-2.5 cursor-pointer hover:text-white"
              >
                <MessageSquare className="w-4 h-4 text-[#F4C430] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{t.footerWhatsappLabel}</div>
                  <div>+91 98765 43210</div>
                </div>
              </div>

              <div
                onClick={() => handleFeatureClick("help", "about")}
                className="flex items-start gap-2.5 cursor-pointer hover:text-white"
              >
                <Mail className="w-4 h-4 text-[#F4C430] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{t.footerEmailLabel}</div>
                  <div>support@vyaparsetu.in</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4C430] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{t.footerHubLabel}</div>
                  <div>Electronics Niketan, CGO Complex, New Delhi 110003</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F4C430] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{t.footerHoursLabel}</div>
                  <div>Mon–Sat: 8:00 AM – 8:00 PM IST</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Language Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-teal-200/80">
          <div>
            {t.footerRights}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleFeatureClick("help", "about")}
              className="hover:text-white cursor-pointer hover:underline text-left"
            >
              {t.footerPrivacy}
            </button>
            <button
              onClick={() => handleFeatureClick("help", "about")}
              className="hover:text-white cursor-pointer hover:underline text-left"
            >
              {t.footerTerms}
            </button>
            <button
              onClick={() => handleFeatureClick("business-dna", "features")}
              className="hover:text-white cursor-pointer hover:underline text-left"
            >
              {t.footerSecurity}
            </button>
            <button
              onClick={() => handleFeatureClick("advisor", "features")}
              className="hover:text-white cursor-pointer hover:underline text-left"
            >
              {t.footerVoice}
            </button>
          </div>

          <div className="flex items-center gap-1 text-white">
            <span>{t.footerMadeWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
