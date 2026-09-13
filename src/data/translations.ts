import { Language } from "../types";

export interface TranslationStrings {
  appName: string;
  tagline: string;
  navHome: string;
  navHowItWorks: string;
  navFeatures: string;
  navSuccess: string;
  navAbout: string;
  navLogin: string;
  navGetStarted: string;

  // Hero Section & Ticker
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroHeadingLine3: string;
  heroSubtext: string;
  ctaGetStarted: string;
  ctaSeeHow: string;
  badgePlatform: string;
  corePromiseTitle: string;
  corePromiseDesc: string;
  trustPillFree: string;
  trustPillVoice: string;
  trustPillMatched: string;
  tickerTitle: string;
  tickerHowItWorks: string;
  tickerSvanidhi: string;
  tickerMudra: string;
  tickerUdyam: string;
  tickerOndc: string;

  // Live Explorer Widget
  explorerBadge: string;
  explorerHeading: string;
  explorerSubtext: string;
  catKirana: string;
  catDairy: string;
  catGarments: string;
  catHardware: string;
  simulatedIntel: string;
  estUpside: string;
  topGapDetected: string;
  localEcosystemOpp: string;
  schemeMatch: string;
  scanTimeNote: string;
  btnScanLocation: string;

  // Trust Strip & Steps
  trustSimple: string;
  trustSimpleSub: string;
  trustLocal: string;
  trustLocalSub: string;
  trustTrusted: string;
  trustTrustedSub: string;
  trustSecure: string;
  trustSecureSub: string;
  stepBadge: string;
  stepHeading: string;
  stepSubtext: string;
  step1Title: string;
  step1Desc: string;
  step1Foot: string;
  step2Title: string;
  step2Desc: string;
  step2Foot: string;
  step3Title: string;
  step3Desc: string;
  step3Foot: string;
  btnStartAssessment: string;

  // 6 Core Capabilities Section (Capabilities built for Indian enterprises)
  capabilitiesHeading: string;
  capabilitiesSubtext: string;
  cap1Title: string;
  cap1Desc: string;
  cap2Title: string;
  cap2Desc: string;
  cap3Title: string;
  cap3Desc: string;
  cap4Title: string;
  cap4Desc: string;
  cap5Title: string;
  cap5Desc: string;
  cap6Title: string;
  cap6Desc: string;

  // Local Ecosystem Section
  ecoBadge: string;
  ecoHeading: string;
  ecoDesc: string;
  ecoSupplierTitle: string;
  ecoSupplierDesc: string;
  ecoSupplierBadge: string;
  ecoRetailerTitle: string;
  ecoRetailerDesc: string;
  ecoRetailerBadge: string;
  ecoBuyerTitle: string;
  ecoBuyerDesc: string;
  ecoBuyerBadge: string;
  ecoWebTitle: string;
  ecoConnectBtn: string;

  // CTA Banner
  ctaBadge: string;
  ctaHeading: string;
  ctaSubtext: string;

  // Sidebar & Dashboard
  sidebarOverview: string;
  sidebarMyBusiness: string;
  sidebarBusinessDNA: string;
  sidebarMarketScan: string;
  sidebarGrowthScore: string;
  sidebarOpportunities: string;
  sidebarAdvisor: string;
  sidebarActionPlan: string;
  sidebarConnect: string;
  sidebarCommunity: string;
  sidebarSettings: string;
  sidebarHelp: string;
  sidebarLogout: string;
  dashboardHelplineTitle: string;
  dashboardHelplineSub: string;

  // Dashboard Labels & Controls
  greetingMorning: string;
  profileStatusComplete: string;
  growthScoreLabel: string;
  topOpportunityLabel: string;
  recommendedActionLabel: string;
  activeTasksLabel: string;
  journeyTitle: string;
  marketSnapshotTitle: string;
  askAdvisorPlaceholder: string;
  speakInstead: string;
  btnStartTask: string;
  btnComplete: string;
  btnViewScheme: string;
  btnCheckEligibility: string;
  btnSendProposal: string;
  btnConnected: string;
  btnConnect: string;
  searchPlaceholder: string;
  filterAll: string;
  filterSuppliers: string;
  filterCustomers: string;
  filterComplementary: string;
  filterDistance: string;
  advisorThinking: string;
  popularQuestions: string;
  footerRights: string;
  footerGovLinks: string;

  // Footer & Additional Dashboard Controls
  footerHelplineLabel: string;
  footerTollFree: string;
  footerHelplineHours: string;
  footerCtaAdvisor: string;
  footerCtaAssessment: string;
  footerBrandDesc: string;
  footerTrust1: string;
  footerTrust2: string;
  footerTrust3: string;
  footerCapabilitiesHeader: string;
  footerSchemesHeader: string;
  footerContactHeader: string;
  footerWhatsappLabel: string;
  footerEmailLabel: string;
  footerHubLabel: string;
  footerHoursLabel: string;
  footerPrivacy: string;
  footerTerms: string;
  footerSecurity: string;
  footerVoice: string;
  footerMadeWith: string;
  viewTasks: string;
  exploreOpportunity: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appName: "VyaparSetu",
    tagline: "AI Business Advisory for Local & Rural Entrepreneurs",
    navHome: "Home",
    navHowItWorks: "How It Works",
    navFeatures: "Capabilities",
    navSuccess: "Ecosystem",
    navAbout: "About Us",
    navLogin: "Login",
    navGetStarted: "Get Started",

    // Hero Section & Ticker
    heroHeadingLine1: "Smart Guidance.",
    heroHeadingLine2: "Better Decisions.",
    heroHeadingLine3: "Stronger Businesses.",
    heroSubtext: "An AI-powered advisory platform that helps local entrepreneurs understand their market, discover opportunities and take the right next step.",
    ctaGetStarted: "Get Started for Free",
    ctaSeeHow: "See How It Works",
    badgePlatform: "India's AI Digital Advisory Platform for Local Businesses",
    corePromiseTitle: "Our Core Promise:",
    corePromiseDesc: "“Tell us about your business, and we’ll tell you what opportunity exists around you, why it exists, and what you should do next.”",
    trustPillFree: "100% Free for Micro-Enterprises",
    trustPillVoice: "Voice Input in 6 Indian Languages",
    trustPillMatched: "PM SVANidhi & Mudra Matched",
    tickerTitle: "Schemes & Support",
    tickerHowItWorks: "How VyaparSetu Works",
    tickerSvanidhi: "PM SVANidhi Matching",
    tickerMudra: "PM Mudra Yojana Guide",
    tickerUdyam: "Udyam Aadhaar Desk",
    tickerOndc: "ONDC Seller Network",

    // Live Explorer Widget
    explorerBadge: "Live Opportunity Explorer",
    explorerHeading: "See what VyaparSetu discovers for your business type",
    explorerSubtext: "Select a sample local business to see real hyperlocal insights generated right now:",
    catKirana: "Kirana & Provision",
    catDairy: "Milk Dairy & Sweets",
    catGarments: "Clothing & Tailor",
    catHardware: "Hardware & Electric",
    simulatedIntel: "Simulated Intelligence",
    estUpside: "Estimated Upside",
    topGapDetected: "Top Local Gap Detected",
    localEcosystemOpp: "Local Ecosystem Opportunity",
    schemeMatch: "Government Scheme Match",
    scanTimeNote: "Scan takes under 2 minutes with voice input in Hindi, Tamil, Telugu, Marathi, and Bengali.",
    btnScanLocation: "Scan My Business Location",

    // Trust Strip & Steps
    trustSimple: "Simple",
    trustSimpleSub: "Easy to use for anyone",
    trustLocal: "Local",
    trustLocalSub: "Hyperlocal market signals",
    trustTrusted: "Trusted",
    trustTrustedSub: "Built for Indian entrepreneurs",
    trustSecure: "Secure",
    trustSecureSub: "Your business data is safe",
    stepBadge: "Simple 3-Step Process",
    stepHeading: "Get your business guidance in 3 simple steps",
    stepSubtext: "No complex accounting spreadsheets. No heavy dashboards. Just actionable steps.",
    step1Title: "Tell us about your business",
    step1Desc: "Share basic details about your shop, products and location in simple steps.",
    step1Foot: "Text or Regional Voice Input",
    step2Title: "Understand your local market",
    step2Desc: "We analyze your area, competition, nearby customers and untapped opportunities.",
    step2Foot: "Hyperlocal 1km - 10km radius scan",
    step3Title: "Get your action plan",
    step3Desc: "Receive smart recommendations and a step-by-step 30-day growth plan.",
    step3Foot: "Weekly tasks + government scheme matching",
    btnStartAssessment: "Start My Business Assessment",

    // Capabilities Section
    capabilitiesHeading: "Six core capabilities built for Indian enterprises",
    capabilitiesSubtext: "Everything works together to turn local signals into clear daily decisions.",
    cap1Title: "Local Market Insights",
    cap1Desc: "Scan your village or town up to 10 km to see competitor density, customer footfall zones, and local price benchmarks.",
    cap2Title: "Business Growth Score",
    cap2Desc: "A simple 0–100 evaluation of your local market position, customer reach, digital presence, and financial readiness.",
    cap3Title: "Opportunities & Gaps",
    cap3Desc: "Discover underserved customer segments, service gaps (like home delivery), and pre-matched central & state government schemes.",
    cap4Title: "VyaparSetu Advisor",
    cap4Desc: "Prioritized, explainable recommendations tailored to your shop. Ask any question in Hindi or regional languages via voice or text.",
    cap5Title: "Personalized 30-Day Plan",
    cap5Desc: "Converts intelligence into daily 15-minute execution tasks broken down across 4 weeks with progress tracking and guidance.",
    cap6Title: "Community Connect",
    cap6Desc: "Connect directly with nearby producers, millers, and complementary merchants within a 5 km radius to bypass middlemen.",

