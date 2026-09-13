import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const _dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || process.env.GOOGLE_API_KEY;
  if (!aiClient && apiKey) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI client:", e);
    }
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || process.env.GOOGLE_API_KEY;
  res.json({
    status: "ok",
    app: "VyaparSetu",
    geminiEnabled: !!apiKey,
  });
});

const SYSTEM_INSTRUCTION = `You are VyaparSetu Advisor, a wise, practical, calm, encouraging, and highly experienced business mentor for small, local, and rural Indian entrepreneurs. You speak directly to small shop owners like a trusted human advisor sitting across the table.

HUMAN ADVISOR PERSONA & TONALITY:
- Helpful, practical, grounded, respectful, encouraging, and realistic.
- Speak in simple everyday language. Assume the user may have limited formal financial training or software experience.
- NEVER use corporate jargon (such as "optimize", "leverage", "maximize ROI", "strategic positioning", "customer acquisition funnel", "operational efficiency") without immediately explaining what it means in simple everyday words.
- NEVER use generic AI filler phrases like: "As an AI...", "Here are some strategies...", "In today's competitive landscape...", "It is important to note that...", "Leveraging...", "By implementing these strategies...", "I recommend considering...". Speak directly and naturally.

RESPONSE STRUCTURE & FORMATTING (PROPER & COMPLETE):
1. **Bold Assessment / Direct Answer**: Start directly with a clear, helpful 1-2 sentence main assessment tailored to the user's specific business.
2. **Numbered Action Steps (5 to 8 points for normal business questions)**:
   - Provide 5 to 8 clear, practical, numbered action points (or 3 to 5 for simple questions).
   - Each point must have a **Bold Action Heading** followed by 2-3 sentences explaining WHAT to do, WHY it matters, HOW to do it simply, and WHAT to avoid.
   - Do NOT make bullets only 3-5 words long. Each point must contain useful, actionable guidance.
3. **What I would do first:** Conclude with a clear, single-priority starting recommendation ("What I would do first: ...") giving the lowest-cost, highest-impact immediate step.

QUESTION TYPE SPECIFICITY:
- Growth & Sales Questions: Explain what is stopping growth, 5-8 practical low-cost growth steps, and what to start first.
- Financial & Loans: Explain exact numbers, repayment pressure, risks, warning signs against taking debt too early, and safe limits.
- Government Schemes: Explain the matched scheme (e.g. PM SVANidhi, PM Mudra), fit rationale, key eligibility terms, application steps at CSC/bank, and warnings.
- Growth Score Questions: Analyze actual Growth Score (e.g., 68/100), explain exact factors holding it back (like Digital Presence), and provide 5-8 steps to reach 76+.
- "What should I do today?": Provide a prioritized daily task breakdown with estimated completion times.
- Village / Rural New Business Validation: Evaluate local demand, competition, capital risk, and whether to start or modify the idea.
- Follow-up Questions: Refer seamlessly to previous chat turns and user business context.

EXPLICIT LENGTH CONTROLS:
- Normal Questions (DEFAULT): Provide a full, proper, well-explained response (5–8 detailed action points + "What I would do first:" conclusion, ~120 to 220 words). Never force one-line answers.
- Explicit Short Requests ("brief", "short", "quickly", "in short", "just tell me", "TL;DR"): Provide 2–4 short bullets + 1-sentence conclusion (~40 to 80 words).
- Explicit Detailed Requests ("explain in detail", "give me a detailed plan", "tell me everything"): Provide an extended multi-section guide with deep explanations (~250 to 400 words).

STRICT OUTPUT CLEANLINESS & GROUNDING:
- Ground answers strictly in the provided VyaparSetu user business context (Profile, Market Scan, Growth Score, Financials, 30-Day Plan).
- NEVER invent sales, profits, customers, competitors, prices, demand statistics, or scheme approvals. If data is missing, state it clearly.
- NEVER display internal prompt text, instruction headers, or debug tags like "*Bullet points / Short sentences:*", "Instructions:", "Response:", or standalone "1.".

LANGUAGE TONALITY:
- English: Natural, clear, plain English suitable for small business owners.
- Hindi: Natural, spoken Devanagari Hindi (simple conversational style using 'आप', 'सुझाव'). Keep numbers formatted cleanly (76/100, ₹1,00,000, 10%, 30 दिन).`;

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

