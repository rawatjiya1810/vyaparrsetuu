import React, { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { Language } from "../types";
import { translations } from "../data/translations";
import { Globe, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAuth: (mode: "login" | "register") => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenAuth,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[language];

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिन्दी" },
    { code: "ta", label: "Tamil", native: "தமிழ்" },
    { code: "te", label: "Telugu", native: "తెలుగు" },
    { code: "mr", label: "Marathi", native: "मराठी" },
    { code: "bn", label: "Bengali", native: "বাংলা" },
  ];

  const navLinks = [
    { label: t.navHowItWorks, id: "how-it-works" },
    { label: t.navFeatures, id: "features" },
    { label: t.navAbout, id: "about" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#013738] via-[#014D4E] to-[#014243] text-white shadow-md border-b border-teal-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div
          className="cursor-pointer"
          onClick={() => onNavigateSection("hero")}
          id="navbar-brand"
        >
          <BrandLogo variant="white" size="md" />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 font-sans text-[15px] font-semibold text-white/90">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigateSection(link.id)}
              className="hover:text-[#F4C430] transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Language + Get Started */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 font-sans text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors cursor-pointer"
              id="btn-language-selector"
            >
              <Globe className="w-4 h-4 text-[#F4C430]" />
              <span>
                {languagesList.find((l) => l.code === language)?.native || "English"}
              </span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-[#013738] rounded-xl shadow-xl border border-white/15 py-1 z-50 font-sans animate-in fade-in slide-in-from-top-1 duration-150">
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-white/10 transition-colors ${
                      language === lang.code
                        ? "text-[#F4C430] font-bold bg-white/10"
                        : "text-white/90"
                    }`}
                  >
                    <span>{lang.native}</span>
                    <span className="text-xs text-teal-200/70">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Get Started CTA */}
          <button
            onClick={() => onOpenAuth("register")}
            className="flex items-center gap-1.5 px-5 py-2 font-sans text-sm font-extrabold text-[#013738] bg-[#F4C430] hover:bg-[#E0AF1F] active:scale-[0.98] rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
            id="btn-nav-get-started"
          >
            <span>{t.navGetStarted}</span>
            <ArrowRight className="w-4 h-4 text-[#013738]" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg"
            id="btn-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#013738] border-b border-white/10 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 text-white">
          <div className="flex flex-col space-y-2 text-base font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigateSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/10 text-white"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Language Selector Grid in Mobile */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs font-semibold text-teal-200 px-3 mb-2 uppercase tracking-wider">
              {language === "hi" ? "भाषा चुनें" : "Select Language"}
            </p>
            <div className="grid grid-cols-2 gap-1.5 px-2">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-1.5 text-xs rounded-md border ${
                    language === lang.code
                      ? "border-[#F4C430] bg-[#F4C430]/20 text-white font-bold"
                      : "border-white/10 bg-white/5 text-slate-200"
                  }`}
                >
                  {lang.native} ({lang.label})
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAuth("register");
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-[#013738] bg-[#F4C430] hover:bg-[#E0AF1F] rounded-lg shadow-md"
            >
              {t.navGetStarted}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
