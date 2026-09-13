import React, { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { Footer } from "./Footer";
import { FloatingAdvisor } from "./FloatingAdvisor";
import { Language, BusinessProfile, GrowthScore, MarketGap, ActionPlan } from "../types";
import { mockGrowthScore, mockMarketGaps, mockActionPlan } from "../data/mockData";
import { translations } from "../data/translations";
import {
  LayoutDashboard,
  Dna,
  MapPin,
  TrendingUp,
  Lightbulb,
  Compass,
  CalendarCheck2,
  Users2,
  Settings,
  HelpCircle,
  Search,
  Globe,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export type NavTab =
  | "overview"
  | "business-dna"
  | "market-scan"
  | "growth-score"
  | "opportunities"
  | "advisor"
  | "action-plan"
  | "community"
  | "settings"
  | "help";

interface AppShellProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  businessProfile: BusinessProfile;
  userName: string;
  onLogout: () => void;
  growthScore?: GrowthScore;
  marketGaps?: MarketGap[];
  actionPlan?: ActionPlan;
  children: React.ReactNode;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tab: NavTab;
  keywords: string[];
}

const globalSearchItems: SearchItem[] = [
  {
    id: "mudra",
    title: "PM Mudra Yojana Guide",
    category: "Government Scheme",
    description: "Collateral-free micro-business credit up to ₹50,000 for shop inventory & expansion.",
    tab: "advisor",
    keywords: ["mudra", "loan", "scheme", "shishu", "finance", "credit", "bank", "government"],
  },
  {
    id: "svanidhi",
    title: "PM SVANidhi Matching",
    category: "Government Scheme",
    description: "Working capital loan ₹10,000 to ₹50,000 with 7% interest subsidy on digital payments.",
    tab: "advisor",
    keywords: ["svanidhi", "loan", "scheme", "interest", "subsidy", "working capital", "vendor"],
  },
  {
    id: "udyam",
    title: "Udyam Aadhaar Desk",
    category: "Government Desk",
    description: "Zero-cost MSME certification providing priority bank lending & tax subsidies.",
    tab: "business-dna",
    keywords: ["udyam", "aadhaar", "msme", "registration", "certificate", "desk", "government"],
  },
  {
    id: "ondc",
    title: "ONDC Seller Network",
    category: "Digital Network",
    description: "Connect your store to open digital commerce & accept online customer orders.",
    tab: "opportunities",
    keywords: ["ondc", "seller", "network", "ecommerce", "online", "store", "digital"],
  },
  {
    id: "market-scan",
    title: "Market Analysis",
    category: "VyaparSetu Feature",
    description: "Explore local market opportunities, nearby competitors, & customer demand signals.",
    tab: "market-scan",
    keywords: ["market", "analysis", "scan", "competitors", "demand", "local", "pincode", "area"],
  },
  {
    id: "risk-check",
    title: "Risk Check",
    category: "VyaparSetu Feature",
    description: "Stress-test your business margins, seasonality, competition, & financial risks.",
    tab: "growth-score",
    keywords: ["risk", "check", "stress", "test", "viability", "margins", "vulnerability", "score"],
  },
  {
    id: "business-plan",
    title: "Business Plan",
    category: "VyaparSetu Feature",
    description: "Step-by-step 30-day customized growth tasks, milestones, & action guidance.",
    tab: "action-plan",
    keywords: ["business plan", "plan", "30-day", "action", "tasks", "roadmap", "milestones"],
  },
  {
    id: "business-dna",
    title: "Business Check",
    category: "VyaparSetu Feature",
    description: "Configure & verify your business profile, operating scale, & category details.",
    tab: "business-dna",
    keywords: ["business check", "business dna", "dna", "profile", "store", "inventory", "category"],
  },
  {
    id: "viability",
    title: "Business Viability",
    category: "VyaparSetu Feature",
    description: "Evaluate store viability rating, score breakdown, & key growth drivers.",
    tab: "growth-score",
    keywords: ["viability", "business viability", "growth score", "rating", "potential", "score"],
  },
  {
    id: "alternative-suggestions",
    title: "Alternative Business Suggestions",
    category: "VyaparSetu Feature",
    description: "Discover unmet local market gaps and alternative high-margin product lines.",
    tab: "opportunities",
    keywords: ["alternative", "suggestions", "opportunity", "gap", "detector", "demand", "revenue"],
  },
  {
    id: "advisor",
    title: "VyaparSetu Advisor",
    category: "VyaparSetu Feature",
    description: "Ask questions about suppliers, customer acquisition, & local growth strategies.",
    tab: "advisor",
    keywords: ["advisor", "chat", "ai", "questions", "guidance", "advice", "help"],
  },
  {
    id: "community",
    title: "Community Connect",
    category: "VyaparSetu Feature",
    description: "Connect with nearby non-competing merchants for bulk purchasing & cross-offers.",
    tab: "community",
    keywords: ["community", "connect", "merchants", "partners", "bulk", "local"],
  },
  {
    id: "help",
    title: "How VyaparSetu Works & Help",
    category: "Support & Help",
    description: "Platform user guides, FAQs, toll-free helpline, & advisory support.",
    tab: "help",
    keywords: ["how vyaparsetu works", "how it works", "help", "support", "faq", "helpline", "guide"],
  },
];

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
  businessProfile,
  userName,
  onLogout,
  growthScore,
  marketGaps,
  actionPlan,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const t = translations[language];

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchResultsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const filteredSearchItems = trimmedQuery.length === 0
    ? []
    : globalSearchItems.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(trimmedQuery);
        const categoryMatch = item.category.toLowerCase().includes(trimmedQuery);
        const descMatch = item.description.toLowerCase().includes(trimmedQuery);
        const keywordMatch = item.keywords.some((kw) => kw.toLowerCase().includes(trimmedQuery));
        return titleMatch || categoryMatch || descMatch || keywordMatch;
      });

  const handleSelectSearchResult = (item: SearchItem) => {
    onSelectTab(item.tab);
    setSearchQuery("");
    setSearchResultsOpen(false);
    setFocusedIndex(-1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResultsOpen(false);
    setFocusedIndex(-1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchResultsOpen || filteredSearchItems.length === 0) {
      if (e.key === "Enter" && trimmedQuery.length > 0) {
        setSearchResultsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < filteredSearchItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredSearchItems.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const targetIndex = focusedIndex >= 0 && focusedIndex < filteredSearchItems.length ? focusedIndex : 0;
      handleSelectSearchResult(filteredSearchItems[targetIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setSearchResultsOpen(false);
      setFocusedIndex(-1);
    }
  };

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: "en", label: "English", native: "English" },
    { code: "hi", label: "Hindi", native: "हिन्दी" },
    { code: "ta", label: "Tamil", native: "தமிழ்" },
    { code: "te", label: "Telugu", native: "తెలుగు" },
    { code: "mr", label: "Marathi", native: "मराठी" },
    { code: "bn", label: "Bengali", native: "বাংলা" },
  ];

  const myBusinessNavItems: { id: NavTab; label: string; icon: any }[] = [
    { id: "business-dna", label: t.sidebarBusinessDNA, icon: Dna },
    { id: "market-scan", label: t.sidebarMarketScan, icon: MapPin },
    { id: "growth-score", label: t.sidebarGrowthScore, icon: TrendingUp },
    { id: "opportunities", label: t.sidebarOpportunities, icon: Lightbulb },
    { id: "advisor", label: t.sidebarAdvisor, icon: Compass },
    { id: "action-plan", label: t.sidebarActionPlan, icon: CalendarCheck2 },
  ];

  const notifications = [
    { id: 1, title: "Home Delivery Gap", desc: "320 families nearby seeking grocery delivery", time: "2h ago", unread: true },
    { id: 2, title: "PM SVANidhi Match", desc: "Your profile matches 7% interest subsidy loan", time: "5h ago", unread: true },
    { id: 3, title: "Mohan Farm Connected", desc: "Direct pulse supplier verified 2.4 km away", time: "1d ago", unread: false },
  ];

  return (
    <div className="h-screen w-full bg-[#FFFDFC] text-[#172B35] flex flex-col md:flex-row overflow-hidden">
      {/* DESKTOP SIDEBAR (Permanently Fixed Viewport Height: 100vh) */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-[#013738] via-[#014D4E] to-[#012E2F] text-white shrink-0 border-r border-teal-900/40 h-screen max-h-screen overflow-y-auto scrollbar-none no-scrollbar">
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <BrandLogo variant="white" size="md" />
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 px-3 py-4 space-y-6">
          {/* Overview */}
          <div>
            <button
              onClick={() => onSelectTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                currentTab === "overview"
                  ? "bg-white text-[#014D4E] font-bold shadow-sm"
                  : "text-slate-200 hover:bg-white/10"
              }`}
              id="sidebar-tab-overview"
            >
              <LayoutDashboard className={`w-4 h-4 ${currentTab === "overview" ? "text-[#F4C430]" : "text-slate-300"}`} />
              <span>{t.sidebarOverview}</span>
            </button>
          </div>

          {/* MY BUSINESS */}
          <div className="space-y-1">
            <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-teal-200/80 mb-1">
              {t.sidebarMyBusiness}
            </div>
            {myBusinessNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-[#014D4E] font-bold shadow-sm"
                      : "text-slate-200 hover:bg-white/10 font-medium"
                  }`}
                  id={`sidebar-tab-${item.id}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#F4C430]" : "text-slate-300"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* CONNECT */}
          <div className="space-y-1">
            <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-teal-200/80 mb-1">
              {t.sidebarConnect}
            </div>
            <button
              onClick={() => onSelectTab("community")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                currentTab === "community"
                  ? "bg-white text-[#014D4E] font-bold shadow-sm"
                  : "text-slate-200 hover:bg-white/10 font-medium"
              }`}
              id="sidebar-tab-community"
            >
              <Users2 className={`w-4 h-4 ${currentTab === "community" ? "text-[#F4C430]" : "text-slate-300"}`} />
              <span>{t.sidebarCommunity}</span>
            </button>
          </div>

          {/* OTHERS */}
          <div className="space-y-1">
            <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-teal-200/80 mb-1">
              OTHER
            </div>
            <button
              onClick={() => onSelectTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                currentTab === "settings"
                  ? "bg-white text-[#014D4E] font-bold shadow-sm"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <Settings className="w-4 h-4 text-slate-300" />
              <span>{t.sidebarSettings}</span>
            </button>
            <button
              onClick={() => onSelectTab("help")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                currentTab === "help"
                  ? "bg-white text-[#014D4E] font-bold shadow-sm"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <HelpCircle className="w-4 h-4 text-slate-300" />
              <span>{t.sidebarHelp}</span>
            </button>
          </div>
        </div>

        {/* Support Box at Bottom */}
        <div className="p-3 mx-3 mb-4 rounded-xl bg-white/10 border border-white/10 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Need Advisory?</span>
            <HelpCircle className="w-3.5 h-3.5 text-[#F4C430]" />
          </div>
          <p className="text-[11px] text-teal-100 leading-snug">
            Toll-Free Helpline: 1800-208-7388
          </p>
          <button
            onClick={() => onSelectTab("help")}
            className="w-full py-1.5 bg-[#F4C430] hover:bg-[#E0AF1F] text-[#013738] rounded-lg text-xs font-extrabold transition-colors cursor-pointer"
          >
            Contact Advisor
          </button>
        </div>
      </aside>

      {/* MAIN RIGHT CONTAINER */}
      <div className="flex-1 min-w-0 min-h-0 h-screen max-h-screen overflow-hidden flex flex-col">
        {/* MAIN SCROLL CONTAINER */}
        <main className="h-full min-h-0 flex-1 overflow-y-auto overflow-x-hidden scrollbar-none no-scrollbar bg-[#FAF7F2] relative">
          {/* Top Header (Sticky at top of right container) */}
          <header className="sticky top-0 z-30 shrink-0 bg-[#FFFDFC] border-b border-[#E6DED7] h-16 flex items-center justify-between px-4 sm:px-6 shadow-xs">
            {/* Left: Mobile Toggle / Search */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#172B35] hover:bg-[#F8F3EE] rounded-lg"
                id="btn-mobile-sidebar-toggle"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Search Box */}
              <div className="relative w-full hidden sm:block" ref={searchRef}>
                <Search className="w-4 h-4 text-[#60727A] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchResultsOpen(true);
                    setFocusedIndex(-1);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim().length > 0) {
                      setSearchResultsOpen(true);
                    }
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search anything (e.g. suppliers, delivery, schemes)..."
                  className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-[#F8F3EE] border border-[#E6DED7] rounded-lg focus:outline-none focus:border-[#014D4E] focus:bg-white text-[#172B35]"
                />
                {searchQuery.length > 0 && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-2.5 text-[#60727A] hover:text-[#172B35] cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Search Results Dropdown Panel */}
                {searchResultsOpen && searchQuery.trim().length > 0 && (
                  <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-[#E6DED7] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {filteredSearchItems.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto divide-y divide-[#E6DED7]/60">
                        {filteredSearchItems.map((item, idx) => {
                          const isFocused = idx === focusedIndex;
                          return (
                            <div
                              key={item.id}
                              onClick={() => handleSelectSearchResult(item)}
                              onMouseEnter={() => setFocusedIndex(idx)}
                              className={`p-3 cursor-pointer transition-colors ${
                                isFocused ? "bg-[#014D4E]/10" : "hover:bg-[#F8F3EE]"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-heading text-xs font-bold text-[#014D4E]">
                                  {item.title}
                                </span>
                                <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F8F3EE] border border-[#E6DED7] text-[#526671]">
                                  {item.category}
                                </span>
                              </div>
                              <p className="font-sans text-[11px] text-[#2D3E46] mt-1 leading-snug line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <div className="font-heading text-xs font-bold text-[#172B35]">
                          No results found
                        </div>
                        <div className="font-sans text-[11px] text-[#526671] mt-0.5">
                          Try searching for a feature, scheme, or business topic.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Language + Notification + Profile */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium bg-[#F8F3EE] hover:bg-[#E6DED7]/50 rounded-lg border border-[#E6DED7] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#014D4E]" />
                  <span>{languagesList.find((l) => l.code === language)?.native}</span>
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-[#E6DED7] py-1 z-50">
                    {languagesList.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F8F3EE] ${
                          language === lang.code ? "text-[#014D4E] font-bold" : "text-[#172B35]"
                        }`}
                      >
                        <span>{lang.native}</span>
                        <span className="text-[10px] text-[#60727A]">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-[#172B35] hover:bg-[#F8F3EE] rounded-lg relative transition-colors"
                  id="btn-notifications"
                >
                  <Bell className="w-4 h-4 text-[#014D4E]" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F4C430]"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-[#E6DED7] p-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E6DED7]">
                      <span className="text-xs font-bold text-[#172B35]">Notifications</span>
                      <span className="text-[10px] text-[#014D4E] font-semibold cursor-pointer">Mark all read</span>
                    </div>
                    <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            n.unread
                              ? "bg-[#014D4E]/5 border-[#014D4E]/20"
                              : "bg-[#F8F3EE] border-[#E6DED7]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#172B35]">{n.title}</span>
                            <span className="text-[10px] text-[#60727A]">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-[#60727A] mt-0.5">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Chip */}
              <div className="flex items-center gap-2 pl-2 border-l border-[#E6DED7]">
                <div className="w-8 h-8 rounded-full bg-[#014D4E]/15 flex items-center justify-center text-[#014D4E] font-bold text-xs">
                  {userName.charAt(0)}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-[#172B35] leading-tight">
                    {userName}
                  </div>
                  <div className="text-[10px] text-[#60727A]">
                    Village: {businessProfile.location.split(",")[1]?.trim() || "Rampur"}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1 text-[#60727A] hover:text-[#C94A45] transition-colors cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Mobile Slideout Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#013738] text-white px-4 py-5 space-y-4 border-b border-teal-900 animate-in slide-in-from-top duration-200 z-40">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <BrandLogo variant="white" size="sm" />
              </div>
              <div className="text-xs font-bold uppercase text-teal-200">
                {businessProfile.businessName}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onSelectTab("overview");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                    currentTab === "overview" ? "bg-white text-[#014D4E] font-bold" : "text-slate-200"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-[#F4C430]" />
                  <span>{t.sidebarOverview}</span>
                </button>
                {myBusinessNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      currentTab === item.id ? "bg-white text-[#014D4E] font-bold" : "text-slate-200"
                    }`}
                  >
                    <item.icon className="w-4 h-4 text-[#F4C430]" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    onSelectTab("community");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                    currentTab === "community" ? "bg-white text-[#014D4E] font-bold" : "text-slate-200"
                  }`}
                >
                  <Users2 className="w-4 h-4 text-[#F4C430]" />
                  <span>{t.sidebarCommunity}</span>
                </button>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={onLogout}
                  className="text-xs font-semibold text-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log Out
                </button>
                <span className="text-[11px] text-teal-200/80">VyaparSetu v1.0</span>
              </div>
            </div>
          )}

          {/* Soft ambient background tints for subtle warmth */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#014D4E]/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#F4C430]/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Dashboard Main Content */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 relative z-10">
            {children}
          </div>

          {/* National Entrepreneur Advisory Helpline & Footer Links */}
          <Footer
            language={language}
            isAuthenticated={true}
            onNavigateTab={(tab) => onSelectTab(tab as NavTab)}
          />
        </main>
      </div>

      {/* Floating VyaparSetu Advisor Assistant Button & Panel (Hidden on Advisor tab) */}
      {currentTab !== "advisor" && (
        <FloatingAdvisor
          businessProfile={businessProfile}
          growthScore={growthScore || mockGrowthScore}
          marketGaps={marketGaps || mockMarketGaps}
          actionPlan={actionPlan || mockActionPlan}
          userName={userName}
          language={language}
        />
      )}
    </div>
  );
};