    // Ecosystem Section
    ecoBadge: "Direct Local Network",
    ecoHeading: "Your next opportunity is already in your village or town",
    ecoDesc: "Most local small businesses lose 10–20% of their profits to distant middlemen because they don't know the producer or supplier 3 km away. VyaparSetu reveals direct connections:",
    ecoSupplierTitle: "Suppliers & Millers",
    ecoSupplierDesc: "Procure grains, spices & packaging directly",
    ecoSupplierBadge: "Save 8–15%",
    ecoRetailerTitle: "Complementary Retailers",
    ecoRetailerDesc: "Partner with tea stalls, dairies & local tailor shops",
    ecoRetailerBadge: "Cross-Promote",
    ecoBuyerTitle: "Bulk Buyers & Institutional Canteens",
    ecoBuyerDesc: "Hostels, schools & housing group orders",
    ecoBuyerBadge: "Bulk Orders",
    ecoWebTitle: "Local Ecosystem Connection Web",
    ecoConnectBtn: "Connect with businesses around your pincode",

    // CTA Banner
    ctaBadge: "Start Your 30-Day Growth Journey",
    ctaHeading: "Ready to understand what opportunity exists around your shop?",
    ctaSubtext: "Tell us about your business today. Get your hyperlocal opportunity scan and step-by-step action plan in under 2 minutes.",

    // Sidebar & Dashboard
    sidebarOverview: "Overview",
    sidebarMyBusiness: "MY BUSINESS",
    sidebarBusinessDNA: "Business DNA",
    sidebarMarketScan: "Market Scan",
    sidebarGrowthScore: "Growth Score",
    sidebarOpportunities: "Opportunities",
    sidebarAdvisor: "VyaparSetu Advisor",
    sidebarActionPlan: "30-Day Plan",
    sidebarConnect: "CONNECT",
    sidebarCommunity: "Community Connect",
    sidebarSettings: "Settings",
    sidebarHelp: "Help & Support",
    sidebarLogout: "Logout",
    dashboardHelplineTitle: "NATIONAL ENTREPRENEUR ADVISORY HELPLINE",
    dashboardHelplineSub: "Toll-Free Helpline: 1800-180-1551 (Mon - Sat, 9 AM - 6 PM) • Support in 6 Languages",

