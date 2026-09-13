import React, { useState, useEffect } from "react";
import { LocalBusiness, BusinessProfile, Language } from "../types";
import { dataService, ProposalRecord } from "../services/dataService";
import { ConnectModal } from "./ConnectModal";
import { translations } from "../data/translations";
import {
  Users2,
  MapPin,
  MessageSquare,
  Search,
  CheckCircle2,
  X,
  UserCheck,
  UserPlus,
  Send,
  Eye,
  Phone,
  ShieldCheck,
  Truck,
  Globe,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface CommunityViewProps {
  businessProfile: BusinessProfile;
  localBusinesses: LocalBusiness[];
  language?: Language;
  onOpenConnectModal?: (business: LocalBusiness) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  businessProfile,
  localBusinesses,
  language = "en",
  onOpenConnectModal,
}) => {
  const isHi = language === "hi";
  const [filterType, setFilterType] = useState<
    "all" | "supplier" | "complementary" | "similar" | "customer"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [distanceFilter, setDistanceFilter] = useState<"all" | "1" | "3" | "5">("all");
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "name">("distance");

  // Persistent States
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [proposals, setProposals] = useState<Record<string, ProposalRecord>>({});

  // Active Modals & Toast
  const [composerBusiness, setComposerBusiness] = useState<LocalBusiness | null>(null);
  const [profileBusiness, setProfileBusiness] = useState<LocalBusiness | null>(null);
  const [toast, setToast] = useState<{ message: string; sub?: string } | null>(null);

  // Load persistent states on mount
  useEffect(() => {
    setConnectedIds(dataService.getConnections());
    setProposals(dataService.getProposals());
  }, []);

  const showToast = (message: string, sub?: string) => {
    setToast({ message, sub });
    setTimeout(() => setToast(null), 3500);
  };

  const handleToggleConnect = (business: LocalBusiness) => {
    const isNowConnected = dataService.toggleConnection(business.id);
    setConnectedIds(dataService.getConnections());

    if (isNowConnected) {
      showToast(
        `Connected with ${business.name} ✓`,
        `You can now message ${business.contactPerson || "this merchant"} directly.`
      );
    } else {
      showToast(`Connection removed for ${business.name}`);
    }
  };

  const handleOpenProposalComposer = (business: LocalBusiness) => {
    if (onOpenConnectModal) {
      onOpenConnectModal(business);
    } else {
      setComposerBusiness(business);
    }
  };

  const handleProposalSent = (businessId: string) => {
    setConnectedIds(dataService.getConnections());
    setProposals(dataService.getProposals());

    const biz = localBusinesses.find((b) => b.id === businessId);
    const name = biz ? biz.name : "the business";
    showToast(`✓ Proposal sent successfully`, `Your proposal has been sent to ${name}.`);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setDistanceFilter("all");
    setSortBy("distance");
  };

  // Filter & Search Logic
  const filtered = localBusinesses
    .filter((b) => b.type !== "user")
    .filter((b) => {
      const matchesType = filterType === "all" || b.type === filterType;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        b.name.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.whyUseful.toLowerCase().includes(query) ||
        (b.contactPerson && b.contactPerson.toLowerCase().includes(query)) ||
        (b.direction && b.direction.toLowerCase().includes(query)) ||
        (b.products && b.products.some((p) => p.toLowerCase().includes(query)));

      const matchesDistance =
        distanceFilter === "all" ||
        (distanceFilter === "1" && b.distanceKm <= 1) ||
        (distanceFilter === "3" && b.distanceKm <= 3) ||
        (distanceFilter === "5" && b.distanceKm <= 5);

      return matchesType && matchesSearch && matchesDistance;
    })
    .sort((a, b) => {
      if (sortBy === "distance") return a.distanceKm - b.distanceKm;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-200 relative">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 max-w-md bg-[#172B35] text-white p-4 rounded-2xl shadow-2xl border border-[#F4C430]/40 flex items-start gap-3 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#F4C430] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-heading text-xs sm:text-sm font-extrabold text-white">
              {toast.message}
            </div>
            {toast.sub && (
              <div className="font-sans text-xs text-teal-100/90 mt-0.5">
                {toast.sub}
              </div>
            )}
          </div>
          <button
            onClick={() => setToast(null)}
            className="p-1 text-teal-200 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E6DED7]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#014D4E]/10 text-[#014D4E] text-xs font-semibold mb-1">
            <Users2 className="w-3.5 h-3.5 text-[#014D4E]" />
            <span>Local Business Ecosystem</span>
          </div>
          <h1 className="text-2xl font-bold text-[#172B35]">
            Community Connect
          </h1>
          <p className="text-xs sm:text-sm text-[#60727A]">
            Discover nearby suppliers, wholesale millers, complementary stores, and cross-promotion partners.
          </p>
        </div>

        <div className="text-xs text-[#2E8B57] bg-[#2E8B57]/10 px-3 py-1.5 rounded-lg font-bold self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Verified Local Directory</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6DED7] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#60727A] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
              placeholder="Search business, owner, category, product, or location..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-[#F8F3EE]/50 border border-[#E6DED7] rounded-xl focus:outline-none focus:border-[#014D4E] focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 p-0.5 text-[#60727A] hover:text-[#172B35] rounded-full cursor-pointer"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Distance & Sorting */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto">
            <div className="flex items-center gap-1 text-xs text-[#526671] shrink-0 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#014D4E]" />
              <span>Distance:</span>
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value as any)}
                className="bg-[#F8F3EE] border border-[#E6DED7] rounded-lg px-2 py-1.5 text-xs font-semibold text-[#172B35] focus:outline-none cursor-pointer"
              >
                <option value="all">All Distances</option>
                <option value="1">Within 1 km</option>
                <option value="3">Within 3 km</option>
                <option value="5">Within 5 km</option>
              </select>
            </div>

            <div className="flex items-center gap-1 text-xs text-[#526671] shrink-0 font-medium">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F8F3EE] border border-[#E6DED7] rounded-lg px-2 py-1.5 text-xs font-semibold text-[#172B35] focus:outline-none cursor-pointer"
              >
                <option value="distance">Nearest First</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {(searchQuery || filterType !== "all" || distanceFilter !== "all") && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#E6DED7]">
          {[
            { id: "all", label: "All Network" },
            { id: "supplier", label: "Suppliers & Mills" },
            { id: "complementary", label: "Complementary Partners" },
            { id: "customer", label: "Bulk Buyers" },
            { id: "similar", label: "Peer Retailers" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                filterType === f.id
                  ? "bg-[#014D4E] text-white border-[#014D4E] shadow-2xs"
                  : "bg-[#F8F3EE]/60 text-[#172B35] border-[#E6DED7] hover:bg-[#E6DED7]/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty Search Results */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#E6DED7] p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#014D4E]/10 text-[#014D4E] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 text-[#014D4E]" />
          </div>
          <h3 className="font-heading text-lg font-bold text-[#172B35]">
            No businesses found matching your criteria
          </h3>
          <p className="font-sans text-xs text-[#526671] max-w-md mx-auto">
            Try adjusting your search query, clearing category filters, or expanding your distance range to discover more nearby partners.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#014D4E] hover:bg-[#013738] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Search & Filters</span>
          </button>
        </div>
      )}

      {/* Grid of Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((biz) => {
          const isConnected = connectedIds.includes(biz.id);
          const proposal = proposals[biz.id];
          const hasProposal = Boolean(proposal);

          return (
            <div
              key={biz.id}
              className="bg-white rounded-2xl border border-[#E6DED7] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#014D4E]/40 transition-all group"
            >
              <div className="space-y-3">
                {/* Top Badge & Distance */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      biz.type === "supplier"
                        ? "bg-[#2E8B57]/10 text-[#2E8B57]"
                        : biz.type === "complementary"
                        ? "bg-[#F4C430]/20 text-[#A87B00]"
                        : biz.type === "customer"
                        ? "bg-[#014D4E]/10 text-[#014D4E]"
                        : "bg-[#60727A]/10 text-[#60727A]"
                    }`}
                  >
                    {biz.potentialConnection || biz.category}
                  </span>

                  <span className="text-xs font-semibold text-[#526671] shrink-0">
                    {biz.distanceKm} km ({biz.direction})
                  </span>
                </div>

                {/* Name & Category */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      onClick={() => setProfileBusiness(biz)}
                      className="text-base font-extrabold text-[#172B35] group-hover:text-[#014D4E] cursor-pointer transition-colors"
                    >
                      {biz.name}
                    </h3>
                    <span className="text-xs font-bold text-[#014D4E] flex items-center gap-0.5">
                      ⭐ {biz.rating}
                    </span>
                  </div>
                  <div className="text-xs text-[#526671] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#014D4E] shrink-0" />
                    <span>{biz.category}</span>
                  </div>
                </div>

                {/* Potential Synergy / Why useful */}
                <div className="p-3 bg-[#014D4E]/5 rounded-xl border border-[#014D4E]/15 text-xs text-[#172B35] leading-snug">
                  <strong className="text-[#014D4E]">Why Connect:</strong>{" "}
                  {biz.whyUseful}
                </div>

                {/* Contact Person */}
                {biz.contactPerson && (
                  <div className="flex items-center justify-between text-[11px] text-[#526671] pt-0.5">
                    <span>
                      Contact: <span className="font-semibold text-[#172B35]">{biz.contactPerson}</span>
                    </span>
                    {biz.phone && (
                      <a
                        href={`tel:${biz.phone}`}
                        className="text-[#014D4E] hover:underline flex items-center gap-0.5 font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="w-3 h-3 text-[#014D4E]" />
                        <span>Call</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E6DED7] space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {/* Connect Button */}
                  <button
                    onClick={() => handleToggleConnect(biz)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isConnected
                        ? "bg-[#2E8B57] text-white shadow-2xs"
                        : "bg-[#014D4E]/10 hover:bg-[#014D4E]/20 text-[#014D4E]"
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-[#F4C430]" />
                        <span>Connected ✓</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5 text-[#014D4E]" />
                        <span>+ Connect</span>
                      </>
                    )}
                  </button>

                  {/* View Profile Button */}
                  <button
                    onClick={() => setProfileBusiness(biz)}
                    className="py-2 px-3 bg-[#F8F3EE] hover:bg-[#E6DED7] text-[#172B35] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#014D4E]" />
                    <span>View Profile</span>
                  </button>
                </div>

                {/* Send Proposal Button */}
                <button
                  onClick={() => handleOpenProposalComposer(biz)}
                  className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    hasProposal
                      ? "bg-[#2E8B57]/15 text-[#2E8B57] border border-[#2E8B57]/30 hover:bg-[#2E8B57]/20"
                      : "bg-[#014D4E] hover:bg-[#013738] text-white shadow-xs"
                  }`}
                >
                  {hasProposal ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
                      <span>Proposal Sent ✓ ({proposal.sentAt})</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#F4C430]" />
                      <span>Send Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PROPOSAL COMPOSER MODAL */}
      {composerBusiness && (
        <ConnectModal
          business={composerBusiness}
          businessProfile={businessProfile}
          language={language}
          isOpen={Boolean(composerBusiness)}
          onClose={() => setComposerBusiness(null)}
          onProposalSent={handleProposalSent}
        />
      )}

      {/* BUSINESS PROFILE DETAILS MODAL */}
      {profileBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#172B35]/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E6DED7] shadow-xl overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="bg-[#F8F3EE] p-5 border-b border-[#E6DED7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#014D4E] text-[#F4C430] flex items-center justify-center font-bold text-base shadow-xs">
                  {profileBusiness.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-[#172B35]">
                      {profileBusiness.name}
                    </h3>
                    {profileBusiness.verified && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#2E8B57]/10 text-[#2E8B57] text-[10px] font-bold">
                        <ShieldCheck className="w-3 h-3 text-[#2E8B57]" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#526671] font-medium">
                    {profileBusiness.category} • ⭐ {profileBusiness.rating} rating
                  </p>
                </div>
              </div>
              <button
                onClick={() => setProfileBusiness(null)}
                className="p-1 text-[#526671] hover:text-[#172B35] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="p-3.5 bg-[#014D4E]/5 rounded-xl border border-[#014D4E]/20 text-xs space-y-1">
                <span className="font-bold text-[#014D4E] block">Synergy & Partnership Opportunity:</span>
                <p className="text-[#172B35] leading-relaxed font-medium">{profileBusiness.whyUseful}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7]">
                  <span className="text-[#526671] font-semibold block text-[11px]">Owner / Contact Person</span>
                  <span className="text-[#172B35] font-bold mt-0.5 block">{profileBusiness.contactPerson || "Merchant"}</span>
                </div>
                <div className="p-3 bg-[#F8F3EE] rounded-xl border border-[#E6DED7]">
                  <span className="text-[#526671] font-semibold block text-[11px]">Distance & Direction</span>
                  <span className="text-[#172B35] font-bold mt-0.5 block">{profileBusiness.distanceKm} km ({profileBusiness.direction})</span>
                </div>
              </div>

              {profileBusiness.products && profileBusiness.products.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-[#172B35] block mb-1.5">
                    Key Products & Offerings
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profileBusiness.products.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#F8F3EE] text-[#172B35] text-xs font-semibold rounded-lg border border-[#E6DED7]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#526671]">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-[#014D4E]" />
                  {profileBusiness.hasDelivery ? "Delivery Available" : "In-Store Procurement"}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-[#014D4E]" />
                  {profileBusiness.hasDigitalPresence ? "Digital Orders Accepted" : "Local Merchant Only"}
                </span>
              </div>
            </div>

            {/* Profile Footer Actions */}
            <div className="p-4 bg-[#F8F3EE] border-t border-[#E6DED7] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  handleToggleConnect(profileBusiness);
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                  connectedIds.includes(profileBusiness.id)
                    ? "bg-[#2E8B57] text-white"
                    : "bg-[#014D4E]/10 text-[#014D4E] hover:bg-[#014D4E]/20"
                }`}
              >
                {connectedIds.includes(profileBusiness.id) ? (
                  <>
                    <UserCheck className="w-4 h-4 text-[#F4C430]" />
                    <span>Connected ✓</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 text-[#014D4E]" />
                    <span>Connect</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  const biz = profileBusiness;
                  setProfileBusiness(null);
                  handleOpenProposalComposer(biz);
                }}
                className="px-5 py-2.5 bg-[#014D4E] hover:bg-[#013738] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#F4C430]" />
                <span>
                  {proposals[profileBusiness.id] ? "View / Resend Proposal" : "Send Proposal"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
