import React from "react";
import { NavTab } from "./AppShell";
import {
  BusinessProfile,
  GrowthScore,
  MarketGap,
  ActionPlan,
  Language,
} from "../types";
import { mockNearbyBusinesses, mockOpportunityZones } from "../data/mockData";
import { translations } from "../data/translations";
import { RealMarketMap } from "./RealMarketMap";
import {
  Check,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  MapPin,
  Compass,
  CalendarCheck2,
  Users2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface OverviewDashboardProps {
  businessProfile: BusinessProfile;
  growthScore: GrowthScore;
  marketGaps: MarketGap[];
  actionPlan: ActionPlan;
  userName: string;
  language: Language;
  onNavigateTab: (tab: NavTab) => void;
  onSelectTask: (taskId: string) => void;
}

const AnimatedGrowthScoreRing: React.FC<{ targetScore: number }> = ({ targetScore }) => {
  const [currentScore, setCurrentScore] = React.useState(0);

  React.useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCurrentScore(targetScore);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const val = Math.round(easedProgress * targetScore);
      setCurrentScore(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const handle = requestAnimationFrame(step);
    return () => cancelAnimationFrame(handle);
  }, [targetScore]);

  const size = 80;
  const strokeWidth = 6;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center my-1.5">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E6DED7"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress Segment */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#014D4E"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      {/* Centered Score Number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-heading text-2xl font-extrabold text-[#014D4E] leading-none">
          {currentScore}
        </span>
        <span className="font-sans text-[10px] font-bold text-[#526671] leading-tight">
          /100
        </span>
      </div>
    </div>
  );
};

