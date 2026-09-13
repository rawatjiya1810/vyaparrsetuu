import React, { useState } from "react";
import { Language } from "../types";
import { translations } from "../data/translations";
import heroEntrepreneurImg from "../assets/images/women_entrepreneurs_hero_1789226008592.jpg";
import {
  Sparkles,
  MapPin,
  TrendingUp,
  Lightbulb,
  Compass,
  CalendarCheck2,
  Users2,
  CheckCircle2,
  ArrowRight,
  Play,
  Shield,
  Zap,
  Target,
  Truck,
  Store,
  Factory,
  Search,
  BadgeCheck,
  Building2,
  ExternalLink,
} from "lucide-react";

interface LandingPageProps {
  language: Language;
  onOpenAuth: (mode: "login" | "register") => void;
  onSelectFeature?: (featureId: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onOpenAuth,
  onNavigateSection,
}) => {
  const t = translations[language] || translations.en;

  // Interactive Live Explorer state on Landing Page
  const [sampleBusinessType, setSampleBusinessType] = useState<"kirana" | "dairy" | "garments" | "hardware">("kirana");

  const schemeRollerItems = [
    {
      label: t.tickerHowItWorks,
      action: () => onNavigateSection?.("how-it-works"),
      isExternal: false,
    },
    {
      label: t.tickerSvanidhi,
      action: () => onOpenAuth("register"),
      isExternal: true,
    },
    {
      label: t.tickerMudra,
      action: () => onOpenAuth("register"),
      isExternal: true,
    },
    {
      label: t.tickerUdyam,
      action: () => onOpenAuth("register"),
      isExternal: true,
    },
    {
      label: t.tickerOndc,
      action: () => onOpenAuth("register"),
      isExternal: true,
    },
  ];

  const sampleInsights = {
    kirana: {
      title: t.catKirana,
      location: "Rampur Main Market (Pincode: 244901)",
      growthScore: 68,
      topGap: "Home delivery & weekly ration subscription for 320 families nearby",
      supplierSavings: "Save 12% on pulses by connecting directly with Mohan Organic Mill (2.4 km)",
      schemeMatch: "PM SVANidhi: ₹10,000 collateral-free working capital loan matched",
      potentialGain: "+₹18,500 / month",
    },
    dairy: {
      title: t.catDairy,
      location: "Anand Nagar, Ward 4",
      growthScore: 74,
      topGap: "Morning doorstep supply to 4 local tea stalls & 2 sweet shops",
      supplierSavings: "Tie-up with chill center in Village Kheda (3.5 km)",
      schemeMatch: "National Dairy Development Subsidy eligible",
      potentialGain: "+₹22,000 / month",
    },
    garments: {
      title: t.catGarments,
      location: "Station Road Market",
      growthScore: 62,
      topGap: "Festival ethnic wear demand spike with zero nearby competitors stocking plus-sizes",
      supplierSavings: "Procure fabrics directly from Surat weaver hub agent",
      schemeMatch: "PM Mudra Scheme (Shishu: up to ₹50,000) pre-approved",
      potentialGain: "+₹26,000 / month",
    },
    hardware: {
      title: t.catHardware,
      location: "Industrial Bypass Road",
      growthScore: 71,
      topGap: "Supply contract for ongoing 3 rural housing construction sites within 4 km",
      supplierSavings: "Direct distributor rate on wiring & plumbing fixtures",
      schemeMatch: "MSME Credit Guarantee Scheme eligible",
      potentialGain: "+₹35,000 / month",
    },
  };

  const activeInsight = sampleInsights[sampleBusinessType];

  return (
    <div className="bg-[#FFFDFC] text-[#172B35] min-h-screen">
      {/* SECTION 1: HERO SECTION */}
      <section id="hero" className="relative pb-16 md:pb-24 overflow-hidden bg-[#F8F3EE] border-b border-[#E6DED7]">
        {/* SCHEMES & SUPPORT SCROLLING ROLLER */}
        <div className="w-full bg-transparent pt-4 md:pt-5 pb-1 overflow-hidden relative z-20 group">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            {/* Ticker Title Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#014D4E] text-[#F4C430] font-heading font-extrabold text-[11px] uppercase tracking-wider rounded-md shadow-xs shrink-0 z-10 mr-3 border border-[#013738]">
              <Sparkles className="w-3 h-3 text-[#F4C430]" />
              <span>{t.tickerTitle}</span>
            </div>

            {/* Marquee Container */}
            <div className="overflow-hidden w-full relative">
              <div className="animate-marquee flex items-center whitespace-nowrap">
                {[...schemeRollerItems, ...schemeRollerItems, ...schemeRollerItems].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <button
                      onClick={item.action}
                      className="inline-flex items-center gap-1.5 text-[#014D4E] hover:text-[#9A7000] transition-colors cursor-pointer text-xs font-bold px-2 py-0.5"
                    >
                      <span>{item.label}</span>
                      {item.isExternal && (
                        <ExternalLink className="w-3.5 h-3.5 text-[#9A7000] shrink-0" />
                      )}
                    </button>
                    <span className="text-[#9A7000] font-extrabold mx-3.5 text-xs select-none">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#014D4E]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 -ml-24 w-80 h-80 rounded-full bg-[#F4C430]/15 blur-3xl pointer-events-none" />

        {/* Desktop Large Integrated Hero Photo */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[48%] xl:w-[50%] z-0 pointer-events-none overflow-hidden">
          <img
            src={heroEntrepreneurImg}
            alt="Proud Indian Entrepreneur at Local Business"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, black 45%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, black 45%, black 100%)",
            }}
          />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#F8F3EE] via-[#F8F3EE]/70 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F8F3EE] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8F3EE] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 md:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DED7] text-[#014D4E] font-sans text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse shrink-0" />
                <Sparkles className="w-3.5 h-3.5 text-[#9A7000]" />
                <span>{t.badgePlatform}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[48px] font-extrabold text-[#014D4E] leading-[1.15] tracking-tight">
                {t.heroHeadingLine1} <br />
                <span className="text-[#9A7000]">{t.heroHeadingLine2}</span> <br />
                <span className="text-[#172B35]">{t.heroHeadingLine3}</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-base sm:text-lg text-[#1E303A] max-w-xl leading-relaxed font-medium">
                {t.heroSubtext}
              </p>

              {/* Core Product Promise Highlight Card */}
              <div className="p-4.5 rounded-xl bg-white border-l-4 border-l-[#F4C430] border-y border-r border-[#E6DED7] shadow-sm flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#F8F3EE] text-[#014D4E] shrink-0 mt-0.5 border border-[#E6DED7]">
                  <Target className="w-5 h-5 text-[#014D4E]" />
                </div>
                <div className="font-sans text-xs sm:text-sm text-[#172B35] font-semibold leading-relaxed">
                  <strong className="font-heading text-[#014D4E] block font-extrabold text-sm mb-0.5">
                    {t.corePromiseTitle}
                  </strong>
                  {t.corePromiseDesc}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onOpenAuth("register")}
                  className="px-7 py-4 bg-[#014D4E] hover:bg-[#013738] text-white font-sans text-base font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
                  id="hero-cta-get-started"
                >
                  <span>{t.ctaGetStarted}</span>
                  <ArrowRight className="w-5 h-5 text-[#F4C430]" />
                </button>

                <a
                  href="#how-it-works"
                  className="px-6 py-4 bg-white hover:bg-[#FAF6F2] text-[#014D4E] border border-[#E6DED7] font-sans text-base font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-[#014D4E] fill-[#014D4E]" />
                  <span>{t.ctaSeeHow}</span>
                </a>
              </div>

              {/* Trust Subtext Pills */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 font-sans text-xs text-[#2D3E46] font-semibold pt-1">
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-[#2E8B57]" /> {t.trustPillFree}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#014D4E]" /> {t.trustPillVoice}
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#9A7000]" /> {t.trustPillMatched}
                </span>
              </div>
            </div>

            {/* Right Column: Responsive Integrated Photo */}
            <div className="lg:col-span-5 lg:hidden flex justify-center mt-4">
              <div className="relative w-full max-w-lg h-72 sm:h-96 overflow-hidden">
                <img
                  src={heroEntrepreneurImg}
                  alt="Proud Indian Entrepreneur at Local Business"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  style={{
                    maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, black 45%, black 100%), linear-gradient(to bottom, black 70%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, black 45%, black 100%), linear-gradient(to bottom, black 70%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F8F3EE] via-[#F8F3EE]/60 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F8F3EE] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE HYPERLOCAL PREVIEW WIDGET */}
      <section className="py-12 bg-white border-b border-[#E6DED7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#013738] via-[#014D4E] to-[#014243] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
            <div className="max-w-3xl mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F4C430] font-sans text-xs font-bold mb-2 border border-white/15">
                <Search className="w-3.5 h-3.5" /> {t.explorerBadge}
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {t.explorerHeading}
              </h2>
              <p className="font-sans text-sm sm:text-base text-teal-100/90 mt-1">
                {t.explorerSubtext}
              </p>
            </div>

            {/* Business Category Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {[
                { id: "kirana", label: t.catKirana, icon: Store },
                { id: "dairy", label: t.catDairy, icon: Building2 },
                { id: "garments", label: t.catGarments, icon: Sparkles },
                { id: "hardware", label: t.catHardware, icon: Factory },
              ].map((btn) => {
                const Icon = btn.icon;
                const isSelected = sampleBusinessType === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setSampleBusinessType(btn.id as any)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#F4C430] text-[#013738] shadow-lg ring-2 ring-white/50"
                        : "bg-white/10 hover:bg-white/20 text-white/90 border border-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Results Card */}
            <div className="bg-white text-[#172B35] rounded-xl p-5 sm:p-6 shadow-md border border-[#E6DED7]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E6DED7] gap-2">
                <div>
                  <div className="font-sans text-[11px] uppercase font-bold tracking-wider text-[#014D4E]">
                    {t.simulatedIntel}
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#014D4E]">{activeInsight.title}</h3>
                  <div className="font-sans text-xs text-[#526671] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#9A7000]" /> {activeInsight.location}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-start sm:self-auto">
                  <div className="text-right">
                    <div className="font-sans text-[11px] text-[#526671] uppercase font-bold">{t.estUpside}</div>
                    <div className="font-heading text-lg sm:text-xl font-extrabold text-[#2E8B57]">{activeInsight.potentialGain}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-[#014D4E]/5 border border-[#014D4E]/20 text-center">
                    <div className="font-sans text-[10px] text-[#014D4E] font-bold uppercase">{t.growthScoreLabel}</div>
                    <div className="font-heading text-base font-extrabold text-[#014D4E]">{activeInsight.growthScore}/100</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {/* Detected Gap */}
                <div className="p-3.5 rounded-xl bg-[#FFF9E6] border border-[#F4C430]/40">
                  <div className="font-sans text-xs font-bold text-[#8C6200] flex items-center gap-1.5 mb-1">
                    <Lightbulb className="w-4 h-4" /> {t.topGapDetected}
                  </div>
                  <div className="font-sans text-xs text-[#2D3E46] leading-relaxed font-medium">
                    {activeInsight.topGap}
                  </div>
                </div>

                {/* Direct Supplier Savings */}
                <div className="p-3.5 rounded-xl bg-[#014D4E]/5 border border-[#014D4E]/20">
                  <div className="font-sans text-xs font-bold text-[#014D4E] flex items-center gap-1.5 mb-1">
                    <Truck className="w-4 h-4" /> {t.localEcosystemOpp}
                  </div>
                  <div className="font-sans text-xs text-[#2D3E46] leading-relaxed font-medium">
                    {activeInsight.supplierSavings}
                  </div>
                </div>

                {/* Scheme Match */}
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
                  <div className="font-sans text-xs font-bold text-[#2E8B57] flex items-center gap-1.5 mb-1">
                    <Shield className="w-4 h-4" /> {t.schemeMatch}
                  </div>
                  <div className="font-sans text-xs text-[#2D3E46] leading-relaxed font-medium">
                    {activeInsight.schemeMatch}
                  </div>
                </div>
              </div>

              {/* Call to action inside widget */}
              <div className="mt-5 pt-4 border-t border-[#E6DED7] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="font-sans text-xs text-[#2D3E46] font-medium">
                  {t.scanTimeNote}
                </div>
                <button
                  onClick={() => onOpenAuth("register")}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#014D4E] hover:bg-[#013738] text-white font-sans text-xs sm:text-sm font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>{t.btnScanLocation}</span>
                  <ArrowRight className="w-4 h-4 text-[#F4C430]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRUST STRIP */}
      <section className="bg-[#F8F3EE] py-8 border-b border-[#E6DED7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E6DED7] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#014D4E]/10 border border-[#014D4E]/20 flex items-center justify-center text-[#014D4E] shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading text-sm font-extrabold text-[#014D4E]">{t.trustSimple}</div>
                <div className="font-sans text-xs text-[#526671] font-semibold">{t.trustSimpleSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E6DED7] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FFF9E6] border border-[#F4C430]/40 flex items-center justify-center text-[#8C6200] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading text-sm font-extrabold text-[#014D4E]">{t.trustLocal}</div>
                <div className="font-sans text-xs text-[#526671] font-semibold">{t.trustLocalSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E6DED7] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#2E8B57] shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading text-sm font-extrabold text-[#014D4E]">{t.trustTrusted}</div>
                <div className="font-sans text-xs text-[#526671] font-semibold">{t.trustTrustedSub}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#E6DED7] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#014D4E]/10 border border-[#014D4E]/20 flex items-center justify-center text-[#014D4E] shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading text-sm font-extrabold text-[#014D4E]">{t.trustSecure}</div>
                <div className="font-sans text-xs text-[#526671] font-semibold">{t.trustSecureSub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 3 SIMPLE STEPS */}
      <section id="how-it-works" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#014D4E]/10 text-[#014D4E] font-sans text-xs font-bold mb-2 border border-[#014D4E]/20">
            <Compass className="w-3.5 h-3.5 text-[#9A7000]" /> {t.stepBadge}
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#014D4E] tracking-tight">
            {t.stepHeading}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#526671] mt-2 font-normal">
            {t.stepSubtext}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 shadow-sm relative flex flex-col justify-between hover:border-[#014D4E] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs font-bold px-3 py-1 rounded-full bg-[#014D4E]/10 text-[#014D4E]">
                  {language === "hi" ? "चरण 01" : "Step 01"}
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#014D4E]/10 flex items-center justify-center text-[#014D4E]">
                  <Store className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#014D4E] mb-2">{t.step1Title}</h3>
              <p className="font-sans text-sm text-[#2D3E46] leading-relaxed">{t.step1Desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6DED7] font-sans text-xs text-[#014D4E] font-bold flex items-center gap-1">
              <span>{t.step1Foot}</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 shadow-sm relative flex flex-col justify-between hover:border-[#F4C430] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs font-bold px-3 py-1 rounded-full bg-[#F4C430]/20 text-[#8C6200]">
                  {language === "hi" ? "चरण 02" : "Step 02"}
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#FFF9E6] flex items-center justify-center text-[#8C6200]">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#014D4E] mb-2">{t.step2Title}</h3>
              <p className="font-sans text-sm text-[#2D3E46] leading-relaxed">{t.step2Desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6DED7] font-sans text-xs text-[#8C6200] font-bold flex items-center gap-1">
              <span>{t.step2Foot}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 shadow-sm relative flex flex-col justify-between hover:border-[#2E8B57] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#2E8B57]">
                  {language === "hi" ? "चरण 03" : "Step 03"}
                </span>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-[#2E8B57]">
                  <CalendarCheck2 className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#014D4E] mb-2">{t.step3Title}</h3>
              <p className="font-sans text-sm text-[#2D3E46] leading-relaxed">{t.step3Desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6DED7] font-sans text-xs text-[#2E8B57] font-bold flex items-center gap-1">
              <span>{t.step3Foot}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onOpenAuth("register")}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#014D4E] hover:bg-[#013738] text-white font-sans text-base font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>{t.btnStartAssessment}</span>
            <ArrowRight className="w-4 h-4 text-[#F4C430]" />
          </button>
        </div>
      </section>

      {/* SECTION 5: 6 CAPABILITY CARDS (FULLY MULTILINGUAL) */}
      <section id="features" className="py-16 bg-[#F8F3EE] border-y border-[#E6DED7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#014D4E] tracking-tight">
              {t.capabilitiesHeading}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#465760] mt-2 font-semibold">
              {t.capabilitiesSubtext}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Local Market Insights */}
            <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#014D4E]/10 text-[#014D4E] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-extrabold text-[#014D4E] mb-2">{t.cap1Title}</h3>
              <p className="font-sans text-sm text-[#243740] leading-relaxed font-medium">
                {t.cap1Desc}
              </p>
            </div>

            {/* 2. Business Growth Score */}
            <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#014D4E]/10 text-[#014D4E] flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-extrabold text-[#014D4E] mb-2">{t.cap2Title}</h3>
              <p className="font-sans text-sm text-[#243740] leading-relaxed font-medium">
                {t.cap2Desc}
              </p>
            </div>

            {/* 3. Opportunity & Gap Detector */}
            <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#FFF9E6] text-[#8C6200] flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-extrabold text-[#014D4E] mb-2">{t.cap3Title}</h3>
              <p className="font-sans text-sm text-[#243740] leading-relaxed font-medium">
                {t.cap3Desc}
              </p>
            </div>

            {/* 4. Business Advisor */}
            <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#014D4E]/10 text-[#014D4E] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-extrabold text-[#014D4E] mb-2">{t.cap4Title}</h3>
              <p className="font-sans text-sm text-[#243740] leading-relaxed font-medium">
                {t.cap4Desc}
              </p>
            </div>

            {/* 5. 30-Day Action Plan */}
            <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#2E8B57] flex items-center justify-center mb-4">
                <CalendarCheck2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-extrabold text-[#014D4E] mb-2">{t.cap5Title}</h3>
              <p className="font-sans text-sm text-[#243740] leading-relaxed font-medium">
                {t.cap5Desc}
              </p>
            </div>

            {/* 6. Community Connect */}
            <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#FFF9E6] text-[#8C6200] flex items-center justify-center mb-4">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-extrabold text-[#014D4E] mb-2">{t.cap6Title}</h3>
              <p className="font-sans text-sm text-[#243740] leading-relaxed font-medium">
                {t.cap6Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LOCAL ECOSYSTEM & COMMUNITY WEB */}
      <section id="about" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9E6] border border-[#F4C430]/40 text-[#8C6200] font-sans text-xs font-bold">
              <Users2 className="w-3.5 h-3.5" /> {t.ecoBadge}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#014D4E] tracking-tight">
              {t.ecoHeading}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#2D3E46] leading-relaxed font-normal">
              {t.ecoDesc}
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-white rounded-xl border border-[#E6DED7] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Factory className="w-5 h-5 text-[#014D4E]" />
                  <div>
                    <div className="font-heading text-xs font-bold text-[#014D4E]">{t.ecoSupplierTitle}</div>
                    <div className="font-sans text-[11px] text-[#526671]">{t.ecoSupplierDesc}</div>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-[#2E8B57] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                  {t.ecoSupplierBadge}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#E6DED7] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-[#8C6200]" />
                  <div>
                    <div className="font-heading text-xs font-bold text-[#014D4E]">{t.ecoRetailerTitle}</div>
                    <div className="font-sans text-[11px] text-[#526671]">{t.ecoRetailerDesc}</div>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-[#8C6200] bg-[#FFF9E6] border border-[#F4C430]/40 px-2.5 py-1 rounded-md">
                  {t.ecoRetailerBadge}
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#E6DED7] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#014D4E]" />
                  <div>
                    <div className="font-heading text-xs font-bold text-[#014D4E]">{t.ecoBuyerTitle}</div>
                    <div className="font-sans text-[11px] text-[#526671]">{t.ecoBuyerDesc}</div>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-[#014D4E] bg-[#014D4E]/10 border border-[#014D4E]/20 px-2.5 py-1 rounded-md">
                  {t.ecoBuyerBadge}
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-6 bg-[#F8F3EE] rounded-2xl border border-[#E6DED7] p-6 shadow-sm">
            <div className="font-sans text-xs font-extrabold uppercase tracking-wider text-[#014D4E] mb-4">
              {t.ecoWebTitle}
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white border border-[#E6DED7] shadow-xs flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-heading font-extrabold text-[#014D4E] block">Mohan Organic Pulse Mill</span>
                  <span className="font-sans text-[11px] text-[#465760] font-semibold block">2.4 km away • Mandi Supplier</span>
                </div>
                <div className="text-center px-2">
                  <span className="font-sans text-[10px] text-[#014D4E] font-bold block">↕ Supplies</span>
                  <span className="font-sans text-[9px] text-[#2E8B57] font-bold">Direct rate</span>
                </div>
                <div className="text-xs text-right">
                  <span className="font-heading font-extrabold text-[#014D4E] block">Ramesh Kirana</span>
                  <span className="font-sans text-[11px] text-[#465760] font-semibold block">Main Bazar Road</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E6DED7] shadow-xs flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-heading font-extrabold text-[#014D4E] block">Ramesh Kirana</span>
                  <span className="font-sans text-[11px] text-[#465760] font-semibold block">Retail Merchant</span>
                </div>
                <div className="text-center px-2">
                  <span className="font-sans text-[10px] text-[#8C6200] font-bold block">↕ Sugar & Chai</span>
                  <span className="font-sans text-[9px] text-[#465760] font-semibold">₹15,000/mo steady</span>
                </div>
                <div className="text-xs text-right">
                  <span className="font-heading font-extrabold text-[#014D4E] block">Brijwasi Tea Stall</span>
                  <span className="font-sans text-[11px] text-[#465760] font-semibold block">150m away</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => onOpenAuth("register")}
                  className="font-sans text-xs font-bold text-[#014D4E] hover:text-[#8C6200] flex items-center justify-center gap-1 mx-auto cursor-pointer transition-colors"
                >
                  <span>{t.ecoConnectBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C6200]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: HIGH-IMPACT TEAL & WARM SAFFRON CTA BANNER */}
      <section className="py-16 bg-[#F8F3EE] border-t border-[#E6DED7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#013738] via-[#014D4E] to-[#012E2F] text-white text-center relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-14 shadow-2xl border border-[#014D4E]/30">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-[#F4C430]/15 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-[#2E8B57]/20 blur-2xl pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F4C430] font-sans text-xs font-bold border border-white/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F4C430]" /> {t.ctaBadge}
              </div>

              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.ctaHeading}
              </h2>
              <p className="font-sans text-sm sm:text-base text-teal-100/90 max-w-xl mx-auto leading-relaxed font-medium">
                {t.ctaSubtext}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onOpenAuth("register")}
                  className="w-full sm:w-auto px-8 py-4 bg-[#F4C430] hover:bg-[#E0AF1F] text-[#013738] font-sans text-base font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]"
                  id="cta-section-get-started"
                >
                  {t.ctaGetStarted}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
