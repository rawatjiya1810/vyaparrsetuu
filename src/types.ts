export type Language = "en" | "hi" | "ta" | "te" | "mr" | "bn";

export interface BusinessProfile {
  businessName: string;
  category: string;
  customCategory?: string;
  productsServices: string[];
  businessSize: "Micro (1-2 people)" | "Small (3-5 people)" | "Medium (6+ people)";
  location: string;
  pincode: string;
  coordinates: { lat: number; lng: number };
  targetCustomers: string[];
  discoveryChannels: string[];
  challenges: string[];
  notes?: string;
  documentAttached?: {
    name: string;
    type: string;
    extractedSnippet: string;
  };
}

export type BusinessCategory =
  | "Grocery & Daily Needs"
  | "Agriculture & Farm Produce"
  | "Handicrafts & Handlooms"
  | "Food & Sweet Stall"
  | "Apparel & Tailoring"
  | "Dairy & Poultry"
  | "Hardware & Electrical"
  | "Automotive Repair"
  | "General Trading & Services";

export interface LocalBusiness {
  id: string;
  name: string;
  category: string;
  type: "user" | "similar" | "complementary" | "supplier" | "customer";
  distanceKm: number;
  direction: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  contactPerson?: string;
  phone?: string;
  potentialConnection: string;
  whyUseful: string;
  potentialRelationship?: string;
  products?: string[];
  verified: boolean;
  hasDelivery: boolean;
  hasDigitalPresence: boolean;
}

export interface OpportunityZone {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  radiusMeters: number;
  description: string;
  demandFactor: "High" | "Medium" | "Very High";
  reason: string;
}

export interface MarketGap {
  id: string;
  title: string;
  type: "untapped_customer" | "service_gap" | "supplier_opportunity" | "government_scheme";
  category?: "Market Gap" | "Customer Gap" | "Supplier Gap" | "Government Scheme";
  shortExplanation: string;
  description?: string;
  evidence: string[];
  whyItMatters: string;
  potentialAction: string;
  potentialRevenue?: string;
  confidence?: number;
  impactLevel: "High" | "Medium-High" | "Medium";
  impact?: "High" | "Medium" | "Low";
  actionSteps?: string[];
  schemeDetails?: {
    schemeName: string;
    ministry: string;
    benefitAmount: string;
    subsidyPercent?: string;
    eligibilityCheck: string;
    documentsRequired: string[];
  };
}

export interface FactorScore {
  name: string;
  score: number;
  maxScore: number;
  statusText: string;
  description: string;
}

export interface GrowthScore {
  overall: number;
  label: string;
  monthChange: number;
  factors: {
    localMarket: FactorScore;
    customerReach: FactorScore;
    digitalPresence: FactorScore;
    financialReadiness: FactorScore;
    supportAccess: FactorScore;
  };
  strengths: string[];
  biggestImprovement: {
    factorName: string;
    score: number;
    description: string;
    recommendedStep: string;
  };
  biggestImprovementArea?: string;
}

export interface PriorityAction {
  id: string;
  orderNumber: string;
  title: string;
  why: string;
  potentialImpact: string;
  actionType: "digital" | "community" | "scheme" | "inventory";
  targetModule?: string;
}

export interface PlanTask {
  id: string;
  week: 1 | 2 | 3 | 4;
  title: string;
  whyItMatters: string;
  estimatedTime: string;
  difficulty: "Easy" | "Moderate" | "Action Required";
  expectedOutcome: string;
  completed: boolean;
  actionGuidance: string[];
  actionSteps?: string[];
  description?: string;
  estimatedMinutes?: number;
}

export type ActionTask = PlanTask;

export interface ActionPlan {
  monthFocus: string;
  completedTasksCount: number;
  totalTasksCount: number;
  actionForToday: PlanTask;
  weeks: {
    weekNumber: 1 | 2 | 3 | 4;
    title: string;
    goal?: string;
    theme: string;
    tasks: PlanTask[];
  }[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  timestamp?: string;
  time?: string;
  source?: string;
}