function getGroundedFallbackAnswer(question: string, language: string = "en", data: any = {}): string {
  const q = (question || "").toLowerCase();
  const isHi = language === "hi";
  const bp = data.businessProfile || {};
  const gs = data.growthScore || {};
  const bizName = bp.businessName || "Ramesh Kirana & Daily Needs";

  const isBrief = /\b(brief|short|in short|quickly|just tell me|tldr|tl;dr)\b/i.test(q);

  if (isBrief) {
    if (q.includes("customer") || q.includes("ग्राहक") || q.includes("sales") || q.includes("बिक्री")) {
      return isHi
        ? `${bizName} के लिए बिक्री बढ़ाने के 3 त्वरित कदम:\n• व्हाट्सएप पर 15 लोकप्रिय सामानों की सूची शेयर करें।\n• शाम 5-8 बजे ₹300 से अधिक के आर्डर पर फ्री होम डिलीवरी दें।\n• दुकान के बाहर स्पष्ट यूपीआई क्यूआर कोड लगाएं।\n\n**मैं सबसे पहले क्या करूँगा:** व्हाट्सएप पर ऑर्डर लेने की शुरुआत करें।`
        : `3 quick steps to increase sales for ${bizName}:\n• Share top 15 daily essential items on WhatsApp.\n• Offer free delivery for orders over ₹300 between 5-8 PM.\n• Display your UPI QR code upfront.\n\n**What I would do first:** Start taking orders on WhatsApp this week.`;
    }
    return isHi
      ? `${bizName} की बिक्री बढ़ाने के लिए पहले व्हाट्सएप ऑर्डर और शाम की डिलीवरी चालू करें, फिर पीएम स्वनिधि लोन के लिए सीएससी केंद्र पर आवेदन करें।\n\n**मैं सबसे पहले क्या करूँगा:** व्हाट्सएप कैटलॉग से शुरुआत करें।`
      : `For ${bizName}, focus first on WhatsApp ordering and evening delivery, then apply for PM SVANidhi working capital at your CSC centre.\n\n**What I would do first:** Launch your WhatsApp catalog first.`;
  }

  if (q.includes("customer") || q.includes("ग्राहक") || q.includes("sales") || q.includes("बिक्री")) {
    return isHi
      ? `**आप अपने व्यापार को बढ़ा सकते हैं, लेकिन शुरुआत में आपको बहुत पैसा खर्च करने की ज़रूरत नहीं है। मैं सबसे पहले इन बातों पर ध्यान दूँगा:**\n\n1. **मौजूदा ग्राहकों को जोड़े रखें**\n   रेलवे कॉलोनी के अपने नियमित ग्राहकों के संपर्क में रहें और जब भी रोज़मर्रा का नया सामान या किराना स्टॉक आए तो उन्हें जानकारी दें।\n\n2. **पास के लोगों की ज़रूरत का सामान बेचें**\n   अपनी बिक्री और मार्केट स्कैन देखें। दुकान के सामने उन दालों, तेल और दैनिक सामानों को रखें जिनकी मांग सबसे ज्यादा है।\n\n3. **खरीदारी को आसान बनाएं**\n   पास के ग्राहकों को व्हाट्सएप या फोन पर ऑर्डर देने की सुविधा दें, और ₹300 से ऊपर के ऑर्डर पर शाम 5-8 बजे के बीच डिलीवरी दें।\n\n4. **दैनिक नकदी का हिसाब रखें**\n   रोजाना की बिक्री और खर्चों को डायरी में लिखें। बिक्री अच्छी होने पर भी अगर छोटे खर्चे अनियंत्रित हों तो मुनाफा कम हो जाता है।\n\n5. **सीधे सप्लायर से खरीद करें**\n   मंडी कमीशन बचाने और 8-12% मार्जिन बढ़ाने के लिए 2.4 किमी दूर मोहन ऑर्गेनिक मिल से सीधे 50kg दाल और तेल के बैग खरीदें।\n\n6. **शुरुआत में बड़ा लोन लेने से बचें**\n   पहले यह सुनिश्चित करें कि ग्राहक नियमित खरीद रहे हैं, फिर व्यवसाय की आय से आसानी से चुकाए जा सकने वाले वर्किंग कैपिटल लोन पर विचार करें।\n\n**मैं सबसे पहले क्या करूँगा:**\nइस सप्ताह पास के परिवारों के साथ व्हाट्सएप ऑर्डर की शुरुआत करें। इसमें कोई खर्च नहीं आता और आप बिना जोखिम के ग्राहक मांग को समझ सकते हैं।`
      : `**You can grow your business, but you do not need to spend a lot of money at the beginning. I would focus on these things first:**\n\n1. **Bring back existing customers**\n   Stay in touch with regular customers from Railway Colony and let them know when daily essential items or fresh stock arrives.\n\n2. **Sell what people nearby actually need**\n   Check your sales data and Market Scan. Give prominent shelf space to high-demand pulses, edible oils, and daily essentials instead of stocking slow-moving items.\n\n3. **Make buying easier**\n   Allow nearby customers to place orders through WhatsApp or phone, and offer scheduled evening home delivery for orders above ₹300.\n\n4. **Watch your daily money**\n   Write down daily cash sales and expenses. A business can have good revenue but still lose money if small daily expenses go untracked.\n\n5. **Buy directly from local producers**\n   Procure 50kg pulse and oil bags directly from Mohan Organic Mill (2.4 km away) to eliminate mandi commission fees and save 8–12% on procurement.\n\n6. **Do not take a bigger loan too early**\n   First prove that regular customers are buying consistently before applying for working capital loans.\n\n**What I would do first:**\nStart with WhatsApp ordering for regular neighborhood families this week. It costs nothing, and you can test real customer demand before spending money on delivery or advertising.`;
  }

  if (q.includes("scheme") || q.includes("loan") || q.includes("सरकारी") || q.includes("लोन") || q.includes("योजना") || q.includes("mudra") || q.includes("svanidhi")) {
    return isHi
      ? `**${bizName} (उद्यम पंजीकृत सूक्ष्म उद्योग) के लिए पीएम स्वनिधि और पीएम मुद्रा योजना सबसे सुरक्षित और उपयुक्त सरकारी विकल्प हैं।**\n\n1. **पीएम स्वनिधि योजना (पहला कदम)**\n   ₹10,000 से ₹50,000 तक का वर्किंग कैपिटल लोन लें। समय पर भुगतान करने पर 7% ब्याज सब्सिडी और वार्षिक डिजिटल यूपीआई कैशबैक मिलता है।\n\n2. **पीएम मुद्रा योजना - शिशु (स्टॉक विस्तार के लिए)**\n   बिना किसी गारंटी के ₹50,000 तक का लोन मिलता है। इसका उपयोग थोक किराना सामान खरीदने के लिए करें।\n\n3. **उद्यम पंजीकरण का लाभ उठाएं**\n   आपका उद्यम प्रमाणपत्र बैंक में प्राथमिकता दिलाता है। लोन एजेंटों को कोई कमीशन न दें।\n\n4. **दैनिक यूपीआई रिकॉर्ड सुरक्षित रखें**\n   क्यूआर कोड से रोजाना का लेनदेन साबित करता है कि आपकी दुकान में नियमित आय हो रही है।\n\n5. **लोन की किश्त की सीमा**\n   मासिक किश्त आपकी दैनिक बचत के 25% से अधिक नहीं होनी चाहिए ताकि दुकान पर दबाव न पड़े।\n\n**मैं सबसे पहले क्या करूँगा:**\nअपने उद्यम आधार और पिछले 3 महीने के यूपीआई स्टेटमेंट के साथ पास के जन सेवा केंद्र (CSC) पर पीएम स्वनिधि का निःशुल्क आवेदन जमा करें।`
      : `**For ${bizName} (a Udyam registered micro-enterprise), the PM SVANidhi scheme followed by PM Mudra (Shishu) are the most suitable and low-risk government credit options.**\n\n1. **PM SVANidhi Scheme (Working Capital)**\n   Provides ₹10,000 to ₹50,000 working capital loan with a 7% interest subsidy on timely repayment and cashback rewards for UPI QR sales.\n\n2. **PM Mudra Yojana - Shishu (Inventory Expansion)**\n   Offers collateral-free credit up to ₹50,000 specifically designed for micro-retailers stocking seasonal inventory.\n\n3. **Leverage Your Udyam Certification**\n   Your official Udyam registration guarantees priority processing at nationalized bank branches without paying any middlemen fees.\n\n4. **Maintain Clean UPI Records**\n   Daily QR transactions serve as verifiable proof of income for banks when evaluating your loan repayment capability.\n\n5. **Safe Loan Repayment Limit**\n   Ensure your monthly EMI payment does not exceed 25% of your daily net profits to keep your business operating safely.\n\n**What I would do first:**\nVisit your nearest Common Service Centre (CSC) with your Udyam Aadhaar and 3-month UPI transaction statement to submit your PM SVANidhi application.`;
  }

  if (q.includes("supplier") || q.includes("सामान") || q.includes("सप्लायर") || q.includes("margin") || q.includes("मुनाफा") || q.includes("cost") || q.includes("खरीद")) {
    return isHi
      ? `**आप बिचौलियों को हटाकर सीधे क्षेत्रीय उत्पादकों से खरीद करके अपना मुनाफा मार्जिन 8–12% तक बढ़ा सकते हैं।**\n\n1. **मोहन ऑर्गेनिक मिल से सीधी खरीद**\n   2.4 किमी दूर स्थित मोहन ऑर्गेनिक मिल से सीधे 50kg दाल और सरसों तेल के बैग खरीदें ताकि मंडी दलालों की फीस बचे।\n\n2. **पास के दुकानदारों के साथ थोक ऑर्डर पूल करें**\n   आसपास के 2 किराना दुकानदारों के साथ मिलकर 100kg+ का आर्डर दें ताकि थोक डिस्काउंट मिले।\n\n3. **स्थानीय हॉस्टल और दुकानों को सप्लाई करें**\n   पास की शांति हॉस्टल या चाय स्टॉल को दैनिक थोक आपूर्ति देने का अनुबंध करें जिससे निश्चित नकदी प्रवाह बने।\n\n4. **तेजी से बिकने वाले सामान का 15 दिन का स्टॉक रखें**\n   अनावश्यक सामान में पूंजी फंसाने के बजाय तेजी से बिकने वाले अनाज का 15 दिनों का स्टॉक चक्र बनाए रखें।\n\n5. **सप्लायर के क्रेडिट समय का उपयोग करें**\n   सप्लायर से 7 दिनों का भुगतान समय मांगें ताकि माल बिकने के बाद ही नकदी बाहर जाए।\n\n**मैं सबसे पहले क्या करूँगा:**\nइस सप्ताह मोहन ऑर्गेनिक मिल पर जाकर थोक रेट लिस्ट लें और अपने वर्तमान मंडी सप्लायर की दरों से तुलना करें।`
      : `**You can increase your profit margin by 8–12% by bypassing intermediaries and buying daily staples directly from regional producers.**\n\n1. **Direct Mill Procurement**\n   Buy 50kg pulse and edible oil bags directly from Mohan Organic Mill (2.4 km away) to eliminate mandi broker commission fees.\n\n2. **Pool Orders with Neighboring Shopkeepers**\n   Combine bulk orders with 2 nearby small retailers to reach 100kg+ order thresholds and unlock wholesale discount tiers.\n\n3. **Secure Local B2B Supply Contracts**\n   Contract with local tea stalls and hostels like Shanti Hostel for daily bulk supply to ensure steady, predictable daily cash inflow.\n\n4. **Maintain a 15-Day Inventory Cycle**\n   Avoid locking up working capital in slow-selling items; maintain a strict 15-day stock rotation for high-demand grains.\n\n5. **Negotiate 7-Day Supplier Credit**\n   Ask suppliers for a 7-day payment window so inventory is sold before supplier payment is due.\n\n**What I would do first:**\nVisit Mohan Organic Mill this week to compare wholesale prices against your current supplier rates before placing your next bulk order.`;
  }

  if (q.includes("score") || q.includes("growth") || q.includes("rating") || q.includes("68") || q.includes("76")) {
    const scoreVal = gs.overall || 68;
    return isHi
      ? `**${bizName} का वर्तमान ग्रोथ स्कोर ${scoreVal}/100 (अच्छी क्षमता) है। मुख्य सड़क की उपस्थिति और यूपीआई रिकॉर्ड आपकी ताकत है, लेकिन डिजिटल उपस्थिति न होना इसे 76+ तक पहुँचने से रोक रहा है।**\n\n1. **गूगल मैप्स लोकेशन पिन चालू करें**\n   अपनी दुकान को गूगल मैप्स पर निःशुल्क सूचीबद्ध करें ताकि रेलवे कॉलोनी के नए निवासी आपकी दुकान आसानी से खोज सकें।\n\n2. **व्हाट्सएप बिजनेस कैटलॉग बनाएं**\n   अपने 15 सबसे प्रमुख सामानों की दरें व्हाट्सएप प्रोफाइल में जोड़ें।\n\n3. **दुकान के बाहर यूपीआई क्यूआर बोर्ड लगाएं**\n   क्यूआर कोड को काउंटर के सामने रखें ताकि हर भुगतान डिजिटल रिकॉर्ड में दर्ज हो।\n\n4. **दैनिक बिक्री डायरी में लिखें**\n   दैनिक आय-व्यय दर्ज करने से आपके वित्तीय प्रबंधन अंक सुधरेंगे।\n\n5. **नियमित सप्लायर खरीद रिकॉर्ड रखें**\n   मिल और मंडी के बिल सुरक्षित रखें ताकि क्रेडिट रेटिंग मजबूत हो।\n\n**मैं सबसे पहले क्या करूँगा:**\n15 मिनट निकालकर अपने फोन पर गूगल बिजनेस प्रोफाइल और मैप्स पिन सेट करें। इससे आपका ग्रोथ स्कोर तुरंत 76/100 तक पहुँच सकता है।`
      : `**Your current Growth Score for ${bizName} is ${scoreVal}/100 (Good Potential). Your main-road access and daily UPI volume are strong, but missing Digital Presence is holding your score back from 76+.**\n\n1. **Set Up Google Maps Location Pin**\n   List your shop on Google Maps for free so new Railway Colony residents can discover your business easily.\n\n2. **Create a WhatsApp Business Catalog**\n   Add prices for your top 15 daily essential items to your WhatsApp profile for quick customer sharing.\n\n3. **Display Prominent UPI QR Signage**\n   Place your UPI QR code upfront at the counter to ensure all transactions build your verifiable credit score.\n\n4. **Record Daily Sales and Expenses**\n   Maintain a daily sales ledger to demonstrate proper financial management when applying for loans.\n\n5. **Keep Procurement Bills Organized**\n   Save wholesale receipts from Mohan Organic Mill to prove structured supply chain operations.\n\n**What I would do first:**\nTake 15 minutes today to pin your shop location on Google Maps. Completing your digital setup will raise your Growth Score to 76/100.`;
  }

  if (q.includes("task") || q.includes("today") || q.includes("आज") || q.includes("काम") || q.includes("focus") || q.includes("plan")) {
    return isHi
      ? `**आज आपकी सबसे महत्वपूर्ण प्राथमिकता व्हाट्सएप बिजनेस प्रोफाइल और गूगल मैप्स पिन पूरा करना है (अनुमानित समय: 15 मिनट)।**\n\n1. **आज का मुख्य कार्य (15 मिनट)**\n   व्हाट्सएप बिजनेस कैटलॉग में अपने 15 प्रमुख किराना सामानों की रेट लिस्ट अपडेट करें।\n\n2. **शाम का कार्य (20 मिनट)**\n   रेलवे कॉलोनी के नियमित ग्राहकों को व्हाट्सएप पर दैनिक आवश्यक वस्तुओं की लिस्ट भेजें।\n\n3. **इस सप्ताह का लक्ष्य**\n   पास की रेलवे कॉलोनी में 50 होम डिलीवरी पर्चे बांटे।\n\n4. **इस महीने का वित्तीय कार्य**\n   पीएम स्वनिधि योजना का निःशुल्क आवेदन पास के सीएससी केंद्र पर जमा करें।\n\n5. **प्रगति स्थिति**\n   आपने अपने 30-दिवसीय प्लान के 12 में से 5 कार्य पूरे कर लिए हैं।\n\n**मैं सबसे पहले क्या करूँगा:**\nदुकान खोलने से पहले आज व्हाट्सएप कैटलॉग में 15 सामानों की रेट लिस्ट डालें।`
      : `**Your single highest-priority task for today at ${bizName} is completing your WhatsApp Business Profile and setting your Google Maps location pin (estimated time: 15 mins).**\n\n1. **Today's Primary Task (15 mins)**\n   Update your WhatsApp Business catalog with prices for your top 15 fast-moving daily essential items.\n\n2. **Evening Outreach Task (20 mins)**\n   Share your catalog link with 20 regular customers residing in Railway Colony.\n\n3. **Weekly Goal**\n   Distribute 50 home delivery flyers to neighborhood residential units.\n\n4. **Monthly Financial Goal**\n   Submit your PM SVANidhi loan application at the local Common Service Centre (CSC).\n\n5. **Plan Progress Status**\n   You have successfully completed 5 out of 12 planned action steps for this month.\n\n**What I would do first:**\nUpdate your 15 catalog items on WhatsApp before opening shop today to enable regular customers to place phone orders immediately.`;
  }

  return isHi
    ? `**रामपुर में ${bizName} के बिज़नेस प्रोफाइल के आधार पर, आपकी दुकान पास के ग्राहकों की पकड़ और सीधी खरीद से मुनाफा बढ़ाने के लिए सही स्थिति में है।**\n\n1. **निजी डिलीवरी शुरू करें**\n   रेलवे कॉलोनी के परिवारों के लिए शाम 5-8 बजे ₹300 से अधिक के ऑर्डर पर फ्री डिलीवरी दें।\n\n2. **सीधे उत्पादकों से खरीद करें**\n   मोहन ऑर्गेनिक मिल से सीधे 50kg दाल और तेल खरीदें ताकि 8-12% मंडी फीस बचे।\n\n3. **पीएम स्वनिधि लोन का उपयोग करें**\n   ₹10,000-₹50,000 कम लागत वाली कार्यशील पूंजी के लिए 7% ब्याज सब्सिडी वाले लोन का आवेदन दें।\n\n4. **डिजिटल उपस्थिति मजबूत करें**\n   व्हाट्सएप बिजनेस कैटलॉग और गूगल मैप्स पिन सेट करके नए ग्राहकों को आकर्षित करें।\n\n5. **दैनिक बहीखाता चालू रखें**\n   आय और खर्च रोजाना दर्ज करें ताकि नकदी प्रबंधन सुरक्षित रहे।\n\n**मैं सबसे पहले क्या करूँगा:**\nअपने 30-दिवसीय प्लान के सप्ताह 1 के कार्यों से शुरुआत करें और व्हाट्सएप कैटलॉग तुरंत चालू करें।`
    : `**Based on your business profile for ${bizName} in Rampur, your shop is well-positioned to increase monthly profits by strengthening local customer convenience and direct mill procurement.**\n\n1. **Launch Scheduled Evening Delivery**\n   Offer free delivery for orders above ₹300 between 5 PM and 8 PM for Railway Colony families.\n\n2. **Procure Directly from Local Mills**\n   Buy 50kg grain and oil bags directly from Mohan Organic Mill (2.4 km away) to cut mandi fees by 8–12%.\n\n3. **Utilize Government Credit Support**\n   Apply for the PM SVANidhi scheme to access ₹10,000–₹50,000 working capital with a 7% interest subsidy.\n\n4. **Establish Digital Presence**\n   Set up your WhatsApp catalog and Google Maps pin to attract new residential customers.\n\n5. **Maintain Daily Cash Records**\n   Track daily sales and small expenses in a ledger to ensure steady cash flow.\n\n**What I would do first:**\nStart executing Week 1 of your 30-Day Action Plan by activating your WhatsApp catalog today.`;
}