    // Dashboard Labels & Controls
    greetingMorning: "Namaste",
    profileStatusComplete: "Business Profile: Complete",
    growthScoreLabel: "Growth Score",
    topOpportunityLabel: "Top Opportunity",
    recommendedActionLabel: "Recommended Action",
    activeTasksLabel: "Active Tasks",
    journeyTitle: "Your Business Journey",
    marketSnapshotTitle: "Local Market Snapshot",
    askAdvisorPlaceholder: "Ask your business advisor anything...",
    speakInstead: "Speak instead",
    btnStartTask: "Start Task",
    btnComplete: "Completed",
    btnViewScheme: "View Scheme",
    btnCheckEligibility: "Check Eligibility",
    btnSendProposal: "Send Proposal",
    btnConnected: "Connected ✓",
    btnConnect: "Connect",
    searchPlaceholder: "Search businesses, products or location...",
    filterAll: "All Types",
    filterSuppliers: "Suppliers",
    filterCustomers: "Customers",
    filterComplementary: "Complementary",
    filterDistance: "Distance",
    advisorThinking: "VyaparSetu Advisor is thinking...",
    popularQuestions: "Popular Questions:",
    footerRights: "VyaparSetu. All rights reserved. Government of India Advisory Integration Partner.",
    footerGovLinks: "Official Portals: msme.gov.in | pmsvanidhi.mohua.gov.in | mudra.org.in | udyamregistration.gov.in",
    footerHelplineLabel: "National Entrepreneur Advisory Helpline",
    footerTollFree: "Toll Free",
    footerHelplineHours: "Available in 6 Indian Languages • Monday to Saturday, 8:00 AM – 8:00 PM IST",
    footerCtaAdvisor: "Talk to VyaparSetu Advisor",
    footerCtaAssessment: "Start Free Assessment",
    footerBrandDesc: "VyaparSetu is India's dedicated AI-powered digital advisory platform built specifically for local, semi-urban, and rural entrepreneurs. We bridge the market gap between local merchants, suppliers, and actionable growth opportunities.",
    footerTrust1: "Government Credibility × Modern Usability × Rural Accessibility",
    footerTrust2: "100% Free & Open Advisory for Micro-Businesses & Artisans",
    footerTrust3: "Active intelligence across 500+ Indian Districts",
    footerCapabilitiesHeader: "Core Capabilities",
    footerSchemesHeader: "Schemes & Support",
    footerContactHeader: "Contact & Support",
    footerWhatsappLabel: "WhatsApp Advisory",
    footerEmailLabel: "Official Email",
    footerHubLabel: "Advisory Head Hub",
    footerHoursLabel: "Working Hours",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Advisory",
    footerSecurity: "256-bit MSME Data Security",
    footerVoice: "Voice Accessibility",
    footerMadeWith: "Made with ❤️ for Bharat's Vyapari",
    viewTasks: "View Tasks",
    exploreOpportunity: "Explore Opportunity →",
  },
  hi: {
    appName: "व्यापारसेतु",
    tagline: "ग्रामीण और स्थानीय उद्यमियों के लिए सरल AI व्यापार सलाहकार",
    navHome: "होम",
    navHowItWorks: "यह कैसे काम करता है",
    navFeatures: "क्षमताएं",
    navSuccess: "नेटवर्क",
    navAbout: "हमारे बारे में",
    navLogin: "लॉग इन",
    navGetStarted: "शुरू करें",

    // Hero Section & Ticker
    heroHeadingLine1: "सटीक सलाह।",
    heroHeadingLine2: "बेहतर निर्णय।",
    heroHeadingLine3: "मजबूत व्यापार।",
    heroSubtext: "स्थानीय और ग्रामीण उद्यमियों के लिए सरल AI सलाहकार जो आपके नजदीकी बाज़ार, नए अवसरों और अगले सही कदम की पहचान कराता है।",
    ctaGetStarted: "मुफ़्त में शुरू करें",
    ctaSeeHow: "देखें यह कैसे काम करता है",
    badgePlatform: "स्थानीय व्यवसायों के लिए भारत का AI डिजिटल सलाहकार मंच",
    corePromiseTitle: "हमारा मुख्य वादा:",
    corePromiseDesc: "“हमें अपने व्यवसाय के बारे में बताएं, और हम बताएंगे कि आपके आसपास क्या अवसर हैं, वे क्यों हैं, और आगे क्या करना चाहिए।”",
    trustPillFree: "सूक्ष्म उद्यमों के लिए 100% मुफ़्त",
    trustPillVoice: "6 भारतीय भाषाओं में बोलकर पूछें",
    trustPillMatched: "PM स्वनिधि और मुद्रा योजना से जुड़ा",
    tickerTitle: "सरकारी योजनाएं और सहायता",
    tickerHowItWorks: "व्यापारसेतु कैसे काम करता है",
    tickerSvanidhi: "PM स्वनिधि मैचिंग",
    tickerMudra: "PM मुद्रा योजना गाइड",
    tickerUdyam: "उद्यम आधार सहायता केंद्र",
    tickerOndc: "ONDC सेलर नेटवर्क",

    // Live Explorer Widget
    explorerBadge: "लाइव अवसर एक्सप्लोरर",
    explorerHeading: "देखें कि व्यापारसेतु आपके व्यवसाय प्रकार के लिए क्या खोजता है",
    explorerSubtext: "वास्तविक हाइपरलोकल अंतर्दृष्टि देखने के लिए एक व्यवसाय चुनें:",
    catKirana: "किराना और जनरल स्टोर",
    catDairy: "दूध डेयरी और मिठाई",
    catGarments: "कपड़े और सिलाई",
    catHardware: "हार्डवेयर और बिजली",
    simulatedIntel: "डिजिटल विश्लेषण",
    estUpside: "अनुमानित अतिरिक्त लाभ",
    topGapDetected: "मुख्य स्थानीय अवसर",
    localEcosystemOpp: "स्थानीय आपूर्ति अवसर",
    schemeMatch: "सरकारी योजना मैच",
    scanTimeNote: "हिंदी, तमिल, तेलुगु, मराठी और बंगाली में आवाज द्वारा 2 मिनट से कम में स्कैन पूरा होता है।",
    btnScanLocation: "मेरी दुकान का स्थान स्कैन करें",

    // Trust Strip & Steps
    trustSimple: "सरल",
    trustSimpleSub: "किसी के लिए भी उपयोग में आसान",
    trustLocal: "स्थानीय",
    trustLocalSub: "आपके क्षेत्र की जानकारी",
    trustTrusted: "विश्वसनीय",
    trustTrustedSub: "भारत के व्यापारियों के लिए",
    trustSecure: "सुरक्षित",
    trustSecureSub: "आपकी जानकारी सुरक्षित है",
    stepBadge: "सरल 3-चरणीय प्रक्रिया",
    stepHeading: "3 आसान चरणों में पाएं अपने व्यापार का मार्गदर्शन",
    stepSubtext: "कोई कठिन बहीखाता नहीं। कोई भारी डैशबोर्ड नहीं। केवल स्पष्ट कदम।",
    step1Title: "अपने व्यापार के बारे में बताएं",
    step1Desc: "अपनी दुकान, सामान और स्थान के बारे में बुनियादी जानकारी साझा करें।",
    step1Foot: "टेक्स्ट या अपनी भाषा में बोलकर जानकारी दें",
    step2Title: "अपने स्थानीय बाज़ार को समझें",
    step2Desc: "हम आपके आसपास की प्रतियोगिता, ग्राहकों और नए अवसरों का विश्लेषण करते हैं।",
    step2Foot: "1 किमी - 10 किमी दायरे का हाइपरलोकल स्कैन",
    step3Title: "अपनी कार्य योजना प्राप्त करें",
    step3Desc: "स्मार्ट सलाह और 30-दिवसीय स्पष्ट कार्य योजना प्राप्त करें।",
    step3Foot: "साप्ताहिक कार्य + सरकारी योजना मैचिंग",
    btnStartAssessment: "व्यापार मूल्यांकन शुरू करें",

    // Capabilities Section
    capabilitiesHeading: "भारतीय उद्यमों के लिए निर्मित 6 मुख्य क्षमताएं",
    capabilitiesSubtext: "सभी सुविधाएं मिलकर स्थानीय संकेतों को स्पष्ट दैनिक निर्णयों में बदलती हैं।",
    cap1Title: "स्थानीय बाज़ार विश्लेषण",
    cap1Desc: "प्रतियोगिता, ग्राहक फुटफॉल और स्थानीय दरों को देखने के लिए 10 किमी तक अपने गांव या कस्बे को स्कैन करें।",
    cap2Title: "बिजनेस ग्रोथ स्कोर",
    cap2Desc: "आपकी बाज़ार स्थिति, ग्राहक पहुँच, डिजिटल उपस्थिति और वित्तीय तैयारी का सरल 0–100 मूल्यांकन।",
    cap3Title: "अवसर और मांग अंतराल",
    cap3Desc: "अनछुए ग्राहक वर्गों, सेवा कमियों (जैसे होम डिलीवरी), और प्री-मैच्ड केंद्र व राज्य योजनाओं की खोज करें।",
    cap4Title: "व्यापारसेतु सलाहकार",
    cap4Desc: "आपकी दुकान के लिए प्राथमिकता वाले सुझाव। हिंदी या क्षेत्रीय भाषाओं में आवाज या टेक्स्ट से कुछ भी पूछें।",
    cap5Title: "व्यक्तिगत 30-दिवसीय योजना",
    cap5Desc: "4 सप्ताह में विभाजित 15-मिनट के दैनिक निष्पादन कार्यों में जानकारी को बदलता है।",
    cap6Title: "कम्युनिटी कनेक्ट",
    cap6Desc: "बिचौलियों को हटाने के लिए 5 किमी के दायरे में स्थानीय उत्पादकों, मिलरों और व्यापारियों से सीधे जुड़ें।",

    // Local Ecosystem Section
    ecoBadge: "प्रत्यक्ष स्थानीय नेटवर्क",
    ecoHeading: "आपका अगला अवसर पहले से ही आपके गांव या कस्बे में मौजूद है",
    ecoDesc: "अधिकतर छोटे व्यापारी 3 किमी दूर उत्पादक को न जानने के कारण 10–20% मुनाफा बिचौलियों को गंवा देते हैं। व्यापारसेतु सीधे संबंधों को दिखाता है:",
    ecoSupplierTitle: "सप्लायर और मिलर",
    ecoSupplierDesc: "अनाज, मसाले और पैकेजिग सीधे खरीदें",
    ecoSupplierBadge: "8–15% बचत करें",
    ecoRetailerTitle: "सहयोगी खुदरा विक्रेता",
    ecoRetailerDesc: "चाय स्टॉल, डेयरी और टेलर की दुकानों के साथ साझेदारी करें",
    ecoRetailerBadge: "आपसी बिक्री बढ़ाएं",
    ecoBuyerTitle: "थोक खरीदार व हॉस्टल",
    ecoBuyerDesc: "हॉस्टल, स्कूल और आवासीय समूह ऑर्डर",
    ecoBuyerBadge: "थोक ऑर्डर",
    ecoWebTitle: "स्थानीय व्यापार कनेक्शन नेटवर्क",
    ecoConnectBtn: "अपने पिनकोड के आसपास के व्यापारियों से जुड़ें",

    // CTA Banner
    ctaBadge: "अपनी 30-दिवसीय विकास यात्रा शुरू करें",
    ctaHeading: "क्या आप जानना चाहते हैं कि आपकी दुकान के आसपास क्या अवसर हैं?",
    ctaSubtext: "आज ही अपने व्यापार के बारे में बताएं। 2 मिनट से कम समय में अपनी स्थानीय रिपोर्ट और चरणबद्ध कार्य योजना प्राप्त करें।",

    // Sidebar & Dashboard
    sidebarOverview: "डैशबोर्ड",
    sidebarMyBusiness: "मेरा व्यापार",
    sidebarBusinessDNA: "व्यवसाय प्रोफ़ाइल",
    sidebarMarketScan: "स्थानीय बाज़ार विश्लेषण",
    sidebarGrowthScore: "व्यवसाय विकास स्कोर",
    sidebarOpportunities: "अवसर",
    sidebarAdvisor: "VyaparSetu सलाहकार",
    sidebarActionPlan: "30-दिन की योजना",
    sidebarConnect: "जुड़ें",
    sidebarCommunity: "समुदाय से जुड़ें",
    sidebarSettings: "सेटिंग्स",
    sidebarHelp: "सहायता और समर्थन",
    sidebarLogout: "लॉग आउट",
    dashboardHelplineTitle: "राष्ट्रीय उद्यमी सलाहकार हेल्पलाइन",
    dashboardHelplineSub: "टोल-फ्री हेल्पलाइन: 1800-180-1551 (सोम - शनि, सुबह 9 से शाम 6 बजे) • 6 भाषाओं में सहायता",

    // Dashboard Labels & Controls
    greetingMorning: "नमस्ते",
    profileStatusComplete: "बिजनेस प्रोफाइल: पूर्ण",
    growthScoreLabel: "ग्रोथ स्कोर",
    topOpportunityLabel: "शीर्ष अवसर",
    recommendedActionLabel: "सुझाया गया कदम",
    activeTasksLabel: "सक्रिय कार्य",
    journeyTitle: "आपकी व्यापार यात्रा",
    marketSnapshotTitle: "स्थानीय बाज़ार की स्थिति",
    askAdvisorPlaceholder: "अपने व्यापार सलाहकार से कुछ भी पूछें...",
    speakInstead: "बोलकर पूछें",
    btnStartTask: "कार्य शुरू करें",
    btnComplete: "पूर्ण हुआ",
    btnViewScheme: "योजना देखें",
    btnCheckEligibility: "पात्रता जांचें",
    btnSendProposal: "प्रस्ताव भेजें",
    btnConnected: "जुड़े हुए हैं ✓",
    btnConnect: "जुड़ें",
    searchPlaceholder: "व्यवसाय, उत्पाद या स्थान खोजें...",
    filterAll: "सभी प्रकार",
    filterSuppliers: "सप्लायर",
    filterCustomers: "ग्राहक",
    filterComplementary: "सहयोगी व्यापारी",
    filterDistance: "दूरी",
    advisorThinking: "व्यापारसेतु सलाहकार विचार कर रहा है...",
    popularQuestions: "लोकप्रिय प्रश्न:",
    footerRights: "व्यापारसेतु। सर्वाधिकार सुरक्षित। भारत सरकार सलाह एकीकरण साझेदार।",
    footerGovLinks: "आधिकारिक पोर्टल: msme.gov.in | pmsvanidhi.mohua.gov.in | mudra.org.in | udyamregistration.gov.in",
    footerHelplineLabel: "राष्ट्रीय उद्यमी सलाहकार हेल्पलाइन",
    footerTollFree: "टोल फ्री",
    footerHelplineHours: "6 भारतीय भाषाओं में उपलब्ध • सोमवार से शनिवार, सुबह 8:00 से शाम 8:00 बजे तक",
    footerCtaAdvisor: "व्यापारसेतु सलाहकार से बात करें",
    footerCtaAssessment: "मुफ़्त मूल्यांकन शुरू करें",
    footerBrandDesc: "व्यापारसेतु भारत का समर्पित AI-संचालित डिजिटल सलाहकार मंच है जो विशेष रूप से स्थानीय, अर्ध-शहरी और ग्रामीण उद्यमियों के लिए बनाया गया है। हम स्थानीय व्यापारियों, आपूर्तिकर्ताओं और व्यापार वृद्धि के अवसरों को जोड़ते हैं।",
    footerTrust1: "सरकारी विश्वसनीयता × आधुनिक उपयोगिता × ग्रामीण पहुँच",
    footerTrust2: "सूक्ष्म व्यवसायों और कारीगरों के लिए 100% मुफ़्त सलाह",
    footerTrust3: "500+ भारतीय जिलों में सक्रिय इंटेलिजेंस",
    footerCapabilitiesHeader: "मुख्य क्षमताएं",
    footerSchemesHeader: "योजनाएं और सहायता",
    footerContactHeader: "संपर्क और सहायता",
    footerWhatsappLabel: "व्हाट्सएप सलाह",
    footerEmailLabel: "आधिकारिक ईमेल",
    footerHubLabel: "सलाहकार मुख्य केंद्र",
    footerHoursLabel: "कार्य समय",
    footerPrivacy: "गोपनीयता नीति",
    footerTerms: "सलाह की शर्तें",
    footerSecurity: "256-बिट MSME डेटा सुरक्षा",
    footerVoice: "आवाज़ सहायता",
    footerMadeWith: "भारत के व्यापारियों के लिए ❤️ के साथ निर्मित",
    viewTasks: "कार्य देखें",
    exploreOpportunity: "अवसर देखें →",
  },
  ta: {
    appName: "வியாபார் சேது",
    tagline: "உள்ளூர் வணிகர்களுக்கான AI வணிக வழிகாட்டி",
    navHome: "முகப்பு",
    navHowItWorks: "செயல்படும் முறை",
    navFeatures: "திறன்கள்",
    navSuccess: "வலைப்பின்னல்",
    navAbout: "எங்களைப் பற்றி",
    navLogin: "உள்நுழைவு",
    navGetStarted: "தொடங்குங்கள்",

    heroHeadingLine1: "சரியான வழிகாட்டல்.",
    heroHeadingLine2: "சிறந்த முடிவுகள்.",
    heroHeadingLine3: "வலுவான வணிகம்.",
    heroSubtext: "உள்ளூர் தொழில்முனைவோர் தங்கள் சந்தையைப் புரிந்துகொள்ளவும் வாய்ப்புகளை கண்டறியவும் உதவும் AI தளம்.",
    ctaGetStarted: "இலவசமாகத் தொடங்குங்கள்",
    ctaSeeHow: "செயல்படும் முறையைப் பாருங்கள்",
    badgePlatform: "இந்திய வணிகர்களுக்கான AI டிஜிட்டல் தளம்",
    corePromiseTitle: "எங்கள் வாக்குறுதி:",
    corePromiseDesc: "“உங்கள் வணிகத்தைப் பற்றிச் சொல்லுங்கள், உங்கள் சுற்றியுள்ள வாய்ப்புகளை நாங்கள் கூறுகிறோம்.”",
    trustPillFree: "100% இலவசம்",
    trustPillVoice: "குரல் வழி உள்ளீடு",
    trustPillMatched: "PM ஸ்வாநிதி & முத்ரா திட்டங்கள்",
    tickerTitle: "அரசு திட்டங்கள் & உதவி",
    tickerHowItWorks: "செயல்படும் முறை",
    tickerSvanidhi: "PM ஸ்வாநிதி திட்டம்",
    tickerMudra: "PM முத்ரா வழிகாட்டி",
    tickerUdyam: "உத்யம் ஆதார் மையம்",
    tickerOndc: "ONDC நெட்வொர்க்",

    explorerBadge: "நேரடி வாய்ப்பு எக்ஸ்ப்ளோரர்",
    explorerHeading: "உங்கள் வணிகத்திற்கான வாய்ப்புகளைக் காணுங்கள்",
    explorerSubtext: "ஒரு மாதிரியைத் தேர்ந்தெடுத்து தகவல்களைக் காணுங்கள்:",
    catKirana: "மளிகை கடை",
    catDairy: "பால் & இனிப்பகம்",
    catGarments: "ஆடை & தையல்",
    catHardware: "ஹார்டுவேர் & மின்சாரம்",
    simulatedIntel: "டிஜிட்டல் பகுப்பாய்வு",
    estUpside: "மதிப்பிடப்பட்ட கூடுதல் லாபம்",
    topGapDetected: "முக்கிய வாய்ப்பு",
    localEcosystemOpp: "உள்ளூர் வாய்ப்பு",
    schemeMatch: "அரசு திட்டம்",
    scanTimeNote: "2 நிமிடங்களுக்குள் குரல் வழியில் ஸ்கேன் செய்ய முடியும்.",
    btnScanLocation: "என் இருப்பிடத்தை ஸ்கேன் செய்",

    trustSimple: "எளிமையானது",
    trustSimpleSub: "பயன்படுத்த எளிது",
    trustLocal: "உள்ளூர் தகவல்",
    trustLocalSub: "உங்கள் பகுதிக்கான தரவுகள்",
    trustTrusted: "நம்பகமானது",
    trustTrustedSub: "இந்திய வணிகர்களுக்காக",
    trustSecure: "பாதுகாப்பானது",
    trustSecureSub: "உங்கள் தரவு பாதுகாப்பானது",
    stepBadge: "எளிய 3 படிகள்",
    stepHeading: "3 எளிய படிகளில் வணிக வழிகாட்டல்",
    stepSubtext: "எளிய மற்றும் தெளிவான படிகள்.",
    step1Title: "வணிகத்தைப் பற்றிச் சொல்லுங்கள்",
    step1Desc: "கடை மற்றும் இருப்பிடம் பற்றிய விவரங்களைப் பகிருங்கள்.",
    step1Foot: "எழுத்து அல்லது குரல் உள்ளீடு",
    step2Title: "சந்தையைப் புரிந்து கொள்ளுங்கள்",
    step2Desc: "சந்தை வாய்ப்புகளை பகுப்பாய்வு செய்கிறோம்.",
    step2Foot: "1கிமீ - 10கிமீ ஸ்கேன்",
    step3Title: "செயல் திட்டத்தைப் பெறுங்கள்",
    step3Desc: "30 நாள் வளர்ச்சித் திட்டத்தைப் பெறுங்கள்.",
    step3Foot: "வாராந்திர பணிகள் + அரசு திட்டங்கள்",
    btnStartAssessment: "மதிப்பீட்டைத் தொடங்குங்கள்",

    capabilitiesHeading: "இந்திய வணிகர்களுக்கான 6 முக்கிய திறன்கள்",
    capabilitiesSubtext: "அனைத்து அம்சங்களும் ஒருங்கிணைந்து சரியான முடிவுகளைத் தருகின்றன.",
    cap1Title: "உள்ளூர் சந்தை நுண்ணறிவு",
    cap1Desc: "10 கிமீ சுற்றளவில் போட்டி மற்றும் வாடிக்கையாளர்களை ஸ்கேன் செய்யுங்கள்.",
    cap2Title: "வணிக வளர்ச்சி மதிப்பெண்",
    cap2Desc: "0-100 அளவிலான எளிய மதிப்பீடு.",
    cap3Title: "வாய்ப்புகள் மற்றும் தேவைகள்",
    cap3Desc: "வீட்டு விநியோகம் மற்றும் அரசு திட்டங்களை கண்டறியுங்கள்.",
    cap4Title: "வியாபார் சேது ஆலோசகர்",
    cap4Desc: "உங்கள் மொழியில் குரல் மூலம் கேள்வி கேளுங்கள்.",
    cap5Title: "30-நாள் செயல் திட்டம்",
    cap5Desc: "தினசரி 15 நிமிட எளிய பணிகள்.",
    cap6Title: "சமூக இணைப்பு",
    cap6Desc: "உள்ளூர் உற்பத்தியாளர்களுடன் நேரடியாக இணையுங்கள்.",

    ecoBadge: "நேரடி உள்ளூர் நெட்வொர்க்",
    ecoHeading: "உங்கள் அடுத்த வாய்ப்பு உங்கள் ஊரிலேயே உள்ளது",
    ecoDesc: "இடைத்தரகர்கள் இல்லாமல் நேரடியாக உற்பத்தியாளர்களுடன் இணையுங்கள்:",
    ecoSupplierTitle: "விநியோகஸ்தர்கள்",
    ecoSupplierDesc: "தானியங்கள் மற்றும் பேக்கிங் நேரடியாகப் பெறுங்கள்",
    ecoSupplierBadge: "8-15% சேமிப்பு",
    ecoRetailerTitle: "கூட்டு வணிகர்கள்",
    ecoRetailerDesc: "டீ கடைகள் மற்றும் உணவகங்களுடன் இணையுங்கள்",
    ecoRetailerBadge: "இணைப்பு",
    ecoBuyerTitle: "மொத்த வாடிக்கையாளர்கள்",
    ecoBuyerDesc: "விடுதிகள் மற்றும் பள்ளிகளுக்கான விநியோகம்",
    ecoBuyerBadge: "மொத்த ஆர்டர்கள்",
    ecoWebTitle: "உள்ளூர் வணிக இணைப்பு வலை",
    ecoConnectBtn: "உங்கள் பகுதியில் உள்ள வணிகர்களுடன் இணையுங்கள்",

    ctaBadge: "30-நாள் வளர்ச்சிப் பயணம்",
    ctaHeading: "உங்கள் கடையைச் சுற்றியுள்ள வாய்ப்புகளை அறியத் தயாரா?",
    ctaSubtext: "இன்றே விவரங்களைப் பகிர்ந்து 2 நிமிடத்தில் செயல் திட்டத்தைப் பெறுங்கள்.",

    sidebarOverview: "கண்ணோட்டம்",
    sidebarMyBusiness: "என் வணிகம்",
    sidebarBusinessDNA: "வணிக DNA",
    sidebarMarketScan: "சந்தை ஸ்கேன்",
    sidebarGrowthScore: "வளர்ச்சி மதிப்பெண்",
    sidebarOpportunities: "வாய்ப்புகள்",
    sidebarAdvisor: "வியாபார் சேது ஆலோசகர்",
    sidebarActionPlan: "30-நாள் திட்டம்",
    sidebarConnect: "இணைப்பு",
    sidebarCommunity: "சமூக இணைப்பு",
    sidebarSettings: "அமைப்புகள்",
    sidebarHelp: "உதவி",
    sidebarLogout: "வெளியேறு",
    dashboardHelplineTitle: "தேசிய தொழில்முனைவோர் உதவி மையம்",
    dashboardHelplineSub: "இலவச உதவி எண்: 1800-180-1551 (திங்கள் - சனி, 9 AM - 6 PM) • 6 மொழிகளில் உதவி",

    greetingMorning: "வணக்கம்",
    profileStatusComplete: "சுயவிவரம்: முடிந்தது",
    growthScoreLabel: "வளர்ச்சி மதிப்பெண்",
    topOpportunityLabel: "முக்கிய வாய்ப்பு",
    recommendedActionLabel: "பரிந்துரைக்கப்பட்ட செயல்",
    activeTasksLabel: "செயலில் உள்ள பணிகள்",
    journeyTitle: "உங்கள் வணிகப் பயணம்",
    marketSnapshotTitle: "உள்ளூர் சந்தை சுருக்கம்",
    askAdvisorPlaceholder: "ஆலோசகரிடம் எதையும் கேளுங்கள்...",
    speakInstead: "பேசி கேளுங்கள்",
    btnStartTask: "பணியைத் தொடங்கு",
    btnComplete: "முடிந்தது",
    btnViewScheme: "திட்டத்தைப் பார்",
    btnCheckEligibility: "தகுதியைச் சரிபார்",
    btnSendProposal: "விருப்பம் அனுப்பு",
    btnConnected: "இணைக்கப்பட்டது ✓",
    btnConnect: "இணைக்க",
    searchPlaceholder: "வணிகம் அல்லது பொருளைத் தேடுங்கள்...",
    filterAll: "அனைத்தும்",
    filterSuppliers: "விநியோகஸ்தர்கள்",
    filterCustomers: "வாடிக்கையாளர்கள்",
    filterComplementary: "கூட்டு வணிகர்கள்",
    filterDistance: "தூரம்",
    advisorThinking: "ஆலோசகர் யோசிக்கிறார்...",
    popularQuestions: "பிரபலமான கேள்விகள்:",
    footerRights: "வியாபார் சேது. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    footerGovLinks: "அரசு தளங்கள்: msme.gov.in | pmsvanidhi.mohua.gov.in | mudra.org.in",
    footerHelplineLabel: "தேசிய தொழில்முனைவோர் ஆலோசனை உதவி எண்",
    footerTollFree: "கட்டணமில்லா எண்",
    footerHelplineHours: "6 இந்திய மொழிகளில் கிடைக்கிறது • திங்கள் முதல் சனி, காலை 8:00 - மாலை 8:00",
    footerCtaAdvisor: "வியாபார் சேது ஆலோசகரிடம் பேசுங்கள்",
    footerCtaAssessment: "இலவச மதிப்பீட்டைத் தொடங்குங்கள்",
    footerBrandDesc: "வியாபார் சேது என்பது இந்திய உள்ளூர், கிராமப்புற தொழில்முனைவோருக்காக பிரத்யேகமாக உருவாக்கப்பட்ட AI டிஜிட்டல் ஆலோசனை தளமாகும்.",
    footerTrust1: "அரசு நம்பகத்தன்மை × நவீன பயன்பாடு × கிராமப்புற அணுகல்",
    footerTrust2: "நுண் நிறுவனங்கள் மற்றும் கைவினைஞர்களுக்கு 100% இலவச ஆலோசனை",
    footerTrust3: "500+ இந்திய மாவட்டங்களில் செயலில் உள்ள சேவை",
    footerCapabilitiesHeader: "முக்கிய திறன்கள்",
    footerSchemesHeader: "திட்டங்கள் மற்றும் ஆதரவு",
    footerContactHeader: "தொடர்பு மற்றும் உதவி",
    footerWhatsappLabel: "வாட்ஸ்அப் ஆலோசனை",
    footerEmailLabel: "அதிகாரப்பூர்வ மின்னஞ்சல்",
    footerHubLabel: "முதன்மை ஆலோசனை மையம்",
    footerHoursLabel: "வேலை நேரம்",
    footerPrivacy: "தனியுரிமைக் கொள்கை",
    footerTerms: "ஆலோசனை விதிகள்",
    footerSecurity: "256-பிட் MSME தரவு பாதுகாப்பு",
    footerVoice: "குரல் வழி அணுகல்",
    footerMadeWith: "பாரத வியாபாரிகளுக்காக ❤️ உடன் உருவாக்கப்பட்டது",
    viewTasks: "பணிகளைப் பார்",
    exploreOpportunity: "வாய்ப்பை ஆராய்க →",
  },
  te: {
    appName: "వ్యాపార్ సేతు",
    tagline: "స్థానిక వ్యాపారుల కోసం AI సలహాదారు",
    navHome: "హోమ్",
    navHowItWorks: "పనిచేసే విధానం",
    navFeatures: "సామర్థ్యాలు",
    navSuccess: "నెట్‌వర్క్",
    navAbout: "మా గురించి",
    navLogin: "లాగిన్",
    navGetStarted: "ప్రారంభించండి",

    heroHeadingLine1: "ఖచ్చితమైన మార్గదర్శకత్వం.",
    heroHeadingLine2: "మంచి నిర్ణయాలు.",
    heroHeadingLine3: "బలమైన వ్యాపారం.",
    heroSubtext: "స్థానిక మార్కెట్‌ను అర్థం చేసుకోవడానికి మరియు కొత్త అవకాశాలను కనుగొనడానికి AI ఆధారిత వేదిక.",
    ctaGetStarted: "ఉచితంగా ప్రారంభించండి",
    ctaSeeHow: "ఎలా పనిచేస్తుందో చూడండి",
    badgePlatform: "స్థానిక వ్యాపారాల కోసం AI డిజిటల్ వేదిక",
    corePromiseTitle: "మా ముఖ్యమైన వాగ్దానం:",
    corePromiseDesc: "“మీ వ్యాపారం గురించి చెప్పండి, మీ చుట్టూ ఉన్న అవకాశాలను మేము చెబుతాము.”",
    trustPillFree: "100% ఉచితం",
    trustPillVoice: "వాయిస్ ద్వారా అడగవచ్చు",
    trustPillMatched: "PM స్వనిధి & ముద్రా పథకాలు",
    tickerTitle: "ప్రభుత్వ పథకాలు & సహాయం",
    tickerHowItWorks: "పనిచేసే విధానం",
    tickerSvanidhi: "PM స్వనిధి పథకం",
    tickerMudra: "PM ముద్రా మార్గదర్శి",
    tickerUdyam: "ఉద్యమ్ ఆధార్ కేంద్రం",
    tickerOndc: "ONDC నెట్‌వర్క్",

    explorerBadge: "లైవ్ అవాకాశాల ఎక్స్‌ప్లోరర్",
    explorerHeading: "మీ వ్యాపార రకానికి అవకాశాలను చూడండి",
    explorerSubtext: "ఒక నమూనా వ్యాపారాన్ని ఎంచుకోండి:",
    catKirana: "కిరాణా షాపు",
    catDairy: "పాలు & మిఠాయిలు",
    catGarments: "దుస్తులు & టైలరింగ్",
    catHardware: "హార్డ్‌వేర్ & ఎలక్ట్రికల్",
    simulatedIntel: "డిజిటల్ విశ్లేషణ",
    estUpside: "అంచనా వేసిన అదనపు లాభం",
    topGapDetected: "ముఖ్యమైన స్థానిక అవకాశం",
    localEcosystemOpp: "స్థానిక సరఫరా అవకాశం",
    schemeMatch: "ప్రభుత్వ పథకం లభ్యం",
    scanTimeNote: "వాయిస్ ద్వారా 2 నిమిషాల్లో స్కాన్ పూర్తవుతుంది.",
    btnScanLocation: "నా దుకాణం ప్రదేశాన్ని స్కాన్ చేయి",

    trustSimple: "సరళమైనది",
    trustSimpleSub: "సులభంగా ఉపయోగించవచ్చు",
    trustLocal: "స్థానిక సమాచారం",
    trustLocalSub: "హైపర్‌లోకల్ మార్కెట్ సిగ్నల్స్",
    trustTrusted: "విశ్వసనీయమైనది",
    trustTrustedSub: "భారతీయ వ్యాపారవేత్తల కోసం",
    trustSecure: "సురక్షితమైనది",
    trustSecureSub: "మీ డేటా సురక్షితం",
    stepBadge: "సరళమైన 3 దశలు",
    stepHeading: "3 సులభ దశల్లో మీ వ్యాపార మార్గదర్శకత్వం పొందండి",
    stepSubtext: "సులభమైన మరియు స్పష్టమైన మార్గదర్శకత్వం.",
    step1Title: "మీ వ్యాపారం గురించి చెప్పండి",
    step1Desc: "దుకాణం మరియు స్థానం వివరాలను నమోదు చేయండి.",
    step1Foot: "వచనం లేదా వాయిస్ ద్వారా ఇన్పుట్",
    step2Title: "స్థానిక మార్కెట్‌ను అర్థం చేసుకోండి",
    step2Desc: "పోటీ మరియు కస్టమర్ల అవకాశాలను విశ్లేషిస్తాము.",
    step2Foot: "1కిమీ - 10కిమీ పరిధి స్కాన్",
    step3Title: "యాక్షన్ ప్లాన్ పొందండి",
    step3Desc: "30 రోజుల దశలవారీ అభివృద్ధి ప్రణాళికను అందుకోండి.",
    step3Foot: "వారపు పనులు + ప్రభుత్వ పథకాలు",
    btnStartAssessment: "మూల్యాంకనం ప్రారంభించండి",

    capabilitiesHeading: "భారతీయ వ్యాపారుల కోసం 6 ప్రధాన సామర్థ్యాలు",
    capabilitiesSubtext: "అన్ని ఫీచర్లు కలిసి సరైన నిర్ణయాలు తీసుకోవడానికి సహాయపడతాయి.",
    cap1Title: "స్థానిక మార్కెట్ వివరాలు",
    cap1Desc: "10 కిమీ పరిధిలో పోటీ మరియు కస్టమర్లను స్కాన్ చేయండి.",
    cap2Title: "బిజినెస్ గ్రోత్ స్కోర్",
    cap2Desc: "0-100 పరిధిలో సరళమైన మూల్యాంకనం.",
    cap3Title: "అవకాశాలు మరియు ఖాళీలు",
    cap3Desc: "హోమ్ డెలివరీ మరియు ప్రభుత్వ పథకాలను కనుగొనండి.",
    cap4Title: "వ్యాపార్ సేతు సలహాదారు",
    cap4Desc: "మీ భాషలో వాయిస్ ద్వారా ఏదైనా అడగండి.",
    cap5Title: "30 రోజుల ప్రణాళిక",
    cap5Desc: "రోజువారీ 15 నిమిషాల పనులు.",
    cap6Title: "కమ్యూనిటీ కనెక్ట్",
    cap6Desc: "స్థానిక ఉత్పత్తిదారులతో నేరుగా కనెక్ట్ అవ్వండి.",

    ecoBadge: "నేరుగా స్థానిక నెట్‌వర్క్",
    ecoHeading: "మీ తదుపరి అవకాశం మీ ఊరిలోనే ఉంది",
    ecoDesc: "దళారులు లేకుండా నేరుగా స్థానిక సరఫరాదారులతో కనెక్ట్ అవ్వండి:",
    ecoSupplierTitle: "సరఫరాదారులు",
    ecoSupplierDesc: "ధాన్యాలు మరియు ప్యాకింగ్ నేరుగా కొనండి",
    ecoSupplierBadge: "8-15% ఆదా",
    ecoRetailerTitle: "భాగస్వామ్య వ్యాపారులు",
    ecoRetailerDesc: "టీ హోటళ్ళు మరియు షాపులతో భాగస్వామ్యం",
    ecoRetailerBadge: "కలిసి అమ్మకాలు",
    ecoBuyerTitle: "హోల్‌సేల్ కస్టమర్లు",
    ecoBuyerDesc: "హాస్టళ్లు మరియు పాఠశాలల బల్క్ ఆర్డర్లు",
    ecoBuyerBadge: "బల్క్ ఆర్డర్లు",
    ecoWebTitle: "స్థానిక వ్యాపార నెట్‌వర్క్",
    ecoConnectBtn: "మీ పిన్‌కోడ్ వ్యాపారులతో కనెక్ట్ అవ్వండి",

    ctaBadge: "30 రోజుల అభివృద్ధి ప్రయాణం",
    ctaHeading: "మీ దుకాణం చుట్టూ ఉన్న అవకాశాలను తెలుసుకోవడానికి సిద్ధంగా ఉన్నారా?",
    ctaSubtext: "ఈరోజే వివరాలు అందించి 2 నిమిషాల్లో ప్రణాళిక పొందండి.",

    sidebarOverview: "అవలోకనం",
    sidebarMyBusiness: "నా వ్యాపారం",
    sidebarBusinessDNA: "బిజినెస్ DNA",
    sidebarMarketScan: "మార్కెట్ స్కాన్",
    sidebarGrowthScore: "గ్రోత్ స్కోర్",
    sidebarOpportunities: "అవకాశాలు",
    sidebarAdvisor: "వ్యాపార్ సేతు సలహాదారు",
    sidebarActionPlan: "30 రోజుల ప్రణాళిక",
    sidebarConnect: "కనెక్ట్",
    sidebarCommunity: "కమ్యూనిటీ కనెక్ట్",
    sidebarSettings: "సెట్టింగులు",
    sidebarHelp: "సహాయం",
    sidebarLogout: "లాగౌట్",
    dashboardHelplineTitle: "జాతీయ వ్యాపారవేత్తల సహాయ కేంద్రం",
    dashboardHelplineSub: "టోల్-ఫ్రీ నంబర్: 1800-180-1551 (సోమ - శని, 9 AM - 6 PM) • 6 భాషల్లో సహాయం",

    greetingMorning: "నమస్కారం",
    profileStatusComplete: "ప్రొఫైల్: పూర్తయింది",
    growthScoreLabel: "గ్రోత్ స్కోర్",
    topOpportunityLabel: "ముఖ్య అవకాశం",
    recommendedActionLabel: "సిఫార్సు చేసిన చర్య",
    activeTasksLabel: "క్రియాశీల పనులు",
    journeyTitle: "మీ వ్యాపార ప్రయాణం",
    marketSnapshotTitle: "స్థానిక మార్కెట్ వివరాలు",
    askAdvisorPlaceholder: "వ్యాపార సలహాదారుని ఏదైనా అడగండి...",
    speakInstead: "మాట్లాడి అడగండి",
    btnStartTask: "టాస్క్ ప్రారంభించండి",
    btnComplete: "పూర్తయింది",
    btnViewScheme: "పథకం చూడండి",
    btnCheckEligibility: "అర్హత చూడండి",
    btnSendProposal: "ప్రతిపాదన పంపు",
    btnConnected: "కనెక్ట్ అయ్యారు ✓",
    btnConnect: "కనెక్ట్ అవ్వండి",
    searchPlaceholder: "వ్యాపారం లేదా ఉత్పత్తి వెతకండి...",
    filterAll: "అన్నీ",
    filterSuppliers: "సరఫరాదారులు",
    filterCustomers: "కస్టమర్లు",
    filterComplementary: "భాగస్వాములు",
    filterDistance: "దూరం",
    advisorThinking: "సలహాదారు ఆలోచిస్తున్నారు...",
    popularQuestions: "ప్రసిద్ధ ప్రశ్నలు:",
    footerRights: "వ్యాపార్ సేతు. సర్వ హక్కులు సురక్షితం.",
    footerGovLinks: "ప్రభుత్వ పోర్టల్స్: msme.gov.in | pmsvanidhi.mohua.gov.in | mudra.org.in",
    footerHelplineLabel: "జాతీయ వ్యవస్థాపక సలహా హెల్ప్‌లైన్",
    footerTollFree: "టోల్ ఫ్రీ",
    footerHelplineHours: "6 భారతీయ భాషలలో లభిస్తుంది • సోమవారం నుండి శనివారం, ఉదయం 8:00 నుండి రాత్రి 8:00 వరకు",
    footerCtaAdvisor: "వ్యాపార్ సేతు సలహాదారుతో మాట్లాడండి",
    footerCtaAssessment: "ఉచిత అంచనాను ప్రారంభించండి",
    footerBrandDesc: "వ్యాపార్ సేతు అనేది భారతీయ స్థానిక మరియు గ్రామీణ వ్యవస్థాపకుల కోసం రూపొందించబడిన ప్రత్యేక AI డిజిటల్ సలహా వేదిక.",
    footerTrust1: "ప్రభుత్వ విశ్వసనీయత × ఆధునిక సౌలభ్యం × గ్రామీణ ప్రాప్యత",
    footerTrust2: "సూక్ష్మ వ్యాపారాలు మరియు కళాకారులకు 100% ఉచిత సలహా",
    footerTrust3: "500+ భారతీయ జిల్లాలలో క్రియాశీల సేవలు",
    footerCapabilitiesHeader: "ప్రధాన సామర్థ్యాలు",
    footerSchemesHeader: "పథకాలు మరియు మద్దతు",
    footerContactHeader: "సంప్రదించండి మరియు మద్దతు",
    footerWhatsappLabel: "వాట్సాప్ సలహా",
    footerEmailLabel: "అధికారిక ఇమెయిల్",
    footerHubLabel: "ప్రధాన సలహా కేంద్రం",
    footerHoursLabel: "పని వేళలు",
    footerPrivacy: "గోప్యతా విధానం",
    footerTerms: "సలహా నిబంధనలు",
    footerSecurity: "256-బిట్ MSME డేటా భద్రత",
    footerVoice: "వాయిస్ సౌలభ్యం",
    footerMadeWith: "భారతీయ వ్యాపారుల కోసం ❤️ తో తయారు చేయబడింది",
    viewTasks: "టాస్క్‌లు చూడండి",
    exploreOpportunity: "అవకాశాన్ని అన్వేషించండి →",
  },
  mr: {
    appName: "व्यापारसेतू",
    tagline: "स्थानिक व ग्रामीण उद्योजकांसाठी AI डिजिटल सल्लागार",
    navHome: "मुख्यपृष्ठ",
    navHowItWorks: "कार्यपद्धती",
    navFeatures: "क्षमता",
    navSuccess: "नेटवर्क",
    navAbout: "आमच्याबद्दल",
    navLogin: "लॉगिन",
    navGetStarted: "सुरू करा",

    heroHeadingLine1: "योग्य मार्गदर्शन.",
    heroHeadingLine2: "चांगले निर्णय.",
    heroHeadingLine3: "सशक्त व्यवसाय.",
    heroSubtext: "स्थानिक उद्योजकांना त्यांची बाजारपेठ समजून घेण्यासाठी, संधी शोधण्यासाठी आणि योग्य पाऊल उचलण्यासाठी AI व्यासपीठ.",
    ctaGetStarted: "मोफत सुरू करा",
    ctaSeeHow: "कार्यपद्धती पहा",
    badgePlatform: "स्थानिक व्यवसायांसाठी भारतातील AI डिजिटल सल्लागार व्यासपीठ",
    corePromiseTitle: "आमचे मुख्य वचन:",
    corePromiseDesc: "“आम्हाला तुमच्या व्यवसायाबद्दल सांगा, आणि आम्ही सांगू की तुमच्या आसपास काय संधी आहे आणि पुढे काय करावे.”",
    trustPillFree: "100% मोफत",
    trustPillVoice: "6 भाषांमध्ये बोलून विचारा",
    trustPillMatched: "PM स्वनिधी व मुद्रा योजना",
    tickerTitle: "शासकीय योजना व मदत",
    tickerHowItWorks: "व्यापारसेतू कसे चालते",
    tickerSvanidhi: "PM स्वनिधी योजना",
    tickerMudra: "PM मुद्रा मार्गदर्शन",
    tickerUdyam: "उद्यम आधार केंद्र",
    tickerOndc: "ONDC सेलर नेटवर्क",

    explorerBadge: "थेट संधी एक्सप्लोरर",
    explorerHeading: "तुमच्या व्यवसाय प्रकारासाठी काय संधी आहे ते पहा",
    explorerSubtext: "माहिती पाहण्यासाठी एक व्यवसाय निवडा:",
    catKirana: "किराणा व जनरल स्टोअर",
    catDairy: "दूध डेअरी व मिठाई",
    catGarments: "कपडे व शिलाई",
    catHardware: "हार्डवेअर व इलेक्ट्रिकल",
    simulatedIntel: "डिजिटल विश्लेषण",
    estUpside: "अंदाजित अतिरिक्त नफा",
    topGapDetected: "प्रमुख स्थानिक संधी",
    localEcosystemOpp: "स्थानिक पुरवठा संधी",
    schemeMatch: "शासकीय योजना जुळली",
    scanTimeNote: "बोलून 2 मिनिटांपेक्षा कमी वेळेत स्कॅन पूर्ण होते.",
    btnScanLocation: "माझ्या दुकानाची जागा स्कॅन करा",

    trustSimple: "सोपे",
    trustSimpleSub: "वापरण्यास अत्यंत सोपे",
    trustLocal: "स्थानिक",
    trustLocalSub: "हायपरलोकल माहिती",
    trustTrusted: "विश्वसनीय",
    trustTrustedSub: "भारतीय उद्योजकांसाठी",
    trustSecure: "सुरक्षित",
    trustSecureSub: "तुमचा डेटा सुरक्षित आहे",
    stepBadge: "सोपी 3-टप्प्यांची प्रक्रिया",
    stepHeading: "3 सोप्या टप्प्यांत मिळवा व्यवसाय मार्गदर्शन",
    stepSubtext: "कोणतेही कठीण हिशोब नाहीत. फक्त सोपी पावले.",
    step1Title: "तुमच्या व्यवसायाबद्दल सांगा",
    step1Desc: "तुमचे दुकान आणि स्थानाची माहिती द्या.",
    step1Foot: "लिखीत किंवा बोलून माहिती द्या",
    step2Title: "स्थानिक बाजारपेठ समजून घ्या",
    step2Desc: "आम्ही परिसरातील ग्राहक व संधींचे विश्लेषण करतो.",
    step2Foot: "1 किमी - 10 किमी स्कॅन",
    step3Title: "कृती आराखडा मिळवा",
    step3Desc: "30 दिवसांची स्पष्ट व्यवसाय वाढीची योजना मिळवा.",
    step3Foot: "साप्ताहिक कामे + सरकारी योजना",
    btnStartAssessment: "मूल्यांकन सुरू करा",

    capabilitiesHeading: "भारतीय उद्योजकांसाठी 6 मुख्य क्षमता",
    capabilitiesSubtext: "सर्व वैशिष्ट्ये एकत्र येऊन योग्य निर्णय घेण्यास मदत करतात.",
    cap1Title: "स्थानिक बाजारपेठ विश्लेषण",
    cap1Desc: "10 किमी परिसरातील स्पर्धा आणि ग्राहक स्कॅन करा.",
    cap2Title: "बिझनेस ग्रोथ स्कोर",
    cap2Desc: "0-100 मधील सोपे मूल्यमापन.",
    cap3Title: "संधी आणि कमतरता",
    cap3Desc: "होम डिलिव्हरी आणि सरकारी योजना शोधा.",
    cap4Title: "व्यापारसेतू सल्लागार",
    cap4Desc: "तुमच्या भाषेत बोलून काहीही विचारा.",
    cap5Title: "30-दिवसांची योजना",
    cap5Desc: "रोजची 15 मिनिटांची सोपी कामे.",
    cap6Title: "कम्युनिटी कनेक्ट",
    cap6Desc: "मध्यस्थांशिवाय स्थानिक उत्पादकांशी जोडा.",

    ecoBadge: "थेट स्थानिक नेटवर्क",
    ecoHeading: "तुमची पुढची संधी तुमच्या गावातच आहे",
    ecoDesc: "मध्यस्थांना न देता थेट 3 किमी वरील पुरवठादारांशी जोडा:",
    ecoSupplierTitle: "पुरवठादार व मिलर",
    ecoSupplierDesc: "धान्य आणि पॅकेजिंग थेट खरेदी करा",
    ecoSupplierBadge: "8-15% बचत",
    ecoRetailerTitle: "सहयोगी व्यावसायिक",
    ecoRetailerDesc: "चहा टपरी व हॉटेल्ससोबत भागीदारी करा",
    ecoRetailerBadge: "आपसी विक्री",
    ecoBuyerTitle: "घाऊक ग्राहक व वसतिगृहे",
    ecoBuyerDesc: "हॉस्टेल व शाळांसाठी घाऊक पुरवठा",
    ecoBuyerBadge: "घाऊक ऑर्डर",
    ecoWebTitle: "स्थानिक व्यावसायिक नेटवर्क",
    ecoConnectBtn: "तुमच्या पिनकोडजवळील व्यावसायिकांशी जोडा",

    ctaBadge: "30-दिवसांचा वाढीचा प्रवास",
    ctaHeading: "दुकानाभोवतालच्या संधी जाणून घेण्यास तयार आहात?",
    ctaSubtext: "आजच माहिती द्या आणि 2 मिनिटांत योजना मिळवा.",

    sidebarOverview: "आढावा",
    sidebarMyBusiness: "माझा व्यवसाय",
    sidebarBusinessDNA: "बिझनेस DNA",
    sidebarMarketScan: "मार्केट स्कॅन",
    sidebarGrowthScore: "ग्रोथ स्कोर",
    sidebarOpportunities: "संधी",
    sidebarAdvisor: "व्यापारसेतू सल्लागार",
    sidebarActionPlan: "30-दिवसांची योजना",
    sidebarConnect: "जोडा",
    sidebarCommunity: "कम्युनिटी कनेक्ट",
    sidebarSettings: "सेटिंग्ज",
    sidebarHelp: "मदत व सपोर्ट",
    sidebarLogout: "लॉगआउट",
    dashboardHelplineTitle: "राष्ट्रीय उद्योजक सल्लागार हेल्पलाइन",
    dashboardHelplineSub: "टोल-फ्री हेल्पलाइन: 1800-180-1551 (सोम - शनि, सकाळी 9 ते संध्याकाळी 6) • 6 भाषांमध्ये मदत",

    greetingMorning: "नमस्कार",
    profileStatusComplete: "प्रोफाइल: पूर्ण",
    growthScoreLabel: "ग्रोथ स्कोर",
    topOpportunityLabel: "प्रमुख संधी",
    recommendedActionLabel: "शिफारस केलेले पाऊल",
    activeTasksLabel: "सक्रिय कामे",
    journeyTitle: "तुमचा व्यवसाय प्रवास",
    marketSnapshotTitle: "स्थानिक बाजारपेठ स्थिती",
    askAdvisorPlaceholder: "सल्लागाराला काहीही विचारा...",
    speakInstead: "बोलून विचारा",
    btnStartTask: "काम सुरू करा",
    btnComplete: "पूर्ण झाले",
    btnViewScheme: "योजना पहा",
    btnCheckEligibility: "पात्रता तपासा",
    btnSendProposal: "प्रस्ताव पाठवा",
    btnConnected: "जोडले गेले ✓",
    btnConnect: "जोडा",
    searchPlaceholder: "व्यवसाय किंवा उत्पादन शोधा...",
    filterAll: "सर्व प्रकार",
    filterSuppliers: "पुरवठादार",
    filterCustomers: "ग्राहक",
    filterComplementary: "सहयोगी",
    filterDistance: "अंतर",
    advisorThinking: "सल्लागार विचार करत आहे...",
    popularQuestions: "लोकप्रिय प्रश्न:",
    footerRights: "व्यापारसेतू. सर्व हक्क सुरक्षित.",
    footerGovLinks: "शासकीय पोर्टल्स: msme.gov.in | pmsvanidhi.mohua.gov.in | mudra.org.in",
    footerHelplineLabel: "राष्ट्रीय उद्योजक सल्लागार हेल्पलाइन",
    footerTollFree: "टोल फ्री",
    footerHelplineHours: "6 भारतीय भाषांमध्ये उपलब्ध • सोमवार ते शनिवार, सकाळी 8:00 ते संध्याकाळी 8:00",
    footerCtaAdvisor: "व्यापारसेतू सल्लागाराशी बोला",
    footerCtaAssessment: "मोफत मूल्यमापन सुरू करा",
    footerBrandDesc: "व्यापारसेतू हे भारतातील स्थानिक व ग्रामीण उद्योजकांसाठी विशेष बनवलेले AI डिजिटल सल्लागार व्यासपीठ आहे.",
    footerTrust1: "शासकीय विश्वासार्हता × आधुनिक उपयोगिता × ग्रामीण पोहोच",
    footerTrust2: "सूक्ष्म उद्योग व कारागिरांसाठी 100% मोफत सल्ला",
    footerTrust3: "500+ भारतीय जिल्ह्यांमध्ये सक्रिय सेवा",
    footerCapabilitiesHeader: "मुख्य क्षमता",
    footerSchemesHeader: "योजना व मदत",
    footerContactHeader: "संपर्क व मदत",
    footerWhatsappLabel: "व्हॉट्सॲप सल्ला",
    footerEmailLabel: "अधिकृत ईमेल",
    footerHubLabel: "सल्लागार मुख्य केंद्र",
    footerHoursLabel: "कामकाजाची वेळ",
    footerPrivacy: "गोपनीयता धोरण",
    footerTerms: "सल्ल्याच्या अटी",
    footerSecurity: "256-बिट MSME डेटा सुरक्षा",
    footerVoice: "आवाज सुविधा",
    footerMadeWith: "भारतातील व्यापाऱ्यांसाठी ❤️ सह बनवले",
    viewTasks: "कामे पहा",
    exploreOpportunity: "संधी पहा →",
  },
  bn: {
    appName: "ব্যাপারসেতু",
    tagline: "স্থানীয় এবং গ্রামীণ উদ্যোক্তাদের জন্য এআই ব্যবসায়িক উপদেষ্টা",
    navHome: "হোম",
    navHowItWorks: "কার্যপ্রণালী",
    navFeatures: "ক্ষমতাসমূহ",
    navSuccess: "নেটওয়ার্ক",
    navAbout: "আমাদের সম্পর্কে",
    navLogin: "লগইন",
    navGetStarted: "শুরু করুন",

    heroHeadingLine1: "সঠিক নির্দেশনা।",
    heroHeadingLine2: "উন্নত সিদ্ধান্ত।",
    heroHeadingLine3: "শক্তিশালী ব্যবসা।",
    heroSubtext: "স্থানীয় উদ্যোক্তাদের তাদের বাজার বুঝতে, সুযোগ অন্বেষণ করতে এবং সঠিক পদক্ষেপ নিতে এআই প্ল্যাটফর্ম।",
    ctaGetStarted: "বিনামূল্যে শুরু করুন",
    ctaSeeHow: "কীভাবে কাজ করে দেখুন",
    badgePlatform: "ভারতীয় স্থানীয় ব্যবসার জন্য এআই ডিজিটাল উপদেষ্টা প্ল্যাটফর্ম",
    corePromiseTitle: "আমাদের মূল অঙ্গীকার:",
    corePromiseDesc: "“আপনার ব্যবসা সম্পর্কে বলুন, আমরা বলব আপনার চারপাশে কী সুযোগ আছে এবং এরপরে কী করবেন।”",
    trustPillFree: "ক্ষুদ্র শিল্পের জন্য 100% বিনামূল্যে",
    trustPillVoice: "6টি ভারতীয় ভাষায় ভয়েস ইনপুট",
    trustPillMatched: "PM স্বনিধি ও মুদ্রা যোজনার সাথে যুক্ত",
    tickerTitle: "সরকারি প্রকল্প ও সহায়তা",
    tickerHowItWorks: "ব্যাপারসেতু কীভাবে কাজ করে",
    tickerSvanidhi: "PM স্বনিধি প্রকল্প",
    tickerMudra: "PM মুদ্রা নির্দেশিকা",
    tickerUdyam: "উদ্যম আধার সহায়তা কেন্দ্র",
    tickerOndc: "ONDC সেলার নেটওয়ার্ক",

    explorerBadge: "লাইভ সুযোগ এক্সপ্লোরার",
    explorerHeading: "আপনার ব্যবসার ধরনের জন্য কী সুযোগ রয়েছে তা দেখুন",
    explorerSubtext: "বাস্তব তথ্য দেখতে একটি ব্যবসা নির্বাচন করুন:",
    catKirana: "মুদি ও জেনারেল স্টোর",
    catDairy: "দুগ্ধ ও মিষ্টির দোকান",
    catGarments: "পোশাক ও দর্জি",
    catHardware: "হার্ডওয়্যার ও ইলেকট্রিক",
    simulatedIntel: "ডিজিটাল বিশ্লেষণ",
    estUpside: "আনুমানিক অতিরিক্ত লাভ",
    topGapDetected: "প্রধান স্থানীয় সুযোগ",
    localEcosystemOpp: "স্থানীয় সরবরাহ সুযোগ",
    schemeMatch: "সরকারি প্রকল্প উপযুক্ত",
    scanTimeNote: "মুখে বলে 2 মিনিটের কম সময়ে স্ক্যান সম্পন্ন হয়।",
    btnScanLocation: "আমার দোকানের অবস্থান স্ক্যান করুন",

    trustSimple: "সহজ",
    trustSimpleSub: "সবার ব্যবহারের উপযোগী",
    trustLocal: "স্থানীয়",
    trustLocalSub: "এলাকাভিত্তিক তথ্য",
    trustTrusted: "বিশ্বস্ত",
    trustTrustedSub: "ভারতীয় ব্যবসায়ীদের জন্য",
    trustSecure: "নিরাপদ",
    trustSecureSub: "আপনার তথ্য সুরক্ষিত",
    stepBadge: "সহজ 3-ধাপের প্রক্রিয়া",
    stepHeading: "3টি সহজ ধাপে পান ব্যবসায়িক নির্দেশনা",
    stepSubtext: "কোনো জটিল হিসাব নয়। কেবল স্পষ্ট পদক্ষেপ।",
    step1Title: "আপনার ব্যবসা সম্পর্কে বলুন",
    step1Desc: "আপনার দোকান এবং অবস্থানের তথ্য দিন।",
    step1Foot: "টেক্সট বা আঞ্চলিক ভাষায় ভয়েস ইনপুট",
    step2Title: "স্থানীয় বাজারকে বুঝুন",
    step2Desc: "আমরা আশেপাশের প্রতিযোগিতা ও সুযোগ বিশ্লেষণ করি।",
    step2Foot: "1কিমি - 10কিমি স্ক্যান",
    step3Title: "কর্মপরিকল্পনা পান",
    step3Desc: "একটি বাস্তবসম্মত 30 দিনের বৃদ্ধির পরিকল্পনা পান।",
    step3Foot: "সাপ্তাহিক কাজ + সরকারি প্রকল্প",
    btnStartAssessment: "মূল্যায়ন শুরু করুন",

    capabilitiesHeading: "ভারতীয় ব্যবসার জন্য তৈরি 6টি মূল ক্ষমতা",
    capabilitiesSubtext: "সমস্ত বৈশিষ্ট্য একসাথে কাজ করে সঠিক সিদ্ধান্ত নিতে সাহায্য করে।",
    cap1Title: "স্থানীয় বাজারের তথ্য",
    cap1Desc: "10 কিমি এলাকা জুড়ে প্রতিযোগী ও ক্রেতাদের স্ক্যান করুন।",
    cap2Title: "বিজনেস গ্রোথ স্কোর",
    cap2Desc: "0-100 স্কেলে সহজ মূল্যায়ন।",
    cap3Title: "সুযোগ ও চাহিদার ঘাটতি",
    cap3Desc: "হোম ডেলিভারি ও সরকারি প্রকল্প আবিষ্কার করুন।",
    cap4Title: "ব্যাপারসেতু উপদেষ্টা",
    cap4Desc: "আপনার ভাষায় মুখে বলে যেকোনো প্রশ্ন জিজ্ঞাসা করুন।",
    cap5Title: "30 দিনের পরিকল্পনা",
    cap5Desc: "দৈনিক 15 মিনিটের সহজ কাজ।",
    cap6Title: "কমিউনিটি কানেক্ট",
    cap6Desc: "দালালদের বাদ দিয়ে স্থানীয় উৎপাদকদের সাথে সরাসরি যুক্ত হন।",

    ecoBadge: "সরাসরি স্থানীয় নেটওয়ার্ক",
    ecoHeading: "আপনার পরবর্তী সুযোগ আপনার এলাকাতেই রয়েছে",
    ecoDesc: "দালালদের বাদ দিয়ে 3 কিমি দূরের সরবরাহকারীদের সাথে সরাসরি যুক্ত হন:",
    ecoSupplierTitle: "সরবরাহকারী ও মিলার",
    ecoSupplierDesc: "খাদ্যশস্য ও প্যাকেজিং সরাসরি কিনুন",
    ecoSupplierBadge: "8-15% সাশ্রয়",
    ecoRetailerTitle: "সহযোগী ব্যবসায়ী",
    ecoRetailerDesc: "চা দোকান ও ডেয়ারির সাথে অংশীদারিত্ব",
    ecoRetailerBadge: "যৌথ বিক্রি",
    ecoBuyerTitle: "পাইকারি ক্রেতা ও হোস্টেল",
    ecoBuyerDesc: "স্কুল ও হোস্টেলের জন্য পাইকারি সরবরাহ",
    ecoBuyerBadge: "পাইকারি অর্ডার",
    ecoWebTitle: "স্থানীয় ব্যবসায়িক নেটওয়ার্ক",
    ecoConnectBtn: "আপনার পিনকোডের ব্যবসায়ীদের সাথে যুক্ত হন",

    ctaBadge: "30 দিনের বৃদ্ধির যাত্রা",
    ctaHeading: "দোকানের চারপাশের সুযোগ জানতে প্রস্তুত?",
    ctaSubtext: "আজই তথ্য দিন এবং 2 মিনিটের মধ্যে কর্মপরিকল্পনা পান।",

    sidebarOverview: "ওভারভিউ",
    sidebarMyBusiness: "আমার ব্যবসা",
    sidebarBusinessDNA: "বিজনেস DNA",
    sidebarMarketScan: "মার্কেট স্ক্যান",
    sidebarGrowthScore: "গ্রোথ স্কোর",
    sidebarOpportunities: "নতুন সুযোগ",
    sidebarAdvisor: "ব্যাপারসেতু উপদেষ্টা",
    sidebarActionPlan: "30 দিনের পরিকল্পনা",
    sidebarConnect: "সংযোগ",
    sidebarCommunity: "কমিউনিটি কানেক্ট",
    sidebarSettings: "সেটিংস",
    sidebarHelp: "সাহায্য ও সহায়তা",
    sidebarLogout: "লগআউট",
    dashboardHelplineTitle: "জাতীয় উদ্যোক্তা উপদেষ্টা হেল্পলাইন",
    dashboardHelplineSub: "টোল-ফ্রি নম্বর: 1800-180-1551 (সোম - শনি, 9 AM - 6 PM) • 6টি ভাষায় সহায়তা",

    greetingMorning: "নমস্কার",
    profileStatusComplete: "প্রোফাইল: সম্পূর্ণ",
    growthScoreLabel: "গ্রোথ স্কোর",
    topOpportunityLabel: "শীর্ষ সুযোগ",
    recommendedActionLabel: "সুপারিশকৃত পদক্ষেপ",
    activeTasksLabel: "চলমান কাজ",
    journeyTitle: "আপনার ব্যবসায়িক যাত্রা",
    marketSnapshotTitle: "স্থানীয় বাজারের বিবরণ",
    askAdvisorPlaceholder: "উপদেষ্টাকে কিছু জিজ্ঞাসা করুন...",
    speakInstead: "মুখে বলুন",
    btnStartTask: "কাজ শুরু করুন",
    btnComplete: "সম্পন্ন",
    btnViewScheme: "প্রকল্প দেখুন",
    btnCheckEligibility: "যোগ্যতা পরীক্ষা করুন",
    btnSendProposal: "প্রস্তাব পাঠান",
    btnConnected: "যুক্ত হয়েছেন ✓",
    btnConnect: "যুক্ত হন",
    searchPlaceholder: "ব্যবসা বা পণ্য খুঁজুন...",
    filterAll: "সমস্ত ধরন",
    filterSuppliers: "সরবরাহকারী",
    filterCustomers: "ক্রেতা",
    filterComplementary: "সহযোগী",
    filterDistance: "দূরত্ব",
    advisorThinking: "উপদেষ্টা ভাবছেন...",
    popularQuestions: "জনপ্রিয় প্রশ্ন:",
    footerRights: "ব্যাপারসেতু। সর্বস্বত্ব সংরক্ষিত।",
    footerGovLinks: "সরকারি পোর্টাল: msme.gov.in | pmsvanidhi.mohua.gov.in | mudra.org.in",
    footerHelplineLabel: "জাতীয় উদ্যোক্তা উপদেষ্টা হেল্পলাইন",
    footerTollFree: "টোল ফ্রি",
    footerHelplineHours: "6টি ভারতীয় ভাষায় উপলব্ধ • সোমবার থেকে শনিবার, সকাল 8:00 - রাত 8:00",
    footerCtaAdvisor: "ব্যাপারসেতু উপদেষ্টার সাথে কথা বলুন",
    footerCtaAssessment: "বিনামূল্যে মূল্যায়ন শুরু করুন",
    footerBrandDesc: "ব্যাপারসেতু হলো ভারতের স্থানীয় এবং গ্রামীণ উদ্যোক্তাদের জন্য বিশেষভাবে তৈরি একটি এআই পরিচালিত ডিজিটাল উপদেষ্টা প্ল্যাটফর্ম।",
    footerTrust1: "সরকারি বিশ্বাসযোগ্যতা × আধুনিক উপযোগিতা × গ্রামীণ অ্যাক্সেস",
    footerTrust2: "ক্ষুদ্র শিল্প ও কারিগরদের জন্য 100% বিনামূল্যে সহায়তা",
    footerTrust3: "500+ ভারতীয় জেলাজুড়ে সক্রিয় পরিষেবা",
    footerCapabilitiesHeader: "মূল ক্ষমতাসমূহ",
    footerSchemesHeader: "প্রকল্প ও সহায়তা",
    footerContactHeader: "যোগাযোগ ও সাহায্য",
    footerWhatsappLabel: "হোয়াটসঅ্যাপ পরামর্শ",
    footerEmailLabel: "অফিসিয়াল ইমেল",
    footerHubLabel: "প্রধান উপদেষ্টা কেন্দ্র",
    footerHoursLabel: "কাজের সময়",
    footerPrivacy: "গোপনীয়তা নীতি",
    footerTerms: "পরামর্শের শর্তাবলী",
    footerSecurity: "256-বিট MSME ডেটা সুরক্ষা",
    footerVoice: "ভয়েস সহায়তা",
    footerMadeWith: "ভারতের ব্যবসায়ীদের জন্য ❤️ এর সাথে তৈরি",
    viewTasks: "কাজগুলি দেখুন",
    exploreOpportunity: "সুযোগটি দেখুন →",
  },
};