const AnimatedActiveTasksRing: React.FC<{
  completedCount: number;
  totalCount: number;
}> = ({ completedCount, totalCount }) => {
  const [currentCount, setCurrentCount] = React.useState(0);

  React.useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCurrentCount(completedCount);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const val = Math.round(easedProgress * completedCount);
      setCurrentCount(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const handle = requestAnimationFrame(step);
    return () => cancelAnimationFrame(handle);
  }, [completedCount]);

  const size = 80;
  const strokeWidth = 6;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const percentage = totalCount > 0 ? currentCount / totalCount : 0;
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <div className="relative flex items-center justify-center my-1.5">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E6DED7"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#2E8B57"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-heading text-xl font-extrabold text-[#172B35] leading-none">
          {currentCount}
        </span>
        <span className="font-sans text-[10px] font-bold text-[#526671] leading-tight">
          /{totalCount}
        </span>
      </div>
    </div>
  );
};

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  businessProfile,
  growthScore,
  marketGaps,
  actionPlan,
  userName,
  language,
  onNavigateTab,
  onSelectTask,
}) => {
  const t = translations[language] || translations.en;
  const topOpportunity = marketGaps[0] || {
    title: "High demand for home delivery & phone orders",
  };

  const journeySteps: {
    id: NavTab;
    label: string;
    status: "Complete" | "In Progress" | "Pending";
  }[] = [
    { id: "business-dna", label: "Business DNA", status: "Complete" },
    { id: "market-scan", label: "Market Scan", status: "Complete" },
    { id: "growth-score", label: "Growth Score", status: "Complete" },
    { id: "opportunities", label: "Opportunities", status: "In Progress" },
    { id: "advisor", label: "AI Advisor", status: "Pending" },
    { id: "action-plan", label: "30-Day Plan", status: "Pending" },
  ];

  const lastActiveIndex = journeySteps.reduce((acc, step, idx) => {
    if (step.status === "Complete" || step.status === "In Progress") return idx;
    return acc;
  }, 0);

  const completedStepCount = journeySteps.filter((s) => s.status === "Complete").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 4 Key Dashboard Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 items-stretch">
        {/* Card 1: Growth Score */}
        <div
          onClick={() => onNavigateTab("growth-score")}
          className="bg-white rounded-xl border border-[#E6DED7] p-5 hover:border-[#014D4E]/40 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group h-full"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-extrabold uppercase tracking-wider text-[#014D4E]">
                {t.growthScoreLabel}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#014D4E]/10 border border-[#014D4E]/20 flex items-center justify-center shrink-0 group-hover:bg-[#014D4E] group-hover:text-white transition-colors">
                <TrendingUp className="w-4 h-4 text-[#014D4E] group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-1">
              <AnimatedGrowthScoreRing targetScore={growthScore.overall} />
              <div className="font-sans text-xs font-bold text-[#014D4E] mt-0.5">
                {growthScore.label}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E6DED7] w-full flex items-center justify-between font-sans text-[11px]">
            <span className="text-[#2E8B57] font-bold">↑ {growthScore.monthChange} pts</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#014D4E] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Active Tasks */}
        <div
          onClick={() => onNavigateTab("action-plan")}
          className="bg-white rounded-xl border border-[#E6DED7] p-5 hover:border-[#2E8B57]/40 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group h-full"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-extrabold uppercase tracking-wider text-[#2E8B57]">
                {t.activeTasksLabel}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#2E8B57]/10 border border-[#2E8B57]/20 flex items-center justify-center shrink-0 group-hover:bg-[#2E8B57] group-hover:text-white transition-colors">
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-1">
              <AnimatedActiveTasksRing
                completedCount={actionPlan.completedTasksCount}
                totalCount={actionPlan.totalTasksCount}
              />
              <div className="font-sans text-xs font-bold text-[#526671] mt-0.5">
                {t.btnComplete}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E6DED7] w-full flex items-center justify-between font-sans text-[11px]">
            <span className="text-[#2E8B57] font-bold">{t.viewTasks}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#2E8B57] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Top Opportunity */}
        <div
          onClick={() => onNavigateTab("opportunities")}
          className="bg-white rounded-xl border border-[#E6DED7] p-5 hover:border-[#8C6200]/40 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group h-full"
        >
          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-[11px] font-extrabold uppercase tracking-wider text-[#8C6200] flex items-center gap-1">
                  ✦ {t.topOpportunityLabel}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F4C430]/60 flex items-center justify-center shrink-0 group-hover:bg-[#F4C430] transition-colors">
                  <Lightbulb className="w-4 h-4 text-[#8C6200] group-hover:text-[#013738] transition-colors" />
                </div>
              </div>

              <h3 className="font-heading text-xs sm:text-sm font-bold text-[#172B35] leading-snug line-clamp-2 mt-1">
                {topOpportunity.title}
              </h3>

              <p className="font-sans text-[11px] sm:text-xs text-[#526671] leading-relaxed line-clamp-2 mt-1.5 font-medium">
                {topOpportunity.shortExplanation || topOpportunity.whyItMatters || "Identified market opportunity for your business."}
              </p>
            </div>

            <div className="mt-2.5 pt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF9E6] text-[#8C6200] border border-[#F4C430]/40">
                {topOpportunity.impactLevel
                  ? `Impact: ${topOpportunity.impactLevel}`
                  : topOpportunity.type === "government_scheme"
                  ? "Government Scheme"
                  : "High Priority"}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E6DED7] w-full flex items-center justify-between font-sans text-[11px] text-[#8C6200] font-bold">
            <span>{t.exploreOpportunity}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8C6200] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Recommended Action */}
        <div
          onClick={() => onNavigateTab("action-plan")}
          className="bg-white rounded-xl border border-[#E6DED7] p-5 hover:border-[#014D4E]/40 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between group h-full"
        >
          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-[11px] font-extrabold uppercase tracking-wider text-[#014D4E] flex items-center gap-1">
                  ✓ {t.recommendedActionLabel}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#014D4E]/10 border border-[#014D4E]/20 flex items-center justify-center shrink-0 group-hover:bg-[#014D4E] group-hover:text-white transition-colors">
                  <CalendarCheck2 className="w-4 h-4 text-[#014D4E] group-hover:text-white transition-colors" />
                </div>
              </div>

              <h3 className="font-heading text-xs sm:text-sm font-bold text-[#172B35] leading-snug line-clamp-2 mt-1">
                {actionPlan.actionForToday?.title || "Improve digital presence to reach local customers"}
              </h3>

              <p className="font-sans text-[11px] sm:text-xs text-[#526671] leading-relaxed line-clamp-2 mt-1.5 font-medium">
                {actionPlan.actionForToday?.whyItMatters || "Key focus step from your 30-Day Action Plan."}
              </p>
            </div>

            <div className="mt-2.5 pt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#E6F4F1] text-[#014D4E] border border-[#014D4E]/20">
                {actionPlan.actionForToday?.estimatedTime
                  ? `Est. Time: ${actionPlan.actionForToday.estimatedTime}`
                  : "Next Best Step"}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E6DED7] w-full flex items-center justify-between font-sans text-[11px] text-[#014D4E] font-bold">
            <span>{t.btnStartTask} →</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#014D4E] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 4. ROW 2: YOUR BUSINESS JOURNEY HORIZONTAL PROGRESS TIMELINE */}
      <div className="bg-white rounded-xl border border-[#E6DED7] p-5 sm:p-6 shadow-xs hover:border-[#014D4E]/30 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#014D4E]" />
            <h2 className="font-heading text-base sm:text-lg font-bold text-[#172B35]">
              {t.journeyTitle}
            </h2>
          </div>
          <span className="font-sans text-xs font-bold text-[#014D4E] bg-[#014D4E]/10 px-3 py-1 rounded-full border border-[#014D4E]/20">
            {completedStepCount} of {journeySteps.length} Stages Completed
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-none no-scrollbar py-2">
          <div className="relative min-w-[640px] sm:min-w-0 px-4">
            {/* Base Horizontal Connecting Line */}
            <div className="absolute top-4 left-10 right-10 h-0.5 bg-[#E6DED7] z-0" />
            {/* Active Progress Line Overlay */}
            <div
              className="absolute top-4 left-10 h-0.5 bg-[#014D4E] z-0 transition-all duration-500 ease-in-out"
              style={{
                width: `calc(${
                  (lastActiveIndex / (journeySteps.length - 1)) * 100
                }% - 0.5rem)`,
              }}
            />

            <div className="relative z-10 grid grid-cols-6 gap-2">
              {journeySteps.map((step) => {
                const isComplete = step.status === "Complete";
                const isInProgress = step.status === "In Progress";

                return (
                  <button
                    key={step.id}
                    onClick={() => onNavigateTab(step.id)}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    {/* Circle Node Indicator */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isComplete
                          ? "bg-[#014D4E] text-white border-2 border-[#014D4E] shadow-xs group-hover:scale-110"
                          : isInProgress
                          ? "bg-[#FFF9E6] text-[#013738] border-2 border-[#F4C430] ring-4 ring-[#F4C430]/25 shadow-xs group-hover:scale-110"
                          : "bg-white text-[#94A3B8] border-2 border-[#E6DED7] group-hover:border-[#014D4E]/50"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-4 h-4 text-white stroke-[2.5]" />
                      ) : isInProgress ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8C6200] animate-ping" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                      )}
                    </div>

                    {/* Step Title Label */}
                    <div
                      className={`font-heading text-xs mt-2.5 transition-colors ${
                        isComplete
                          ? "font-bold text-[#172B35] group-hover:text-[#014D4E]"
                          : isInProgress
                          ? "font-extrabold text-[#014D4E]"
                          : "font-medium text-[#60727A] group-hover:text-[#172B35]"
                      }`}
                    >
                      {step.label}
                    </div>

                    {/* Step Status Badge */}
                    <span
                      className={`font-sans text-[11px] font-bold mt-0.5 ${
                        isComplete
                          ? "text-[#2E8B57]"
                          : isInProgress
                          ? "text-[#8C6200]"
                          : "text-[#94A3B8]"
                      }`}
                    >
                      {step.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 5. ROW 3: LOCAL MARKET SNAPSHOT (MAP PREVIEW + STATS ON RIGHT) */}
      <div className="bg-white rounded-xl border border-[#E6DED7] p-5 shadow-xs hover:border-[#014D4E]/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-heading text-base sm:text-lg font-bold text-[#172B35] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#014D4E]" />
              <span>Local Market Snapshot</span>
            </h2>
            <p className="font-sans text-xs text-[#526671]">
              Live ecosystem signals within 3 km of {businessProfile.location.split(",")[0]}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab("market-scan")}
            className="font-sans text-xs font-bold text-[#014D4E] hover:text-[#013738] flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Open Full Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8C6200]" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Real Interactive Map Canvas */}
          <div
            onClick={() => onNavigateTab("market-scan")}
            className="lg:col-span-8 cursor-pointer relative group rounded-xl overflow-hidden border border-[#E6DED7]"
          >
            <RealMarketMap
              businessProfile={businessProfile}
              localBusinesses={mockNearbyBusinesses}
              opportunityZones={mockOpportunityZones}
              selectedRadius={3}
              heightClass="h-64 sm:h-72"
              showLegend={true}
            />
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-md font-sans text-xs font-bold text-[#014D4E] shadow-md border border-[#E6DED7] group-hover:bg-[#014D4E] group-hover:text-white transition-colors z-[1000]">
              Click to Explore 3km Radius Map →
            </div>
          </div>

          {/* Right: Around Your Business Numbers */}
          <div className="lg:col-span-4 space-y-3">
            <div className="font-sans text-xs font-bold uppercase tracking-wider text-[#526671] mb-1">
              Around Your Business
            </div>

            <div
              onClick={() => onNavigateTab("market-scan")}
              className="p-3 bg-[#F8F3EE] hover:bg-white hover:-translate-y-0.5 rounded-xl border border-[#E6DED7] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E6DED7] flex items-center justify-center text-[#014D4E]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading text-base font-extrabold text-[#172B35]">18</div>
                  <div className="font-sans text-xs text-[#526671] font-medium">Similar Businesses</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#526671]" />
            </div>

            <div
              onClick={() => onNavigateTab("community")}
              className="p-3 bg-[#F8F3EE] hover:bg-white hover:-translate-y-0.5 rounded-xl border border-[#E6DED7] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E6DED7] flex items-center justify-center text-[#8C6200]">
                  <Users2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading text-base font-extrabold text-[#172B35]">7</div>
                  <div className="font-sans text-xs text-[#526671] font-medium">Potential Partners</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#526671]" />
            </div>

            <div
              onClick={() => onNavigateTab("opportunities")}
              className="p-3 bg-[#F8F3EE] hover:bg-white hover:-translate-y-0.5 rounded-xl border border-[#E6DED7] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E6DED7] flex items-center justify-center text-[#8C6200]">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading text-base font-extrabold text-[#172B35]">2</div>
                  <div className="font-sans text-xs text-[#526671] font-medium">Opportunity Zones</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#526671]" />
            </div>

            <div className="p-3 bg-[#2E8B57]/5 rounded-xl border border-[#2E8B57]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2E8B57]/10 flex items-center justify-center text-[#2E8B57]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading text-xs font-bold text-[#2E8B57]">High Demand</div>
                  <div className="font-sans text-[11px] text-[#526671] font-medium">Local Daily Groceries</div>
                </div>
              </div>
              <span className="font-sans text-[10px] font-bold text-[#2E8B57] bg-[#2E8B57]/10 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. ROW 4: RECENT INSIGHTS & BUSINESS ADVISOR TIP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Insights Feed */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E6DED7] p-5 shadow-xs space-y-3 hover:border-[#014D4E]/30 transition-colors">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-heading text-sm font-bold text-[#172B35]">Recent Insights</h3>
            <span className="font-sans text-[11px] text-[#526671]">Updated 1 hour ago</span>
          </div>

          <div
            onClick={() => onNavigateTab("opportunities")}
            className="p-3 rounded-lg bg-[#F8F3EE] hover:bg-white hover:-translate-y-0.5 border border-[#E6DED7] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#2E8B57]" />
              <span className="font-sans text-xs text-[#172B35] font-semibold">
                Demand for your products is 32% higher in the next 3 km area.
              </span>
            </div>
            <span className="font-sans text-[10px] font-bold text-[#2E8B57] bg-[#2E8B57]/10 px-2 py-0.5 rounded shrink-0">
              High Opportunity
            </span>
          </div>

          <div
            onClick={() => onNavigateTab("community")}
            className="p-3 rounded-lg bg-[#F8F3EE] hover:bg-white hover:-translate-y-0.5 border border-[#E6DED7] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#014D4E]" />
              <span className="font-sans text-xs text-[#172B35] font-semibold">
                You can connect with 3 raw material suppliers nearby.
              </span>
            </div>
            <span className="font-sans text-[10px] font-bold text-[#014D4E] bg-[#014D4E]/10 px-2 py-0.5 rounded shrink-0">
              Network
            </span>
          </div>

          <div
            onClick={() => onNavigateTab("opportunities")}
            className="p-3 rounded-lg bg-[#F8F3EE] hover:bg-white hover:-translate-y-0.5 border border-[#E6DED7] flex items-center justify-between cursor-pointer transition-all duration-200 shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#F4C430]" />
              <span className="font-sans text-xs text-[#172B35] font-semibold">
                You may be eligible for 2 government support schemes (PM SVANidhi).
              </span>
            </div>
            <span className="font-sans text-[10px] font-bold text-[#8C6200] bg-[#FFF9E6] px-2 py-0.5 rounded shrink-0">
              Check Now
            </span>
          </div>
        </div>

        {/* Right: Business Advisor Tip Box */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#014D4E]/5 via-[#FFFDFC] to-[#014D4E]/10 rounded-xl border border-[#014D4E]/20 p-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-heading text-xs font-bold text-[#014D4E]">
              <Sparkles className="w-4 h-4 text-[#8C6200]" />
              <span>Business Advisor Tip</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#172B35] font-medium leading-relaxed">
              “Consider adding home delivery service. 65% of growing similar businesses in your area offer phone ordering.”
            </p>
          </div>

          <div className="pt-4 mt-2 border-t border-[#014D4E]/20 flex items-center justify-between">
            <button
              onClick={() => onNavigateTab("advisor")}
              className="font-sans text-xs font-bold text-[#014D4E] hover:text-[#013738] flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Recommendation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C6200]" />
            </button>
            <span className="font-sans text-[10px] text-[#526671] font-medium">Grounded in local data</span>
          </div>
        </div>
      </div>

      {/* 7. ROW 5: YOUR 30-DAY PLAN PROGRESS (4 WEEKS PREVIEW WITH PROGRESS BARS) */}
      <div className="bg-white rounded-xl border border-[#E6DED7] p-5 shadow-xs hover:border-[#014D4E]/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-[#172B35]">Your 30-Day Plan Progress</h3>
            <p className="font-sans text-xs text-[#526671]">You're doing great! Keep going.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs font-bold text-[#014D4E]">
              {actionPlan.completedTasksCount} / {actionPlan.totalTasksCount} tasks completed
            </span>
            <button
              onClick={() => onNavigateTab("action-plan")}
              className="font-sans text-xs font-bold text-[#014D4E] hover:underline cursor-pointer"
            >
              Open Full Plan →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actionPlan.weeks.map((week) => {
            const completedCount = week.tasks.filter((t) => t.completed).length;
            const totalCount = week.tasks.length;
            const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

            return (
              <div
                key={week.weekNumber}
                className="bg-[#F8F3EE] hover:bg-white hover:-translate-y-0.5 rounded-xl border border-[#E6DED7] hover:border-[#014D4E]/30 p-4 flex flex-col justify-between space-y-3 transition-all duration-200 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-extrabold text-[#014D4E]">
                      Week {week.weekNumber}
                    </span>
                    <span className="font-sans text-[10px] font-bold text-[#526671]">
                      {completedCount}/{totalCount}
                    </span>
                  </div>
                  <div className="font-heading text-xs sm:text-sm font-extrabold text-[#172B35] mt-0.5">
                    {week.title.replace(`Week ${week.weekNumber}: `, "")}
                  </div>

                  {/* Task list preview */}
                  <div className="space-y-1.5 mt-2.5">
                    {week.tasks.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onSelectTask(task.id)}
                        className="flex items-center gap-2 font-sans text-[11px] text-[#172B35] cursor-pointer hover:text-[#014D4E]"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                        ) : (
                          <span className="w-3 h-3 rounded-full border border-[#526671] shrink-0" />
                        )}
                        <span className={`truncate ${task.completed ? "line-through text-[#526671]" : ""}`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-[#E6DED7]">
                  <div className="w-full bg-[#E6DED7] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#014D4E] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="font-sans text-[10px] font-bold text-[#526671] text-right">
                    {Math.round(progressPercent)}% Done
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