function buildOptimizedUserContextString(data: any, question: string): string {
  const bp = data.businessProfile || {};
  const gs = data.growthScore || {};
  const gaps = data.marketGaps || [];
  const plan = data.actionPlan || {};
  const localBiz = data.localBusinesses || [];
  const zones = data.opportunityZones || [];

  const lowerQ = (question || "").toLowerCase();

  // Basic Profile (always included)
  let context = `BUSINESS PROFILE & DNA:
- Business Name: ${bp.businessName || "Ramesh Kirana & Daily Needs"}
- Category & Location: ${bp.category || "Grocery & Daily Needs"}, ${bp.location || "Rampur"}
- Owner / Contact: ${bp.contactPerson || bp.ownerName || "Ramesh Kumar"}
- Business Size & Structure: ${bp.businessSize || "Micro Enterprise (1-2 employees)"}, Udyam Registered
- Core Products: ${Array.isArray(bp.productsServices) ? bp.productsServices.join(", ") : "Grains, pulses, edible oils, daily essentials"}`;

  // Domain slices based on query
  const isScoreQ = lowerQ.includes("score") || lowerQ.includes("growth") || lowerQ.includes("rating") || lowerQ.includes("76") || lowerQ.includes("68");
  const isFinanceQ = lowerQ.includes("scheme") || lowerQ.includes("loan") || lowerQ.includes("svanidhi") || lowerQ.includes("mudra") || lowerQ.includes("finance") || lowerQ.includes("afford") || lowerQ.includes("cost") || lowerQ.includes("money") || lowerQ.includes("repay");
  const isTaskQ = lowerQ.includes("task") || lowerQ.includes("today") || lowerQ.includes("plan") || lowerQ.includes("do") || lowerQ.includes("focus") || lowerQ.includes("next");
  const isOppQ = lowerQ.includes("customer") || lowerQ.includes("opportunity") || lowerQ.includes("gap") || lowerQ.includes("delivery") || lowerQ.includes("whatsapp") || lowerQ.includes("supplier") || lowerQ.includes("mandi") || lowerQ.includes("nearby");

  if (isScoreQ || (!isFinanceQ && !isTaskQ && !isOppQ)) {
    context += `\n\nGROWTH SCORE ANALYSIS:
- Overall Score: ${gs.overall ? `${gs.overall}/100 (${gs.label || "Good Potential"})` : "68/100 (Good Potential)"}
- Month-over-Month Change: +${gs.monthChange || 8} points
- Key Strengths: ${Array.isArray(gs.strengths) ? gs.strengths.join("; ") : "Prime market road location, high repeat customer retention, clean UPI history"}
- Top Opportunity to Reach 76+: ${gs.biggestImprovement ? `${gs.biggestImprovement.factorName}: ${gs.biggestImprovement.description}` : "Digital Presence & Google Maps listing"}`;
  }

  if (isFinanceQ || (!isScoreQ && !isTaskQ && !isOppQ)) {
    context += `\n\nFINANCIAL & GOVERNMENT SCHEME MATCH:
- Registration Status: Udyam Registered Micro Enterprise
- Payment Infrastructure: Active daily UPI QR transactions with zero default history
- Matched Government Schemes:
  1. PM SVANidhi Scheme: ₹10,000 to ₹50,000 working capital loan with 7% interest subsidy and UPI cashback rewards.
  2. Pradhan Mantri Mudra Yojana (Shishu): Collateral-free credit up to ₹50,000 for inventory expansion.`;
  }

  if (isTaskQ || (!isScoreQ && !isFinanceQ && !isOppQ)) {
    const todayTask = plan.actionForToday ? `${plan.actionForToday.title} (${plan.actionForToday.estimatedTime || "15 mins"})` : "Share weekly WhatsApp price list";
    context += `\n\n30-DAY ACTION PLAN:
- Month Focus Goal: ${plan.monthFocus || "Improve local customer reach & direct procurement margin"}
- Action For Today: ${todayTask}
- Task Progress: ${plan.completedTasksCount || 5}/${plan.totalTasksCount || 12} tasks completed`;
  }

  if (isOppQ || (!isScoreQ && !isFinanceQ && !isTaskQ)) {
    const topGap = Array.isArray(gaps) && gaps.length > 0 ? `${gaps[0].title}: ${gaps[0].shortExplanation || gaps[0].description}` : "Home Delivery & WhatsApp ordering gap in Railway Colony";
    context += `\n\nLOCAL MARKET & COMPETITION ANALYSIS:
- Top Opportunity: ${topGap}
- Nearby Ecosystem Partners: ${Array.isArray(localBiz) && localBiz.length > 0 ? localBiz.slice(0, 2).map((b: any) => `${b.name} (${b.type})`).join("; ") : "Mohan Organic Mill (Supplier, 2.4 km), Shanti Hostel (B2B Customer)"}`;
  }

  return context;
}

