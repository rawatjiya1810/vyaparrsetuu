import {
  BusinessProfile,
  GrowthScore,
  LocalBusiness,
  OpportunityZone,
  MarketGap,
  ActionPlan,
  Language,
} from "../types";
import {
  initialBusinessProfile,
  mockGrowthScore,
  mockNearbyBusinesses,
  mockOpportunityZones,
  mockMarketGaps,
  mockActionPlan,
} from "../data/mockData";

export interface AdvisorChatPayload {
  question: string;
  businessProfile: BusinessProfile;
  growthScore?: GrowthScore;
  marketGaps?: MarketGap[];
  actionPlan?: ActionPlan;
  localBusinesses?: LocalBusiness[];
  opportunityZones?: OpportunityZone[];
  history?: Array<{ sender: "user" | "advisor"; text: string }>;
  language?: Language;
}

export interface AdvisorChatResponse {
  answer: string;
  source: string;
}

export interface ProposalRecord {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  message: string;
  sentAt: string;
  status: "Sent" | "Accepted" | "Pending";
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export function sanitizeAdvisorText(text: string): string {
  if (!text) return "";
  let cleaned = text;

  // Remove common prompt/instruction leakage headers at start of output
  cleaned = cleaned.replace(/^\s*\*?(Bullet points\s*\/\s*Short sentences|Bullet points|Short sentences|Instructions|Response|Format|Note):\*?\s*/gi, "");

  // Remove bold/markdown instruction headers at start
  cleaned = cleaned.replace(/^\s*\*\*?(Instructions|Response|Format|Note):\*\*?\s*/gi, "");

  // Split into lines and strip initial header lines
  const lines = cleaned.split("\n");
  while (lines.length > 0) {
    const firstLine = lines[0].trim();
    if (
      /^\*?(bullet points|short sentences|instructions|response|format)\:?\*?$/i.test(firstLine) ||
      /^\*?(bullet points\s*\/\s*short sentences)\:?\*?$/i.test(firstLine) ||
      /^\*+\s*(bullet points|short sentences|instructions|response|format)\:?\s*\*+$/i.test(firstLine)
    ) {
      lines.shift();
    } else {
      break;
    }
  }
  cleaned = lines.join("\n").trim();

  // If output is just a standalone bullet number or punctuation like "1.", "1. ", "•", "-", return empty
  if (/^(\d+\.|\bullet|\*|-|\s)*$/.test(cleaned)) {
    return "";
  }

  // Ensure output has actual words or numbers
  if (cleaned.length < 3 && !/[a-zA-Z0-9\u0900-\u097F\u0B80-\u0BFF\u0C00-\u0C7F\u0980-\u09FF]/.test(cleaned)) {
    return "";
  }

  return cleaned;
}

class DataService {
  // AI Advisor query
  async askAdvisor(payload: AdvisorChatPayload): Promise<AdvisorChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/advisor/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const rawAnswer = data.answer || data.reply || "";
        const cleanAnswer = sanitizeAdvisorText(rawAnswer);
        if (cleanAnswer) {
          return {
            answer: cleanAnswer,
            source: data.source || "gemini",
          };
        }
      }
    } catch (err) {
      console.warn("API request failed, using local intelligence engine fallback", err);
    }

    // Local grounded fallback if API call fails
    const q = payload.question.toLowerCase();
    const isHi = payload.language === "hi";
    const bizName = payload.businessProfile?.businessName || "Ramesh Kirana & Daily Needs";

    const isBrief = /\b(brief|short|in short|quickly|just tell me|tldr|tl;dr)\b/i.test(q);

    if (isBrief) {
      if (q.includes("customer") || q.includes("ग्राहक") || q.includes("sales") || q.includes("बिक्री")) {
        return {
          answer: isHi
            ? `${bizName} के लिए बिक्री बढ़ाने के 3 त्वरित कदम:\n• व्हाट्सएप पर 15 लोकप्रिय सामानों की सूची शेयर करें।\n• शाम 5-8 बजे ₹300 से अधिक के आर्डर पर फ्री होम डिलीवरी दें।\n• दुकान के बाहर स्पष्ट यूपीआई क्यूआर कोड लगाएं।\n\n**मैं सबसे पहले क्या करूँगा:** व्हाट्सएप पर ऑर्डर लेने की शुरुआत करें।`
            : `3 quick steps to increase sales for ${bizName}:\n• Share top 15 daily essential items on WhatsApp.\n• Offer free delivery for orders over ₹300 between 5-8 PM.\n• Display your UPI QR code upfront.\n\n**What I would do first:** Start taking orders on WhatsApp this week.`,
          source: "local-engine",
        };
      }
      return {
        answer: isHi
          ? `${bizName} की बिक्री बढ़ाने के लिए पहले व्हाट्सएप ऑर्डर और शाम की डिलीवरी चालू करें, फिर पीएम स्वनिधि लोन के लिए सीएससी केंद्र पर आवेदन करें।\n\n**मैं सबसे पहले क्या करूँगा:** व्हाट्सएप कैटलॉग से शुरुआत करें।`
          : `For ${bizName}, focus first on WhatsApp ordering and evening delivery, then apply for PM SVANidhi working capital at your CSC centre.\n\n**What I would do first:** Launch your WhatsApp catalog first.`,
        source: "local-engine",
      };
    }

    if (q.includes("customer") || q.includes("ग्राहक") || q.includes("sales") || q.includes("बिक्री")) {
      return {
        answer: isHi
          ? `**आप अपने व्यापार को बढ़ा सकते हैं, लेकिन शुरुआत में आपको बहुत पैसा खर्च करने की ज़रूरत नहीं है। मैं सबसे पहले इन बातों पर ध्यान दूँगा:**\n\n1. **मौजूदा ग्राहकों को जोड़े रखें**\n   रेलवे कॉलोनी के अपने नियमित ग्राहकों के संपर्क में रहें और जब भी रोज़मर्रा का नया सामान या किराना स्टॉक आए तो उन्हें जानकारी दें।\n\n2. **पास के लोगों की ज़रूरत का सामान बेचें**\n   अपनी बिक्री और मार्केट स्कैन देखें। दुकान के सामने उन दालों, तेल और दैनिक सामानों को रखें जिनकी मांग सबसे ज्यादा है।\n\n3. **खरीदारी को आसान बनाएं**\n   पास के ग्राहकों को व्हाट्सएप या फोन पर ऑर्डर देने की सुविधा दें, और ₹300 से ऊपर के ऑर्डर पर शाम 5-8 बजे के बीच डिलीवरी दें।\n\n4. **दैनिक नकदी का हिसाब रखें**\n   रोजाना की बिक्री और खर्चों को डायरी में लिखें। बिक्री अच्छी होने पर भी अगर छोटे खर्चे अनियंत्रित हों तो मुनाफा कम हो जाता है।\n\n5. **सीधे सप्लायर से खरीद करें**\n   मंडी कमीशन बचाने और 8-12% मार्जिन बढ़ाने के लिए 2.4 किमी दूर मोहन ऑर्गेनिक मिल से सीधे 50kg दाल और तेल के बैग खरीदें।\n\n6. **शुरुआत में बड़ा लोन लेने से बचें**\n   पहले यह सुनिश्चित करें कि ग्राहक नियमित खरीद रहे हैं, फिर व्यवसाय की आय से आसानी से चुकाए जा सकने वाले वर्किंग कैपिटल लोन पर विचार करें।\n\n**मैं सबसे पहले क्या करूँगा:**\nइस सप्ताह पास के परिवारों के साथ व्हाट्सएप ऑर्डर की शुरुआत करें। इसमें कोई खर्च नहीं आता और आप बिना जोखिम के ग्राहक मांग को समझ सकते हैं।`
          : `**You can grow your business, but you do not need to spend a lot of money at the beginning. I would focus on these things first:**\n\n1. **Bring back existing customers**\n   Stay in touch with regular customers from Railway Colony and let them know when daily essential items or fresh stock arrives.\n\n2. **Sell what people nearby actually need**\n   Check your sales data and Market Scan. Give prominent shelf space to high-demand pulses, edible oils, and daily essentials instead of stocking slow-moving items.\n\n3. **Make buying easier**\n   Allow nearby customers to place orders through WhatsApp or phone, and offer scheduled evening home delivery for orders above ₹300.\n\n4. **Watch your daily money**\n   Write down daily cash sales and expenses. A business can have good revenue but still lose money if small daily expenses go untracked.\n\n5. **Buy directly from local producers**\n   Procure 50kg pulse and oil bags directly from Mohan Organic Mill (2.4 km away) to eliminate mandi commission fees and save 8–12% on procurement.\n\n6. **Do not take a bigger loan too early**\n   First prove that regular customers are buying consistently before applying for working capital loans.\n\n**What I would do first:**\nStart with WhatsApp ordering for regular neighborhood families this week. It costs nothing, and you can test real customer demand before spending money on delivery or advertising.`,
        source: "local-engine",
      };
    } else if (q.includes("loan") || q.includes("लोन") || q.includes("scheme") || q.includes("योजना") || q.includes("mudra") || q.includes("svanidhi")) {
      return {
        answer: isHi
          ? `**${bizName} (उद्यम पंजीकृत सूक्ष्म उद्योग) के लिए पीएम स्वनिधि और पीएम मुद्रा योजना सबसे सुरक्षित और उपयुक्त सरकारी विकल्प हैं।**\n\n1. **पीएम स्वनिधि योजना (पहला कदम)**\n   ₹10,000 से ₹50,000 तक का वर्किंग कैपिटल लोन लें। समय पर भुगतान करने पर 7% ब्याज सब्सिडी और वार्षिक डिजिटल यूपीआई कैशबैक मिलता है।\n\n2. **पीएम मुद्रा योजना - शिशु (स्टॉक विस्तार के लिए)**\n   बिना किसी गारंटी के ₹50,000 तक का लोन मिलता है। इसका उपयोग थोक किराना सामान खरीदने के लिए करें।\n\n3. **उद्यम पंजीकरण का लाभ उठाएं**\n   आपका उद्यम प्रमाणपत्र बैंक में प्राथमिकता दिलाता है। लोन एजेंटों को कोई कमीशन न दें।\n\n4. **दैनिक यूपीआई रिकॉर्ड सुरक्षित रखें**\n   क्यूआर कोड से रोजाना का लेनदेन साबित करता है कि आपकी दुकान में नियमित आय हो रही है।\n\n5. **लोन की किश्त की सीमा**\n   मासिक किश्त आपकी दैनिक बचत के 25% से अधिक नहीं होनी चाहिए ताकि दुकान पर दबाव न पड़े।\n\n**मैं सबसे पहले क्या करूँगा:**\nअपने उद्यम आधार और पिछले 3 महीने के यूपीआई स्टेटमेंट के साथ पास के जन सेवा केंद्र (CSC) पर पीएम स्वनिधि का निःशुल्क आवेदन जमा करें।`
          : `**For ${bizName} (a Udyam registered micro-enterprise), the PM SVANidhi scheme followed by PM Mudra (Shishu) are the most suitable and low-risk government credit options.**\n\n1. **PM SVANidhi Scheme (Working Capital)**\n   Provides ₹10,000 to ₹50,000 working capital loan with a 7% interest subsidy on timely repayment and cashback rewards for UPI QR sales.\n\n2. **PM Mudra Yojana - Shishu (Inventory Expansion)**\n   Offers collateral-free credit up to ₹50,000 specifically designed for micro-retailers stocking seasonal inventory.\n\n3. **Leverage Your Udyam Certification**\n   Your official Udyam registration guarantees priority processing at nationalized bank branches without paying any middlemen fees.\n\n4. **Maintain Clean UPI Records**\n   Daily QR transactions serve as verifiable proof of income for banks when evaluating your loan repayment capability.\n\n5. **Safe Loan Repayment Limit**\n   Ensure your monthly EMI payment does not exceed 25% of your daily net profits to keep your business operating safely.\n\n**What I would do first:**\nVisit your nearest Common Service Centre (CSC) with your Udyam Aadhaar and 3-month UPI transaction statement to submit your PM SVANidhi application.`,
        source: "local-engine",
      };
    } else if (q.includes("supplier") || q.includes("सामान") || q.includes("सप्लायर") || q.includes("margin") || q.includes("मुनाफा") || q.includes("cost") || q.includes("खरीद")) {
      return {
        answer: isHi
          ? `**आप बिचौलियों को हटाकर सीधे क्षेत्रीय उत्पादकों से खरीद करके अपना मुनाफा मार्जिन 8–12% तक बढ़ा सकते हैं।**\n\n1. **मोहन ऑर्गेनिक मिल से सीधी खरीद**\n   2.4 किमी दूर स्थित मोहन ऑर्गेनिक मिल से सीधे 50kg दाल और सरसों तेल के बैग खरीदें ताकि मंडी दलालों की फीस बचे।\n\n2. **पास के दुकानदारों के साथ थोक ऑर्डर पूल करें**\n   आसपास के 2 किराना दुकानदारों के साथ मिलकर 100kg+ का आर्डर दें ताकि थोक डिस्काउंट मिले।\n\n3. **स्थानीय हॉस्टल और दुकानों को सप्लाई करें**\n   पास की शांति हॉस्टल या चाय स्टॉल को दैनिक थोक आपूर्ति देने का अनुबंध करें जिससे निश्चित नकदी प्रवाह बने।\n\n4. **तेजी से बिकने वाले सामान का 15 दिन का स्टॉक रखें**\n   अनावश्यक सामान में पूंजी फंसाने के बजाय तेजी से बिकने वाले अनाज का 15 दिनों का स्टॉक चक्र बनाए रखें।\n\n5. **सप्लायर के क्रेडिट समय का उपयोग करें**\n   सप्लायर से 7 दिनों का भुगतान समय मांगें ताकि माल बिकने के बाद ही नकदी बाहर जाए।\n\n**मैं सबसे पहले क्या करूँगा:**\nइस सप्ताह मोहन ऑर्गेनिक मिल पर जाकर थोक रेट लिस्ट लें और अपने वर्तमान मंडी सप्लायर की दरों से तुलना करें।`
          : `**You can increase your profit margin by 8–12% by bypassing intermediaries and buying daily staples directly from regional producers.**\n\n1. **Direct Mill Procurement**\n   Buy 50kg pulse and edible oil bags directly from Mohan Organic Mill (2.4 km away) to eliminate mandi broker commission fees.\n\n2. **Pool Orders with Neighboring Shopkeepers**\n   Combine bulk orders with 2 nearby small retailers to reach 100kg+ order thresholds and unlock wholesale discount tiers.\n\n3. **Secure Local B2B Supply Contracts**\n   Contract with local tea stalls and hostels like Shanti Hostel for daily bulk supply to ensure steady, predictable daily cash inflow.\n\n4. **Maintain a 15-Day Inventory Cycle**\n   Avoid locking up working capital in slow-selling items; maintain a strict 15-day stock rotation for high-demand grains.\n\n5. **Negotiate 7-Day Supplier Credit**\n   Ask suppliers for a 7-day payment window so inventory is sold before supplier payment is due.\n\n**What I would do first:**\nVisit Mohan Organic Mill this week to compare wholesale prices against your current supplier rates before placing your next bulk order.`,
        source: "local-engine",
      };
    } else if (q.includes("task") || q.includes("today") || q.includes("आज") || q.includes("काम") || q.includes("focus") || q.includes("plan")) {
      return {
        answer: isHi
          ? `**आज आपकी सबसे महत्वपूर्ण प्राथमिकता व्हाट्सएप बिजनेस प्रोफाइल और गूगल मैप्स पिन पूरा करना है (अनुमानित समय: 15 मिनट)।**\n\n1. **आज का मुख्य कार्य (15 मिनट)**\n   व्हाट्सएप बिजनेस कैटलॉग में अपने 15 प्रमुख किराना सामानों की रेट लिस्ट अपडेट करें।\n\n2. **शाम का कार्य (20 मिनट)**\n   रेलवे कॉलोनी के नियमित ग्राहकों को व्हाट्सएप पर दैनिक आवश्यक वस्तुओं की लिस्ट भेजें।\n\n3. **इस सप्ताह का लक्ष्य**\n   पास की रेलवे कॉलोनी में 50 होम डिलीवरी पर्चे बांटे।\n\n4. **इस महीने का वित्तीय कार्य**\n   पीएम स्वनिधि योजना का निःशुल्क आवेदन पास के सीएससी केंद्र पर जमा करें।\n\n5. **प्रगति स्थिति**\n   आपने अपने 30-दिवसीय प्लान के 12 में से 5 कार्य पूरे कर लिए हैं।\n\n**मैं सबसे पहले क्या करूँगा:**\nदुकान खोलने से पहले आज व्हाट्सएप कैटलॉग में 15 सामानों की रेट लिस्ट डालें।`
          : `**Your single highest-priority task for today at ${bizName} is completing your WhatsApp Business Profile and setting your Google Maps location pin (estimated time: 15 mins).**\n\n1. **Today's Primary Task (15 mins)**\n   Update your WhatsApp Business catalog with prices for your top 15 fast-moving daily essential items.\n\n2. **Evening Outreach Task (20 mins)**\n   Share your catalog link with 20 regular customers residing in Railway Colony.\n\n3. **Weekly Goal**\n   Distribute 50 home delivery flyers to neighborhood residential units.\n\n4. **Monthly Financial Goal**\n   Submit your PM SVANidhi loan application at the local Common Service Centre (CSC).\n\n5. **Plan Progress Status**\n   You have successfully completed 5 out of 12 planned action steps for this month.\n\n**What I would do first:**\nUpdate your 15 catalog items on WhatsApp before opening shop today to enable regular customers to place phone orders immediately.`,
        source: "local-engine",
      };
    }

    return {
      answer: isHi
        ? `**रामपुर में ${bizName} के बिज़नेस प्रोफाइल के आधार पर, आपकी दुकान पास के ग्राहकों की पकड़ और सीधी खरीद से मुनाफा बढ़ाने के लिए सही स्थिति में है।**\n\n1. **निजी डिलीवरी शुरू करें**\n   रेलवे कॉलोनी के परिवारों के लिए शाम 5-8 बजे ₹300 से अधिक के ऑर्डर पर फ्री डिलीवरी दें।\n\n2. **सीधे उत्पादकों से खरीद करें**\n   मोहन ऑर्गेनिक मिल से सीधे 50kg दाल और तेल खरीदें ताकि 8-12% मंडी फीस बचे।\n\n3. **पीएम स्वनिधि लोन का उपयोग करें**\n   ₹10,000-₹50,000 कम लागत वाली कार्यशील पूंजी के लिए 7% ब्याज सब्सिडी वाले लोन का आवेदन दें।\n\n4. **डिजिटल उपस्थिति मजबूत करें**\n   व्हाट्सएप बिजनेस कैटलॉग और गूगल मैप्स पिन सेट करके नए ग्राहकों को आकर्षित करें।\n\n5. **दैनिक बहीखाता चालू रखें**\n   आय और खर्च रोजाना दर्ज करें ताकि नकदी प्रबंधन सुरक्षित रहे।\n\n**मैं सबसे पहले क्या करूँगा:**\nअपने 30-दिवसीय प्लान के सप्ताह 1 के कार्यों से शुरुआत करें और व्हाट्सएप कैटलॉग तुरंत चालू करें।`
        : `**Based on your business profile for ${bizName} in Rampur, your shop is well-positioned to increase monthly profits by strengthening local customer convenience and direct mill procurement.**\n\n1. **Launch Scheduled Evening Delivery**\n   Offer free delivery for orders above ₹300 between 5 PM and 8 PM for Railway Colony families.\n\n2. **Procure Directly from Local Mills**\n   Buy 50kg grain and oil bags directly from Mohan Organic Mill (2.4 km away) to cut mandi fees by 8–12%.\n\n3. **Utilize Government Credit Support**\n   Apply for the PM SVANidhi scheme to access ₹10,000–₹50,000 working capital with a 7% interest subsidy.\n\n4. **Establish Digital Presence**\n   Set up your WhatsApp catalog and Google Maps pin to attract new residential customers.\n\n5. **Maintain Daily Cash Records**\n   Track daily sales and small expenses in a ledger to ensure steady cash flow.\n\n**What I would do first:**\nStart executing Week 1 of your 30-Day Action Plan by activating your WhatsApp catalog today.`,
      source: "local-engine",
    };
  }

  // Streaming AI Advisor query
  async askAdvisorStream(
    payload: AdvisorChatPayload,
    onChunk: (text: string) => void
  ): Promise<AdvisorChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/advisor/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, stream: true }),
      });

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedText = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split(/\r?\n\r?\n/);
          buffer = parts.pop() || "";

          for (const part of parts) {
            const lines = part.split(/\r?\n/);
            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data:")) {
                const dataStr = trimmed.replace(/^data:\s*/, "").trim();
                if (dataStr === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(dataStr);
                  if (parsed.fullText) {
                    accumulatedText = parsed.fullText;
                  } else if (parsed.text) {
                    accumulatedText += parsed.text;
                  }
                  const sanitizedAcc = sanitizeAdvisorText(accumulatedText);
                  if (sanitizedAcc) {
                    onChunk(sanitizedAcc);
                  }
                } catch (e) {
                  // ignore malformed JSON line
                }
              }
            }
          }
        }

        const finalSanitized = sanitizeAdvisorText(accumulatedText);
        if (finalSanitized) {
          return {
            answer: finalSanitized,
            source: "gemini-api-stream",
          };
        }
      }
    } catch (err) {
      console.warn("Streaming request failed, falling back to standard askAdvisor", err);
    }

    return this.askAdvisor(payload);
  }

  // Profile data
  async getProfile(): Promise<BusinessProfile> {
    const saved = localStorage.getItem("vyaparsetu_profile");
    return saved ? JSON.parse(saved) : initialBusinessProfile;
  }

  async saveProfile(profile: BusinessProfile): Promise<BusinessProfile> {
    localStorage.setItem("vyaparsetu_profile", JSON.stringify(profile));
    return profile;
  }

  // Market scan data
  async getMarketData(): Promise<{
    localBusinesses: LocalBusiness[];
    opportunityZones: OpportunityZone[];
    marketGaps: MarketGap[];
  }> {
    return {
      localBusinesses: mockNearbyBusinesses,
      opportunityZones: mockOpportunityZones,
      marketGaps: mockMarketGaps,
    };
  }

  // Growth score
  async getGrowthScore(): Promise<GrowthScore> {
    const saved = localStorage.getItem("vyaparsetu_growth_score");
    return saved ? JSON.parse(saved) : mockGrowthScore;
  }

  // Action plan
  async getActionPlan(): Promise<ActionPlan> {
    const saved = localStorage.getItem("vyaparsetu_action_plan");
    return saved ? JSON.parse(saved) : mockActionPlan;
  }

  // Connection state persistence
  getConnections(): string[] {
    const saved = localStorage.getItem("vyaparsetu_connections");
    return saved ? JSON.parse(saved) : ["comp-1"];
  }

  toggleConnection(businessId: string): boolean {
    const connections = this.getConnections();
    const index = connections.indexOf(businessId);
    let isConnected = false;
    if (index > -1) {
      connections.splice(index, 1);
      isConnected = false;
    } else {
      connections.push(businessId);
      isConnected = true;
    }
    localStorage.setItem("vyaparsetu_connections", JSON.stringify(connections));
    return isConnected;
  }

  // Proposal persistence
  getProposals(): Record<string, ProposalRecord> {
    const saved = localStorage.getItem("vyaparsetu_proposals");
    return saved ? JSON.parse(saved) : {};
  }

  async sendProposal(payload: {
    businessId: string;
    businessName: string;
    title: string;
    message: string;
  }): Promise<ProposalRecord> {
    // Simulate real network processing time
    await new Promise((resolve) => setTimeout(resolve, 500));

    const proposals = this.getProposals();
    const record: ProposalRecord = {
      id: `prop-${Date.now()}`,
      businessId: payload.businessId,
      businessName: payload.businessName,
      title: payload.title,
      message: payload.message,
      sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "Sent",
    };

    proposals[payload.businessId] = record;
    localStorage.setItem("vyaparsetu_proposals", JSON.stringify(proposals));

    // Ensure connected status when proposal sent
    const connections = this.getConnections();
    if (!connections.includes(payload.businessId)) {
      connections.push(payload.businessId);
      localStorage.setItem("vyaparsetu_connections", JSON.stringify(connections));
    }

    return record;
  }
}

export const dataService = new DataService();
