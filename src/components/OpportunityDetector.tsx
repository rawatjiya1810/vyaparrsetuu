import React, { useState } from "react";
import { MarketGap, BusinessProfile, Language } from "../types";
import { translations } from "../data/translations";
import {
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  X,
} from "lucide-react";

interface OpportunityDetectorProps {
  businessProfile: BusinessProfile;
  marketGaps: MarketGap[];
  language?: Language;
  onAddToPlan?: (gap: MarketGap) => void;
}

export const OpportunityDetector: React.FC<OpportunityDetectorProps> = ({
  businessProfile,
  marketGaps,
  language = "en",
  onAddToPlan,
}) => {
  const isHi = language === "hi";
  const [selectedType, setSelectedType] = useState<string>("all");
  const [activeOpportunity, setActiveOpportunity] = useState<MarketGap | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const sortedGaps = [...marketGaps].sort((a, b) => {
    if (a.type === "government_scheme" && b.type !== "government_scheme") return -1;
    if (a.type !== "government_scheme" && b.type === "government_scheme") return 1;
    return 0;
  });

  const filteredGaps = sortedGaps.filter((g) => {
    if (selectedType === "all") return true;
    return g.type === selectedType;
  });

  const handleAdd = (gap: MarketGap) => {
    if (onAddToPlan) {
      onAddToPlan(gap);
    }
    setAddedToast(`Added "${gap.title}" to your 30-Day Action Plan!`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case "service_gap":
        return "Market Service Gap";
      case "untapped_customer":
        return "Untapped Customer Segment";
      case "supplier_opportunity":
        return "Supplier & Direct Sourcing";
      case "government_scheme":
        return "Government Scheme Match";
      default:
        return "Opportunity";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast alert */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#014D4E] text-white px-4 py-3 rounded-xl shadow-lg border border-[#014D4E] flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E6DED7]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4C430]/20 text-[#A87B00] text-xs font-semibold mb-1">
            <Lightbulb className="w-3.5 h-3.5 text-[#A87B00]" />
            <span>Opportunity & Market-Gap Detection</span>
          </div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Detected Opportunities Around You
          </h1>
          <p className="text-xs sm:text-sm text-[#60727A]">
            Identified by analyzing customer demographics, competitor blind spots, and matched government schemes.
          </p>
        </div>

        <div className="text-xs text-[#014D4E] bg-[#014D4E]/10 px-3 py-1.5 rounded-lg font-semibold self-start sm:self-auto">
          {marketGaps.length} Actionable Opportunities Available
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All Opportunities" },
          { id: "government_scheme", label: "Government Schemes" },
          { id: "service_gap", label: "Market Gaps" },
          { id: "untapped_customer", label: "Customer Segments" },
          { id: "supplier_opportunity", label: "Supplier Linkages" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              selectedType === tab.id
                ? "bg-[#014D4E] text-white border-[#014D4E]"
                : "bg-white text-[#172B35] border-[#E6DED7] hover:bg-[#F8F3EE]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Opportunities (Government Scheme First) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGaps.map((gap) => (
          <div
            key={gap.id}
            className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all ${
              gap.type === "government_scheme"
                ? "border-[#2E8B57]/50 ring-1 ring-[#2E8B57]/20 hover:border-[#2E8B57]"
                : "border-[#E6DED7] hover:border-[#014D4E]/40"
            }`}
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    gap.type === "government_scheme"
                      ? "bg-[#2E8B57]/15 text-[#2E8B57] font-extrabold"
                      : gap.type === "supplier_opportunity"
                      ? "bg-[#014D4E]/10 text-[#014D4E]"
                      : "bg-[#F4C430]/20 text-[#A87B00]"
                  }`}
                >
                  {getCategoryLabel(gap.type)}
                </span>

                <span className="px-2 py-0.5 bg-[#F8F3EE] rounded text-[10px] font-bold text-[#172B35]">
                  {gap.impactLevel || gap.impact || "High"} Impact
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-[#172B35] leading-snug">
                  {gap.title}
                </h3>
                <p className="text-xs text-[#60727A] mt-1.5 leading-relaxed">
                  {gap.shortExplanation || gap.description}
                </p>
              </div>

              {/* Evidence Points */}
              {gap.evidence && gap.evidence.length > 0 && (
                <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7] space-y-1 font-sans text-xs">
                  <span className="font-heading text-xs font-bold text-[#014D4E] block">Why it exists:</span>
                  <ul className="space-y-1 text-[11px] text-[#172B35] list-disc list-inside font-medium">
                    {gap.evidence.map((ev, i) => (
                      <li key={i}>{ev}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#E6DED7] flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveOpportunity(gap)}
                className="font-sans text-xs font-bold text-[#014D4E] hover:text-[#013738] flex items-center gap-1 cursor-pointer"
              >
                <span>{gap.type === "government_scheme" ? "Check Eligibility & Details" : "View Action Plan"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleAdd(gap)}
                className="px-3 py-1.5 bg-[#014D4E] hover:bg-[#013738] text-white font-sans text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#F4C430]" />
                <span>Add to 30-Day Plan</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Step-by-Step Action Guide Modal / Drawer */}
      {activeOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172B35]/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-[#E6DED7] shadow-xl overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="bg-[#F8F3EE] p-5 border-b border-[#E6DED7] flex items-center justify-between">
              <div>
                <span className="font-sans text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-[#F4C430]/20 text-[#A87B00]">
                  {getCategoryLabel(activeOpportunity.type)}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#172B35] mt-1">
                  {activeOpportunity.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveOpportunity(null)}
                className="p-1 text-[#60727A] hover:text-[#172B35] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase text-[#60727A]">
                  Why this opportunity matters
                </div>
                <p className="text-xs text-[#172B35] leading-relaxed">
                  {activeOpportunity.whyItMatters || activeOpportunity.shortExplanation}
                </p>
              </div>

              {/* Recommended Action */}
              <div className="p-3.5 bg-[#014D4E]/10 rounded-xl border border-[#014D4E]/20 text-xs">
                <span className="font-bold text-[#014D4E]">Action to Take: </span>
                <span className="text-[#172B35] font-medium">{activeOpportunity.potentialAction}</span>
              </div>

              {/* Government Scheme Details */}
              {activeOpportunity.schemeDetails && (
                <div className="p-4 bg-[#2E8B57]/10 rounded-xl border border-[#2E8B57]/20 space-y-2.5 text-xs">
                  <div className="font-bold text-[#2E8B57] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Matched Scheme: {activeOpportunity.schemeDetails.schemeName}</span>
                  </div>
                  <div className="text-[11px] text-[#172B35]">
                    <strong>Ministry:</strong> {activeOpportunity.schemeDetails.ministry}
                  </div>
                  <div className="text-[11px] text-[#172B35]">
                    <strong>Benefit:</strong> {activeOpportunity.schemeDetails.benefitAmount}
                  </div>
                  <div className="text-[11px] text-[#172B35]">
                    <strong>Eligibility:</strong> {activeOpportunity.schemeDetails.eligibilityCheck}
                  </div>
                  <div className="pt-1">
                    <span className="font-bold text-[#2E8B57] text-[11px]">Required Documents:</span>
                    <ul className="space-y-1 text-[#172B35] text-[11px] list-disc list-inside mt-1">
                      {activeOpportunity.schemeDetails.documentsRequired.map((doc, idx) => (
                        <li key={idx}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#F8F3EE] p-4 border-t border-[#E6DED7] flex items-center justify-between">
              <button
                onClick={() => setActiveOpportunity(null)}
                className="px-4 py-2 text-xs font-semibold text-[#172B35] hover:bg-[#E6DED7] rounded-lg cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleAdd(activeOpportunity);
                  setActiveOpportunity(null);
                }}
                className="px-5 py-2.5 bg-[#014D4E] hover:bg-[#013738] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#F4C430]" />
                <span>Add Tasks to 30-Day Plan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