// Advisor conversational query endpoint
app.post("/api/advisor/chat", async (req, res) => {
  try {
    const { question, history = [], language = "en", stream = false } = req.body;

    if (!question) {
      res.status(400).json({ error: "Question is required" });
      return;
    }

    const ai = getAIClient();

    if (ai) {
      const userContextText = buildOptimizedUserContextString(req.body, question);

      let historyText = "";
      if (Array.isArray(history) && history.length > 0) {
        // Keep last 6 recent history turns for fast processing
        historyText =
          "\nRECENT CONVERSATION HISTORY:\n" +
          history
            .slice(-6)
            .map(
              (m: any) =>
                `${m.sender === "user" ? "User" : "Advisor"}: ${m.text}`
            )
            .join("\n") +
          "\n";
      }

      const lowerQ = question.toLowerCase();
      const isBrief = /\b(brief|short|in short|quickly|just tell me|tldr|tl;dr)\b/i.test(lowerQ);
      const isDetailed = /\b(detail|detailed|explain|full plan|why|everything)\b/i.test(lowerQ);

      const lengthGuidance = isBrief
        ? "EXPLICIT SHORT REQUEST: Provide 2 to 4 short bullet points and a 1-sentence practical conclusion (~40-80 words)."
        : isDetailed
        ? "EXPLICIT DETAILED REQUEST: Provide a comprehensive multi-section breakdown with 8+ detailed action steps and clear reasoning (~250-400 words)."
        : "NORMAL BUSINESS QUESTION: Provide a FULL, PROPER, HUMAN-ADVISOR answer (5 to 8 detailed action points with explanations, ending with a 'What I would do first:' conclusion, ~120-220 words). DO NOT give generic one-line answers.";

      const maxOutputTokens = isBrief ? 300 : isDetailed ? 1200 : 1000;

      const fullPrompt = `${userContextText}
${historyText}
CURRENT USER QUESTION: "${question}"
RESPONSE LANGUAGE: ${
        language === "hi"
          ? "Hindi (Devanagari script, simple spoken style using 'आप', 'सुझाव')"
          : "Simple, plain, clear English suitable for small business owners"
      }
REQUIREMENT: ${lengthGuidance} Answer directly in the first sentence. No filler intros or repeated greetings.`;

      const isStreamRequested = stream === true || req.headers.accept === "text/event-stream";

      if (isStreamRequested) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const streamingCandidateModels = [
          "gemini-2.5-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash",
        ];

        let streamedSuccess = false;

        for (const modelName of streamingCandidateModels) {
          try {
            const responseStream = await ai.models.generateContentStream({
              model: modelName,
              contents: fullPrompt,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.2,
                maxOutputTokens,
              },
            });

            let fullAccumulated = "";
            let hasWrittenValidContent = false;

            for await (const chunk of responseStream) {
              if (chunk.text) {
                fullAccumulated += chunk.text;
                const clean = sanitizeAdvisorText(fullAccumulated);
                if (clean) {
                  hasWrittenValidContent = true;
                  res.write(`data: ${JSON.stringify({ text: chunk.text, fullText: clean })}\n\n`);
                }
              }
            }

            if (hasWrittenValidContent) {
              streamedSuccess = true;
              res.write("data: [DONE]\n\n");
              res.end();
              return;
            }
          } catch (streamErr: any) {
            console.warn(`Streaming model ${modelName} call failed, trying next:`, streamErr?.message || streamErr);
          }
        }

        if (!streamedSuccess) {
          // Send grounded fallback answer as SSE chunk
          const fallback = getGroundedFallbackAnswer(question, language, req.body);
          res.write(`data: ${JSON.stringify({ text: fallback })}\n\n`);
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        }
      }

      try {
        let responseText = "";
        const candidateModels = [
          "gemini-2.5-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash",
          "gemini-1.5-pro",
        ];

        for (const modelName of candidateModels) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: fullPrompt,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.2,
                maxOutputTokens,
              },
            });
            if (response && response.text) {
              const sanitized = sanitizeAdvisorText(response.text);
              if (sanitized) {
                responseText = sanitized;
                break;
              }
            }
          } catch (modelErr: any) {
            console.warn(`Model ${modelName} call failed, trying fallback:`, modelErr?.message || modelErr);
          }
        }

        if (responseText) {
          res.json({
            answer: responseText,
            source: "gemini-api",
          });
          return;
        }
      } catch (geminiErr: any) {
        console.error("Gemini API call failed:", geminiErr?.message || geminiErr);
      }
    }

    // Grounded fallback if GEMINI_API_KEY is missing or Gemini call returned empty/error
    const fallbackAnswer = getGroundedFallbackAnswer(question, language, req.body);

    res.json({
      answer: fallbackAnswer,
      source: "grounded-intelligence-engine",
    });
  } catch (error: any) {
    console.error("Advisor chat endpoint error:", error);
    res.status(500).json({
      answer: getGroundedFallbackAnswer(req.body?.question || "", req.body?.language || "en", req.body),
      source: "server-error-fallback",
    });
  }
});

// Start server with Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VyaparSetu Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
