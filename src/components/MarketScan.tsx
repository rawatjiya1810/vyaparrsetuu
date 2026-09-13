import React, { useState } from "react";
import {
  LocalBusiness,
  OpportunityZone,
  MarketGap,
  BusinessProfile,
  Language,
} from "../types";
import { translations } from "../data/translations";
import { RealMarketMap } from "./RealMarketMap";
import {
  MapPin,
  Sparkles,
  ArrowRight,
  MessageSquare,
  X,
  Target,
  Compass,
} from "lucide-react";

interface MarketScanProps {
  businessProfile: BusinessProfile;
  localBusinesses: LocalBusiness[];
  opportunityZones: OpportunityZone[];
  marketGaps: MarketGap[];
  language?: Language;
  onOpenConnectModal: (business: LocalBusiness) => void;
  onExploreOpportunity: (gap: MarketGap) => void;
}

export const MarketScan: React.FC<MarketScanProps> = ({
  businessProfile,
  localBusinesses = [],
  opportunityZones = [],
  marketGaps = [],
  language = "en",
  onOpenConnectModal,
  onExploreOpportunity,
}) => {
  const isHi = language === "hi";
  const [selectedRadius, setSelectedRadius] = useState<number>(3);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "similar" | "complementary" | "supplier" | "customer"
  >("all");
  const [selectedBusiness, setSelectedBusiness] = useState<LocalBusiness | null>(
    localBusinesses[0] || null
  );
  const [activeZone, setActiveZone] = useState<OpportunityZone | null>(null);

  // Filter businesses by radius and type/category
  const filteredBusinesses = localBusinesses.filter((b) => {
    if (b.type === "user") return false;
    const matchesRadius = b.distanceKm <= selectedRadius;
    const matchesCategory =
      selectedCategory === "all" || b.type === selectedCategory;
    return matchesRadius && matchesCategory;
  });

  const categoryCounts = {
    all: localBusinesses.filter((b) => b.type !== "user" && b.distanceKm <= selectedRadius).length,
    similar: localBusinesses.filter(
      (b) => b.type === "similar" && b.distanceKm <= selectedRadius
    ).length,
    complementary: localBusinesses.filter(
      (b) => b.type === "complementary" && b.distanceKm <= selectedRadius
    ).length,
    supplier: localBusinesses.filter(
      (b) => b.type === "supplier" && b.distanceKm <= selectedRadius
    ).length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E6DED7]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#014D4E]/10 text-[#014D4E] text-xs font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#014D4E]" />
            <span>Hyperlocal Market Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Market Scan: {businessProfile.location?.split(",")[0] || "Rampur"}
          </h1>
          <p className="text-xs sm:text-sm text-[#60727A]">
            Discover nearby businesses, supplier linkages, and high-demand opportunity zones.
          </p>
        </div>

        {/* Radius Toggle Buttons */}
        <div className="flex items-center gap-1 bg-[#F8F3EE] p-1 rounded-xl border border-[#E6DED7] self-start sm:self-auto">
          <span className="text-[11px] font-bold text-[#60727A] px-2">Radius:</span>
          {[1, 3, 5, 10].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRadius(r)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedRadius === r
                  ? "bg-[#014D4E] text-white shadow-xs"
                  : "text-[#172B35] hover:bg-white/80"
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            selectedCategory === "all"
              ? "bg-[#014D4E] text-white border-[#014D4E]"
              : "bg-white text-[#172B35] border-[#E6DED7] hover:bg-[#F8F3EE]"
          }`}
        >
          All Businesses ({categoryCounts.all})
        </button>

        <button
          onClick={() => setSelectedCategory("similar")}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            selectedCategory === "similar"
              ? "bg-[#60727A] text-white border-[#60727A]"
              : "bg-white text-[#172B35] border-[#E6DED7] hover:bg-[#F8F3EE]"
          }`}
        >
          Similar Stores ({categoryCounts.similar})
        </button>

        <button
          onClick={() => setSelectedCategory("complementary")}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            selectedCategory === "complementary"
              ? "bg-[#F4C430] text-[#013738] border-[#F4C430] font-bold"
              : "bg-white text-[#172B35] border-[#E6DED7] hover:bg-[#F8F3EE]"
          }`}
        >
          Complementary Partners ({categoryCounts.complementary})
        </button>

        <button
          onClick={() => setSelectedCategory("supplier")}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
            selectedCategory === "supplier"
              ? "bg-[#2E8B57] text-white border-[#2E8B57]"
              : "bg-white text-[#172B35] border-[#E6DED7] hover:bg-[#F8F3EE]"
          }`}
        >
          Suppliers & Millers ({categoryCounts.supplier})
        </button>
      </div>

      {/* MAIN INTERACTIVE MAP & SIDE DETAIL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Map Canvas */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E6DED7] p-4 shadow-xs relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DED7] text-xs mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#014D4E]"></span>
              <span className="font-bold text-[#172B35]">
                {businessProfile.businessName} (Center Point)
              </span>
            </div>
            <span className="text-[#60727A]">
              Showing {filteredBusinesses.length} entities within {selectedRadius} km
            </span>
          </div>

          {/* Shared Real Market Map Component */}
          <RealMarketMap
            businessProfile={businessProfile}
            localBusinesses={localBusinesses}
            opportunityZones={opportunityZones}
            selectedRadius={selectedRadius}
            selectedBusiness={selectedBusiness}
            onSelectBusiness={(b) => {
              setSelectedBusiness(b);
              setActiveZone(null);
            }}
            activeZone={activeZone}
            onSelectZone={(z) => {
              setActiveZone(z);
              setSelectedBusiness(null);
            }}
            heightClass="h-96 sm:h-[450px]"
            showLegend={true}
          />
        </div>

        {/* Right: Selected Business / Opportunity Inspector Panel */}
        <div className="lg:col-span-4 space-y-4">
          {selectedBusiness ? (
            <div className="bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      selectedBusiness.type === "supplier"
                        ? "bg-[#2E8B57]/10 text-[#2E8B57]"
                        : selectedBusiness.type === "complementary"
                        ? "bg-[#F4C430]/20 text-[#A87B00]"
                        : selectedBusiness.type === "customer"
                        ? "bg-[#014D4E]/10 text-[#014D4E]"
                        : "bg-[#60727A]/10 text-[#60727A]"
                    }`}
                  >
                    {selectedBusiness.potentialConnection || selectedBusiness.category}
                  </span>
                  <h3 className="text-base font-bold text-[#172B35] mt-1.5">
                    {selectedBusiness.name}
                  </h3>
                  <div className="text-xs text-[#60727A] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#014D4E]" />
                    <span>
                      {selectedBusiness.distanceKm} km away • {selectedBusiness.direction}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="p-1 text-[#60727A] hover:text-[#172B35] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Offerings / Category */}
              <div>
                <div className="text-xs font-bold text-[#60727A] uppercase tracking-wider mb-1.5">
                  Category / Offerings
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedBusiness.products || [selectedBusiness.category]).map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 bg-[#F8F3EE] rounded-md text-xs text-[#172B35] border border-[#E6DED7]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Potential Synergy Benefit */}
              <div className="p-3 bg-[#014D4E]/5 rounded-xl border border-[#014D4E]/20 space-y-1">
                <div className="text-xs font-bold text-[#014D4E] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4C430]" />
                  <span>Why Connect:</span>
                </div>
                <p className="text-xs text-[#172B35] leading-relaxed">
                  {selectedBusiness.whyUseful || selectedBusiness.potentialConnection}
                </p>
              </div>

              {/* Connect Action */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenConnectModal(selectedBusiness)}
                  className="w-full py-2.5 bg-[#014D4E] hover:bg-[#013738] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#F4C430]" />
                  <span>Connect / Send WhatsApp Proposal</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs text-center text-xs text-[#60727A] space-y-2">
              <Compass className="w-8 h-8 text-[#014D4E] mx-auto" />
              <p className="font-semibold text-[#172B35]">Click any pin on the map</p>
              <p>Inspect local competitors, suppliers, and complementary partners.</p>
            </div>
          )}

          {/* Opportunity Zone Detail if selected */}
          {activeZone && (
            <div className="bg-[#FFF9E6] rounded-2xl border border-[#F4C430]/60 p-5 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#A87B00]" />
                  <span className="text-xs font-bold text-[#A87B00] uppercase tracking-wider">
                    Opportunity Zone
                  </span>
                </div>
                <button
                  onClick={() => setActiveZone(null)}
                  className="p-1 text-[#60727A] hover:text-[#172B35] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-sm font-bold text-[#172B35]">{activeZone.name}</h4>
              <p className="text-xs text-[#172B35] leading-relaxed">{activeZone.description}</p>

              <div className="p-2.5 bg-white rounded-lg border border-[#F4C430]/40 text-xs">
                <div className="font-bold text-[#014D4E]">Why It Matters:</div>
                <div className="text-[#60727A] mt-0.5">{activeZone.reason}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* "WHAT WE FOUND" EXPLAINABLE DISCOVERY BREAKDOWN */}
      <div className="bg-white rounded-2xl border border-[#E6DED7] p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-[#172B35]">
            What We Found in Your Local Market
          </h3>
          <p className="text-xs text-[#60727A]">
            Direct intelligence based on your location and store category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(marketGaps || []).slice(0, 3).map((gap) => (
            <div
              key={gap.id}
              className="p-4 rounded-xl bg-[#F8F3EE] border border-[#E6DED7] flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      gap.impact === "High" || gap.impactLevel === "High"
                        ? "bg-[#2E8B57]/10 text-[#2E8B57]"
                        : "bg-[#F4C430]/20 text-[#A87B00]"
                    }`}
                  >
                    {gap.impactLevel || gap.impact || "High"} Growth Impact
                  </span>
                  <span className="text-[11px] font-semibold text-[#014D4E]">
                    {gap.confidence || 88}% Confidence
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#172B35]">{gap.title}</h4>
                <p className="text-xs text-[#60727A] mt-1 leading-relaxed">
                  {gap.shortExplanation || gap.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E6DED7] flex items-center justify-between">
                <button
                  onClick={() => onExploreOpportunity(gap)}
                  className="text-xs font-bold text-[#014D4E] hover:text-[#013738] flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Steps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-[#60727A]">{gap.category || "Market Gap"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
